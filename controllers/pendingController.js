const pendingInterface = require('../db/interfaces/pendingInterface');

const handlePendingInsertOne = async (req, res) => {
    try {
        
        console.log("inside  handlePendingInsertOne");
        let pendingData = await pendingInterface.insertPendingData(req.body);//change here

        if (pendingData.status === 'OK') {
            return res.status(201).send({
                message: pendingData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: pendingData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}


const handlefetchPendingData = async (req, res) => {
    try {
        
        //console.log("inside  handlefetchIspPackages");
        let pendingData = await pendingInterface.fetchPendingData (req.body);//change here
        console.log(pendingData);
        if (pendingData.status === 'OK') {

            delete pendingData.status;
            delete pendingData.message;
            //console.log(pendingdata);
            return res.send(pendingData);
    
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: pendingData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/pending/fetching',
            error: e.message
        });
    }
}


module.exports = {
    handlePendingInsertOne ,
    handlefetchPendingData
}