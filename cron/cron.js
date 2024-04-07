import cron from 'cron'
import https from 'https'

const URL = "https://react-friends-dy03.onrender.com"
const job = new cron.CronJob('*/14 * * * *',function (){
    https.get(URL,(res)=>{
        if(res.statusCode === 200){
            console.log("Get");
        }else{
            console.log("get",res.statusCode);
        }
    })
    .on("error",(e)=>{
        console.error("Error While req",e)
    })
})

export default job;