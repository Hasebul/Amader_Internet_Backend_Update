const { ObjectID } = require('mongodb');
const {Offer} = require('../model/Offer');

const insertOffer = async (userObject) => {
    try {
       
        let Data = new Offer(userObject);
        let data = await Data.save(); 
        
        if (data.nInserted === 0){
            return {
                message: 'Offer Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'Offer Insertion Successful',
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



const fetchOfferData = async (req,res) => {
    try {
        let data = await Offer.find({});

        if (data){
            return {
                data,
                message: 'Offer Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Offer Not Found',
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



const findOfferByQuery = async (query, option) => {
    try {
      

        let data = await Offer.findOne(query);
       
        if (data){
            return {
                data,
                message: 'Offer Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Offer Not Found',
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
        let data = await Offer.findByIdAndUpdate(id, update);

        if (data){
            return {
                data,
                message: 'Offer Token Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'Offer Token Update Failed',
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
    insertOffer,
    fetchOfferData,
    findOfferByQuery,
    findByIdAndUpdate,
    
}