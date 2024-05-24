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

    def __init__(self, hostname:str, port:int):
        self.hostname = hostname
        self.port = port
        self.clients = {}
        self.games = {}
        self.players = {}  # {client_id : game_id}

    async def run(self, future):
        async with serve(self.client_connected, self.hostname, self.port):
            await future

    async def client_connected(self, websocket):
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
        game_id = uuid4()
        game_code = self.generate_unique_code()
        game = Game(self, game_id, game_code, max_player)
        game.players[client_id] = Player(client_id)
        self.players[client_id] = str(game_id)
        self.games[str(game_id)] = game
        await websocket.send(self.dump_data({
            'action': 'create_game',
            'args': {'return': 'success', 'idJoin': game_code}
        }))

    async def join_game(self, client_id, game_code):
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
        await self.clients[client_id].websocket.send(self.dump_data({
            'action': 'join_game',
            'args': {'return': 'error', 'msg': 'Partie introuvable !'}
        }))

    async def leave_game(self, client_id):
        game_id = self.players[client_id]
        del self.players[client_id]
        game = self.games[game_id]
        del game.players[client_id]
        if not game.players:
            del self.games[game_id]

    async def add_word(self, client_id, websocket, word):
        game_id = self.players[client_id]
        game = self.games[game_id]
        result = await game.players[client_id].add_word(word)
        await websocket.send(self.dump_data(result))

    async def end_game(self, id_game):
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
        id_game = self.players.get(id_client)

        clients_to_send = [
            client.websocket for client_id, client in self.clients.items()
            if self.players.get(client_id) == id_game
        ]

        await websockets.broadcast(clients_to_send, data)

    def generate_unique_code(self):
        while True:
            game_code = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', k=4))
            if not any(game.code == game_code for game in self.games.values()):
                return game_code

    def dump_data(self, data):
        return json.dumps(data)