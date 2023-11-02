const { Sequelize } = require('sequelize');
const { dburi } = require('./secret')

// Option 1: Passing a connection URI
const sequelize = new Sequelize(dburi) // Example for postgres

async function fuckyou(){
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

fuckyou()