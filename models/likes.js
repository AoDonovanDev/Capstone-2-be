const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');


const Likes = sequelize.define('Likes', {
  // Model attributes are defined here
  like_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sp_id: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});



module.exports = Likes;