'use strict';

//service to store the cart in the local storage of the  browser
angular.module('chairapp.localstorage', [])
.service('localStorage', ['$q', function($q) {


	this.init = function () {
		if(this.get() === null){
			var LS = [];
			localStorage.setItem('cart', JSON.stringify(LS));
		}
	};

	this.get = function(){
		return JSON.parse(localStorage.getItem('cart'));
	};
	
	this.reset = function(){
		var LS = [];
		localStorage.setItem('cart', JSON.stringify(LS));
	}

	this.set = function(item){
		var defer = $q.defer();
		var currentCart = this.get();
		var added = false;
		if(currentCart != null){
			for(var i=0; i<currentCart.length;i++){
				if(currentCart[i].reference == item.reference){
					currentCart[i].qty++;
					added = true;
				}
			}
			if(!added){
				var itemToAdd = item;
				itemToAdd.qty = 1;
				currentCart.push(itemToAdd);
			}
		}
		else{
			currentCart = [];
			var itemToAdd = item;
			itemToAdd.qty = 1;
			currentCart.push(itemToAdd);
		}
		localStorage.setItem('cart', JSON.stringify(currentCart));
		console.log('--- set LocalStorage Done ---');
		defer.resolve();
		return defer.promise;
	};

	this.getTotalOfOrder = function(){
		var items = JSON.parse(localStorage.getItem('cart'));
		var total = 0;
		angular.forEach(items, function(item){
			total += item.price * item.qty;
		});
		return total;
	}

	this.getNumberOfItems = function(){
		var items = JSON.parse(localStorage.getItem('cart'));
		var numberOfItems = 0;
		items.forEach(function(item){
			numberOfItems += item.qty;
		});
		return numberOfItems;
	}

	this.remove = function(reference){
		var defer = $q.defer();
		var currentCart = this.get();
		if(currentCart != null){
			for(var i=0; i<currentCart.length;i++){
				if(currentCart[i].reference == reference){
					currentCart.splice(i, 1);
					localStorage.setItem('cart', JSON.stringify(currentCart));
					return;
				}
			}
		}
		console.log('--- Remove LocalStorage Done ---');
		defer.resolve();
		return defer.promise;
	}

	this.refresh = function(reference, qty){
		var defer = $q.defer();
		var currentCart = this.get();
		if(currentCart != null){
			for(var i=0; i<currentCart.length;i++){
				if(currentCart[i].reference == reference){
					currentCart[i].qty = qty;
					localStorage.setItem('cart', JSON.stringify(currentCart));
					return;
				}
			}
		}
		console.log('--- Refresh LocalStorage Done ---');
		defer.resolve();
		return defer.promise;
	}
}]);
