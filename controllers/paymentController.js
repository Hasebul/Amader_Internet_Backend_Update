const paymentInterface = require('../db/interfaces/paymentInterface');

const handlePaymentInsertOne = async (req, res) => {
    try {
        
        console.log("inside  handlePaymentInsertOne");
        let Data = await paymentInterface.insertData(req.body);//change here

        if (Data.status === 'OK') {
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}


const handlefetchPaymentData = async (req, res) => {
    try {
        
        //console.log("inside  handlefetchIspPackages");
        let Data = await paymentInterface.fetchData(req.body);//change here
        console.log(Data);
        if (Data.status === 'OK') {

            delete Data.status;
            delete Data.message;
            //console.log(pendingdata);
            return res.send(Data);
    
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: Data.message
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
    handlePaymentInsertOne ,
    handlefetchPaymentData
}