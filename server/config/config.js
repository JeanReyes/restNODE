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
    urlBD = 'mongodb+srv://NESKAnor:Is39vwr3mlGTf22p@cluster0-hpyn9.mongodb.net/cafe'
}

process.env.URLMONGO = urlBD

 menu = [
    {
        "nombre": "inicio",
        "path": "www.google.cl"
    },
    {
        "nombre": "contact",
        "path": "www.udemy.cl"
    },
 ]