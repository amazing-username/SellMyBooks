var bookRouter = angular.module('bookRouter', ['ui.router']);

bookRouter.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'partial-home.html',
      controller: 'HomeCtrl'
    })

    .state('newlisting', {
      url: '/newlisting',
      templateUrl: 'partial-newlisting.html',
      controller: 'NewListCtrl'
    })

    .state('listall', {
      url: '/listall',
      templateUrl: 'partial-listall.html',
      controller: 'ListCtrl'
    })

    .state('anothertest', {
      url:'/anothertest',
      templateUrl: 'another-test.html'
    })

    .state('editlisting', {
      url: '/edit/:listingId',
      templateUrl: 'editlisting.html',
      controller: 'EditCtrl'
    })

    .state('test', {
      url: '/test',
      templateUrl: 'partial-test.html'
    });
});



bookRouter.controller('MainCtrl', ['$scope', '$http', function($scope, $http){


  console.log("Hello World from  main controller");



  }
]);

bookRouter.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){

  $scope.searchTerm="";
  console.log("Hello World from  home controller");

  $scope.searchBasic = function(){

      alert("Placeholder: I would try to search for " + $scope.searchTerm + " if I had a route");
      $scope.searchTerm="";
  };
}]);

bookRouter.controller('ListCtrl', ['$scope', '$http', function($scope, $http){


  console.log("Hello World from list controller");

  $http.get('http://localhost:3000/api/listings/get').success(function(response)
  {
    console.log("list controller - I got the data");
    $scope.booklist = response;
  })



  }
]);

bookRouter.controller('EditCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
  $scope.listId = $stateParams.listingId;
  $scope.route = "/api/listings/get/" + $scope.listId;
  $http.get($scope.route).success(function(response)
    {
      alert($scope.listId)
      alert(response);
      $scope.listing = response;
    })

    $scope.editListing = function(){

        $http.post('/api/listings/update', {
          listing_id: $scope.listId,
          title: $scope.listing.title,
          author: $scope.listing.author,
          isbn: $scope.listing.isbn,
          cost: $scope.listing.cost,
          stat: $scope.listing.stat

        }).
        success(function(data) {
          console.log("success");
        }).error(function(data) {
          console.log("error");

        })
        };
  }]);

bookRouter.controller('NewListCtrl', ['$scope', '$http', function($scope, $http){

  $scope.listing = {};

  console.log("Hello World from new list controller");

  $scope.addListing = function(){

      $http.post('/api/listings', {
        title: $scope.listing.title,
        author: $scope.listing.author,
        isbn: $scope.listing.isbn,
        cost: $scope.listing.cost,
        stat: "forSale"

      }).
      success(function(data) {
        console.log("success");
      }).error(function(data) {
        console.log("error");

      })
      };
  }
]);
