var env = process.env.NODE_ENV || "development";

if(env === "development"){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb+srv://SCRAM:SCRAM@cluster0.rcpbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
} 

//mongodb+srv://SCRAM:SCRAM@cluster0.rcpbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//mongodb://127.0.0.1:27017/EasyInternetService