const express = require("express");
const router = new express.Router();
const Ratings = require("../models/ratings")
const jwt = require("jsonwebtoken");


router.post('/add', async function (req, res, next){
  const { token, starRating, comments, sp_id, img_url, name } = req.body;
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = payload;
  const rating = await Ratings.create({user_id: id, sp_id, starRating, comments, img_url, name});
  return res.json({rating});
})

router.post('/update', async function (req, res, next){
  const { token, sp_id, starRating, comments } = req.body;
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = payload;
  try{
  const rating = await Ratings.findOne({
    where: {
      user_id: id,
      sp_id
    }
  });
    await rating.update({ starRating, comments });
    await rating.save();
    return res.json({rating});
  } catch(e){
    consonle.log('db select error', e)
  }
  
})

router.get('/average/:sp_id', async function (req, res, next) {
  const average = await Ratings.average(req.params.sp_id)
  return res.json({average})
})

module.exports = router;