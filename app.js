
// this is the main file. This file requires in all of our "routes". 
var express = require("express");
var morgan = require('morgan');
var bodyParser = require("body-parser");
//Get the code from the students.js and save it to studentsFile
var studentsFile = require("./routes/students.js");
//Get the code from the schools.js file and save it to schoolsMainPage
var schoolsMainPage = require("./routes/schools.js");
//initialize an instance of expresss
var app = express();

//whenever we get a post request, mess around with the "body" of our post. Make it a JSON type. 
//remember post requests have headers, body, and all other info in the native post request/ http protocol
app.use(bodyParser.json());

//on every request, use morgan to log out information to our terminal. Note that the string you pass in to the morgan function
// changes the type of info that gets logge out. Dev logs out color coded concise info. 

app.use(morgan("dev"), function (req, res, next) {
    next();
})

//when we hit /students, use the file we refered above as the context
// the reason that i am references studentsFile.route instead of route is because im exporting an object
// from students file, since i wanted to use the "database" in other files. Refer to the students.js exports object
// to clarify
app.use("/students", studentsFile.router)
app.use("/schools", schoolsMainPage)

//our root page. 

app.get("/", function (req, res, next) {
    res.send("Welcome to Full Stack Academy's Student Database")
    next()
})

//error handling
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

//start our server on port 3000
app.listen(3000, function () {
    console.log("Listening on Port 3000!")
})
