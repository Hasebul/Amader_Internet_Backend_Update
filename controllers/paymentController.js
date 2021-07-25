const paymentInterface = require('../db/interfaces/paymentInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const userInterface = require('../db/interfaces/userInterface');
const notificationInterface = require('../db/interfaces/notificationInterface');
const packageInterface = require('../db/interfaces/packageInterface');

const handlePaymentInsertOne = async (req, res) => {
    try {
        let payment = req.body;
        if(req.body.user_type==3){
            let user = await userInterface.findUserByQuery({ _id: payment.user_id }, true);
            user = user.data;
            payment= {
                user_type :req.body.user_type,
                package_id :req.body.package_id,
                user_id :req.body.user_id,
                gateway : req.body.gateway,
                transaction_id :req.body.transaction_id,
                amount:req.body.amount,
                method:req.body.method,
                packageDuration:req.body.packageDuration, 
                isp_id:user.ispObjectId
            }
        }
        let Data = await paymentInterface.insertData(payment);//change here
        if (Data.status === 'OK') {
            updatePackageInfo(payment);
            sendNotificationOfPayment(payment);
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
            message: 'ERROR in POST /api/Payment/insert',
            error: e.message
        });
    }
}



//-------------------helper function ----------------------



let sendNotificationOfPayment = async (payment) => { //eta dorkar ache
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
    try {
        if (type === 2) {

            //send notification to "NTTN"

            //fech isp from isp_id 
            let isp = await ispInterface.findIspByQuery({ _id: payment.isp_id }, true);
            isp = isp.data;

            let nttnNotif = {
                senderId: isp.name,
                receiverID: "Nttn",
                senderType: 2,
                receiverType: 1,
                subject: "Receive " + payment.amount + "TK from " + isp.name,
                details: "You have receive " + payment.amount + "TK from " + isp.name + ".TransictionId:" + payment.transaction_id + " gateway:" + payment.gateway + "."
            };

            await notificationInterface.insertData(nttnNotif);


        }
        else if (type === 3) {
            //send notifiction to "ISP"

            //fetch user form user_id 
            let user = await userInterface.findUserByQuery({ _id: payment.user_id }, true);
            user = user.data;

            let ispNotif = {
                senderId: user.name,
                receiverID: user.ispId, //change here fetch receiverID from user 
                senderType: 3,
                receiverType: 2,
                subject: "Receive " + payment.amount + "TK from " + user.name,
                details: "You have receive " + payment.amount + "TK from " + user.name + ".TransictionId:" + payment.transaction_id + " gateway:" + payment.gateway + "."
            };

            await notificationInterface.insertData(ispNotif);

        }

    } catch (e) {
        console.log("catch error inside sendNotificationOfPayment");
        console.log(e);
    }

}




let updatePackageInfo = async (payment) => { 
    let type = payment.user_type;
    try {
        let package = await packageInterface.findPackageByQuery({ _id: payment.package_id});
        package=package.data[0]; 
        console.log(package);

        if (type === 2) {
            //fech isp from isp_id 
            let isp = await ispInterface.findIspByQuery({ _id: payment.isp_id }, true);
            isp = isp.data;
            let flag = true;
            // console.log(isp);
            // console.log(isp.packages);
            for (let t in isp.packages){
                let pkg = isp.packages[t];
                if(pkg.packageId.toString() === package._id.toString()){
                    //console.log(pkg);
                    let termTime = pkg.terminationTime;
                    termTime.setMonth(termTime.getMonth()+package.duration);
                    //console.log(termTime);
                    await ispInterface.UpdateOne({_id:isp._id,"packages._id":pkg._id}, {
                        $set: {
                             "packages.$.terminationTime": termTime
                        }
                    });


                    flag=false;
                    break;
                }
            }

            if(flag){
                let termTime= new Date();
                termTime.setMonth(termTime.getMonth()+package.duration);
                isp.packages.push({packageId:package._id,terminationTime:termTime});
                await isp.save();
            }

        }
        else if (type === 3) {
            //fech user from user_id 
            let user = await userInterface.findUserByQuery({ _id: payment.user_id }, true);
            user = user.data;
            let flag = true;
            for (let t in user.packages){
                let pkg = user.packages[t];
                if(pkg.packageId.toString() === package._id.toString()){
                    //console.log(pkg);
                    let termTime = pkg.terminationTime;
                    termTime.setMonth(termTime.getMonth()+package.duration);
                    //console.log(termTime);
                    await userInterface.UpdateOne({_id:user._id,"packages._id":pkg._id}, {
                        $set: {
                                "packages.$.terminationTime": termTime
                        }
                    });
                    flag=false;
                    break;
                }
            }

            if(flag){
                let termTime= new Date();
                termTime.setMonth(termTime.getMonth()+package.duration);
                user.packages.push({packageId:package._id,terminationTime:termTime});
                await user.save();
            }    
        }
    } catch (e) {
        console.log("catch error inside updateNOtifications");
        console.log(e);
    }

}





module.exports = {
    handlePaymentInsertOne,
    
}