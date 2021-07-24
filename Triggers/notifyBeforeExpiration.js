exports = async function() {
  const db = context.services.get("Cluster0").db("myFirstDatabase");
  const isps = db.collection("isps");
  const users = db.collection("users");
  const packages = db.collection("packages");
  const notifications = db.collection("notifications");
  
  let time = new Date();
  time.setDate(time.getDate() + 7);
  
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
              subject:"Your activation for package:"+pkgData[0].name+" expire soon",
              details:"Pay your Package fee for "+pkgData[0].name+".Unless your connection for this package will be shut down. Thank you",
              notificationArrivalTime:new Date(),
              category:"",
              __v:0
          });
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
              subject:"Your activation for package:"+pkgData[0].name+" expire soon",
              details:"Pay your Package fee for "+pkgData[0].name+".Unless your connection for this package will be shut down. Thank you",
              notificationArrivalTime:new Date(),
              category:"",
              __v:0
          });
       }
    }
   
  }
}