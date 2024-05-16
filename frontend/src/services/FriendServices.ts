const url = `${process.env.REACT_APP_API_URL}friend/`;

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
        const response = await fetch(`${url}?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
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
export async function deleteFriend(id: number) {
    const queryString = `${encodeURIComponent('idFriend')}=${encodeURIComponent(id)}`;
    try {
        const response = await fetch(`${url}?${queryString}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
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