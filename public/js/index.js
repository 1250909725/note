(function($){

	var app = angular.module('app', ['ui.router']);

	app.controller('appCont', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
		//天气城市
		$scope.city='410300';
		
		$rootScope.active=function(name){
			$rootScope.current=name;
			var lis = $(".nav-left li");
			// console.log(lis);
			for (var i = lis.length - 1; i >= 0; i--) {
				if ($(lis[i]).attr('data-name')==name) {
					$(lis[i]).addClass("active");
				} else {
					$(lis[i]).removeClass("active");
				}
			}
		};

		// $rootScope.active('users');

		$http({
			url: "/index/weather",
			method: "post",
			contentType:'application/json;charset=UTF-8',
			params : {'city':$scope.city}
		}).then(function successCallback(data){
			console.log(data);
			$scope.weatherObj = data;
		}, function errorCallback(response) {
	        console.log('获取天气信息失败');
	    });

	}]);

	app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('users', {
			url:'/users',
			templateUrl: "/html/users.html",
			controller:'usersController'
		})
		.state('sort', {
			url:'/sort',
			templateUrl: "/html/sort.html",
			controller:'sortController'
		})
		.state('database',{
			url:'/database',
			templateUrl: "/html/database.html",
			controller:'databaseController'
		})
		.state('inspiration',{
			url:'/inspiration',
			templateUrl: "/html/inspiration.html",
			controller:'inspirationController'
	    })
	    .state('schedule',{
	    	url:'/schedule',
	    	templateUrl: "/html/schedule.html",
	    	controller:'scheduleController'
	    });

	    $urlRouterProvider
	    .when('/','/html/users.html')
	    .when('','/html/users.html')
	    .otherwise('users');
	}]);


	window.app = app;

})($);