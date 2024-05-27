import { UserInfo } from "../components/types/UserInfo";

const url = `${process.env.REACT_APP_API_URL}user/`;
const token = localStorage.getItem('token');

/**
 * @function getUsers
 * @description Récupère les URI des ressources membres de la ressource collection dans le corps de la réponse.  
 * 
 * @param params 
 * @returns {JSON} - Réponse de la requête
 */
export async function getUsers(params?: Record<string, string | number | Array<string | number>>) {
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
 * @function createUser
 * @description Crée une ressource membre dans la ressource collection en utilisant les instructions du corps de la requête. 
 * 
 * @param userData 
 * @returns {JSON} - Réponse de la requête
 */
export async function createUser(userData : Record<string, string | number>) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const responseData = await response.json();
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
 * @function updateUser
 * @description Met à jour toutes les représentations des ressources membres de la ressource collection en utilisant les instructions du corps de la requête.
 * 
 * @param userData 
 * @returns {JSON} - Réponse de la requête
 */
export async function updateUser(userData : Record<string, string | number | null>) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const responseData = await response.json();
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
 * @function getStats
 * @description Récupère les URI des ressources membres de la ressource collection dans le corps de la réponse.  
 * 
 * @param param
 * @returns {JSON} - Réponse de la requête
 */
export async function getStats(param: Record<string, number | undefined>) {
    const urlstat = `${url}stats.php`;
    const key = Object.keys(param)[0];
    const value = param[key];
    if (value === undefined) {
        throw new Error('Missing parameter value');
    }
    const queryString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${urlstat}?${queryString}`, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error('Erreur lors de la requête : ', response.status);
            return response.status;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
}

export async function getUserInfoById(playerIds: number[]): Promise<UserInfo[]> {
    const userInfoList: UserInfo[] = [];
    
    for (const playerid of playerIds) {
        try {
            const userResponse = await getUsers({ id : playerid });
            if (userResponse.length > 0) {
                const userInfo: UserInfo = {
                    id: userResponse[0]['id'],
                    email: userResponse[0]['email'],
                    name: userResponse[0]['username'],
                    profilPicture: userResponse[0]['profilPicture'],
                    tokenR: userResponse[0]['tokenR'],
                    visibility: userResponse[0]['visibility'],
                    verified: userResponse[0]['verified'] === 1 ? true : false,
                    admin: userResponse[0]['admin'] === 1 ? true : false,
                    birthYear: userResponse[0]['birthYear']
                };
                userInfoList.push(userInfo);
            } else {
                console.warn(`Utilisateur avec ID ${playerid} non trouvé`);
            }
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur avec ID ${playerid}:`, error);
        }
    }

    return userInfoList;
}

