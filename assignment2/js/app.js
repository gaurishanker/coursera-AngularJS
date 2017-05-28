(function () {
    'use strict';
    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController",AlreadyBoughtController)
    .service("buy",BuyService);

    ToBuyController.$inject = ["buy"];
    function ToBuyController(buy) {
        var availableItems = this;
        availableItems.items = buy.getAvailableItems();
        availableItems.buyItem = function(index) {
            return buy.buyItem(index);
        }
    }

    AlreadyBoughtController.$inject = ["buy"];
    function AlreadyBoughtController(buy) {
        var boughtItems = this;
        boughtItems.items = buy.getBoughtItems();
    }


   function BuyService()
   {
      var service = this;
      var boughtItems = [];
      var AvailableItems = [ {
          name : "bananas",
          quantity : 10
      },
      {
          name : "chocolates",
          quantity : 20
      },
      {
          name : "cookies",
          quantity : 30
      },
      {
          name : "apples",
          quantity : 40
      },
      {
          name : "mangoes",
          quantity : 50
      }
       ];

      service.getAvailableItems = function() {
        return AvailableItems;
      }

      service.getBoughtItems = function() {
        return boughtItems;
      }

      service.buyItem = function(index) {
        var item = AvailableItems[index];
        boughtItems.push(item);
        AvailableItems.splice(index,1);
      }
   }

})();
