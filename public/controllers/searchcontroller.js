bookRouter.controller('SearchCtrl', ['$scope', '$http', '$state', '$stateParams', 'AuthFac', function($scope, $http, $state, $stateParams, AuthFac){


  console.log("Hello World from  searcg controller");
  console.log($stateParams);
  console.log("stateParamstitle= " + $stateParams.title);


  $scope.searchTerms = {};
  $scope.listing= {};
  $scope.searchResults = {};
  $scope.searchCriteria = {};
  $scope.noResults = true;
  $scope.resultNumber=0;
  $scope.pendingTable = [];

  $scope.increaseCount = function()
  {
    $scope.resultCount+=1;
  };

  $scope.addToTable = function()
  {
    };

  $scope.checkPending = function(index)
  {
    console.log("checkpending received: " + index);
    console.log($scope.pendingTable[index]);

    if ($scope.pendingTable[index]==true)
    {
        console.log("checkpending returning: " + "eachAttributeTitleDisabled");
      return "eachAttributeTitleDisabled";
    }
    else {
      return "eachAttributeTitle";
    }


  };
  $scope.eachPending = function(index)
  {
    console.log("checkpending received: " + index);
    console.log($scope.pendingTable[index]);

    if ($scope.pendingTable[index]==true)
    {
        console.log("checkpending returning: " + "eachAttributeTitleDisabled");
      return "eachlistingpending";
    }
    else {
      return "eachListing";
    }


  };
  $scope.pendingTF = function(index)
  {
    return $scope.pendingTable[index];
  }



  $scope.searchListing = function()
  {
      $scope.resultCount=0;
      $scope.searchTerms = {};

      if($scope.listing.title)
      {
          if($scope.listing.title !== "")
          {
            $scope.searchTerms.title = $scope.listing.title;
          }
          else{
            $scope.listing.title={};
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
          if ($scope.listing.cost == 0 || $scope.listing.cost == "")
          {
            $scope.listing.cost=null;
          }
          else
          {
            $scope.searchTerms.cost = $scope.listing.cost;
          }
      }

      if(AuthFac.isLoggedIn())
      {
        $scope.searchTerms.seller = AuthFac.currentUser();
      }

      $http.post(serverBase+'/api/listings/get/search',
          {
            title: $scope.searchTerms.title,
            author: $scope.searchTerms.author,
            isbn: $scope.searchTerms.isbn,
            cost: $scope.searchTerms.cost,
            seller: $scope.searchTerms.seller,

          }).
          success(function(data)
          {
            $scope.searchResults = data;
            $scope.noResults = false;
            $scope.pendingTable = [];
            $scope.resultNumber = 0;


            angular.forEach($scope.searchResults, function(value,index){
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




              try{  console.log($scope.searchResults[0].title); console.log("Got some results.");}
                catch (err){console.log(err.name + ': "' + err.message + " which means no results");
                $scope.noResults = true;}

            console.log(data);
            console.log("got data back from search.");

          }).error(function(data)
          {

            alert("Your search is not generating any results");
            console.log("error, WHAT DID YOU DO");

          })
      };













  if($stateParams.title != "")
  {

    $scope.listing.title=$stateParams.title;
    $scope.searchListing();
  }
  else {
    $scope.searchListing();
  }




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

  $scope.noResultsCheck();

  }]);
