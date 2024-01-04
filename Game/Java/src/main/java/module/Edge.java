package module;

import java.io.Serializable;

/**
 * Classe représentant une arête pondérée entre deux mots dans un graphe.
 */
@SuppressWarnings("serial")
public class Edge implements Comparable<Edge>, Serializable {
    // Mot source de l'arête
    private final String wordSrc;

    // Mot de destination de l'arête
    private final String wordDest;

    // Similarité entre les mots source et de destination
    private final double similarity;

    /**
     * Constructeur de la classe Edge.
     *
     * @param wordSrc    Mot source de l'arête.
     * @param wordDest   Mot de destination de l'arête.
     * @param similarity Similarité entre les mots source et de destination.
     */
    Edge(String wordSrc, String wordDest, double similarity) {
        this.wordSrc = wordSrc;
        this.wordDest = wordDest;
        this.similarity = similarity;
    }

    /**
     * Obtient le mot source de l'arête.
     *
     * @return Mot source de l'arête.
     */
    public String getWordSrc() {
        return wordSrc;
    }

    /**
     * Obtient le mot de destination de l'arête.
     *
     * @return Mot de destination de l'arête.
     */
    public String getWordDest() {
        return wordDest;
    }

    /**
     * Obtient la similarité entre les mots source et de destination.
     *
     * @return Similarité entre les mots source et de destination.
     */
    public double getSimilarity() {
        return similarity;
    }

    /**
     * Compare cette arête avec une autre arête en fonction de leur similarité.
     *
     * @param o Arête à comparer.
     * @return Valeur négative, zéro ou positive selon que cette arête est moins que, égale à ou
     *         plus grande que l'arête spécifiée.
     */
    @Override
    public int compareTo(Edge o) {
        return Double.compare(this.similarity, o.similarity);
    }

    /**
     * Obtient une représentation textuelle de l'arête.
     *
     * @return Chaîne de caractères représentant l'arête.
     */
    @Override
    public String toString() {
        return "[" + wordSrc + "," + similarity + "," + wordDest + "]";
    }
}
