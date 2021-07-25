const nttnInterface = require('../db/interfaces/nttnInterface');

const handleNttnInsertOne = async (req, res) => {
    try {
        
      
       
        let Data = await nttnInterface.insertNttn(req.body);
        
     

        if (Data.status === 'OK') {
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'ERROR(nttnController) in api/nttn/insert / Could not Insert Nttn',
                error:    Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch ERROR(nttnController) in api/nttn/insert',
            error: e.message
        });
    }
}


var handleNttnLogOut= async (req,res) => {
    try {
         var nttn = res.locals.middlewareResponse.nttn;
         var token = res.locals.middlewareResponse.token;

        await nttnInterface.findByIdAndUpdate(nttn._id, {
            $pull: {
                tokens: {token}
            }
        });

        return res.status(200).send("Sucessfully Logout");
        

    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(nttnController) api/nttn/logout ",
            error: e.message
        });
    }

}


var handleNttnLogOutAll= async (req,res) => {
    try {
         var nttn = res.locals.middlewareResponse.nttn;
         var token = res.locals.middlewareResponse.token;
        isp.tokens=[];
        isp.save();
        return res.status(200).send("Sucessfully Logging out from all devices");
        

    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(nttnController) api/nttn/logoutAll ",
            error: e.message
        });
    }

}



module.exports = {
    
    handleNttnInsertOne ,
    handleNttnLogOut,
    handleNttnLogOutAll,
}