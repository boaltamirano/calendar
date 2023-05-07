const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

const createUser = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if( user ) {
            return res.status(400).json({
                ok: false,
                uid: user.id,
                name: user.name
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            msg: 'registro',
            ...req.body
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error
        })
    }
}

const loginUser = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
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