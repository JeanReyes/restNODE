require('./config/config')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/usuarios', (req, res)=>{

    let user = [
        {"nombre": "Nicolas"},
        {"nombre": "Denisse"}
    ]
    res.json(user)
})

app.post('/usuarios', (req, res)=>{
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    }else{
        res.json({
            persona: body
        })
    }
})

app.put('/usuarios/:id', (req, res)=>{

    let id = req.params.id;
    res.json({id})
})

app.delete('/usuarios', (req, res)=>{
    res.json("deleteUser")
})



app.listen(process.env.PORT, ()=>{
    console.log("escuchando puerto", process.env.PORT)
})