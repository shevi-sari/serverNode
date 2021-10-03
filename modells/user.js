var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    forms: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"forms"
    }],
    emails:[{
        // unique:true,
        dropDups: true,
        type:String,
        match:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }]
})

module.exports = mongoose.model('users',userSchema);
