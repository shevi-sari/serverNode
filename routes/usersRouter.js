var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');
/* GET users listing. */


router.get('/login/:email/:password', controller.login);

router.post('/signUp', controller.signUp);

module.exports = router;



