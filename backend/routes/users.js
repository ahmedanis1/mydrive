var express = require('express');
var router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../schemas/user');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

function validateUser(user) {
  const schema =
    {
      name: Joi.required(),
      email: Joi.string().min(5).max(255).required().email(),
      account_type: Joi.string().required(),
      password: Joi.string().min(5).max(1024).required(),
      isAdmin: Joi.boolean().required()

    }
  return Joi.validate(user, schema);
}

function validateUserLogin(user) {
  const schema =
    {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    }
  return Joi.validate(user, schema);
}

router.post('/', async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User Already Exists!!');
    user = new User(
      _.pick(req.body, ['name', 'email', 'account_type', 'password', 'isAdmin',])
    );
    const secretToken = randomstring.generate();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.secretToken = secretToken;
    user = await user.save();


    const output = `Hi there,
      <br/>
      Thank you for registering!
      <br/><br/>
      Please verify your email by typing the following token:
      <br/>
      Token: <b>${secretToken}</b>
      <br/>
      On the following page:
      <a href="http://localhost:3000/verify">http://localhost:3000/verify</a>
      <br/><br/>
      Have a pleasant day.`;

    let transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org',
      port: 587,
      secure: false,
      auth: {
        user: 'postmaster@sandbox9d77200fabcf406e8fbc210f83516641.mailgun.org', // generated ethereal user
        pass: '4cecf5c655dab244e587dad197e51c2c-e566273b-15969c4c'
      },
      tls: {
        rejectUnauthorized: false
      }
    });


    let mailOptions = {
      from: 'admin@immentia.com',
      to: user.email,
      subject: 'Verify Your Email',
      text: 'Verify Your Email',
      html: output
    };



    transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);

    });


    res.send({ message: 'Check Mail For Account Confirmation', user });
  } catch (err) {

  }

});


router.post('/verify', async (req, res) => {
  const token = req.body.secretToken;

  try {
    let user = await User.findOne({ secretToken: token });
    if (!user) return res.status(400).json({ message: 'Your Account is not verified!' });
    user.accountStatus = 'active';
    user.isVerified = true
    user.secretToken = '';
    user = await user.save();
    res.status(200).json({ message: 'Your Account is Successfully Verified!' })
    res.send(user);
  } catch (err) {
    console.log(err)
  }

});

router.post('/login', async (req, res, next) => {
  try {
    const { error } = validateUserLogin(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    let account_verification = await User.findOne({ $and: [{ email: req.body.email, isVerified: true }] });
    if (!account_verification) return res.status(400).send('Your Account is not Verified');
    let user = await User.findOne({ $and: [{ email: req.body.email, accountStatus: 'active' }] });
    if (!user) return res.status(400).send('Invalid user');
    const compareUser = await bcrypt.compare(req.body.password, user.password);
    if (!compareUser) return res.status(400).send('Invalid user name and password');
    const token = user.generateToken();
    res.status(200).send(token);
  } catch (error) {

  }

});

module.exports = router;

