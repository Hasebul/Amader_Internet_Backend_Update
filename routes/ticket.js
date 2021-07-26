const express = require('express');
const ticketRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');
const ticketController = require('../controllers/ticketController');


ticketRouter.post('/insert',ticketController.handleInsertOne );//ispController.handleIspInsertOne
ticketRouter.post('/unseenCount', ticketController.handleUnseenCount);
ticketRouter.post('/fetchByQuery',ticketController.handlefetchByQuery);
ticketRouter.post('/fetchBySender',ticketController.handlefetchBySender);
ticketRouter.post('/updateSeenStatus',ticketController.handleUpdateSeenStatus);
ticketRouter.post('/updateResolveStatus',ticketController.handleUpdateResolveStatus);

module.exports = ticketRouter ;
