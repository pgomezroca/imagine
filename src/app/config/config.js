module.exports={//configuracion para prod.||local
  PORT: process.env.PORT || 3020,
  DB:process.env.DB ||'mongodb://localhost:27017/seminario-users-crud',
  SECRET_TOKEN: process.env.SECRET_TOKEN || 'mitoken'
}