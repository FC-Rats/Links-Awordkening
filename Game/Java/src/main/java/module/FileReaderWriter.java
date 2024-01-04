package module;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Classe pour lire un fichier texte pour le tranformer en arbre et pour écrire l'arbre sous forme de fichier texte.
 */
public class FileReaderWriter {

    /**
     * Lit un fichier texte et renvoie une liste d'arêtes.
     *
     * @param filePath Chemin du fichier texte.
     * @return Liste d'arêtes lue depuis le fichier.
     * @throws IOException En cas d'erreur d'entrée/sortie lors de la lecture du fichier.
     */
    public static List<Edge> readEdgesFromFile(String filePath) throws IOException {
        List<Edge> edges = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(";");
                if (parts.length == 3) {
                    String wordSrc = parts[0].trim();
                    String wordDest = parts[1].trim();
                    double similarity = Double.parseDouble(parts[2].trim());

                    Edge edge = new Edge(wordSrc, wordDest, similarity);
                    edges.add(edge);
                } else {
                    System.err.println("Skipping invalid line: " + line);
                }
            }
        }

        return edges;
    }
    
    /**
     * Écrit les arêtes dans un fichier texte selon le format spécifié.
     *
     * @param tree 		L'arbre du joueur.
     * @param filePath  Chemin du fichier texte de sortie.
     * @param startWord	Mot de départ pour le jeu.
     * @param endWord	Mot de fin pour le jeu.
     * @throws IOException En cas d'erreur d'entrée/sortie lors de l'écriture dans le fichier.
     */
    public static void writeTreeToFile(Tree tree, String filePath, String startWord, String endWord) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            for (Edge edge : tree.findPath(startWord, endWord)) {
                writer.write(edge.getWordSrc() + ";" + edge.getWordDest() + ";" + edge.getSimilarity());
                writer.newLine();
            }

            writer.write("score:" + tree.getFinalScore(startWord, endWord));
            writer.newLine();
        }
    }
}

