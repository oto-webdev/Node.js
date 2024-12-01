import Image from '../models/Image.js';
import uploadToCloudinary from '../helper/cloudinaryHelper.js';
import expressAsyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js'

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        console.log("File from Multer:", req.file);

        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const uploadedBy = req.userInfo?.userId || null;

        const newImage = new Image({
            url,
            publicId,
            uploadedBy,  
        });

        await newImage.save();

        return res.status(201).json({
            message: "Image uploaded successfully",
            image: newImage,
        });
    } catch (error) {
        console.error("Error during image upload:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteImage = expressAsyncHandler(async (req, res) => {
    try{
        const deleteImageID = req.params.id;
        const userId = req.userInfo.userId;
        const image = await Image.findById(deleteImageID)
        if(!image) {
            return res.status(404).json({message: "Image not found"})
        }

        if(image.uploadedBy.toString() !== userId) {
            return res.status(403).json({message: "you aren't auth to delete image"})
        }

        await cloudinary.uploader.destroy(image.publicId)

        await Image.findByIdAndDelete(deleteImageID)
        return res.status(200).json({message: "Image deleted successfully"})
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
})

export default uploadImage;