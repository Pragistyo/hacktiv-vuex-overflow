var express = require('express');
var router = express.Router();

const jwt = require('../helper/jsonWebToken');
const usersController = require('../controllers/user')

console.log('============masuk');

router.get('/', usersController.all)
router.get('/info', jwt.isLogin, usersController.userInfo)
router.post('/', usersController.register)
router.delete('/', usersController.remove)
router.post('/login', usersController.login)

module.exports = router;
