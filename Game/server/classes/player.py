# player.py

import subprocess
import re
import os

class Player: 

    def __init__(self, id) -> None:
        """
        Initialise un nouveau joueur.

        :param id: ID unique du joueur
        """
        self.id = id  # ID unique du joueur
        self.score = 0  # Score initial du joueur
        self.attempts = 10  # Nombre de tentatives restantes
        self.word_chain = []  # Liste des mots ajoutés par le joueur
        # Exemple : ['chat', 'chien']
        self.chart = []  # Liste des scores et chaînes de mots
        # Exemple : [['chat', 'chien', 80], ['chien', 'cheval', 90]]

    async def add_word(self, word):
        """
        Ajoute un mot à la chaîne de mots du joueur.

        :param word: Mot à ajouter
        :return: Dictionnaire avec le résultat de l'ajout
        """
        rebase_path = "../../../"  # Chemin de base pour les fichiers de données

        # Commande pour exécuter le programme d'ajout de mot
        command = f"{rebase_path}C/executables/add_word {rebase_path}C/datafiles/dic.lex {word} {rebase_path}C/datafiles/{self.id}.lex {rebase_path}C/datafiles/words.bin"
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        # Vérification si le mot a déjà été utilisé
        if word in self.word_chain:
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot a déjà été utilisé !'}
            }
        # Vérification si le mot contient des chiffres
        elif re.search(r'\d', word):
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot ne doit pas contenir de nombres !'}
            }
        # Vérification si le mot contient des caractères spéciaux
        elif re.search(r'[^\w]', word, re.UNICODE):
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot ne doit pas contenir de caractères spéciaux !'}
            }
        # Vérification si le mot n'existe pas ou est mal orthographié
        elif result.returncode == 1:
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot n\'existe pas ou est mal orthographié !'}
            }
        else:
            self.word_chain.append(word)
            self.attempts -= 1

            old_path = f"{rebase_path}C/datafiles/{self.id}.txt"
            new_path = f"{rebase_path}Java/src/files/input{self.id}.txt"

            # Commande pour copier le fichier
            command = f"cp {old_path} {new_path}"
            result = subprocess.run(command, shell=True, capture_output=True, text=True)

            if result.returncode == 0:
                # Commande pour exécuter le moteur de chaîne
                command = f"java -jar {rebase_path}Java/target/ChainEngine-2.5.jar {self.id}"
                result = subprocess.run(command, shell=True, capture_output=True, text=True)

                if result.returncode == 0:
                    new_chart = []

                    # Lecture du fichier crée par le Java
                    if os.path.exists(new_path) and os.path.getsize(new_path) > 0:
                        with open(new_path, 'r') as file:
                            for line in file:
                                elements = line.strip().split(',')
                                if len(elements) > 1:
                                    new_entry = elements
                                    new_chart.append([new_entry[0], new_entry[1], int(float(new_entry[2]) * 100)])
                                else:
                                    score = line.strip().split(':')
                                    new_score = int(float(score[1]) * 100)
                                    if new_score > self.score:
                                        await self.server.send_to_all(self.id, self.dump_data({
                                            'action': 'add_word',
                                            'args': {'return': 'success', 'msg': 'Un joueur a obtenu un meilleur score !', 'player': self.id, 'score': new_score}
                                        }))
                                    self.score = new_score

                        # Vérification si le mot ajouté est entré dans la chaine
                        if new_chart == self.chart:
                            return {
                                'action': 'add_word',
                                'args': {'return': 'error', 'msg': 'Le mot que vous avez rentré n\'a pas amélioré votre score :c'}
                            }
                        else:
                            self.chart = new_chart
                            return {
                                'action': 'add_word',
                                'args': {'return': 'success', 'chart': self.chart, 'score': self.score}
                            }
                else:
                    return {
                        'action': 'add_word',
                        'args': {'return': 'error', 'msg': 'Erreur lors de l\'exécution du moteur de chaîne.'}
                    }
            else:
                return {
                    'action': 'add_word',
                    'args': {'return': 'error', 'msg': 'Erreur lors de la copie du fichier.'}
                }
