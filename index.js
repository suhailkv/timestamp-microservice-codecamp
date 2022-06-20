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
function check(req,res,next){
 if(isNaN(req.params.timeStamp) && req.params.timeStamp !==undefined ){
    console.log(req.params.timeStamp)
    res.status(400).json({"error":"Invalid Date"})
  }
  next();
}
app.use(check);
// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });
// "utc":"Mon, 20 Jun 2022 07:40:25 GMT"
function formattedDate(time){
  let date;
  if(time === undefined){
    date = new Date()
    }else{
      date = new Date(time *1000)
    }
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 


  const format ={
    month: month[date.getMonth()],
    d: date.getDate(),
    y: date.getFullYear(),
    day:weekday[date.getDay()],
    h:date.getHours(),
    m:date.getMinutes(),
    s:date.getSeconds()
  }
  const newDate = `${format.day}, ${format.d} ${format.month} ${format.y} ${format.h}:${format.m}:${format.s} GMT`
  return newDate;
}
app.get('/',(req,res)=>{
    res.status(200).json({"unix":+ new Date(),"utc":formattedDate()})
})
app.get('/:timeStamp',(req,res)=>{              res.status(200).json({"unix":req.params.timeStamp,"utc":formattedDate(req.params.timeStamp)})
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
