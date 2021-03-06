var express = require('express');
var router = express.Router();

const jwt = require('../helper/jsonWebToken');
const questionController = require('../controllers/question')


router.get('/all', questionController.findAll)
router.get('/:id', questionController.findByQuestionId)
// router.get('/',jwt.isLogin, jwt.authUser, questionController.findById)//punya user
router.get('/userData/:id', jwt.isLogin, jwt.authUser, questionController.findById)//punya user
router.post('/',jwt.isLogin, questionController.create)//punya user

//put and delete, take id_user from body
router.put('/' ,jwt.isLogin, jwt.authUser,questionController.edit)//punya user
router.put('/userData/:id', jwt.isLogin, jwt.authUser, questionController.edit)//punya user
router.delete('/' ,jwt.isLogin, jwt.authUser, questionController.remove)//punya user
// router.delete('/userData/:id', jwt.isLogin, jwt.authUser, questionController.remove)//punya user


router.post('/voteup', jwt.isLogin, questionController.voteUp, questionController.findAll)
router.post('/votedown', jwt.isLogin, questionController.voteDown, questionController.findAll)

// router.delete('/pullAnswer', questionController.pullAnswer)

module.exports = router;
