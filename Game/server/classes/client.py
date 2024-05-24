# client.py

import json
from uuid import uuid4

class WebsocketClient:

    def __init__(self, server):
        self.server = server
        self.websocket = None
        self.nickname = "anonymous"
        self.id = uuid4()

    async def handler(self, websocket):
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
        if action == "send_data":
            await self.send_data(args)
        elif action == "join_chat":
            await self.join_chat()
        elif action == "send_message":
            await self.send_message(args)
        elif action == "leave_chat":
            await self.leave_chat()

    async def handle_game(self, action, args):
        if action == "create_game":
            await self.server.create_game(self.id, self.websocket, args.get('max_player'))
        elif action == "join_game":
            await self.server.join_game(self.id, args.get('game_code'))
        elif action == "leave_game":
            await self.server.leave_game(self.id)
        elif action == "add_word":
            await self.server.add_word(self.id, self.websocket, args.get('word'))

    async def send_data(self, args):
        nickname = args.get('nickname')
        if nickname:
            self.nickname = nickname
        id = args.get('id')
        if id :
            self.id = id

    async def join_chat(self):
        await self.websocket.send(self.dump_data({
            'action': 'join_chat',
            'args': {'return': 'success'}
        }))

    async def send_message(self, args):
        if self.nickname:
            message = args.get('message')
            if message:
                await self.server.send_to_all(self.id, self.dump_data({
                    'action': 'send_message',
                    'args': {'message': f"{self.nickname}: {message}"}
                }))

    async def leave_chat(self):
        if self.nickname:
            await self.websocket.send(self.dump_data({
                'action': 'leave_chat',
                'args': {'return': 'success'}
            }))
 
    def load_data(self, data):
        try:
            return json.loads(data)
        except json.JSONDecodeError:
            return None

    def dump_data(self, data):
        return json.dumps(data)