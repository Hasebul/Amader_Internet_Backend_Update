const mongoose = require('mongoose');
const ObjectID = require('mongodb');

var ContractSchema = new mongoose.Schema({
    user_type : {
        type : Number,
        required : true
    },
    package_id : {
        type : ObjectID,
        required : true
    },
    isp_id : {
        type : ObjectID,
        default : null,
        required : true
    },
    user_id : {
        type : ObjectID,
        default : null
    },
    union_id : {
        type : Number,
        default : null,
        required : true
    },
    area_id : {
        type : ObjectID,
        default : null
    },
    start_date : {
        type : Date,
        default : new date()
    },
    duration : {
        type : Number,
        required : true,
        min : 1
    },
    current : {
        type : Boolean,
        required : true,
        default : false
    }

});


var Contract = mongoose.model('Contract', ContractSchema);

module.exports = {Contract};