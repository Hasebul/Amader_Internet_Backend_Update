var mongoose = require('mongoose');

// Just one time
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify : false
}).then( () => {
    console.log("database are connected")
});

mongoose.exports = {mongoose};