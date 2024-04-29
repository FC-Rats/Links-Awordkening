#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/game.h"

int main(int argc, char *argv[]) {
    const char *dictionnary_filename;
    const char *word_to_lookup;

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n -BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        dictionnary_filename = "./datafiles/dic.lex";
        word_to_lookup = "lapin";
        printf("%s %s\n",dictionnary_filename,word_to_lookup);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <dico.lex> <word>\n");
        printf("where dico.lex le dictionnaire lexicogrpahique et word le mot a chercher dans le dictionnaire\n");
        exit(0);
    }
    else if (argc != 3) {
        printf("Mauvais usage de la fonction \n");
        return ERROR_INVALID_INPUT; // Code d'erreur personnalisé
    }
    else {
        dictionnary_filename = argv[1];
        word_to_lookup = argv[2];
    }

    // Ouverture du fichier .lex en mode lecture binaire
    FILE* dictionnary = fopen(dictionnary_filename, "rb");
    if (!dictionnary) {
        perror("Erreur lors de l'ouverture du dictionnaire");
        printf("%s", dictionnary_filename);
        return EXIT_FAILURE;
    }

    // Chargement de l'arbre statique depuis le fichier .lex
    StaticTreeWithOffset st = loadStaticTreeWithOffsetFromFile(dictionnary);

    int findedword = searchWordInStaticTree(&st, (unsigned char*)word_to_lookup);
    printf("\nMot %s trouve, son offset est de %i\n",word_to_lookup,findedword);

    fclose(dictionnary);

    return 0;
}