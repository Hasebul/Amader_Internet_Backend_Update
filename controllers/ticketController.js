const ticketInterface = require('../db/interfaces/ticketInterface');
const notificationInterface = require('../db/interfaces/notificationInterface');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const userInterface = require('../db/interfaces/userInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const paymentInterface = require('../db/interfaces/paymentInterface');

const handleInsertOne = async (req, res) => {
    try {

        let Data = await ticketInterface.insertData(req.body);//change here

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
            message: 'catch ERROR(ticketController) in POST /api/tickets/insert',
            error: e.message
        });
    }
}


const handleUnseenCount = async (req, res) => {

    try {

        let rId = req.body.receiverId;
        let rType = req.body.receiverType;
        let Data = await ticketInterface.findByQuery({ receiverId: rId, receiverType: rType, seenStatus: false });
        let tickts = Data.data;
        const unseenTicketCount = tickts.length;
        let notifs = await notificationInterface.findNotificationByQuery({ receiverID: rId, receiverType: rType, seenStatus: false });
        notifs = notifs.data;
        const unseenNotifCount = notifs.length;

        return res.status(200).send({
            unseenTicket: unseenTicketCount,
            unseenNotification: unseenNotifCount
        });

    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/tickets/unseenCount ',
            error: e.message
        });
    }

}


const handlefetchByQuery = async (req, res) => {
    try {
        let rId = req.body.receiverId;
        let rType = req.body.receiverType;
        let tickts = await ticketInterface.findByQuery({ receiverId: rId, receiverType: rType });//can generate error
        //let Packages = Data.data;
        if (tickts.status === 'OK') {
            //res.send(Packages);
            delete tickts.status;
            delete tickts.message;
            return res.status(200).send(tickts);

        } else {
            return res.status(400).send({
                message: 'Could not find Notifications',
                error: tickts.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/notification/fetchbyquery',
            error: e.message
        });
    }

}

const handlefetchBySender = async (req, res) => {
    try {
        let sId = req.body.senderId;
        let sType = req.body.senderType;
        let tickts = await ticketInterface.findByQuery({ senderId: sId, senderType: sType });//can generate error
        //let Packages = Data.data;
        if (tickts.status === 'OK') {
            //res.send(Packages);
            delete tickts.status;
            delete tickts.message;
            return res.status(200).send(tickts);

        } else {
            return res.status(400).send({
                message: 'Could not find Notifications',
                error: tickts.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/notification/fetchbyquery',
            error: e.message
        });
    }

}

const handleUpdateSeenStatus = async (req, res) => {
    try {
        var id = ObjectId(req.body.id); // convert into object id 
        await ticketInterface.findByIdAndUpdate(id, {
            $set: {
                seenStatus: true,
            }
        });

        return res.status(200).send("Sucessfully Update  SeenStatus");


    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(ticketController) api/ticket/updateSeenStatus ",
            error: e.message
        });
    }

}



const handleUpdateResolveStatus = async (req, res) => {
    try {
        let id = ObjectId(req.body.id); // convert into object id 
        await ticketInterface.findByIdAndUpdate(id, {
            $set: {
                resolveStatus: true,
                seenStatus: true
            }
        });
        //---fetch ticketData
        let Data = await ticketInterface.findByQuery({ _id: id });
        let tikD = Data.data[0]; // array 

        // --- send notification to sender about resolve status-----
        let notif = {
            senderId: tikD.receiverId,
            receiverID: tikD.senderId,
            senderType: tikD.receiverType,
            receiverType: tikD.senderType,
            subject: tikD.category + " resolved .",
            details: "You Problem has been resolved. If you face any of this problem please let us know again. Your comfort our concern . Thank You! ",
            notificationArrivalTime: new Date()
        };
        await notificationInterface.insertData(notif);
        return res.status(200).send("Sucessfully Update  resolveStatus");
    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(ticketController) api/ticket/updateresolveStatus ",
            error: e.message
        });
    }
}



const handleRefund = async (req, res) => {

    try {

        let type = req.body.type; // who's amount refunded isp / user
        let usrName = req.body.name;
        let resolver = req.body.resolver;
        let amount = req.body.amount;
        let message = req.body.message;
        let category = req.body.category; // apatoto dor kar nai 

        if (type === 2) { //Refund isp amount

            let isp = await ispInterface.findIspByQuery({ name: usrName }, true);
            isp = isp.data;
            let incAmount = isp.balance + amount;
            await ispInterface.findByIdAndUpdate(isp._id, {
                $set: {
                    balance: incAmount
                }
            })
            let notif = {
                senderId: resolver,
                receiverID: usrName,
                senderType: 1,
                receiverType: 2,
                subject: "Your amount is credited by " + amount + " TK",
                details: message + " For this your amount is credited .Your comfort our concern . Thank You! ",
                notificationArrivalTime: new Date()
            };
            await notificationInterface.insertData(notif);

        }
        else if (type === 3) { // Refund user amount

            let user = await userInterface.findUserByQuery({ name: usrName }, true);
            user = user.data;
            let incAmount = user.balance+ amount;
            await userInterface.findByIdAndUpdate(user._id, {
                $set: {
                    balance: incAmount
                }
            })
            let notif = {
                senderId: resolver,
                receiverID: usrName,
                senderType: 2,
                receiverType: 3,
                subject: "Your amount is credited by " + amount + " TK",
                details: message + " For this your amount is credited .Your comfort our concern . Thank You! ",
                notificationArrivalTime: new Date()
            };
            await notificationInterface.insertData(notif);

        }

        res.send("Sucessfully refund");

    }catch (e) {
        res.status(500).send({
            message: "Catch ERROR(ticketController) api/ticket/refund",
            error: e.message
        });
    }


}

module.exports = {
    handleInsertOne,
    handleUnseenCount,
    handlefetchByQuery,
    handlefetchBySender,
    handleUpdateSeenStatus,
    handleUpdateResolveStatus,
    handleRefund
}
