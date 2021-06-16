const jwt = require("jsonwebtoken");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shevi_frankel:323114538@cluster0.q4hii.mongodb.net/sekerGraph?retryWrites=true&w=majority"//replace localhost with srv1 in the seminar

const TOKEN_SECRET =
    "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

const generateAccessToken = (username) => {
    return jwt.sign({ username }, TOKEN_SECRET);
};


const signUp = (req, res) => {
    const { email, password, name } = req.body;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const user = req.body;
    //Adress, phone ....
    //Validations.
    //Check if user exists
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("sekerGraphDB");
        var myobj = { email, password, name };
        dbo.collection("users").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        const token = generateAccessToken(user);
        console.log("token", token);
        return res.json({ token }).send();
    });
};


const login = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const { email, password } = req.params;
    //Check the pwd in the server
    console.log(email, password)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("sekerGraphDB");
        var query = { email };
        dbo.collection("users").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            if (!result || result.length === 0) {
                return res.status(401).send();
            }
            db.close();
            if (result[0].password = password) {
                const token = generateAccessToken(req.params);
                console.log("token", token);
                return res.json({ token }).send();
            } else {
                return res.status(401).send();
            }
        });
    });

};
module.exports = { signUp, login }