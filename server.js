//require node packages
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');

//set variable for express function
var app = express();

//set up bodyParser to extract info from URL
app.use(bodyParser.urlencoded({extended: true}));

//set up public folder for css and js
app.use(express.static('public'));

//set up view engine for hbs
app.set('view engine', 'hbs');

//seed data for to-do list
var todos = [{_id: 1,
							task: "homework",
							description: "finish today's homework"},
							{_id: 2,
							task: "beer",
							description: "drink a beer"},
							{_id: 3,
							task: "dinner",
							description: "make dinner"}
							];

//route for the index page, prior to setting up index.hbs
app.get('/', function(req,res) {
	res.render('index');
});

//get route for requesting all the todos
app.get('/api/todos', function(req,res) {
	res.json(todos);
});

//get route for requesting a single todo
app.get('/api/todos/:id', function(req,res) {
	//set variable to convert id from URL into integer
	var todoId = parseInt(req.params.id);
	//set variable to look for todoID within the todos array
	var todoDisplay = todos.filter(function(todo) {
		return todo._id === todoId;
	})[0];
	res.json(todoDisplay);
});

//post new todo route
app.post('/api/todos', function(req,res) {
	//set variable to save new todo data
	var newTodo = req.body;
	//check if any id's have been created and assign one
	if (todos.length > 0) {
		newTodo._id = todos[todos.length -1]._id +1;
	} else {
		newTodo._id = 1;
	}
	//push new todo into array
	todos.push(newTodo);
	//send back confirmation of todo add
	return res.json(newTodo);
});

//update existing todo route
app.put('/api/todos/:id', function(req,res) {
	//set variable to save todo ID
	var todoId = parseInt(req.params.id);
	var todoUpdate = todos.filter(function(todo) {
		return todo._id === todoId;
	})[0];
	//update task from info that gets sent over
	todoUpdate.task = req.body.task;
	//update description from info being sent over
	todoUpdate.description = req.body.description;
	//send confirmation to user of update
	res.json(todoUpdate);
});

//delete existing todo route
app.delete('/api/todos/:id', function(req,res){
	var todoId = parseInt(req.params.id);
	var todoDelete = todos.filter(function(todo) {
		return todo._id === todoId;
	})[0];
	//variable to keep index of todo to be deleted
	var todoIndex = todos.indexOf(todoDelete);
	//remove todo from array
	todos.splice(todoIndex,1);
	//send confirmation to user of deletion
	return res.json(todoDelete);
});

//telling server to listen to port 3000
app.listen(3000, function() {
	console.log("Ready");
});