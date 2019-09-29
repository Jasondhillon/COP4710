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

// @router POST to api/comments/create
// @desc   Adds a comment to an event
// @access Private
router.post('/create', (req,res) => {

    const {Comments_event_id, Comments_user_id, message} = req.body;

    let sql = 'INSERT INTO comments (Comments_event_id, Comments_user_id, message) VALUES ( ?, ?, ?)';
    db.query(sql, [Comments_event_id, Comments_user_id, message], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }
    });

    sql = 'SELECT * FROM comments WHERE Comments_event_id = ? AND Comments_user_id = ? AND message = ?';
    db.query(sql, [Comments_event_id, Comments_user_id, message], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/comments/edit
// @desc   Edits a comment
// @access Private
router.post('/edit', (req,res) => {

    const {message, idComment} = req.body;

    let sql = 'UPDATE comments SET message = ? WHERE idComment = ?';
    db.query(sql, [message, idComment], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

// @router POST to api/comments/delete
// @desc   Deletes a comment
// @access Private
router.post('/delete', (req,res) => {

    const {idComment} = req.body;

    let sql = 'DELETE FROM comments WHERE idComment = ?';
    db.query(sql, idComment, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
});

module.exports = router;