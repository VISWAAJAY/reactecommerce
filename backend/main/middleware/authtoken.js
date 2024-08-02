//generating token

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../dbconnection/config'); 
debugger;
const authtoken = (req, res, next) => {
    // Checking if the token is present in the cookies
    let token = req.cookies.token


    //sending proper messages to user  
    if (!token) {
        return res.status(400).json({ error: "Authentication failed. Login again." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "Authentication failed. Login again." });
        }

        console.log("Decoded user data:", decoded); 
        req.user = req.user || {};
        req.user.id = decoded.userdata._id;
        req.user.email = decoded.userdata.email;
        next();
    });
};

module.exports = authtoken;
