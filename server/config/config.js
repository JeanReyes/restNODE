/**
 * Puerto
 */

 process.env.PORT = process.env.PORT || 3000


 /**
  * entorno
  */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlBD;

if(process.env.NODE_ENV == 'dev'){
    urlBD = 'mongodb://localhost:27017/cafe'
}else{
    urlBD = process.env.MONGO_URI
}

process.env.URLMONGO = urlBD


//duracion token 60*60 (1hora)

process.env.CADUCIDAD_TOKEN =  60*60*24*30;

// seed o token

process.env.SEED = process.env.SEED || 'seed-desarrollo'

