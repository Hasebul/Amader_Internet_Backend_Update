const offerInterface = require('../db/interfaces/offerInterface');
const packageInterface = require('../db/interfaces/packageInterface');
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


 const handleOfferFetchByQuery= async (req, res) => {

    try{
        // console.log(req.body);

        //---checking wheather offer is expire it's expiration time then set offer status false

        updateOfferStatusByExpirationDate();


         var creator= req.body.creator;
         let offers = await offerInterface.findAllOfferByQuery ({creator: creator}, {username: 1, userType: 1});//can generate error
         //let Packages = Data.data;
         if (offers.status === 'OK') {
             //res.send(Packages);
             delete offers.status;
             delete offers.message;
             return res.status(200).send(offers) ;
             
         } else {
             return res.status(400).send({
                 message: 'Could not find offers',
                 error: offers.message
             });
         }
      } catch (e) {
         return res.status(500).send({
             message: 'ERROR in POST /api/offer/fetchbyquery',
             error: e.message
         });
      }
     


 }





//helper function 


var updateOfferStatusByExpirationDate= async() => {
     try{

        //find all packages 
        var Data = await offerInterface.findAllOfferByQuery({expirationTime:{$lt: new Date()}},{username:1});
        console.log(Data);
        var offers = Data.data;
       // console.log(offers)
        for( var i in offers){
            var off  = offers[i];
            await offerInterface.findByIdAndUpdate({_id:off._id},{ 
                $set:{
                    status:false,
                }})
            //find package whose offer id is this false offer id     
            var pkgData = await packageInterface.findPackageByQuery({offerId:off._id.toString()},{username: 1});
            var pkgs = pkgData.data;
            for(var k in pkgs){
                var pkg = pkgs[k];
                await packageInterface.findByIdAndUpdate({_id:pkg._id},{
                    $set:{
                        offerId:"-1"
                    }
                })
            }


        }
        // var update = await offerInterface.findByQueryAndUpdateAllMatch({expirationTime:{$lt: new Date()}},{ 
        //     $set:{
        //         status:"false"
        //     }
        // });




     }catch(e){
         console.log("catch porblem inside updateOfferStatusByExpirationDate() ");
     }


}





module.exports = {
    getOfferData,
    handleOfferInsertOne ,
    handleFetchById,
    handleOfferFetchByQuery,
}