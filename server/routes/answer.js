const express = require('express');
const router = express.Router();

// add helper
const jwt = require('../helper/jsonWebToken');

// require question and answer controllers
const answerController = require('../controllers/answer')
const questionController = require('../controllers/question');

router.get('/all', answerController.alls)
router.get('/find/:id_question', answerController.findByIdQuestion) //ga login pun bisa liat answer
router.post('/', jwt.isLogin, answerController.add, questionController.pushAnswer)
router.delete('/:id', jwt.isLogin, jwt.authUser, answerController.remove, questionController.pullAnswer)// params id answer
// router.delete('/destroy', jwt.isLogin, jwt.authUser, answerController.destroyAll)

// voted route
router.post('/voteup/:id_question', jwt.isLogin, answerController.voteUp, answerController.findByIdQuestion)
router.post('/votedown/:id_question', jwt.isLogin, answerController.voteDown, answerController.findByIdQuestion)

module.exports = router;
