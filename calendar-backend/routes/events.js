const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/ValidateJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { validateCamps } = require('../middlewares/ValidateCamps');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'The title is mandatory').not().isEmpty(),
        check('start', 'The date start is mandatory').custom(isDate),
        check('end', 'The date end is mandatory').custom(isDate),
        validateCamps
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;