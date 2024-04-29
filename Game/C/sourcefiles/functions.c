#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include <ctype.h>
#include <math.h>
#include <wchar.h>
#include <assert.h>
#include "../headers/game.h"
#include <wctype.h>
int debug = 0;

unsigned char* StrToLwrExt(unsigned char* pString);
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
 * @brief Insère un mot dans un arbre CSTree.
 * 
 * @param t Arbre dans lequel insérer le mot.
 * @param mot Mot à insérer.
 * @param offset Offset associé au mot.
 * @return CSTree Arbre mis à jour après l'insertion.
 */
CSTree insert(CSTree t, unsigned char *mot, int offset)
{
    CSTree currentNode = t;
    if (strcmp(mot, "écran")==0){
        printf("debug " );
    }
    int len = strlen( mot ) + 1 ;
       
    /* Memory allocation and copy */
    unsigned char* old = malloc(len* sizeof(unsigned char));
    strcpy(old, mot);
    StrToLwrExt(mot);
    if (strcmp(old, mot) !=0 ) {
        printf("before : %s after : %s \n", old, mot);
    }

    for (int i = 0; mot[i] != '\0'; i++)
    {
        if (strcmp(mot, "écran")==0){
            unsigned  char x = mot[i]; 
            printf("insert %d %d %s \n", mot[i] , (mot[i]), mot );
        }

        if (i == 0)
        {
            currentNode = sortContinue(&currentNode, (mot[i]), -1);
        }
        else
        {
            currentNode = sortContinue(&(currentNode->firstChild), (mot[i]), -1);
        }
    }

    currentNode->firstChild = sortContinue(&(currentNode->firstChild), '\0', offset);

    return t;
}
int lookup(CSTree t, unsigned char* mot) {
    if (t==NULL)  {
        return -2;
    }
    printf("mot %s *mot %d t->elem %c  %d\n", mot, *mot,  t->elem, t->elem);
    if (*mot == t->elem) {
        if (*mot ==0 ) {
            return t->offset;
        } 
        return lookup(t->firstChild, mot+1);
    }
    
    return lookup(t->nextSibling, mot);
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
    unsigned char *vocab;

    fscanf(file, "%lld", &words);
    fscanf(file, "%d", &size); // Correction du format de la taille

    vocab = (unsigned char *)malloc(words * max_w * sizeof(unsigned char));
    M = (float *)malloc(words * size * sizeof(float));

    if (vocab == NULL)
    {
        printf("Erreur lors de l'allocation mémoire pour le dictionnaire Word2Vec\n");
        exit(EXIT_FAILURE);
    }

    for (int b = 0; b < words; b++)
    {
        int a = 0;
        while (1)
        {
            unsigned char c =fgetc(file);
            vocab[b * max_w + a] = c;
            if (feof(file) || (vocab[b * max_w + a] == ' '))
                break;
            if ((a < max_w) && (vocab[b * max_w + a] != '\n'))
                a++;
        }
        vocab[b * max_w + a] = 0;
        
        if (strcmp(vocab+ b * max_w, "écran") == 0) {
            printf("Trouvé %d\n", ftell(file));
            debug=1;
        }
        dictionary = insert(dictionary, vocab + b * max_w, ftell(file));
        if (strcmp(vocab+ b * max_w, "écran") == 0) {
            printf("offset %d \n", lookup(dictionary, vocab+ b * max_w));
            debug=0;
        }

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
int searchWordInStaticTree(StaticTreeWithOffset *st, const unsigned char *word)
{
    int i = 0;
    int from = 1;
    wchar_t wide; 
    do
    {
        from = siblingLookupStatic(st, word[i], from, NONE);
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
double levenshtein(unsigned char * S, unsigned char * T) {
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
double calculSimilarity(unsigned char *word1, unsigned char *word2, int offset1, int offset2){
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
void writeToFileBeginGame(char *filename, unsigned char *word1, unsigned char *word2, int offset1, int offset2) {
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
void addWordToFile( char *filename, unsigned char *word1, int offset1) {
    FILE *file = fopen(filename, "r+");
    if (!file) {
        perror("Erreur lors de l'ouverture du fichier");
        exit(EXIT_FAILURE);
    }

    unsigned char line1[MAX_LINE_LENGTH];
    unsigned char line2[MAX_LINE_LENGTH];
    unsigned char line3[MAX_LINE_LENGTH];
    unsigned char line4[MAX_LINE_LENGTH];

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
    unsigned char *listemots[500];
    unsigned char *token;
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



unsigned char* StrToLwrExt(unsigned char* pString)
{
unsigned char* p = pString;
unsigned char* pExtChar = 0;

if (pString && *pString) {
        while (*p) {
            if ((*p >= 0x41) && (*p <= 0x5a)) /* US ASCII */
                (*p) += 0x20;
            else if (*p > 0xc0) {
                pExtChar = p;
                p++;
                switch (*pExtChar) {
                case 0xc3: /* Latin 1 */
                    if ((*p >= 0x80)
                        && (*p <= 0x9e)
                        && (*p != 0x97))
                        (*p) += 0x20; /* US ASCII shift */
                    break;
                case 0xc4: /* Latin ext */
                    if (((*p >= 0x80)
                        && (*p <= 0xb7)
                        && (*p != 0xb0))
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0xb9)
                        && (*p <= 0xbe)
                        && (*p % 2)) /* Odd */
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xbf) {
                        *pExtChar = 0xc5;
                        (*p) = 0x80;
                    }
                    break;
                case 0xc5: /* Latin ext */
                    if ((*p >= 0x81)
                        && (*p <= 0x88)
                        && (*p % 2)) /* Odd */
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0x8a)
                        && (*p <= 0xb7)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xb8) {
                        *pExtChar = 0xc3;
                        (*p) = 0xbf;
                    }
                    else if ((*p >= 0xb9)
                        && (*p <= 0xbe)
                        && (*p % 2)) /* Odd */
                        (*p)++; /* Next char is lwr */
                    break;
                case 0xc6: /* Latin ext */
                    switch (*p) {
                    case 0x81:
                        *pExtChar = 0xc9;
                        (*p) = 0x93;
                        break;
                    case 0x86:
                        *pExtChar = 0xc9;
                        (*p) = 0x94;
                        break;
                    case 0x89:
                        *pExtChar = 0xc9;
                        (*p) = 0x96;
                        break;
                    case 0x8a:
                        *pExtChar = 0xc9;
                        (*p) = 0x97;
                        break;
                    case 0x8e:
                        *pExtChar = 0xc9;
                        (*p) = 0x98;
                        break;
                    case 0x8f:
                        *pExtChar = 0xc9;
                        (*p) = 0x99;
                        break;
                    case 0x90:
                        *pExtChar = 0xc9;
                        (*p) = 0x9b;
                        break;
                    case 0x93:
                        *pExtChar = 0xc9;
                        (*p) = 0xa0;
                        break;
                    case 0x94:
                        *pExtChar = 0xc9;
                        (*p) = 0xa3;
                        break;
                    case 0x96:
                        *pExtChar = 0xc9;
                        (*p) = 0xa9;
                        break;
                    case 0x97:
                        *pExtChar = 0xc9;
                        (*p) = 0xa8;
                        break;
                    case 0x9c:
                        *pExtChar = 0xc9;
                        (*p) = 0xaf;
                        break;
                    case 0x9d:
                        *pExtChar = 0xc9;
                        (*p) = 0xb2;
                        break;
                    case 0x9f:
                        *pExtChar = 0xc9;
                        (*p) = 0xb5;
                        break;
                    case 0xa9:
                        *pExtChar = 0xca;
                        (*p) = 0x83;
                        break;
                    case 0xae:
                        *pExtChar = 0xca;
                        (*p) = 0x88;
                        break;
                    case 0xb1:
                        *pExtChar = 0xca;
                        (*p) = 0x8a;
                        break;
                    case 0xb2:
                        *pExtChar = 0xca;
                        (*p) = 0x8b;
                        break;
                    case 0xb7:
                        *pExtChar = 0xca;
                        (*p) = 0x92;
                        break;
                    case 0x82:
                    case 0x84:
                    case 0x87:
                    case 0x8b:
                    case 0x91:
                    case 0x98:
                    case 0xa0:
                    case 0xa2:
                    case 0xa4:
                    case 0xa7:
                    case 0xac:
                    case 0xaf:
                    case 0xb3:
                    case 0xb5:
                    case 0xb8:
                    case 0xbc:
                        (*p)++; /* Next char is lwr */
                        break;
                    default:
                        break;
                    }
                    break;
                case 0xc7: /* Latin ext */
                    if (*p == 0x84)
                        (*p) = 0x86;
                    else if (*p == 0x85)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0x87)
                        (*p) = 0x89;
                    else if (*p == 0x88)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0x8a)
                        (*p) = 0x8c;
                    else if (*p == 0x8b)
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0x8d)
                        && (*p <= 0x9c)
                        && (*p % 2)) /* Odd */
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0x9e)
                        && (*p <= 0xaf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xb1)
                        (*p) = 0xb3;
                    else if (*p == 0xb2)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xb4)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xb6) {
                        *pExtChar = 0xc6;
                        (*p) = 0x95;
                    }
                    else if (*p == 0xb7) {
                        *pExtChar = 0xc6;
                        (*p) = 0xbf;
                    }
                    else if ((*p >= 0xb8)
                        && (*p <= 0xbf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    break;
                case 0xc8: /* Latin ext */
                    if ((*p >= 0x80)
                        && (*p <= 0x9f)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xa0) {
                        *pExtChar = 0xc6;
                        (*p) = 0x9e;
                    }
                    else if ((*p >= 0xa2)
                        && (*p <= 0xb3)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xbb)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xbd) {
                        *pExtChar = 0xc6;
                        (*p) = 0x9a;
                    }
                    /* 0xba three byte small 0xe2 0xb1 0xa5 */
                    /* 0xbe three byte small 0xe2 0xb1 0xa6 */
                    break;
                case 0xc9: /* Latin ext */
                    if (*p == 0x81)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0x83) {
                        *pExtChar = 0xc6;
                        (*p) = 0x80;
                    }
                    else if (*p == 0x84) {
                        *pExtChar = 0xca;
                        (*p) = 0x89;
                    }
                    else if (*p == 0x85) {
                        *pExtChar = 0xca;
                        (*p) = 0x8c;
                    }
                    else if ((*p >= 0x86)
                        && (*p <= 0x8f)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    break;
                case 0xcd: /* Greek & Coptic */
                    switch (*p) {
                    case 0xb0:
                    case 0xb2:
                    case 0xb6:
                        (*p)++; /* Next char is lwr */
                        break;
                    case 0xbf:
                        *pExtChar = 0xcf;
                        (*p) = 0xb3;
                        break;
                    default:
                        break;
                    }
                    break;
                case 0xce: /* Greek & Coptic */
                    if (*p == 0x86)
                        (*p) = 0xac;
                    else if (*p == 0x88)
                        (*p) = 0xad;
                    else if (*p == 0x89)
                        (*p) = 0xae;
                    else if (*p == 0x8a)
                        (*p) = 0xaf;
                    else if (*p == 0x8c) {
                        *pExtChar = 0xcf;
                        (*p) = 0x8c;
                    }
                    else if (*p == 0x8e) {
                        *pExtChar = 0xcf;
                        (*p) = 0x8d;
                    }
                    else if (*p == 0x8f) {
                        *pExtChar = 0xcf;
                        (*p) = 0x8e;
                    }
                    else if ((*p >= 0x91)
                        && (*p <= 0x9f))
                        (*p) += 0x20; /* US ASCII shift */
                    else if ((*p >= 0xa0)
                        && (*p <= 0xab)
                        && (*p != 0xa2)) {
                        *pExtChar = 0xcf;
                        (*p) -= 0x20;
                    }
                    break;
                case 0xcf: /* Greek & Coptic */
                    if (*p == 0x8f)
                        (*p) = 0x97;
                    else if ((*p >= 0x98)
                        && (*p <= 0xaf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xb4) {
                        (*p) = 0x91;
                    }
                    else if (*p == 0xb7)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xb9)
                        (*p) = 0xb2;
                    else if (*p == 0xba)
                        (*p)++; /* Next char is lwr */
                    else if (*p == 0xbd) {
                        *pExtChar = 0xcd;
                        (*p) = 0xbb;
                    }
                    else if (*p == 0xbe) {
                        *pExtChar = 0xcd;
                        (*p) = 0xbc;
                    }
                    else if (*p == 0xbf) {
                        *pExtChar = 0xcd;
                        (*p) = 0xbd;
                    }
                    break;
                case 0xd0: /* Cyrillic */
                    if ((*p >= 0x80)
                        && (*p <= 0x8f)) {
                        *pExtChar = 0xd1;
                        (*p) += 0x10;
                    }
                    else if ((*p >= 0x90)
                        && (*p <= 0x9f))
                        (*p) += 0x20; /* US ASCII shift */
                    else if ((*p >= 0xa0)
                        && (*p <= 0xaf)) {
                        *pExtChar = 0xd1;
                        (*p) -= 0x20;
                    }
                    break;
                case 0xd1: /* Cyrillic supplement */
                    if ((*p >= 0xa0)
                        && (*p <= 0xbf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    break;
                case 0xd2: /* Cyrillic supplement */
                    if (*p == 0x80)
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0x8a)
                        && (*p <= 0xbf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    break;
                case 0xd3: /* Cyrillic supplement */
                    if (*p == 0x80)
                        (*p) = 0x8f;
                    else if ((*p >= 0x81)
                        && (*p <= 0x8e)
                        && (*p % 2)) /* Odd */
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0x90)
                        && (*p <= 0xbf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    break;
                case 0xd4: /* Cyrillic supplement & Armenian */
                    if ((*p >= 0x80)
                        && (*p <= 0xaf)
                        && (!(*p % 2))) /* Even */
                        (*p)++; /* Next char is lwr */
                    else if ((*p >= 0xb1)
                        && (*p <= 0xbf)) {
                        *pExtChar = 0xd5;
                        (*p) -= 0x10;
                    }
                    break;
                case 0xd5: /* Armenian */
                    if ((*p >= 0x80)
                        && (*p <= 0x8f)) {
                        (*p) += 0x30;
                    }
                    else if ((*p >= 0x90)
                        && (*p <= 0x96)) {
                        *pExtChar = 0xd6;
                        (*p) -= 0x10;
                    }
                    break;
                case 0xe1: /* Three byte code */
                    pExtChar = p;
                    p++;
                    switch (*pExtChar) {
                    case 0x82: /* Georgian asomtavruli */
                        if ((*p >= 0xa0)
                            && (*p <= 0xbf)) {
                            *pExtChar = 0x83;
                            (*p) -= 0x10;
                        }
                        break;
                    case 0x83: /* Georgian asomtavruli */
                        if (((*p >= 0x80)
                            && (*p <= 0x85))
                            || (*p == 0x87)
                            || (*p == 0x8d))
                            (*p) += 0x30;
                        break;
                    case 0x8e: /* Cherokee */
                        if ((*p >= 0xa0)
                            && (*p <= 0xaf)) {
                            *(p - 2) = 0xea;
                            *pExtChar = 0xad;
                            (*p) += 0x10;
                        }
                        else if ((*p >= 0xb0)
                            && (*p <= 0xbf)) {
                            *(p - 2) = 0xea;
                            *pExtChar = 0xae;
                            (*p) -= 0x30;
                        }
                        break;
                    case 0x8f: /* Cherokee */
                        if ((*p >= 0x80)
                            && (*p <= 0xaf)) {
                            *(p - 2) = 0xea;
                            *pExtChar = 0xae;
                            (*p) += 0x10;
                        }
                        else if ((*p >= 0xb0)
                            && (*p <= 0xb5)) {
                            (*p) += 0x08;
                        }
                        /* 0xbe three byte small 0xe2 0xb1 0xa6 */
                        break;
                    case 0xb2: /* Georgian mtavruli */
                        if (((*p >= 0x90)
                            && (*p <= 0xba))
                            || (*p == 0xbd)
                            || (*p == 0xbe)
                            || (*p == 0xbf))
                            *pExtChar = 0x83;
                        break;
                    case 0xb8: /* Latin ext */
                        if ((*p >= 0x80)
                            && (*p <= 0xbf)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0xb9: /* Latin ext */
                        if ((*p >= 0x80)
                            && (*p <= 0xbf)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0xba: /* Latin ext */
                        if ((*p >= 0x80)
                            && (*p <= 0x94)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        else if ((*p >= 0xa0)
                            && (*p <= 0xbf)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        /* 0x9e Two byte small 0xc3 0x9f */
                        break;
                    case 0xbb: /* Latin ext */
                        if ((*p >= 0x80)
                            && (*p <= 0xbf)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0xbc: /* Greek ex */
                        if ((*p >= 0x88)
                            && (*p <= 0x8f))
                            (*p) -= 0x08;
                        else if ((*p >= 0x98)
                            && (*p <= 0x9d))
                            (*p) -= 0x08;
                        else if ((*p >= 0xa8)
                            && (*p <= 0xaf))
                            (*p) -= 0x08;
                        else if ((*p >= 0xb8)
                            && (*p <= 0xbf))
                            (*p) -= 0x08;
                        break;
                    case 0xbd: /* Greek ex */
                        if ((*p >= 0x88)
                            && (*p <= 0x8d))
                            (*p) -= 0x08;
                        else if ((*p == 0x99)
                            || (*p == 0x9b)
                            || (*p == 0x9d)
                            || (*p == 0x9f))
                            (*p) -= 0x08;
                        else if ((*p >= 0xa8)
                            && (*p <= 0xaf))
                            (*p) -= 0x08;
                        break;
                    case 0xbe: /* Greek ex */
                        if ((*p >= 0x88)
                            && (*p <= 0x8f))
                            (*p) -= 0x08;
                        else if ((*p >= 0x98)
                            && (*p <= 0x9f))
                            (*p) -= 0x08;
                        else if ((*p >= 0xa8)
                            && (*p <= 0xaf))
                            (*p) -= 0x08;
                        else if ((*p >= 0xb8)
                            && (*p <= 0xb9))
                            (*p) -= 0x08;
                        else if ((*p >= 0xba)
                            && (*p <= 0xbb)) {
                            *(p - 1) = 0xbd;
                            (*p) -= 0x0a;
                        }
                        else if (*p == 0xbc)
                            (*p) -= 0x09;
                        break;
                    case 0xbf: /* Greek ex */
                        if ((*p >= 0x88)
                            && (*p <= 0x8b)) {
                            *(p - 1) = 0xbd;
                            (*p) += 0x2a;
                        }
                        else if (*p == 0x8c)
                            (*p) -= 0x09;
                        else if ((*p >= 0x98)
                            && (*p <= 0x99))
                            (*p) -= 0x08;
                        else if ((*p >= 0x9a)
                            && (*p <= 0x9b)) {
                            *(p - 1) = 0xbd;
                            (*p) += 0x1c;
                        }
                        else if ((*p >= 0xa8)
                            && (*p <= 0xa9))
                            (*p) -= 0x08;
                        else if ((*p >= 0xaa)
                            && (*p <= 0xab)) {
                            *(p - 1) = 0xbd;
                            (*p) += 0x10;
                        }
                        else if (*p == 0xac)
                            (*p) -= 0x07;
                        else if ((*p >= 0xb8)
                            && (*p <= 0xb9)) {
                            *(p - 1) = 0xbd;
                        }
                        else if ((*p >= 0xba)
                            && (*p <= 0xbb)) {
                            *(p - 1) = 0xbd;
                            (*p) += 0x02;
                        }
                        else if (*p == 0xbc)
                            (*p) -= 0x09;
                        break;
                    default:
                        break;
                    }
                    break;
                case 0xe2: /* Three byte code */
                    pExtChar = p;
                    p++;
                    switch (*pExtChar) {
                    case 0xb0: /* Glagolitic */
                        if ((*p >= 0x80)
                            && (*p <= 0x8f)) {
                            (*p) += 0x30;
                        }
                        else if ((*p >= 0x90)
                            && (*p <= 0xae)) {
                            *pExtChar = 0xb1;
                            (*p) -= 0x10;
                        }
                        break;
                    case 0xb1: /* Latin ext */
                        switch (*p) {
                        case 0xa0:
                        case 0xa7:
                        case 0xa9:
                        case 0xab:
                        case 0xb2:
                        case 0xb5:
                            (*p)++; /* Next char is lwr */
                            break;
                        case 0xa2: /* Two byte small 0xc9 0xab */
                        case 0xa4: /* Two byte small 0xc9 0xbd */
                        case 0xad: /* Two byte small 0xc9 0x91 */
                        case 0xae: /* Two byte small 0xc9 0xb1 */
                        case 0xaf: /* Two byte small 0xc9 0x90 */
                        case 0xb0: /* Two byte small 0xc9 0x92 */
                        case 0xbe: /* Two byte small 0xc8 0xbf */
                        case 0xbf: /* Two byte small 0xc9 0x80 */
                            break;
                        case 0xa3:
                            *(p - 2) = 0xe1;
                            *(p - 1) = 0xb5;
                            *(p) = 0xbd;
                            break;
                        default:
                            break;
                        }
                        break;
                    case 0xb2: /* Coptic */
                        if ((*p >= 0x80)
                            && (*p <= 0xbf)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0xb3: /* Coptic */
                        if (((*p >= 0x80)
                            && (*p <= 0xa3)
                            && (!(*p % 2))) /* Even */
                            || (*p == 0xab)
                            || (*p == 0xad)
                            || (*p == 0xb2))
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0xb4: /* Georgian nuskhuri */
                        if (((*p >= 0x80)
                            && (*p <= 0xa5))
                            || (*p == 0xa7)
                            || (*p == 0xad)) {
                            *(p - 2) = 0xe1;
                            *(p - 1) = 0x83;
                            (*p) += 0x10;
                        }
                        break;
                    default:
                        break;
                    }
                    break;
                case 0xea: /* Three byte code */
                    pExtChar = p;
                    p++;
                    switch (*pExtChar) {
                    case 0x99: /* Cyrillic */
                        if ((*p >= 0x80)
                            && (*p <= 0xad)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0x9a: /* Cyrillic */
                        if ((*p >= 0x80)
                            && (*p <= 0x9b)
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0x9c: /* Latin ext */
                        if ((((*p >= 0xa2)
                            && (*p <= 0xaf))
                            || ((*p >= 0xb2)
                                && (*p <= 0xbf)))
                            && (!(*p % 2))) /* Even */
                            (*p)++; /* Next char is lwr */
                        break;
                    case 0x9d: /* Latin ext */
                        if ((((*p >= 0x80)
                            && (*p <= 0xaf))
                            && (!(*p % 2))) /* Even */
                            || (*p == 0xb9)
                            || (*p == 0xbb)
                            || (*p == 0xbe))
                            (*p)++; /* Next char is lwr */
                        else if (*p == 0xbd) {
                            *(p - 2) = 0xe1;
                            *(p - 1) = 0xb5;
                            *(p) = 0xb9;
                        }
                        break;
                    case 0x9e: /* Latin ext */
                        if (((((*p >= 0x80)
                            && (*p <= 0x87))
                            || ((*p >= 0x96)
                                && (*p <= 0xa9))
                            || ((*p >= 0xb4)
                                && (*p <= 0xbf)))
                            && (!(*p % 2))) /* Even */
                            || (*p == 0x8b)
                            || (*p == 0x90)
                            || (*p == 0x92))
                            (*p)++; /* Next char is lwr */
                        else if (*p == 0xb3) {
                            *(p - 2) = 0xea;
                            *(p - 1) = 0xad;
                            *(p) = 0x93;
                        }
                        /* case 0x8d: // Two byte small 0xc9 0xa5 */
                        /* case 0xaa: // Two byte small 0xc9 0xa6 */
                        /* case 0xab: // Two byte small 0xc9 0x9c */
                        /* case 0xac: // Two byte small 0xc9 0xa1 */
                        /* case 0xad: // Two byte small 0xc9 0xac */
                        /* case 0xae: // Two byte small 0xc9 0xaa */
                        /* case 0xb0: // Two byte small 0xca 0x9e */
                        /* case 0xb1: // Two byte small 0xca 0x87 */
                        /* case 0xb2: // Two byte small 0xca 0x9d */
                        break;
                    case 0x9f: /* Latin ext */
                        if ((*p == 0x82)
                            || (*p == 0x87)
                            || (*p == 0x89)
                            || (*p == 0xb5))
                            (*p)++; /* Next char is lwr */
                        else if (*p == 0x84) {
                            *(p - 2) = 0xea;
                            *(p - 1) = 0x9e;
                            *(p) = 0x94;
                        }
                        else if (*p == 0x86) {
                            *(p - 2) = 0xe1;
                            *(p - 1) = 0xb6;
                            *(p) = 0x8e;
                        }
                        /* case 0x85: // Two byte small 0xca 0x82 */
                        break;
                    default:
                        break;
                    }
                    break;
                case 0xef: /* Three byte code */
                    pExtChar = p;
                    p++;
                    switch (*pExtChar) {
                    case 0xbc: /* Latin fullwidth */
                        if ((*p >= 0xa1)
                            && (*p <= 0xba)) {
                            *pExtChar = 0xbd;
                            (*p) -= 0x20;
                        }
                        break;
                    default:
                        break;
                    }
                    break;
                case 0xf0: /* Four byte code */
                    pExtChar = p;
                    p++;
                    switch (*pExtChar) {
                    case 0x90:
                        pExtChar = p;
                        p++;
                        switch (*pExtChar) {
                        case 0x90: /* Deseret */
                            if ((*p >= 0x80)
                                && (*p <= 0x97)) {
                                (*p) += 0x28;
                            }
                            else if ((*p >= 0x98)
                                && (*p <= 0xa7)) {
                                *pExtChar = 0x91;
                                (*p) -= 0x18;
                            }
                            break;
                        case 0x92: /* Osage  */
                            if ((*p >= 0xb0)
                                && (*p <= 0xbf)) {
                                *pExtChar = 0x93;
                                (*p) -= 0x18;
                            }
                            break;
                        case 0x93: /* Osage  */
                            if ((*p >= 0x80)
                                && (*p <= 0x93))
                                (*p) += 0x28;
                            break;
                        case 0xb2: /* Old hungarian */
                            if ((*p >= 0x80)
                                && (*p <= 0xb2))
                                *pExtChar = 0xb3;
                            break;
                        default:
                            break;
                        }
                        break;
                    case 0x91:
                        pExtChar = p;
                        p++;
                        switch (*pExtChar) {
                        case 0xa2: /* Warang citi */
                            if ((*p >= 0xa0)
                                && (*p <= 0xbf)) {
                                *pExtChar = 0xa3;
                                (*p) -= 0x20;
                            }
                            break;
                        default:
                            break;
                        }
                        break;
                    case 0x96:
                        pExtChar = p;
                        p++;
                        switch (*pExtChar) {
                        case 0xb9: /* Medefaidrin */
                            if ((*p >= 0x80)
                                && (*p <= 0x9f)) {
                                (*p) += 0x20;
                            }
                            break;
                        default:
                            break;
                        }
                        break;
                    case 0x9E:
                        pExtChar = p;
                        p++;
                        switch (*pExtChar) {
                        case 0xA4: /* Adlam */
                            if ((*p >= 0x80)
                                && (*p <= 0x9d))
                                (*p) += 0x22;
                            else if ((*p >= 0x9e)
                                && (*p <= 0xa1)) {
                                *(pExtChar) = 0xa5;
                                (*p) -= 0x1e;
                            }
                            break;
                        default:
                            break;
                        }
                        break;
                    default:
                        break;
                    }
                    break;
                default:
                    break;
                }
                pExtChar = 0;
            }
            p++;
        }
    }
    return pString;
}