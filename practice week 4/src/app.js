(function () {

  'use strict';
  angular.module("myApp",['ui.router'])
  .config(RouterConfig)
  .controller("ShoppingListController",ShoppingListController)
  .service("myService",MyService)
  .component("listComponent",{
    templateUrl: "template.html",
    controller : ListComponentController,
    bindings : {
      items : "<",
      onRemove : "&"
    }
  });

  function ListComponentController(){

  }

  RouterConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RouterConfig($stateProvider , $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tab1');
    $stateProvider
    .state('tab1',{
      url : "/tab1",
      templateUrl : '/src/tab1.html'
    })
    .state('tab2',{
      url : "/tab2",
      templateUrl : '/src/tab2.html'
    });
  }

  ShoppingListController.$inject = ["myService"]
  function ShoppingListController(myService) {
    var ctrl = this;
    ctrl.items = myService.getItems();
    console.log("items ",ctrl.items);
    ctrl.addItem = function(name,qty) {
      console.log("herer");
      myService.addItem(name,qty);
      console.log(ctrl.items);
    }
    ctrl.removeItem = function(index) {
      myService.removeItem(index);
    }
  }

  function MyService() {
    var service = this;
    var items = [];
    service.getItems = function() {
      return items;
    }

    service.addItem = function(name,qty) {
      if(name != "" && qty != "") {
        var item = {name : name, qty : qty};
        items.push(item);
        console.log("po");
      }
    }

    service.removeItem = function(index) {
      items.splice(index,1);
    }
  }
})();
