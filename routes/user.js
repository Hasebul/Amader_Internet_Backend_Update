const express = require('express');
const userRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const ispController = require('../controllers/ispController');

// const userDetailController = require('../controllers/userDetailController');

// userRouter.post('/register',
//     userDetailController.handlePOSTRegister
// );

// userRouter.post('/update',
//     authenticate.handleAuthentication,
//     userDetailController.handlePATCHUserDetail
// );

// userRouter.post('/admin/register',
//     userController.handlePOSTAdminRegister
// );


userRouter.post('/insert',ispController.handleIspRegister);

userRouter.get('/fetch',ispController.getIspData);


module.exports = userRouter;