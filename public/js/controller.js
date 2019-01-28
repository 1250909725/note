

app.controller('usersController',['$scope', '$rootScope', '$http', '$state', '$stateParams', function($scope,$rootScope,$http){
	//users
	$scope.name = 'users';
	$rootScope.active('users');

	var layer = layui.layer;
	layer.config({
		//默认动画风格
		anim: 5,
		//默认皮肤
		// skin: 'layui-layer-molv',
		//关闭动画
		isOutAnim: false
	});

	$scope.delUser = function(id){
		
		layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
			
			$http({
				url: "/index/users/del",
				method: "post",
				contentType:'application/json;charset=UTF-8',
				params : {'uid':id}
			}).then(function successCallback(data){
				console.log(data);
				$scope.delUserResult = data;
			}, function errorCallback(response) {
		        console.log('删除错误');
		    });

		    location.reload(true);

			layer.close(index);
		});
		
	};

	$http({
		url: "/index/users",
		method: "post",
		contentType:'application/json;charset=UTF-8',
		params : {}
	}).then(function successCallback(data){
		console.log(data);
		$scope.users = data;
	}, function errorCallback(response) {
        console.log('获取用户信息失败');
    });

}]).controller('databaseController',['$scope','$rootScope',function($scope,$rootScope){
	//database
	$scope.name = 'database';
	$rootScope.active('database');

}]).controller('sortController',['$scope','$rootScope',function($scope,$rootScope){
	//sort
	$scope.name = 'sort';
	$rootScope.active('sort');

}]).controller('scheduleController',['$scope','$rootScope',function($scope,$rootScope){
	//schedule
	$scope.name = 'schedule';
	$rootScope.active('schedule');

}]).controller('inspirationController',['$scope','$rootScope',function($scope,$rootScope){
	//inspiration
	$scope.name = 'inspiration';
	$rootScope.active('inspiration');

}]);