$(function() {

console.log("10-4 little buddy");

//set up variable for data
// handlebars template and source

var source = $('#task-template').html();
var template = Handlebars.compile(source);

var allTasks = [];

$('.todoEdit').hide();

//refresh book list on page
var render = function() {
	$('.todoList').empty();
	var todoHtml = template({data : allTasks});
	$('.todoList').append(todoHtml);
};

//get request, put todos on the page
$.get('/api/todos/', function(data) {
	todoResults = template({data : data.todos});
	allTasks = (data.todos);
	$('.todoList').append(todoResults);
	return todoResults;
});

//create new todo task
$('.todoForm').on('submit',function(event) {
	event.preventDefault();
	var newTask = $(this).serialize();
	$.post('/api/todos/',newTask, function(data) {
		console.log("before",allTasks);
		allTasks.push(data);
		console.log("data",data);
		console.log("after",allTasks);
		render();
	});	 
});

//drop down edit form
$('.edit').on('click','.edit', function(event){
	$('.todoEdit').show();
});

//update todo list
$('.todoList').on('submit', '.todoEdit', function(event){
	event.preventDefault();
	var editTask = $(this).serialize();
	console.log(editTask);
	var taskId = $(this).closest('.task').attr('data-id');
	console.log(taskId);
	var taskUpdate = allTasks.filter(function(task) {
		return (allTasks._id == taskId);
	})[0];
	$.ajax({
		type: 'PUT',
		url: '/api/todos/'+taskId,
		data: editTask,
		success: function(data){
			allTasks.splice(allTasks.indexOf(taskUpdate), 1, data);
			render();
		}
	});
});

//delete todo list items
$('.todoList').on('click', '.delete', function(event){
	event.preventDefault();
	var taskId = $(this).closest('.task').attr('data-id');
	console.log(taskId);
	var taskRemove = allTasks.filter(function(task) {
		return allTasks._id == taskId;
	})[0];
	$.ajax({
		type: 'DELETE',
		url: '/api/todos/'+taskId,
		success: function(data){
			allTasks.splice(allTasks.indexOf(taskRemove), 1);
			render();
		}
	});
});

}); // end of doc ready










