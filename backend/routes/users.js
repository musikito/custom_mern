const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

// User model
const User = require('../models/user.model');


// @route  POST /register
// @desc   Register new user
// @access Public

router.route('/register').post((req, res)=>{
  const { name, email, password} = req.body;
  

  // Test simple validation
  if(!name || !email || !password ) {
    return res.status(400).json({ msg: "Please enter all fields"});
  }// end if

  // Check for existing user by email
  User.findOne({email})

    .then(user =>{
      if(user) return res.status(400).json({ msg: "User already exists "});
      

      // create new user
      const newUser = new User({
        name,
        email,
        password
      });
      // hash the password with a salt
      bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if (err) throw err;
          newUser.password = hash;

          // save the user into the DB
          newUser.save()
          .then(user =>{

            jwt.sign(
              { id: user.id },
              jwtSecret,
              {expiresIn: 3600 },
              (err, token) => {
                if(err) throw err;
                res.json({
                  token,
                  user:{
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            )
          })
        })
      })
    })
});
// @route  POST /auth
// @desc   Authenticate the user
// @access Public

router.route('/auth').post((req, res)=>{
  const {  email, password } = req.body;
  

  // Test simple validation
  if( !email || !password ) {
    return res.status(400).json({ msg: "Please enter all fields"});
  }// end if

  // Check for existing user by email
  User.findOne({ email })
    .then(user =>{
      if(!user) return res.status(400).json({ msg: " User Doesn't Exist" });

      // Validate password
      bcrypt.compare(password, user.password)
      .then(isMatch =>{
        if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        // Return the token and the user
        jwt.sign(
          { id: user.id },
          jwtSecret,
          {expiresIn: 3600 },
          (err, token) => {
            if(err) throw err;
            res.json({
              token,
              user:{
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        )

      });// end of password match


    });// end user then

}); // end of auth
/*
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

}); // End get all users
*/
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;