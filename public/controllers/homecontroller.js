bookRouter.controller('HomeCtrl', ['$scope', '$http', '$state', '$stateParams', 'AuthFac',  function($scope, $http, $state, $stateParams, AuthFac){



  $scope.searchTerm={};
  $scope.emptySearch = function() {
    if ($scope.searchTerm.title="")
    {
      return false;
    }
    else {
      return true;
    }
  }
  $scope.getUser = function(){
    if(AuthFac.isLoggedIn() )
    {
      return AuthFac.currentUser();
    }
    else {
      {
        return "You're Not Logged In";
      }
    }
  };
  console.log("Hello World from  home controller");



  $scope.searchBasic = function(){
      console.log($stateParams.searchTerm.title);
      console.log($stateParams.searchTerm);

      //alert("Placeholder: I would try to search for " + $scope.searchTerm.title + " if I had a route");
      $state.go("search", {title: $scope.searchTerm.title});
  };

  $scope.clearSearch = function(){
    $scope.searchTerm="";

  };




}]);
