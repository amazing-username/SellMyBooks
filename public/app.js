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

    .state('test', {
      url: '/test',
      templateUrl: 'partial-test.html'
    });
});


app.controller('MainCtrl', [
  '$scope',
  function($scope){

  }
]);
