angular.module('chairapp.controllers', [])

.controller('AppCtrl', function() {
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
.controller('CartCtrl', function($scope, $stateParams, $http, localStorage, $rootScope, $state) {
    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.cart = localStorage.get('cart');
        $scope.totalPrice = localStorage.getTotalOfOrder();
        $scope.numberOfItems = localStorage.getNumberOfItems();
    }, function(err){
        console.log('Erreur : ' + err);
    });

    $scope.deleteItem = function(reference){
        localStorage.remove(reference);
        $scope.cart = localStorage.get('cart');
        $scope.numberOfItems = localStorage.getNumberOfItems();
        $scope.totalPrice = localStorage.getTotalOfOrder();
    };

    $scope.refreshCart = function(reference, qty, index){
        console.log('toto');
        localStorage.refresh(reference, qty);
        $scope.cart[index].qty = qty;
        $scope.numberOfItems = localStorage.getNumberOfItems();
        $scope.totalPrice = localStorage.getTotalOfOrder();
    };

    $scope.goToPayment = function(){
        $state.go('app.payment');
    }
})
.controller('SingleCtrl', function($scope, $stateParams, $http, localStorage, $rootScope,  $ionicPopup) {
    $http.get( $rootScope.apiURL + '/chairs/' + $stateParams.itemId).then(function (response) {
        $scope.article = response.data.data[0];
        console.log(response);
    },function (error) {
        console.log(error);
    });

    /*add the article to the cart*/
    $scope.addToCart = function () {
        localStorage.set($scope.article);
        $ionicPopup.alert({
            title: "Ajout au panier",
            template: "L'article à bien été ajouté au panier."
        });
    };
})
.controller('PaymentCtrl', function($scope, $http, localStorage, $rootScope, $ionicPopup) {
    $scope.form = {
        titulary: "JOJO",
        number: 2343435151311254,
        expiration: "16/05/2017",
        cryptogram: '456'
    };

    var showAlert = function(title, template) {
        $ionicPopup.alert({
            title: title,
            template: template
        });
    };

    $scope.pay = function(){
        var infos = {
            paiment: $scope.form,
            cart: localStorage.get('cart')
        };
        $http.post($rootScope.apiURL + '/paiment', infos).then(function(res){
            $scope.validOrder = res.data.valid;
            if( res.data.valid ){
                showAlert('Commande validée', 'Votre commande a été enregistrée avec succès');
            }
            else{
                showAlert('Commande échouée', res.data.message);
            }
        }, function(err){
            console.log(err);
        });
    }
})