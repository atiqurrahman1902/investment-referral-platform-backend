const cron=require("node-cron");


const calculateROI =
require("../services/roiService");



// Every day midnight


cron.schedule(

"0 0 * * *",

()=>{


calculateROI();


}

);


console.log(
"ROI Scheduler Started"
);