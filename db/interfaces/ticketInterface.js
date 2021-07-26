const {Ticket}= require('../model/Ticket');

const insertData = async (Object) => {
    try {
        let Data = new Ticket(Object);
        let data = await Data.save(); 
        if (data.nInserted === 0){
            return {
                message: 'Ticket Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'Ticket Insertion Successful',
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


const findByQuery = async (query) => {
    try {
      
        let data = await Ticket.find(query);
       
        if (data){
            return {
                data,
                message: 'Ticket Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Ticket Not Found',
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
        let data = await Ticket.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'Ticket value Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Ticket value Update Failed',
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
        let data = await Ticket.deleteMany(query);

        if (data){
            return {
                data,
                message: 'Ticket deleted',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Ticket deletion Failed',
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
    findByQuery,
    findByIdAndUpdate,
    findByQueryAndDeleteAllMatched
}