angular.module('chairapp', ['ionic', 'chairapp.controllers', 'chairapp.localstorage', 'chairapp.search'])

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
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    .state('tab.list', {
        url: '/list',
        views: {
            'tab-list': {
                templateUrl: 'templates/tab-list.html',
                controller: 'ListCtrl',
            }
        }
    })
    .state('tab.single', {
        url: '/item/:itemId',
        views: {
            'tab-list': {
                templateUrl: 'templates/tab-list-single.html',
                controller: 'SingleCtrl'
            }
        }
    })
    .state('tab.cart', {
        url: '/cart',
        views: {
            'tab-cart': {
                templateUrl: 'templates/tab-cart.html',
                controller: 'CartCtrl'
            }
        }
    })
    .state('tab.payment', {
        url: '/payment',
        views: {
            'tab-cart': {
                templateUrl: 'templates/tab-cart-payment.html',
                controller: 'PaymentCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/tab/list');
});
