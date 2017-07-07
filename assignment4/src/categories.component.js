(function () {
    'use strict';

    angular.module("data")
    .controller("CategoryComponentController",CategoryComponentController)
    .component("categories", {
        templateUrl : "/coursera-AngularJS/assignment4/src/template/categories.html",
        bindings : {
             categories : "<"
        },
        controller : CategoryComponentController
    });

    CategoryComponentController.$inject = ['MenuDataService'];
    function CategoryComponentController(MenuDataService) {
        // console.log("popopo");
        var $ctrl = this;
        // ctrl.categories = categories;

        MenuDataService.getAllCategories().then(function(response){
              console.log(response.data);
              $ctrl.categories = response.data;
        }).catch(function(error) {
              console.log("error",error);
        });



    }
})();
