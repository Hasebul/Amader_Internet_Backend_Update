const offerInterface = require('../db/interfaces/offerInterface');

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
            res.send(Data);
            return res.status(201).send({
                message: Data.message
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





module.exports = {
    getOfferData,
    handleOfferInsertOne ,
}