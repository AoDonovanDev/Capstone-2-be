const express = require('express'); // Express web server framework
require('dotenv').config();
const cors = require('cors');


const ExpressError = require('./expressError')

const app = express()

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// allow connections to all routes from any browser
app.use(cors());
app.use(express.static('public'));

const searchRoutes = require('./routes/search');
const authRoutes = require('./routes/auth');
const artistRoutes = require('./routes/artist');
const albumRoutes = require('./routes/album');
const trackRoutes = require('./routes/track');
const likesRoutes = require('./routes/likes');
const ratingsRoutes = require('./routes/ratings');

app.use("/search", searchRoutes);
app.use("/auth", authRoutes);
app.use("/artist", artistRoutes);
app.use("/album", albumRoutes);
app.use("/track", trackRoutes);
app.use("/likes", likesRoutes);
app.use("/ratings", ratingsRoutes);

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});

app.listen(3000, function () {
  console.log("Listening on 3000");
});

