var express = require('express');
var router = express.Router();

const controller = require('../controllers/surveyedController');
/* GET users listing. */


router.get('/getRusltByFormId/:formId', controller.getRusltByFormId);
router.post('/enteredForm',controller.enteredForm)


module.exports = router;



