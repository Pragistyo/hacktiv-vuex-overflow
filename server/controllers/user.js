const Users = require('../models/User');
const jwt   = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()

console.log('=========== masuk CONTR users');


class userController {
  constructor() {

  }

  static all (req,res) {
    // res.send('denny')
    Users.find({}).then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static userInfo (req,res) {
    res.send(req.locals)
  }

  static register (req,res) {
    var hash = bcrypt.hashSync(req.body.password, salt)
    Users.create({
      username:req.body.username,
      password:hash,
      email:req.body.email
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static single (req,res) {
    Users.findOne({_id:req.params.id})
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static update (req,res) {
    if(req.body.password)
    var hash = bcrypt.hashSync(req.body.password, salt)
    Users.findOneAndUpdate({_id:req.params.id},{
      username:req.body.username,
      password:hash,
      email:req.body.email
    })
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static remove (req,res) {
    Users.remove({_id:req.params.id})
    .then(result=>{
      res.send(result)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static login (req,res) {
    Users.findOne({username:req.body.username})
    .then(data=>{
      if (bcrypt.compareSync(req.body.password, data.password)) {
        // res.send('=========== ' + process.env.SECRET_KEY)
        var token = jwt.sign({
          id       : data._id,
          username : data.username,
          email    : data.email
        }, process.env.SECRET_KEY)
        // res.send(token)
        res.send({token:token,msg:'berhasil'})
      }else{
        res.status(401).send({
          status:401,
          err:{
            msg:'password salah'
          }
        })
      }
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static verify (req,res) {
    jwt.verify(req.body.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        res.send(decoded)
      }
      else{
        console.log(err)
      }
    })
  }
}



module.exports = userController
