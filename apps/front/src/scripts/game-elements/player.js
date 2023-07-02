

export class Player {

    gamesId = { }

    /**
     * 
     * @param {string} name 
     * @param {number | string} id 
     * @param {number} level 
     * @param {Object} ressources 
     */
    constructor (name, id, level) {

        this.name = name
        this.id = id
        this.level = level
        this.ressources= {
            gold: 0,
            iron: 0,
            wood: 0,
            wheat: 0,
            feed: 0
        }
        
        this.classLoop()
    }

    getRessource(ressourceName) {
        return this.ressources[ressourceName]
    }

    modifyRessource(ressourceName, value) {
        this.ressources[ressourceName.toString()] = Number(value)
    }

    modifyPseudo(newPseudo) {
        if (this.name !== newPseudo) {
            this.name = newPseudo
        }
    }

    setDomRessourceValue() {
        Object.keys(this.ressources).forEach(e => {
            document.querySelector(`#${e}`).innerHTML = this.ressources[e]
        })
    }

    returnActualThis() {
        return {
            type: 'Player',
            actualId: this.id,
            actualLevel: this.level,
            actualName: this.name,
            ressources: this.ressources,
            usedId: this.gamesId
        }
    }

    async classLoop() {
        setInterval(() => {this.setDomRessourceValue()}, 100)
    }

}