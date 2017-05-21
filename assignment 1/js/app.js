(function () {
    'use strict';
    angular.module("myApp", [])
    .controller("myAppController", function ($scope) {
        $scope.name = "";
        $scope.msg = "";
        $scope.show = function () {
          var a = $scope.name.split(",");
          var count = 0;
          for(var index in a)
            if(a[index].trim() != "" )
              count++;
          console.log(count);
          if(count == 0)
            $scope.msg = "Please enter data first";
          else if(count > 0 && count < 3)
            $scope.msg = "Enjoy!";
          else if ( count >=3 )
            $scope.msg = "Too much!";
        }
        });
})();
