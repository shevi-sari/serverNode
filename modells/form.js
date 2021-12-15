
var mongoose = require('mongoose');
const { Date } = require("mssql");

const questionSchema = new mongoose.Schema({
    theQuestion: String,
    questionKind: Number,
    answers: [
        String
    ]
})

const formSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    emails: [{
        //unique: true,
        //require: true,
        type: String,
        //  match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    }]
    ,
    questionList: [{
        type: questionSchema
    }]

})

module.exports = mongoose.model('forms', formSchema);