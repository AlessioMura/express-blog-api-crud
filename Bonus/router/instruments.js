const express = require('express');
const router = express.Router();
const instrumentsController = require('../controllers/instruments.js')

router.get('/', instrumentsController.index);