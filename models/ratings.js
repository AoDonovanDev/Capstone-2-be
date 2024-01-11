const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Ratings = sequelize.define('Ratings', {
  // Model attributes are defined here
  rating_id: {
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
  },
  starRating: {
    type: DataTypes.INTEGER,
  },
  comments: {
    type: DataTypes.STRING
  },
  img_url: {
    type: DataTypes.STRING
  },
  name :{
    type: DataTypes.STRING
  }
}, {//other options
});


Ratings.average = async(sp_id) => {
  const { count, rows } = await Ratings.findAndCountAll({
    where: {
      sp_id
    }
  })
  if(!count || !rows) return 'no data';
  const total = rows.reduce((a, c) => a + c.starRating, 0);
  const average = parseFloat(total/count).toFixed(2);
  return average;
}

module.exports = Ratings;