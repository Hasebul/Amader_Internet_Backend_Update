const express = require('express');
const nttnRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const nttnController = require('../controllers/nttnController');

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


nttnRouter.post('/insert',nttnController.handleNttnInsertOne);

//nttnRouter.get('/fetch',ispController.getIspData);

nttnRouter.post('/login',authenticate.handleNttnLogIn)
nttnRouter.post('/logout',authenticate.handleNttnAuthentication,nttnController.handleNttnLogOut);
nttnRouter.post('/logoutAll',authenticate.handleNttnAuthentication,nttnController.handleNttnLogOutAll)




module.exports = nttnRouter;