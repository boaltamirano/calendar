const { response } = require('express');
const User = require('../models/Users');

const createUser = async (req, res = response) => {

    try {

        // const {name, email, password} = req.body;
        const user = new User(req.body);
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