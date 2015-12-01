MyApp.factory('QuestionFactory', function ($http)
{
	var factory = {};
	factory.getAllQuestion=function(callback)
	{
		$http.get('/question/show').success(function(output){

			callback(output);		

		});
	}

	factory.updateVote=function(data,callback)
	{
		$http.post('/question/update',data).success(function(output){
			callback(output);		

		});
	}

	factory.getThisQuestion=function(id,callback)
	{
		$http.get('/question/One/'+id).success(function(output){
			console.log(output);
			callback(output);	
		});
	}
	factory.deleteQuestion=function(data, callback)
	{
		$http.get('/question/destroy/'+data._id).success(function(output){
			factory.getAllQuestion(callback);	
		});
	}
	factory.addQuestion=function(data, callback)
	{
		$http.post('/question/create',data).success(function(output){
			console.log(output);
			if(output.errors)
			{

				callback(output.errors);
			}
			else 
			{
				callback("Question Added");	
			}
			
		});
	}
	return factory;

});

MyApp.controller('questionController', function ($scope,$cookieStore,$location,$parse, QuestionFactory)
{
	
	$scope.addQuestion=function()
	{
		$scope.newquestion.userid=$cookieStore.get('id');
		QuestionFactory.addQuestion($scope.newquestion,function(data){
			var temperr="";
			if(data.errors){
				for(var i in data.errors)
				{
					console.log(data.errors[i].path);
					console.log(data.errors[i].message);
					$scope.hasValue=function(val)
					{
						if(val==data.errors[i].path)
						{
							$scope.sucessMsg="";
							temperr=data.errors[i].path;
							return true;
						}
					}

				}
			}
			else
			{
				$scope.hasValue=function(val)
				{
					if(val==temperr)
					{
						return false;
					}
				}
				$scope.sucessMsg=data;	
				$scope.newquestion={};			
			}

		});
	}
});