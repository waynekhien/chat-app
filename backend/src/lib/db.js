import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO CONNECTED", conn.connection.host);
        
    } catch (error) {
        console.log("ERROR CONNECTING TO MONGODB");
        process.exit(1); // 1 status code means fail, 0 means success
    }
}

