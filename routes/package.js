const express = require('express');
const packageRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const packageController = require('../controllers/packageController');


packageRouter.post('/insert',packageController.handleInsertPackage);//packageController.
packageRouter.post('/fetchByQuery',packageController.handlefetchByQuery);
packageRouter.post('/fetchByQueryWithStatus',packageController.handlefetchByQueryWithStatus);
packageRouter.post('/fetchUnionUserPackage',packageController.handleFetchUnionUserPackage);
packageRouter.post('/update',packageController.handleUpdatePackage);
packageRouter.post('/updateStatus',packageController.handleUpdatePackageOngoingStatus);
packageRouter.post('/addOffer',packageController.handleAddOffer);
packageRouter.get('/packageInRegion',packageController.handleFetchPackageCountRegion);

module.exports = packageRouter;