(function () {
    'use strict';
    angular.module("data")
    .service("MenuDataService",MenuDataService);

    MenuDataService.$inject = ["$http"];
    function MenuDataService($http) {
        console.log("ssss");
        var service = this;
        service.getAllCategories = function() {
          console.log("ppppppppppppppp");
            var promise = $http({
                url : " https://davids-restaurant.herokuapp.com/categories.json",
                method : "GET"
            });
            return promise;
        }

        service.getItemsForCategory = function(categoryShortName) {
            var promise = $http({
                url : "https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName,
                method : "GET"
            });
            console.log("promise",promise);
            return promise;
        }
    }
})();
