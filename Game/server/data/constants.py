# data/constants.py

import random
import re

strings = {
    'word_already_use': 'Le mot a déjà été utilisé !',
    'word_have_number': 'Le mot ne doit pas contenir de nombres !',
    'word_have_unicode': 'Le mot ne doit pas contenir de caractères spéciaux !',
    'word_not_correct': 'Le mot n\'existe pas ou est mal orthographié !',
    'word_not_better' :'Le mot que vous avez rentré n\'a pas amélioré votre score :c',
    'new_score_enemy': 'Un joueur ennemi a obtenu un meilleur score !',
    'new_score_reached': 'Vous avez obtenu un nouveau score de {score} !',
    'no_attempts_left': 'Vous n\'avez plus de coups ! Attendez la fin de la partie.',
    'game_already_full': 'La partie est pleine !',
    'game_already_started': 'La partie a déjà commencé !',
    'game_not_found': 'Partie introuvable !',
    'host_left_game': 'Le créateur de la partie a quitté. Fermeture prématurée du salon.',
    'player_left_game': '{joueur} a quitté la partie.',
    'host_left_game_success': 'Vous avez quitté la partie. Tous les joueurs du salon ont été déconnecté',
    'left_game_success': 'Vous avez quitté la partie.',
    'invite_player_success': 'Vous avez invité {joueur} à vous rejoindre !',
    'invite_player_warning': '{joueur} n\'est pas connecté :c',
    'invitation_player': '{joueur} vous a invité à rejoindre sa partie !',
    'invitation_refused': '{joueur} a refusé votre invitation :c',
    'invitation_deconnected' : 'Le joueur que vous avez invité s\'est déconnecté :c',
    'invitation_accepted': '{joueur} a accepté votre invitation et rejoint votre partie !'
}

bad_words = {
    'merde': ['zut', 'flûte', 'mince', 'sapristi', 'ah, c\'est vraiment dommage', 'quelle poisse', 'oh, non', 'eh bien, ça alors', 'ah, la barbe', 'oh, purée', 'crotte', 'oh là là'],
    'connard': ['idiot', 'imbécile', 'crétin', 'andouille', 'malotru', 'insensé'],
    'connasse': ['idiote', 'imbécile', 'crétine', 'andouille', 'malotrue', 'insensée'],
    'putain': ['punaise', 'purée', 'sapristi', 'bon sang', 'diantre', 'mince alors'],
    'bordel': ['désordre', 'pagaille', 'foutoir', 'chaos', 'mélasse'],
    'salopard': ['méchant', 'vilain', 'scélérat', 'canaille', 'vaurien'],
    'saloparde': ['méchante', 'vilaine', 'vaurienne'],
    'enfoiré': ['imbécile', 'idiot', 'fou', 'abruti', 'sot'],
    'con': ['idiot', 'imbécile', 'bête', 'niais', 'nigaud'],
    'conne': ['idiote', 'imbécile', 'bête', 'niaise', 'nigaude'],
    'chiant': ['ennuyeux', 'pénible', 'agaçant', 'irritant'],
    'foutre': ['mettre', 'faire', 'lancer', 'jeter'],
    'salope': ['gentille dame', 'magnifique femme', 'personne respectable'],
    'batard': ['enfant illégitime', 'enfant né hors mariage', 'enfant naturel'],
    'bâtard': ['enfant illégitime', 'enfant né hors mariage', 'enfant naturel'],
    'fils de pute': ['enfant de joie', 'enfant naturel', 'fils de famille', 'fils de maman respectable'],
    'enculé': ['fichu', 'sacré', 'foutu'],
    'branleur': ['paresseux', 'fainéant', 'flemmard'],
    'niquer': ['gêner', 'déranger', 'ennuyer'],
    'bouffon': ['farceur', 'plaisantin', 'amuseur'],
    'ta gueule': ['silence s\'il te plaît', 'peux-tu garder le silence', 'je t\'en prie, calme-toi'],
    'pute': ['femme de joie', 'travailleuse du sexe', 'professionnelle du plaisir', 'compagne rémunérée'],
    'salaud': ['méchant', 'vilain', 'scélérat', 'canaille', 'vaurien'],
    'enfoirée': ['imbécile', 'idiote', 'folle', 'abrutie', 'sotte'],
    'taré': ['fou', 'dément', 'cinglé', 'dérangé'],
    'pédé': ['homosexuel', 'gay', 'personne très joyeuse', 'buveur de cosmo'],
    'trou du cul': ['imbécile', 'idiot', 'personne désagréable'],
    'garce': ['vilaine', 'méchante', 'malfaisante'],
    'clodo': ['sans-abri', 'personne démunie'],
    'pétasse': ['personne vulgaire', 'femme désagréable'],
    'connarde': ['idiote', 'imbécile', 'crétine', 'abrutie'],
    'chieur': ['personne ennuyeuse', 'agaçant', 'pénible'],
    'chieuse': ['personne ennuyeuse', 'agaçante', 'pénible'],
    'nique ta mère': ['je souhaite te faire de nouveaux frères', 'je veux devenir ton beau père'],
    'chiotte': ['toilettes', 'WC'],
    'emmerdeur': ['personne pénible', 'agaçant', 'irritable'],
    'emmerdeur': ['personne pénible', 'agaçante', 'irritable'],
    'pourri': ['corrompu', 'malhonnête', 'dépravé'],
    'pourrie': ['corrompue', 'malhonnête', 'dépravée'],
}

def get_string(key, **kwargs):
    """
    Récupère une constante à partir de la clé donnée dans le dictionnaire strings
    et formate le message en remplaçant les placeholders par les valeurs fournies.

    Args:
    key (str): La clé du message dans le dictionnaire strings. (Possibilités : word_already_use, word_have_number, word_have_unicode, word_not_correct, word_not_better, new_score_enemy, new_score_reached, no_attempts_left, game_already_full, game_already_started, game_not_found, host_left_game, player_left_game, left_game_success, invite_player_success, invite_player_warning, invitation_player, invitation_refused, invitation_accepted)
    kwargs (dict): Les valeurs à insérer dans le message.

    Returns:
    str: Le message formaté.
    """
    message = strings.get(key, "")
    return message.format(**kwargs)

def check_injured(sentence):
    """
    Recherche si une phrase contient un mot offensant et le remplace par son équivalent bienveillant.

    Args:
    sentence (str): La phrase à vérifier.

    Returns:
    str: La phrase originale avec les mots offensants remplacés, ou la phrase originale si aucun mot offensant n'est trouvé.
    """
    # Expression régulière pour trouver les mots offensants dans la phrase
    regex = re.compile(r'\b(' + '|'.join(bad_words.keys()) + r')\b', flags=re.IGNORECASE)
    
    # Remplace les mots offensants par leur équivalent bienveillant dans la phrase
    result = regex.sub(lambda match: get_good_word(match.group(0).lower()), sentence)
    
    # Retourne la phrase originale avec les mots offensants remplacés, ou la phrase originale si aucun mot offensant n'est trouvé
    return result if result != sentence else sentence

def get_good_word(bad_word):
    """
    Récupère une constante aléatoire à partir du mot donné dans le dictionnaire bad_words.

    Args:
    key (str): Le mot à remplacer.

    Returns:
    str: Le message bienveillant de remplacement.
    """
    good_word = random.choice(bad_words[bad_word])
    return good_word