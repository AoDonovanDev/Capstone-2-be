let token

async function getToken(){
  const auth = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  })
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: auth
  })
  token = await res.json();
  const time = new Date().toLocaleTimeString();
  console.log(token, time);
  return token
}

token = getToken()


setInterval(() => {
  token = getToken();
}, 3500000)

function returnToken(){
  return token
}

module.exports = returnToken;