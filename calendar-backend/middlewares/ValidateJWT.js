const { response } = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in the request'
        })
    }

    try {
        const publicKeyPath = path.join(__dirname, '..', 'helpers', 'keys', process.env.PUBLIC_KEY);
        const publicKey = fs.readFileSync(publicKeyPath);

        const { uid, name } = jwt.verify(
            token,
            publicKey
        )

        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }

    next();
}

module.exports = {
    validateJWT
}