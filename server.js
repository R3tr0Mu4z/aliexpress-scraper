//***************************************************************
//******* ALIEXPRESS PRODUCT RESEARCH TOOL (SERVER)  ************
//******* MADE BY : SYED MUAZ ALI                    ************
//******* GITHUB : R3tr0Mu4z                         ************
//***************************************************************

var express = require('express');
var app = express();
var fs = require('fs');
var aliexpress = require('./aliexpress.js');
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("working");
});
app.get("/file", (req, res) => {
    var file = req.query.name;
    if (file.includes('.json')) {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile( __dirname + "/files/" + file);
    }
});

app.use('/aliexpress', aliexpress);

console.log("Running on port "+ PORT);
app.listen(PORT);
