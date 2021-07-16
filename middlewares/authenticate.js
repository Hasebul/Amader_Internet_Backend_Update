const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ispInterface = require('../db/interfaces/ispInterface');
const nttnInterface = require('../db/interfaces/nttnInterface');
const userInterface = require('../db/interfaces/userInterface');

let handleIspLogIn = async (req, res) => {
    try {
       // console.log(req.body);
        let body = req.body;
        let ispIdentification = body.name;
        let password = body.password;
        let ispDataByIspName = await ispInterface.findIspByQuery({name: ispIdentification}, {});
        //let userDataByUserEmail = await userInterface.findUserByQuery({userEmail: userIdentification}, {})
        let isp = ispDataByIspName.data;
       // console.log(isp);

        if (!isp) {
            return res.status(203).send({
                message: "User does not exist"
            });
        }

        let matched = await bcrypt.compare(password, isp.password);
        
        if (matched) {
            console.log(matched);
            let access = 'auth';
            let token = await jwt.sign({
                _id: isp._id.toString(),
                access
            }, 'IAMSHAWON').toString();
            //console.log(token);
            //console.log(access);
            const t=isp.tokens.push({access, token});//no method here
           // console.log(t);
            //console.log("problem here ");
            await isp.save();
            return res.status(201).send({isp,token});
        } else {
            return res.status(203).send({
                message: "Incorrect password"
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: "ERROR in POST /api/isp/login",
            error: e.message
        });
    }
};


let handleIspAuthentication = async (req, res, next) => {
    try {
        
       // let token = req.header('Authorization').replace('Bearer','');
        let token = req.body.token;
        let decodedData = await jwt.verify(token, 'IAMSHAWON');
        let Data = await ispInterface.findIspByQuery({_id: decodedData._id}, {username: 1, userType: 1});//can generate error
        let isp = Data.data;

        if (isp) {
            res.locals.middlewareResponse = {
                isp,
                token
            };
            return next();
        } else {
            return res.status(401).send({
                message: 'Error(authenticate) api/isp/updateconnectionstatus . Could Not Authorized'
            })
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch Error(authenticate) api/isp/updateconnectionstatus . Could Not Authorized',
            error: e.message
        })
    }
};




let handleNttnLogIn = async (req, res) => {
    try {
       // console.log(req.body);
        let body = req.body;
        let nttnIdentification = body.name;
        let password = body.password;
        let nttnDataBynttnName = await nttnInterface.findNttnByQuery({name: nttnIdentification}, {});
        //let userDataByUserEmail = await userInterface.findUserByQuery({userEmail: userIdentification}, {})
        let nttn = nttnDataBynttnName.data;
       // console.log(isp);

        if (!nttn) {
            return res.status(203).send({
                message: "Nttn does not exist"
            });
        }

        let matched = await bcrypt.compare(password, nttn.password);
        
        if (matched) {
            console.log(matched);
            let access = 'auth';
            let token = await jwt.sign({
                _id: nttn._id.toString(),
                access
            }, 'IAMSHAWON').toString();
            //console.log(token);
            //console.log(access);
            const t=nttn.tokens.push({access, token});//no method here
           // console.log(t);
            //console.log("problem here ");
            await nttn.save();
            return res.status(201).send({nttn,token});
        } else {
            return res.status(203).send({
                message: "Incorrect password"
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: "ERROR in POST /api/nttn/login",
            error: e.message
        });
    }
};




let handleNttnAuthentication = async (req, res, next) => {
    try {
        
       // let token = req.header('Authorization').replace('Bearer','');
        let token = req.body.token;
        let decodedData = await jwt.verify(token, 'IAMSHAWON');

        let Data = await nttnInterface.findNttnByQuery ({_id: decodedData._id}, {username: 1, userType: 1});//can generate error
        let nttn = Data.data;

        if (nttn) {
            res.locals.middlewareResponse = {
                nttn,
                token
            };
            return next();
        } else {
            return res.status(401).send({
                message: 'Error(authenticate) api/nttn/updatestatus . Could Not Authorized'
            })
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch Error(authenticate) api/nttn/updatestatus . Could Not Authorized',
            error: e.message
        })
    }
};





let handleUserLogIn = async (req, res) => {
    try {
       // console.log(req.body);
        let body = req.body;
        let userIdentification = body.name;
        let password = body.password;
        let userDataByuserName = await userInterface.findUserByQuery({name: userIdentification}, {});
        //let userDataByUserEmail = await userInterface.findUserByQuery({userEmail: userIdentification}, {})
        let user = userDataByuserName.data;
       // console.log(isp);

        if (!user) {
            return res.status(203).send({
                message: "user does not exist"
            });
        }

        let matched = await bcrypt.compare(password, user.password);
        
        if (matched) {
            console.log(matched);
            let access = 'auth';
            let token = await jwt.sign({
                _id: user._id.toString(),
                access
            }, 'IAMSHAWON').toString();
            //console.log(token);
            //console.log(access);
            const t=user.tokens.push({access, token});//no method here
           // console.log(t);
            //console.log("problem here ");
            await user.save();
            return res.status(201).send({user,token});
        } else {
            return res.status(203).send({
                message: "Incorrect password"
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: "ERROR in(authentication) POST /api/user/login",
            error: e.message
        });
    }
};




let handleUserAuthentication = async (req, res, next) => {
    try {
        
       // let token = req.header('Authorization').replace('Bearer','');
        let token = req.body.token;
        let decodedData = await jwt.verify(token, 'IAMSHAWON');

        let Data = await userInterface.findUserByQuery ({_id: decodedData._id}, {username: 1, userType: 1});//can generate error
        let user = Data.data;

        if (user) {
            res.locals.middlewareResponse = {
                user,
                token
            };
            return next();
        } else {
            return res.status(401).send({
                message: 'Error(authenticate) api/user/updatestatus . Could Not Authorized'
            })
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch Error(authenticate) api/user/updatestatus . Could Not Authorized',
            error: e.message
        })
    }
};









let handlePOSTLogIn = async (req, res) => {
    try {

        let body = req.body;
        let userIdentification = body.username;
        let password = body.password;
        let userDataByUserName = await userInterface.findUserByQuery({username: userIdentification}, {});
        let userDataByUserEmail = await userInterface.findUserByQuery({userEmail: userIdentification}, {})

        let user = userDataByUserEmail.status === 'OK' ? userDataByUserEmail.data : userDataByUserName.data;

        if (!user) {
            return res.status(401).send({
                message: "User does not exist"
            });
        }

        let matched = await bcrypt.compare(password, user.password);

        if (matched) {
            let access = 'auth';
            let token = await jwt.sign({
                _id: user._id.toString(),
                access
            }, 'lekhaporaputkirmoddhebhoiradimu').toString();
            user.tokens.push({access, token});
            await user.save();
            return res.status(201).send({token});
        } else {
            return res.status(401).send({
                message: "Incorrect password"
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: "ERROR in POST /api/login",
            error: e.message
        });
    }
};

let handleAuthentication = async (req, res, next) => {
    try {
        let token = req.header('x-auth');
        let decodedUser = await jwt.verify(token, 'IAMSHAWON');
        let userData = await userInterface.findUserByQuery({_id: decodedUser._id}, {username: 1, userType: 1});
        let user = userData.data;

        if (user) {
            res.locals.middlewareResponse = {
                user,
                token
            };
            return next();
        } else {
            return res.status(401).send({
                message: 'Not Authorized'
            })
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Could not Authorize',
            error: e.message
        })
    }
};

let handleAdminAuthentication = async (req, res, next) => {
    try {
        let token = req.header('x-auth');
        let decodedUser = await jwt.verify(token, 'lekhaporaputkirmoddhebhoiradimu');
        let userData = await userInterface.findUserByQuery({_id: decodedUser._id}, {username: 1, userType: 1});
        let user = userData.data;

        if (user && user.userType === 'ADMIN') {
            res.locals.middlewareResponse = {
                user,
                token
            };
            return next();
        } else {
            return res.status(401).send({
                message: 'Not Authorized'
            })
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Could not Authorize',
            error: e.message
        })
    }
}

let handlePOSTLogOut = async (req, res) => {
    try {
        let user = res.locals.middlewareResponse.user;
        let token = res.locals.middlewareResponse.token;

        await userInterface.findUserByIDAndUpdate(user._id, {
            $pull: {
                tokens: {token}
            }
        });

        return res.status(200).send({
            message: "Successfully Logged Out"
        });
    } catch (e) {
        return res.status(500).send({
            message: "ERROR in POST /api/logout",
            error: e.message
        });
    }
};

module.exports = {
    handleIspLogIn,
    handleIspAuthentication,
    handleNttnLogIn,
    handleNttnAuthentication,
    handleUserLogIn,
    handleUserAuthentication,
    
    handlePOSTLogIn,
    handleAuthentication,
    handleAdminAuthentication,
    handlePOSTLogOut
}