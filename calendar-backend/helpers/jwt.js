const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        const privateKeyPath = path.join(__dirname, 'keys', process.env.PRIVATE_KEY);

        const privateKey = fs.readFileSync(privateKeyPath);

        jwt.sign(payload, privateKey, { expiresIn: '2h' }, (err, token) => {
            if(err) {
                console.log(err);
                reject('Could not generate token');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}