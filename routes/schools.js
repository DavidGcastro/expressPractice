//our schools file, this includes all routes that have to do with schools/
//initialize router. 
//an important note on router: THIS IS A LIGHT WEIGHT VERSION OF EXPRESS. IT INCLUDES THE BASICS IN ORDER FOR ROUTING TO WORK
//  this stops us from initializing the entire express library on every route file. 
var route = require("express").Router();
//require in our students file
var studentsFile = require("./students.js");
//save the "database" to db
var db = studentsFile.studentsDB;


//note that in our app.js file we are we are sending all /students posts to this file, so the "/" in this context
// would be /students. If i were to put "/students" it would refer /students/students. 
route.get("/", function (req, res) {
    let html = "<h1> " + "Welcome to Fullstack these are our students" + "<h1>"
    //loop thru our "Database" and make some html to send back
    for (let i = 0; i < db.length; i++) {
        html += "<h3>" + db[i].name + "<h3>",
            html += "<h3>" + db[i].lastName + "<h3>",
            html += "<p>" + db[i].school + "<p>",
            html += "==========================="

    }
    if (html === "") {
        //all students in db has been beleted
        res.send("Student Does not exist")

    //send our html file to client
    } else res.send(html)
})

// saves anything after schools/blahblah to a variable. 

route.get("/:schoolName", function (req, res) {
    //saves that name to a variable
    let school = req.params.schoolName
    let html = ""
    //look only for wdf and gracehopper
    //loops thru and make some html
    if (school === "wdf" || school === "gracehopper") {
        for (let i = 0; i < db.length; i++) {
            if (db[i].school === school) {
                html += "<h3>" + db[i].name + "<h3>",
                    html += "<h3>" + db[i].lastName + "<h3>",
                    html += "<p>" + db[i].school + "<p>",
                    html += "==========================="


            }

        }
        res.send(html)
    }

})



//make route available outside of this file. 

module.exports = route;
