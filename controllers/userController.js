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



var handleUserLogOut = async (req, res) => {
    try {
        var user = res.locals.middlewareResponse.user;
        var token = res.locals.middlewareResponse.token;

        await userInterface.findByIdAndUpdate(user._id, {
            $pull: {
                tokens: { token }
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



var handleUserLogOutAll = async (req, res) => {
    try {
        var user = res.locals.middlewareResponse.user;
        var token = res.locals.middlewareResponse.token;
        user.tokens = [];
        user.save();
        return res.status(200).send("Sucessfully Logging out from all devices");


    } catch (e) {
        return res.status(500).send({
            message: "Catch ERROR(userController) api/user/logoutAll ",
            error: e.message
        });
    }

}



const handlefetchOwnPackagesArray = async (req, res) => {


    try {

        let user = await userInterface.findUserByQuery({ _id: req.body.id }, "done");
        user = user.data;
        let packages = [];
        for (let t in user.packages) {
            let pkg = user.packages[t];
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



const handlefetchOwnData = async (req, res) => {

    try {
        let Data = await userInterface.findUserByQuery({ _id: req.body.id }, true);
        //console.log(Data);
        if (Data.status === 'OK') {//find isp 
            let user = Data.data;
            return res.send(user);

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


module.exports = {
    handleUserInsertOne,
    handleUserLogOut,
    handleUserLogOutAll,
    handlefetchOwnData,
    handlefetchOwnPackagesArray
}