import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connect.db.js'
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use("/api/books", bookRoutes)

const startServer = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}

startServer()