const question = require('../models/Question');
const answer = require('../models/Answer');

class questionController {
  constructor() {

  }

  static findAll (req,res) {
    question.find({})
    .populate('id_user', '_id username email')
    .populate('answer')
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static findById (req,res) {
    question.find({id_user:req.locals.id})
    .populate('id_user','_id username email')
    .populate('answer')
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static findByQuestionId (req,res) {
    question.findOne({_id:req.params.id})
    .populate('id_user','_id username email')
    .populate({ path: 'answer', populate: { path: 'id_user', select: '_id username email'}})
    .then(result => {
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static create (req,res) {
    question.create({
      id_user:req.locals.id,
      title: req.body.title,
      content: req.body.content
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      console.log('error create ======== BLABLA ' + err.ValidationError);
      res.send(err)
    })
  }
  
  static edit (req,res) {
    question.findOneAndUpdate(
      {_id:req.body.id_question,id_user:req.locals.id},
      {
        $set:{title:req.body.title,content:req.body.content,updatedAt:new Date()}
      }
    )
    .then(result=>{
      res.send(result)
      // res.send('ok')
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static remove (req,res) {
    // res.send('REQ BODY---> '+ req.body)
    question.remove({_id:req.body.id_question})
    .then(result=>{
      console.log(result);
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static answer (req,res) {
    answer.create({
        id_user: req.locals.id,
        id_question: req.body.id_question,
        content: req.body.content
    })
    .then(result=>{
      question.updateOne(
        {_id:result.id_question},
        {
          $push: {answer: result._id}
        }
      )
      .then(result2=>{
        res.send(result2)
      })
      .catch(err=>{res.send(err)})
    })
    .catch(err=>{res.send(err)})
  }

  static voteUp (req,res,next) {
    question.findOneAndUpdate(
      {_id:req.body.id_question},
      {$pull:{vote_down:req.body.id}}
    )
    .then(resultPull=>{
      question.findOneAndUpdate(
        { _id: req.body.id_question },
        {$addToSet: { vote_up: req.body.id }}
      )
        .then(resultPush => {
          next()
          // res.send(resultPush)
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
    question.updateOne(
      { _id: req.body.id_question },
      { $pull: { vote_up: req.body.id } }
    )
    .then(resultPull =>{
      question.updateOne(
        { _id: req.body.id_question },
        { $addToSet: { vote_down: req.body.id } }
      )
        .then(resultPush => {
          next()
          // res.send(resultPush)
        })
        .catch(err => {
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
  }
  
  static pullAnswer (req,res) {
    question.update(
    { _id: req.body.id}, //id question
    { 
      // $pop: { answer: 1}
      $pull: {answer: req.body.id_answer}
    })
    .then(hasil => {
      res.send(hasil)
    })
    .catch(err => {
      res.send('error')
    })
  }
}

module.exports = questionController
