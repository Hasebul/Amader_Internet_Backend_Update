const mongoose = require('mongoose');
const ObjectID = require('mongodb');

var PaymentSchema = new mongoose.Schema({
    user_type : {
        type : Number,
        required : true
    },
    package_id : {
        type : {ObjectID},
        required : true
    },
    isp_id : {
        type : {ObjectID},
        default : null,
        required : true
    },
    user_id : {
        type : {ObjectID},
        default : null
    },
    // union_id : {
    //     type : Number,
    //     default : null,
    //     required : true
    // },
    // area_id : {
    //     type : {ObjectID},
    //     default : null
    // },
    payment_status : { //eta dorkar nai 
        type : Boolean,
        default : false,
        required : true
    },
    payment_time : {
        type : Date,
        required : true,
        default:new Date()
    },
    gateway : {
        type : String,
        required : true
    },
    transaction_id : {
        type : String,
        required : true
    },
    amount:{
        type:Number,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    paymentDuration:{   //eta dorkar nai 
        type:Number,
        required:true
    },

    expirationDate:{  //eta dorkar nai 
        type:Date,
        required:true
    }
   

});


var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = {Payment};