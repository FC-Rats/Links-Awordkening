const url = `${process.env.REACT_APP_API_URL}friend/`;





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
