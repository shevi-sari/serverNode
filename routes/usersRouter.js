var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');
const formController = require('../controllers/formsController');
/* GET users listing. */


router.get('/login/:email/:password', controller.login);

router.post('/signUp', controller.signUp);
//=============================
router.get('/form/getFormsById/:id',formController.getFormsById)
router.post('/form/newForm', formController.newForm);

router.get('/form/getEmailByForm/:id',formController.getEmailByForm);
router.get('/form/getEmailByManeger/:id',formController.getEmailByManeger);
router.post('/form/addEmail/:formId/:email', formController.addEmail);
router.post('/form/removeEmail/:formId/:email', formController.removeEmail);

module.exports = router;



