
export * as game from './utils/game.functions.js'
export * as numberFunctions from './utils/number.functions.js'
export * as elements from './utils/element.functions.js'



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
