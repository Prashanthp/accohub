var app = angular.module('accolite', ['ngTagsInput']);


app.controller('MainCtrl', function($scope, $http, $timeout) {
	$scope.items  = [];  
	$scope.tags   	= [];
	$scope.likes   	= 3;
	//Initialise the products
	/* $http.get("https://hackerearth.0x10.info/api/accolite_product?type=json&query=list_product").then(function(response)
	{
		angular.forEach(response.data.menu,function(value,index){
			$scope.items.push(value);
		});	  
		return $scope.items;
	}); */
	
	$scope.$watch('tags.length', function(value) {
		if (value < 1){
			$scope.items = [];
			$http.get("https://hackerearth.0x10.info/api/accolite_product?type=json&query=list_product").then(function(response)
			{
				angular.forEach(response.data.menu,function(value,index){
					$scope.items.push(value);
				});	  
				return $scope.items;
			});
		}
	});   
  
	$scope.loadTags = function($query) {		
		$scope.items  = [];	
		$http.get("https://hackerearth.0x10.info/api/accolite_product?type=json&query=list_product").then(function(response)
		{
			angular.forEach(response.data.menu,function(value,index){
				angular.forEach(value.tags, function(val, tagsindex){					
					if(val.trim().toLowerCase() == $query.toLowerCase()){
						$scope.items.push(value);					
					}
				});
			});
		  
		});
		return $scope.items;
	};
  
	$scope.$watch('sort', function(radio) {
	   console.log(radio);
	});
 
  $scope.init = function(){
  	$timeout(function() {
		$('.rating').rating();
    }, 3000);
  }
 
 $scope.likes = function(){
  	$scope.likes ++;
  }
  $scope.onEnd = function(){
		$scope.rate = 4;
		$scope.max = 5;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
		};

		$scope.ratingStates = [
		{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
		{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
		{stateOn: 'glyphicon-heart'},
		{stateOff: 'glyphicon-off'}
		];
	};
			
  
});

app.directive("repeatEnd", function(){
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			if (scope.$last) {
				scope.$eval(attrs.repeatEnd);
			}
		}
	};
});
