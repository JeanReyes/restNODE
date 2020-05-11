const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt')
const _ = require('underscore')
const fs = require('fs');
require('./text');

const app = express();

app.get('/usuarios', (req, res)=>{

    /**metodo que devuelve los resultados paginados
     * skip = desde
     * limit = limite por pagina
     */
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite)

    let estado = {
        estado: true
    }

    Usuario.find({estado: true})
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios)=>{
                if (err){
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                Usuario.count({estado:true}, (err, total)=>{
                    res.json({
                        ok: true,
                        usuarios,
                        total
                    })
                   
                })
                
            })
})

app.post('/usuarios', (req, res)=>{

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encripto la contraseña hash de una sola via
        role: body.role
    })

    usuario.save(( err, UsuarioDB )=>{
        
        if (err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

            //menuMitta.push(UsuarioDB)

            let menu =`menuMitta = ${JSON.stringify(UsuarioDB)}`
    
            fs.writeFile('server/routes/text.js', menu, (error) => {
                if (error) throw error;
                
            });
        
            // let nuevoMenu = menuMitta.push(UsuarioDB);
            // console.log("nuevomenu",nuevoMenu)
      

        res.json({
            ok: true,
            UsuarioDB
        })
    })
})

app.put('/usuarios/:id', (req, res)=>{

    let id = req.params.id;

    /**metodo que actuliza solo lo que yo quiero envio los datos y me devuelve una copia de los datos del arreglo que le envio */
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    /**metodo para actulizar por ID envio el ID, cuerpo actulizar, objeto new para devolver el usuario actulizado y corres las actulizaciones,
     *  y un callback de respuesta*/
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, UsuarioDB)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            UsuarioDB
        })
    })
})

app.delete('/usuarios/:id', (req, res)=>{
    let id = req.params.id

    let estado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, estado, {new: true}, (err, usuarioBorrado)=>{
    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
        if(err){
            res.json({
                ok: false,
                err
            })
        }

        if(!usuarioBorrado){
            res.json({
                ok: false,
                err:{
                    message: "El Usuario no existe"
                }
            })
        }else{
            res.json({
                ok: true,
                usuarioBorrado
            })
        }

    })
})

module.exports = app;
