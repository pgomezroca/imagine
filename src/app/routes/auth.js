const express= require('express');
const Router= express.Router();
const Authctrl= require('../controllers/authController');

Router.post('/login',Authctrl);

module.exports=Router;
