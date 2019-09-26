const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next)
{
    const token = req.header('x-auth-token');

    // Check for token
    if(!token)
        // Permission denied
        return res.status(401).json({ msg: 'Authorization denied, no login token'});

    try 
    {
        // Verify token, get user data
        const check = jwt.verify(token, config.get('jwtSecret'));

        const user = ({
            id : check.idUser,
            username : check.username,
            auth_level : check.auth_level,
            university_id : check.Users_university_id,
            university_name : check.university_name
        });
        req.user = user;
        next();
    }
    
    catch(e)
    {
        res.status(400).json({ msg: 'Token is not valid'});
    }
    
}

module.exports = auth;