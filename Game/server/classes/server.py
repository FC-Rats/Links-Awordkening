# server.py

import websockets
from uuid import uuid4
import random
import json
from websockets.server import serve

from .client import WebsocketClient
from .game import Game
from .player import Player

class WebsocketServer:
    def __init__(self, hostname: str, port: int):
        """
        Initialisation du serveur WebSocket.

        :param hostname: Adresse du serveur (ex: 'localhost')
        :param port: Port d'écoute (ex: 8080)
        """
        self.hostname = hostname
        self.port = port
        self.clients = {}  # Dictionnaire pour stocker les clients connectés (client_id : Client)
        self.games = {}  # Dictionnaire pour stocker les parties en cours (game_id : Game)
        self.players = {}  # Dictionnaire pour mapper les clients aux parties (client_id : game_id)

    async def run(self, future):
        """
        Lance le serveur WebSocket.

        :param future: Objet asyncio Future pour maintenir le serveur actif
        """
        async with serve(self.client_connected, self.hostname, self.port):
            await future

    async def client_connected(self, websocket):
        """
        Gère la connexion d'un nouveau client.

        :param websocket: Objet WebSocket représentant la connexion client
        """
        client = WebsocketClient(self)
        self.clients[client.id] = client

        print(f"Utilisateur {client.id} connecté depuis {websocket.remote_address[0]}.")

        try:
            await client.handler(websocket)
        finally:
            del self.clients[client.id]
            if client.id in self.players:
                await self.leave_game(client.id)

        print(f"Utilisateur {client.id} déconnecté.")

    async def create_game(self, client_id, websocket, max_player):
        """
        Crée une nouvelle partie.

        :param client_id: ID du client créant la partie
        :param websocket: WebSocket du client
        :param max_player: Nombre maximal de joueurs dans la partie
        """
        game_id = uuid4()  # Génère un ID unique pour la partie
        game_code = self.generate_unique_code()  # Génère un code unique pour la partie
        game = Game(self, game_id, game_code, max_player)
        game.players[client_id] = Player(client_id)
        self.players[client_id] = str(game_id)
        self.games[str(game_id)] = game
        await websocket.send(self.dump_data({
            'action': 'create_game',
            'args': {'return': 'success', 'idJoin': game_code}
        }))

    async def join_game(self, client_id, game_code):
        """
        Permet à un client de rejoindre une partie existante.

        :param client_id: ID du client
        :param game_code: Code de la partie à rejoindre
        """
        for game_id, game in self.games.items():
            if game.code == game_code and not game.game_started:
                if len(game.players) < game.max_player:
                    game.players[client_id] = Player(client_id)
                    self.players[client_id] = game_id
                    print(f"Utilisateur {client_id} a rejoint la partie !")
                    await self.clients[client_id].websocket.send(self.dump_data({
                        'action': 'join_game',
                        'args': {'return': 'success', 'idJoin': game_code}
                    }))
                    return
                else:
                    await self.clients[client_id].websocket.send(self.dump_data({
                        'action': 'join_game',
                        'args': {'return': 'error', 'msg': 'La partie est pleine !'}
                    }))
                    return
            else:
                await self.clients[client_id].websocket.send(self.dump_data({
                    'action': 'join_game',
                    'args': {'return': 'error', 'msg': 'La partie a déjà commencé !'}
                }))
                return
        await self.clients[client_id].websocket.send(self.dump_data({
            'action': 'join_game',
            'args': {'return': 'error', 'msg': 'Partie introuvable !'}
        }))

    async def leave_game(self, client_id):
        """
        Permet à un client de quitter une partie.

        :param client_id: ID du client quittant la partie
        """
        game_id = self.players[client_id]
        del self.players[client_id]
        game = self.games[game_id]
        del game.players[client_id]
        if not game.players:
            del self.games[game_id]

    async def add_word(self, client_id, websocket, word):
        """
        Ajoute un mot à la chaîne de mots du joueur.

        :param client_id: ID du client
        :param websocket: WebSocket du client
        :param word: Mot à ajouter
        """
        game_id = self.players[client_id]
        game = self.games[game_id]
        result = await game.players[client_id].add_word(word)
        await websocket.send(self.dump_data(result))

    async def end_game(self, id_game):
        """
        Termine une partie.

        :param id_game: ID de la partie à terminer
        """
        clients_to_remove = [client_id for client_id, game_id in self.players.items() if game_id == id_game]

        all_chart = {}
        for client_id in clients_to_remove:
            game = self.games[id_game]
            player = game.players[client_id]
            all_chart[player.id] = player.chart

        for client_id in clients_to_remove:
            game = self.games[id_game]
            player = game.players[client_id]
            client = self.clients[client_id]
            await client.websocket.send(self.dump_data({
                'action': 'end_game',
                'args': {
                    'return': 'success', 
                    'chart': player.chart, 
                    'score': player.score,
                    'all-chart': all_chart
                }
            }))
            del self.players[client_id]
        del self.games[id_game]

    async def send_to_all(self, id_client, data):
        """
        Envoie un message à tous les clients d'une même partie.

        :param id_client: ID du client émetteur
        :param data: Données à envoyer
        """
        id_game = self.players.get(id_client)

        clients_to_send = [
            client.websocket for client_id, client in self.clients.items()
            if self.players.get(client_id) == id_game
        ]

        await websockets.broadcast(clients_to_send, data)

    def generate_unique_code(self):
        """
        Génère un code unique pour identifier une partie.

        :return: Code unique de la partie
        """
        while True:
            game_code = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', k=4))
            if not any(game.code == game_code for game in self.games.values()):
                return game_code

    def dump_data(self, data):
        """
        Sérialise les données en JSON.

        :param data: Données à sérialiser
        :return: Chaîne JSON
        """
        return json.dumps(data)
