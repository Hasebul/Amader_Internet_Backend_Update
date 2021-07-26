const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');


var TicketSchema = new mongoose.Schema({
    
    senderId:{
        type:String,
        required:true,
    },
    
    receiverId:{
        type:String,
        required:true
    },

    senderType:{
        type:Number, // 1->Nttn , 2->Isp , 3->User
        required:true
    },

    receiverType:{
        type:Number, // 1->Nttn , 2->Isp , 3->User
        required:true
    },
   
    category:{
        type:String, 
        defult:null
    },

    details: {
        type : String,
        required : true
    },
    seenStatus: {
        type : Boolean,
        default : false,
        required:true
    },
    
    resolveStatus:{
        type:Boolean,
        default:false,
        required:true
    },

    arrivalTime : {
        type : Date,
        required:true,
        default:new Date()
    },

});


var Ticket = mongoose.model('tickets', TicketSchema);

module.exports = {Ticket};