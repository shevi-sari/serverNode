const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var sql = require("mssql");

const TOKEN_SECRET =
  "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

const generateAccessToken = (username) => {
  return jwt.sign({ username }, TOKEN_SECRET);
};

router.get("/login", function (req, res) {

  var config = {
    user: 'MBYDOMAIN/211737739',
    password: '',
    server: 'srv2\pupils',
    database: 'SekerGraph1',
    options: {
      port: 0 //////// ask elkarif
    }
  };

  // connect to your database
  sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from survey', function (err, recorrdset) {

      if (err) console.log(err)
      console.log(recorrdset)
    })

    // send records as a response

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const { user, password } = req.query;
    //Check the pwd in the server
    const token = generateAccessToken(user);
    console.log("token", token);
    return res.json({ token }).send();
  });

  router.post("/signup", function (req, res) {
    const { user, password } = req.body;
  });
})

module.exports = router;
