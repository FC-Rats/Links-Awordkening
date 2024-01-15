#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>
#include "../headers/game.h"

int main(int argc, char *argv[]) {
    const char *word2vec_filename;
    const char *lex_filename;

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n -BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        word2vec_filename = "./datafiles/words.bin";
        lex_filename = "./datafiles/dic.lex";
        printf("%s %s\n",word2vec_filename,lex_filename);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <fichier_word2vec.bin> <dico.lex>\n");
        printf("where fichier_word2vec.bin le fichier bin au modele word2vec, dico.lex le chemin du dictionnaire lexicogrpahique\n");
        exit(0);
    }
    else if (argc != 3) {
        printf("Mauvais usage de la fonction \n");
        return ERROR_INVALID_INPUT; // Code d'erreur personnalisé
    }
    else {
        word2vec_filename = argv[1];
        lex_filename = argv[2];
    }

    setlocale(LC_ALL, "");

    // Construire le dictionnaire Word2Vec à partir du fichier binaire
    CSTree word2vec_dictionary = buildWord2VecDictionaryFromFile(word2vec_filename);
    
    StaticTreeWithOffset st =  exportStaticTreeWithOffset(word2vec_dictionary);

    exportTreeToFile(word2vec_dictionary, lex_filename);
    
    printf("Arbre lexicographique dans %s.\n", lex_filename);

    return 0;
}
