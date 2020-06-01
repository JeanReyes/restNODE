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
    //esta variable la creo en heroku
    urlBD = process.env.MONGO_URI
}

process.env.URLMONGO = urlBD


//duracion token 60*60 (1hora)

process.env.CADUCIDAD_TOKEN =  60*60*24*30;

// seed o token


//seed tambien es creado en el ambiente de heroku
process.env.SEED = process.env.SEED || 'seed-desarrollo'

//Google clientID

process.env.CLIENT_ID = process.env.CLIENT_ID || '1086422754155-j1n8vi4khas4f4eljq2lhlqdbmv1fnpr.apps.googleusercontent.com'

