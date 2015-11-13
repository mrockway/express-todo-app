//require node packages
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require('mongoose');

//connect to mongoose db
mongoose.connect('mongodb://localhost/tododb');

//require Todo model from the todo.js file
var Todo = require('./models/todo');

//set variable for express function
var app = express();

//set up bodyParser to extract info from URL
app.use(bodyParser.urlencoded({extended: true}));

//set up public folder for css and js
app.use(express.static(__dirname + '/public'));

//set up view engine for hbs if server side render
app.set('view engine', 'hbs');

//route for the index page, prior to setting up index.hbs
app.get('/', function(req,res) {
	res.render('index');
});


// //seed data for to-do list
// var todos = [{_id: 1,
// 							task: "homework",
// 							description: "finish today's homework"},
// 							{_id: 2,
// 							task: "beer",
// 							description: "drink a beer"},
// 							{_id: 3,
// 							task: "dinner",
// 							description: "make dinner"}
// 							];

/////////////////
//API ROUTES////
////////////////



//get route for requesting all the todos
// app.get('/api/todos', function(req,res) {
// 	res.json({todos: todos});
// });

////////////////////////////
// mongo find all todos ///
//////////////////////////
app.get('/api/todos', function(req,res) {
	Todo.find(function (err, allTodos) {
		res.json({todos: allTodos});
	});
});


//get route for requesting a single todo
// app.get('/api/todos/:id', function(req,res) {
// 	//set variable to convert id from URL into integer
// 	var todoId = parseInt(req.params.id);
// 	//set variable to look for todoID within the todos array
// 	var todoDisplay = todos.filter(function(todo) {
// 		return todo._id === todoId;
// 	})[0];
// 	res.json(todoDisplay);
// });

////////////////////////////////
// mongo find one todo item ///
//////////////////////////////
app.get('/api/todos/:id', function(req,res) {
	var todoId = req.params.id;
	Todo.findOne({_id: todoId}, function(err, foundTodo){
		res.json(foundTodo);
	});
});

//post new todo route
/////////////////////////
// app.post('/api/todos', function(req,res) {
// 	//set variable to save new todo data
// 	var newTodo = req.body;
// 	//check if any id's have been created and assign one
// 	if (todos.length > 0) {
// 		newTodo._id = todos[todos.length -1]._id +1;
// 	} else {
// 		newTodo._id = 1;
// 	}
// 	//push new todo into array
// 	todos.push(newTodo);
// 	//send back confirmation of todo add
// 	return res.json(newTodo);
// });

/////////////////////////////
// mongo create new task  //
///////////////////////////
app.post('/api/todos', function(req,res) {
	var newTodo = new Todo(req.body);
	newTodo.save(function(err, savedTodo) {
		res.json(savedTodo);
	});
});

app.put('/api/todos/:id', function(req,res) {
	var todoId = req.params.id;

	Todo.findOne({_id: todoId}, function (err, foundTodo) {
		foundTodo.task = req.body.task;
		foundTodo.description = req.body.description;
		foundTodo.save(function (err, savedTodo) {
			res.json(savedTodo);
		});
	});
});


// //update existing todo route
// app.put('/api/todos/:id', function(req,res) {
// 	//set variable to save todo ID
// 	var todoId = parseInt(req.params.id);
// 	var todoUpdate = todos.filter(function(todo) {
// 		return todo._id === todoId;
// 	})[0];
// 	//update task from info that gets sent over
// 	todoUpdate.task = req.body.task;
// 	//update description from info being sent over
// 	todoUpdate.description = req.body.description;
// 	//send confirmation to user of update
// 	res.json(todoUpdate);
// });

/////////////////////////
// update mongo route //
///////////////////////
app.delete('/api/todos/:id', function(req,res){
	var todoId = (req.params.id);
	Todo.findOneAndRemove({_id: todoId}, function(err, deletedTodo){
		res.json(deletedTodo);
	});
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