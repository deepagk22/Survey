var mongoose = require('mongoose');
var Question = mongoose.model('Question');
module.exports = (function() 
{
	return{
		show:function(req,res)
		{
			Question.find({}).populate('user_id').exec(function(err, results){
				if(err){}
				else
				{
					res.json(results);
				}
			});
		},
		getOne:function(req,res)
		{
			Question.find({_id:req.params.id}).populate('userid').exec(function(err, results){
				if(err){}
				else
				{
					console.log(results);
					res.json(results);
				}
			});
		},
		update: function(req,res)
		{
			Question.findOne({_id:req.body.id}, function(err,question){
				if(req.body.option==='vote1')
				{
					question.vote1++;
				}
				else if(req.body.option==='vote2')
				{
					question.vote2++;
				}
				else if(req.body.option==='vote3')
				{
					question.vote3++;
				}
				else if(req.body.option==='vote4')
				{
					question.vote4++;
				}
				question.save(function(err)
				{
					if(err )
					{}
					else
					{ 
						res.json(question);
					}
						
				});

			});
		},
		destroy: function(req,res)
		{
			Question.remove({_id: req.params.id}, function (err){
				res.redirect('/question/show');
			});
		},
		create:function(req, res)
		{
			var question=new Question({
				user_id:req.body.userid,
				question:req.body.question,
				option1:req.body.option1,
				option2:req.body.option2,
				option3:req.body.option3,
				option4:req.body.option4,
				created_at:new Date()
			});
			question.save(function(err)
			{
				if(err )
				{
					console.log(err);
					res.json({errors: err});
					
				}
				else 
					res.json(question);
					
			});
			
		}
}

	
})();