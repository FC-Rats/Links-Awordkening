# Documentation des Actions WebSocket

Ce document décrit les différentes actions pouvant être réalisées via WebSocket, les arguments nécessaires pour chaque action, et les réponses attendues.

# Websockets /game

## send_data

### Description
Envoie les données du client au serveur.

### Arguments nécessaires
- `id` : ID du client.
- `nickname` : Pseudo du joueur.

### Réponse
```json
{
  "action": "send_data",
  "args": {
    "return": "success",
  }
}
```

## send_message

### Description
Envoie un message de chat à tous les utilisateurs de la partie. 

### Arguments nécessaires
- `message` : Message à envoyer.

### Réponse envoyé à tous les utilisateurs de la partie
```json
{
  "action": "send_message",
  "args": {
    "message": "<message>",
    "nickname": "<nickname>"
  }
}
```

## create_game

### Description
Crée une nouvelle partie de jeu.

### Arguments nécessaires
- `max_player` : Nombre maximal de joueurs dans la partie.

### Réponse
```json
{
  "action": "create_game",
  "args": {
    "return": "success",
    "idJoin": "<game_code>"
  }
}
```

## start_game

### Description
Démarre une partie de jeu.

### Arguments nécessaires
- `client_id` : ID du client qui lance la partie.

### Réponse
```json
{
  "action": "start_game",
  "args": {
    "return": "success",
    "players": ["<player_id1>", "<player_id2>", ...],
    "end_time": "<end_time_isoformat>"
  }
}
```

## join_game

### Description
Permet à un client de rejoindre une partie existante.

### Arguments nécessaires
- `client_id` : ID du client rejoignant la partie.
- `game_code` : Code de la partie à rejoindre.

### Réponse en cas de succès
```json
{
  "action": "join_game",
  "args": {
    "return": "success",
    "idJoin": "<game_code>"
  }
}
```

### Réponse en cas d'erreur
```json
{
  "action": "join_game",
  "args": {
    "return": "error",
    "msg": "La partie est pleine !"  // Ou "La partie a déjà commencé !" ou "Partie introuvable !"
  }
}
```

## add_word

### Description
Ajoute un mot à la chaîne de mots du joueur.

### Arguments nécessaires
- `client_id` : ID du client ajoutant le mot.
- `word` : Mot à ajouter.

### Réponse en cas de succès
```json
{
  "action": "add_word",
  "args": {
    "return": "success",
    "chart": [
      ["<word1>", "<word2>", <score>],
      ["<word1>", "<word2>", <score>],
      ...
    ],
    "score": <current_score>
  }
}
```

### Réponse en cas d'erreur
```json
{
  "action": "add_word",
  "args": {
    "return": "error",
    "msg": "Le mot a déjà été utilisé !"  // Ou "Le mot ne doit pas contenir de nombres !", "Le mot ne doit pas contenir de caractères spéciaux !", "Le mot n'existe pas ou est mal orthographié !", "Le mot que vous avez rentré n'a pas amélioré votre score :c", ou "Erreur lors de l'exécution du moteur de chaîne."
  }
}
```

## leave_game

### Description
Permet à un client de quitter une partie.

### Arguments nécessaires
- `client_id` : ID du client quittant la partie.

### Réponse si l'hôte quitte (Envoyé à tous):
```json
{
  "action": "leave_game",
  "args": {
    "return": "error",
    "msg": "Le créateur de la partie a quitté. Fin prématurée de la partie"
  }
}
```

### Réponse pour les autres joueurs quittant la partie:
```json
{
  "action": "leave_game",
  "args": {
    "return": "success"
  }
}
```

## Exemple de message d'erreur général

### Description
Format des messages d'erreur généraux.

### Réponse
```json
{
  "action": "<action_name>",
  "args": {
    "return": "error",
    "msg": "<message_d_erreur>"
  }
}
```

## end_game

### Description
Termine une partie de jeu. (Ne peut pas être appelé)

### Réponse
```json
{
  "action": "end_game",
  "args": {
    "return": "success",
    "chart": [ //Celui du joueur
      ["<word1>", "<word2>", <score>],
      ["<word1>", "<word2>", <score>],
      ...
    ],
    "score": <final_score>,
    "all-chart": {
      "<player_id1>": [["<word1>", "<word2>", <score>], ...],
      "<player_id2>": [["<word1>", "<word2>", <score>], ...],
      ...
    }
  }
}
```