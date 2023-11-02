const express = require("express");
const router = new express.Router();

const returnToken = require('../token')

router.get('/:queryString', async function(req, res, next){
  console.log(req.params)
  try {
    const {access_token, token_type} = await returnToken();
    const response = await fetch('https://api.spotify.com/v1/artists/1yAwtBaoHLEDWAnWR87hBT/albums', {
      method: "GET",
      headers: {
        "Authorization": `${token_type} ${access_token}`
      }
    })
    const data = await response.json()
    return res.json(data.items.map(i => i.name))
    } catch(e){
      console.log(e)
      return next(e)
    }
})

module.exports = router