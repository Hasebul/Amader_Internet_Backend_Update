const mongoose = require('mongoose');


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
    nid : {
        type : String,
        minlength : 6,
        required : true,
        trim : true
    },
    connection_establishment_date: {
        type: Date,
        default: new Date()
    },
    connection_status : {
        type : Boolean,
        default : false
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