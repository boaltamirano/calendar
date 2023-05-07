/* 
    User router / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/authController');
const { validateCamps } = require('../middlewares/ValidateCamps');
const { validateJWT } = require('../middlewares/ValidateJWT');


router.post(
    '/new',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').isLength({min: 6}),
        validateCamps
    ],
    createUser);

router.post(
    '/', 
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').isLength({min: 6}),
        validateCamps
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);


module.exports = router;