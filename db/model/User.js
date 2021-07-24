const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId;


var UserSchema  = new mongoose.Schema({
    name: {
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
        default:null
    },
    
    packages: [{
        packageId: {
            type : String,
            required : true
        },
        initiationTime : {
            type : Date,
            default:new Date()
        },
        terminationTime :{
            type:Date,
            default:null
        }
    }],






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

    establishmentTime: {
        type: Date,
        default: null
    },
    connection_status : {
        type : Boolean,
        default : false
    },
    
    balance:{
        type:Number,
        default:0
    },

   
   
    expirationTime:{
        type:Date,
        default:null
    },

    union:{
        type:String,
        required:true
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