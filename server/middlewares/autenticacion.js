const jwt = require('jsonwebtoken')

//funcion que f¿verifica el token

let verificaToken = (req, res, next)=>{
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok: false,
                err:{
                    message: 'Token no Valido'
                }
            })
        }

        req.usuario = decoded.usuario
        next();
    })
    //console.log(token)

}

let verificaAdmin_Role = (req, res, next)=>{
    let usuario = req.usuario;

    if(usuario.role == "ADMIN_ROLE"){
        next()
    }else{
        return res.status(401).json({
            ok: false,
            err:{
                message: 'Usuario no valido'
            }
        })
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}