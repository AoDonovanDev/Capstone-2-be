const express = require("express");
const router = new express.Router();
const Likes = require("../models/likes");
const Ratings = require("../models/ratings");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post('/add', async function (req, res, next){
  const { token, sp_id } = req.body;
  const payload = jwt.verify(token, process.env.SECRET_KEY)
  const { id } = payload;
  const newLike = await Likes.create({user_id: id, sp_id});
  return res.json({newLike});
})

router.post('/remove', async function (req, res, next){
  const { token, sp_id } = req.body;
  const payload = jwt.verify(token, process.env.SECRET_KEY)
  const { id } = payload;
  if(id && sp_id){
    try {
      const like = await Likes.destroy({
        where: {
          user_id: id,
          sp_id
        }
      });
      return res.json({like})
    } catch(e) {
      console.log('login error', e);
      next(e);
    }
  }
})

router.post('/getUserLikes', async function (req, res, next){
  const { token } = req.body;
  const payload = jwt.verify(token, process.env.SECRET_KEY)
  const { id } = payload;
  const user = await User.findOne({
    where: {
      id
    },
    include: [Likes, Ratings]
  })
  let likesMap = {};
  for(let like of user.Likes.map(l => l.sp_id)){
    likesMap[like] = like;
  }
  let ratingsMap = {};
  for(let rating of user.Ratings){
    ratingsMap[rating.sp_id] = rating.dataValues;
  }
  res.json( {likesMap, ratingsMap} );
})


module.exports = router;