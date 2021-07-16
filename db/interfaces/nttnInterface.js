const { ObjectID } = require('mongodb');
const {NTTN} = require('../model/NTTN');

const insertNttn = async (userObject) => {
    try {
       
        
        let Data = new  NTTN(userObject);
        
        let data = await Data.save(); 
        

        if (data.nInserted === 0){
            return {
                message: 'NTTN Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'NTTN Insertion Successful',
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



const fetchNttnData = async (req,res) => {
    try {
        let data = await NTTN.find({});

        if (data){
            return {
                data,
                message: 'NTTN Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'NTTN Not Found',
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





const findNttnByQuery = async (query, option) => {
    try {
      

        let data = await NTTN.findOne(query);
       
        if (data){
            return {
                data,
                message: 'NTTN Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'NTTN Not Found',
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
        let data = await NTTN.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'NTTN Token Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'NTTN Token Update Failed',
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
    insertNttn,
    fetchNttnData,
    findNttnByQuery,
    findByIdAndUpdate
}