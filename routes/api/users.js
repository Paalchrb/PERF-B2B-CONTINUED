const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
//MongoDB models
const User = require('../../models/User');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('userEmail', 'Email is required')
      .not()
      .isEmpty(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({ min: 6 }),
    check('userPhone', 'Phone number is required')
      .not()
      .isEmpty(),
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { 
      firstName, 
      lastName,
      userEmail,
      userPhone,
      password,
      password2,
      companyId
    } = req.body;

    try {
      let user = await User.findOne({ 'userContact.userEmail': userEmail });

      if (user) {
        return res
          .status(400)
          .json({ 
            errors: [{ msg: 'Bruker eksisterer allerede' }] 
          });
      }

      if (password !== password2) {
        return res
          .status(400)
          .json({ 
            errors: [{ msg: 'Passord må være identiske' }] 
          });
      }

      user = new User({
        userContact: {
          firstName,
          lastName,
          userEmail,
          userPhone
        },
        companyId
      });

      //crypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      return res
        .status(201)
        .json(user);
    } catch(error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
);


// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get(
  '/me', 
  auth, 
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res
          .status(404)
          .json({ 
            errors: [{ msg: 'Bruker ikke funnet' }] 
          });
      }

      return res
        .status(200)
        .json(user);
    } catch(error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
);

module.exports = router;