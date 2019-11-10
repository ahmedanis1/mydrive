var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const auth = require('../middleware/auth');
const User = require('../schemas/user');
const admin = require('../middleware/admin');

router.get('/admin', [auth, admin], async (req, res) => {
    try {
        let result = await User.find({ account_type: 'user' });
        res.status(200).json(result)
    } catch (error) {

    }

});
router.delete('/removeUser/:id', [auth, admin], async (req, res) => {
    try {
        let result = await User.findOneAndRemove({ _id: req.params.id });
        res.status(200).json({ message: 'User Removed!', result })
    } catch (error) {

    }

});
router.put('/update/:id/:accStatus', [auth, admin], async (req, res) => {
    try {
        let result = await User.findOneAndUpdate({ _id: req.params.id },
            {
                accountStatus: req.params.accStatus
            }

        );
        res.status(200).json({ message: 'Account Status Updated!', result })
    } catch (error) {

    }

});
module.exports = router;

