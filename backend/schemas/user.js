const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
    ,
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
    ,
    account_type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
    ,
    isAdmin: Boolean,
    accountStatus:
    {
        type: String,
        required: true,
        default: 'deactive'

    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    secretToken:
    {
        type: String,

    }
});

userSchema.methods.generateToken = function () {
    const token = (jwt.sign({ id: this._id, name: this.name, account_type: this.account_type, email: this.email, isAdmin: this.isAdmin }, ('jwtPrivateKey')));
    return token;
}
module.exports = mongoose.model('User', userSchema);
