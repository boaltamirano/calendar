/* 
    User router / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/authController');


router.post('/new', createUser);

router.post('/', loginUser);

router.get('/renew', revalidateToken);


module.exports = router;