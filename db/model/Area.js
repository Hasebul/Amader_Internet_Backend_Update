const mongoose = require('mongoose');


var AreaSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    union_id : {
        type : Number,
        required : true
    }
})

var Area = mongoose.Model('Area', AreaSchema);

module.exports = {Area}