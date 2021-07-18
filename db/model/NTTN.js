const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');



var NTTNSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    tokens : [{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]

})

NTTNSchema.pre('save', function(next) {
    var nttn = this;

    if(nttn.isModified('password')){
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(nttn.password, salt, (err, hash) => {
                nttn.password = hash;
                next();
            })
        })
        
    } else {
        next();
    }
})
var NTTN = mongoose.model('NTTN', NTTNSchema);


module.exports = {NTTN};