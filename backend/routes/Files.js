var express = require('express');
var router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const FileStorage = require('../schemas/addFiles');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }


});
const upload = multer({ storage: storage });

function validateFile(user) {
  const schema =
    {


      file_name: Joi.string().required(),
      file_path: Joi.string().required(),

    }
  return Joi.validate(user, schema);
}

function validateUserEmail(user) {
  const schema =
    {

      email: Joi.string().required().email(),

    }
  return Joi.validate(user, schema);
}

router.post('/', upload.single('userfile'), async (req, res) => {
  try {
    const { file_error } = validateFile(req.file);
    if (file_error) return res.status(400).send(file_error.details[0].message);
    const { error } = validateUserEmail(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let file = new FileStorage(
      _.pick(req.body, ['email']),

    );
    file['file_path'] = req.file.path;
    file['file_name'] = req.file.originalname;

    await file.save();
    res.status(200).json({ message: 'File Uploaded!' });
  } catch (error) {

  }


});
router.get('/:email', async (req, res) => {
  try {
    let result = await FileStorage.find({ email: req.params.email });
    res.status(200).json(result);
  } catch (error) {

  }

});
router.delete('/:id', async (req, res) => {
  try {
    await FileStorage.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: 'File Deleted!' });
  } catch (error) {

  }

});



module.exports = router;

