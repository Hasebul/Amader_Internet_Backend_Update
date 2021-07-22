const paymentInterface = require('../db/interfaces/paymentInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const userInterface = require('../db/interfaces/userInterface');
const notificationInterface = require('../db/interfaces/notificationInterface');

const handlePaymentInsertOne = async (req, res) => {
    try {
        
        //console.log("inside  handlePaymentInsertOne");
        let Data = await paymentInterface.insertData(req.body);//change here

        if (Data.status === 'OK') {

            //updateIsWarnForPaymentStatus(req.body.isp_id, req.body.user_id,req.body.user_type);
            sendNotificationOfPayment(req.body);
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




// const handleInformationFetch = async (req,res) => {



//     try {
        
//         //console.log("inside  handlefetchIspPackages");
//         let type = req.body.type;
//         let id = req.body.id;

//         if(type === 2){ // find isp 

//             let Data = await paymentInterface.findAllPaymentByQuery({isp_id:id});
//             let isp = Data.data[0];


//         }

//         else if(type == 3){ // find user 
        
//         }
//     } catch (e) {
//         return res.status(500).send({
//             message: 'ERROR in POST /api/pending/fetching',
//             error: e.message
//         });
//     }






// }

//-------------------helper function ----------------------

// var updateIsWarnForPaymentStatus = async( isp_id,user_id,type ) => {  //dorkar nai eta likhe felbo
//     //type 2 ->isp , 3 -> user  

//     try{
//     if(type === 2 ){
       
//         await ispInterface.findByIdAndUpdate({_id: isp_id},{
//             $set:{
//                 isWarnForPayment:false
//             }
//         })

//     }
//     else if(type===3){
//         await userInterface.findByIdAndUpdate({_id: user_id},{
//             $set:{
//                 isWarnForPayment:false
//             }
//         })

//     }
    
//      } catch(e){
//          console.log("catch error inside updateIsWarnForPaymentStatus");
//          console.log(e);
//      }

// }




var sendNotificationOfPayment = async( payment ) => { //eta dorkar ache
    //type 2 ->isp , 3 -> user  

    // "package_id" :"60f08ce854c42a3f58302558",
    // "isp_id" :"60e93678fbecd640544a2cec",
    // "payment_status" :"true",
    // "gateway" : "BKASH",
    // "transaction_id" :"123abc",
    // "amount":"103430",
    // "method":"BAKSH",
    // "paymentDuration":12

    let type = payment.user_type;
    try{
    if(type === 2 ){
       
        //send notification to "NTTN"
        
        //fech isp from isp_id 
        let isp= await ispInterface.findIspByQuery({_id:payment.isp_id},true);
        isp=isp.data;

        let nttnNotif = {
            senderId:isp.name,
            receiverID:"Nttn",
            senderType:2,
            receiverType:1,
            subject:"Receive "+payment.amount+"TK from "+isp.name,
            details:"You have receive "+payment.amount+"TK from "+isp.name+".TransictionId:"+payment.transaction_id+" gateway:"+payment.gateway+"."
        };

        await notificationInterface.insertData(nttnNotif);


    }
    else if(type===3){
        //send notifiction to "ISP"
        
        //fetch user form user_id 
        let user= await userInterface.findUserByQuery({_id:payment.user_id},true);
        user=user.data;

        let ispNotif = {
            senderId:user.name,
            receiverID:user.ispId, //change here fetch receiverID from user 
            senderType:3,
            receiverType:2,
            subject:"Receive "+payment.amount+"TK from "+user.name,
            details:"You have receive "+payment.amount+"TK from "+user.name+".TransictionId:"+payment.transaction_id+" gateway:"+payment.gateway+"."
        };

        await notificationInterface.insertData(nttnNotif);

    }
    
     } catch(e){
         console.log("catch error inside sendNotificationOfPayment");
         console.log(e);
     }

}







module.exports = {
    handlePaymentInsertOne ,
    handlefetchPaymentData,
    
}