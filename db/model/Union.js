const mongoose = require('mongoose');


var UnionSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    upazilla_id : {
        type : Number,
        required : true
    },
    union_id : {
        type : Number,
        required : true
    }
})

var Union = mongoose.Model('Union', UnionSchema);

module.exports = {Union}