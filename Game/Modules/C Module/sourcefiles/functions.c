#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include <ctype.h>
#include <math.h>
#include <wchar.h>
#include <assert.h>
#include "../headers/game.h"


/*
    =======================================

            fonctions
            Construction d'un CSTREE

    =======================================
*/

/**
 * @brief Alloue un nouveau noeud pour un CSTree.
 * 
 * @param elem Valeur de l'élément du noeud.
 * @param firstChild Premier enfant du noeud.
 * @param nextSibling Prochain frère du noeud.
 * @param offset Offset associé au noeud.
 * @return CSTree Nouveau noeud alloué.
 */
CSTree newCSTree(Element elem, CSTree firstChild, CSTree nextSibling, int offset){
    CSTree t = malloc(sizeof(Node));
    if (t == NULL)
        exit(EXIT_FAILURE);
    t->elem = elem;
    t->firstChild = firstChild;
    t->nextSibling = nextSibling;
    t->offset = offset;
    return t;
}

/**
 * @brief Compte le nombre de noeuds dans l'arbre t.
 * 
 * @param t Arbre dont on veut calculer la taille.
 * @return int Nombre de noeuds dans l'arbre.
 */
int size(CSTree t){
    if (t == NULL)
        return 0;
    return 1 + size(t->firstChild) + size(t->nextSibling);
}

/**
 * @brief Compte le nombre de frères du nœud child.
 * 
 * @param child Noeud dont on veut compter les frères.
 * @return int Nombre de frères du nœud.
 */
int nSiblings(CSTree child){
    if (child == NULL)
        return 0;
    return nSiblings(child->nextSibling) + 1;
}

/**
 * @brief Compte le nombre d'enfants du nœud t.
 * 
 * @param t Noeud dont on veut compter les enfants.
 * @return int Nombre d'enfants du nœud.
 */
int nChildren(CSTree t){
    if (t == NULL || t->firstChild == NULL)
        return 0;
    return nSiblings(t->firstChild);
}

/**
 * @brief Renvoie le premier frère de *t contenant e.
 *        Un nouveau noeud est créé s'il est absent.
 * 
 * @param t Pointeur vers le noeud.
 * @param e Valeur de l'élément recherché.
 * @param offset Offset associé au nouveau noeud s'il est créé.
 * @return CSTree Premier frère contenant l'élément e.
 */
CSTree sortContinue(CSTree *t, Element e, int offset){
    if (*t != NULL && (*t)->elem < e)
        return sortContinue(&((*t)->nextSibling), e, offset);
    else if (*t != NULL && (*t)->elem == e)
        return *t;
    else
    {
        (*t) = newCSTree(e, NULL, *t, offset);
        return *t;
    }
}

/**
 * @brief Recherche l'élément e parmi les éléments consécutifs de t aux positions from,..., from+len-1.
 *        Renvoie la position de cet élément s'il existe, NONE sinon.
 *        Si len=NONE, parcourir la cellule from et tous ses frères suivants.
 *        Cette fonction peut être itérative.
 * 
 * @param st Structure StaticTreeWithOffset contenant un tableau de nœuds.
 * @param e Valeur de l'élément recherché.
 * @param from Position de départ dans le tableau.
 * @param len Nombre d'éléments à rechercher à partir de la position de départ.
 * @return int Position de l'élément s'il est trouvé, NONE sinon.
 */
int siblingLookupStatic(StaticTreeWithOffset *st, Element e, int from, int len){
    if (len == NONE){
        len = st->nodeArray[from].nSiblings + 1;
        //printf("Lettre %c nsblings : %d\n", st->nodeArray[from].elem, len);
    }
    for (int i = from; i < from + len; i++){
        //printf("searched : %c = %c ", st->nodeArray[i].elem, e);
        //printf(" equal : %i\n", e == st->nodeArray[i].elem);
        if (st->nodeArray[i].elem == e)
        {
            //printf("Lettre %c enfant : %d\n", st->nodeArray[i].elem, st->nodeArray[i].firstChild);
            return st->nodeArray[i].firstChild;
        }
    }
    return NONE;
}


/*
    =======================================

            fonctions
                Lexico

    =======================================
*/

/**
 * @brief Retourne la longueur en octets d'un caractère UTF-8 à partir de son premier octet.
 * 
 * @param first_byte Premier octet du caractère UTF-8.
 * @return int Longueur en octets du caractère UTF-8. -1 si le format est invalide.
 */
int utf8_char_length(unsigned char first_byte)
{
    if ((first_byte & 0x80) == 0)
    {
        return 1;
    }
    else if ((first_byte & 0xE0) == 0xC0)
    {
        return 2;
    }
    else if ((first_byte & 0xF0) == 0xE0)
    {
        return 3;
    }
    else if ((first_byte & 0xF8) == 0xF0)
    {
        return 4;
    }
    else
    {
        // Invalid UTF-8
        return -1;
    }
}

/**
 * @brief Convertit un caractère UTF-8 en un caractère large (wchar_t).
 * 
 * @param word Pointeur vers le premier octet du caractère UTF-8.
 * @param char_length Longueur en octets du caractère UTF-8.
 * @return wchar_t Caractère large résultant de la conversion.
 */
wchar_t convertUtf8(wchar_t *word, int char_length)
{
    wchar_t combinedWord;
    if (char_length == 1)
    {
        combinedWord = (wchar_t)(*word);
    }
    else if (char_length == 2)
    {
        combinedWord = ((wchar_t)(*word & 0x1F) << 6) | (wchar_t)(*(word + 1) & 0x3F);
    }
    else
    {
        combinedWord = L'\0';
    }
    return combinedWord;
}


/**
 * @brief Insère un mot dans un arbre CSTree.
 * 
 * @param t Arbre dans lequel insérer le mot.
 * @param mot Mot à insérer.
 * @param offset Offset associé au mot.
 * @return CSTree Arbre mis à jour après l'insertion.
 */
CSTree insert(CSTree t, const char *mot, int offset)
{
    CSTree currentNode = t;
    wchar_t wideMot[50];
    mbstowcs(wideMot, mot, 50);
    wchar_t wide; 

    for (int i = 0; wideMot[i] != '\0'; i++)
    {
        int char_length = utf8_char_length(wideMot[i]);
        wide = convertUtf8(&wideMot[i], char_length);

        if (i == 0)
        {
            currentNode = sortContinue(&currentNode, towlower(wide), -1);
        }
        else
        {
            currentNode = sortContinue(&(currentNode->firstChild), towlower(wide), -1);
        }
        i += char_length - 1;
    }

    currentNode->firstChild = sortContinue(&(currentNode->firstChild), '\0', offset);

    return t;
}

/**
 * @brief Remplit un tableau de cellules d'arbre statique avec les informations d'un arbre CSTree.
 * 
 * @param st Structure StaticTreeWithOffset à remplir.
 * @param t Arbre CSTree source.
 * @param index_for_t Index de départ dans le tableau.
 * @param nSiblings Nombre de frères du nœud actuel.
 * @param reserved_cells Pointeur vers le nombre de cellules réservées.
 */
void fill_array_cells_with_offset(StaticTreeWithOffset *st, CSTree t, int index_for_t, int nSiblings, int *reserved_cells)
{
    if (t == NULL)
        return;

    int firstChildIndex;
    if (t->firstChild != NULL)
        firstChildIndex = *reserved_cells;
    else
        firstChildIndex = NONE;

    st->nodeArray[index_for_t].elem = t->elem;
    st->nodeArray[index_for_t].firstChild = firstChildIndex;
    st->nodeArray[index_for_t].nSiblings = nSiblings;
    st->nodeArray[index_for_t].offset = t->offset;

    *reserved_cells += (t->firstChild != NULL) ? nChildren(t) : 0;

    if (t->firstChild != NULL)
    {
        fill_array_cells_with_offset(st, t->firstChild, firstChildIndex, nChildren(t) - 1, reserved_cells);
    }
    if (t->nextSibling != NULL)
    {
        fill_array_cells_with_offset(st, t->nextSibling, index_for_t + 1, nSiblings - 1, reserved_cells);
    }
}

/**
 * @brief Exporte un arbre CSTree vers une structure StaticTreeWithOffset.
 * 
 * @param t Arbre CSTree à exporter.
 * @return StaticTreeWithOffset Structure statique résultante.
 */
StaticTreeWithOffset exportStaticTreeWithOffset(CSTree t)
{
    StaticTreeWithOffset st = {NULL, 0};
    int reserved_cells = 0;
    st.nNodes = size(t);
    st.nodeArray = malloc(st.nNodes * sizeof(ArrayCellWithOffset));

    if (st.nodeArray == NULL)
    {
        printf("Erreur lors de l'allocation mémoire pour l'arbre statique.\n");
        exit(ERROR_WRITE_FILE);
    }

    reserved_cells = nSiblings(t);
    fill_array_cells_with_offset(&st, t, 0, reserved_cells - 1, &reserved_cells);

    if (reserved_cells != st.nNodes && t != NULL)
    {
        printf("Erreur lors de la création de l'arbre statique, taille finale incorrecte\n");
        exit(ERROR_WRITE_FILE);
    }

    return st;
}

/**
 * @brief Exporte une structure StaticTreeWithOffset vers un fichier binaire.
 * 
 * @param st Structure StaticTreeWithOffset à exporter.
 * @param filename Nom du fichier de destination.
 */
void exportStaticTreeWithOffsetToFile(StaticTreeWithOffset *st, const char *filename)
{
    FILE *file = fopen(filename, "wb");

    if (file == NULL)
    {
        perror("Erreur lors de l'ouverture du fichier");
        exit(ERROR_WRITE_FILE);
    }

    fwrite(&(st->nNodes), sizeof(int), 1, file);
    fwrite(st->nodeArray, sizeof(ArrayCellWithOffset), st->nNodes, file);
    fclose(file);
}

/**
 * @brief Construit un dictionnaire Word2Vec à partir d'un fichier binaire.
 * 
 * @param filename Nom du fichier binaire Word2Vec.
 * @return CSTree Arbre CSTree représentant le dictionnaire Word2Vec.
 */
CSTree buildWord2VecDictionaryFromFile(const char *filename)
{
    CSTree dictionary = newCSTree('@', NULL, NULL, -1);

    FILE *file = fopen(filename, "rb");
    if (!file)
    {
        perror("Erreur lors de l'ouverture du fichier Word2Vec");
        printf("%s", filename);
        exit(ERROR_FILE_NOT_FOUND);
    }

    long long words;
    long long max_w = 80;
    int size; // Ajout de la déclaration de size
    float *M;
    char *vocab;

    fscanf(file, "%lld", &words);
    fscanf(file, "%d", &size); // Correction du format de la taille

    vocab = (char *)malloc(words * max_w * sizeof(char));
    M = (float *)malloc(words * size * sizeof(float));

    if (vocab == NULL || M == NULL)
    {
        printf("Erreur lors de l'allocation mémoire pour le dictionnaire Word2Vec\n");
        exit(EXIT_FAILURE);
    }

    for (int b = 0; b < words; b++)
    {
        int a = 0;
        while (1)
        {
            vocab[b * max_w + a] = fgetc(file);
            if (feof(file) || (vocab[b * max_w + a] == ' '))
                break;
            if ((a < max_w) && (vocab[b * max_w + a] != '\n'))
                a++;
        }
        vocab[b * max_w + a] = 0;
        
        dictionary = insert(dictionary, vocab + b * max_w, ftell(file));

        for (a = 0; a < size; a++)
            fread(&M[a + b * size], sizeof(float), 1, file);

        // Insertion du mot dans l'arbre
        //printf("%s %i\n",vocab + b * max_w,ftell(file));
    }
    // printPrefix(dictionary);
    fclose(file);

    free(vocab);
    free(M);

    return dictionary;
}

/**
 * @brief Exporte un arbre CSTree vers un fichier binaire représentant l'arbre statique.
 * 
 * @param t Arbre CSTree à exporter.
 * @param filename Nom du fichier de destination.
 */
void exportTreeToFile(CSTree t, const char *filename)
{
    StaticTreeWithOffset st = exportStaticTreeWithOffset(t);
    exportStaticTreeWithOffsetToFile(&st, filename);
}

/**
 * @brief Charge une structure StaticTreeWithOffset depuis un fichier binaire.
 * 
 * @param file Fichier binaire contenant la structure à charger.
 * @return StaticTreeWithOffset Structure chargée depuis le fichier.
 */
StaticTreeWithOffset loadStaticTreeWithOffsetFromFile(FILE *file)
{
    StaticTreeWithOffset st;

    fread(&(st.nNodes), sizeof(int), 1, file);

    st.nodeArray = malloc(st.nNodes * sizeof(ArrayCellWithOffset));
    if (st.nodeArray == NULL)
    {
        perror("Erreur lors de l'allocation mémoire pour l'arbre statique");
        exit(EXIT_FAILURE);
    }

    fread(st.nodeArray, sizeof(ArrayCellWithOffset), st.nNodes, file);

    return st;
}

/**
 * @brief Recherche un mot dans un arbre statique.
 * 
 * @param st Structure StaticTreeWithOffset dans laquelle effectuer la recherche.
 * @param word Mot à rechercher.
 * @return int Offset associé au mot s'il est trouvé, -1 sinon.
 */
int searchWordInStaticTree(StaticTreeWithOffset *st, const char *word)
{
    int i = 0;
    int from = 1;
    wchar_t wide; 
    do
    {
        mbstowcs(&wide, &word[i], 1);
        from = siblingLookupStatic(st, wide, from, NONE);
        //printf("Debug: i=%d, lowerlettre=%c, from=%d\n", i, wide, from);
        i++;
    } while (word[i] != '\0' && from != NONE);

    //printf("Debug: Final from=%d\n", from);
    //printf("%i", st->nodeArray[from].offset);

    if (from != NONE)
    {
        return st->nodeArray[from].offset;
    }
    else
    {
        return -1;
    }
}

/*
    =======================================

            fonctions
            Calculer Similarité

    =======================================
*/

/**
 * @brief Retourne le minimum entre deux entiers.
 * 
 * @param a Premier entier.
 * @param b Deuxième entier.
 * @return int Le minimum entre a et b.
 */
int min(int a, int b) {
    return a < b ? a : b;
}

/**
 * @brief Retourne le maximum entre deux valeurs en double.
 * 
 * @param a Première valeur.
 * @param b Deuxième valeur.
 * @return double Le maximum entre a et b.
 */
double max(double a, double b) {
    return a > b ? a : b;
}

/**
 * @brief Initialise un tableau pour des chaînes d'une taille donnée.
 * 
 * @param lenS Taille de la première chaîne.
 * @param lenT Taille de la deuxième chaîne.
 * @return LevArray Structure LevArray initialisée.
 */
LevArray init(int lenS, int lenT) {
    LevArray a;
    a.lenS = lenS;
    a.lenT = lenT;
    a.tab = malloc(lenS * lenT * sizeof(int));
    assert(a.tab != NULL); 
    return a;
}

/**
 * @brief Insère une valeur dans le tableau LevArray.
 * 
 * @param a Structure LevArray.
 * @param indexS Indice de la première chaîne.
 * @param indexT Indice de la deuxième chaîne.
 * @param val Valeur à insérer.
 */
void set(LevArray a, int indexS, int indexT, int val) {
    assert(indexS >= 0 && indexS < a.lenS && indexT >= 0 && indexT < a.lenT);
    assert(a.tab!=NULL); 
    a.tab[indexT * a.lenS + indexS] = val;
}

/**
 * @brief Renvoie la valeur correspondant à des indices donnés dans le tableau LevArray.
 * 
 * @param a Structure LevArray.
 * @param indexS Indice de la première chaîne.
 * @param indexT Indice de la deuxième chaîne.
 * @return int Valeur du tableau LevArray.
 */
int get(LevArray a, int indexS, int indexT) {
    if (indexS == -1) {
        return indexT + 1;
    }
    else if (indexT == -1) {
        return indexS + 1;
    }
    else {
        return a.tab[indexT * a.lenS + indexS];
    }
}

/**
 * @brief Calcule la distance de Levenshtein entre deux chaînes.
 * 
 * @param S Première chaîne.
 * @param T Deuxième chaîne.
 * @return double Distance de Levenshtein normalisée entre 0 et 1.
 */
double levenshtein(char * S, char * T) {
    LevArray a = init(strlen(S), strlen(T));
    
    for (int i=0;i<a.lenS;i++) {
        for (int j=0;j<a.lenT;j++) {
            int p;
            if(S[i]==T[j])  {
                p=get(a,i-1,j-1);
            }
            else {
                p=get(a,i-1,j-1)+1;
            }  
            set(a, i, j, min(min(p,get(a,i-1,j)+1),get(a,i,j-1)+1));
        }
    }

    int max = strlen(S) > strlen(T) ? strlen(S) : strlen(T);
    int distance = (get(a,strlen(S)-1, strlen(T)-1));
    //printf("distance = %d - %d - %f\n", max, distance, ((double)distance / max));
    return (1.0 - ((double)distance / max));
}

/**
 * @brief Calcule le produit scalaire normalisé entre deux vecteurs.
 * 
 * @param offsetword1 Offset du premier mot dans le fichier Word2Vec.
 * @param offsetword2 Offset du deuxième mot dans le fichier Word2Vec.
 * @return double Produit scalaire normalisé entre -1 et 1.
 */
double calculScalaire(int offsetword1,int offsetword2){ 
    FILE *file = fopen("datafiles/words.bin", "rb");
    if (!file)
    {
        perror("Erreur lors de l'ouverture du fichier Word2Vec");
        exit(ERROR_FILE_NOT_FOUND);
    }
    float *vecteur1 = malloc(MAX_SIZE * sizeof(float));
    float *vecteur2 = malloc(MAX_SIZE * sizeof(float));
    int a;

    //inspiré du code de distance.c
    fseek(file,offsetword1,SEEK_SET);
    for (a = 0; a < MAX_SIZE; a++){
        fread(&vecteur1[a], sizeof(float), 1, file);
        //printf("%f\t",vecteur1[a]);
    }
    fseek(file,offsetword2,SEEK_SET);
    for (a = 0; a < MAX_SIZE; a++){
        fread(&vecteur2[a], sizeof(float), 1, file);
        //printf("%f\t",vecteur2[a]);
    }

    double len1 = 0;
    double len2 = 0;
    double produit = 0;

    for (a = 0; a < MAX_SIZE; a++){
        len1 += vecteur1[a] * vecteur1[a];
    } 
    for (a = 0; a < MAX_SIZE; a++){
        len2 += vecteur2[a] * vecteur2[a];
    } 
    
    // Norme vecteurs
    len1 = sqrt(len1); //Norme U
    len2 = sqrt(len2); //Norme V
    for (a = 0; a < MAX_SIZE; a++) produit += vecteur1[a] * vecteur2[a];

    //printf("len1: %f, len2: %f produit: %f\n", len1, len2, produit);
    //printf("score: %0.2f\n", (produit / (len1 * len2)));
    return produit / (len1 * len2);
}

/**
 * @brief Calcule la similarité entre deux mots ou vecteurs.
 * 
 * @param word1 Premier mot ou chaîne.
 * @param word2 Deuxième mot ou chaîne.
 * @param offset1 Offset du premier mot dans le fichier Word2Vec.
 * @param offset2 Offset du deuxième mot dans le fichier Word2Vec.
 * @return double Score de similarité normalisé entre 0 et 1.
 */
double calculSimilarity(char *word1, char *word2, int offset1, int offset2){
    double calcul = max(levenshtein(word1,word2),calculScalaire(offset1,offset2));
    return calcul;
}

/*
    =======================================

            fonctions
            FICHIERS DE PARTIE

    =======================================
*/

/**
 * @brief Écrit les informations initiales du jeu dans un fichier.
 * 
 * @param filename Nom du fichier.
 * @param word1 Premier mot.
 * @param word2 Deuxième mot.
 * @param offset1 Offset du premier mot dans le fichier Word2Vec.
 * @param offset2 Offset du deuxième mot dans le fichier Word2Vec.
 */
void writeToFileBeginGame(char *filename, char *word1, char *word2, int offset1, int offset2) {
    FILE *file = fopen(filename, "w");
    
    fprintf(file, "%s;%s", word1,word2); //line 1
    fprintf(file, "\n\n"); //line 2 vide car 0 mot ajouté
    fprintf(file, "%s:%i;%s:%i", word1, offset1,word2,offset2); // line 3
    fprintf(file, "\n"); 
    fprintf(file, "%s,%s,%0.2f;", word1, word2, calculSimilarity(word1,word2,offset1,offset2)); //line 4

    fclose(file);
}

/**
 * @brief Ajoute un mot et ses informations à un fichier existant.
 * 
 * @param filename Nom du fichier.
 * @param word1 Mot à ajouter.
 * @param offset1 Offset du mot dans le fichier Word2Vec.
 */
void addWordToFile(char *filename, char *word1, int offset1) {
    FILE *file = fopen(filename, "r+");
    if (!file) {
        perror("Erreur lors de l'ouverture du fichier");
        exit(EXIT_FAILURE);
    }

    char line1[MAX_LINE_LENGTH];
    char line2[MAX_LINE_LENGTH];
    char line3[MAX_LINE_LENGTH];
    char line4[MAX_LINE_LENGTH];

    // Lecture des lignes existantes
    if (fgets(line1, sizeof(line1), file) == NULL ||
        fgets(line2, sizeof(line2), file) == NULL ||
        fgets(line3, sizeof(line3), file) == NULL ||
        fgets(line4, sizeof(line4), file) == NULL) {
        fclose(file);
        perror("Erreur lors de la lecture du fichier");
        exit(EXIT_FAILURE);
    }

    // Retour au début du fichier pour réécrire
    fseek(file, 0, SEEK_SET);

    // Écriture de la première ligne inchangée
    fputs(line1,file);
    //On raccourci sans \n pour line 4
    size_t len1 = strlen(line1);
    if (len1 > 0 && line1[len1 - 1] == '\n') {
        line1[len1 - 1] = '\0';
    }
    
    // Écriture du mot ajouté sur la deuxième ligne
    // On enleve le \n de line2
    size_t len2 = strlen(line2);
    if (len2 > 0 && line2[len2 - 1] == '\n') {
        line2[len2 - 1] = '\0';
    }
    // On ecrit tout
    if (strlen(line2) == 0 || line2[0] == '\n') {
        fprintf(file, "%s", word1);
    } else {
        fprintf(file, "%s;%s", line2, word1);
    }
    fprintf(file, "\n");

    // Écriture du mot ajouté avec son offset sur la troisième ligne
    // On enleve le \n de line3
    size_t len3 = strlen(line3);
    if (len3 > 0 && line3[len3 - 1] == '\n') {
        line3[len3 - 1] = '\0';
    }
    // On ecrit tout
    fprintf(file, "%s;%s:%i\n", line3, word1, offset1);

    // Écriture du mot ajouté avec son score de similarite pour chaque mot precedent sur la quatrieme ligne
    size_t len4 = strlen(line4);
    if (len4 > 0 && line4[len4 - 1] == '\n') {
        line4[len4 - 1] = '\0';
    }

    fputs(line4,file); // on ecrit line4 SANS \n pour rajouter apres
    
    // Extraction des mots de line1 et line2 pour iterer
    char *listemots[500];
    char *token;
    int i = 0;
    // Ici on split les mots de la ligne 1 pour les mettre dans une liste
    token = strtok(line1, ";");
    while(token != NULL){
        listemots[i] = token;
        i++;
        token = strtok(NULL, ";");
    }

    token = strtok(line2, ";");
    while(token != NULL){
        listemots[i] = token;
        i++;
        token = strtok(NULL, ";");
    }

    FILE* dictionnary = fopen("./datafiles/dic.lex", "rb");
    if (!dictionnary) {
        perror("Erreur lors de l'ouverture du dictionnaire");
        exit(EXIT_FAILURE);
    }

    StaticTreeWithOffset st = loadStaticTreeWithOffsetFromFile(dictionnary);

    // iteration sur les mots davant et word1
    for (int j = 0; j < i; j++) {
        if (strcmp(listemots[j], word1) != 0) {
            int offsetWord = searchWordInStaticTree(&st, listemots[j]);
            fprintf(file, "%s,%s,%0.2f;", word1, listemots[j], calculSimilarity(listemots[j], word1,offset1,offsetWord));
        }
    }

    fclose(file); 
}