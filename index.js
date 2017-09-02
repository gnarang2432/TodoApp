var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var todo = require("./seed.js");

app.use("/",express.static(__dirname+"/public"));


app.use("/",bodyParser.urlencoded({extended:false}));

//1.Get all todos
//Return a JSON object of all todos

app.get("/api/todos",function(req,res){
    res.json(todo.todos);
});

//2.Mark a todo as deleted

app.delete("/api/todos/:id",function(req,res){
    var id_to_be_deleted = req.params.id;
    console.log(id_to_be_deleted);
    var todo_found = todo.todos[id_to_be_deleted];
    //console.log(todo_found);
    //send response  if todo doesn't exist
    if(!todo_found){
        res.status(400).json({error:"Todo doesn't exist"});
    }
    else{
        todo_found.status = todo.StatusENUMS.DELETED;
        res.json(todo.todos);
    }
});

//3.Add a new todo

app.post("/api/todos",function(req,res){
    var todoNew = req.body.title;
    if(!todoNew || todoNew == "" || todoNew.trim() == ""){
        res.status(400).json({error:"Todo title can't be empty"});
    }
    else{
        var new_todo_object = {
            title:req.body.title,
            status:todo.StatusENUMS.ACTIVE
        }
        todo.todos[todo.next_todo_id++] = new_todo_object;

        res.json(todo.todos);
    }
});

//Update a todo
app.put("/api/todos/:id",function(req,res){
    var todoId = req.params.id;
    var todoFound = todo.todos[todoId];
    if(!todoFound){
        res.status(400).json({error:"No todo found"});
    }
    else{
        //var title = req.body.title;
        todoFound.status = req.body.status;
        res.json(todo.todos);
    }

})

//Get all active todos-additional implementation
app.get("/api/todos/active",function(req,res){
    var activeTodos = {};
    for(var i = 0;i<todos.length;i++){
        if(todo.todos[i].status == todo.StatusENUMS.ACTIVE) {
            activeTodos.push(todo.todos[i]);
        }
    }
    res.json(activeTodos);
})

console.log(todo);



app.listen(3000);