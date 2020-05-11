const mongoose = require('mongoose');
const validatorUnique = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El Email es obligatorio'] 
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/**metodo para no devolver la contraseña como respuesta
 * el metodo toJSON sirve para devolver datos.
 */
UsuarioSchema.methods.toJSON = function (){
    let user = this;
    userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

/**metodo para hacer validadciones
 * en este caso se ocupa para validar el email, y que los roles pertenescan solo 
 * a los que aparecen en rolesValidos
 */
UsuarioSchema.plugin(validatorUnique, {message: '{PATH} debe ser unico'})
module.exports = mongoose.model('Usuario', UsuarioSchema);