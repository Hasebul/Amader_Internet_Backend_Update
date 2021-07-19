const paymentInterface = require('../db/interfaces/paymentInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const userInterface = require('../db/interfaces/userInterface');

const handlePaymentInsertOne = async (req, res) => {
    try {
        
        //console.log("inside  handlePaymentInsertOne");
        let Data = await paymentInterface.insertData(req.body);//change here

        if (Data.status === 'OK') {

            updateIsWarnForPaymentStatus(req.body.isp_id, req.body.user_id,req.body.user_type);
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


//-------------------helper function ----------------------

var updateIsWarnForPaymentStatus = async( isp_id,user_id,type ) => {
    //type 2 ->isp , 3 -> user  

    try{
    if(type === 2 ){
       
        await ispInterface.findByIdAndUpdate({_id: isp_id},{
            $set:{
                isWarnForPayment:false
            }
        })

    }
    else if(type===3){
        await userInterface.findByIdAndUpdate({_id: user_id},{
            $set:{
                isWarnForPayment:false
            }
        })

    }
    
     } catch(e){
         console.log("catch error inside updateIsWarnForPaymentStatus");
         console.log(e);
     }

}










module.exports = {
    handlePaymentInsertOne ,
    handlefetchPaymentData
}