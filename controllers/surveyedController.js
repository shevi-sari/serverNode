const Surveyed = require('../modells/surveyed');

// לטפל במשתמש שהכניס טופס כפול

const enteredForm = async (req, res) => {
    try {
        const surveyed = new Surveyed(req.body);
        var man = await Surveyed.findOne({email:surveyed.email})
        if (man) {
            if (!man.forms.find(e => e.formId.equals( surveyed.forms[0].formId)))
            man.forms.push(surveyed.forms[0])
            else
            res.status(304).send();
           
            await man.save();
            res.status(200).json({ newMam: man })
        }
        else {
            await surveyed.save();
            res.status(200).json({ newMam: surveyed })
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
        const form = await Surveyed.find({formId:req.params.formId})
        const listOfEmails = form.emails;
        res.status(200).json({ listOfEmails: listOfEmails })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}
module.exports = { enteredForm, getRusltByFormId }