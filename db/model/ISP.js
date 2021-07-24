const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const ObjectId = mongoose.Types.ObjectId;

var ISPSchema = new mongoose.Schema({
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


 

    license_id : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    establishmentTime: {
        type: Date,
        default: null
    },
    connection_status : {
        type : Boolean,
        default : false
    },
    remaining_bandwidth : {
        type : Number,
        default : 0,
    },

   
    
    expirationTime:{
        type:Date,
        default:null
    },


    balance:{
        type:Number,
        default:0
    },

    region:{
        type:String,
        required: true
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

ISPSchema.pre('save', function(next) {
    var isp = this;

    if(isp.isModified('password')){
        bcrypt.genSalt(10,  (err, salt) => {
            bcrypt.hash(isp.password, salt, (err, hash) => {
                isp.password = hash;
                //console.log("problem");
                next();
            })
        })
        
    } else {
        next();
    }
})
var ISP = mongoose.model('ISP', ISPSchema);


module.exports = {ISP};