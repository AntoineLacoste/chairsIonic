angular.module('chairapp', ['ionic', 'chairapp.controllers', 'chairapp.localstorage'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
.run( function($rootScope){
    $rootScope.apiURL = 'http://localhost:1337/api';
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.list', {
        url: '/list',
        views: {
            'menuContent': {
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl',
            }
        }
    })
    .state('app.single', {
        url: '/item/:itemId',
        views: {
            'menuContent': {
                templateUrl: 'templates/single.html',
                controller: 'SingleCtrl'
            }
        }
    })
    .state('app.cart', {
        url: '/cart',
        views: {
            'menuContent': {
                templateUrl: 'templates/cart.html',
                controller: 'CartCtrl'
            }
        }
    })
    .state('app.payment', {
        url: '/payment',
        views: {
            'menuContent': {
                templateUrl: 'templates/payment.html',
                controller: 'PaymentCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/app/list');
});
