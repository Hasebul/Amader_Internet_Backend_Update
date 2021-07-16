const mongoose = require('mongoose');


var OfferSchema  = new mongoose.Schema({

    Id:{
        type:Number,
        default:0
    },
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