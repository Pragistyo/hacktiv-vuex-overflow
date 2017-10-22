const jwt = require('jsonwebtoken');
require('dotenv').config()


  function isLogin(req,res,next){
    console.log('===========' + req.headers.token);
    console.log('===========body ' + JSON.stringify(req.body))
    jwt.verify(req.headers.token, process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        req.locals = decoded
        console.log( 'smth ==' + JSON.stringify(req.locals))
        next()
      }
      else{
          console.log(err)
          res.send(err)
      }
    })
  }

  function authUser(req,res,next){
    console.log('==== ini locals id === ' + req.locals.id);
    console.log('==== ini params id === ' + req.params.id);
    console.log('==== ini body id === ' + JSON.stringify(req.body.id))
    if(req.locals.id === req.params.id){
      next()
    }
    else if (req.locals.id === req.body.id){
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
