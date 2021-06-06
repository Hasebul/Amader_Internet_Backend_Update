const express = require('express');
const pendingRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const pendingController = require('../controllers/pendingController');


pendingRouter.post('/insert',pendingController.handlePendingInsertOne );//ispController.handleIspInsertOne

pendingRouter.get('/fetch', pendingController.handlefetchPendingData);//ispController.handleRequest ) ;// dorkar nai eta


module.exports = pendingRouter;
