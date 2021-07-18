const express = require('express');
const notificationRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const notificationController = require('../controllers/notificationController');


notificationRouter.post('/insert',notificationController.handleNotificationInsertOne );//ispController.handleIspInsertOne

notificationRouter.get('/fetch', notificationController.handlefetchNotificationData);//ispController.handleRequest ) ;// dorkar nai eta

notificationRouter.get('/random', notificationController.handleRandom);
notificationRouter.post('/fetchByQuery',notificationController.handlefetchByQuery);
notificationRouter.post('/updateSeenStatus',notificationController.handleUpdateNotificationSeenStatus);

module.exports = notificationRouter ;
