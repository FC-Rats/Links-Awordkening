# game.py

import os
import subprocess
import shutil
import asyncio
import random
from datetime import datetime, timedelta

class Game:

    def __init__(self, server, id_client, id, code, max_player, game_name) -> None:
        """
        Initialise une nouvelle partie.

        :param server: Instance du serveur WebSocket
        :param id: ID unique de la partie
        :param code: Code unique de la partie
        :param max_player: Nombre maximal de joueurs
        """
        self.id = id  # ID unique de la partie
        self.host = id_client
        self.code = code  # Code unique de la partie
        self.server = server  # Instance du serveur WebSocket
        self.players = {}  # Dictionnaire des joueurs dans la partie
        self.game_name = game_name # Nom de la partie
        # Exemple : {'client1_id': Player(client1_id), 'client2_id': Player(client2_id)}
        self.max_player = max_player  # Nombre maximal de joueurs
        self.turn_duration = timedelta(minutes=3)  # Durée d'un tour de jeu
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

        words_game = await self.get_start_words()
        rebase_path = ".."  # Chemin de base pour les fichiers de données

        for player in self.players.values():
            player.word_chain.extend(words_game)
            command = f"{os.path.join(rebase_path, "C", "executables", "new_game")} {os.path.join(rebase_path, "C", "datafiles", "dic.lex")} {words_game[0]} {words_game[1]} {os.path.join(rebase_path, "C", "datafiles", f"{player.id}.txt")} {os.path.join(rebase_path, "C", "datafiles", "words.bin")}"
            result = subprocess.run(command, shell=True, capture_output=True, text=True)

            if result.returncode == 0:
                old_path = os.path.join(rebase_path, "C", "datafiles", f"{player.id}.txt")
                new_path = os.path.join(rebase_path, "Java", "src", "files", "input", f"{player.id}.txt")
                out_path = os.path.join(rebase_path, "Java", "src", "files", "output", f"{player.id}.txt")

                try:
                    shutil.copy(old_path, new_path)
                    print(f"Fichier copié de {old_path} à {new_path}")
                except Exception as e:
                    print(f"Erreur lors de la copie du fichier: {e}")

                # Commande pour exécuter le moteur de chaîne
                command = f"java -jar {os.path.join(rebase_path, "Java", "target", "ChainEngine-3.0.jar")} {str(player.id)}"
                result = subprocess.run(command, shell=True, capture_output=True, text=True)

                if result.returncode == 0:
                    new_chart = []

                    # Lecture du fichier crée par le Java
                    if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
                        with open(out_path, 'r') as file:
                            for line in file:
                                elements = line.strip().split(',')
                                if len(elements) > 1:
                                    new_entry = elements
                                    new_chart.append([new_entry[0], new_entry[1], int(float(new_entry[2]) * 100)])
                                else:
                                    score = line.strip().split(':')
                                    player.score = int(float(score[1]) * 100)
                                    player.score = player.score

                        player.chart = new_chart
        
        await self.server.send_to_all(self.host, self.server.dump_data({
            'action': 'start_game',
            'args': {
                'return': 'success',
                'chart': self.players.get(self.host).chart,
                'score': self.players.get(self.host).score,
                'players' : list(self.players.keys()),
                'end_time': self.end_time.isoformat()
            }
        }), True)

        asyncio.create_task(self.check_time())

    async def check_time(self):
        """
        Vérifie le temps restant pour la partie.
        """
        while datetime.now() < self.end_time:
            if await self.check_all_attempts_exhausted():
                await self.end_game()
                return
            await asyncio.sleep(5)
        await self.end_game()

    async def get_start_words(self):
        """
        Récupère une liste de mots de départ pour les joueurs.

        :return: Liste de mots de départ
        """
        word_list = [
            "chat", "framboise", "astronaute", "ministre", "balnéaire", "réveil", "fil",
            "renforcer", "orchestre", "tableau", "wagon", "argentin", "baliverne", "tirelire",
            "alcool", "tour", "badminton", "médaillon", "bandoulière", "gladiateur",
            "misanthrope", "opticien", "tintinnabuler", "amitié", "rafistolage"
        ]
        return random.sample(word_list, 2)  # Sélectionne 2 mots aléatoires de la liste

    async def end_game(self):
        """
        Termine la partie.
        """
        self.game_started = False
        await self.server.end_game(str(self.id))

    async def check_all_attempts_exhausted(self):
        """
        Vérifie si tous les joueurs ont épuisé leurs tentatives.

        :return: True si tous les joueurs ont épuisé leurs tentatives, sinon False
        """
        return all(player.attempts == 0 for player in self.players.values())
