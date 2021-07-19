const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId;


var UserSchema  = new mongoose.Schema({
    name : {
        required : true,
        type : String,
        minlength : 1,
        trim : true,
    },
    password : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    package_id : {
        type : String,
        required : true,
        default:"empty"
    },
    nid : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    
    ispId:{ // id menas isp name here ok 
        type:String,
        required:true,
        trim:true,
        minLength:1
    },

    connection_establishment_date: {
        type: Date,
        default: new Date()
    },
    connection_status : {
        type : Boolean,
        default : false
    },
    
    balance:{
        type:Number,
        default:0
    },

   
    isWarnForPayment:{
        type: Boolean,
        default:false
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


UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
        
    } else {
        next();
    }
})
var User = mongoose.model('User', UserSchema);


module.exports = {User};