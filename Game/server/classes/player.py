# player.py

import subprocess
import re
import os

class Player: 

    def __init__(self, id) -> None:
        self.id = id
        self.score = 0
        self.attempts = 10
        self.word_chain = []
        self.chart = []

    async def add_word(self, word):
        rebase_path = "../../../"

        command = f"{rebase_path}C/executables/add_word {rebase_path}C/datafiles/dic.lex {word} {rebase_path}C/datafiles/{self.id}.lex {rebase_path}C/datafiles/words.bin"
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        if word in self.word_chain:
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot a déjà été utilisé !'}
            }
        elif re.search(r'\d', word):
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot ne doit pas contenir de nombres !'}
            }
        elif re.search(r'[^\w]', word, re.UNICODE):
            return {
                'action': 'add_word',
                'args': {'return': 'error', 'msg': 'Le mot ne doit pas contenir de caractères spéciaux !'}
            }
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

            command = f"cp {old_path} {new_path}"
            result = subprocess.run(command, shell=True, capture_output=True, text=True)

            if result.returncode == 0:
                command = f"java -jar {rebase_path}Java/target/ChainEngine-2.5.jar {self.id}"
                result = subprocess.run(command, shell=True, capture_output=True, text=True)

                if result.returncode == 0:
                    new_chart = []
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