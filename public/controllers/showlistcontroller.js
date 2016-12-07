bookRouter.controller('ShowCtrl', ['$scope', '$http', '$stateParams', '$state', 'AuthFac', function($scope, $http, $stateParams, $state, AuthFac)
{
  $scope.pending=false;
  $scope.showMessageBox = false;
  $scope.listing="";
  if($stateParams.listingId !== "")
  {
    $scope.listId = $stateParams.listingId;
    $scope.route = serverBase+"/api/listings/get/" + $scope.listId;

    $scope.isLoggedIn=function(){
      if (AuthFac.isLoggedIn() == true) {
        return true;
      }
      else {
        return false;
      }
    }

    $http.get($scope.route).success(function(response)
      {
        if(response)
        {
          $scope.showlisting = response;
          console.log("got dat data, filling in the edit form.");
          if ($scope.showlisting.stat == "pending")
          {
            $scope.pending = true;
            console.log($scope.pending);
          }
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

  $scope.placeBuy = function(listingId)
  {
    var list = listingId;
    console.log("listingid   " + listingId);
    console.log("route: /api/listings/get/"+listingId);
    $scope.route = serverBase+"/api/listings/get/"+listingId;

    $http.get($scope.route).success(function(response)
      {
        if(response)
        {
          $scope.listing = response;
          var buyer = AuthFac.currentUser();
          alert(buyer);
          $http.post('/api/listings/update', {
            listing_id: $scope.listing._id,
            title: $scope.listing.title,
            author: $scope.listing.author,
            isbn: $scope.listing.isbn,
            cost: $scope.listing.cost,
            stat: "pending",
            buyers: buyer

          }).success(function(data)
          {
              console.log("success, goin' home!");
              $state.transitionTo('home');
          })

      }
})
}


  scope.checkMessageBox = function()
  {
    if ($scope.showMessageBox == true)
    {
      return true;
    }
    else {
      return false;
    }
  }
  scope.placeBuy = function(listingId)
  {
    $scope.messageTo = listingId;
    $scope.showMessageBox = true;
    $scope.checkMessageBox();
    $scope.messageSender=AuthFac.currentUser();
  };
  $scope.isPendingAndLogged = function(){
    if($scope.pending == true && AuthFac.isLoggedIn() == true)
    {
      return true;
    }
    else {
      return false;
    }
  };

  $scope.isLoggedNotPending = function(){
    if($scope.pending == false && AuthFac.isLoggedIn() == true)
    {
      return true;
    }
    else {
      {
        return false;
      }
    }
  };


}
]);
