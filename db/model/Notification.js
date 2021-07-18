const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');

var NotificationSchema = new mongoose.Schema({
    
    
    senderId:{
        type:String,
        required:true,
    },
    
    receiverID:{
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
    subject:{ 
        type:String, 
        trim: true, 
        required:true
    },
    
    details: {
        type : String,
        trim : true,
        minlength : 5,
        required : true
    },
    seenStatus : {
        type : Boolean,
        default : false
    },
    notificationArrivalTime : {
        type : Date,
        default :getToday()
    },
    category:{
        type:String, 
        defult:"empty"
    }
});


function getToday() {
    let today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today;
}

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = {Notification};