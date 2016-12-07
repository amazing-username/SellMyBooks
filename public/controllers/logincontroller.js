bookRouter.controller('LoginCtrl', ['$scope', '$http', '$state', 'AuthFac', function($scope, $http, $state, AuthFac){
  console.log("Hello World from  login controller");
 $scope.user= {};
 $scope.loginUser = function()
 {
   console.log('register function');
   console.log($scope.user.username);
   console.log($scope.user.password);

   $http.post(serverBase+'/users/login', {
     username: $scope.user.username,
     password: $scope.user.password
   }).success(function(data)
   {
       console.log("success, goin' home!");

       AuthFac.saveToken(data.token);
       $state.transitionTo('home');
   }).error(function(data)
   {
       alert("You did something wrong.");
   })

 };
}]);
