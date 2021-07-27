const ispInterface = require('../db/interfaces/ispInterface');
const packageInterface = require('../db/interfaces/packageInterface');

const handleIspInsertOne = async (req, res) => {
    try {


        let ispData = await ispInterface.insertIsp(req.body);

        if (ispData.status === 'OK') {
            return res.status(201).send({
                message: ispData.message
            });
        } else {
            return res.status(400).send({
                message: 'ERROR(ispController) in api/Isp/insert / Could not Insert Isp',
                error: ispData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch ERROR(ispController) in api/Isp/insert',
            error: e.message
        });
    }
}



const handlefetchOwnPackagesArray = async (req, res) => {


    try {

        let isp = await ispInterface.findIspByQuery({ _id: req.body.id }, "done");
        isp = isp.data;
        let packages = [];
        for (let t in isp.packages) {
            let pkg = isp.packages[t];
            let Data = await packageInterface.findPackageByQuery({ _id: pkg.packageId }, true);
            let data = Data.data[0];
            pkgDetails = {
                data: data,
                startTime: pkg.initiationTime,
                expirationTime: pkg.terminationTime,
            };
            packages.push(pkgDetails);

        }

        return res.send(packages);

    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/isp/fetchOwnPackagesArray',
            error: e.message
        });
    }

}



const handleAddPackageToArray = async (req, res) => {

    try {

        let isp = await ispInterface.findIspByQuery({ _id: req.body.ispId });
        let package = await packageInterface.findPackageByQuery({ _id: req.body.packageId });
        isp = isp.data;
        package = package.data[0]; // all package find 
        console.log(isp);
        console.log(package);
        //already package in the array 
        // for( let t in isp.packages){
        //     let  pkg = isp.packages[t];
        //     if(pkg.packageId == req.body.packageId){
        //         let termTime = pkg.terminationTime;
        //         termTime = termTime.setMonth(termTime.getMonth()+package.duration);

        //     }
        // }
        let termTime = new Date();
        termTime.setMonth(termTime.getMonth() + package.duration);
        console.log(termTime);
        let t = isp.packages.push({ packageId: req.body.packageId, terminationTime: termTime });
        await isp.save();
        return res.send({
            message: "new package save to package array"
        });

    } catch (e) {

        return res.status(500).send({
            message: "catch error(ispController) api/isp/addPackageToArray",
            error: e.messege
        })

    }


}



var handleIspLogOut = async (req, res) => {
    try {
        var isp = res.locals.middlewareResponse.isp;
        var token = res.locals.middlewareResponse.token;

        await ispInterface.findByIdAndUpdate(isp._id, {
            $pull: {
                tokens: { token }
            }
        });

        return res.status(200).send("Sucessfully Logout");


    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(ispController) api/isp/logout ",
            error: e.message
        });
    }

}


var handleIspLogOutAll = async (req, res) => {
    try {
        var isp = res.locals.middlewareResponse.isp;
        var token = res.locals.middlewareResponse.token;
        isp.tokens = [];
        isp.save();
        return res.status(200).send("Sucessfully Logging out from all devices");


    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(ispController) api/isp/logoutAll ",
            error: e.message
        });
    }

}



const handlefetchOwnData = async (req, res) => {

    try {
        let Data = await ispInterface.findIspByQuery({ _id: req.body.id }, true);
        //console.log(Data);
        if (Data.status === 'OK') {//find isp 
            let isp = Data.data;
            return res.send(isp);

        }
        else {
            return res.status(400).send({
                message: "Could not find package",
                error: Data.message
            })
        }

    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/isp/fetchOwnData',
            error: e.message
        });
    }


}




const handlefetchIspOfNttnByQuery = async (req, res) => {

    try {
        let Data = await ispInterface.findAllIspByQuery({}, true); //this find all the isp
        //console.log(Data);
        if (Data.status === 'OK') {//find isp 
            let isp = Data.data;
            return res.send(isp);

        }
        else {
            return res.status(400).send({
                message: "Could not find package",
                error: Data.message
            })
        }

    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/isp/fetchOwnData',
            error: e.message
        });
    }


}



const handleRegionIspNumber =async (req, res) => {

    try{
       let data = [] ;
       let Data = await ispInterface.findAllIspByQuery({region:"Dhaka"},true);
       let num = Data.data.length;
       data.push({region:"DHAKA",val:num});

       
       Data = await ispInterface.findAllIspByQuery({region:"Rajshahi"},true);
       num = Data.data.length;
       data.push({region:"RAJSHAHI",val:num});

       Data = await ispInterface.findAllIspByQuery({region:"Chittagong"},true);
       num = Data.data.length;
       data.push({region:"CHITTAGONG",val:num});

       Data = await ispInterface.findAllIspByQuery({region:"Mymensingh"},true);
       num = Data.data.length;
       data.push({region:"MYMENSINGH",val:num});

       Data = await ispInterface.findAllIspByQuery({region:"Khulna"},true);
       num = Data.data.length;
       data.push({region:"KHULNA",val:num});

       Data = await ispInterface.findAllIspByQuery({region:"Barishal"},true);
       num = Data.data.length;
       data.push({region:"BARISHAL",val:num});

       Data = await ispInterface.findAllIspByQuery({region:"Sylhet"},true);
       num = Data.data.length;
       data.push({region:"SYLHET",val:num});

       Data = await ispInterface.findAllIspByQuery({region:"Rangpur"},true);
       num = Data.data.length;
       data.push({region:"RANGPUR",val:num});

       res.send(data);
        
    }catch(e){
        res.status(500).send({error:e.message});
    }


}

module.exports = {
    handleIspInsertOne,
    handleIspLogOut,
    handleIspLogOutAll,
    handlefetchOwnData,
    handleAddPackageToArray,
    handlefetchOwnPackagesArray,
    handlefetchIspOfNttnByQuery,
    handleRegionIspNumber
}