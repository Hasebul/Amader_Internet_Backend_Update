const { ObjectID } = require('mongodb');
const {User} = require('../model/User');

const insertUser = async (userObject) => {
    try {
       
        let Data = new User(userObject);
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



const fetchUserData = async (req,res) => {
    try {
        let data = await User.find({});

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




const findUserByQuery = async (query, option) => {
    try {
      

        let data = await User.findOne(query);
       
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





const findByIdAndUpdate = async (id, update)=>{

    try {
        let data = await User.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'User Token Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'User Token Update Failed',
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
    insertUser,
    fetchUserData,
    findUserByQuery,
    findByIdAndUpdate,
   
}