const express = require("express");
const router = new express.Router();
const Ratings = require("../models/ratings")

const returnToken = require('../token')

router.get('/:id', async function(req, res, next){
  console.log(req.params)
  const { id } = req.params;
  try {
    const {access_token, token_type} = await returnToken();
    const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
      }
    })
    const tracksResponse = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
      }
    })
    const searchResults = await Promise.all([albumResponse.json(), tracksResponse.json()])
    for(let track of searchResults[1].items){
      track.images = [searchResults[0].images[0]];
      track.avg = await Ratings.average(track.id);
      }
    return res.json({searchResults})
    }
    catch(e){
      console.log(e)
      return next(e)
    }
})

module.exports = router;