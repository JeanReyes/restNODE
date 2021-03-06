const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


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
})

//configuraciones de google

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
  }

  

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    let googleUser = await verify(token)
                    .catch((e) =>{
                        return res.status(500).json({
                            ok: false,
                            e
                        })
                    })

   console.log(googleUser)

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) =>{
        if ( err ){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (usuarioDB){
            if(usuarioDB.google === false){
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: 'Debe usar su usuario normal'
                    }
                })
            }else{

                let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN})

                return{
                    ok: true,
                    usuarioDB,
                    token
                }
            }
        }else {
            usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            console.log("nuevo usuario", usuario)
           
            usuario.save((err, usuarioDB) =>{
                if ( err ){
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN})

                return{
                    ok: true,
                    usuarioDB,
                    token
                }
            })
        }
    })
})


module.exports = app