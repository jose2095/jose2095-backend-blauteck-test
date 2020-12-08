var usercontroller = require("../controllers/UserController");
var express = require("express");
var auth = require('../middlewares/autorizacion');
var router = express.Router();


router.post("/registrar",auth.ensureAuthenticated,usercontroller.registrar);
router.get("/:id",auth.ensureAuthenticated,usercontroller.obtenerUser);
router.get("/get/all",auth.ensureAuthenticated,usercontroller.getAllUser);
router.put("/get/actualizar",auth.ensureAuthenticated,usercontroller.actualizarUser);
router.delete("/delete/:id",auth.ensureAuthenticated,usercontroller.eliminarUser);

module.exports = router;
