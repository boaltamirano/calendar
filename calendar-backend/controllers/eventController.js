const { response } = require('express');
const Event = require('../models/Events');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events: events
    })
}

const createEvent = async (req, res = response) => {

    const event = new Event( req.body );

    try {
        event.user = req.uid;
        const createEvent = await event.save();
        res.json({
            ok: true,
            event: createEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error when registering the event'
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {
        
        const event = await Event.findById( eventId );

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Id not found'
            });
        }

        if( event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You cannot edit this event'
            });
        }

        const payloadEvento = { ...req.body, user: uid}
        const updateEvent = await Event.findByIdAndUpdate( eventId, payloadEvento, { new: true });

        res.json({
            ok: true,
            event: updateEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }

}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        
        const event = await Event.findById( eventId );

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Id not found'
            });
        }

        if( event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You cannot delete this event'
            });
        }

        await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}