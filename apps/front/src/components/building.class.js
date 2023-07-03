
import { numberFunctions, elements } from "../scripts/utils.js";

export class Building {

    constructor(gamesInfos, world, level, id) {

        this.world = world
        this.player = gamesInfos.gamePlayer
        this.id = id ? id : numberFunctions.newUniqueId(this.player.gamesId, 5, 'all')
        this.bonus = 0
        this.__init__(() => {
            this.classLoop()
            const buttonElement = elements.createElement('img', {class: `${this.type}-defaultmenu-logo`, src: this.imgPath}, '')
            document.querySelector('.game-content-board-buildings-icons').append(buttonElement)
        }, level ? level : 1)
    }

    setType(type) {
        this.type = type
    }

    /**
     * @param {Function} callback 
     * @param {number | string} level 
     */
    __init__(callback, level) {
        this.level = Number(level)
        this.getJsonData(callback)
    }

    getJsonData(callback) {
        fetch(`/src/components/${this.type}/${this.type}.json`)
            .then(response => response.json())
            .then(data => {
                const levelsSettings = data.level[this.level];
                this.upgradeCost = levelsSettings.forUpgrade
                Object.keys(levelsSettings.gain).forEach(gainName => {
                    this.gain[gainName] = levelsSettings.gain[gainName]
                })
                this.imgPath = data.imagePath
                callback()
            })
            .catch(error => {
                console.error('Erreur :', error)
            })
    }

    /**
     * 
     * @param {string} description 
     * @param {object} ressources 
     */
    createMenu(description, ressources) {
        const menuContainer = elements.createElement('section', {class: `${this.type}-menu`, id: `i${this.id}`}, '')
        const menuStats = elements.createElement('div', {class: `${this.type}-menu-stats`}, '')
        menuStats.append( elements.createElement('h2', {class: `${this.type}-menu-stats-title`}, `${this.type} ${this.id}`)     )
        const menuDescription = elements.createElement('p', {class: `${this.type}-menu-stats-desciption`}, 'Description: ')
        menuDescription.append( elements.createElement('br', {}, '') )
        menuDescription.append( elements.createElement('span', {class: `framed`}, `${description}`) )
        const menuLevel = elements.createElement('p', {class: `${this.type}-menu-stats-level`}, 'Niveau: ')
        menuLevel.append( elements.createElement('span', {class: `${this.type}-menu-stats-level-c framed`}, `${this.level}`) )
        const menuCostZone = elements.createElement('div', {class: `${this.type}-menu-stats-cost`}, '')
        menuCostZone.append( elements.createElement('p', {class: ``}, 'Prochaine Amélioration: ') )
        for (const [attr, val] of Object.entries(ressources)) {
            const ressourceZone = elements.createElement('p', {class: `${this.type}-menu-stats-cost-e`}, `${attr}:`)
            const costFrame = elements.createElement('div', {class: `framed`}, '/')
            costFrame.prepend( elements.createElement('span', {id: `player${attr}`}, `${val.posseded}`) )
            costFrame.append( elements.createElement('span', {id: `${attr}Cost`}, `${val.required}`) )
            ressourceZone.append( costFrame )
            menuCostZone.append( ressourceZone )
        }
        const menuUpgradeButton = elements.createElement('button', {class: `${this.type}-menu-upgrade-button`}, 'Améliorer')
        menuContainer.append(
            menuStats,
            menuUpgradeButton
        )
        return menuContainer
    }

    refreshMenu() {
        this.menu = document.querySelector(`#i${this.id}`)
        if (this.menu !== null) {
            document.querySelector('.mine-menu-stats-level-c').innerHTML = `${this.level}`
            Object.keys(this.upgradeCost).forEach(resrc => {
                document.querySelector(`#${resrc}Cost`).innerHTML = `${this.upgradeCost[resrc]}`
                document.querySelector(`#player${resrc}`).innerHTML = `${this.player.ressources[resrc]}`
            })
        } else {
            return
        }
    }

    addMenu() {
        const menu = this.createMenu()
        document.querySelector('.game-content-board-buildings-menus').innerHTML = ''
        document.querySelector('.game-content-board-buildings-menus').append(menu)
        document.querySelector(`${this.type}-menu-upgrade-button`).addEventListener('click', () => {this.upgradeThis()})
    }

    /**
     * Fonction servant a améliorer la mine
     */
    upgradeThis() {
        // Vérification des ressources
        const cost = Object.keys(this.upgradeCost)
        let checker = []
        cost.forEach(value => {
            if (this.player.ressources[value] >= this.upgradeCost[value]) {
                checker.push(true)
            } else {
                checker.push(false)
            }
        })
        for (const isValid in checker) {
            if (checker[isValid] !== true) {
                elements.newAlert('Pas assez de ressources !', 'red')
                return
            }
        }
        // Amélioration
        this.player.ressources.iron -= this.upgradeCost.iron
        this.player.ressources.gold -= this.upgradeCost.gold
        elements.newAlert(`${this.type} améliorée au niveau ${this.level+1}`, 'green')
        this.world.increaseXp(100, this.bonus)
        this.__init__(() => {}, this.level + 1)
    }

    /**
     * Modifier le bonus
     * @param {number} bonus 
     */
    setBonus(bonus) {
        this.bonus = bonus
    }

    /**
     * Fonction qui retourne l'état actuel de la mine.
     */
    returnActualThis() {
        return {
            type: this.type,
            actualId: this.id,
            actualLevel: this.level
        }
    }

    async classLoop() {
        setInterval(() => {this.refreshMenu()}, 100)
    }

}