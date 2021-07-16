const express = require('express');
const packageRouter = express.Router();

//middlewares
const authenticate = require('../middlewares/authenticate');

const packageController = require('../controllers/packageController');


packageRouter.post('/insert',packageController.handleInsertPackage);//packageController.
packageRouter.get('/fetch',packageController.handlefetchPackages);
packageRouter.get('/fetchByQuery',packageController.handlefetchByQuery);


module.exports = packageRouter;