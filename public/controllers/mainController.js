var bookRouter = angular.module('bookRouter', ['ui.router']);

bookRouter.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'partial-home.html',
      //controller: 'MainCtrl'
    })

    .state('home.newlisting', {
      url: '/newlisting',
      templateUrl: 'partial-newlisting.html'
    })

    .state('test', {
      url: '/test',
      templateUrl: 'partial-test.html'
    });
});

bookRouter.controller('MainCtrl', ['$scope', '$http', function($scope, $http){


  console.log("Hello World from controller")

  $http.get('http://localhost:3000/api/listings/get').success(function(response)
  {
    console.log("I got the data");
    $scope.booklist = response;
  })

  }
]);

//http://45.55.137.42:3000
