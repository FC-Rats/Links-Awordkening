/** 
 * @function getIp
 * @description Fonction qui FETCH l'API ipify pour trouver l'adresse ip du client
 * 
 * @returns {string} adresse IP
 */
export async function getIp() {
    let ip = "";
    await fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        ip = data.ip;
    })
    .catch(error => error.json())
    return ip + "";
}

/** 
 * @function isValidUsername
 * @description Expression régulière sur l'username ()
 * ex : Artena, Momo, Moumoune77
 * 
 * @param {string} username
 * @returns {boolean} valide ou non
 */
export function isValidUsername(username: string) : boolean {
    let regex = /^[A-Za-z][A-Za-z0-9_]{2,29}$/i;
    return regex.test(username);
}

/** 
 * @function isValidBirthYear
 * @description Expression régulière sur l'année de naissance
 * ex : 2001, 1998, 1987
 * 
 * @param {number} birthYear
 * @returns {boolean} valide ou non
 */
export function isValidBirthYear(birthYear: string) : boolean {
    let regex = /\d\d\d\d/i;
    return regex.test(birthYear.toString());
}

/** 
 * @function isValidEmail
 * @description Expression régulière sur l'email
 * ex : le.ol@gmail.com , kre@outlook.fr 
 * 
 * @param {string} email
 * @returns {boolean} valide ou non
 */
export function isValidEmail(email: string) : boolean {
    let regex = /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;    
    return regex.test(email);
}

/** 
 * @function isValidPassword
 * @description Expression régulière sur le mot de passe ()
 * ex : Lolola_best77
 * 
 * @param {string} mdp
 * @returns {boolean} valide ou non
 */
export function isValidPassword(mdp: string) : boolean {
    var regex = /^(?=.*[0-9])(?=.*[@\[\]\^_!"#$%&'()*+,./:;{}<>=|~?])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@\[\]\^_!"#$%&'()*+,./:;{}<>=|~?]{12,40}$/;
    return regex.test(mdp);
}