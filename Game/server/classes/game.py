# game.py

import asyncio
import random
from datetime import datetime, timedelta

class Game:

    def __init__(self, server, id, code, max_player) -> None:
        self.id = id
        self.code = code 
        self.server = server
        self.players = {}  # {id_joueur : class Player}
        self.max_player = max_player
        self.turn_duration = timedelta(minutes=2)
        self.start_time = None
        self.end_time = None
        self.game_started = False

    async def handle_action(self, action):
        if action == "start_game":
            await self.start_game()
        elif action == "end_game":
            await self.end_game()

    async def start_game(self):
        self.game_started = True
        self.start_time = datetime.now()
        self.end_time = self.start_time + self.turn_duration
        asyncio.create_task(self.check_time())

        words_game = await self.get_start_words()
        for player in self.players.values():
            player.word_chain.extend(words_game)

    async def check_time(self):
        while datetime.now() < self.end_time:
            await asyncio.sleep(10)
        await self.end_game()

    async def get_start_words(self):
        word_list = ["chat", "chien", "cheval", "éléphant", "tigre", "lion", "girafe", "singe", "crocodile", "koala", "kangourou", "panda", "ours", "serpent", "perroquet", "poulet", "pingouin", "dauphin", "baleine"]
        return random.sample(word_list, 2)

    async def end_game(self):
        self.game_started = False
        await self.server.end_game(self.id)