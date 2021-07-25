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


const findByIdAndUpdate = async (id, update)=>{

    try {
        let data = await Package.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'Package value Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Package value Update Failed',
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


module.exports = {
    insertPackage,
    findPackageByQuery,
    findByIdAndUpdate
}