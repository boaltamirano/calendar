const express = require('express');
require('dotenv').config();

const app = express();

app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log(`Server started in port ${process.env.PORT}`);
})
