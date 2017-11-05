const answer = require('../models/Answer');
const question = require('../models/Question');
const jwt = require('../helper/jsonWebToken');

class answerController {
  constructor() {

  }

  static findByIdQuestion (req,res) {
    // console.log('====================================');
    // console.log(req.params);
    // console.log('====================================');
    answer.find({
      id_question:req.params.id_question
    })
    .populate({path:'id_user', select: '_id username email'})
    .populate('id_question')
    .then(result => {
      console.log(result);
      // res.send('hahaha')
      res.send(result)
    })
    .catch(err =>{
      res.send(err)
    })
  }

  static add (req,res) {
    answer.create({
      id_user:req.locals.id,
      id_question:req.body.id_question,
      content: req.body.content
    })
    .then(result => {
      console.log('=========== ogitampan ' + result);
      question.update(
                          {_id:req.body.id_question},//idQuestion
                          {$push:{answer:result._id}})//idAnswer
      .then(resultQuestion=>{
        console.log('hahahahha ' + resultQuestion);
        res.send(resultQuestion)
      })
      .catch(err=>{console.log(err)})
    })
    .catch(err => {
      res.send(err)
    })
  }


// find answer by id 
// select array vote down
// if array is zero, vote up
// loop array vote down, if already vote, res.send(msg)
// if not vote down, vote up

  static voteUp (req,res,next) {
    answer.findOneAndUpdate(
      {_id: req.body.id_answer},
      {$pull: { vote_down: req.body.id }}
    )
    .then(result=>{
      answer.findOneAndUpdate(
        { _id: req.body.id_answer },
        { $addToSet: { vote_up: req.body.id } }
      )
        .then(result => {
          console.log('OGI +++++ ', result)
          // answerController.findByIdQuestion
          next()
          // res.send(result)
        })
        .catch(err => {
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static voteDown (req,res,next) {
    answer.findOneAndUpdate(
      { _id: req.body.id_answer },
      { $pull: { vote_up: req.body.id } }
    )
      .then(result => {
        answer.findOneAndUpdate(
          { _id: req.body.id_answer },
          { $addToSet: { vote_down: req.body.id } }
        )
          .then(result => {
            next()
            // res.send(result)
          })
          .catch(err => {
            res.send(err)
          })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static remove (req,res) {
    answer.remove({_id:req.params.id})
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  }

  static alls (req,res) {
    answer.find({})
    .populate('id_user')
      .populate('id_question')
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send('ERROR NIH')
    })
  }

  static destroyAll (req,res) {
    answer.remove({})
    .then(result => {
      res.send('sukses')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = answerController
