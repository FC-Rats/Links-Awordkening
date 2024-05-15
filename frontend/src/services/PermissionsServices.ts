import { getUsers } from "./UserServices";

export async function passwordverify(formData: { username: string; password: string; }) {
    try {
        const url = `${process.env.REACT_APP_API_URL}user/password-verify.php`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData)
            return responseData;
        } else {
            console.error('Erreur lors de la requête : ', response.status);
            return response.status;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite : ', error);
    }
}

export async function accountConnection(formData: { username: string; password: string; }) {
    try {
        const userResponse = await getUsers({ username: formData.username });
        if (!userResponse) {
            throw new Error('Username INVALIDE');
        }
        const passwordResponse = await passwordverify({
            username: formData.username,
            password: formData.password
        });
        if (!userResponse) {
            throw new Error('MOT DE PASSE INVALIDE');
        }
        return true;
    } catch (error) {
        console.error(error);
        return { error: 'Une erreur s\'est produite lors de la connexion.' };
    }
}
