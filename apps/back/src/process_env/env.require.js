import dotenv from 'dotenv';

dotenv.config()

console.log(process.env.CURRENT_MODE)

if (process.env.CURRENT_MODE === 'development') {
    console.log('test')
} else if (process.env.CURRENT_MODE === 'production') {
    console.log('Mode production')
}
