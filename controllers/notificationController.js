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


const handleUnseenNotificationCount = async (req, res) => {

    try {

        let rId = req.body.receiverID;
        let rType = req.body.receiverType;
        let notifs = await notificationInterface.findNotificationByQuery({ receiverID: rId, receiverType: rType, seenStatus: false });
        notifs = notifs.data;
        const unseenNot = notifs.length;

        return res.status(200).send({ unseenCount: unseenNot });

    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/notifications/unseenNotificationCount ',
            error: e.message
        });
    }

}


const handlefetchByQuery = async (req, res) => {
    try {
        let rId = req.body.receiverID;
        let rType = req.body.receiverType;
        let notifs = await notificationInterface.findNotificationByQuery({ receiverID: rId, receiverType: rType });//can generate error
        //let Packages = Data.data;
        if (notifs.status === 'OK') {
            //res.send(Packages);
            delete notifs.status;
            delete notifs.message;
            return res.status(200).send(notifs);

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

const handleUpdateNotificationSeenStatus = async (req, res) => {
    try {
        var id = ObjectId(req.body.id); // convert into object id 
        await notificationInterface.findByIdAndUpdate(id, {
            $set: {
                seenStatus: true,
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


let deleteSpamNoification = async () => {

    //deleteMany({ name: /Stark/, age: { $gte: 18 } });

    var date = new Date();
    date.setDate(date.getDate() - 7);
    // console.log(date);

    try {
        await notificationInterface.findByQueryAndDeleteAllMatched({ seenStatus: "true", notificationArrivalTime: { $lt: date } });

    } catch (e) {
        console.log("catch error in deleteSpamNoification");
    }

}



module.exports = {
    handleNotificationInsertOne,
    handleUnseenNotificationCount,
    handlefetchByQuery,
    handleUpdateNotificationSeenStatus,
}
