import crypto from 'crypto'
import fs from 'fs'

/**
 * Fonction pour signer un contenu
 * @param {JSON} d 
 * @returns {Array} [data, signature]
 */

export function signeData(d, keyFilePath) { // Le retour de cette fonction marche
    const privateKey = JSON.parse(fs.readFileSync(keyFilePath, {encoding: 'utf-8'})).privateKey
    const data = d
    const hmac = crypto.createHmac('md5', privateKey);
    hmac.update(data);
    const signature = hmac.digest('hex');
    return signature
}

/**
 * Fonction qui verifie la signature d'une valeur selon la clé privée
 * @param {any} d contenu a vérifiée
 * @param {string} signature signature pour le contenu
 * @returns {boolean} true si la signature est la bonne
 */
export function verifySignature(d, signature) {
    const dataSignature = signeData(d, '../src/signer/keys.json')
    if (dataSignature === signature) {
        return true
    } else {
        return false
    }
}
