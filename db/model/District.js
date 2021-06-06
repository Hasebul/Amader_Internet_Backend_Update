const mongoose = require('mongoose');


var DistrictSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    division_id : {
        type : Number,
        required : true
    },
    district_id : {
        type : Number,
        required : true
    }
})

var District = mongoose.Model('District', DistrictSchema);

module.exports = {District}