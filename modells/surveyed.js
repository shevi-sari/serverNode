var mongoose = require('mongoose');
const answeredFormSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "forms"
    },
    answers: [
        String
    ]
})
const surveyedSchema = new mongoose.Schema({
    email: {
        type: String
    },
    forms: [answeredFormSchema],

})

module.exports = mongoose.model('surveyeds', surveyedSchema);
