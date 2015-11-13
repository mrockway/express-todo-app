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

///////////////////////////
///  MONGO API ROUTES  ///
/////////////////////////



////////////////////////////
// mongo find all todos ///
//////////////////////////
app.get('/api/todos', function(req,res) {
	Todo.find(function (err, allTodos) {
		res.json({todos: allTodos});
	});
});

////////////////////////////////
// mongo find one todo item ///
//////////////////////////////
app.get('/api/todos/:id', function(req,res) {
	var todoId = req.params.id;
	Todo.findOne({_id: todoId}, function(err, foundTodo){
		res.json(foundTodo);
	});
});


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

////////////////////////////
///  update mongo route ///
//////////////////////////

app.delete('/api/todos/:id', function(req,res){
	var todoId = (req.params.id);
	Todo.findOneAndRemove({_id: todoId}, function(err, deletedTodo){
		res.json(deletedTodo);
	});
});

///////////////////////////
//  mongo delete route  //
//////////////////////////

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