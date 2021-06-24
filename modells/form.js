
var mongoose = require('mongoose');
const { Date } = require("mssql");

const formSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type:Date
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"users"
    },
    emails:[{
        unique:true,
        dropDups: true,
        type:String,
        match:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    }]
})

module.exports = mongoose.model('forms', formSchema);