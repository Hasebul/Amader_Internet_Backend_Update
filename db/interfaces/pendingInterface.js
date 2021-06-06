const {Pending} = require('../model/Pending');

const insertPendingData = async (Object) => {
    try {
        console.log(Object);
        let pendingData = new Pending(Object);//problem
        console.log(pendingData);
        let data = await pendingData.save(); 
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



const fetchPendingData = async (req,res) => {
    try {
        let data = await Pending.find({});

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


module.exports = {
    insertPendingData,
    fetchPendingData
}