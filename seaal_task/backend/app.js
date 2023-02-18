const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/database');
const authRoutes = require('./routes/auth')
const session = require('express-session');
const cors = require('cors');

// creating a new express app 
const app = express();

// Setting up CORS, such that it can work together with the frontend
 app.use(cors({origin: [
   "http://localhost:4200"
 ], credentials: true}));

 // initializing the session 
 app.use(session({
  secret: "seaal, its a secret!",
  resave: false,
  saveUninitialized: true,}));

  //  to be able to read the request body
  app.use(bodyParser.json());

  // change th * with the http://localhost:4200
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
  });

  app.use('/api/auth', authRoutes);
  module.exports = app;
