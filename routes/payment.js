const express = require('express');
const paymentRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const paymentController = require('../controllers/paymentController');


paymentRouter.post('/insert',paymentController.handlePaymentInsertOne );//ispController.handleIspInsertOne
paymentRouter.post('/fetchAllIspPayment',paymentController.handleFetchAllIspPayment);
paymentRouter.post('/fetchIspOwnPayment',paymentController.handleFetchIspOwnPayment);
paymentRouter.post('/fetchAllUserOfIspPayment',paymentController.handleFetchAllUserOfIspPayment);
paymentRouter.post('/fetchUserOwnPayment',paymentController.handleFetchUserOwnPayment);


module.exports = paymentRouter ;
