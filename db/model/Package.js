const mongoose = require('mongoose');


var PackageSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    package_type : {
        type : Number,// 0- ISP package, 1 -User package
        required : true
    },
    bandwidth : {
        type : Number,
        required : true
    },
    up_speed : {
        type : Number,
        required : true
    },
    down_speed : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    ongoing : {
        type : Boolean,
        required : true,
        default : true
    }
})

var Package = mongoose.model('Package', PackageSchema);

module.exports = {Package}