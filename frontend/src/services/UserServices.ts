const url = `${process.env.REACT_APP_API_URL}user/`;

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
