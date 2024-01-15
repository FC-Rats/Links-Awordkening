#include "stdlib.h"
#include "stdio.h"
#include "assert.h"
#include "string.h"
#include "../headers/game.h"

int main(int argc, char * argv[]) {
    const char *dictionnary_filename;
    char *word1;
    char *word2;

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n -BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        dictionnary_filename = "./datafiles/dic.lex";
        word1 = "chien";
        word2 = "chat"; 
        printf("%s %s %s\n",dictionnary_filename,word1,word2);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <dico.lex> <word1> <word2>\n");
        printf("where dico.lex le dictionnaire lexicographique, word1 le mot n1 a comparer, word2 le mot n2 a comparer\n");
        exit(0);
    }
    else if (argc != 4) {
        printf("Mauvais usage de la fonction \n");
        return ERROR_INVALID_INPUT; // Code d'erreur personnalisé
    }
    else {
        dictionnary_filename = argv[1];
        word1 = argv[2];
        word2 = argv[3];
    }

    FILE* dictionnary = fopen(dictionnary_filename, "rb");
    if (!dictionnary) {
        perror("Erreur lors de l'ouverture du dictionnaire");
        printf("%s", dictionnary_filename);
        return EXIT_FAILURE;
    }
    StaticTreeWithOffset st = loadStaticTreeWithOffsetFromFile(dictionnary);

    int offsetword1 = searchWordInStaticTree(&st, word1);
    if (offsetword1 == -1){
        printf("Mot non trouvé dans le dictionnaire");
        exit(EXIT_FAILURE);
    }

    int offsetword2 = searchWordInStaticTree(&st, word2);
    if (offsetword2 == -1){
        printf("Mot non trouvé dans le dictionnaire");
        exit(EXIT_FAILURE);
    }

    printf("Score de similarite semantique : %0.2f\n",calculScalaire(offsetword1, offsetword2));

    return 0;
}
