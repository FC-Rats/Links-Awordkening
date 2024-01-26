# Il faut se placer à la racine du dossier C spécifique au moteur de score

## Creer le dictionnaire de l'arbre lexicographique (build_index_lex)
gcc "./sourcefiles/build_index_lex.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./executables/build_index_lex"

./executables/build_index_lex ./datafiles/words.bin ./datafiles/dic.lex

## Rechercher si un mot existe dans le dictionnaire (dictionnary_lookup)
gcc "./sourcefiles/dictionary_lookup.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./executables/dictionary_lookup"

./executables/dictionary_lookup ./datafiles/dic.lex hydrosolubilité

## Calculer la similarite orthographique (lev_similarity)
gcc "./sourcefiles/lev_similarity.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./executables/lev_similarity"

./executables/lev_similarity lapin mouton   

## Calculer la similarite semantique (sem_similarity)
gcc "./sourcefiles/sem_similarity.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./executables/sem_similarity"

./executables/sem_similarity ./datafiles/dic.lex normoxie attribution

## Creer le fichier de partie (new_game)
gcc "./sourcefiles/new_game.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./executables/new_game"

./executables/new_game ./datafiles/dic.lex cri lapin

## Ajouter un mot à la partie (add_word)
gcc "./sourcefiles/add_word.c" "./sourcefiles/functions.c" -I"./headers" -lm -o "./executables/add_word"

./executables/add_word ./datafiles/dic.lex lèvre