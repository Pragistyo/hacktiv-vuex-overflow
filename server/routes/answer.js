const express = require('express');
const router = express.Router();

// add controllers
const jwt = require('../helper/jsonWebToken');

// require question controllers
const answerController = require('../controllers/answer')

router.get('/all', answerController.alls)
router.get('/find/:id_question', answerController.findByIdQuestion) //ga login pun bisa liat answer
router.post('/', jwt.isLogin, answerController.add)
// delete require jwt.auth, ntar tambahin
// router.delete('/:id',jwt.isLogin, answerController.remove)//params id answer
// router.delete('/:id', answerController.remove)
// router.delete('/destroy', jwt.isLogin, jwt.authUser, answerController.destroyAll)
router.delete('/destroy', jwt.isLogin, jwt.authUser, answerController.remove)

// voted route
router.post('/voteup', jwt.isLogin, answerController.voteUp)
router.post('/votedown', jwt.isLogin, answerController.voteDown)

module.exports = router;
