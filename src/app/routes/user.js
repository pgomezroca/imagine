const express = require('express');
const UserCtrl= require('../controllers/UserController');
const router = express.Router();

router.get('/users',UserCtrl.index)//listar todos
      .post('/',UserCtrl.create)
      .get('/:key/:value',UserCtrl.find,UserCtrl.show)//buscar uno por param
      .put('/:key/:value',UserCtrl.find,UserCtrl.update)
      .delete('/:key/:value',UserCtrl.find,UserCtrl.remove)

module.exports=router;