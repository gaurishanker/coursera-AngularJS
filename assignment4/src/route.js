(function () {
    'use strict';

    angular.module("MenuApp")
    .config(RouteConfig);

    RouteConfig.$inject = ["$stateProvider","$urlRouterProvider"];
    function RouteConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("categories",{
            url : "/categories",
            templateUrl : "src/template/tab1.html",
            controller : "CategoryComponentController as ctrl"//,
            // reslove : {
            //   categories : ['MenuDataService', function(MenuDataService) {
            //         console.log("here");
            //       return MenuDataService.getAllCategories();
            //   }]
            // }
        })
        .state("home",{
            url : "/home",
            templateUrl : "/src/template/home-template.html"
        })
        .state("items",{
            url : "/item/{itemId}",
            templateUrl : "/src/template/itemsTab.html",
            controller : "ItemsController",
            resolve : {
                item : ["$stateParams","MenuDataService",function($stateParams,MenuDataService) {
                      var items = MenuDataService.getItemsForCategory($stateParams.itemId);
                      console.log("items",items);
                      items.then(function(response) {
                          console.log(response);
                          return response.data.menu_items;
                      });
                }]
            }
        });
    }

})();
