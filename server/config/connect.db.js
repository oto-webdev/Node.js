import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected To MongoDB")
    }catch(error){
        console.log("Failed to connect mongo", error)
        process.exit(1)
    }
}

export default connectDB;