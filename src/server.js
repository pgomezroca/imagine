const mongoose=require('mongoose')
const CONFIG = require ('./app/config/config')
const app = require('./app/app')

const main = async()=>{
await mongoose.connect(CONFIG.DB)
 console.log('connected to mongoDB')

await app.listen(CONFIG.PORT)
console.log('server on port',CONFIG.PORT)
}
try{
  main()
}catch(e){
  console.log(e)
}
