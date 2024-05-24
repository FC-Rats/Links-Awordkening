# game.py

import asyncio
import random
from datetime import datetime, timedelta

class Game:

    def __init__(self, server, id, code, max_player) -> None:
        """
        Initialise une nouvelle partie.

        :param server: Instance du serveur WebSocket
        :param id: ID unique de la partie
        :param code: Code unique de la partie
        :param max_player: Nombre maximal de joueurs
        """
        self.id = id  # ID unique de la partie
        self.code = code  # Code unique de la partie
        self.server = server  # Instance du serveur WebSocket
        self.players = {}  # Dictionnaire des joueurs dans la partie
        # Exemple : {'client1_id': Player(client1_id), 'client2_id': Player(client2_id)}
        self.max_player = max_player  # Nombre maximal de joueurs
        self.turn_duration = timedelta(minutes=2)  # Durée d'un tour de jeu
        self.start_time = None  # Heure de début du jeu
        self.end_time = None  # Heure de fin du jeu
        self.game_started = False  # Indicateur si le jeu a commencé, ex: False

    async def handle_action(self, action):
        """
        Gère les actions de la partie.

        :param action: Action à effectuer
        """
        if action == "start_game":
            await self.start_game()
        elif action == "end_game":
            await self.end_game()

    async def start_game(self):
        """
        Démarre la partie.
        """
        self.game_started = True
        self.start_time = datetime.now()
        self.end_time = self.start_time + self.turn_duration
        asyncio.create_task(self.check_time())

        words_game = await self.get_start_words()
        for player in self.players.values():
            player.word_chain.extend(words_game)

        await self.server.send_to_all(self.id, self.server.dump_data({
            'action': 'start_game',
            'args': {'return': 'success'}
        }))

    async def check_time(self):
        """
        Vérifie le temps restant pour la partie.
        """
        while datetime.now() < self.end_time:
            await asyncio.sleep(10)
        await self.end_game()

    async def get_start_words(self):
        """
        Récupère une liste de mots de départ pour les joueurs.

        :return: Liste de mots de départ
        """
        word_list = [
            "chat", "chien", "cheval", "éléphant", "tigre", "lion", "girafe", "singe", "crocodile", "koala",
            "kangourou", "panda", "ours", "serpent", "perroquet", "poulet", "pingouin", "dauphin", "baleine"
        ]
        return random.sample(word_list, 2)  # Sélectionne 2 mots aléatoires de la liste

    async def end_game(self):
        """
        Termine la partie.
        """
        self.game_started = False
        await self.server.end_game(self.id)
