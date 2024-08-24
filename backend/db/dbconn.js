import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
    } catch (err) {
        console.error("Error in DB connection", err);
    }
};

export default connectDB;