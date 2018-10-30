const express = require('express');
const Joi = require("joi");
const app = express();

app.use(express.json());

var courses = [
    {id:1, name:"Java"},
    {id:2, name:"Node"},
    {id:3, name:"C-Sharp"}
];

app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.get("/api/courses", (req,res)=>{
    res.send(JSON.stringify(courses));
});

app.get("/api/courses/:id", (req, res)=>{
    var course = courses.find(function(course){
        return course.id === parseInt(req.params.id); 
    });
    res.send(course);
});

app.post("/api/courses", (req, res)=>{
    var result = validateBody(req);
    if(result.error) res.send(result.error.details[0].message);
    
    var course = {
        id: courses.length + 1,
        name: result.value.name
    }; 
    
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res)=>{
//    console.log("inside put...")
//    res.send(req.params.id);
    var course = courses.find(function(course){
        return course.id === parseInt(req.params.id); 
    });
    if(!course){
        res.send.status(404).send("Course not found!");
    }
    var result = validateBody(req);
    if(result.error) res.send(result.error.details[0].message);
    
    course.name = req.body.name;
    
    res.send(course);
});

app.delete("/api/courses/:id", (req, res)=>{
    var course = courses.find(function(course){
        return course.id === parseInt(req.params.id); 
    });
    
    var index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(courses);
    
});

var validateBody = function(req){
    var schema = {
      name: Joi.string().min(3).required()  
    };
    
    var result = Joi.validate(req.body,schema);
    return result;
};

app.listen("3000",()=>{
    console.log("Started Server... listening at 3000...");
});