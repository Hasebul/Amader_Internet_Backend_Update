const userInterface = require('../db/interfaces/userInterface');

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





module.exports = {
    handleUserInsertOne,
    handleUserLogOut,
    handleUserLogOutAll,
    getUserData

}