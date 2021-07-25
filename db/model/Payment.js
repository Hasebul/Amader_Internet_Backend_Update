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

    packageName:{
        type: String,
        required:true
    },

    isp_id : {
        type : {ObjectID},
        default : null
    },

    user_id : {
        type : {ObjectID},
        default : null
    },

    senderName:{
        type:String,
        required:true
    },
  
    payment_time : {
        type : Date,
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

    packageDuration:{ 
        type:Number,
        default:null
    },
    
});


var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = {Payment};