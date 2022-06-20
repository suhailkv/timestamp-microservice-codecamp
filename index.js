// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });
// "utc":"Mon, 20 Jun 2022 07:40:25 GMT"
// function formattedDate(time){
//   console.log(time);
//   let date;
//   if(time === undefined){
//     date = new Date()
//     }
   
//     else if(Object.prototype.toString.call(time) === "[object Date]"){
//       date = new Date(time)
//     }else{
//     date = new Date(time * 1000)
//     }
//   const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//   const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 


//   const format ={
//     month: month[date.getMonth()],
//     d: date.getDate(),
//     y: date.getFullYear(),
//     day:weekday[date.getDay()],
//     h:date.getHours(),
//     m:date.getMinutes(),
//     s:date.getSeconds()
//   }
//   const newDate = `${format.day}, ${format.d} ${format.month} ${format.y} ${format.h}:${format.m}:${format.s} GMT`
//   return newDate;
// }
app.get('/api/',(req,res)=>{
  
    res.status(200).json({"unix":+ new Date(),"utc":formattedDate()})
})
app.get('/api/:timeStamp',(req,res)=>{ 
  let par = new Date(req.params.timeStamp)
  if(par.toString() !== 'Invalid Date' ){
    res.status(200).json({unix:Math.floor(par.getTime() / 1000),utc:par.toUTCString()})
  }
else{
  res.status(404).json({ error : "Invalid Date" })
}
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
