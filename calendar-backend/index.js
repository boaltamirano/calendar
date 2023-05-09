const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

const app = express();

dbConnection();

app.use(cors());

app.use( express.json() );

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Correccion de rutas en caso de GET route error
app.get('*', (req, res) => {
    res.sendFile( __dirname+'/public/index.html');
})

app.listen( process.env.PORT, () => {
    console.log(`Server started in port ${process.env.PORT}`);
})
