const mongoose = require('mongoose');
const CONFIG = require('./config');

module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) return this.connection;
        return mongoose.connect(CONFIG.DB, {useUnifiedTopology: true,useNewUrlParser: true}).then(connection => {
            this.connection = connection;
            console.log('DB connection success');
        }).catch(err => console.log(err))
    }
}