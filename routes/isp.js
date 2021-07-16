const express = require('express');
const ispRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const ispController = require('../controllers/ispController');


ispRouter.post('/insert',ispController.handleIspInsertOne);//ispController.handleIspInsertOne

ispRouter.post('/preferPackages', ispController.handlefetchIspPackages ) ;// dorkar nai eta

ispRouter.get('/fetch',ispController.getIspData);

ispRouter.post('/login',authenticate.handleIspLogIn)
ispRouter.post('/logout',authenticate.handleIspAuthentication,ispController.handleIspLogOut);
ispRouter.post('/logoutAll',authenticate.handleIspAuthentication,ispController.handleIspLogOutAll)
ispRouter.get('/updateConnectionStatus',authenticate.handleIspAuthentication,ispController.handleUpdateConnectionStatus)


module.exports = ispRouter;
