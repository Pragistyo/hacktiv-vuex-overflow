const jwt = require('jsonwebtoken');
require('dotenv').config()


  function isLogin(req,res,next){
    // console.log('============helper');
    jwt.verify(req.body.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
      // res.send(decoded)
      req.locals = decoded
        next()
      }
      else{
          res.send(err.message)
      }
    })
  }

  function authUser(req,res,next){
    // res.send(req.locals)
    if(req.locals.id === req.params.id){
      next()
    }
    else if (req.locals.id === req.body.id){
      // res.send('hana')
      next()
    }
    else{
      res.send("access denied")
    }
  }


module.exports = {
  isLogin,
  authUser
}
