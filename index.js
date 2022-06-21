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

app.get('/api/',(req,res)=>{
  
  const par = new Date();
    res.status(200).json({"unix":+ par,"utc":par.toUTCString()})
})

app.get('/api/:timeStamp',(req,res)=>{ 
  
  let par = req.params.timeStamp;
  
   if(!isNaN(par)){     
     par = parseInt(par);
     
     if(par.toString() !== 'Invalid Date' ){
      par = new Date(par)
      res.status(200).json({unix:Math.floor(par.getTime() ),utc:par.toUTCString()})
  }
    }else if(new Date(par).toString() !== 'Invalid Date' ){
   const newDate = new Date(par);
    res.status(200).json({unix:Math.floor(newDate.getTime() ),utc:newDate.toUTCString()})
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
