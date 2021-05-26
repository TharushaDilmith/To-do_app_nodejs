var express = require('express');
var todocontroller = require('./controllers/todocontroller');

var app= express();

//set up template engine
app.set('view engine','ejs');

//set up static files path
app.use(express.static('./public'));

//fire controllers
todocontroller(app);

//set up port to listen
app.listen(3000); 
console.log('You listening to port 3000');
