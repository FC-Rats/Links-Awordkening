export {};

const url = `${process.env.REACT_APP_API_URL}mail/`;

/** To-Do PHP API
*    - Index Case selon POST
*    - Redirection vers les fichiers
*    - Changer les paths du mail qui sont faux
*/

// Fonction PRIVATE ou PROTECTED
/** 
 * @function sendMail
 * @description Fonction qui FETCH l'API
 * 
 * @param email -> email de LA_USER
 * @param typeofmail -> "verify" "password" "confirmation"
 *  
 * 2 - Fetch de url avec en POST
 * 3 - Dans mail/index.php CASE selon typeofmail qui renvoit mail-password ou mail-verify    
 */

/**
 * @function sendMailRecup
 * @description Fonction qui vérifie l'autenticité avant d'appeler sendMail
 * 
 * @param email -> email de LA_USER
 * 
 * 1 - Vérification si il existe le mail dans le db avec un getUser(?email=email) dans UserServices
 * 2 - On renvoit à SendMail ("password")
 */

/**
 * @function sendMailVerif
 * @description Fonction qui vérifie l'autenticité avant d'appeler sendMail
 * 
 * @param email -> email de LA_USER
 * 
 * 1 - Vérification si il existe le mail dans le db avec un getUser(?email=email) dans UserServices
 * 2 - On renvoit à SendMail ("verify")
 */

/**
 * @function sendMailConfirmationModif
 * @description Fonction qui envoit une email que le mot de passe a bien été modifié
 * 
 * @param email -> email de LA_USER
 * 
 * 1 - Vérification si il existe le mail dans le db avec un getUser(?email=email) dans UserServices
 * 2 - On renvoit à SendMail ("confirmation")
 */
