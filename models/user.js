var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Debe tener su(s) nombre(s) y apellido(s)'],
        uppercase: true,
    },
    telefono: {
        type: String,
        maxlength:[ 11, "11 Caracteres maximo"],
        required: [true, 'Debe tener un telefono '],
    },
    edad: {
        type: Number,
        min: [1, "1 Es la edad minima aceptada"],
        max: [110, "110 es el porcentaje maxima aceptada"],
        required: [true, "Debe tener una edad "],
    },
    direccion: {
        type: String,
        required: [true, 'Debe tener una direccion'],
        uppercase: true
    },
    correo: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, 'Debe tener un correo'],
    },
    sexo: {
        type: String,
        enum: ['F', 'M'],
        required: [true, 'Debe ingresar el Sexo'],
    },
},
    { timestamps: true });

   // UserSchema.methods.toJSON = function() {

  //      let user = this;
  //      let userObject = user.toObject();
  //      delete userObject.password;
    
  //      return userObject;
  //  }

    
module.exports = mongoose.model('user', UserSchema);



