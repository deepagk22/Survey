MyApp.controller('pollController', function ($scope,$route, QuestionFactory)
{
	//console.log($routeParam.id);
	if($route.current.params.questionid!='undefined')
	{
		QuestionFactory.getThisQuestion($route.current.params.questionid, function(data){
			$scope.answer=data[0];
		}); 		
	}
	else
		location.path("/dashboard")

	$scope.answerVote=function(id,addvoteoption)
	{
		var ansoption={id:id,option:addvoteoption};
		QuestionFactory.updateVote(ansoption,function(data){
			$scope.answer=data;
		});

	}
	
});