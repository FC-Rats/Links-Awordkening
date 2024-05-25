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
        self.players = {}  # Dictionnaire pour mapper les clients aux parties (client_id / player_id : Player)

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

    async def send_message(self, client_id, args):
        """
        Envoie un message de chat à tous les utilisateurs de la partie. 

        :param args: Arguments contenant le message à envoyer
        """
        message = args.get('message')
        client = self.clients[client_id]
        if message and client_id in self.players:
            await self.server.send_to_all(client_id, self.dump_data({
                'action': 'send_message',
                'args': {
                    'message': message,
                    'nickname': client.nickname
                }
            }))

    async def create_game(self, client_id, websocket, args):
        """
        Crée une nouvelle partie.

        :param client_id: ID du client créant la partie
        :param websocket: WebSocket du client
        :param max_player: Nombre maximal de joueurs dans la partie
        """
        max_player = args.get('max_player')
        game_name = args.get('game_name')
        if(game_name and max_player) :
            game_id = uuid4()  # Génère un ID unique pour la partie
            game_code = self.generate_unique_code()  # Génère un code unique pour la partie
            game = Game(self, client_id, game_id, game_code, max_player, game_name)
            player = Player(client_id, game_id)
            game.players[client_id] = player
            self.players[client_id] = player
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
            print(f"BOOL {not game.game_started} GAME.CODE {game.code} GAMECODE {game_code} = {game.code == game_code}")
            if game.code == game_code and not game.game_started:
                if len(game.players) < game.max_player:
                    player = Player(client_id, game_id)
                    game.players[client_id] = player
                    self.players[client_id] = player
                    players_data = list(game.players.keys())
                    print(f"Utilisateur {client_id} a rejoint la partie {game_id}")
                    await self.clients[client_id].websocket.send(self.dump_data({
                        'action': 'join_game',
                        'args': {'return': 'success', 'idJoin': game_code, 'nameGame' : game.game_name, 'idHost' : game.host, 'max_player' : game.max_player}
                    }))
                    await self.send_to_all(client_id,self.dump_data({ 'action': 'join_game', 'args' : { 'return': 'success', 'players' : players_data}}))
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

    async def start_game(self, client_id):
        """
        Permet à un client de démarrer une partie.

        :param client_id: ID du client quittant la partie
        """
        player = self.players.get(client_id)
        if not player:
            return

        game = self.games.get(str(player.game_id))
        if not game:
            return
        
        if game.host == client_id :
            game.start_game()

    async def leave_game(self, client_id):
        """
        Permet à un client de quitter une partie.

        :param client_id: ID du client quittant la partie
        """
        player = self.players.get(client_id)
        if not player:
            return
        
        game = self.games.get(str(player.game_id))
        if not game:
            return

        if game.host == client_id:
            clients_to_remove = [client_id for client_id, player in self.players.items() if player.game_id == player.game_id]

            for client_id in clients_to_remove:
                client = self.clients[client_id]
                await client.websocket.send(self.dump_data({
                    'action': 'leave_game',
                    'args': {
                        'return': 'error',
                        'msg': 'Le créateur de la partie a quitté. Fin prématurée de la partie'
                    }
                }))
            del self.players[client_id]
            del self.games[str(player.game_id)]
        
        else:
            del self.players[client_id]
            del game.players[client_id]
            if not game.players:
                del self.games[str(player.game_id)]

    async def add_word(self, client_id, websocket, word):
        """
        Ajoute un mot à la chaîne de mots du joueur.

        :param client_id: ID du client
        :param websocket: WebSocket du client
        :param word: Mot à ajouter
        """
        player = self.players.get(client_id)
        if not player:
            return

        game = self.games.get(str(player.game_id))
        if not game:
            return

        result = await player.add_word(word)
        await websocket.send(self.dump_data(result))

    async def end_game(self, id_game):
        """
        Termine une partie.

        :param id_game: ID de la partie à terminer
        """
        clients_to_remove = [client_id for client_id, player in self.players.items() if player.game_id == id_game]

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
        player = self.players.get(id_client)
        if not player:
            return

        game_id = player.game_id
        players = self.games[game_id].players.keys()
        clients_to_send = [
            client.websocket for client_id, client in self.clients.items()
            if client_id in players
        ]
        print(self.games[game_id].players)
        print(clients_to_send)
        print(len(clients_to_send))

        if clients_to_send:
            await websockets.broadcast(clients_to_send, data)
        else:
            print("Aucun client à envoyer.")

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
