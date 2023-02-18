const {
  DataTypes
} = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "user_id"
    },

 
    usr_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_password"
    },
    usr_nom: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_nom"
    },
    usr_prenom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_prenom"
    },
    usr_email: {
      type: DataTypes.STRING(100),
      // validate: {
      //   isEmail:true
      // },
      unique: {
          args: true,
          msg: 'Email address already in use!'
      },
      // unique: true,
      // isEmail: true,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "usr_email"
    },
  
  
  }, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false
  }
);
module.exports = User;
