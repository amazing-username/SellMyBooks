var app = angular.module('bookApp', []);
var bookRouter = angular.module('bookRouter', ['ui.router']);


//State handler for page nav
bookRouter.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'partial-home.html'
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


app.controller('MainCtrl', [
  '$scope',
  function($scope){
    $scope.test="test stuff";
    $scope.listings = $http.get('/listings').success(function(data){
      angular.copy(data)
    })

  }
]);
