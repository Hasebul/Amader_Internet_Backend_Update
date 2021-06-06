const mongoose = require('mongoose');


var DivisionSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    division_id : {
        type : Number,
        required : true
    }
})

var Division = mongoose.Model('Division', DivisionSchema);

module.exports = {Division}