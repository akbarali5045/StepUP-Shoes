import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    }
}

export const connectDB = async () => {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: 'stepup_shoes',
            bufferCommands: false
        })
    }
    try {
        cached.conn = await cached.promise
        console.log("✅ MongoDB connected successfully")
    } catch (error) {
        cached.promise = null
        console.error("❌ MongoDB connection failed:", error.message)
        throw error
    }

    cached.conn = await cached.promise

    return cached.conn
}