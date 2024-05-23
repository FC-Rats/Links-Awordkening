# Python server

## Installation

```bash
cd server
```

### 1 - Créer un environnement virtuel
Créez un environnement virtuel pour isoler les dépendances du projet.
```bash
python -m venv <NAME-ENV>
```

### 2 - Activer l'environnement virtuel
Activez l'environnement virtuel. Utilisez la commande correspondant à votre système d'exploitation :

#### Sur Windows :

```bash
.\<NAME-ENV>\Scripts\activate
```

#### Sur macOS et Linux :

```bash
source <NAME-ENV>/bin/activate
```

### 3 - Installer les dépendances
Installez les dépendances nécessaires en utilisant le fichier `requirements.txt`.

```bash
pip install -r requirements.txt
```

Si vous n'avez pas de fichier `requirements.txt`, vous pouvez installer le module websockets manuellement :

```bash
pip install websockets
```

## Utilisation

### Lancer le script principal
Une fois les dépendances installées, vous pouvez exécuter le script principal `main.py` :

```bash
python main.py
```