package module;

import java.io.*;
import java.util.*;
import java.nio.charset.StandardCharsets;

/**
 * Classe pour lire un fichier texte pour le tranformer en arbre et pour écrire l'arbre sous forme de fichier texte.
 */
public class FileReaderWriter {
	
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
     * Lit un fichier texte et renvoie une liste d'arêtes.
     *
     * @param filePath Chemin du fichier texte.
     * @return data Map contenant les données du fichier d'entrée (mot de début, mot de fin, nouveau mot et liste des liens avec similarités.
     * @throws IOException En cas d'erreur d'entrée/sortie lors de la lecture du fichier.
     */
    public static Map<String, Object> readDataFromFile(String filePath) throws IOException {
    	Map<String, Object> data = new HashMap<>();
    	
    	try {
	        BufferedReader reader = new BufferedReader(new FileReader(filePath, StandardCharsets.UTF_8));
	
	        // Lecture de la première ligne
	        String[] firstLineWords = reader.readLine().split(";");
	        data.put("startWord", firstLineWords[0]);
	        data.put("endWord", firstLineWords[1]);
	
	        // Lecture de la deuxième ligne
	        String[] secondLineWords = reader.readLine().split(";");
	        String newWord = (secondLineWords.length >= 1 && !secondLineWords[0].toString().equals("")) ? secondLineWords[secondLineWords.length - 1] : firstLineWords[0];
	        data.put("newWord", newWord);
	
	        // Ignore la troisième ligne
	        reader.readLine();
	
	        // Lecture de la quatrième ligne
	        String[] fourthLineEdges = reader.readLine().split(";");
	        List<Edge> edges = new ArrayList<>();
	        for (String edgeStr : fourthLineEdges) {
	            String[] edgeParts = edgeStr.split(",");
	            if (edgeParts.length == 3 && edgeParts[0].equals(newWord)) {
	                String wordSrc = edgeParts[0];
	                String wordDest = edgeParts[1];
	                double similarity = Double.parseDouble(edgeParts[2]);
	                Edge edge = new Edge(wordSrc, wordDest, similarity);
	                edges.add(edge);
	            }
	        }
	        data.put("edges", edges);
	
	        // Fermer le lecteur
	        reader.close();
    	} catch (IOException e) {
            e.printStackTrace();
        }

        return data;
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
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, StandardCharsets.UTF_8))) {
        	List<Edge> treeEdges = tree.findPath(startWord, endWord);
            for (Edge edge : treeEdges) {
                writer.write(edge.getWordSrc() + "," + edge.getWordDest() + "," + edge.getSimilarity());
                writer.newLine();
            }
            
            writer.write("score:" + tree.getFinalScore(startWord, endWord));
            writer.newLine();
        }
        System.out.println("L'arbre transcrit avec succès.");
    }
}

