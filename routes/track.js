const express = require("express");
const router = new express.Router();
const Ratings = require('../models/ratings')

const returnToken = require('../token')

router.get('/:id', async function(req, res, next){
  console.log(req.params)
  const { id } = req.params;
  try {
    const {access_token, token_type} = await returnToken();
    const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
        }
      })
    const searchResults = await trackResponse.json();
    searchResults.avg = await Ratings.average(id);
    return res.json({searchResults})
    } catch(e){
      console.log(e)
      return next(e)
    }
})

module.exports = router;