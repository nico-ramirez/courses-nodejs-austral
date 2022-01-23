var express = require('express');
var router = express.Router();
var usuarioController = require('../../controllers/api/usuarioControllerApi');

router.get('/', usuarioController.list);
router.post('/create', usuarioController.create);
router.delete('/reservar', usuarioController.reservar);

module.exports = router;