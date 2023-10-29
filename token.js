const {client_id, client_secret} = require('./secret')

async function getToken(){
  const auth = new URLSearchParams({
    grant_type: "client_credentials",
    client_id,
    client_secret,
  })
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: auth
  })
  const token = await res.json()
  return token
}

module.exports = getToken;