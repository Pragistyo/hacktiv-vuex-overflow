var express = require('express');
var router = express.Router();

const jwt = require('../helper/jsonWebToken');
const questionController = require('../controllers/question')


router.get('/all', questionController.findAll)
router.get('/:id', jwt.isLogin, questionController.findByQuestionId)
router.get('/',jwt.isLogin, questionController.findById)//punya user
router.post('/',jwt.isLogin, questionController.create)//punya user

//put sama delete, ambil id_user dari body aja
router.put('/',jwt.isLogin, jwt.authUser,questionController.edit)//punya user
router.delete('/',jwt.isLogin, jwt.authUser, questionController.remove)//punya user

router.post('/answer', jwt.isLogin, questionController.answer)

router.post('/voteup', jwt.isLogin, questionController.voteUp)
router.post('/votedown', jwt.isLogin, questionController.voteDown)

module.exports = router;
