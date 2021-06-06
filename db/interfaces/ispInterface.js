const {ISP} = require('../model/ISP');

const insertIsp = async (userObject) => {
    try {
        // let ispList = await Isp.find();

        // for (const isp of ispList) {
        //     if (isp.id === userObject.id) {
        //         return {
        //             message: 'Id already exists please give new one',
        //             status: "ERROR"
        //         }
        //     }

        //     if (isp.Email === userObject.Email) {
        //         return {
        //             message: 'Email Already Exists',
        //             status: "ERROR"
        //         }
        //     }
        // }
        console.log(ISP);
        console.log(userObject);
        let ispData = new ISP(userObject);//problem
        console.log(ispData);
        let data = await ispData.save(); 
        console.log(data);
        
        if (data.nInserted === 0){
            return {
                message: 'User Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'User Insertion Successful',
                status: "OK"
            };
        }
    } catch (e) {
        return {
            message: e.message,
            status: "ERROR"
        };
    }
};



const fetchIspData = async (req,res) => {
    try {
        let data = await ISP.find({});

        if (data){
            return {
                data,
                message: 'User Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'User Not Found',
                status: 'ERROR'
            };
        }

    } catch (e) {
        return {
            data: null,
            message: e.message,
            status: 'ERROR'
        };
    }
};


const getPackages= async ( preferences) => { //preferences 
    try {
    //console.log(ISP);
    console.log( preferences );
    // let ispData = new ISP(userObject);//problem
    //console.log(ispData);
    //let data = await ispData.save(); 
    //console.log(data);
    
    //finding data base on preferences
    //st1 . fetch data from packages 
    //st2 . find on the criteria 
    //send the data 


    
    if (preferences.taka === 0){
        return {
            message: 'User Insertion Failed',
            status: "ERROR"
        }
    } else {
        return {
            message: 'User Insertion Successful',
            status: "OK"
        };
    }
    } catch (e) {
    return {
        message: e.message,
        status: "ERROR"
    };
    }
};





// const deleteUser = async (username) => {
//     try {
//         let data = await User.findOneAndDelete({ username });

//         if (data){
//             return {
//                 message: 'User Deletion Successful',
//                 status: 'OK'
//             }
//         } else {
//             return {
//                 message: 'User Deletion Failed',
//                 status: 'ERROR'
//             };
//         }
//     } catch (e) {
//         return {
//             message: e.message,
//             status: 'ERROR'
//         };
//     }
// };


// const findUserByQuery = async (query, option) => {
//     try {
//         let data = await User.findOne(query, option);

//         if (data){
//             return {
//                 data,
//                 message: 'User Found',
//                 status: 'OK'
//             }
//         } else {
//             return {
//                 data: null,
//                 message: 'User Not Found',
//                 status: 'ERROR'
//             };
//         }

//     } catch (e) {
//         return {
//             data: null,
//             message: e.message,
//             status: 'ERROR'
//         };
//     }
// };

// const findUserByIDAndUpdate = async (id, update) => {
//     try {
//         let data = await User.findByIdAndUpdate(id, update);

//         if (data){
//             return {
//                 data,
//                 message: 'User Update Successful',
//                 status: 'OK'
//             }
//         } else {
//             return {
//                 data: null,
//                 message: 'User Update Failed',
//                 status: 'ERROR'
//             };
//         }

//     } catch (e) {
//         return {
//             data: null,
//             message: e.message,
//             status: 'ERROR'
//         };
//     }
// };

module.exports = {
    insertIsp,
    fetchIspData,
    getPackages
    //deleteUser,
    //findUserByQuery,
    //findUserByIDAndUpdate
}