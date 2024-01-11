const jwt = require("jsonwebtoken");

/** return signed JWT from user data. */

function createToken(user) {

  let payload = {
    id: user.id,
    username: user.username,
    isAdmin: false,
  };

  return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = { createToken };