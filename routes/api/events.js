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

    let sql = 'SELECT * FROM events WHERE status = "public" AND Events_university_id = ?';
    db.query(sql, university_id, (err, result) => {
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

    let sql = 'SELECT idEvent, events.name AS eventName, category, description, time, events.date, location, phone, email, rating, rsos.name FROM events INNER JOIN rso_members ON events.Events_RSO_id = rso_members.RSO_member_RSO_id INNER JOIN rsos ON events.Events_RSO_id = rsos.idRSO WHERE (events.status="rso" AND rso_members.RSO_Member_user_id = ? AND events.Events_university_id = ? AND events.approved = 1) UNION SELECT events.idEvent, events.name AS eventName, events.category, events.description, events.time, events.date, events.location, events.phone, events.email, events.rating, rsos.name FROM events INNER JOIN rsos ON events.Events_RSO_id = rsos.idRSO WHERE (events.Events_university_id = ? AND events.approved = 1 )';
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

    let sql = 'INSERT INTO events (name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id, approved], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

module.exports = router;