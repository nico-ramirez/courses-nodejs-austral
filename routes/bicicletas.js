var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicletaController');

router.get('/', bicicletaController.list);
router.get('/create', bicicletaController.create_get);
router.post('/create', bicicletaController.create_post);
router.get('/:id/update', bicicletaController.update_get);
router.post('/:id/update', bicicletaController.update_post);
router.post('/:id/delete', bicicletaController.delete_post);

module.exports = router;