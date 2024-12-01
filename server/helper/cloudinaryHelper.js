import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'uploads', 
        });
        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw error;
    }
};

export default uploadToCloudinary;
