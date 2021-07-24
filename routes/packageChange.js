const express = require('express');
const packageChangeRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const packageChangeController = require('../controllers/packageChangeController');


packageChangeRouter.post('/insert',packageChangeController.handleInsertOne );//ispController.handleIspInsertOne


module.exports = packageChangeController;
