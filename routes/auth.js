const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config.json');
const { body, validationResult } = require('express-validator');

//Route 1: Create User using POST method /auth/createuser
router.post('/createuser', [
    body('username', 'Username should at least 5 characters').isLength({ min: 5 }),
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password should at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({
                error: 'Email Already Exists',
                success
            })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a User
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        let authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ authtoken, success });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'Internal Server Error'});
    }
})


//Route 2: Login with credential using POST method /auth/login
router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password should at least 5 characters').isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            success = false;
            const { email, password } = req.body;
            //Check whether user with email exist or not
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ error: 'Invalid Credentials', success });
            }
            //check whether password enter by user is same as stored in database. 
            const compPass = await bcrypt.compare(password, user.password)
            if (!compPass) {
                return res.status(404).send({ error: 'Invalid Credentials', success });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            let authtoken = jwt.sign(data, config.JWT_SECRET);
            res.json({ authtoken, success })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: 'Internal Server Error'})
        }
    })

//Route 3: fetchuser data using POST method /auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(401).send('Unauthorized Access')
        }
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;