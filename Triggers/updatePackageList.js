exports = async function() {
    const db = context.services.get("Cluster0").db("myFirstDatabase");
    const isps = db.collection("isps");
    const users = db.collection("users");
    const packages = db.collection("packages");
    const notifications = db.collection("notifications");
    
    let time = new Date();
    //find all isp and send them notifications
    let ispData=await isps.find().toArray();
    for (let i=0;i < ispData.length;i++) {
      let  isp=ispData[i];
      for(let j=0; j< isp.packages.length ;j++){
         let pkg=isp.packages[j];
         if(pkg.terminationTime < time ){
            let pkgData = await packages.find({_id:pkg.packageId}).toArray();
            notifications.insertOne({
                seenStatus:false,
                senderId:"Nttn",
                receiverID:isp.name,
                senderType:1,
                receiverType:2,
                subject:"Your activation for package:"+pkgData[0].name+"Expired!",
                details:"You didn't pay fees for package: "+pkgData[0].name+".Your connection for this package shut down. Thank you",
                notificationArrivalTime:new Date(),
                category:"",
                __v:0
            });
            //update 
            await isps.updateOne({_id:isp._id},{ $pull:{packages:{packageId:pkg.packageId}}});
         }
      }
    }
    
    // do it for user 
    let userData=await users.find().toArray();
    for (let i=0;i < userData.length;i++) {
      let  user=userData[i];
      for(let j=0; j< user.packages.length ;j++){
         let pkg=user.packages[j];
         if(pkg.terminationTime < time ){
            let pkgData = await packages.find({_id:pkg.packageId}).toArray();
            notifications.insertOne({
                seenStatus:false,
                senderId:user.ispId,
                receiverID:user.name,
                senderType:2,
                receiverType:3,
                subject:"Your activation for package:"+pkgData[0].name+"Expired!",
                details:"You didn't pay fees for package: "+pkgData[0].name+".Your connection for this package shut down. Thank you",
                notificationArrivalTime:new Date(),
                category:"",
                __v:0
            });
            //update 
            await users.updateOne({_id:user._id},{$pull:{packages:{packageId:pkg.packageId}}});
         }
      }
    }
  }