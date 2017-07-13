(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController)
.constant("ApiBasePath","https://gaurishanker-week5.herokuapp.com");

InfoController.$inject= ['DetailsService','ApiBasePath'];
function InfoController(DetailsService,ApiBasePath) {
    var ctrl = this;
    ctrl.user;
    ctrl.basepath = ApiBasePath;
    var promise = DetailsService.getItem();
    if(promise == undefined)
        console.log(promise);
    else {
      promise.then(function(res){
          console.log(res);
          ctrl.item = res;
          console.log(ctrl.item);
          ctrl.user = DetailsService.user;
      })
    }


}

})();
