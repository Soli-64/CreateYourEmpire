// Import du CSS
import { Player } from '../../scripts/game-elements/player.class.js';
import { mine, world } from '../../components/index.js'
import { loadWorld } from '../../components/world/loadWorldFunction.js';
import '../../css/style.scss'


// Récupération des informations dans l'URL

const params = new URLSearchParams(window.location.search);
const mode = params.get('mode')
const worldBackup = params.get('content')

// Fonctionnement du loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';    
});

// Listener des boutons
document.querySelector('.game-content-topbarre-backbutton').addEventListener('click', () => {
    window.location.href = "/index.html"
})
document.querySelector('#saveworld-back-button').addEventListener('click', () => {
    document.querySelector('.alertpage').style.display = 'none'
})

// Vérification du mode d'ouverture du jeu
if (mode === 'new') {
    document.querySelector('.game-content').style.display = 'flex'
    newWorld('')
} else if (mode === 'load') {
    document.querySelector('.game-content').style.display = 'flex'
    const loadedWorld = loadWorld(worldBackup)
    newWorld(loadedWorld.name, loadedWorld)
}

/**
 * 
 * @param {string} name 
 * @param {InstanceType} loadingWorld
 * 
 */
function newWorld (name, loadingWorld) {

     let worldInstance = true

    if (loadingWorld) {
        worldInstance = loadingWorld
    } else {
        const player = new Player('Soli64', 0, 0)

        const gamesBeginningStats = {
            gamePlayer: player,
            world: {
                name: name ? name : '',
                level: 0,
                techLevel: 0,
                xp: 0
            }
        }

        worldInstance = new world.World(gamesBeginningStats)
        
        worldInstance.addBuilding(new mine.Mine(gamesBeginningStats, worldInstance))
        worldInstance.addBuilding(new mine.Mine(gamesBeginningStats, worldInstance))
    }

}
