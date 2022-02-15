const express= require('express');

const User=require('./routes/user.js');
const Auth=require('./routes/auth.js');
const Authtoken=require('./midleweres/check-auth')

const app=express();
app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(Authtoken)
app.use('/user',User)
app.use('/auth',Auth)

module.exports=app;