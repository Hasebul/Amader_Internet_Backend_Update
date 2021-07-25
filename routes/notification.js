const express = require('express');
const notificationRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');
const notificationController = require('../controllers/notificationController');


notificationRouter.post('/insert',notificationController.handleNotificationInsertOne );//ispController.handleIspInsertOne
notificationRouter.post('/unseenNotificationCount', notificationController.handleUnseenNotificationCount);
notificationRouter.post('/fetchByQuery',notificationController.handlefetchByQuery);
notificationRouter.post('/updateSeenStatus',notificationController.handleUpdateNotificationSeenStatus);

module.exports = notificationRouter ;
