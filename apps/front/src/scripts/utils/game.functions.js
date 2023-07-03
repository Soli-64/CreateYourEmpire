
/**
 * @param {number} value 
 * @param {number} bonus Bonus entre 0 et 100
 * @returns {number} retourne le nombre en appliquant le bonus
 */
export function applyBonus(value, bonus) {
    return value + (value * (bonus / 100))
}
