#include "stdlib.h"
#include "stdio.h"
#include "assert.h"
#include "string.h"
#include "../headers/game.h"

int main(int argc, char * argv[]) {
    char S[100];
    char T[100];

    if (argc == 1){
        printf("Ce programme a ete code par la team FC RATS:\n -BREDEAU Kellian\n-CHEVALIER Helena\n-COUTELLIER Loelia\n-DESSERTENNE Leo\nLancement d'une fonction de test avec les arguments :\n");
        strcpy(S, "chat");
        strcpy(T, "chien");
        printf("%s %s\n",S,T);
    }
    else if (argc==2 && strcmp("--help", argv[1])==0){
        printf("Usage: exec <word1> <word2>\n");
        printf("where word1 mot a comparer, word2 le deuxieme mot a comparer\n");
        exit(0);
    }
    else if (argc != 3) {
        printf("Mauvais usage de la fonction \n");
        return ERROR_INVALID_INPUT; // Code d'erreur personnalisé
    }
    else {
        strcpy(S, argv[1]);
        strcpy(T, argv[2]);
    }

    printf("Score de similarite orthographique : %0.2f\n",levenshtein(S, T)); // FLOAT
    return 0;
}
