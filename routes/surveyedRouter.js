var express = require('express');
var router = express.Router();

const controller = require('../controllers/surveyedController');
/* GET users listing. */

router.get('/getRuslt', controller.getRuslt);
router.get('/getRusltByFormId/:formId', controller.getRuslt);
router.post('/enteredForm',controller.enteredForm)




module.exports = router;



