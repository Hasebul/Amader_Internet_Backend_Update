const userInterface = require('../db/interfaces/userInterface');
const packageInterface = require('../db/interfaces/packageInterface');

const handleUserInsertOne = async (req, res) => {
    try {
        
       
        let Data = await userInterface.insertUser(req.body);

        if (Data.status === 'OK') {
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'ERROR(UserController) in api/user/insert / Could not Insert User',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch ERROR(ispController) in api/Isp/insert',
            error: e.message
        });
    }
}



var handleUserLogOut= async (req,res) => {
    try {
         var user = res.locals.middlewareResponse.user;
         var token = res.locals.middlewareResponse.token;

        await userInterface.findByIdAndUpdate(user._id, {
            $pull: {
                tokens: {token}
            }
        });

        return res.status(200).send("Sucessfully Logout");
        

    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(userController) api/user/logout ",
            error: e.message
        });
    }

}


var handleUserLogOutAll= async (req,res) => {
    try {
         var user = res.locals.middlewareResponse.user;
         var token = res.locals.middlewareResponse.token;
        user.tokens=[];
        user.save();
        return res.status(200).send("Sucessfully Logging out from all devices");
        

    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(userController) api/user/logoutAll ",
            error: e.message
        });
    }

}




const getUserData =  async (req, res) => {
    try {
        
        //console.log(req.body);
        let Data = await userInterface.fetchUserData(req,res);//change here
        
        if (Data.status === 'OK') {
            res.send(Data);
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not find User',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/user/fetch',
            error: e.message
        });
    }
}



const handlefetchOwnPackage =async (req, res) => {

    try{
        let Data=await packageInterface.findPackageByQuery({_id:req.body.package_id},true);
        if(Data.status === 'OK'){
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
    
            let Data = await userInterface.findByIdAndUpdate({_id:req.body.id},{
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
                message:"catch error(userController) api/user/buyPackage",
                error:e.messege
            })
    
        }
    
    
    }




module.exports = {
    handleUserInsertOne,
    handleUserLogOut,
    handleUserLogOutAll,
    getUserData,
    handlefetchOwnPackage,
    handlebuyPackage

}