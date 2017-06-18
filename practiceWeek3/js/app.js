(function(){
  'use strict';

angular.module("shoppingListApp",[])
.controller("shoppingListController1",ShoppingListController1)
.controller("shoppingListController2",ShoppingListController2)
.service("shoppingListService",ShoppingListService)
.factory("listFactory",ListFactory)
//.service("weight",WeightLossFilterService
// .directive("listItemDesc",ListItemDesc)
.directive("listItem",ListItem);

function ListItem() {
  var ddo = {
    templateUrl : "temp.html",
    scope : {
      list : "<",
      myMethod : "&"
    },
    controller : ShoppingListDirectiveController,
    controllerAs : 'mylist',
    bindToController : true
  };
  return ddo;
}

 function ShoppingListDirectiveController() {
//   var directivelist = this;
//   console.log(directivelist);
//   directivelist.cookiesInList = function () {
//     for (var i = 0; i < directivelist.list.length; i++) {
//       var name = directivelist.list[i].name;
//       if (name.toLowerCase().indexOf("cookie") !== -1) {
//         return true;
//       }
//     }
//
//     return false;
//   };
 }
// function ListItemDesc() {
//   var ddo = {
//       template : "{{ item.qty }} kg {{ item.name }}"
//   };
//   return ddo;
// }

ShoppingListController1.$inject=["listFactory"];
function ShoppingListController1(listFactory) {
    var list = this;
    var shoppingListService = listFactory();
    list.itemList = shoppingListService.getItems();
    list.name = "";
    list.qty = "";
    list.addItem = function() {
        shoppingListService.addItem(list.name,list.qty);
        console.log(list.itemList);
    }
    list.remove = function(index) {
      console.log(this);
        shoppingListService.remove(index);
    }
}

ShoppingListController2.$inject=["listFactory"];
function ShoppingListController2(listFactory) {
    var list = this;
    var shoppingListService = listFactory(3);
    list.itemList = shoppingListService.getItems();
    list.name = "";
    list.qty = "";
    list.addItem = function() {
      try{
        shoppingListService.addItem(list.name,list.qty)
      }catch(error){
        list.message = error.message;
        console.log(error.message);
      }

    }
    list.remove = function(index) {
        shoppingListService.remove(index);
    }
}

ShoppingListService.$inject = ["maxItems"];
function ShoppingListService(maxItems) {
  var service =this;
  var items = [];
  service.addItem = function(name,qty) {
    if ((maxItems === undefined) ||
       (maxItems !== undefined) && (items.length < maxItems)) {
     var item = {
       name: name,
       qty: qty
     };
     items.push(item);
   }
   else {
     throw new Error("Max items (" + maxItems + ") reached.");
   }
  }

  service.getItems = function () {
      return items;
    }

  service.remove = function(index) {
    items.splice(index,1);
  }
}

// ShoppingListService.$inject = ["weight","$q"];
// function ShoppingListService(weight,$q)
// {
//   var service = this;
//   var items = []
//   service.addItem = function (name,qty) {
//       $q.all([weight.checkName(name),weight.checkQty(qty)])
//       .then(function(response) {
//         var item = { name : name,qty :qty};
//         items.push(item);
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//
//   }
//   service.getItems = function () {
//     return items;
//   }
//
//   service.remove = function(index) {
//     items.splice(index,1);
//   }
// }

// WeightLossFilterService.$inject = ["$q","$timeout"]
// function WeightLossFilterService($q,$timeout)
// {
//     var service = this;
//
//     service.checkName = function (name) {
//
//       var deferred = $q.defer();
//       var result = "";
//
//       $timeout(function () {
//         if(name.toLowerCase().indexOf("apple")==-1)
//           deferred.resolve(result);
//         else {
//           result = "Apple Detected";
//           deferred.reject(result);
//         }
//       }, 2000);
//       return deferred.promise;
//     }
//
//     service.checkQty = function (qty) {
//
//       var deferred = $q.defer();
//       var result = "";
//
//       $timeout(function () {
//         if(qty<5)
//           deferred.resolve(result);
//         else {
//           result = "Too much!!";
//           deferred.reject(result);
//         }
//       }, 1000);
//       return deferred.promise;
//     }
// }

function ListFactory() {
  var factory = function(maxItems) {
    return new ShoppingListService(maxItems);
  }
  return factory;
}

})();
