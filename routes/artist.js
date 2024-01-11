const express = require("express");
const router = new express.Router();

const returnToken = require('../token')

router.get('/:id', async function(req, res, next){
  console.log(req.params)
  const { id } = req.params;
  try {
    const {access_token, token_type} = await returnToken();
    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
      }
    })
    const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
      }
    })
    const searchResults = await Promise.all([artistResponse.json(), albumsResponse.json()])
    return res.json({searchResults})
    } catch(e){
      console.log(e)
      return next(e)
    }
})

module.exports = router;