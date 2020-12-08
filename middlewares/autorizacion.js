const admin = require('firebase-admin');
//let serviceAccount = require('./serviceAccountKey.json');

exports.ensureAuthenticated = function (req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    var token = req.headers.authorization.split(" ")[1];
   
    admin.auth().verifyIdToken(token)
  .then(function(decodedToken) {
    req.user= decodedToken.uid;
   console.log( decodedToken.uid);
  }).catch(function(error) {
      console.log(error);
    return res
    .status(403)
    .send({ message: "Tu cabezera no es valida, porfavor inicia sesion otra vez" });
  });

    
    next();
}