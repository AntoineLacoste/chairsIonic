'use strict';

angular.module('chairapp.search', [])
.directive('search', [ function () {
	return {
		templateUrl : 'js/directive/search.html',
		restrict: 'E',
		controller : ['$scope', '$rootScope', function($scope, $rootScope){
			var newItems = [];

			$scope.searchItems = function(){
			if($scope.search != ''){
				newItems = [];
				angular.forEach($rootScope.items, function(item){
					if(item.name.toLowerCase().search($scope.search.toLowerCase()) >= 0){
						newItems.push(item);
					}
				});
				$scope.itemsToDisplay = newItems;
			}
			else{
				$scope.itemsToDisplay = $rootScope.items;
			}
		};
	}]
}
}]);