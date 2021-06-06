const express = require('express');
const paymentRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const paymentController = require('../controllers/paymentController');


paymentRouter.post('/insert',paymentController.handlePaymentInsertOne );//ispController.handleIspInsertOne

paymentRouter.get('/fetch', paymentController.handlefetchPaymentData);//ispController.handleRequest ) ;// dorkar nai eta


module.exports = paymentRouter ;
