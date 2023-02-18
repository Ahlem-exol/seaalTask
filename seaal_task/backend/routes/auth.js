const express = require('express');
const validate = require("../middleware/validate-info");
const AuthController = require("../controllers/auth.controller");
const router = express.Router();

  // check if user is logged in
router.get('/login', AuthController.getUserLogin);
  // Create a new user
router.post('/signup', AuthController.createUser);
  // log user in
router.post('/login', validate, AuthController.userLogin);
  // log user out
router.post('/logout',AuthController.logoutUser);

module.exports = router;
