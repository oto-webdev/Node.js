import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/connect.db.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/image", imageRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error.message);
    }
};

startServer();
