import dotenv from 'dotenv'

dotenv.config()

export function developmentModeIsActive() {
    if (process.env.CURRENT_MODE === 'development') {
        return true
    } else if (process.env.CURRENT_MODE === 'production') {
        return false
    } else {
        console.error('Contenu innatendu dans le fichier .env')
    }
}
