import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connect.db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.listen(port, () => {
    connectDB()
    console.log(`Server started on port ${port}`)
})