# classes/player.py

import subprocess
import shutil
import re
import os

from data.constants import get_string

class Player: 

    def __init__(self, server, id, game_id) -> None:
        """
        Initialise un nouveau joueur.

        :param id: ID unique du joueur
        """
        self.id = id  # ID unique du joueur
        self.server = server  # Instance du serveur WebSocket
        self.game_id = game_id # ID de la game dans lequel le joueur se trouve
        self.score = 0  # Score initial du joueur
        self.attempts = 10  # Nombre de tentatives restantes
        self.word_chain = []  # Liste des mots ajoutés par le joueur
        # Exemple : ['chat', 'chien']
        self.chart = []  # Liste des scores et chaînes de mots
        # Exemple : [['chat', 'chien', 80], ['chien', 'cheval', 90]]
        
    def to_json(self):
        return {
            'id': self.id,
        }
    
    async def add_word(self, word):
        """
        Ajoute un mot à la chaîne de mots du joueur.

        :param word: Mot à ajouter
        :return: Dictionnaire avec le résultat de l'ajout
        """
        if (self.attempts > 0):
            rebase_path = ".."  # Chemin de base pour les fichiers de données

            # Commande pour exécuter le programme d'ajout de mot
            command = f"{os.path.join(rebase_path, "C", "executables", "add_word")} {os.path.join(rebase_path, "C", "datafiles", "dic.lex")} {word} {os.path.join(rebase_path, "C", "datafiles", f"{self.id}.txt")} {os.path.join(rebase_path, "C", "datafiles", "words.bin")}"
            result = subprocess.run(command, shell=True, capture_output=True, text=True)

            # Vérification si le mot a déjà été utilisé
            if word in self.word_chain:
                return {
                    'action': 'add_word',
                    'args': {'return': 'warning', 'msg': get_string('word_already_use')}
                }
            # Vérification si le mot contient des chiffres
            elif re.search(r'\d', word):
                return {
                    'action': 'add_word',
                    'args': {'return': 'warning', 'msg': get_string('word_have_number')}
                }
            # Vérification si le mot contient des caractères spéciaux
            elif re.search(r'[^\w]', word, re.UNICODE):
                return {
                    'action': 'add_word',
                    'args': {'return': 'warning', 'msg': get_string('word_have_unicode')}
                }
            # Vérification si le mot n'existe pas ou est mal orthographié
            elif result.returncode == 1:
                return {
                    'action': 'add_word',
                    'args': {'return': 'warning', 'msg': get_string('word_not_correct')}
                }
            else:
                self.word_chain.append(word)
                self.attempts -= 1

                old_path = os.path.join(rebase_path, "C", "datafiles", f"{self.id}.txt")
                new_path = os.path.join(rebase_path, "Java", "src", "files", "input", f"{self.id}.txt")
                out_path = os.path.join(rebase_path, "Java", "src", "files", "output", f"{self.id}.txt")

                # Commande pour copier le fichier
                try:
                    shutil.copy(old_path, new_path)
                    print(f"Fichier copié de {old_path} à {new_path}")
                except Exception as e:
                    print(f"Erreur lors de la copie du fichier: {e}")

                # Commande pour exécuter le moteur de chaîne
                command = f"java -jar {os.path.join(rebase_path, "Java", "target", "ChainEngine-2.5.jar")} {str(self.id)}"
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
                                    new_score = int(float(score[1]) * 100)
                                    if new_score > self.score:
                                        await self.server.send_to_all(self.id, self.server.dump_data({
                                            'action': 'new_score',
                                            'args': {'return': 'success', 'msg': get_string('new_score_enemy'), 'player': self.id, 'score': new_score, 'word' : word}
                                        }))
                                    self.score = new_score

                        # Vérification si le mot ajouté est entré dans la chaine
                        if new_chart == self.chart:
                            return {
                                'action': 'new_score',
                                'args': {'return': 'error', 'msg': get_string('word_not_better'), 'player': self.id, 'word' : word, 'coups' : self.attempts}
                            }
                        else:
                            self.chart = new_chart
                            return {
                                'action': 'add_word',
                                'args': {'return': 'success', 'chart': self.chart, 'score': self.score, 'msg': get_string('new_score_reached', score= self.score)}
                            }
        else:
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': get_string('no_attempts_left')}
            }