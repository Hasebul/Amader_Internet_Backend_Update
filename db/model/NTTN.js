const mongoose = require('mongoose');

var NTTNSchema = new mongoose.Schema({
    username : {
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