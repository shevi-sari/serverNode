const jwt = require("jsonwebtoken");
var MongoClient = require('mongodb').MongoClient;
const User = require('../modells/user');

var url = "mongodb+srv://shevi_frankel:323114538@cluster0.q4hii.mongodb.net/sekerGraphDB3?retryWrites=true&w=majority"//replace localhost with srv1 in the seminar

const TOKEN_SECRET =
    "F9EACB0E0AB8102E999DF5E3808B215C028448E868333041026C481960EFC126";

const generateAccessToken = (username) => {
    return jwt.sign({ username }, TOKEN_SECRET);
};


const signUp = async (req, res) => {
    try {
        const user = new User(req.body);
        console.log(user);
        await user.save();

        res.status(200).json({ newUser: user })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }

}


const signUp1 = (req, res) => {
    User = req.body;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    //const user = req.body;

    //Validations.
    //Check if user exists
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("sekerGraphDB3");
        // var myobj = { email, password, name };
        dbo.collection("users").insertOne(User, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        const token = generateAccessToken(User);
        console.log("token", token);
        console.log(err);
        return res.json({ token }).send();
    });
};

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.params;
//         const user = await User.findOne({ email: email, password: password }).populate('forms')
//         res.status(200).json({ user: user })
//         console.log(user);
//     }
//     catch (err) {
//         res.status(500).json({ error: err })
//     }
// }


const login = async (req, res) => {
    try {
        const { email, password } = req.params;
        const user = await User.findOne({ email: email, password: password }).populate('forms');
        //if (user != null) {
        try {
            const f = user.email;
            res.status(200).json({ user: user })
            console.log(user);
        }
        catch (er) { (res.status(401).json({ error: er })) }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const login1 = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    const { email, password } = req.params;
    //Check the pwd in the server
    console.log(email, password)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("sekerGraphDB3");
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
                return res.json({ token, user: result[0] }).send();
            } else {
                return res.status(401).send();
            }
        });
    });

};
module.exports = { signUp, login }