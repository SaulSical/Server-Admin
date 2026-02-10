"use strict"
 
import mongoose  from "mongoose";
export { dbConnection }; 
 
const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDb | no se pudo conectar a mongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDb | intentando conectar a mongoDB');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDb | conectado a mongoDB');
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDb | conexión abierta a mongoDB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDb | desconectado de mongoDB');
        });
 
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        })
    } catch (error) {
        console.log(`Error al conectare la db: ${error}`);
    }
}
 
const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | Received ${signal}. Closing database connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB | Database connection closed successfully.');
        process.exit(0);
    } catch (error) {
        console.error(`MongoDB | Error during graceful shutdown:`, error.message);
        process.exit(1);
    }
}
 
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGQURS2', () => gracefulShutdown('SIGQURS2')); 
