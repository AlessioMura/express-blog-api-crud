const express = require('express');
const router = express.Router();
const instrumentsController = require('../controller/instrumentsController.js')

router.get('/', instrumentsController.index);

module.exports = router;