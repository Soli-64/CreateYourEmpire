import fs from 'node:fs'

/**
 * 
 * @param {any} content Contenu du fichier 
 * @param {string} path Chemin du fichier
 * @param {string} fileType Type du fichier
 */
export function createFile(content, path, fileType) {
    const data = content
    const filePath = path
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Une erreur s"est produite lors de la création du fichier JSON: ', err)
            return;
        }
    })
}

export function returnJSONWorld(fileContent, signature) {
    const data = JSON.stringify(fileContent)
    return data
}
