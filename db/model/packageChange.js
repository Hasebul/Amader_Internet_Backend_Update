const mongoose = require('mongoose');


var PackageChangeSchema = new mongoose.Schema({
    
    currentPackageName:{
        type: String,
        required:true
    },
    changedPackageName:{
        type:string,
        required:true
    },

    activationType : {
        type:Number,
        required:true
    },
    isAccept:{
        type:Boolean,
        default:false
    },
    isSeen:{
        type:Boolean,
        default:false
    },
    arrivalTime:{
        type:Date,
        required:true
    }

})

var PackageChange = mongoose.model('Package-Chagne', PackageChangeSchema);

module.exports = {PackageChange}