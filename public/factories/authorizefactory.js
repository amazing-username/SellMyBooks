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
      return $http.post(serverBase+'/users/register', user).success(function(data){
        AuthFac.saveToken(data.token);
      });
    };
    return AuthFac;

});
