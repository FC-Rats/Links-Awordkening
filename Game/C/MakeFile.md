# Il faut se placer à la racine du dossier C spécifique au moteur de score

## Creer le dictionnaire de l'arbre lexicographique (build_index_lex)
gcc "./sourcefiles/build_index_lex.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./exec_WINDOWS/build_index_lex"

.\exec_WINDOWS\build_index_lex.exe .\datafiles\word.bin .\datafiles\dic.lex

## Rechercher si un mot existe dans le dictionnaire (dictionnary_lookup)
gcc "./sourcefiles/dictionary_lookup.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./exec_WINDOWS/dictionary_lookup"

.\exec_WINDOWS\dictionary_lookup.exe .\datafiles\dic.lex hydrosolubilité

## Calculer la similarite orthographique (lev_similarity)
gcc "./sourcefiles/lev_similarity.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./exec_WINDOWS/lev_similarity"

.\exec_WINDOWS\lev_similarity.exe lapin mouton   

## Calculer la similarite semantique (sem_similarity)
gcc "./sourcefiles/lev_similarity.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./exec_WINDOWS/lev_similarity"

.\exec_WINDOWS\sem_similarity.exe .\datafiles\dic.lex normoxie attribution

## Creer le fichier de partie (new_game)
gcc "./sourcefiles/new_game.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./exec_WINDOWS/new_game"

.\exec_WINDOWS\new_game.exe .\datafiles\dic.lex cri lapin

## Ajouter un mot à la partie (add_word)
gcc "./sourcefiles/add_word.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./exec_WINDOWS/add_word"

.\exec_WINDOWS\add_word.exe .\datafiles\dic.lex lèvre