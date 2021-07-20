const express = require('express');
const userRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const userController = require('../controllers/userController');



userRouter.post('/insert',userController.handleUserInsertOne);

userRouter.get('/fetch',userController.getUserData);//dorkarnai eta

userRouter.post('/fetchOwnPackage',userController.handlefetchOwnPackage);//isp fetch his own registered package

userRouter.post('/buyPackage',userController.handlebuyPackage);

userRouter.post('/login',authenticate.handleUserLogIn);
userRouter.post('/logout',authenticate.handleUserAuthentication,userController.handleUserLogOut);
userRouter.post('/logoutAll',authenticate.handleUserAuthentication,userController.handleUserLogOutAll)

module.exports = userRouter;