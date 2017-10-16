const express = require('express');
const router = express.Router();

// add controllers
const jwt = require('../helper/jsonWebToken');

// require question controllers
const answerController = require('../controllers/answer')

router.get('/',jwt.isLogin, answerController.findById)
router.post('/', jwt.isLogin, answerController.add)
router.delete('/:id',jwt.isLogin, answerController.remove)

// voted route
router.post('/voteup', jwt.isLogin, answerController.voteUp)
router.post('/votedown', jwt.isLogin, answerController.voteDown)

module.exports = router;
