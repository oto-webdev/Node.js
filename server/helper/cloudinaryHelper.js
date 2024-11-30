import cloudinary from 'cloudinary'

const uploadToCloudinary = async (filePath) => {
    try{    
        const result = await cloudinary.uploader.upload(filePath)

        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    }catch(error){
        console.log("error while uploading", error)
    }
}

export default uploadToCloudinary;