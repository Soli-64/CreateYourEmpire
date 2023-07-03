import Handlebars  from 'handlebars';
import { numberFunctions, elements } from "../../scripts/utils.js";

export class Mine {

    /**
     * @param {Object} gamesInfos 
     * @param {number | string} level 
     */
    constructor (gamesInfos, world, level, id) {

        this.world = world
        this.type = "Mine"
        this.player = gamesInfos.gamePlayer
        this.id = id ? id : numberFunctions.newUniqueId(this.player.gamesId, 5, 'all')
        this.bonus = 0
        this.player.gamesId[this.id] = 'mineId' 
        this.__init__(() => {
            this.classLoop()
            // Ajout de l'icon a la barre des icons
            const buttonElement = elements.createElement('img', {class: 'mine-defaultmenu-logo', src: this.imgPath}, '')
            document.querySelector('.game-content-board-buildings-icons').append(buttonElement)
            buttonElement.addEventListener('click', () => {
            if (document.querySelector(`.mine-menu`)) {
                document.querySelector('.mine-menu').remove()
                this.addMenu()
            } else {
                this.addMenu()
            }
        })
        }, level ? level : 1)
    }

    /**
     * @param {number | string} level 
     * @param {Function} callback 
     */
    __init__(callback, level) {
        this.level = Number(level)
        this.getJsonData(callback)
    }

    farmRessources(bonus) {
        this.player.ressources.iron += (this.ironGain * bonus)
        this.player.ressources.gold += (this.goldGain * bonus)
    }

    /**
     * Modifier le bonus
     * @param {number} bonus 
     */
    setBonus(bonus) {
        this.bonus = bonus
    }

    /**
     * Fonction qui récupère les informations dans mine.json
     * @param {Function} callback
     */
    getJsonData(callback) {
        fetch('/src/components/mine/mine.json')
            .then(response => response.json())
            .then(data => {
                const levelsSettings = data.level[this.level];
                this.ironGain = levelsSettings.gain.gainIron;
                this.goldGain = levelsSettings.gain.gainGold;
                this.upgradeCost = levelsSettings.forUpgrade
                this.maxDailyLoops = levelsSettings.maxDailyLoops
                this.imgPath = data.imagePath
                callback()
            })
            .catch(error => {
                console.error('Erreur :', error)
            })
    }

    addMenu() {
        const menu = elements.createElement('div', {class: `mine-menu`, id: `i${this.id}`}, '')
        document.querySelector('.game-content-board-buildings-menus').innerHTML = ''
        menu.innerHTML += this.mineStatsTemplate()
        document.querySelector('.game-content-board-buildings-menus').append(menu)
        document.querySelector('.mine-menu-upgrade-button').addEventListener('click', () => {this.upgradeThis()})
    }

    refreshMenu() {
        this.menu = document.querySelector(`#i${this.id}`)
        if (this.menu !== null) {
            document.querySelector('#playerIron').innerHTML = `${this.player.ressources['iron']}`
            document.querySelector('#playerGold').innerHTML = `${this.player.ressources['gold']}`
            document.querySelector('.mine-menu-stats-level-c').innerHTML = `${this.level}`
            document.querySelector('#ironCost').innerHTML = `${this.upgradeCost['iron']}`
            document.querySelector('#goldCost').innerHTML = `${this.upgradeCost['gold']}`
        } else {
            return
        }
    }

    /**
     * Fonction qui retourne le HTML pour le menu
     * @returns {string}
     */
    mineStatsTemplate() {
        const mineStats = `
            <div class="mine-menu-stats">
                <h2 class="mine-menu-stats-title">{{ nom }}</h2>
                <p class="mine-menu-stats-description" >Description: <br> <span class="framed">{{ description }}</span></p>
                <p class="mine-menu-stats-level" >Niveau: <span class="mine-menu-stats-level-c framed">{{ level }}</span></p>
                <div class="mine-menu-stats-cost" ><p class="mine-menu-stats-cost-title" >Prochaine Amélioration: </p>
                     <p class="mine-menu-stats-cost-e" >Fer: <span class="framed"><span id="playerIron">{{ playerIron }}</span>/<span id="ironCost">{{ ironCost }}</span></span></p>
                     <p class="mine-menu-stats-cost-e" >Or: <span class="framed"><span id="playerGold">{{ playerGold }}</span>/<span id="goldCost">{{ goldCost }}</span></span></p></div>
                <button class="mine-menu-upgrade-button"> Améliorer </button>
            </div>
        `
        const mineData = {
            nom: `Mine ${this.id}`,
            level: this.level,
            playerIron: this.player.ressources['iron'],
            playerGold: this.player.ressources['gold'],
            ironCost: this.upgradeCost['iron'],
            goldCost: this.upgradeCost['gold'],
            description: "Produit de l'or et du fer"
          };

        const template = Handlebars.compile(mineStats);
        return template(mineData);
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
        elements.newAlert(`Mine améliorée au niveau ${this.level+1}`, 'green')
        this.world.increaseXp(100, this.bonus)
        this.__init__(() => {}, this.level + 1)
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
