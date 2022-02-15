const jwt=require('jsonwebtoken')
const CONFIG= require('../config/config')
module.exports=(req,res,next)=>{
  if(req.path != 'auth/login'){//no pide token porque se genera en login
   if(req.headers.authorization){
     let token =req.headers.authorization.split('')[1];
jwt.verify(token,CONFIG.SECRET_TOKEN,function(err,decoded){
       if (err)return res.status(500).send({message:'unauthorized',err})
       console.log(decoded);
       next();
})
   }else next()

  }else{ next()}
}