const express = require("express");
const router = new express.Router();
const Ratings = require('../models/ratings')

const returnToken = require('../token')

router.get('/:searchType/:queryString', async function(req, res, next){
  const { searchType, queryString } = req.params;
  const query = `${queryString}&type=${searchType}`;
  try {
    const {access_token, token_type} = await returnToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}`, {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
      }
    })
    const searchResults = await response.json();
    for(let result of searchResults[`${searchType}s`].items){
      result.avg = await Ratings.average(result.id)
    }
    return res.json({searchResults})
    } catch(e){
      return next(e)
    }
})

module.exports = router;


