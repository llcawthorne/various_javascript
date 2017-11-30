var express = require('express');
var app = new express();

app.get('/', function (req, res) {
    "use strict";
    res.send('Hello, world!');
});

app.listen(7777);
console.log("App listening on Port 7777");