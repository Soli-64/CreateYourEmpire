import axios from 'axios';

/**
 * 
 * @param {object} content 
 */
export async function savedWorldFile(content) {
  try {
    axios.get(`http://localhost:3000/saveWorld/${JSON.stringify(content)}`)
  } catch {
    console.error('Erreur Sauvegarde BackFunctions')
  }
}

/**
 * 
 * @param {object} content2 
 */
export async function signData(content2) {
  try {
    const response = await axios.get(`http://localhost:3000/signData/${JSON.stringify(content2)}`)
    return response.data
  } catch {
    console.error('Erreur signer Data BackFunctions')
    throw error
  }
}

/**
 * 
 * @param {object} content 
 * @param {string} signature 
 * @returns {boolean} Retourne true si la signature est la bonne.
 */
export async function verifyDataSignature(content, signature) {
  try {
    const response = await axios.get(`http://localhost:3000/verifyDataSignature/${JSON.stringify(content)}/${signature}`)
    if (response.data) {
      return true
    } else {
      return false
    }
  } catch {
    console.error('Erreur verifySignature BackFunctions')
  }
}

