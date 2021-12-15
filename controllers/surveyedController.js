const Form = require('../modells/form');
const Surveyed = require('../modells/surveyed');


// לטפל במשתמש שהכניס טופס כפול

const enteredForm = async (req, res) => {
    try {
        const surveyed = new Surveyed(req.body);
        console.log(surveyed, surveyed.answers);
        var man = await Surveyed.findOne({ email: surveyed.email })
        if (man) {
            // if (!man.forms.find(e => e.formId.equals(surveyed.forms[0].formId))) {
            man.forms.push(surveyed.forms[0])
            await man.save();

            res.status(200).json({ newMam: man })
            // }
            // else
            //     res.status(304).send();

        }
        else {
            const surveyed1 = await surveyed.save();
            res.status(200).json({ newMam: surveyed1 })
        }

    }
    // {
    //     email:
    //     form:[{formId:
    //     answer:[]}]
    // }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }

}
const getRusltByFormId = async (req, res) => {
    try {
        const form = await Surveyed.find({ formId: req.params.formId })
        //  const listOfEmails = form.emails;
        res.status(200).json({ form: form })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}
const getRuslt = async (req, res) => {
    try {
        const form = await Form.findById(req.params.formId);
        const currentAnswer = [form.questionList.lengh];
        const AnswerList = await Surveyed.find();
        AnswerList.forEach(f => {
            f.forms.forEach((userF,i) => {
                if (userF.formId == req.params.formId) { 
                    userF.answers.map(a=>{currentAnswer[i].push(a)})
                    }
            })

        });
        //  const listOfEmails = form.emails;
        res.status(200).json({ currentAnswer: currentAnswer })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}
module.exports = { enteredForm, getRusltByFormId, getRuslt }