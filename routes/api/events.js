const express = require('express');
const router = express.Router();
const config = require('config');
const auth =  require('../../middleware/auth');

const mySql = require('mysql');

// Setup connection
const db = mySql.createPool({
    host  : config.get('host'),
    user : config.get('user'),
    password : config.get('password'),
    database : config.get('database')
});

// @router POST to api/events/
// @desc   Loads public events
// @access Public
router.post('/public', (req,res) => {
    const {university_id} = req.body;

    let sql = 'SELECT idEvent, events.name AS eventName, category, description, time, events.date, location, phone, email, rating, numRatings, scoreRatings, rsos.name FROM events INNER JOIN rsos ON events.Events_RSO_id = rsos.idRSO WHERE status = "public" AND Events_university_id = ?';
    db.query(sql, university_id, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/events/
// @desc   Loads public events
// @access Public
router.post('/rating', (req,res) => {
    const {idEvent, rating, numRatings, scoreRatings} = req.body;

    let sql = 'UPDATE events SET rating = ?, numRatings = ?, scoreRatings =? WHERE idEvent = ?';
    db.query(sql, [rating, numRatings, scoreRatings, idEvent], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/events/private
// @desc   Loads public and private events
// @access Private
router.post('/private', (req,res) => {
    
    const {university_id} = req.body;

    let sql = 'SELECT * FROM events WHERE status = "public" OR status = "private" AND Events_university_id = ?';
    db.query(sql, university_id, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/events/rso
// @desc   Loads public, private, and RSO events
// @access Private
router.post('/rso', auth, (req,res) => {
    const { idUser, university_id } = req.body;

    let sql = 'SELECT idEvent,  rsos.name, rsos.idRSO, events.name AS eventName, events.approved, Events_university_id, events.status, category, description, time, events.date, location, phone, email, rating, numRatings, scoreRatings, RSO_Member_user_id FROM events INNER JOIN rso_members ON events.Events_RSO_id = rso_members.RSO_member_RSO_id AND RSO_Member_user_id = ? INNER JOIN rsos ON events.Events_RSO_id = rsos.idRSO AND Events_university_id = ? AND events.approved = 1 GROUP BY idEvent UNION SELECT idEvent,  rsos.name, rsos.idRSO, events.name AS eventName, events.approved, Events_university_id, events.status, category, description, time, events.date, location, phone, email, rating, numRatings, scoreRatings, RSO_Member_user_id FROM events, rso_members, rsos WHERE events.Events_RSO_id = rsos.idRSO AND (events.Events_university_id = ? AND events.approved = 1 AND events.status = "public") GROUP BY idEvent';
    db.query(sql, [idUser, university_id, university_id], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

router.post('/create', (req,res) => {

    const {name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved} = req.body;

    // console.log("ROUTE:" + name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id);

    let sql = 'INSERT INTO events (name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

router.post('/checkTime', (req,res) => {

    const {university, location, date, time} = req.body;

    let sql = 'SELECT COUNT(*) as count FROM events WHERE (Events_university_id = ? AND location = ? AND date = ? AND time = ?)';
    db.query(sql, [university, location, date, time], (err, result) => {
        res.json(result[0].count);

    });
});



// @router POST to api/events/approval
// @desc   Loads events that need admin approval
// @access Private
router.post('/getUnapprovedEvents', auth, (req, res) => {
    const { university_id } = req.body;

    let sql = 'SELECT idEvent, events.name AS eventName, category, description, time, events.date, location, phone, email, rating, numRatings, scoreRatings, rsos.name FROM events INNER JOIN rsos ON events.Events_RSO_id = rsos.idRSO WHERE events.approved = 0 AND events.Events_university_id = ?';
    db.query(sql, university_id, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/events/approval
// @desc   Loads events that need admin approval
// @access Private
router.post('/approveEvent', auth, (req, res) => {
    const { idEvent } = req.body;

    let sql = 'UPDATE events SET approved = 1 WHERE idEvent = ?';
    db.query(sql, idEvent, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/events/approval
// @desc   Loads events that need admin approval
// @access Private
router.post('/denyEvent', auth, (req, res) => {
    const { idEvent } = req.body;

    let sql = 'DELETE FROM events WHERE idEvent = ?';
    db.query(sql, idEvent, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

module.exports = router;