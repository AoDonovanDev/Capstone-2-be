const {client_id, client_secret} = require('./secret')

let token

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
  token = await res.json()
  console.log(token)
  return token
}

token = getToken()


setInterval(() => {
  token = getToken()
}, 350000)

function returnToken(){
  return token
}

module.exports = returnToken;