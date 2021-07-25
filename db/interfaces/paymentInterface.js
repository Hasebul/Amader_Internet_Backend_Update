const {Payment}= require('../model/Payment');

const insertData = async (Object) => {
    try {
        let Data = new Payment(Object);//problem
        let data = await Data.save(); 
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


const findAllPaymentByQuery = async (query) => {
    try {
      

        let data = await Payment.find(query);
       
        if (data){
            return {
                data,
                message: 'ISP Found',
                status: 'OK', 
                length: data.length
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



const findByIdAndUpdate = async (id, update)=>{

    try {
        let data = await Payment.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'Payment status Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Payment status Update Failed',
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
    insertData,
    findAllPaymentByQuery,
    findByIdAndUpdate
}