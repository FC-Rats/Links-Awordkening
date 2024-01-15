/*
    prototype et déclaration des constantes
*/
#pragma region Constantes
/*
    =======================================

            Prototype des fonctions
                Constantes

    =======================================
*/

// Constantes
#define NONE -1
#define MAX_SIZE 300
#define MAX_LINE_LENGTH 5000

// Codes Erreurs
#define ERROR_FILE_NOT_FOUND 111
#define ERROR_INVALID_INPUT 222
#define ERROR_WRITE_FILE 123

#pragma endregion Constantes

#pragma region CSTree
/*
    =======================================

            Prototype des fonctions
                   CSTREE

    =======================================
*/

// Définition du type child Sibling Tree (CSTree)
typedef wchar_t Element;

typedef struct node {
    Element elem;
    struct node* firstChild;
    struct node* nextSibling;
    int offset;
} Node;

typedef Node* CSTree;

typedef struct {
    Element elem;
    unsigned int firstChild;
    unsigned int nSiblings;
    unsigned int offset;
} ArrayCellWithOffset;

typedef struct {
    ArrayCellWithOffset* nodeArray;
    unsigned int nNodes;
} StaticTreeWithOffset;

// Fonction pour compter le nombre de noeuds dans l'arbre t
int size(CSTree t);

// Fonctions pour compter le nombre d'enfants d'un nœud
int nSiblings(CSTree child);
int nChildren(CSTree t);

// Fonction pour rechercher le premier frère de t contenant e, créer un nouveau noeud s'il est absent
CSTree sortContinue(CSTree* t, Element e, int offset);

// Fonction pour rechercher l'élément e parmi les éléments consécutifs de t
int siblingLookupStatic(StaticTreeWithOffset* st, Element e, int from, int len);

#pragma endregion CSTree

#pragma region Lexico
/*
    =======================================

            Prototype des fonctions
                Lexico 

    =======================================
*/

// Inserer un mot de Word2Vec dans le CSTree
CSTree insert(CSTree t, const char* mot, int offset);

// Fonction pour convertir CSTree en StaticTree : Remplir les cells du tableau
void fill_array_cells_with_offset(StaticTreeWithOffset* st, CSTree t, int index_for_t, int nSiblings, int* reserved_cells) ;

// Fonction pour créer le CSTree depuis un .bin
CSTree buildWord2VecDictionaryFromFile(const char *filename);

// Rend le CSTree en StaticTree
StaticTreeWithOffset exportStaticTreeWithOffset(CSTree t);

// Pour exporter le StaticTree en fichier .lex
void exportStaticTreeWithOffsetToFile(StaticTreeWithOffset* st, const char* filename);

// Converti le CSTREE en StaticTree puis l'envoit en fichier
void exportTreeToFile(CSTree t, const char *filename);

// Pour charger l'arbre de son .lex afin de l'utiliser
StaticTreeWithOffset loadStaticTreeWithOffsetFromFile(FILE* file);

// Pour chercher un mot dans l'arbre lexicographique
int searchWordInStaticTree(StaticTreeWithOffset* st, const char* word);

#pragma endregion Lexico


#pragma region Similarite
/*
    =======================================

            Prototype des fonctions
                Similarite

    =======================================
*/

// Structure pour représenter un tableau associé à l'algorithme de Levenshtein
typedef struct {
    int lenS;   // Longueur de la chaîne S
    int lenT;   // Longueur de la chaîne T
    int* tab;   // Tableau d'entiers
} LevArray;

// Fonction pour calculer le minimum de deux entiers
int min(int a, int b);

// Fonction pour initialiser un tableau pour des chaînes de tailles données
LevArray init(int lenS, int lenT);

// Fonction pour insérer une valeur dans le tableau
void set(LevArray a, int indexS, int indexT, int val);

// Fonction pour récupérer une valeur du tableau
int get(LevArray a, int indexS, int indexT);

// Fonction pour calculer la distance de Levenshtein entre deux chaînes
double levenshtein(char * S, char * T);

// Fonction pour calculer la distance semantique
double calculScalaire(int offsetword1,int offsetword2);

// Fonction pour calculer le maximum de deux entiers
double max(double a, double b);

// Assembler levenstein et calculScalaire pour retourner la similarite max de deux mots
double calculSimilarity(char *word1, char *word2, int offset1, int offset2);

#pragma endregion Similarite

#pragma region NewGame

/*
    =======================================

            Prototype des fonctions
                Fichiers de partie

    =======================================
*/

// Ecris le fichier de partie
void writeToFileBeginGame(char *filename, char *word1, char *word2, int offset1, int offset2);

// Ajoute un mot au fichier de partie
void addWordToFile(char *filename, char *word1, int offset1);

#pragma endregion  NewGame
