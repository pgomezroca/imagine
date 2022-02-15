const User = require('../models/User')//funciones 


function create(req,res){
  User.find({email:req.body.email})
    .exec()
    .then(user=>{
      if(user.length>=1){
        return res.status(422).send({message:'email exist'})
      }else{let user=new User(req.body);
        user.save()
          .then(user=> res.status(201).send({message:'user created',user}))
          .catch(err=>res.status(500).send({err})) }
    })
    .catch(err=>{res.status(500).send({err})})
   
  }
    
  


function index(req,res){
  
 User.find({})
    .then(users=>{
      if(users.length) return res.status(200).send({users});
      return res.status(404).send({message:'No users found'})
    }).catch(err=>res.status(500).send({err}));
}

function show(req,res){
 if(req.body.error) return res.status(500).send({err});
 if(!req.body.users) return res.status(404).send({message:'No user found'});
  let users=req.body.users
 return res.status(200).send({users})
}

function update(req,res){
  if (req.body.error) {console.log(err); res.status(500).send({error})};
  if(!req.body.users)return res.status(404).send({message:'User not found'})
  let user=req.body.users[0];
  user = Object.assign(user,req.body)
  user.save()
  .then(user=>res.status(200).send({message:"updated User",user}))
  .catch(err=>res.status(500).send({err}))
}

function remove(req,res){
  if(req.body.err)return res.status(500).send({err});
  if(!req.body.users)return res.status(404).send("not found")
  req.body.users[0].remove()
  .then(user=>res.status(200).send({message:'Removed',user}))
  .catch(error=>res.status(500).send({error}))

}

function find(req,res,next){
  let query={};
  query[req.params.key]=req.params.value;
User.find(query)
.then (users =>{
  if(!users.length) return next();
  req.body.users=users;
  return next();
}).catch(error=>{
  req.body.error=error;
  next();
})
}
module.exports={
  
  create,
  index,
  show,
  update,
  remove,
  find
}