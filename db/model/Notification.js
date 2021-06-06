const mongoose = require('mongoose');
const ObjectID = require('mongodb');
const moment = require('moment');

var NotificationSchema = new mongoose.Schema({
    request_type : {
        type : Number, // 0- ISP, 1- user, 2 - NTTN
        required : true
    },
    isp_id : {
        type : {ObjectID},
        default : null
    },
    user_id : {
        type : {ObjectID},
        default : null
    },
    details: {
        type : String,
        trim : true,
        minlength : 1,
        required : true
    },
    seen_status : {
        type : Boolean,
        default : false
    },
    notification_arrival_time : {
        type : Date,
        default : new Date()
    }
});

var Notification = mongoose.model('Notification', NotificationSchema);

module.exports = {Notification};