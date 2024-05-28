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
export async function sendMail(mailData: Record<string, string | number>) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailData),
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
