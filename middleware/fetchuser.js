const jwt = require('jsonwebtoken');
const config = require('../config.json');

const fetchuser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).send('Unauthorized Access')
        }
        const data = await jwt.verify(token, config.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message)
        res.status(401).send('Unauthorized Access')
    }

}

module.exports = fetchuser;