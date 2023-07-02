import * as numberFile from './utils/number.js'
import { Mine } from '../components/mine/mine.js'
import { World } from '../components/world/world.js'


export const numberFunctions = numberFile

/**
 * 
 * @param {string} tagName 
 * @param {Object} attributes 
 * @param {string} innertext 
 * @returns {HTMLElement}
 */
export function createElement(tagName, attributes, innertext) {
    const element = document.createElement(tagName)
    for (const [attribut, value] of Object.entries(attributes)) {
        if (value !== null) {
            element.setAttribute(attribut, value)
        }
    }
    element.innerText = innertext
    return element
}

/**
 * 
 * @param {string} className 
 * @param {object} params 
 * @returns {Class}
 */
export function createInstance(className, params) {

    const classMap = {
        Mine: Mine,
        World: World
    }
    if (className in classMap) {
        const ClassRef = classMap[className]

        const cParams = Object.values(params)

        const instance = new ClassRef(...cParams);
        // for (const [param, val] of Object.entries(params)) {
        //     instance[param] = val
        // }
        return instance;
    } else {
        console.log('Erreur createInstance')
        return
    }

    
  }
