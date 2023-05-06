const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database Online')
    } catch (error) {
        console.error(error);
        // throw new Error('Error connecting to database');
    }
}

module.exports = {
    dbConnection
} 