const url = `${process.env.REACT_APP_API_URL}log/`;
const token = localStorage.getItem("token");

/**
 * @function getLogs
 * @description Récupère les URI des ressources membres de la ressource collection dans le corps de la réponse.  
 * 
 * @param params 
 * @returns {JSON} - Réponse de la requête
 */
export async function getLogs(params?: Record<string, string | number | Array<string | number>>) {
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
 * @function createLog
 * @description Crée une ressource membre dans la ressource collection en utilisant les instructions du corps de la requête. 
 * 
 * @param logData 
 * @returns {JSON} - Réponse de la requête
 */
export async function createLog(logData: Record<string, string | number>) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
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
 * @function updateLog
 * @description Met à jour toutes les représentations des ressources membres de la ressource collection en utilisant les instructions du corps de la requête.
 * 
 * @param logData 
 * @returns {JSON} - Réponse de la requête
 */
export async function updateLog(logData: Record<string, string | number>) {
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
            body: JSON.stringify(logData),
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

