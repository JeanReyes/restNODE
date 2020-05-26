const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();

app.post('/login', (req, res)=>{
    let body = req.body

    Usuario.findOne({ email: body.email }, (err, Usuario)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!Usuario){
            return res.status(400).json({
                ok: false,
                err:{
                    message: '(Usuario) o contraseña incorrecta'
                }
            })
        }

        if ( !bcrypt.compareSync(body.password, Usuario.password) ){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario o (contraseña) incorrecta'
                }
            })
        }

        let token = jwt.sign({usuario: Usuario}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN})

        res.json({
            ok: true,
            Usuario,
            token
        })


    })

    // res.json({
    //     ok: true,
    //     data: body
    // })
})


module.exports = app