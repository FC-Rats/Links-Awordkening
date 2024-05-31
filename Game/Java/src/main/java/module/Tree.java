package module;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Classe représentant un graphe pondéré non orienté.
 */
public class Tree {
    // Matrice d'adjacence du graphe représentant les arêtes et leurs similarités
    private Map<String, Map<String, Double>> adjMatrice;

    // Ensemble de toutes les arêtes du graphe
    private Set<Edge> allEdges;

    /**
     * Constructeur par défaut de la classe Graph.
     */
    public Tree() {
        adjMatrice = new HashMap<String, Map<String, Double>>();
        allEdges = new HashSet<Edge>();
    }

    /**
     * Ajoute des arêtes au graphe avec un nouveau mot.
     *
     * @param edges Liste d'arêtes à ajouter.
     */
    public void addEdges(List<Edge> edges) {
        edges.sort(Comparator.reverseOrder());

        for (Edge e : edges) {
            allEdges.add(e);

            // Ajoute l'arête au mot source dans la matrice d'adjacence
            adjMatrice.putIfAbsent(e.getWordSrc(), new HashMap<String, Double>());
            adjMatrice.get(e.getWordSrc()).put(e.getWordDest(), e.getSimilarity());

            // Ajoute l'arête au mot de destination dans la matrice d'adjacence
            adjMatrice.putIfAbsent(e.getWordDest(), new HashMap<String, Double>());
            adjMatrice.get(e.getWordDest()).put(e.getWordSrc(), e.getSimilarity());

            // Vérifie s'il y a un cycle et supprime l'arête si nécessaire
            if (hasCycle(e.getWordSrc(), new HashSet<>(), null)) {
                deleteEdge(e);
            }
        }
    }

    /**
     * Supprime une arête du graphe.
     *
     * @param edge Arête à supprimer.
     */
    public void deleteEdge(Edge edge) {
        allEdges.remove(edge);
        adjMatrice.get(edge.getWordSrc()).remove(edge.getWordDest());
        adjMatrice.get(edge.getWordDest()).remove(edge.getWordSrc());
    }

    /**
     * Vérifie s'il existe un cycle dans le graphe en utilisant une recherche en profondeur.
     *
     * @param currentEdge Mot actuel en cours d'examen.
     * @param visited     Ensemble de mots déjà visités.
     * @param parent      Mot parent du mot actuel.
     * @return Vrai s'il y a un cycle, faux sinon.
     */
    private boolean hasCycle(String currentNode, Set<String> visited, String parent) {
        visited.add(currentNode);  // Ajoute le mot actuel à l'ensemble des mots visités
        // Parcourt tous les voisins du mot actuel
        for (String neighbor : adjMatrice.get(currentNode).keySet()) {
            // Vérifie si le voisin n'est pas le parent du mot actuel (évite de revenir en arrière)
            if (!neighbor.equals(parent)) {
                // Vérifie si le voisin a déjà été visité ou s'il y a un cycle dans le voisin
                if (visited.contains(neighbor) || hasCycle(neighbor, visited, currentNode)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Recherche un chemin entre deux mots dans le graphe.
     *
     * @param startWord Mot de départ.
     * @param endWord   Mot de fin.
     * @return Liste d'arêtes représentant le chemin du mot de départ au mot de fin.
     */
    public List<Edge> findPath(String startWord, String endWord) {
        List<Edge> path = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        depthSearch(startWord, endWord, visited, path);
        // Inverse le chemin pour l'ordre correct du départ à l'arrivée
        Collections.reverse(path);
        return path;
    }

    /**
     * Recherche en profondeur récursive pour trouver un chemin entre deux mots.
     *
     * @param currentWord Mot actuel en cours d'examen.
     * @param endWord     Mot de fin recherché.
     * @param visited     Ensemble de mots déjà visités.
     * @param path        Liste d'arêtes représentant le chemin.
     * @return Vrai s'il y a un chemin, faux sinon.
     */
    private boolean depthSearch(String currentWord, String endWord, Set<String> visited, List<Edge> path) {
        visited.add(currentWord); // Ajoute le mot actuel à l'ensemble des mots visités
        if (currentWord.equals(endWord)) {
            return true;
        }
        // Récupère les voisins du mot actuel
        Map<String, Double> neighbors = adjMatrice.get(currentWord);
        if (neighbors != null) {
            for (Map.Entry<String, Double> neighborEntry : neighbors.entrySet()) {
                String neighbor = neighborEntry.getKey();
                // Vérifie si le voisin n'a pas déjà été visité
                if (!visited.contains(neighbor)) {
                    // Effectue une recherche en profondeur récursive sur le voisin
                    if (depthSearch(neighbor, endWord, visited, path)) {
                        // Si un chemin est trouvé, ajoute l'arête correspondante au chemin et retourne vrai
                        path.add(new Edge(currentWord, neighbor, neighborEntry.getValue()));
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    /**
     * Calcule le score final entre deux mots en trouvant le chemin le plus similaire
     * dans le graphe entre le mot de départ et le mot d'arrivée.
     *
     * @param startWord Le mot de départ.
     * @param endWord   Le mot d'arrivée.
     * @return Le score final entre les deux mots.
     */
    public double getFinalScore(String startWord, String endWord) {
    	return Collections.min(this.findPath(startWord, endWord)).getSimilarity();
    }
    
    public Set<Edge> getEdges() {
    	return allEdges;
    }

    /**
     * Affiche une représentation textuelle du graphe.
     *
     * @return Chaîne de caractères représentant le graphe.
     */
    @Override
    public String toString() {
        StringBuilder result = new StringBuilder("Graph:\n");

        // Affiche toutes les arêtes du graphe
        for (Edge edge : allEdges) {
            result.append(edge.getWordSrc())
                    .append(" <-> ")
                    .append(edge.getWordDest())
                    .append(", Similarity: ")
                    .append(edge.getSimilarity())
                    .append("\n");
        }

        // Affiche la matrice d'adjacence
        result.append("\nAdjacency Matrix:\n");
        for (Map.Entry<String, Map<String, Double>> entry : adjMatrice.entrySet()) {
            String srcWord = entry.getKey();
            Map<String, Double> destWords = entry.getValue();
            result.append(srcWord).append(": ");
            for (Map.Entry<String, Double> destEntry : destWords.entrySet()) {
                result.append(destEntry.getKey()).append(" (").append(destEntry.getValue()).append("), ");
            }
            result.append("\n");
        }

        return result.toString();
    }

    /*
    public static void main(String[] args) {
        Graph graph = new Graph();
        graph.addEdges(Arrays.asList(new Edge("Chat", "Chien", 0.85)));
        graph.addEdges(Arrays.asList(new Edge("Mouton", "Chien", 0.67), new Edge("Mouton", "Chat", 0.30)));
        graph.addEdges(Arrays.asList(new Edge("Chèvre", "Chien", 0.60), new Edge("Chèvre", "Chat", 0.75), new Edge("Chèvre", "Mouton", 0.65)));

        List<Edge> path = graph.findPath("Chat", "Mouton");
        if (!path.isEmpty()) {
            System.out.println("Chemin de Chat à Mouton: " + path.toString());
            System.out.println("Le score final est: " + graph.getFinalScore("Chat", "Mouton"));
        } else {
            System.out.println("Aucun chemin trouvé.");
        }
        try {
			FileReaderWriter.writeGraphToFile(graph, "joueur1.txt", "Chat", "Mouton");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }*/
}