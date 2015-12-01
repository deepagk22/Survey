var MyApp = angular.module('MyApp', ['ngRoute', 'ngCookies']);

MyApp.factory('MyFactory', function ($http)
{
	var factory = {};
	factory.getUserId = function (data, callback)
	{
		console.log(data);
		$http.get('/user/getOne/'+data.name).success(function(output) {
			callback(output);
		}); 
	}
	factory.addUser = function (data,callback)
	{

		var user='';
		factory.getUserId(data,function(user){
			user=user;
			
			if(!user[0]){
				$http.post('/user/addUser', data).success(function(output) {
					console.log(output);
					callback(output);
				}); 			
			}
			else
			{
				callback(user[0]);
			}
		});
	}
	return factory;
});
MyApp.config(function ($routeProvider) 
{
	$routeProvider
		.when('/',
		{
			templateUrl: 'partial/user.html',
			resolve: {
				factory: checkRouting
			} 
		})
		.when('/dashboard',
		{
			templateUrl: 'partial/dashboard.html',
			resolve: {
				factory: checkRouting
			} 
		})
		.when('/create',
		{
			templateUrl: 'partial/question.html',
			resolve: {
				factory: checkRouting
			} 
		})
		.when('/poll/:questionid',
        {
          templateUrl: 'partial/poll.html',
			resolve: {
				factory: checkRouting
			} 
        })
        .when('/logout',
        {
          redirectTo: '/',
			resolve: {
				factory: logoutRouting
			} 
        })
		.otherwise(
        {
          redirectTo: '/dashboard'
        })
});

var checkRouting=function($cookieStore, $location){
	if(!$cookieStore.get('user'))
		$location.path("/");
}
var logoutRouting=function($cookieStore)
{
	$cookieStore.remove('user');
	$cookieStore.remove('id');	
}

MyApp.controller('UserController', function ($scope,$cookieStore,$location, MyFactory)
{
	$scope.addUser=function()
	{
		$cookieStore.put('user',$scope.name);
		MyFactory.addUser({name:$cookieStore.get('user')}, function(data)
		{
			if(data.errors)
			{		
			}
			else
			{
				$cookieStore.put('id',data._id);
				$location.path('/dashboard');				
			}
		});
	}
});
