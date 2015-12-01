var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = (function() 
{
	return{
		show:function(req,res)
		{
			User.find({}).sort({percentage:'desc'}).exec(function(err, results){
				if(err)
				{

				}
				else
				{
					res.json(results);
				}
			});
		},
		create:function(req, res)
		{

			
			var user=new User({name:req.body.name});
			user.save(function(err, result){

				if(err)
				{
					res.json(err);
					console.log("user not changed");
				}
				else
				{
					console.log(result);
					res.json(result);
				}
					
			});
			
		},
		getOne:function(req,res)
		{	

			User.find({name:req.params.name}, function(err, results){
				if(err)
				{

				}
				else
				{
					res.json(results);
				}
			});
		}
}

	
})();