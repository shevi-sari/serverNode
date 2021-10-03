const Form = require('../modells/form');
const User = require('../modells/user');

const getFormsById = async (req, res) => {
    try {
        const man = await User.findById(req.params.id).populate('forms')
        const listOfForms = man.forms;
        
        res.status(200).json({ listOfForms: listOfForms })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const sendEmail = async (req, res) => {
    try {
        const form=await Form.findById(req.params.id);
        const emailList=form.emails;
        const subject=form.name;
        sendEmailFunc(emailList,subject)
        res.status(200).json({ emailList: emailList })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}
const sendEmailFunc=(emailList,subject)=>{
    
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'sbf5003168@gmail.com',
    pass: '0533163340'
  }
});

var mailOptions = {
  from: 'sbf5003168@gmail.com',
  to: emailList,
  subject: subject,
  text: 'הזמנתי אותך למלא סקר'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


}
const newForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        const man = await (await User.findById(form.managerId));
        man.forms.push(form);
        await man.save();
      
        res.status(200).json({ form: form })

    }
    catch (err) {
        res.status(500).json({ error: err })
    }

}

//=============email=================
const getEmailByForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id)
        const listOfEmails = form.emails;
        res.status(200).json({ listOfEmails: listOfEmails })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}
const getEmailByManeger = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const listOfEmails = user.emails;
        res.status(200).json({ listOfEmails: listOfEmails })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const addEmail = async (req, res) => {
    try {
        const form = await Form.findById(req.params.formId);
        const email = (req.params.email);
        if (!form.emails.find(e => e == email)) {
            form.emails.push(email);
            await form.save();
        }
            const man = await User.findById(form.managerId);
            if(!man.emails.find(e => e == email)) {
            man.emails.push(email);
            await man.save();
        }
        const listOfEmails = form.emails;
        return res.status(200).json({ listOfEmails: listOfEmails });
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ error: err })
    }
}
const removeEmail = async (req, res) => {
    try {
        const form = await Form.findById(req.params.formId);
        const email = (req.params.email);
        form.emails.pull(email);
        await form.save();
        const listOfEmails = form.emails;
        return res.status(200).json({ listOfEmails: listOfEmails });
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ error: err })
    }
}
module.exports = { getFormsById, newForm,sendEmail, getEmailByForm,getEmailByManeger, addEmail, removeEmail }