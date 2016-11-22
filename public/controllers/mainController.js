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

bookRouter.controller('EditCtrl', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state){

  $scope.listing="";
  if($stateParams.listingId !== "")
  {
    $scope.listId = $stateParams.listingId;
    $scope.route = "/api/listings/get/" + $scope.listId;

    $http.get($scope.route).success(function(response)
      {
        if(response)
        {
          $scope.listing = response;
          console.log("got dat data, filling in the edit form.");
        }
        else
        {
          alert("Your current route is invalid. The id you gave had no results. I'm going to route you back home.");
          $state.transitionTo('home');
        }
      })

    $scope.editListing = function()
    {

      $http.post('/api/listings/update', {
        listing_id: $scope.listId,
        title: $scope.listing.title,
        author: $scope.listing.author,
        isbn: $scope.listing.isbn,
        cost: $scope.listing.cost,
        stat: $scope.listing.stat

      }).success(function(data)
      {
          console.log("success, goin' home!");
          $state.transitionTo('home');
      }).error(function(data)
      {
          alert("You did something wrong.");
      })
    };
  }
  else
  {
    alert("Your current route is invalid. You need to include the listing id after the end slash. I'm going to route you back home.");
    $state.transitionTo('home');
  }
}]);

bookRouter.controller('NewListCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){

  $scope.listing = {};

  console.log("Hello World from new list controller");

  $scope.addListing = function(){

      if($scope.listing.title && $scope.listing.author && $scope.listing.isbn && $scope.listing.cost)
      {

      $http.post('/api/listings', {
        title: $scope.listing.title,
        author: $scope.listing.author,
        isbn: $scope.listing.isbn,
        cost: $scope.listing.cost,
        stat: "forSale"

      }).
      success(function(data)
      {

        console.log("put that listing in that database so hard. goin' home.");
        $state.transitionTo('home');

      }).error(function(data)
      {

        alert("You messed something up.");
        console.log("error, WHAT DID YOU DO");

      })
      }
      else{
        alert("fill in the form, what are you DOING");
      }
    };
  }
]);
