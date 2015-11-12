console.log("10-4 little buddy");

//set up variable for data
// handlebars template and source

var source = $('#task-template').html();
var template = Handlebars.compile(source);

var allTasks = [];

var render = function() {
	$('.todoList').empty();
	var todoHtml = template({data : allTasks});
	$('.todoList').append(todoHtml);
};

$.get('http://localhost:3000/api/todos/', function(data) {
	todoResults = template({data : data});
	allTasks = data;
	$('.todoList').append(todoResults);
	return todoResults;
});

$('.todoForm').on('submit',function(event) {
	event.preventDefault();
	var newTask = $(this).serialize();

	$.post('http://localhost:3000/api/todos/',newTask, function(data) {
		console.log(data);
		allTasks.push(data);
		render();
	});
	 
});