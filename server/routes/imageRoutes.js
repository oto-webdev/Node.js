import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import upload from "../middleware/upload.js";
import uploadImage from '../controllers/imageController.js';
import { deleteImage } from '../controllers/imageController.js'

const router = express.Router();

router.post("/upload", auth, admin, upload.single('image'), uploadImage);
router.delete("/:id", auth, admin, deleteImage)

export default router;
