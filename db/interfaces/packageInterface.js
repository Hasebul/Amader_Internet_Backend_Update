const {Package} = require('../model/Package');

const insertPackage = async (packageObject) => {
    try {
        console.log(packageObject);
        let packageData = new Package(packageObject);//problem
        console.log(packageData);
        let data = await packageData.save(); 
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



const fetchPackageData = async (req,res) => {
    try {
        let data = await Package.find({});

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



const findPackageByQuery = async (query, option) => {
    try {
      
        let data = await Package.find(query);
       
        if (data){
            return {
                data,
                message: 'Package Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Package Not Found',
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
    insertPackage,
    fetchPackageData,
    findPackageByQuery
}