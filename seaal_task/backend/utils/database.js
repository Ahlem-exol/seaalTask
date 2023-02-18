const Sequelize = require('sequelize');
// database connection
const sequelize = new Sequelize('seaal', 'root', '', {dialect: 'mysql', host: 'localhost'});
module.exports = sequelize;
