import Image from '../models/Image.js'
import { uploadToCloudinary } from '../helper/cloudinaryHelper.js'

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File is required" });
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const newImage = new Image({
            url,        
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newImage.save();

        return res.status(201).json({
            message: "Image uploaded successfully",
            image: newImage
        });
    } catch (error) {
        console.error("Error during image upload:", error);
        return res.status(500).json({ message: error.message });
    }
};

export default uploadImage;
