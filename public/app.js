var bookRouter = angular.module('bookRouter', ['ui.router']);


//State handler for page nav
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
