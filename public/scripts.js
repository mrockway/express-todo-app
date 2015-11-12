console.log("10-4 little buddy");

//set up variable for data
// handlebars template and source
var source = $('#task-template').html();
var template = Handlebars.compile(source);
var todoResults = [];

//rerender page on C, U, D
function render() {
	$('.todoList').empty();
	var todoHtml = template({data : data});
	$('.todoList').append(todoHtml);
}

$.get('http://localhost:3000/api/todos/', function(data) {
	todoResults = template({data : data});
	$('.todoList').append(todoResults);
});

$('.todoForm').on('submit',function(event) {
	event.preventDefault();
	var newTask = $(this).serialize();
	$.post('http://localhost:3000/api/todos/',newTask, function(data) {
		todoResults.push(newTask);
		render();
	});
	 
});