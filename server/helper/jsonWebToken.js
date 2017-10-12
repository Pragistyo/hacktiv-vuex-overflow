const jwt = require('jsonwebtoken');
require('dotenv').config()


  function isLogin(req,res,next){

    jwt.verify(req.body.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
      res.send(decoded)
      }
      else{
        res.send(err)
      }
    })
  }


module.exports = {
  isLogin
}
