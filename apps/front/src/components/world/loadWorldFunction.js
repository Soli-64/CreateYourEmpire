import { Player } from "../../scripts/game-elements/player.js";
import { createInstance } from "../../scripts/utils.js";
import { World } from "./world.js";

/**
 * Retourne une Instance de World avec les paramètres dans le fichier chargé
 * @param {JSON} jsonGameContent 
 * @returns {InstanceType} 
 */
export function loadWorld(jsonGameContent) {  
    const gamesFileData = JSON.parse(jsonGameContent)

    // On créer des raccourcis dans le fichire chargé
    const gameFilePlayer = gamesFileData.stats.player
    const worldFile = gamesFileData.stats.world
    // On créer un player idantique à celui du fichier chargé
    const player = new Player(gameFilePlayer.actualName, // Récupération du nom
                              gameFilePlayer.actualId,   // Récupération de l'Id
                              gameFilePlayer.actualLevel // Récupération du Level
                              )
    // On lui redonne les ressources qu'il avait
    for (const [ress, val] of Object.entries(gameFilePlayer.ressources)) {
        player.modifyRessource(ress, val) // Modification de la valeur de chaque ressources
    }
    // On lui redonne les id utilisés
    player.gameId = gameFilePlayer.usedId

    // On recréer des paramètres de jeu depuis les ressources chargées
    const gameBeginningStats = {
        gamePlayer: player,
        world: {
            techLevel:  worldFile.techLevel,
            level: worldFile.level,
            name: worldFile.name
        }
    }

    // On créer l'instance du monde
    const world = new World(gameBeginningStats)

    // On ajoute les batîments    
    const buildings = gamesFileData.actualsBuildings
    for (const [attr, val] of Object.entries(buildings)) {
        const building = createInstance(val.type, {
            gamesStats: gameBeginningStats,
            level: val.actualLevel,
            id: val.actualId
        })
        world.addBuilding(building)
    }

    // On retourne le monde avec tout les paramètres et batîments
    return world

}
