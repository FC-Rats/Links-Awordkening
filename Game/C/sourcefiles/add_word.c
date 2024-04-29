#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/game.h"

int main(int argc, char *argv[]) {
    const char *dictionnary_filename;
    char *word1;

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n -BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        dictionnary_filename = "./datafiles/dic.lex";
        word1 = "lapin";
        printf("%s %s\n",dictionnary_filename,word1);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <dico.lex> <word>\n");
        printf("where dico.lex le dictionnaire lexicogrpahique et word le mot a ajouter dans la partie\n");
        exit(0);
    }
    else if (argc != 3) {
        printf("Mauvais usage de la fonction \n");
        return ERROR_INVALID_INPUT; // Code d'erreur personnalisé
    }
    else {
        dictionnary_filename = argv[1];
        word1 = argv[2];
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

    addWordToFile("./datafiles/game.txt", word1,offset1);

    return 0; 
}
