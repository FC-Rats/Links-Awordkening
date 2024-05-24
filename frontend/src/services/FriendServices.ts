import { getUsers } from "./UserServices";
import { ContainerFriendRequestsProps } from "../components/types/ContainerFriendRequestsProps";

const url = `${process.env.REACT_APP_API_URL}friend/`;
const token = localStorage.getItem("token");

/**
 * @function getFriends
 * @description Récupère les URI des ressources membres de la ressource collection dans le corps de la réponse.  
 * 
 * @param params 
 * @returns {JSON} - Réponse de la requête
 */
export async function getFriends(params?: Record<string, string | number | Array<string | number>>) {
    const queryString = params
    ? Object.entries(params)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=${value.map(v => encodeURIComponent(v)).join(',')}`;
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
        .join('&')
    : '';
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${url}?${queryString}`, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Réponse du serveur : ', responseData);
            return responseData;
        } else {
            console.error('Erreur lors de la requête : ', response.status);
            return response.status;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
}

/**
 * @function createFriend
 * @description Crée une ressource membre dans la ressource collection en utilisant les instructions du corps de la requête. 
 * 
 * @param FriendData 
 * @returns {JSON} - Réponse de la requête
 */
export async function createFriend(FriendData: Record<string, string | number>) {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(FriendData),
        });
        
        if (response.ok) {
            const responseData = await response.json();
            console.log('Réponse du serveur : ', responseData);
            return responseData;
        } else {
            console.error('Erreur lors de la requête : ', response.status);
            return response.status;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
}

/**
 * @function updateFriend
 * @description Met à jour toutes les représentations des ressources membres de la ressource collection en utilisant les instructions du corps de la requête.
 * 
 * @param FriendData 
 * @returns {JSON} - Réponse de la requête
 */
export async function updateFriend(FriendData: Record<string, string | number>) {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${url}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(FriendData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Réponse du serveur : ', responseData);
            return responseData;
        } else {
            console.error('Erreur lors de la requête : ', response.status);
            return response.status;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
}


/**
 * @function deleteFriend
 * @description Supprime une ressource membre dans la ressource collection en utilisant les instructions du corps de la requête.  
 * 
 * @param params 
 * @returns {JSON} - Réponse de la requête 
 */
export async function deleteFriend(id: number, idFriend: number) {

    const queryString = `${encodeURIComponent('idFriend')}=${encodeURIComponent(idFriend)}&${encodeURIComponent('idUser')}=${encodeURIComponent(id)}`;
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${url}?${queryString}`, {
            method: 'DELETE',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Réponse du serveur : ', responseData);
            return responseData;
        } else {
            console.error('Erreur lors de la requête : ', response.status);
            return response.status;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
}


/**
 * @function selectPublicFriends
 * @description Affiche la liste des utilisateurs qui sont public  
 * 
 * @param params - id du user
 * @returns {JSON} - Réponse de la requête 
 */
export async function selectPublicFriends(id: number): Promise<{ success: boolean; message: string; dataUser: ContainerFriendRequestsProps['friends'] }> {
    let success = false;
    let message = '';
    let dataUser: ContainerFriendRequestsProps['friends'] = [];
    try {
        // 1 - On récupère les users dispos
        const userPublic = await getUsers({ visibility: 'PUBLIC' });
        if (userPublic.length <= 0) {
            return { success, message: "Aucun utilisateur disponible", dataUser };
        }

        // 2 - On retire tous ceux qui sont dans Friends
        const alreadyFriendsUser = await getFriends({ idUser: id });
        const alreadyFriends = await getFriends({ idFriend: id });
        const allFriends = new Set([
            ...alreadyFriendsUser.map((friend: { idFriend: any; }) => friend.idFriend),
            ...alreadyFriends.map((friend: { idUser: any; }) => friend.idUser),
            id
        ]);

        // 3 - Filtrer les utilisateurs publics pour exclure ceux qui sont déjà amis
        dataUser = userPublic
            .filter((user: { id: any; }) => !allFriends.has(user.id))
            .map((user: { id: any; username: any; profilPicture: any; }) => ({
                id: user.id,
                username: user.username,
                profilPicture: user.profilPicture
            }))
            .sort((a: { username: string; }, b: { username: any; }) => a.username.localeCompare(b.username));

        success = true;
        message = 'Utilisateurs publics disponibles récupérés avec succès.';

    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }

    return { success, message, dataUser };
}


/**
 * @function selectPendingFriends
 * @description Affiche la liste des utilisateurs qui ont envoyé une demande d'amis
 * 
 * @param params - id du user
 * @returns {JSON} - Réponse de la requête 
 */
export async function selectPendingFriends(id: number): Promise<{ success: boolean; message: string; dataUser: ContainerFriendRequestsProps['friends'] }> {
    let success = false;
    let message = '';
    let dataUser: ContainerFriendRequestsProps['friends'] = [];
    try {
        // 1 - On récupère les utilisateurs avec une demande d'amis en attente
        const pendingFriends = await getFriends({ idFriend: id, state: 0 });
        if (pendingFriends.length <= 0) {
            return { success, message: "Aucun amis en attente", dataUser };
        }

        // 2 - Récupérer les détails pour chaque utilisateur en attente
        for (const friend of pendingFriends) {
            const userDetails = await getUsers({ id: friend.idUser });
            dataUser.push({
                id: userDetails[0]['id'],
                username: userDetails[0]['username'],
                profilPicture: userDetails[0]['profilPicture'],
            });
        }

        success = true;
        message = 'Utilisateurs en attente récupérés avec succès.';
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }

    return { success, message, dataUser };
}

/**
 * @function selectListFriends
 * @description Affiche la liste des amis
 * 
 * @param params - id du user
 * @returns {JSON} - Réponse de la requête 
 */
export async function selectListFriends(id: number): Promise<{ success: boolean; message: string; dataUser: ContainerFriendRequestsProps['friends'] }> {
    let success = false;
    let message = '';
    let dataUser: ContainerFriendRequestsProps['friends'] = [];
    try {
        // 1 - On récupère les utilisateurs avec une demande d'amis en attente
        const Friends1 = await getFriends({ idUser: id, state: 1 });
        const Friends2 = await getFriends({ idFriend: id, state: 1 });
        if (Friends1.length <= 0 && Friends2.length <= 0 ) {
            return { success, message: "Aucun amis (loser)", dataUser };
        }
        // 2 - Récupérer les détails pour chaque utilisateur en attente
        for (const friend of Friends1) {
            const userDetails = await getUsers({ id: friend.idFriend });
            dataUser.push({
                id: userDetails[0]['id'],
                username: userDetails[0]['username'],
                profilPicture: userDetails[0]['profilPicture'],
            });
        }
        for (const friend of Friends2) {
            const userDetails = await getUsers({ id: friend.idUser });
            dataUser.push({
                id: userDetails[0]['id'],
                username: userDetails[0]['username'],
                profilPicture: userDetails[0]['profilPicture'],
            });
        }
        success = true;
        message = 'Utilisateurs en attente récupérés avec succès.';
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }

    return { success, message, dataUser };
}



/**
 * @function acceptFriends
 * @description Affiche la liste des amis
 * 
 * @param params - id du user
 * @returns {JSON} - Réponse de la requête 
 */
export async function acceptFriends(id: number, idFriend: number): Promise<{ success: boolean; message: string }> {
    let success = false;
    let message = '';
    try {
        updateFriend({
            idFriend : id,
            idUser: idFriend,
            state: 1
        })
        success = true;
        message = 'Demande d\'ami validée';

    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }

    return { success, message };
}

/**
 * @function removeFriends
 * @description Affiche la liste des amis
 * 
 * @param params - id du user
 * @returns {JSON} - Réponse de la requête 
 */
export async function removeFriends(id: number, idFriend: number): Promise<{ success: boolean; message: string }> {
    let success = false;
    let message = '';
    try {
        deleteFriend(id, idFriend);
        deleteFriend(idFriend, id);
        success = true;
        message = 'Ami supprimé';

    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }

    return { success, message };
}

/**
 * @function RequestFriends
 * @description Affiche la liste des amis
 * 
 * @param params - id du user
 * @returns {JSON} - Réponse de la requête 
 */
export async function RequestFriends(id: number, idFriend: number): Promise<{ success: boolean; message: string }> {
    let success = false;
    let message = '';
    try {
    // 1 - On double vérifie si il existe pas déjà
    const Friends1 = await getFriends({ idUser: id, idFriend : idFriend });
    const Friends2 = await getFriends({ idUser: idFriend, idFriend : id });
    if (Friends1.length > 0 && Friends2.length > 0 ) {
        return { success, message: "Vous êtes déjà amis ou la demande a déjà été envoyée" };
    }
    // 2 - On ajoute à la db
    createFriend({
        idUser : id,
        idFriend : idFriend,
        state : 0
    })
    success = true;
    message = "Demande d'ami envoyée !";
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la demande';
    }

    return { success, message };
}