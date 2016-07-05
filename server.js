var express = require('express');
var app = express();
var multer=require("multer");
var bodyParser = require('body-parser')
var upload = multer({ dest: 'uploads/' })

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// parse application/json 
app.use(bodyParser.json())

app.use("/", express.static("app"))
app.use("/bower_components", express.static("bower_components"))
app.use(upload.array());

app.listen(9000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(function(req, res, next) {
  if(req.method==="POST"){
  console.log("req.params  = "+JSON.stringify(req.params));
  // req.path
  // req.body
  // req.params`
  }
})
