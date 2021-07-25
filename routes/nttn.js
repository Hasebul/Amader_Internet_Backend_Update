const express = require('express');
const nttnRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const nttnController = require('../controllers/nttnController');


nttnRouter.post('/insert',nttnController.handleNttnInsertOne);
nttnRouter.post('/login',authenticate.handleNttnLogIn)
nttnRouter.post('/logout',authenticate.handleNttnAuthentication,nttnController.handleNttnLogOut);
nttnRouter.post('/logoutAll',authenticate.handleNttnAuthentication,nttnController.handleNttnLogOutAll)

module.exports = nttnRouter;