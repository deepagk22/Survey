
var user = require('../controllers/user.js');
var question = require('../controllers/question.js');
module.exports = function(app) {

app.get('/user/show', function(req,res){
	user.show(req,res);
});

app.get('/user/getOne/:name', function(req,res){
	user.getOne(req,res);
});

app.post('/user/addUser', function(req,res){
	user.create(req,res);
});

app.post('/question/create', function(req,res){
	question.create(req,res);
});
app.get('/question/show', function(req,res){
	question.show(req,res);
});

app.get('/question/One/:id', function(req,res){
	question.getOne(req,res);
});

app.get('/question/destroy/:id', function(req,res){
	question.destroy(req,res);
});

app.post('/question/update', function(req,res){
	question.update(req,res);
});
}