var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//this tells mongoose what kind of data can be accepted
var TodoSchema = new Schema ({
	task: String,
	description: String
});

//this sets up the model(object) in Mongo, lets up query db
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;