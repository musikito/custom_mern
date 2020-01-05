const jwt = require('jsonwebtoken');
require("dotenv").config();


/** Get the token from the front end */
function auth(req, res, next)
{
    const token = req.header("x-auth-token");

    // ENV variable for SECRET
    const jwtSecret = process.env.JWT_SECRET;

    // Check for token
    if(!token) res.status(401).json( { msg: "Authorization DENIED!"});

    try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Add user from payload
    req.user = decoded;
    next();
        
    } catch (error) {
        res.status(400).json({ msg: "token is invalid" });
        
    }
    
}
module.exports = auth;