# player.py
import subprocess
import re
import os

class Player : 

    def __init__(self, id) -> None:
        self.id = id
        self.score = 0
        self.attempts = 10
        self.word_chain = []
        self.chart = []

    async def add_word(self, word) :
        rebase_path = "../../../"

        command = rebase_path + "C/executables/add_word " + rebase_path + "C/datafiles/dic.lex " + word + " " + rebase_path + "C/datafiles/" + self.id + ".lex " + rebase_path + "C/datafiles/words.bin"
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
            
            old_path = rebase_path + "C/datafiles/" + self.id + ".txt"
            new_path = rebase_path + "Java/src/files/input" + self.id + ".txt"

            command = "cp " + old_path + " " + new_path
            result = subprocess.run(command, shell=True, capture_output=True, text=True)

            if result.returncode == 0 :
                command = "java -jar" + rebase_path + "Java/target/ChainEngine-2.5.jar " + self.id
                result = subprocess.run(command, shell=True, capture_output=True, text=True)

                if result.returncode == 0 :
                    if os.path.exists(new_path) and os.path.getsize(new_path) > 0:
                        with open(new_path, 'r') as file:
                            for line in file:
                                elements = line.strip().split(',')
                                if len(elements) > 1:
                                    new_entry = elements
                                    self.chart.append([new_entry[0], new_entry[1], int(float(new_entry[2]) * 100)])
                                else :
                                    score = line.strip().split(':')
                                    self.score = int(float(score[1]) * 100)

                        return {
                            'action': 'add_word',
                            'args': {'return': 'success', 'chart': self.chart, 'score': self.score}
                        }
                else :
                    return {
                        'action': 'add_word',
                        'args': {'return': 'error', 'msg': 'Le mot n\'existe pas ou est mal orthographié !'}
                    }
            else :
                return {
                    'action': 'add_word',
                    'args': {'return': 'error', 'msg': 'Le mot n\'existe pas ou est mal orthographié !'}
                }
