const bcrypt = require("bcrypt");
const User = require('../models/user');

// add user 
exports.createUser = (req, res, next) => { 
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: hash,
      });
      user.save()
        .then(result => {
            res.status(201).json({
            message: 'Account created successfully !',
          });
        })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: 'Username or Email already in use !',
        });
      });
    });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'User does not exist !'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect Password !"
        });
      }else{
      
        userSend ={
          nom: fetchedUser.nom,
          prenom :fetchedUser.prenom,
          email:fetchedUser.email
        }
        req.session.user = userSend;
          res.status(200).json({
            user: userSend,
          });
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(401).json({

        message: "Authentification failed !",
        error: error
      });
    });
}; 

exports.getUserLogin = (req, res, next) => {
  req.session.user ? res.status(200).send({loggedIn: true,user: req.session.user}) : res.status(200).send({loggedIn: false});
};


exports.logoutUser = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not log out.');
    } else {
      res.status(200).send({});
    }
  });
};
