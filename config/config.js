require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DB_URL || 'mongodb://localhost:27017/api-example'
}