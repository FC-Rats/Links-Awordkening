# classes/server.py

import websockets
import asyncio
from uuid import uuid4, UUID
import random
import os
import json
from websockets.server import serve

from .client import WebsocketClient
from .game import Game
from .player import Player
from data.constants import get_string
from data.constants import check_injured

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
        print(f"Server started !")
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
            if client.id in self.players:
                rebase_path = ".."  # Chemin de base pour les fichiers de données
                ser_path = os.path.join(rebase_path, "Java", "src", "files", "save", f"{client.id}.ser")
                if os.path.exists(ser_path):
                    os.remove(ser_path)
                await self.leave_game(client.id)
            del self.clients[client.id]

        print(f"Utilisateur {client.id} déconnecté.")

    async def send_message(self, client_id, args):
        """
        Envoie un message de chat à tous les utilisateurs de la partie. 

        :param args: Arguments contenant le message à envoyer
        """
        message = args.get('message')
        client = self.clients[client_id]
        if message and client_id in self.players:
            await self.send_to_all(client_id, self.dump_data({
                'action': 'send_message',
                'args': {
                    'return' : 'success',
                    'message': check_injured(message),
                    'nickname': client.nickname
                }
            }), True)

    async def create_game(self, client_id, websocket, args):
        """
        Crée une nouvelle partie.

        :param client_id: ID du client créant la partie
        :param websocket: WebSocket du client
        :param max_player: Nombre maximal de joueurs dans la partie
        """
        max_player = args.get('max_player')
        game_type = 'solo' if max_player == 1 else 'multi'
        game_name = args.get('game_name')
        if(game_name and max_player) :
            game_id = uuid4()  # Génère un ID unique pour la partie
            game_code = self.generate_unique_code()  # Génère un code unique pour la partie
            game = Game(self, client_id, game_id, game_code, max_player, game_name)
            player = Player(self, client_id, game_id)
            game.players[client_id] = player
            self.players[client_id] = player
            self.games[str(game_id)] = game
            if websocket.open :
                await websocket.send(self.dump_data({
                    'action': 'create_game',
                    'args': {'return': 'success', 'idJoin': game_code, 'type' : game_type}
                }))

    async def invite_player(self, client_id, args):
        """
        Envoie une invitation à un joueur s'il est connecté.

        :param client_id: ID du client qui invite
        :param invite_id: ID du client à inviter
        """
        if args.get('id') and args.get('nickname') :
            invite_id = args.get('id')
            nickname = args.get('nickname')
            if client_id in self.players.keys()  :
                game = self.games.get(str(self.players.get(client_id).game_id))
                if invite_id in self.clients.keys() and self.clients.get(client_id).websocket.open and self.clients.get(invite_id).websocket.open :
                    await self.clients.get(client_id).websocket.send(self.dump_data({
                        'action': 'invite_player',
                        'args': {'return': 'success', 'msg': get_string('invite_player_success', joueur=nickname)}
                    }))
                    await self.clients.get(invite_id).websocket.send(self.dump_data({
                        'action': 'invitation_received',
                        'args': {'return': 'success', 'msg': get_string('invitation_player', joueur=self.clients.get(client_id).nickname),'idJoin': game.code, 'idInvite': client_id}
                    }))
                else :
                    await self.clients.get(client_id).websocket.send(self.dump_data({
                        'action': 'invite_player',
                        'args': {'return': 'warning', 'msg': get_string('invite_player_warning', joueur=nickname)}
                    }))
    
    async def answer_invitation(self, invited_client_id, args) :
        """
        Envoie un message pour savoir si le joueur a accepté ou refusé l'invitation.

        :param invited_client_id: ID du client invité
        :param answer: 'refused' or 'accepted'
        :param id: ID du client qui invite
        """
        if args.get('answer') and args.get('id') :
            invitation_client_id = args.get('id')
            answer = args.get('answer')
            if invitation_client_id in self.players.keys() and invited_client_id in self.clients.keys() and self.clients.get(invitation_client_id).websocket.open :
                if answer == 'accepted' :
                    await self.clients.get(invitation_client_id).websocket.send(self.dump_data({
                        'action': 'answer_invitation',
                        'args': {'return': 'success', 'msg': get_string('invitation_accepted', joueur=self.clients.get(invited_client_id).nickname)}
                    }))
                elif answer == 'refused' :
                    await self.clients.get(invitation_client_id).websocket.send(self.dump_data({
                        'action': 'answer_invitation',
                        'args': {'return': 'error', 'msg': get_string('invitation_refused', joueur=self.clients.get(invited_client_id).nickname)}
                    }))
            elif invitation_client_id in self.players.keys() and not invited_client_id in self.clients.keys() and self.clients.get(invitation_client_id).websocket.open :
                await self.clients.get(invitation_client_id).websocket.send(self.dump_data({
                    'action': 'answer_invitation',
                    'args': {'return': 'error', 'msg': get_string('invitation_deconnected')}
                }))
            

    async def join_game(self, client_id, game_code):
        """
        Permet à un client de rejoindre une partie existante.

        :param client_id: ID du client
        :param game_code: Code de la partie à rejoindre
        """
        for game_id, game in self.games.items():
            if game.code == game_code:
                if not game.game_started:
                    if len(list(game.players.keys())) < game.max_player:
                        player = Player(self, client_id, game_id)
                        game.players[client_id] = player
                        self.players[client_id] = player
                        players_data = list(game.players.keys())
                        await self.clients[client_id].websocket.send(self.dump_data({
                            'action': 'join_game',
                            'args': {'return': 'success', 'idJoin': game_code, 'nameGame' : game.game_name, 'idHost' : game.host, 'max_player' : game.max_player}
                        }))
                        if (players_data):
                            await self.send_to_all(client_id,self.dump_data({ 'action': 'join_game', 'args' : { 'return': 'success', 'players' : players_data}}), True)
                        return
                    else:
                        await self.clients[client_id].websocket.send(self.dump_data({
                            'action': 'join_game',
                            'args': {'return': 'error', 'msg': get_string('game_already_full')}
                        }))
                        return
                else:
                    await self.clients[client_id].websocket.send(self.dump_data({
                        'action': 'join_game',
                        'args': {'return': 'error', 'msg': get_string('game_already_started')}
                    }))
                    return
        await self.clients[client_id].websocket.send(self.dump_data({
            'action': 'join_game',
            'args': {'return': 'error', 'msg': get_string('game_not_found')}
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
            await game.start_game()

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
            clients_to_remove = game.players.keys()
            for client_removed_id in clients_to_remove:
                if client_id != client_removed_id and client_removed_id in self.clients.keys() and self.clients[client_removed_id].websocket.open :
                    await self.clients[client_removed_id].websocket.send(self.dump_data({
                        'action': 'leave_game',
                        'args': {'return': 'error','msg': get_string('host_left_game')}
                    }))
                elif client_id in self.clients.keys() and self.clients[client_id].websocket.open :
                    await self.clients[client_id].websocket.send(self.dump_data({
                        'action': 'leave_game',
                        'args': {'return': 'success','msg': get_string('host_left_game_success')}
                    }))
                del self.players[client_removed_id]
            del self.games[str(player.game_id)]
        else:
            if client_id in self.clients.keys() and self.clients[client_id].websocket.open :
                await self.clients[client_id].websocket.send(self.dump_data({
                        'action': 'leave_game',
                        'args': {'return': 'success','msg': get_string('left_game_success')}
                }))
            host = game.host
            del self.players[client_id]
            del game.players[client_id]
            if client_id in self.clients.keys() :
                await self.send_to_all(host,self.dump_data({
                    'action': 'leave_game',
                    'args': {'return': 'info','msg': get_string('player_left_game', joueur=self.clients[client_id].nickname), 'players': list(game.players.keys())}
                }))
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
        
        rebase_path = ".."  # Chemin de base pour les fichiers de données
        clients_to_remove = [client_id for client_id, player in self.players.items() if (player.game_id == UUID(id_game) or player.game_id == id_game)]

        all_chart = {}
        for client_id in clients_to_remove:
            game = self.games[str(id_game)]
            player = game.players[client_id]
            all_chart[player.id] = player.chart

        for client_id in clients_to_remove:
            game = self.games[str(id_game)]
            player = game.players[client_id]
            client = self.clients[client_id]
            if client.websocket.open:
                await client.websocket.send(self.dump_data({
                    'action': 'end_game',
                    'args': {
                        'return': 'success',
                        'code': game.code,
                        'host': game.host, 
                        'name': game.game_name,
                        'score': player.score,
                        'charts': all_chart,
                        'idUser': client_id,
                        'id_game': str(game.id),
                        'words': player.word_chain,
                        'nbPlayers' : game.max_player
                    }
                }))
            if client_id in self.players:
                del self.players[client_id]
            
            ser_path = os.path.join(rebase_path, "Java", "src", "files", "save", f"{client_id}.ser")
            if os.path.exists(ser_path):
                os.remove(ser_path)

        if str(id_game) in self.games:
            del self.games[str(id_game)]

    async def send_to_all(self, id_client: int, data: any, callback:bool = True):
        """
        Envoie un message à tous les clients d'une même partie.

        :param id_client: ID du client émetteur
        :param data: Données à envoyer
        :param callback: Booleen permettant de savoir si on inclut aussi le receveur
        """
        player = self.players.get(id_client)
        if not player:
            return

        game_id = player.game_id
        players = self.games[str(game_id)].players.keys()

        if callback :
            clients_to_send = [
                client.websocket for client_id, client in self.clients.items()
                if client_id in players and client.websocket is not None
            ]
        else :
            clients_to_send = [
                client.websocket for client_id, client in self.clients.items()
                if client_id in players and client.websocket is not None and client_id != id_client
            ]

        if clients_to_send:
            for client_ws in clients_to_send:
                if client_ws.open:
                    try:
                        asyncio.create_task(client_ws.send(data))
                    except Exception as e:
                        print(f"Erreur lors de l'envoi du message à {client_ws}: {e}")
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
