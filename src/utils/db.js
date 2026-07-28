const mongoose = require('mongoose');

const urlDb = 'mongodb://localhost:27017/movies-api';

const connect = async () => {
    try {
        await mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Conexión a la base de datos establecida");
    } catch (error) {
        console.log("Error al conectar a la base de datos:", error);
    }
};

module.exports = {
    connect
};
