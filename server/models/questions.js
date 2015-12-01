var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
user_id:{type: Schema.ObjectId, ref: 'User'},
question: String,
option1: String,
vote1: { type: Number, default: 0 },
option2: String,
vote2:{ type: Number, default: 0 },
option3: String,
vote3:{ type: Number, default: 0 },
option4: String,
vote4:{ type: Number, default: 0 },
created_at:Date
});
var Question = mongoose.model('Question', QuestionSchema);
QuestionSchema.path('question').required(true, 'question cannot be blank');
QuestionSchema.path('question').validate(function(question){
	return question.length>=8;
}, 'Question must be more that 8 characters');
QuestionSchema.path('option1').required(true, 'option1 cannot be blank');
QuestionSchema.path('option1').validate(function(option1){
	return option1.length>=3;
}, 'Options At least 3 characters');
QuestionSchema.path('option2').required(true, 'option2 cannot be blank');
QuestionSchema.path('option2').validate(function(option2){
	return option2.length>=3;
}, 'Options At least 3 characters');
QuestionSchema.path('option3').required(true, 'option3 cannot be blank');
QuestionSchema.path('option3').validate(function(option3){
	return option3.length>=3;
}, 'Options At least 3 characters');
QuestionSchema.path('option4').required(true, 'option4 cannot be blank');
QuestionSchema.path('option4').validate(function(option4){
	return option4.length>=3;
}, 'Options At least 3 characters');
