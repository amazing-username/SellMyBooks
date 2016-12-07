bookRouter.controller('RegisterCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){


  console.log("Hello World from  register controller");
  $scope.user= {};
  $scope.addUser = function()
  {
    console.log('register function');
    console.log($scope.user.username);
    console.log($scope.user.password);

    $http.post(serverBase+'/users/register', {
      username: $scope.user.username,
      password: $scope.user.password
    }).success(function(data)
    {
        console.log("success, goin' home!");
        $state.transitionTo('home');
    }).error(function(data)
    {
        alert("You did something wrong.");
    })

  };

}]);
