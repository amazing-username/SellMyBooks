bookRouter.controller('LogoutCtrl', ['$scope', '$http', '$state', '$window', 'AuthFac', function($scope, $http, $state, $window, AuthFac){


  console.log("Hello World from  logout controller");
  //$http.get('http://localhost:3000/users/logout').success(function(response)
  //{
  //  console.log("logged out");
  //})
  $window.localStorage.removeItem('sellbookstoken');
  alert("Logged Out!");
  $state.transitionTo('home');

}]);
