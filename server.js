//***************************************************************
//******* ALIEXPRESS PRODUCT RESEARCH TOOL (SERVER)  ************
//******* MADE BY : SYED MUAZ ALI                    ************
//******* GITHUB : R3tr0Mu4z                         ************
//***************************************************************

var express = require('express');
var app = express();
var aliexpress = require('./aliexpress.js');

app.use('/aliexpress', aliexpress);

console.log("Running on port 3000");
app.listen(3000);
