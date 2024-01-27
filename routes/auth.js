const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const {createToken} = require("../client_token")


router.post('/new', async function (req, res, next){
  const newUser = await User.register(req.body)
  const {username, id} = newUser
  const token = createToken(newUser)
  return res.json({currentUser: username, id, token})
})

router.post('/signin', async function (req, res, next){
  try {
    const user = await User.login(req.body)
    if(user){
      const likes = user.Likes;
      const ratings = user.Ratings;
      const { username, id } = user
      const token = createToken(user)
      return res.json({user: username, id, token, likes, ratings})
    }
    return res.json({user})
  } catch(e) {
    console.log('login error', e);
    next(e);
  }
})

router.get('/spotify', async function(req, res, next){
  var scope = "streaming \
               user-read-email \
               user-read-private"

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    scope,
    redirect_uri: `${process.env.FRONTEND_BASE_URL}/spotify/callback`,
    state: process.env.STATE
  })
  return res.json({oauth_url: 'https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString()}); 
})

router.post('/token', async function (req, res, next){
  const { code } = req.body;
  const authOptions = new URLSearchParams({
    code,
    redirect_uri: `${process.env.FRONTEND_BASE_URL}/spotify/callback`,
    grant_type: 'authorization_code'
  });
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    body: authOptions
  });
  const token = await response.json();
  return res.json({token})
})



module.exports = router;