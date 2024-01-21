const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db.js');
const Likes = require('./likes.js');
const Ratings = require('./ratings.js');


const User = sequelize.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});


User.prototype.auth = async function (password){
  const success = await bcrypt.compare(password, this.password);
  return success
}

User.register = async function({ username, password }){
  const hashed = await bcrypt.hash(password, 10);
  const createdUser = User.create({username, password: hashed});
  return createdUser;
}

User.login = async function({ username, password }){
  const user = await User.findOne({
    where:{
      username,
    },
    include: [Likes, Ratings]
  });
  const success = await user.auth(password);
  if(success) return user;
  return success
}

User.Likes = User.hasMany(Likes, {foreignKey: "user_id"});
Likes.User = Likes.belongsTo(User);

User.Ratings = User.hasMany(Ratings, {foreignKey: "user_id"});
Ratings.User = Ratings.belongsTo(User);




sequelize.sync({force:true})



module.exports = User;