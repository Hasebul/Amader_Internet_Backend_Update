const express = require('express');
const userRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const userController = require('../controllers/userController');


userRouter.post('/insert',userController.handleUserInsertOne);
userRouter.post('/fetchOwnPackageArray',userController.handlefetchOwnPackagesArray);//isp fetch his own registered packages
userRouter.post('/fetchOwnData',userController.handlefetchOwnData);
userRouter.post('/login',authenticate.handleUserLogIn);
userRouter.post('/logout',authenticate.handleUserAuthentication,userController.handleUserLogOut);
userRouter.post('/logoutAll',authenticate.handleUserAuthentication,userController.handleUserLogOutAll)

module.exports = userRouter;