var express = require('express');
var app = express();

//var mongo = require('mongo');
//var mongojs = mongo();

app.use(express.static(__dirname + '/public'));



app.listen(3000);
console.log('Server running port 3000');
