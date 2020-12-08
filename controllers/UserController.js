var User = require("../models/user");
var bcrypt = require("../node_modules/bcrypt/bcrypt");

const admin = require('firebase-admin');
let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://Blautech-80260.firebaseio.com"
});

let db = admin.firestore();

//Registrar un user 
async function registrar(req, res) {

    var user = await guardaruser(req.body);  
     
    console.log(user);
    if (user.error) {
        res.status(500).send({ error: user.error });
    } else {
        console.log(user._id);
        const us = await db.collection('users').doc(user._id+"").set(req.body);
        res.status(200).send({ user: user  });
    }
}
//obtener un user 
async function obtenerUser(req, res) {
    try {
      
        let user = await User.findById(req.params['id']);
        res.status(200).send({ user: user  });
    } catch (error) {
        res.status(500).send({ error: error });
    }

}

//Obtener todos el user 
async function getAllUser(req, res) {
    try {

        let user = await User.find({});
        res.status(200).send({ user: user });
    } catch (error) {
        res.status(500).send({ error: error });
    }
}
//actualizar datos del user 
async function actualizarUser(req, res) {

    try {
        console.log(req.body);
        const us = await db.collection('users').doc(req.body._id+"").set(req.body);
    
        let user = await User.findByIdAndUpdate(req.body._id,req.body );

    
        res.status(200).send({ user: user  });
    } catch (error) {
        res.status(500).send({ error: error });
    }

}
//eliminar datos del user 
async function eliminarUser(req, res) {

    try {

        console.log(req.params['id']);     
        const usr = await db.collection('users').doc(req.params['id']+"").delete();
        let user = await User.findByIdAndRemove(req.params['id'] );

    
        res.status(200).send({ user: user });
    } catch (error) {
        res.status(500).send({ error: error });
    }

}


//Metodos estaticos

//Guardar user
const guardaruser = async (data) => {
    var user = new User();
    user.nombre = data.nombre;
    user.direccion = data.direccion;
    user.edad = data.edad;
    user.telefono = data.telefono;
    user.sexo = data.sexo;
    user.correo = data.correo;
    try {
        return await user.save();
    } catch (err) {

        for (var i in err.errors) {
            if (!err.errors[i].properties) {
                return ({ error: err });
            }
            return ({ error: err.errors[i].properties.message });
        }
        return ({ error: err });
    }
};

module.exports = {
    registrar,
    obtenerUser,
    getAllUser,
    actualizarUser,
    login,
    eliminarUser
};
