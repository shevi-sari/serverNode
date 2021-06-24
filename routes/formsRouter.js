
var express = require('express');
var router = express.Router();
const controller = require('../controllers/formsController');

router.get('/form/getFormsById/:id',controller.getFormsById)
router.post('/form/newForm', controller.newForm);
module.exports = router;

