const express = require('express');
const ticketRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');
const ticketController = require('../controllers/ticketController');


ticketRouter.post('/insert',ticketController.handleInsertOne );//ispController.handleIspInsertOne
ticketRouter.post('/unseeCount', ticketController.handleUnseenCount);
ticketRouter.post('/fetchByQuery',ticketController.handlefetchByQuery);
ticketRouter.post('/updateSeenStatus',ticketController.handleUpdateSeenStatus);

module.exports = ticketRouter ;
