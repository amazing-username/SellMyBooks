var bookRouter = angular.module('bookRouter', ['ui.router']);


//State handler for page nav
bookRouter.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html'
      //controller: 'MainCtrl'
    })

    .state('newlisting', {
      url: '/newlisting',
      templateUrl: 'partial-newlisting.html'
    })

    .state('listall', {
      url: '/listall',
      templateUrl: 'partial-listall.html',
      controller: 'MainCtrl'


    })

    .state('test', {
      url: '/test',
      templateUrl: 'partial-test.html',
    })

});
