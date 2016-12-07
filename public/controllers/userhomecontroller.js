bookRouter.controller('UserHomeCtrl', ['$scope', '$http', '$state', 'AuthFac', function($scope, $http, $state, AuthFac){


  console.log("Hello World from  login controller");
  $scope.user= {};
  $scope.noResults = true;
  $scope.noResultsSold = true;
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

  $scope.increaseCount = function()
  {
    $scope.resultCount+=1;
  };

  $scope.pendingTF = function(index)
  {
    return $scope.pendingTable[index];
  };


  $scope.acceptBuy = function(listingId)
  {
    var list = listingId;
    console.log("listingid   " + listingId);
    console.log("route: /api/listings/get/"+listingId);
    $scope.route = "/api/listings/get/"+listingId;

    $http.get($scope.route).success(function(response)
      {
        if(response)
        {
          $scope.listing = response;
        //  var buyer = AuthFac.currentUser();
        //  alert(buyer);
          $http.post('/api/listings/update', {
            listing_id: $scope.listing._id,
            title: $scope.listing.title,
            author: $scope.listing.author,
            isbn: $scope.listing.isbn,
            cost: $scope.listing.cost,
            stat: "sold",
            buyers: $scope.listing.buyers

          }).success(function(data)
          {
              console.log("success, goin' home!");
              $state.transitionTo('home');
          })

      }
})
};

  $http.post('/api/listings/get/foruser',
      {
        seller: AuthFac.currentUser()
      }).
      success(function(data)
      {
        $scope.usersListings = data;
        console.log(data);
        console.log("got data back from search.");


        $scope.pendingTable = [];
        $scope.resultNumber = 0;


        angular.forEach($scope.usersListings, function(value,index){
          if(value.stat == "pending")
          {
            $scope.pendingTable.push(true);
          }
          else {
            $scope.pendingTable.push(false);
          }

          //alert(value.stat);
          console.log($scope.pendingTable);
          $scope.increaseCount();
      })


      try{  console.log($scope.usersListings[0].title); console.log("Got some results."); $scope.noResults = false;}
        catch (err){console.log(err.name + ': "' + err.message + " which means no results");
        $scope.noResults = true;}


      })
      .error(function(data)
      {

        //alert("You messed something up.");
        console.log("error, WHAT DID YOU DO");

      })


      $http.post('/api/listings/get/forusersold',
          {
            seller: AuthFac.currentUser()
          }).
          success(function(data)
          {
            $scope.usersListingsSold = data;
            console.log(data);
            console.log("got data back from search.");


            





          try{  console.log($scope.usersListingsSold[0].title); console.log("Got some results."); $scope.noResultsSold = false;}
            catch (err){console.log(err.name + ': "' + err.message + " which means no results");
            $scope.noResultsSold = true;}


          })
          .error(function(data)
          {

            //alert("You messed something up.");
            console.log("error, WHAT DID YOU DO");

          })

          $scope.noResultsCheck = function(){
            if ($scope.noResults == true)
            {
              console.log(" noResults var is set to true");
              return true;
            }
            else
            {
              console.log(" noResults var is set to false");

              return false;
            }
          };
          $scope.noResultsSoldCheck = function(){
            if ($scope.noResultsSold == true)
            {
              console.log(" noResultsSold var is set to true");
              return true;
            }
            else
            {
              console.log(" noResultsSold var is set to false");

              return false;
            }
          };

          $scope.noResultsCheck();
          $scope.noResultsSoldCheck();




    }]);
