const answer = require('../models/Answer');
const question = require('../models/Question');
const jwt = require('../helper/jsonWebToken');

class answerController {
  constructor() {

  }

  static findById (req,res) {
    if(req.body.id_question) {
      answer.find({id_user:req.body.id,id_question:req.body.id_question})
      .populate('id_user')
      .populate('id_question','_id title content')
      .then(result=>{
        res.send(result)
      })
      .catch(err=>{
        res.send(err)
      })
    }else{
      answer.find({id_user:req.body.id})
      .populate('id_user')
      .populate('id_question','_id title content')
      .then(result=>{
        res.send(result)
      })
      .catch(err=>{
        res.send(err)
      })
    }
  }

  static add (req,res) {
    answer.create({
      id_user:req.body.id,
      id_question:req.body.id_question,
      content: req.body.content
    })
    ,then(result => {
      question.updateOne(
                          {$push:{answer:result._id}},
                          {_id:req.params.id})
      .then(resultQuestion=>{
        res.send(resultQuestion)
      })
      .catch(err=>{console.log(err)})
    })
    .catch(err => {
      res.send(err)
    })
  }


  static voteUp (req,res) {
    answer.findOneAndUpdate({
      $addToSet: {vote_up:req.body.id}
    },{_id:req.body.id_answer})
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static voteDown (req,res) {
    answer.findOneAndUpdate(
      {_id:req.body.id_answer},
      {$addToSet:{vote_down:req.body.id}})
    .then(result=>{
      res.send(resut)
    })
    .catch(err=>{
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
}

module.exports = answerController
