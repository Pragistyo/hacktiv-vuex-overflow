var express = require('express');
var router = express.Router();

const jwt = require('../helper/jsonWebToken');
const questionController = require('../controllers/question')


router.get('/all', questionController.findAll)
router.get('/',jwt.isLogin, questionController.findById)
router.get('/:id', jwt.isLogin, questionController.findByQuestionId)
router.post('/',jwt.isLogin, questionController.create)
router.put('/',jwt.isLogin, questionController.edit)
router.delete('/',jwt.isLogin, questionController.remove)

router.post('/voteup', jwt.isLogin, questionController.voteUp)
router.post('/votedown', jwt.isLogin, questionController.voteDown)

router.post('/answer', jwt.isLogin, questionController.answer)

module.exports = router;
