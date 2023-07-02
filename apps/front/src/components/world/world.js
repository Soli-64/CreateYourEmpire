import { savedWorldFile, signData } from "../../scripts/backFunctions.js";
import { numberFunctions, createElement } from "../../scripts/utils.js";
//import Handlebars from 'handlebars'

export class World {

    allBuildings = {

    }
    
    name = ['Imperium Novum', 'Solara Prime', 'Aurora Empire', 'Zephyr Dominion', 'Stellaris Imperium'][numberFunctions.randint(0, 4)]

    /**
     * 
     * @param {Object} gameStats
     * @param {string} enterName Nom de l'Empire 
     */
    constructor (gameStats) {
        this.player = gameStats.gamePlayer

        this.name = gameStats.world['name'] ? gameStats.world['name'] : this.name
        this.level = gameStats.world['level'] ? gameStats.world['level'] : 0
        this.techLevel = gameStats.world['techLevel'] ? gameStats.world['techLevel'] : 0
        this.xp = gameStats.world['xp'] ? gameStats.world['xp'] : 0
        this.farmBonus = this.techLevel > 0 ? this.techLevel : 1

        this.getJsonData()

        this.modifyName(this.name)
        this.setSettings()        

        document.querySelector('.clock-circle').addEventListener('animationend', () => {
            this.addFarmedRessources(this.farmBonus)
            this.restartAnimation()
        })

        this.restartAnimation()

    }

    getJsonData() {
        fetch('/src/components/world/world.json')
            .then(r => r.json())
            .then(data => {
                const actualParams = data.levels[`${this.level}`]
                this.reqXp = actualParams.requireXp
                this.refreshInterface()
            })
    }

    refreshInterface() {
        this.xp += 200
        document.querySelector('#actualXp').innerHTML = this.xp
        document.querySelector('#requireXp').innerHTML = this.reqXp
        document.querySelector('.game-content-map-levelbarre .fg .bg').style.width = `${(this.xp / this.reqXp) * 100}%`
    }

    increaseXp(value) {
        if ((this.xp + value) > this.reqXp) {
            this.level += 1
            const restXp = (this.xp + value) - this.reqXp
            this.xp = 0
            this.increaseXp(restXp)
        } else if ((this.xp + value) === this.reqXp) {
            this.level += 1
            this.xp = 0
        } else {
            this.xp += value
        }
        this.getJsonData()
    }

    restartAnimation() {
        const clockCircle = document.querySelector('.clock-circle')
        clockCircle.classList.remove('animation-ended');
        setTimeout(() => {
            clockCircle.classList.add('animation-ended');
          }, 10);
      }

    addBuilding(b) {
        this.allBuildings[b.id] = {b}
    }

    modifyName(newName) {
        this.name = newName
        document.querySelector('.game-content-topbarre-title').innerHTML = this.name
    }

    setSettings() {
        document.querySelector('.game-content-topbarre-settings').addEventListener('click', () => {
            if (document.querySelector('.game-content-settings').style.display === 'block') {
                document.querySelector('.game-content-settings').style.display = 'none'
            } else {
                document.querySelector('.game-content-settings').style.display = 'block'
                
                document.querySelector('.world-settings-name-button').addEventListener('click', () => {
                    document.querySelector('.world-settings-name-input').value !== '' ? this.modifyName(document.querySelector('.world-settings-name-input').value) : false;
                    document.querySelector('.world-settings-name-input').value = ''
                })

                document.querySelector('#worldSaveButton').addEventListener('click', async () => {
                    this.saveWorld()                    
                })
            }
            
        })
    }

    addFarmedRessources(bonus) {
        const buildings = []
        Object.values(this.allBuildings).forEach(e => {
            buildings.push(Object.values(e)[0])
        })
        buildings.forEach(b => {
            b.farmRessources(bonus)
        })
    }

    async saveWorld() {
        // Création du contenu du fichier
        const buildings = {} 
        Object.values(this.allBuildings).forEach(instance => {
            buildings[Object.values(instance)[0].id] = Object.values(instance)[0].returnActualThis()
        })
        const actualWorld = {
            stats: {
                player: this.player.returnActualThis(),
                world: {
                    techLevel: this.techLevel,
                    level: this.level,
                    name: this.name,
                    xp: this.xp
                },
            },
            worldName: this.name,
            actualsBuildings: buildings
        }
        
        // Création du fichier
        await savedWorldFile(actualWorld)

        // Téléchargement du fichier
        const fileUrl = '/savedWorld.json'
        const fileName = `${this.name}.json`
        const link = createElement('a', {href: fileUrl, download: fileName}, "")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Ajout de la signature au contenu de l'alerte 
        document.querySelector('#signature').innerHTML = `${await signData(actualWorld)}`

        // Passage en display block de l'alerte
        document.querySelector('.game-content-settings').style.display = 'none'
        document.querySelector('.alertpage').style.display = 'block'
    }
}
