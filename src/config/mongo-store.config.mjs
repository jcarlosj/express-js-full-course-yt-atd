import MongoStore from "connect-mongo";
import mongoose from "mongoose";


const dbMongoStore = () => {
    return MongoStore.create({
        client: mongoose.connection.getClient()     // Obtenemos el cliente de Mongo
    });
}


export default dbMongoStore;