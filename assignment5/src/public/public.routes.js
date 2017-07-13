(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: '/coursera-AngularJS/assignment5/src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: '/coursera-AngularJS/assignment5/src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: '/coursera-AngularJS/assignment5/src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: '/coursera-AngularJS/assignment5/src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signUp', {
      url: '/signUp',
      templateUrl: '/coursera-AngularJS/assignment5/src/public/signUp/signUp.html',
      controller: 'SignUpController'
    })
    .state('public.info',{
        url: '/myInfo',
        templateUrl : '/coursera-AngularJS/assignment5/src/public/info/info.html',
        controller : 'InfoController'
    });
}
})();
