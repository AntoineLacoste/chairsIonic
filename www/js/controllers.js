angular.module('chairapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})
.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {
    // Login 
    $scope.loginData = {};
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };
    $scope.login = function() {
        $scope.modal.show();
    };
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        $timeout(function() {
          $scope.closeLogin();
      }, 1000);
    };
})
.controller('ListCtrl', function($scope, $rootScope, $http, localStorage, $state) {
    localStorage.init();
    var cart = 'cart';
    $scope.itemsToDisplay = [];
    $http.get( $rootScope.apiURL + '/chairs' ).then( function(res){
        $scope.itemsToDisplay = res.data.data;
            // Stockage de tous les items pour la recherche
            $rootScope.items = res.data.data;
        }, function(error){
            console.log(error);
        });
    $scope.get = function(){
        console.log(localStorage.get(cart));
    };
})
.controller('CartCtrl', function($scope, $stateParams, $http, localStorage, $rootScope) {
    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.cart = localStorage.get('cart');
    }, function(err){
        console.log('Erreur : ' + err);
    });

    $scope.form = {};
    $scope.form.titulary = "JOJO";
    $scope.form.number = 2343435151311254;
    $scope.form.expiration = "16/05/2017";
    $scope.form.cryptogram = '456';

    // $(document).ready(function(){
    //     $('.modal').modal({
    //         dismissible: true,
    //         opacity: .5,
    //         outDuration: 200,
    //         inDuration: 300,
    //         startingTop: '4%',
    //         endingTop: '10%'
    //     });
    // });

    $scope.deleteItem = function(reference){
        localStorage.remove(reference);
        $scope.cart = localStorage.get('cart');
        $scope.numberOfItems = localStorage.getNumberOfItems();
    };

    $scope.refreshCart = function(reference, qty){
        localStorage.refresh(reference, qty);
        $scope.numberOfItems = localStorage.getNumberOfItems();
    };

    // $scope.pay = function(){
    //     var info = {
    //         paiment: $scope.form,
    //         cart: $scope.cart
    //     };
    //     $http.post($rootScope.apiURL + '/paiment', info).then(function(res){
    //         $scope.validOrder = res.data.valid;
    //         if( res.data.valid ){
    //             $('#modal1').modal('open');
    //         }
    //         else{
    //             $scope.checkoutErrorMessage = res.data.message;
    //             $('#modal1').modal('open');
    //         }
    //     }, function(err){
    //         console.log('Erreur : ' + err);
    //     });
    // }
})
.controller('SingleCtrl', function($scope, $stateParams, $http, localStorage, $rootScope) {
    $http.get( $rootScope.apiURL + '/chairs/' + $stateParams.itemId).then(function (response) {
        $scope.article = response.data.data[0];
        console.log(response);
    },function (error) {
        console.log(error);
    });

    /*add the article to the cart*/
    $scope.addToCart = function () {
        localStorage.set($scope.article);
        $scope.numberOfItems = localStorage.getNumberOfItems();
    };
})