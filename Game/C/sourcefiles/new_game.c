#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/game.h"

int main(int argc, char *argv[]) {
    const char *dictionnary_filename;
    char *word1;
    char *word2;
    char *iduser;
    char *wordfile;

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n-BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        dictionnary_filename = "./datafiles/dic.lex";
        word1 = "chien";
        word2 = "chat"; 
        iduser = "./datafiles/game.txt";
        wordfile = "./datafiles/words.bin";
        printf("%s %s %s %s\n",dictionnary_filename,word1,word2,iduser);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <dico.lex> <word1> <word2> <(iduser)> <word2vec>\n");
        printf("where dico.lex le dictionnaire lexicographique, word1 le mot dentree, word2 le deuxieme mot dentree, iduser pour que chaque game soit par rapport a un id precis\n");
        exit(0);
    }
    else if (argc == 5){
        dictionnary_filename = argv[1];
        word1 = argv[2];
        word2 = argv[3];
        iduser = "./datafiles/game.txt";
        wordfile = "./datafiles/words.bin";
    } 
    else if (argc == 6){
        dictionnary_filename = argv[1];
        word1 = argv[2];
        word2 = argv[3];
        iduser = argv[4];
        wordfile = argv[5];
    }
    else {
        printf("Mauvais usage de la fonction \n");
        return ERROR_INVALID_INPUT; // Code d'erreur personnalisé
    }

    FILE* dictionnary = fopen(dictionnary_filename, "rb");
    if (!dictionnary) {
        perror("Erreur lors de l'ouverture du dictionnaire");
        printf("%s", dictionnary_filename);
        return EXIT_FAILURE;
    }

    StaticTreeWithOffset st = loadStaticTreeWithOffsetFromFile(dictionnary);

    int offset1 = searchWordInStaticTree(&st, word1);
    if (offset1 == -1){
        printf("Mot non trouvé dans le dictionnaire");
        exit(EXIT_FAILURE);
    }
    int offset2 = searchWordInStaticTree(&st, word2);
    if (offset2 == -1){
        printf("Mot non trouvé dans le dictionnaire");
        exit(EXIT_FAILURE);
    }
    //printf("idUser : %s \n word1 : %s\n word2: %s\n offset1 : %d\n offset2 : %d\n wordfile : %s\n", iduser, word1, word2, offset1, offset2, wordfile);
    writeToFileBeginGame(iduser, word1, word2,offset1,offset2,wordfile);

    return 0; 
}