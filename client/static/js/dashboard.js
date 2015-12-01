MyApp.controller('dashboardController', function ($scope,$cookieStore,$location, QuestionFactory)
{
	QuestionFactory.getAllQuestion(function(data){
		$scope.questions=data;

	});	
	$scope.showUserID=function(userid)
	{
		console.log($cookieStore.get('id'));
		if(userid._id==$cookieStore.get('id'))
		{
			return true;
		}
		else
			return false;
	}
	$scope.deleteQuestion=function(question)
	{
		QuestionFactory.deleteQuestion(question, function(data){
			$scope.questions=data;
		})	
	}
});
