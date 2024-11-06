const express = require('express');
const router = express.Router();
const instrumentsController = require('../controller/instrumentsController.js')

router.get('/', instrumentsController.index);

router.get('/:id', instrumentsController.show)

router.post('/', instrumentsController.create)

module.exports = router;