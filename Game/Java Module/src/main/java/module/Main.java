package module;

import java.io.*;
import java.util.List;
import java.util.ArrayList;

/**
 * Classe principale du programme.
 */
public class Main {

    /**
     * Point d'entrée du programme.
     *
     * @param args Les arguments en ligne de commande (idPlayer, startWord, endWord).
     */
    public static void main(String[] args) {
        // Vérifier le nombre d'arguments
        if (args.length != 3) {
            System.err.println("Usage: java Main idPlayer startWord endWord");
            System.exit(1);
        }

        String idPlayer = args[0];
        String startWord = args[1];
        String endWord = args[2];

        String inputFile = "src/files/input/" + idPlayer + ".txt";
        String outputFile = "src/files/output/" + idPlayer + ".txt";
        String saveFile = "src/files/save/" + idPlayer + ".ser";

        try {
            Tree tree = new Tree();

            // Charger l'arbre depuis le fichier de sauvegarde
            List<Edge> edges = loadEdgesFromSaveFile(saveFile);

            // Lire les arêtes du fichier d'entrée et les ajouter à l'arbre
            List<Edge> newEdges = FileReaderWriter.readEdgesFromFile(inputFile);
            edges.addAll(newEdges);
            tree.addEdges(edges);

            // Trouver le chemin et sérialiser l'arbre
            List<Edge> treeEdges = tree.findPath(startWord, endWord);
            serializeTree(treeEdges, saveFile);

            // Écrire l'arbre dans le fichier de sortie
            FileReaderWriter.writeTreeToFile(tree, outputFile, startWord, endWord);

            System.out.println("Processus terminé avec succès.");

        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Erreur d'entrée/sortie : " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static List<Edge> loadEdgesFromSaveFile(String saveFile) throws IOException, ClassNotFoundException {
        List<Edge> edges = new ArrayList<>();
        if (fileExists(saveFile)) {
            edges = deserializeTree(saveFile);
            System.out.println("Arbre chargé depuis le fichier de sauvegarde.");
        } else {
            System.out.println("Aucun fichier de sauvegarde trouvé.");
        }
        return edges;
    }

    /**
     * Vérifie si un fichier existe.
     *
     * @param fileName Le chemin du fichier à vérifier.
     * @return true si le fichier existe, sinon false.
     */
    private static boolean fileExists(String fileName) {
        return new File(fileName).exists();
    }

    /**
     * Sérialise l'arbre et enregistre le fichier de sauvegarde.
     *
     * @param tree     L'arbre à sérialiser.
     * @param fileName Le chemin du fichier de sauvegarde.
     * @throws IOException            En cas d'erreur d'entrée/sortie lors de la lecture du fichier.
     */
    private static void serializeTree(List<Edge> tree, String fileName) {
        try (ObjectOutputStream outputStream = new ObjectOutputStream(new FileOutputStream(fileName))) {
            outputStream.writeObject(tree);
            System.out.println("Arbre sérialisé avec succès.");
        } catch (IOException e) {
            System.err.println("Erreur de sérialisation : " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Désérialise l'arbre depuis le fichier de sauvegarde.
     *
     * @param fileName Le chemin du fichier de sauvegarde.
     * @return L'arbre désérialisé.
     * @throws IOException            En cas d'erreur d'entrée/sortie lors de la lecture du fichier.
     * @throws ClassNotFoundException Si la classe des objets dans le fichier de sauvegarde n'est pas trouvée.
     */
    @SuppressWarnings("unchecked")
    private static List<Edge> deserializeTree(String fileName) {
        List<Edge> deserializedEdges = new ArrayList<>();
        try (ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(fileName))) {
            deserializedEdges = (List<Edge>) inputStream.readObject();
            System.out.println("Arbre désérialisé avec succès.");
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Erreur lors de la désérialisation : " + e.getMessage());
            e.printStackTrace();
        }
        return deserializedEdges;
    }
}
