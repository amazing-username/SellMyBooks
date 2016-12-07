var bookRouter = angular.module('bookRouter', ['ui.router']);

bookRouter.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'partial-home.html',
      controller: 'HomeCtrl'
    })

    .state('search', {
      url: '/search/:title',
      templateUrl: 'search.html',
      controller: 'SearchCtrl'
    })

    .state('userhome', {
      url: '/uhome',
      templateUrl: 'userhome.html',
      controller: 'UserHomeCtrl'
    })

    .state('newlisting', {
      url: '/newlisting',
      templateUrl: 'partial-newlisting.html',
      controller: 'NewListCtrl'
    })

    .state('editlisting', {
      url: '/edit/:listingId',
      templateUrl: 'editlisting.html',
      controller: 'EditCtrl'
    })

    .state('showlisting', {
      url: '/show/{listingId}',
      templateUrl: 'showlisting.html',
      controller: 'ShowCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'register.html',
      controller: 'RegisterCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginCtrl'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'logout.html',
      controller: 'LogoutCtrl'
    });
});




bookRouter.controller('MainCtrl', ['$scope', '$http', 'AuthFac', function($scope, $http, AuthFac){


  console.log("Hello World from  main controller");

  $scope.getLoginStatus = function() {
    if(AuthFac.isLoggedIn() ){
      return true;
    }
    else {
      return false;
    }
  };
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





  }
]);
