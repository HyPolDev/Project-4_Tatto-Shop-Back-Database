import 'dotenv/config'
import { app } from './app'
import { AppDataSource } from '../database/db'

const PORT = process.env.PORT || 4000

const startServer = () => {

    AppDataSource.initialize()
        .then(() => {
            console.log("Database Conected")
            app.listen(PORT, () => {
                console.log(`Server is running at PORT: ${PORT}`)
            })
        })
        .catch(error => {
            console.log(error)
        })
}
startServer();