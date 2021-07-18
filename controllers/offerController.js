const offerInterface = require('../db/interfaces/offerInterface');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const handleOfferInsertOne = async (req, res) => {
    try {
        
        let Data = await offerInterface.insertOffer(req.body);


        if (Data.status === 'OK') {
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'ERROR(OfferController) in api/Offer/insert / Could not Insert Isp',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'Catch ERROR(OfferController) in api/Offer/insert',
            error: e.message
        });
    }
}



const getOfferData =  async (req, res) => {
    try {
        
        //console.log(req.body);
        let Data = await offerInterface.fetchOfferData(req,res);//change here
        
        if (Data.status === 'OK') {
           // res.send(Data);
          //  console.log(Data);
            return res.status(201).send({
                 Data
            });
        } else {
            return res.status(400).send({
                message: 'Could not find offer',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/offer/fetch',
            error: e.message
        });
    }
}

 const handleFetchById = async (req, res) => {
   
    
try{
    // console.log(req.body);
     var id= ObjectId(req.body.id); // convert into object id 
     let offer = await offerInterface.findOfferByQuery ({_id : id}, {username: 1, userType: 1});//can generate error
     //let Packages = Data.data;
     if (offer.status === 'OK') {
         //res.send(Packages);
         delete offer.status;
         delete offer.message;
         return res.send(offer) ;
         
     } else {
         return res.status(400).send({
             message: 'Could not find offer',
             error: offer.message
         });
     }
  } catch (e) {
     return res.status(500).send({
         message: 'ERROR in POST /api/offer/fetchbyquery',
         error: e.message
     });
  }
 


 }

module.exports = {
    getOfferData,
    handleOfferInsertOne ,
    handleFetchById,
}