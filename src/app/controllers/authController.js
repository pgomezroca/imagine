const User= require('../models/User')
const bcrypt= require ('bcrypt')
const jwt= require('jsonwebtoken')
const CONFIG=require('../config/config')


function login(req,res){
  let email=req.body.email
  let password=req.body.password
  User.findOne({email})
      .then(user=>{
        if(!user){
          return res.status(401).send({message:'Auth failed1'});//por seguridad mje poco especifico
        }
        bcrypt.compare(password,user.password,function(err,result){
          if(err){
            return res.status(401).send({message:'Auth failed 2'});//por seguridad mje poco especifico
          }
          if(result){
            const token= jwt.sign(
            {
              email:user.email,
              username:user.username
                                      //payload
            },
            CONFIG.SECRET_TOKEN,     //secret
            {
              expiresIn: "4h"        //options:expiration
            }
            );
            
            return res.status(200).json({message:'Auth succesful'});
          }
          return res.status(401).send({message:'Auth failed3'});
        })
          
      }).catch(err=>{
        console.log(err);
        res.status(500).send({err})
      })
}
module.exports=login;