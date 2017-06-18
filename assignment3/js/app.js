(function(){
  'use strict';

  angular.module("NarrowItDownApp",[])
  .controller("NarrowItDownController",NarrowItDownController)
  .service("MenuItemsService",MenuItemsService)
  .directive("myList",MyList);

  function MyList() {
    var ddo = {
        templateUrl : 'temp.html',
        scope : {
           list : "<" ,
           onRemove: "&"
         },
        controller : ItemController,
        controllerAs : 'myList',
        bindToController : true
    };
    return ddo;
  }

  function ItemController() {

  }

  NarrowItDownController.$inject=["MenuItemsService"];
  function NarrowItDownController(MenuItemsService) {
    var cont = this;

    cont.getList = function(name){
      cont.menuItems = MenuItemsService.getMenuItems(name);
    }

    cont.removeItem = function(index){
      console.log("'this' is: ", index);
      MenuItemsService.removeItem(index);
    }
  }


  MenuItemsService.$inject = ["$http"]
  function MenuItemsService($http)
  {
    var service = this;
    var found = [];
    service.getMenuItems = function(name) {
      found.splice(0,found.length);
      var response = $http({
        url : "https://davids-restaurant.herokuapp.com/menu_items.json",
        method :"GET"
      }).then(function(response){
        console.log(response.data.menu_items.length);
        var menu=response.data.menu_items;

        console.log(name);
        for(var item of menu)
        {
            if(item.description.toLowerCase().indexOf(name)!=-1)
              found.push(item);
        }
        console.log(found);
      })
      .catch(function(error){
        console.log("error occured");
      });
      return found;
    }

    service.removeItem = function (itemIndex) {
      console.log("here");
      found.splice(itemIndex, 1);
    };

  }

})();
