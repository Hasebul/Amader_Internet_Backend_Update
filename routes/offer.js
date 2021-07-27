const express = require('express');
const offerRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const offerController = require('../controllers/offerController');


offerRouter.post('/insert',offerController.handleOfferInsertOne);//ispController.handleIspInsertOne

offerRouter.post('/fetchById',offerController.handleFetchById);

offerRouter.post('/fetchByQuery',offerController.handleOfferFetchByQuery);

offerRouter.post('/fetchUnionOffer',offerController.handleFetchUnionOffer);


module.exports = offerRouter;
