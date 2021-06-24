const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usersRouter = require('./usersRouter');
const formsRouter = require('./formsRouter');

var MongoClient = require('mongodb').MongoClient;
var urlToCreate = "mongodb+srv://shevi_frankel:323114538@cluster0.q4hii.mongodb.net/sekerGraph?retryWrites=true&w=majority"; //replace localhost with srv1 in the seminar
var url = "mongodb+srv://shevi_frankel:323114538@cluster0.q4hii.mongodb.net/sekerGraph?retryWrites=true&w=majority"//replace localhost with srv1 in the seminar

const TOKEN_SECRET =
  "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

const generateAccessToken = (username) => {
  return jwt.sign({ username }, TOKEN_SECRET);
};
router.use('/', usersRouter);
//router.use('/form', formsRouter);


// router.get("/createDB", (req, res) => {
//   MongoClient.connect(urlToCreate, function (err, db) {
//     console.log("err", err)
//     if (err) {
//       console.error(err)
//     } else {
//       console.log("Database created!");
//       db.close();
//     }
//     res.send();
//   });
// })

// router.get("/createFormsColection", () => {
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("sekerGraphDB");
//     dbo.createCollection("forms", function (err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   });
// })



module.exports = router;
