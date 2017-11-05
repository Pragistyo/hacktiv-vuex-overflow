const answer = require('../models/Answer');
const question = require('../models/Question');
const jwt = require('../helper/jsonWebToken');

class answerController {
  constructor() {

  }

  static findByIdQuestion (req,res) {
    answer.find({
      id_question:req.params.id_question
    })
    .populate({path:'id_user', select: '_id username email'})
    .populate('id_question')
    .then(result => {
      console.log(result);
      res.send(result)
    })
    .catch(err =>{
      res.send(err)
    })
  }

  static add (req,res,next) {
    answer.create({
      id_user:req.locals.id,
      id_question:req.body.id_question,
      content: req.body.content
    })
    .then(result => {
      req.body.id_answer = result._id 
      next()
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
          console.log('+++++ ', result)
          next()
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
          })
          .catch(err => {
            res.send(err)
          })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static remove (req,res,next) {
    answer.remove({_id:req.params.id})
    .then(result => {
      next()
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
