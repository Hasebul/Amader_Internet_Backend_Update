const {Notification}= require('../model/Notification');

const insertData = async (Object) => {
    try {
       // console.log(Object);
        let Data = new Notification(Object);//problem
      //  console.log(Data);
        let data = await Data.save(); 
       // console.log(data);
        
        if (data.nInserted === 0){
            return {
                message: 'Notifications Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'Notification Insertion Successful',
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



const fetchData = async (req,res) => {
    try {
        let data = await Notification.find({});

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




const findNotificationByQuery = async (query) => {
    try {
      
        let data = await Notification.find(query);
       
        if (data){
            return {
                data,
                message: 'Notification Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Notification Not Found',
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
        let data = await Notification.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'NOtification value Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Notifications value Update Failed',
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





const findByQueryAndDeleteAllMatched = async (query)=>{
    //deleteMany({ name: /Stark/, age: { $gte: 18 } });
    try {
        let data = await Notification.deleteMany(query);

        if (data){
            return {
                data,
                message: 'NOtification deleted',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Notifications deletion Failed',
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
    fetchData,
    findNotificationByQuery,
    findByIdAndUpdate,
    findByQueryAndDeleteAllMatched
}