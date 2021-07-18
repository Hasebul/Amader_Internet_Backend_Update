const express = require('express');
const offerRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const offerController = require('../controllers/offerController');


offerRouter.post('/insert',offerController.handleOfferInsertOne);//ispController.handleIspInsertOne


offerRouter.get('/fetch',offerController.getOfferData);

offerRouter.post('/fetchById',offerController.handleFetchById);

offerRouter.post('/fetchByQuery',offerController.handleOfferFetchByQuery);


module.exports = offerRouter;
