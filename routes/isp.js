const express = require('express');
const ispRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const ispController = require('../controllers/ispController');


ispRouter.post('/insert',ispController.handleIspInsertOne);//ispController.handleIspInsertOne
ispRouter.post('/fetchOwnPackageArray',ispController.handlefetchOwnPackagesArray);//isp fetch his own registered packages
ispRouter.post('/fetchOwnData',ispController.handlefetchOwnData);
ispRouter.post('/fetchIspOfNttnByQuery',ispController.handlefetchIspOfNttnByQuery);
ispRouter.post('/addPackageToArray',ispController.handleAddPackageToArray);//not need this function it's already implement inside payment controller
ispRouter.post('/login',authenticate.handleIspLogIn)
ispRouter.post('/logout',authenticate.handleIspAuthentication,ispController.handleIspLogOut);
ispRouter.post('/logoutAll',authenticate.handleIspAuthentication,ispController.handleIspLogOutAll)


module.exports = ispRouter;
