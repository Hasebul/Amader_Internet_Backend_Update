const mongoose = require('mongoose');


var OfferSchema  = new mongoose.Schema({

   
    name:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required:true
    },

    startTime:{
        type:Date,
        required:true,
        default:new Date()
    },
    expirationTime:{
        type:Date,
        required:true,
    },
    duration:{
        type:Number,
        required:true
    },

    reducePrice:{
        type:Number,
        required:true
    }
})



var Offer = mongoose.model('offers', OfferSchema);


module.exports = {Offer};