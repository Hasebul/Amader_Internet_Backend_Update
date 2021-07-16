const packageInterface = require('../db/interfaces/packageInterface');

const handleInsertPackage = async (req, res) => {
    try {
        
        console.log("inside  handleInsertPackage");
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
            message: 'ERROR in POST /api/Isp/insert',
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
    console.log(req.body);
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



module.exports = {

    handleInsertPackage ,
    handlefetchPackages,
    handlefetchByQuery,
}