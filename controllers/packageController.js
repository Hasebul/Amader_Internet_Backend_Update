const packageInterface = require('../db/interfaces/packageInterface');
const notificationInterface = require('../db/interfaces/notificationInterface');
const ispInterface = require('../db/interfaces/ispInterface');
const userInterface = require('../db/interfaces/userInterface');
const { cond } = require('lodash');

const handleInsertPackage = async (req, res) => {
    try {
        
      //  console.log("inside  handleInsertPackage");
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


const handlefetchPackages = async (req, res) => {
    try {
        
        //console.log("inside  handlefetchIspPackages");
        let Packages = await packageInterface.fetchPackageData(req.body);//change here
        //console.log(Packages);
        if (Packages.status === 'OK') {
            //res.send(Packages);
            delete Packages.status;
            delete Packages.message;
            return res.send(Packages) ;
            
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: Packages.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}


const handlefetchByQuery= async (req,res) => {
try{
   // console.log(req.body);
    var packageCreator= req.body.packageCreator;
    let Packages = await packageInterface.findPackageByQuery ({packageCreator: packageCreator}, {username: 1, userType: 1});//can generate error
    //let Packages = Data.data;
    if (Packages.status === 'OK') {
        //res.send(Packages);
        delete Packages.status;
        delete Packages.message;
        return res.send(Packages) ;
        
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




const handleUpdatePackage= async (req, res) => {
   try{
    var pkgName = req.body.name;
    var pkgCreator = req.body.packageCreator;
    let Data = await packageInterface.findPackageByQuery ({name: pkgName , packageCreator : pkgCreator}, {username: 1, userType: 1});//can generate error

    let package = Data.data[0];//Data contains array of packages so here i need to find one
    await packageInterface.findByIdAndUpdate(package._id, {
        $set: {
            ongoing: req.body.ongoing,
            offerId: req.body.offerId,
            areas: req.body.areas,
            bandwidth : req.body.bandwidth,
            up_speed  : req.body.up_speed,
            down_speed: req.body.down_speed,
            duration  : req.body.duration,
            price     : req.body.price,
            isRealIp  : req.body.isRealIp,
            downTime  : req.body.downTime,
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



const handleUpdatePackageOngoingStatus= async (req, res) => {
    try{
     var pkgName = req.body.name;
     var pkgCreator = req.body.packageCreator;
     let Data = await packageInterface.findPackageByQuery ({name: pkgName , packageCreator : pkgCreator}, {username: 1, userType: 1});//can generate error
 
     let package = Data.data[0];//Data contains array of packages so here i need to find one
     await packageInterface.findByIdAndUpdate(package._id, {
         $set: {
             ongoing: req.body.ongoing,
         }
     });
      
     //------code for insert notifications --------------------------------
    // console.log(package);
     sendUpdatePackageStatusToUser(package,req.body.ongoing);

     

     
     return res.status(200).send("Sucessfully Update packages Status");
     
 
 } catch (e) {
     return res.status(500).send({
         message: "Catch ERROR(PackageController) api/package/updateStatus ",
         error: e.message
     });
 }
 
 }



//------------------------internal function for uses----------------------------------------------------------------

///-------sendUpdatePackageStatusTouser----------

var sendUpdatePackageStatusToUser = async(package,status) => {
   
   //console.log(package);
   //console.log(status);

    var packageUser=null;
    var notif = {
        senderId:package.packageCreator,
        receiverID:"KS",
        senderType:1,
        receiverType:2,
        subject:package.name+"  Package ",
        details:package.name+"  package is  " 
    };
    
    if(status){ // check wheter it's true of false
        notif.subject=notif.subject+" Enable again ";
        notif.details=notif.details+" enable agin. You can now Bye this package again";
    }
    else{
        notif.subject=notif.subject+" Disable again ";
        notif.details=notif.details+" Disable agin. You can't Bye this package anymore";
     }


    if(package.packageCreator==="Nttn"){ // nttn send notification to isp
             notif.senderType=1;
             notif.receiverType=2;
             let dummyData = await ispInterface.findAllIspByQuery ({ package_id: package._id.toString()}, {username: 1, userType: 1});//can generate error
            // console.log(dummyData);
             packageUser=  dummyData.data;
    }
    else{
        notif.senderType=2;
        notif.receiverType=3;
        let dummyData = await userInterface.findAllUserByQuery ({ package_id: package._id.toString()}, {username: 1, userType: 1});//can generate error
        packageUser=  dummyData.data;

    }
    
    // console.log(packageUser);

    for(var i in packageUser){
       // console.log(packageUser[i].name);
        notif.receiverID = packageUser[i].name;
        await notificationInterface.insertData(notif);//change here
   }
   

}





module.exports = {

    handleInsertPackage ,
    handlefetchPackages,
    handlefetchByQuery,
    handleUpdatePackage,
    handleUpdatePackageOngoingStatus,
}