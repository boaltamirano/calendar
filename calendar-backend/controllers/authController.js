const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The user is already registered'
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT( user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error
        })
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The user does not exist'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password);
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect data'
            });
        }

        const token = await generateJWT( user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}