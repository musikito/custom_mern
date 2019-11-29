const router = require('express').Router();
const bcrypt = require("bcryptjs");
let User = require('../models/user.model');

// @route  POST /register
// @desc   Register new user
// @access Public

router.route('/register').post((req, res)=>{
  const { name, email, password, username} = req.body;

  // Test simple validation
  if(!name || !email || !password || !username) {
    return res.status(400).json({ msg: "Please enter all fields"});
  }// end if

  // Cehck for existing user by email
  User.findOne({email})
    .then(user =>{
      if(user) return res.status(400).json({ msg: "User already exists "});

      // create new user
      const newUser = new User({
        name,
        email,
        password, 
        username
      });
      // hash the password with a salt
      bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if (err) throw err;
          newUser.password = hash;

          // save the user into the DB
          newUser.save()
          .then(user =>{
            res.json({
              user:{
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username
              }
            })
          })
        })
      })
    })
});

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