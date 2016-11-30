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
    })

    .state('test', {
      url: '/test',
      templateUrl: 'partial-test.html'
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


bookRouter.controller('UserHomeCtrl', ['$scope', '$http', '$state', 'AuthFac', function($scope, $http, $state, AuthFac){


  console.log("Hello World from  login controller");
  $scope.user= {};
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
  $http.post('/api/listings/get/foruser', {
        seller: AuthFac.currentUser()
      }).
      success(function(data)
      {
        $scope.usersListings = data;
        console.log(data);
        console.log("got data back from search.");

      }).error(function(data)
      {

        alert("You messed something up.");
        console.log("error, WHAT DID YOU DO");

      })

    }]);


bookRouter.controller('LoginCtrl', ['$scope', '$http', '$state', 'AuthFac', function($scope, $http, $state, AuthFac){
  console.log("Hello World from  login controller");
 $scope.user= {};
 $scope.loginUser = function()
 {
   console.log('register function');
   console.log($scope.user.username);
   console.log($scope.user.password);

   $http.post('/users/login', {
     username: $scope.user.username,
     password: $scope.user.password
   }).success(function(data)
   {
       console.log("success, goin' home!");

       AuthFac.saveToken(data.token);
       $state.transitionTo('home');
   }).error(function(data)
   {
       alert("You did something wrong.");
   })

 };
}]);

bookRouter.controller('LogoutCtrl', ['$scope', '$http', '$state', '$window', 'AuthFac', function($scope, $http, $state, $window, AuthFac){


  console.log("Hello World from  logout controller");
  $http.get('http://localhost:3000/users/logout').success(function(response)
  {
    console.log("logged out");
  })
  $window.localStorage.removeItem('sellbookstoken');
  alert("Logged Out!");
  $state.transitionTo('home');

}]);

bookRouter.controller('RegisterCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){


  console.log("Hello World from  register controller");
  $scope.user= {};
  $scope.addUser = function()
  {
    console.log('register function');
    console.log($scope.user.username);
    console.log($scope.user.password);

    $http.post('/users/register', {
      username: $scope.user.username,
      password: $scope.user.password
    }).success(function(data)
    {
        console.log("success, goin' home!");
        $state.transitionTo('home');
    }).error(function(data)
    {
        alert("You did something wrong.");
    })

  };

}]);

bookRouter.controller('SearchCtrl', ['$scope', '$http', '$state', '$stateParams', 'AuthFac', function($scope, $http, $state, $stateParams, AuthFac){


  console.log("Hello World from  searcg controller");
  console.log($stateParams);
  console.log("stateParamstitle= " + $stateParams.title);
  $scope.searchTerms = {};
  $scope.listing= {};
  $scope.searchResults = {};
  $scope.searchCriteria = {};
  $scope.noResults = true;
  $scope.searchListing = function()
  {

    $scope.searchTerms = {};

    if($scope.listing.title)
    {
      if($scope.listing.title !== "")
      {
        $scope.searchTerms.title = $scope.listing.title;
      }
    }
    if($scope.listing.author)
    {
      if($scope.listing.author !== "")
      {
        $scope.searchTerms.author = $scope.listing.author;
      }
    }
    if($scope.listing.isbn)
    {
      if($scope.listing.isbn !== "")
      {
        $scope.searchTerms.isbn = $scope.listing.isbn;
      }
    }
    if($scope.listing.cost)
    {
      $scope.searchTerms.cost = $scope.listing.cost;
    }
    if(AuthFac.isLoggedIn())
    {
      $scope.searchTerms.seller = AuthFac.currentUser();
    }
    //alert($scope.searchTerms.seller);
    $http.post('/api/listings/get/search', {
          title: $scope.searchTerms.title,
          author: $scope.searchTerms.author,
          isbn: $scope.searchTerms.isbn,
          cost: $scope.searchTerms.cost,
          seller: $scope.searchTerms.seller,
          stat: "forSale"
        }).
        success(function(data)
        {
          $scope.searchResults = data;
          $scope.noResults = false;

        try{  console.log($scope.searchResults[0].title); console.log("Got some results.");} 
          catch (err){console.log(err.name + ': "' + err.message + " which means no results");
          $scope.noResults = true;}

          console.log(data);
          console.log("got data back from search.");

        }).error(function(data)
        {

          alert("You messed something up.");
          console.log("error, WHAT DID YOU DO");

        })

      };
  if($stateParams.title != "")
  {

    $scope.listing.title=$stateParams.title;
    $scope.searchListing();
  }

  $scope.noResultsCheck = function(){
    if ($scope.noResults == true)
    {
      console.log(" noResults var is set to true");
      return true;
    }
    else{
      console.log(" noResults var is set to false");

      return false;
    }
  };
  $scope.noResultsCheck();


}]);

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

bookRouter.controller('ListCtrl', ['$scope', '$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams){


  console.log("Hello World from list controller");

  //console.log($scope.showListing.author);

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

bookRouter.controller('ShowCtrl', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state)
{
  $scope.listing="";
  if($stateParams.listingId !== "")
  {
    $scope.listId = $stateParams.listingId;
    $scope.route = "/api/listings/get/" + $scope.listId;

    $http.get($scope.route).success(function(response)
      {
        if(response)
        {
          $scope.showlisting = response;
          console.log("got dat data, filling in the edit form.");
        }
        else
        {
          alert("Your current route is invalid. The id you gave had no results. I'm going to route you back home.");
          $state.transitionTo('home');
        }
      })


  }
  else
  {
    alert("Your current route is invalid. You need to include the listing id after the end slash. I'm going to route you back home.");
    $state.transitionTo('home');
  }
}]);

bookRouter.controller('NewListCtrl', ['$scope', '$http', '$state', 'AuthFac', function($scope, $http, $state, AuthFac){

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


bookRouter.factory('AuthFac', function ($http, $window){

    var AuthFac = {};
    AuthFac.saveToken = function (token){
      $window.localStorage['sellbookstoken'] = token;
    };
    AuthFac.getToken = function(){
      return $window.localStorage['sellbookstoken'];
    };
    AuthFac.isLoggedIn = function(){
      var token = AuthFac.getToken();
      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };
    AuthFac.currentUser = function(){
      if(AuthFac.isLoggedIn()){
        var token = AuthFac.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.username;
      }
    };
    AuthFac.register = function(user){
      return $http.post('/users/register', user).success(function(data){
        AuthFac.saveToken(data.token);
      });
    };
    return AuthFac;

});
