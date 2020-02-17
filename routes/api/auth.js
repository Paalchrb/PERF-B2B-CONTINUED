const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// MongoDB models
const User = require('../../models/User');



// @route    GET api/auth
// @desc     Check if authenticated
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ 
          errors: [{ msg: 'Kan ikke validere bruker' }] 
        });
    }
    return res
      .status(200)
      .json(user);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send('Server Error');
  }
});



// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email')
      .isEmail(),
    check('password', 'Password is required')
      .exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ 'userContact.userEmail': email }); //Find a way to remove password (with select?)

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ugyldig brukernavn eller passord' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ugyldig brukernavn eller passord' }] });
      }

      const payload = {
        user: {
          id: user.id,
          companyId: user.companyId
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          return res
            .status(201)
            .json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    }
  }
);

module.exports = router;