//require in light weight instance of express
var router = require("express").Router();
//Fake Database
var students = [{
    name: "David",
    lastName: "Castro",
    school: "wdf"

}, {
    name: "Raymond",
    lastName: "Foo",
    school: "gracehopper"

}, {
    name: "Leslie",
    lastName: "Blah",
    school: "gracehopper"

}, {
    name: "Tony",
    lastName: "Foobar",
    school: "wdf"

}];


//Students Homepage
router.get("/", function (req, res, next) {
    let html = ""
    //make some html
    if (students.length === 0) {
        res.send("There are currently no students enrolled")
    }
    for (let i = 0; i < students.length; i++) {
        html += "<h3>" + students[i].name + "<h3>"
        html += "<h3>" + students[i].lastName + "<h3>"
        html += "<p>" + students[i].school + "<p>"
        html += "==========================="

    }
    res.send(html)
})

//get individual profile for student

//students/name of student. 
router.get("/:studentProfile", function (req, res, next) {
    let html = ""
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === req.params.studentProfile) {
            html += "<h3>" + students[i].name + "<h3>",
                html += "<h3>" + students[i].lastName + "<h3>",
                html += "<p>" + students[i].school + "<p>",
                html += "==========================="
        }
    }
    if (html === "") {
        res.send("Student Does not exist")
    } else res.send(html)
})




//add a student
//you need to use postman for this, since we have no form in our html. 
router.post("/", function (req, res, next) {
    //push to "database"
    students.push({
        name: req.body.name,
        lastName: req.body.lastName,
        school: req.body.school
    });

    res.end(JSON.stringify(students));
})


//delete a student
//again use postman
router.delete("/:studentProfile", function (req, res, next) {
    let html = ""
    if (students.length === 0) {
        res.send("This Student no longer exists")
    }
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === req.params.studentProfile) {
            students.splice(i, 1)

        }
    }
    res.send(students)
})


//update a student
router.put("/:studentProfile", function (req, res, next) {
    for (let i = 0; i < students.length; i++) {

        if (students[i].name === req.params.studentProfile) {
            var currStudent = students[i]
            students[i].name = req.body.name
            students[i].lastName = req.body.lastName
            students[i].school = req.body.school
        }
    }
    res.send(currStudent)
})

//send all this data to app.js
module.exports = {
    //include all router functions. Now this is available as whatever_Variable_Name_You_Used.router
    router: router,
    //also send out our "Database" so we can use it in our schools route. 
    studentsDB: students
}
