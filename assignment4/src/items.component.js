(function () {
    'use strict';

    angular.module("data")
    .component("items", {
        templateUrl : "/src/template/items.html",
        bindings : {
            items : "<"
        },
        controller : "ItemsController as itemDetail"
    })
    .controller("ItemsController",ItemsController);

    ItemsController.$inject=["$stateParams","MenuDataService"];
    function ItemsController($stateParams,MenuDataService) {
      console.log($stateParams);
      var ctrl = this;
      var items = MenuDataService.getItemsForCategory($stateParams.itemId);
      console.log("items",items);
      items.then(function(response) {
          console.log(response);
          ctrl.menu_items = response.data.menu_items;
      });
    }
})();
