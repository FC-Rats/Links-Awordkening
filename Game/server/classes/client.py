# client.py

import json
from uuid import uuid4

class WebsocketClient:

    def __init__(self, server):
        """
        Initialise un client WebSocket.

        :param server: Instance du serveur WebSocket
        """
        self.server = server
        self.websocket = None
        self.nickname = "anonymous"
        self.id = uuid4()  # Génère un ID unique pour le client
        # Exemple : uuid4() -> '123e4567-e89b-12d3-a456-426614174000'

    async def handler(self, websocket):
        """
        Gère les interactions avec le client.

        :param websocket: WebSocket du client
        """
        self.websocket = websocket
        if websocket.path == "/chat":
            async for data in websocket:
                msg = self.load_data(data)
                if 'action' in msg:
                    await self.handle_chat(msg['action'], msg.get('args', {}))
        if websocket.path == "/game":
            async for data in websocket:
                msg = self.load_data(data)
                if 'action' in msg:
                    await self.handle_game(msg['action'], msg.get('args', {}))

    async def handle_chat(self, action, args):
        """
        Gère les actions de chat.

        :param action: Action à effectuer
        :param args: Arguments de l'action
        """
        if action == "send_data":
            await self.send_data(args)
        elif action == "join_chat":
            await self.join_chat()
        elif action == "send_message":
            await self.send_message(args)
        elif action == "leave_chat":
            await self.leave_chat()

    async def handle_game(self, action, args):
        """
        Gère les actions de jeu.

        :param action: Action à effectuer
        :param args: Arguments de l'action
        """
        if action == "send_data":
            await self.send_data(args)
        elif action == "create_game":
            await self.server.create_game(self.id, self.websocket, args.get('max_player'))
        elif action == "join_game":
            await self.server.join_game(self.id, args.get('game_code'))
        elif action == "leave_game":
            await self.server.leave_game(self.id)
        elif action == "add_word":
            await self.server.add_word(self.id, self.websocket, args.get('word'))

    async def send_data(self, args):
        """
        Envoie les données du client au serveur.

        :param args: Arguments contenant les données à envoyer
        """
        nickname = args.get('nickname')
        if nickname:
            self.nickname = nickname
        id = args.get('id')
        if id :
            del self.server.clients[self.id]
            self.id = id
            self.server.clients[self.id] = self

    async def join_chat(self):
        """
        Permet au client de rejoindre le chat.
        """
        await self.websocket.send(self.dump_data({
            'action': 'join_chat',
            'args': {'return': 'success'}
        }))

    async def send_message(self, args):
        """
        Envoie un message de chat à tous les utilisateurs.

        :param args: Arguments contenant le message à envoyer
        """
        message = args.get('message')
        if message:
            await self.server.send_to_all(self.id, self.dump_data({
                'action': 'send_message',
                'args': {
                    'message': message,
                    'nickname': self.nickname
                }
            }))

    async def leave_chat(self):
        """
        Permet au client de quitter le chat.
        """
        await self.websocket.send(self.dump_data({
            'action': 'leave_chat',
            'args': {'return': 'success'}
        }))

    def load_data(self, data):
        """
        Désérialise les données JSON reçues.

        :param data: Données JSON à désérialiser
        :return: Dictionnaire Python contenant les données
        """
        return json.loads(data)

    def dump_data(self, data):
        """
        Sérialise les données en JSON.

        :param data: Dictionnaire Python contenant les données
        :return: Chaîne JSON
        """
        return json.dumps(data)
