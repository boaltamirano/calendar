const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();

dbConnection();

app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log(`Server started in port ${process.env.PORT}`);
})
