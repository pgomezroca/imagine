const mongoose= require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema=new mongoose.Schema({
  username:{type:String,required:true},
    
  email:{ 
    type:String,
    required:true,
    unique:true
  },
  password:{type:String,required:true, select:false},
  signUpDate: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now },
 
},{
  versionKey:false
})
/*UserSchema.virtual('fullName').
  get(function() {
    return this.name.first + ' ' + this.name.last;
    }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });*/
  UserSchema.pre('save',function(next){
    bcrypt.genSalt(10)
     .then(salts=>{
       bcrypt.hash(this.password,salts)
        .then(hash=>{
          this.password=hash;
          next();
        }).catch(err=>next(err))
     }).catch(err=>next(err));
  })


 
module.exports=mongoose.model('User',UserSchema);
