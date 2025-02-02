import { UserInfo } from "../components/types/UserInfo";
import { createLog } from "./LogServices";
import { sendMail } from "./SendMailsServices";
import { createUser, getUsers, updateUser } from "./UserServices";
import { isValidBirthYear, isValidEmail, isValidPassword, isValidUsername } from "./UtilsServices";

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
export async function accountConnection(formData: { username: string; password: string; }) : Promise<{ success: boolean; message: string; data: UserInfo; token:string }> {
    let success = false;
    let message = '';
    let token = '';
    let dataUser = {
        id: 0,
        email: "",
        name: "",
        profilPicture: "",
        birthYear: "",
        tokenR: null,
        visibility: "",
        verified: false,
        admin: false,
    };
    try {
        const userResponse = await getUsers({ username: formData.username });
        if (userResponse.length <= 0) {
            return { success, message : "Nom d'utilisateur invalide", data : dataUser, token};
        }
        const passwordResponse = await passwordVerify({
            username: formData.username,
            password: formData.password
        });
        if (passwordResponse.error) {
            return { success, message : "Le mot de passe n'est pas valide", data : dataUser, token};
        } else if (passwordResponse.token) {
            token = passwordResponse.token;
        }
        success = true;
        message = "Connexion établie";
        // CREATION CONTEXTE
        dataUser = ({
            id: userResponse[0]['id'],
            email: userResponse[0]['email'],
            name: userResponse[0]['username'],
            profilPicture: userResponse[0]['profilPicture'],
            tokenR: userResponse[0]['tokenR'],
            visibility: userResponse[0]['visibility'],
            verified: userResponse[0]['verified'] === 1 ? true : false,
            admin: userResponse[0]['admin'] === 1 ? true : false,
            birthYear: userResponse[0]['birthYear']
        });
        createLog({
            idUser: userResponse[0]['id'],
            log: 'Connexion',
        }); 

        // token en context

    } catch (error) {
        success = false;
        message = 'Une erreur s\'est produite lors de la connexion.';
    }
    return { success, message, data : dataUser, token};
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
export async function accountInscription(formData: { username: string; birthYear : string; email: string; password: string; passwordConfirmation : string; }) : Promise<{ success: boolean; message: string; typeError : string | undefined }> {
    let success = false;
    let message = '';
    let typeError = 'error';
    // 1 - Vérification par IsValid des datas ? UtilsServices ?
    let validation = await formValidation(formData);
    if (!validation.success) { return { success, message : validation.message, typeError : "warning"} }
    // 1 bis - Vérification que l'username ou l'email n'est dans la db
    try {
        const userVerifResponse = await getUsers({ username: formData.username });
        if (userVerifResponse.length > 0) { return { success, message : "Ce nom d'utilisateur est déjà utilisé", typeError : "warning" }; }
        const emailVerifResponse = await getUsers({ email: formData.email });
        if (emailVerifResponse.length > 0) { return { success, message : "L'adresse mail est déjà utilisée", typeError : "warning" }; }
        // 2 - createUser de UserServices formData ->  récup idUser
        let user = await createUser({
            username: formData.username,
            birthYear: formData.birthYear,
            email: formData.email,
            password: formData.password,
        });
        //3 - createLog de LogServices ( idUser , 'création de compte' )
        createLog({
            idUser: user.lastId[0][0],
            log: 'Inscription',
        }); 
        //4 - sendMailverify de SendMailServices ( email )
        sendMail({
            email : formData.email,
            action : "verify"
        }) 
        success = true;
        message = "Inscription terminée ! N'oubliez pas de vérifier vos mails pour le lien de confirmation (Pensez à vérifier les spams)";
        typeError = "success";
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }
    return { success, message, typeError };
}

/**
 * @function formValidation
 * @description Vérifier si les infos sont valides
 *
 * @param formData infos l'utilisateur
 * @returns {Promise:any} 
 */
export async function formValidation(formData: { username: string; birthYear : string; email: string; password: string; passwordConfirmation : string; }) : Promise<{ success: boolean; message: string; }> {
    let success = false;
    let message = '';
    // 1 - Vérification par IsValid des datas ? UtilsServices ?
    if (!isValidUsername(formData.username)) { return { success, message : "Le Pseudo ne doit pas contenir de caractères spéciaux " }; }
    else if (!isValidBirthYear(formData.birthYear)) { return { success, message : "La date de naissance est invalide" }; }
    else if (!isValidEmail(formData.email)) { return { success, message : "L'adresse mail est invalide" }; }
    else if (!isValidPassword(formData.password) && !isValidPassword(formData.passwordConfirmation)) { return { success, message : "Le mot de passe n'est pas valide, il doit être entre 12 et 40 caractère, contenir une majuscule, une minuscule, un chiffre et un caractère spécial " }; }
    else if (formData.password !== formData.passwordConfirmation) { return { success, message : "les deux mots de passes doivent correspondre" }; }
    else {
        success = true;
    }
    return { success, message };
}

/**
 * @function accountUpdate
 * @description Vérification si l'utilisateur est admin pour lui donner les droits correspondants - Accès aux pages admin ou modifications
 * 
 * @param username - user de l'utilisateur
 * @returns {boolean}
 */
export async function accountUpdate(formData: UserInfo, prevInfo : UserInfo) : Promise<{ success: boolean; message: string; dataUser: UserInfo; typeError : string | undefined }> {
    let success = false;
    let message = '';
    let typeError = 'error';
    let dataUser = {
        id: 0,
        email: "",
        name: "",
        profilPicture: "",
        birthYear: "",
        tokenR: null,
        visibility: "",
        verified: false,
        admin: false,
    };
    if (!isValidUsername(formData.name)) { return { success, message : "Le Pseudo ne doit pas contenir de caractères spéciaux ", dataUser , typeError : "warning"}; }
    else if (!isValidBirthYear(formData.birthYear)) { return { success, message : "La date de naissance est invalide", dataUser , typeError : "warning"}; }
    else if (!isValidEmail(formData.email)) { return { success, message : "L'adresse mail est invalide", dataUser , typeError : "warning"}; }
    // 1 bis - Vérification que l'username ou l'email n'est dans la db
    try {
        if (prevInfo.name !== formData.name) {
            const userVerifResponse = await getUsers({ username: formData.name });
            if (userVerifResponse.length > 0) { return { success, message : "Ce nom d'utilisateur est déjà utilisé", dataUser, typeError : "warning" }; }
        } else if (prevInfo.email !== formData.email) {
            const emailVerifResponse = await getUsers({ email: formData.email });
            if (emailVerifResponse.length > 0) { return { success, message : "L'adresse mail est déjà utilisée", dataUser, typeError : "warning" }; }
        }
        // 2 - createUser de UserServices formData ->  récup idUser
        await updateUser({
            id : formData.id,
            username: formData.name,
            birthYear: formData.birthYear,
            profilPicture : formData.profilPicture,
            email: formData.email,
            visibility : formData.visibility
        });
        //3 - createLog de LogServices ( idUser , 'création de compte' )
        createLog({
            idUser: formData.id,
            log: 'Modification du profil',
        }); 
        // 4 - getUser ( name )
        const userResponse = await getUsers({ username: formData.name });
        if (userResponse.length <= 0) {
            return { success, message : "Nom d'utilisateur invalide", dataUser, typeError : "warning"};
        }
        dataUser = ({
            id: userResponse[0]['id'],
            email: userResponse[0]['email'],
            name: userResponse[0]['username'],
            profilPicture: userResponse[0]['profilPicture'],
            tokenR: userResponse[0]['tokenR'],
            visibility: userResponse[0]['visibility'],
            verified: userResponse[0]['verified'] === 1 ? true : false,
            admin: userResponse[0]['admin'] === 1 ? true : false,
            birthYear: userResponse[0]['birthYear']
        });
        success = true;
        message = "Modification correctement effectuée";
        typeError = "success";
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }
    return { success, message, dataUser, typeError }; 
}

/**
 * @function accountVerify
 * @description Vérification si l'utilisateur est admin pour lui donner les droits correspondants - Accès aux pages admin ou modifications
 * 
 * @param token - user de l'utilisateur
 * @returns {boolean}
 */
export async function accountVerify(token : string) {
    let success = false;
    let message = '';
    try {
        // 1 - Si il existe un compte à verify 0, et token à token
        const userResponse = await getUsers({ tokenR : token , verified : 0 });
        if (userResponse.length <= 0) {
            return { success, message : "Il y a un problème avec la vérification"};
        }
        // 2 - Si il y a, on update le verify et 
        updateUser({ 
            id : userResponse[0]['id'], 
            tokenR : null, 
            verified : 1 
        });
        createLog({
            idUser: userResponse[0]['id'],
            log: 'Vérification du compte',
        }); 
        success = true;
        message = "Connexion établie";
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la vérification de votre compte.';
    }
    return { success, message};
}

/**
 * @function accountForgotPassword
 * @description Envoi un mail
 * 
 * @param email - user de l'utilisateur
 * @returns {boolean}
 */
export async function accountForgotPassword(emailform : string) {
    let success = false;
    let message = '';
    try {
        // 1 - Si il existe un compte 
        const userResponse = await getUsers({ email: emailform });
        if (userResponse.length <= 0) {
            return { success, message : "Il n'existe aucun compte avec cette adresse email"};
        }
        // 2 - Si il y a, on envoi
        sendMail({
            email : emailform,
            action : "recovery"
        }) 
        createLog({
            idUser: userResponse[0]['id'],
            log: 'Récupération du mot de passe',
        }); 
        success = true;
        message = "Vérifier vos mails pour le lien de confirmation (Pensez à vérifier les spams)";
    } catch (error) { 
        message = 'Une erreur s\'est produite lors de la vérification de votre compte.';
    }
    return { success, message};
}


/**
 * @function accountUpdate
 * @description Vérification si l'utilisateur est admin pour lui donner les droits correspondants - Accès aux pages admin ou modifications
 * 
 * @param formData
 * @returns {boolean}
 */
export async function accountChangePassword(formData: { token: string, password: string; passwordConfirmation: string; }) : Promise<{ success: boolean; message: string; typeError : string | undefined }> {
    let success = false;
    let message = '';
    let typeError = 'success';
    try {
        const userResponse = await getUsers({ tokenR : formData.token });
        if (userResponse.length <= 0) {
            return { success, message : "Erreur de Token", typeError : "error"};
        }
        else if (!isValidPassword(formData.password) && !isValidPassword(formData.passwordConfirmation)) { return { success, message : "Le mot de passe n'est pas valide, il doit être entre 12 et 40 caractère, contenir une majuscule, une minscule, un chiffre et un caractère spécial " ,typeError : "warning"}; }
        else if (formData.password !== formData.passwordConfirmation) { return { success, message : "les deux mots de passes doivent correspondre", typeError : "warning" }; }
        updateUser({ 
            id : userResponse[0]['id'], 
            tokenR : null, 
            password : formData.password
        });
        sendMail({
            email : userResponse[0]['email'],
            action : "update"
        }) 
        createLog({
            idUser: userResponse[0]['id'],
            log: 'Changement du mot de passe',
        }); 
        success = true;
        message = "Changement réussi établie";
    } catch (error) {
        message = 'Une erreur s\'est produite lors de la connexion.';
    }
    return { success, message, typeError};
}