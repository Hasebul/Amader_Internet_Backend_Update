const notificationInterface = require('../db/interfaces/notificationInterface');

const handleNotificationInsertOne = async (req, res) => {
    try {
        
       // console.log("inside  handleNotificationInsertOne");


        // write code for make notification data 


        let Data = await notificationInterface.insertData(req.body);//change here

        if (Data.status === 'OK') {
            return res.status(201).send({
                message: Data.message
            });
        } else {
            return res.status(400).send({
                message: 'Could not Insert Notifications',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'catch ERROR(notificationController) in POST /api/notifications/insert',
            error: e.message
        });
    }
}


const handlefetchNotificationData = async (req, res) => {
    try {
        
        console.log("req get body : ")
        console.log(req.body);
        //console.log("inside  handlefetchIspPackages");
        let Data = await notificationInterface.fetchData(req.body);//change here
        console.log(Data);
        if (Data.status === 'OK') {

            delete Data.status;
            delete Data.message;
            //console.log(pendingdata);
            return res.send(Data);
    
        } else {
            return res.status(400).send({
                message: 'Could not Insert User',
                error: Data.message
            });
        }
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/pending/fetching',
            error: e.message
        });
    }
}

const handleRandom = async (req, res) => {
  
    try {
        
        const random = Math.floor(Math.random() * 5) % 5 ;
         
        return res.status(200).send({Random:random });
        
    } catch (e) {
        return res.status(500).send({
            message: 'ERROR in POST /api/notifications/Random ',
            error: e.message
        });
    }

}


module.exports = {
    handleNotificationInsertOne ,
    handlefetchNotificationData,
    handleRandom,
}