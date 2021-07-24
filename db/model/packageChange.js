const mongoose = require('mongoose');
const ObjectID = require('mongodb');


var PackageChangeSchema = new mongoose.Schema({
    
    currentPackageId:{
        type: {ObjectID},
        required:true
    },
    changedPackageId:{
        type:{ObjectID},
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

var PackageChange = mongoose.model('Package-Change', PackageChangeSchema);

module.exports = {PackageChange}