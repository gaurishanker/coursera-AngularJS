(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController)
.service("DetailsService",DetailsService)
.constant("ApiBasePath","https://gaurishanker-week5.herokuapp.com");

SignUpController.$inject = ['DetailsService']
function SignUpController(DetailsService) {
  var myCtrl = this;
  myCtrl.completed = false;

  myCtrl.setDetails = function () {
    console.log(myCtrl);
    myCtrl.completed = true;
    return DetailsService.setDetails(myCtrl.user);
  }

  myCtrl.CheckValid = function() {
      DetailsService.CheckValid(myCtrl.user)
                  .then(function(response){
                      console.log(response.data);
                      myCtrl.validCat = true;
                  }).catch(function(error){
                      myCtrl.validCat = false;
                      console.log(error);
                  });
  }
}

DetailsService.$inject = ["$http","ApiBasePath"]
function DetailsService($http,ApiBasePath) {
  var service = this;

  service.setDetails = function(user) {
      service.user = user;
  }

  service.getItem = function() {
      if(service.user == undefined)
        return;
      return $http.get(ApiBasePath+"/menu_items/"+service.user.favCat+".json")
      .then(function(response){
          return response.data;
      });
  }

  service.CheckValid = function(user) {
      return $http({
          method : "GET",
          url : (ApiBasePath+"/menu_items/"+user.favCat+".json")
      });
  }

}

})();
