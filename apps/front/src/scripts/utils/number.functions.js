
/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export const randint = (min, max) => {
    result = -1
    while (result < min) {
        var result = Math.round((Math.random() * max))
        if (result >= min) {
            return result
        }
    }
}

/**
 * 
 * @param {number} nOfCharacters nombre de charactères souhaités
 * @param {string} include letters | numbers | all
 * @returns {string} retourne un id aléatoire
 */
export const newRandomId = (nOfCharacters, include) => {
    if (include) {
        switch (include) {
            case 'numbers':
                let idNumber = ''
                for (let y = 0; y <= nOfCharacters - 1; y++) {
                    idNumber += randint(0, 9).toString()
                }
                return idNumber
            case 'letters':
                let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
                let idLetter = ''; 
                for (let i = 0; i <= alphabet.length - 1; i++) {
                    idLetter += alphabet[randint(0, alphabet.length - 1)]
                }
                return idLetter
            case 'all':
                let alphabet2 = 'abcdefghijklmnopqrstuvwxyz'.split('')
                let idAll = '';
                let previousIsLetter = true
                for (let x = 0; x <= nOfCharacters - 1; x++) {
                    if (previousIsLetter) {
                        idAll += randint(0, 9).toString()
                        previousIsLetter = false
                    } else {
                        idAll += alphabet2[randint(0, alphabet2.length - 1)]
                        previousIsLetter = true
                    }
                }
                return idAll
        }
    }
}

/**
 * 
 * @param {object} data Objet où l'on cherche l'id
 * @param {number} nOfCharacters nombre de charactères souhaités
 * @param {string} include letters | numbers | all
 * @returns {string} retourne un id non existant dans la base de donnée fournie
 */
export function newUniqueId(data, nC, include) {
    const id = newRandomId(nC, include)
    if ( idExist(data, id)) {
        return newUniqueId(nC, include)
    } else {
        return id
    }
}

/**
 * 
 * @param {number} n 
 * @param {number} t 
 * @returns {number}
 */
export function caculPercentage(n, t) {
    return Math.round((n / t) * 100)
}

/**
 * 
 * @param {number} numberOfAction 
 * @param {number} time 
 * @returns {number}
 */
export function intervalFor(numberOfAction, time) {
    return Math.round(time / numberOfAction)
}

/**
 * 
 * @param {object} data 
 * @param {string | number} id 
 * @returns 
 */
export function idExist(data, id) {
    const exist = Object.keys(data).filter(e => e === id);
    if (exist.length > 0) {
        return true
    } else {
        return false
    }
}

/**
 * Fonction qui retourne un le pourcentage de n pour t = 100%
 * @param {number} n valeur 
 * @param {number} t total
 * @returns {number} n% de t
 */
export function percentageOf(n, t) {
    return (n / t) * 100
}