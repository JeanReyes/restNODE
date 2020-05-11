require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded 
// paquete para permitir leer variables enviadas por post
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use( require('./routes/usuario' ));


/**conecion a base de datos */
mongoose.connect(process.env.URLMONGO,
{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err, res)=>{
    if(err) throw err;
    console.log("Base de datos online")
})


app.listen(process.env.PORT, ()=>{
    console.log("escuchando puerto", process.env.PORT)
})