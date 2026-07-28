const mongoose = require('mongoose');

const urlDb = 'mongodb://localhost:27017/movies-api';

const connect = async () => {
    try {
        await mongoose.connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connected with db successfully`);
    } catch (error) {
        console.log('Error to connect with db', error);
    }
};

module.exports = {
    connect
};
