var express = require('express');
var router = express.Router();
var bicicletaController = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletaController.list);
router.post('/create', bicicletaController.create);
router.delete('/delete', bicicletaController.delete);

module.exports = router;