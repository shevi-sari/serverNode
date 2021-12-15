const Form = require('../modells/form');
const User = require('../modells/user');
var node = require('node-schedule');

const { performance } = require('perf_hooks');

const getFormsById = async (req, res) => {
    try {
        const man = await User.findById(req.params.id).populate('forms');
        const listOfForms = man.forms;

        res.status(200).json({ listOfForms: listOfForms })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}
const getFormsByFormId = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id)
        // const listOfForms = man.forms;

        res.status(200).json({ form: form })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}


//בדיקת כפולים
const newForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        console.log(form);
        try { await form.save(); }
        catch (e) { console.log(e); }
        const man = await User.findById(form.managerId);
        man.forms.push(form);
        form.emails.map((email) => {
            console.log(email);
            if (!man.emails.find((e) => e==email))
                man.emails.push(email)
        });

        await man.save();

        res.status(200).json({ form: form })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
}
const updateForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body);
        //console.log(form);
        //  form=req.body;
        //await form.save();
        // const man = await User.findById(form.managerId);
        // man.forms.push(form);
        // form.emails.map((e) => {
        //     console.log(e);
        //     if (!man.emails.find((f) => f.equals(e)))
        //         man.emails.push(e)
        // });

        // await man.save();

        res.status(200).json({ form: form })

    }
    catch (err) {
        console.log(err);
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
        if (!man.emails.find(e => e == email)) {
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

const timing = async (req, res) => {
    try {
        console.log("time");
        var startTime = Number.parseInt(performance.now());
        var endTime = req.params.time;
        var s = Number.parseInt(endTime);
        const sec = startTime - s;
        var dt = new Date(req.params.time);
        console.log(" var minute =", dt.getMinutes(),
            "var hour =", dt.getHours(),
            "var month = ", dt.getMonth() + 1,
            "var day =", dt.getUTCDate(),
            "var dayWeek =", dt.getDay());
        const form = await Form.findById(req.params.id);
        const emailList = form.emails;
        const subject = form.name;

        await setTimeout(function () { console.log('hello') }
            //sendEmailFunc(emailList, subject, form.id)}
            , sec);
        console.log(`Call to sendEmail in ${sec} milliseconds`)
        console.log(`startTime: `, startTime, "endTime: ", endTime, "s: ", s, "sec: ", sec)

        res.status(200).json({ emailList: emailList })
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ error: err })
    }
}
const sendEmail = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        const emailList = form.emails;
        const subject = form.name;
        sendEmailFunc(emailList, subject, form.id)
        res.status(200).json({ emailList: emailList })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}
const sendEmailFunc = (emailList, subject, formID) => {

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

        html: `<body>
        <div>הזמנתי אותך למלא טופס</div>
<a href="http://localhost:3001/formToFill/${formID}/${emailList}">to form</a>


</body>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
var sendEmailSchedule = (req, res) => {
    var dt = new Date(req.params.time);
    var minute = dt.getMinutes();
    var hour = dt.getHours();
    var month = dt.getMonth() + 1;
    var day = dt.getUTCDate();
    var dayOfWeek = dt.getDay();
    node.scheduleJob(`${dt.getMinutes()} ${dt.getHours()} ${dt.getUTCDate()} ${dt.getMonth() + 1} ${dt.getDay()}`, function () {
        console.log('Starting..');
        init(req, res); // write your logic here to send email
    })
};


const init = async (req, res) => {
    try {
        console.log("time");
        const form = await Form.findById(req.params.id);
        const emailList = form.emails;
        const subject = form.name;
        console.log("form:", form, "emailList", emailList, "subject:", subject);
        sendEmailFunc(emailList, subject, form.id)
        res.status(200).json({ emailList: emailList })
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({ error: err })
    }
}
module.exports = { updateForm, sendEmailSchedule, timing, getFormsByFormId, getFormsById, newForm, sendEmail, getEmailByForm, getEmailByManeger, addEmail, removeEmail }