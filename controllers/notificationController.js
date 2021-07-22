const notificationInterface = require('../db/interfaces/notificationInterface');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const userInterface = require('../db/interfaces/userInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const paymentInterface = require('../db/interfaces/paymentInterface');

const handleNotificationInsertOne = async (req, res) => {
    try {
        
       // console.log("inside  handleNotificationInsertOne");


        // write code for make notification data 


        let Data = await notificationInterface.insertData(req.body);//change here

        if (Data.status === 'OK') {
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert Notifications',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'catch ERROR(notificationController) in POST /api/notifications/insert',
            error: e.message
        });
    }
}


const handlefetchNotificationData = async (req, res) => {
    try {
        // systemPushNotification();
        // deleteSpamNoification();
        console.log("req get body : ")
        console.log(req.body);
        //console.log("inside  handlefetchIspPackages");
        let Data = await notificationInterface.fetchData(req.body);//change here
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

const handleUnseenNotificationCount= async (req, res) => {
  
    try {

        let rId= req.body.receiverID;
        let rType=req.body.receiverType;
        let notifs = await notificationInterface.findNotificationByQuery ({receiverID:rId,receiverType:rType,seenStatus:false});
        notifs=notifs.data;
        const unseenNot = notifs.length ;
         
        return res.status(200).send({unseenCount:unseenNot });
        
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/notifications/unseenNotificationCount ',
            error: e.message
        });
    }

}




const handlefetchByQuery= async (req,res) => {
    try{
        //--auto push the use who don't pay
        systemPushNotification();
       // delete notification whose seenStatus is true and  arrivaltime is  pass 7 days ago
        deleteSpamNoification();

       // console.log(req.body);
        let rId= req.body.receiverID;
        let rType=req.body.receiverType;
        let notifs = await notificationInterface.findNotificationByQuery ({receiverID:rId,receiverType:rType});//can generate error
        //let Packages = Data.data;
        if (notifs.status === 'OK') {
            //res.send(Packages);
            delete notifs.status;
            delete notifs.message;
            return res.status(200).send(notifs) ;
            
        } else {
            return res.status(400).send({
                message: 'Could not find Notifications',
                error: notifs.message
            });
        }
     } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/notification/fetchbyquery',
            error: e.message
        });
     }
    
    }





 const handleUpdateNotificationSeenStatus= async (req, res) => {
        try{
            var id= ObjectId(req.body.id); // convert into object id 
            //let Data = await notificationInterface.findNotificationByQuery({_id : id});//can generate error
           
            //let package = Data.data[0];//Data contains array of packages so here i need to find one
            await notificationInterface.findByIdAndUpdate(id, {
             $set: {
                 seenStatus:true,
                }
            });
          
            return res.status(200).send("Sucessfully Update  SeenStatus");
         
     
     } catch (e) {
         return res.status(500).send({
             message: "Catch ERROR(notificationController) api/notification/updateSeenStatus ",
             error: e.message
         });
     }
     
     }

// ----- helping function -------------- 


// let deleteSpamNoification = async() => {

//     //deleteMany({ name: /Stark/, age: { $gte: 18 } });

//     var date = new Date();
//     date.setDate(date.getDate() - 7);
//    // console.log(date);
    
//     try{
//         await notificationInterface.findByQueryAndDeleteAllMatched({seenStatus:"true",notificationArrivalTime:{$lt:date}});

//     }catch(e){
//         console.log("catch error in deleteSpamNoification");
//     }

// }



// this function send automatically send notification to user  

// let systemPushNotification = async () => {  //dorkar nai eta ar trigger likhe felbo etar

//     //isp get notification for not paying payment 
    
//     //find all isp who has registered a package
//     try{
      
//         //----update--payment--status------------------------
        
//         let allPayment = await paymentInterface.fetchData("req","res");
//         allPayment=allPayment.data;
//         for(let p in allPayment){
//               let pmt = allPayment[p];
//               console.log(pmt.paymentDuration);
//               let tl=new Date();
//               tl.setMonth(tl.getMonth()-pmt.paymentDuration);
//               console.log(tl);
//               console.log(pmt.payment_time);

//               if(tl>pmt.payment_time){
//                     //update_payment_status_false
//                     await paymentInterface.findByIdAndUpdate({_id:pmt._id},{
//                         $set: {
//                             payment_status:false
//                         }
//                     })
//               }

//         }
      
      
      
//         //find all isp who has registered a package

      

//         let ispListHasPkg = await ispInterface.findAllIspByQuery({ package_id:{$ne:"empty"}}, true);
//         ispListHasPkg=ispListHasPkg.data;
//        // console.log(ispListHasPkg);

//         for(let i in ispListHasPkg){
//           //  console.log(i);
//            let iHP=ispListHasPkg[i];
//            let isInPayTab =  await paymentInterface.findAllPaymentByQuery({isp_id:iHP._id,  payment_status:false });
           
//            if(isInPayTab.length==0 && !iHP.isWarnForPayment){ // send notification  to this isp
//            // console.log("inside if");
//             var inf = {
//                 senderId:"Nttn",
//                 receiverID:iHP.name,
//                 senderType:1,
//                 receiverType:2,
//                 subject:"Pay your payment ",
//                 details:"Your payment duration end.Pay your payment with next day for auto-renewal",
//                 category:"paymentDe" 
//             };
//            // console.log(pnf);
//             await notificationInterface.insertData(inf);
//             await ispInterface.findByIdAndUpdate({_id:iHP._id},{
//                 $set:{
//                     isWarnForPayment:true
//                 }
//             })
//             //update payment warn status 

//            // console.log(ck);
//            }
//         }

    
//     // do it for user 
//     let userListHasPkg = await userInterface.findAllUserByQuery({ package_id:{$ne:"empty"}}, true);
//     userListHasPkg= userListHasPkg.data;
//     for(let j in userListHasPkg){
//        let uHP=userListHasPkg[j];
//        let isInPayTab =  await paymentInterface.findAllPaymentByQuery({user_id:uHP._id,  payment_status:false});
//        if(isInPayTab.length==0 && !uHP.isWarnForPayment){ // send notification  to this user
//         let unf = {
//             senderId:uHP.ispId,
//             receiverID:uHP.name,
//             senderType:2,
//             receiverType:3,
//             subject:"Pay your payment ",
//             details:"Your payment duration end.Pay your payment with next day for auto-renewal",
//             category:"paymentDe" 
//         };
//         await notificationInterface.insertData(unf);
//         await userInterface.findByIdAndUpdate({_id:uHP._id},{
//             $set:{
//                 isWarnForPayment:true
//             }
//         })
//        }
//     }
//     }catch(e){
//         console.log("catch error in system push notification");
//     }
// }







module.exports = {
    handleNotificationInsertOne ,
    handlefetchNotificationData,
    handleUnseenNotificationCount,
    handlefetchByQuery,
    handleUpdateNotificationSeenStatus,
}
