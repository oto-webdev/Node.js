import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/connect.db.js'
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/api/books", bookRoutes)
app.use("/api/users", userRoutes)

const startServer = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
}

startServer()