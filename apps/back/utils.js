import { readFile, writeFile } from 'node:fs/promises'

export async function updateJson(path, pathcontent, content=[]) {
    const data = JSON.parse(await readIn(path))
    console.log(data)
    data.id[content[1]] = content[0]
    const updatedData = JSON.stringify(data, null, 2)
    await writeFile(path, `${updatedData}\n`)
}

/**
 * 
 * @param {string} path 
 * @returns {string}
 */
export async function readIn(path) {
    return await readFile(path, {encoding: 'utf-8'})
}
