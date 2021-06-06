const ispInterface = require('../db/interfaces/ispInterface');

const handleIspInsertOne = async (req, res) => {
    try {
        
        console.log("inside  handleIspInsertOne");
        let ispData = await ispInterface.insertIsp(req.body);//change here

        if (ispData.status === 'OK') {
            return res.status(201).send({
                message: ispData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}


const handlefetchIspPackages = async (req, res) => {
    try {
        
        //console.log("inside  handlefetchIspPackages");
        let ispPackages = await ispInterface.getPackages(req.body);//change here

        if (ispPackages.status === 'OK') {
            return res.status(201).send({
                message: ispPackages.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispPackages.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}


const handleIspRegister = async (req, res) => {
    try {
        
        //console.log(req.body);
        let ispData = await ispInterface.insertIsp(req.body);//change here

        if (ispData.status === 'OK') {
            return res.status(201).send({
                message: ispData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}

const getIspData =  async (req, res) => {
    try {
        
        //console.log(req.body);
        let ispData = await ispInterface.fetchIspData(req,res);//change here
        
        if (ispData.status === 'OK') {
            res.send(ispData);
            return res.status(201).send({
                message: ispData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}





module.exports = {
    handleIspRegister,
    getIspData,
    handleIspInsertOne ,
    handlefetchIspPackages
}