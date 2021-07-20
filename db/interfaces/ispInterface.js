const { ObjectID } = require('mongodb');
const {ISP} = require('../model/ISP');

const insertIsp = async (userObject) => {
    try {
       
        let ispData = new ISP(userObject);
        let data = await ispData.save(); 
        
        if (data.nInserted === 0){
            return {
                message: 'ISP Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'ISP Insertion Successful',
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
                message: 'ISP Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'ISP Not Found',
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


const getPackages= async ( preferences) => { // this is not needed any more 
    try {
    
    console.log( preferences );
  
    // this method need to update here we take a preferences and 
    //fetch this package by query and send it to correspond response


    
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




const findIspByQuery = async (query, option) => {
    try {
      

        let data = await ISP.findOne(query);
       
        if (data){
            return {
                data,
                message: 'ISP Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'ISP Not Found',
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



const findAllIspByQuery = async (query, option) => {
    try {
      

        let data = await ISP.find(query);
       
        if (data){
            return {
                data,
                message: 'ISP Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'ISP Not Found',
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



const UpdateConnectionStatus = async (isp) => {
    try {
        const data = await ISP.updateOne({ name: isp.name }, { connection_status: 'true' , connection_establishment_time:new Date()});
         
        if (data.ok > 0){
            return {
                data,
                message: 'ISP Found . Value update',
                status: 'ok'
            }
        } else {
            return {
                message: 'Value not  Updated',
                status: 'ERROR'
            };
        }

    } catch (e) {
        return {
            message: e.message,
            status: 'ERROR'
        };
    }
};


const findByIdAndUpdate = async (id, update)=>{

    try {
        let data = await ISP.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: ' Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: ' Update Failed',
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


}








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
    UpdateConnectionStatus,
    fetchIspData,
    getPackages,
    findIspByQuery,
    findByIdAndUpdate,
    findAllIspByQuery 
    //deleteUser,
    //findUserByQuery,
    //findUserByIDAndUpdate
}