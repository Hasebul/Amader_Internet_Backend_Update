const mongoose = require('mongoose');
const ObjectID = require('mongodb');
const moment = require('moment');

var PendingSchema = new mongoose.Schema({
    request_type : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    license_id : {
        type : String,
        default : null,
        minlength : 6,
        trim : true
    },
    nid : {
        type : String,
        default : null,
        minlength : 6,
        trim : true
    },
    area_id : {
        type : {ObjectID},
        default : null
    },
    union_id : {
        type : Number,
        default : null
    },
    package_id : {
        type : {ObjectID},
        required : true
    },
    status : {
        type : Boolean,
        default : false
    },
    request_arrival_time : {
        type : Date,
        default : new Date()
    },
    request_accept_time : {
        type : Date,
        default : null
    }
});

var Pending = mongoose.model('Pending', PendingSchema);

module.exports = {Pending};