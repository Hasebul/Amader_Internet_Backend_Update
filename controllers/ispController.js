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


const handlefetchIspPackages = async (req, res) => {
    try {
        
        //console.log("inside  handlefetchIspPackages");
        let ispPackages = await ispInterface.getPackages(req.body);//change here

        if (ispPackages.status === 'OK') {
            return res.status(201).send({
                message: ispPackages.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispPackages.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}

const handleUpdateConnectionStatus = async (req, res) => {
    try {
        var isp = res.locals.middlewareResponse.isp;
        var updateData = await ispInterface.UpdateConnectionStatus(isp);
         if(updateData.status === 'ok'){
             res.send(updateData);
         }
         else {
             res.send({message: " Error(ispController) api/isp/updateconnectionstatus . Could Not Update ISP Connection Status"});
         }

    } catch (e) {
        return res.status(500).send({
            message: 'Catch Error(ispController) api/isp/updateconnectionstatus . Could Not Update ISP Connection Status',
            error: e.message
        });
    }
}



const handlefetchOwnPackage =async (req, res) => {

try{
    let Data=await packageInterface.findPackageByQuery({_id:req.body.package_id},true);
    if(Data.status === 'OK'){//find isp 
           let pkg=Data.data;
           return res.send(pkg);

    }
    else{
        return res.status(400).send({
            message:"Could not find package",
            error:Data.message
        })
    }
    
 } catch (e) {
    return res.status(500).send({
        message: 'ERROR in POST /api/isp/fetchOwnPackage',
        error: e.message
    });
   }

}


const handlebuyPackage = async (req, res) => {
       
    try{

        let Data = await ispInterface.findByIdAndUpdate({_id:req.body.id},{
            $set:{
                package_id:req.body.package_id
            }
        })

        if(Data.status === 'OK'){
            return res.send({
                message: "package_id "+Data.message
            })
        }
        else{
            return res.status(400).send({
                message:Data.message
            })
        }

    }catch(e){

        return res.status(500).send({
            message:"catch error(ispController) api/isp/buyPackage",
            error:e.messege
        })

    }


}



var handleIspLogOut= async (req,res) => {
    try {
         var isp = res.locals.middlewareResponse.isp;
         var token = res.locals.middlewareResponse.token;

        await ispInterface.findByIdAndUpdate(isp._id, {
            $pull: {
                tokens: {token}
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


var handleIspLogOutAll= async (req,res) => {
    try {
         var isp = res.locals.middlewareResponse.isp;
         var token = res.locals.middlewareResponse.token;
        isp.tokens=[];
        isp.save();
        return res.status(200).send("Sucessfully Logging out from all devices");
        

    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(ispController) api/isp/logoutAll ",
            error: e.message
        });
    }

}



const handlefetchOwnData = async(req,res) => {
     
try{
    let Data=await ispInterface.findIspByQuery({_id:req.body.id},true);
    //console.log(Data);
    if(Data.status === 'OK'){//find isp 
           let isp=Data.data;
           return res.send(isp);

    }
    else{
        return res.status(400).send({
            message:"Could not find package",
            error:Data.message
        })
    }
    
 } catch (e) {
    return res.status(500).send({
        message: 'ERROR in POST /api/isp/fetchOwnData',
        error: e.message
    });
   }


}





const handleIspRegister = async (req, res) => {
    try {
        
        //console.log(req.body);
        let ispData = await ispInterface.insertIsp(req.body);//change here

        if (ispData.status === 'OK') {
            return res.status(201).send({
                message: ispData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}

const getIspData =  async (req, res) => {
    try {
        
        //console.log(req.body);
        let ispData = await ispInterface.fetchIspData(req,res);//change here
        
        if (ispData.status === 'OK') {
            res.send(ispData);
            return res.status(201).send({
                message: ispData.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: ispData.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/Isp/insert',
            error: e.message
        });
    }
}





module.exports = {
    handleIspRegister,
    getIspData,
    handleIspInsertOne ,
    handlefetchIspPackages,
    handleUpdateConnectionStatus,
    handleIspLogOut,
    handleIspLogOutAll,
    handlefetchOwnPackage,
    handlebuyPackage,
    handlefetchOwnData
}