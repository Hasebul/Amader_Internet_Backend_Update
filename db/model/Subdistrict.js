const mongoose = require('mongoose');


var SubDistrictSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    district_id : {
        type : Number,
        required : true
    },
    upazilla_id : {
        type : Number,
        required : true
    }
})

var SubDistrict = mongoose.Model('SubDistrict', SubDistrictSchema);

module.exports = {SubDistrict}