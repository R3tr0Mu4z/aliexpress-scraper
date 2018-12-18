//***************************************************************
//******* ALIEXPRESS PRODUCT RESEARCH TOOL (SERVER)  ************
//******* MADE BY : SYED MUAZ ALI                    ************
//******* GITHUB : R3tr0Mu4z                         ************
//***************************************************************

var express = require('express');
var app = express();
var aliexpress = require('./aliexpress.js');
const PORT = process.env.PORT
app.get("/", (req, res) => {
    res.send("working");
});

app.use('/aliexpress', aliexpress);

console.log("Running on port "+ PORT);
app.listen(3000);
