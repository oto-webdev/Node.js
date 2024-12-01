import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_key: process.env.CLOUDINARY_API_KEY,
    cloud_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary;