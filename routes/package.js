const express = require('express');
const packageRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const packageController = require('../controllers/packageController');


packageRouter.post('/insert',packageController.handleInsertPackage);//packageController.
packageRouter.get('/fetch',packageController.handlefetchPackages);
packageRouter.post('/fetchByQuery',packageController.handlefetchByQuery);
packageRouter.post('/update',packageController.handleUpdatePackage);
packageRouter.post('/updateStatus',packageController.handleUpdatePackageOngoingStatus);


module.exports = packageRouter;