const express = require('express'); // Express web server framework
const cors = require('cors');


const ExpressError = require('./expressError')

const app = express()

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// allow connections to all routes from any browser
app.use(cors());

const searchRoutes = require('./routes/search')

app.use("/search", searchRoutes)

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

