(function(){
	var app = angular.module("storeDirective",[]);
	
	app.directive("peoplesCatalog", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/peoples-catalog.html"
		}
	});
	app.directive("peoplePage", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/people-page.html"
			
		}
	});
	app.directive("peopleHome", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/people-homeworld.html"
		}
	});
	app.directive("peopleSpecies", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/people-species.html"
		}
	});
	app.directive("peopleFilms", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/people-films.html"
		}
	});
	app.directive("peopleVehicles", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/people-vehicles.html"
		}
	});
	app.directive("peopleStarships", function(){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: "partial/people-starships.html"
		}
	});
})();