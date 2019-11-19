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

// @router GET api/info/
// @desc   Get all universities 
// @access Public
router.get('/universities', (req, res) => 
{
    let sql = 'SELECT * FROM universities';
    db.query(sql, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }
        res.json(result);    
    });
});

// @router Post api/info/
// @desc   Create a new universities 
// @access Private
router.get('/newUniversity', auth, (req, res) => 
{
    let {name} = req;
    let sql = 'INSERT INTO universities VALUES() = (?)';
    db.query(sql, [name] ,(err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.json(result);
    });
});

// @router GET api/info/
// @desc   Get all comments 
// @access Public
router.get('/comments', (req, res) => 
{
    let sql = 'SELECT Comments.idComment, Comments_event_id, comments.Comments_user_id, comments.message, users.username FROM comments INNER JOIN users ON comments.Comments_user_id = users.idUser';
    db.query(sql, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }
        res.json(result);    
    });
});

// @router POST api/info/rsos
// @desc   Get all RSOs 
// @access Private
router.post('/rsos', (req, res) => {
    const { id, university_id } = req.body;
    let sql = 'SELECT idRSO, name, approved FROM rsos WHERE NOT EXISTS (SELECT RSO_Member_RSO_id FROM rso_members WHERE rsos.idRSO = rso_members.RSO_Member_RSO_id AND RSO_Member_user_id = ?) AND RSOs_university_id = ?';
    db.query(sql, [id, university_id], (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.json(result);
    });
});

// @router POST api/info/
// @desc   Get all RSOs for the admin
// @access Private
router.post('/adminRsos', auth, (req, res) => 
{
    const { id } = req.body;
    let sql = 'SELECT idRSO, name, approved FROM rsos WHERE RSOs_admin_id = ?';
    db.query(sql, id, (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }
        res.json(result);    
    });
});

module.exports = router;