#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/game.h"

int main(int argc, char *argv[]) {
    char *dictionnary_filename;
    char *word1;
    char *iduser;
    char *wordfile;

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n -BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        dictionnary_filename = "./datafiles/dic.lex";
        word1 = "lapin";
        iduser = "./datafiles/game.txt";
        wordfile = "./datafiles/words.bin";
        printf("%s %s %s\n",dictionnary_filename,word1);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <dico.lex> <word> <(iduser)>\n");
        printf("where dico.lex le dictionnaire lexicogrpahique et word le mot a ajouter dans la partie, iduser pour que chaque game soit par rapport a un id precis\n");
        exit(0);
    }
    else if (argc == 4){
        dictionnary_filename = argv[1];
        word1 = argv[2];
        iduser = "./datafiles/game.txt";
        wordfile = "./datafiles/words.bin";
    } 
    else if (argc == 5){
        dictionnary_filename = argv[1];
        word1 = argv[2];
        iduser = argv[3];
        wordfile = argv[4];
        //printf("dictionnary_filename : %s \n word1 : %s\n iduser: %s\n wordfile : %s\n", argv[1], argv[2], argv[3], argv[4]);
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
        // return 1;
        exit(EXIT_FAILURE);
    }

    printf("dictionnary_filename : %s \n word1 : %s\n iduser: %s\n wordfile : %s\n", dictionnary_filename, word1, iduser, wordfile);
    addWordToFile(iduser, word1,offset1,wordfile, dictionnary_filename);

    return 0; 
}