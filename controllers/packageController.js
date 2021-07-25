const packageInterface = require('../db/interfaces/packageInterface');
const notificationInterface = require('../db/interfaces/notificationInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const userInterface = require('../db/interfaces/userInterface');
const offerInterface = require('../db/interfaces/offerInterface');
const { cond } = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const handleInsertPackage = async (req, res) => {
    try {
        let packageData = await packageInterface.insertPackage(req.body);//change here
        if (packageData.status === 'OK') {
            return res.status(201).send({
                message: packageData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: packageData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/package/insert',
            error: e.message
        });
    }
}


const handlefetchByQuery = async (req, res) => { //for Nttn useing purpose only
    try {
        // console.log(req.body);
        var packageCreator = req.body.packageCreator;
        let Packages = await packageInterface.findPackageByQuery({ packageCreator: packageCreator }, { username: 1, userType: 1 });//can generate error
        //let Packages = Data.data;
        if (Packages.status === 'OK') {
            //res.send(Packages);
            delete Packages.status;
            delete Packages.message;
            return res.send(Packages);

        } else {
            return res.status(400).send({
                message: 'Could not find package',
                error: Packages.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/package/fetchbyquery',
            error: e.message
        });
    }

}


const handlefetchByQueryWithStatus = async (req, res) => {
    try {
        // console.log(req.body);
        let type = req.body.type;//2-->isp,3-->user
        let id = req.body.id;
        let packageCreator = "Nttn"; // find isp id normally 

        let pkgUser = null;

        if (type === 2) {  //find isp 
            let Data = await ispInterface.findIspByQuery({ _id: id }, "done");
            pkgUser = Data.data;
            packageCreator = "Nttn";
        }
        else if (type === 3) {
            let Data = await userInterface.findUserByQuery({ _id: id }, "done");
            pkgUser = Data.data;
            packageCreator = pkgUser.ispId;
        }

        console.log(pkgUser);
        let Packages = await packageInterface.findPackageByQuery({ packageCreator: packageCreator }, { username: 1, userType: 1 });//can generate error

        //let Packages = Data.data;
        if (Packages.status === 'OK') {
            //res.send(Packages);
            delete Packages.status;
            delete Packages.message;
            let packages = Packages.data;
            let pkgsWithStatus = [];

            for (let t in packages) {
                let flag = true;
                for (let p in pkgUser.packages) {
                    if (packages[t]._id.toString() == pkgUser.packages[p].packageId) {
                        pkgsWithStatus.push({ data: packages[t], status: false });
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    pkgsWithStatus.push({ data: packages[t], status: true });

                }
            }
            return res.send(pkgsWithStatus);

        } else {
            return res.status(400).send({
                message: 'Could not find package',
                error: Packages.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/package/fetchByQueryWithStatus',
            error: e.message
        });
    }

}


const handleUpdatePackage = async (req, res) => {
    try {
        var pkgName = req.body.name;
        var pkgCreator = req.body.packageCreator;
        let Data = await packageInterface.findPackageByQuery({ name: pkgName, packageCreator: pkgCreator }, { username: 1, userType: 1 });//can generate error

        let package = Data.data[0];//Data contains array of packages so here i need to find one
        await packageInterface.findByIdAndUpdate(package._id, {
            $set: {
                ongoing: req.body.ongoing,
                offerId: req.body.offerId,
                areas: req.body.areas,
                bandwidth: req.body.bandwidth,
                up_speed: req.body.up_speed,
                down_speed: req.body.down_speed,
                duration: req.body.duration,
                price: req.body.price,
                isRealIp: req.body.isRealIp,
                downTime: req.body.downTime,
                responseTime: req.body.responseTime,

            }
        });

        return res.status(200).send("Sucessfully Update packages");


    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(PackageController) api/package/update ",
            error: e.message
        });
    }

}


const handleUpdatePackageOngoingStatus = async (req, res) => {
    try {
        var pkgName = req.body.name;
        var pkgCreator = req.body.packageCreator;
        let Data = await packageInterface.findPackageByQuery({ name: pkgName, packageCreator: pkgCreator }, { username: 1, userType: 1 });//can generate error

        let package = Data.data[0];//Data contains array of packages so here i need to find one
        await packageInterface.findByIdAndUpdate(package._id, {
            $set: {
                ongoing: req.body.ongoing,
            }
        });;
        sendUpdatePackageStatusToUser(package, req.body.ongoing);
        return res.status(200).send("Sucessfully Update packages Status");
    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(PackageController) api/package/updateStatus ",
            error: e.message
        });
    }
}



const handleAddOffer = async (req, res) => {
    try {
        let pkgName = req.body.name;
        let pkgCreator = req.body.packageCreator;
        let Data = await packageInterface.findPackageByQuery({ name: pkgName, packageCreator: pkgCreator }, { username: 1, userType: 1 });//can generate error (it can pass by id also can update that code)
        let package = Data.data[0];//Data contains array of packages so here i need to find one
        if (!!req.body.offerId) {
            sendAddOfferNotificationToUser(package, req.body.offerId);
        }
        await packageInterface.findByIdAndUpdate(package._id, {
            $set: {
                offerId: req.body.offerId,
            }
        });
        return res.status(200).send("Sucessfully Update offer");

    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(PackageController) api/package/addOffer ",
            error: e.message
        });
    }
}



//------------------------internal function for uses----------------------------------------------------------------

///-------sendUpdatePackageStatusTouser----------

var sendUpdatePackageStatusToUser = async (package, status) => {

    var packageUser = null;
    var notif = {
        senderId: package.packageCreator,
        receiverID: "KS",
        senderType: 1,
        receiverType: 2,
        subject: package.name + "  Package ",
        details: package.name + "  package is  "
    };

    if (status) { // check wheter it's true of false
        notif.subject = notif.subject + " Enable again ";
        notif.details = notif.details + " enable again. You can now Bye this package again";
    }
    else {
        notif.subject = notif.subject + " Disable again ";
        notif.details = notif.details + " Disable again. You can't Bye this package anymore";
    }

    if (package.packageCreator === "Nttn") { // nttn send notification to isp
        notif.senderType = 1;
        notif.receiverType = 2;
        let dummyData = await ispInterface.findAllIspByQuery({ package_id: package._id.toString() }, { username: 1, userType: 1 });//can generate error
        packageUser = dummyData.data;
    }
    else {
        notif.senderType = 2;
        notif.receiverType = 3;
        let dummyData = await userInterface.findAllUserByQuery({ package_id: package._id.toString() }, { username: 1, userType: 1 });//can generate error
        packageUser = dummyData.data;
    }
    for (var i in packageUser) {
        notif.receiverID = packageUser[i].name;
        await notificationInterface.insertData(notif);//change here
    }
}




var sendAddOfferNotificationToUser = async (package, offerId) => {

    let oid = ObjectId(offerId);
    let offerData = await offerInterface.findOfferByQuery({ _id: oid }, true);
    let offer = offerData.data;
    let packageUser = null;
    let notif = {
        senderId: package.packageCreator,
        receiverID: "KS",
        senderType: 1,
        receiverType: 2,
        subject: offer.name + " offer added to " + package.name + " Package.",
        details: offer.name + " offer added to " + package.name + " Package.You know enjoy " + offer.reduction + "% reduction  price.Hurry Up & Buy this package.Stock is limited"
    };
    if (package.packageCreator === "Nttn") { // nttn send notification to isp
        notif.senderType = 1;
        notif.receiverType = 2;
        let dummyData = await ispInterface.findAllIspByQuery({}, "done");//can generate error
        packageUser = dummyData.data;
    }
    else {
        notif.senderType = 2;
        notif.receiverType = 3;
        let dummyData = await userInterface.findAllUserByQuery({}, "done");//can generate error
        packageUser = dummyData.data;
    }
    for (var i in packageUser) {
        notif.receiverID = packageUser[i].name;
        await notificationInterface.insertData(notif);//change here
    }
}



module.exports = {

    handleInsertPackage,
    handlefetchByQuery,
    handleUpdatePackage,
    handleUpdatePackageOngoingStatus,
    handleAddOffer,
    handlefetchByQueryWithStatus
}