import { getUsers } from "./UserServices";

/**
 * @function passwordVerify
 * @description On vérifie l'égalité entre le mot de passe du form et celui de la db
 *
 * @param formData username et password de l'utilisateur
 * @returns {boolean} le mot de passe est bon ou non
 */
export async function passwordVerify(formData: { username: string; password: string; }) {
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

/**
 * @function accountConnection
 * @description On vérifie si les identifiants de connexions sont bons
 *
 * @param formData username et password de l'utilisateur
 * @returns {boolean} ce sont des identifiants de connexion valides ou non
 */
export async function accountConnection(formData: { username: string; password: string; }) {
    try {
        const userResponse = await getUsers({ username: formData.username });
        if (!userResponse) {
            throw new Error('Username INVALIDE');
        }
        const passwordResponse = await passwordVerify({
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

/**
 * @function accountInscription
 * @description Inscription de l'utilisateur dans la db
 *
 * @param formData infos l'utilisateur
 * @returns {Promise:any} 
 * 
 * 1 - Vérification par IsValid des datas ? UtilsServices ? + Vérification email ou username pas dans la db !!!!  ? PermissionsServices ou UserServices ?
 * 2 - createUser de UserServices formData ->  récup idUser
 * 3 - createLog de LogServices ( idUser , 'création de compte' )
 * 4 - sendMailverify de SendMailServices ( email )
 */

/**
 * @function isAdmin
 * @description Vérification si l'utilisateur est admin pour lui donner les droits correspondants - Accès aux pages admin ou modifications
 * 
 * @param username - user de l'utilisateur
 * @returns {boolean}
 */
