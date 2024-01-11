const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DBURI) 

async function connect_db(){
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

connect_db()
module.exports = sequelize;