bookRouter.controller('NewListCtrl', ['$scope', '$http', '$state', 'AuthFac', function($scope, $http, $state, AuthFac){

  $scope.listing = {};

  console.log("Hello World from new list controller");


  $scope.addListing = function(){



      $http.post(serverBase+'/api/listings', {
        title: $scope.listing.title,
        author: $scope.listing.author,
        isbn: $scope.listing.isbn,
        cost: $scope.listing.cost,
        stat: "forSale",
        seller: AuthFac.currentUser()

      }).
      success(function(data)
      {

        console.log("put that listing in that database so hard. goin' home.");
        console.log(AuthFac.currentUser());
        $state.transitionTo('home');

      }).error(function(data)
      {

        alert("You didn't fill in forms.");
        console.log("error, WHAT DID YOU DO");

      })
    }



}]);
