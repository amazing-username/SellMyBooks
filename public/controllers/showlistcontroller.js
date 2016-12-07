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

  $scope.placeBuy = function(listId)
  {
    $scope.lid = listId;

    $http.post(serverBase+'/api/listings/buy',
        {
          listing_id: $scope.lid,
          buyer_id: AuthFac.currentUser()



        }).
        success(function(data)
        {
          alert("The Offer Was Entered.");
          $state.redirectTo('search');

        }).
        error(function(data)
        {
          alert("Not Able To Place Offer.");




      })
};



  $scope.checkMessageBox = function()
  {
    if ($scope.showMessageBox == true)
    {
      return true;
    }
    else {
      return false;
    }
  }
  $scope.sendMessage = function(listingId)
  {
    $scope.messageTo = listingId;
    $scope.message={};
    $scope.showMessageBox = true;
    $scope.checkMessageBox();
    $scope.messageSender=AuthFac.currentUser();
  };
  $scope.submitMessage = function()
  {
    $http.post(serverBase+'/api/listings/message',
        {
          listing_id: $scope.messageTo,
          contact_id: $scope.messageSender,
          message: $scope.message.text

        }).
        success(function(data)
        {
          alert("You submitted the message.");
        }).error(function(data)
      {
        alert("Your message could not be sent.");
      })

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
  }


}
]);
