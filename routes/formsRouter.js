
var express = require('express');
var router = express.Router();
const formController = require('../controllers/formsController');

// router.get('/form/getFormsById/:id',controller.getFormsById)
// router.post('/form/newForm', controller.newForm);

router.get('/getFormsById/:id',formController.getFormsById);
router.get('/getFormsByFormId/:id',formController.getFormsByFormId)
router.post('/newForm', formController.newForm);

router.get('/getEmailByForm/:id',formController.getEmailByForm);
router.get('/getEmailByManeger/:id',formController.getEmailByManeger);
router.post('/addEmail/:formId/:email', formController.addEmail);
router.post('/removeEmail/:formId/:email', formController.removeEmail);
router.post('/sendEmail/:id',formController.sendEmail);

router.post('/timing/:id/:time',formController.timing);

module.exports = router;

