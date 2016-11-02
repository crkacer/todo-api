var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todoNextId = 4;

var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to the market',
	completed: false
}, {
	id: 3,
	description: 'Feed the cat',
	completed: true
}];
app.use(bodyParser.json());
app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
})

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;
	todos.forEach(function(todo){
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	})
	if (matchedTodo){
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

app.post('/todos', function (req, res){
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('description: ' + body.description);
	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express is listening on port ' + PORT);
});