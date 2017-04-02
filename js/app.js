(function(){
	var app = angular.module("store",["storeDirective"]);
	app.factory('httpq', function($http, $q){
		return{
			get: function(){
				var deffered = $q.defer();
				$http.get.apply(null, arguments)
					.then(deffered.resolve)
					.catch(deffered.resolve);
				return deffered.promise;
			}
		}
	});


	/*Объявление контроллера*/
	app.controller("StoreController", function(httpq){
		/*---------------------------------------------*/
		
		var store = this;
		store.peoples = [];
		store.gender = "";
		var pageData = {};
		store.pageData = pageData;
		this.navListId = 1;/*<---начальный пункт меню продукта*/
		store.loadProgress = 0;/*<---Проценты загрузки*/
		store.downDiscriptionList = [];/*<---массив данных пунктов описания*/

        /*---------------------------------------------*/
        /*--------------Объединение загружаеммых данных всех персоонажей в один массив----------*/
		this.unionLoad = function(data, nameClassData){
			store.peoples = store.peoples.concat(data.results);
			store.loadProgress = Math.round((store.peoples.length*100)/data.count);
			if (data.next){
				store.loadData(data.next, store.unionLoad, true);
			}else{
				store.pageData.pageName = 'peoples-catalog';
				store.loadProgress = 0;
				store.blockChengeGender = false;
			} 
			
		};
		 /*--------------Объединение загружаеммых данных опсания персоонажа в один массив----------*/
		this.loadDownDescription = function(data, nameClassData){
			data.nameClassData = nameClassData;
			store.downDiscriptionList[store.downDiscriptionList.length] = data;
		};
 		/*------------------------------Загрузка данных с сервера------------------------*/
		this.loadData = function(url, afterLoadFunc, indicator, nameClassData){
			if(indicator){
				store.pageData.pageName = 'load';
				store.blockChengeGender = indicator;
			}
			httpq.get(url)
				.then(function(data){
					afterLoadFunc(data.data, nameClassData);
				})
				.catch(function(){
					if (indicator){
						alert("Произошла ошибка загрузки данных с сервера.\nПожалуйста не паникуйте и попробуйте перезагрузить приложние.")
						store.pageData.pageName  = 'peoples-catalog';
						store.blockChengeGender = false;
					}
				})
		};
		/*------------функция выбора продукта для отображения на отдельной странице-------*/
		this.activePage = function(page, people){
			store.downDiscriptionList = [];
			people = people||{};
			people.pageName = page;
			store.pageData = people;
			if(page === "people-page"){
				/*Загрузка данных вкладки homeworld*/
				if(people.homeworld) {
  						store.loadData(people.homeworld, store.loadDownDescription, false, "homeworld");
				}
				/*Загрузка данных вкладки species*/
				if(people.species.length) {
					(people.species).forEach(function(item, i, arr) {
  						store.loadData(item, store.loadDownDescription, false, "species");
					});
				}
				/*Загрузка данных вкладки films*/
				if(people.films.length) {
					(people.films).forEach(function(item, i, arr) {
  						store.loadData(item, store.loadDownDescription, false, "films");
					});
				}
				/*Загрузка данных вкладки vehicles*/
				if(people.vehicles.length) {
					(people.vehicles).forEach(function(item, i, arr) {
  						store.loadData(item, store.loadDownDescription, false, "vehicles");
					});
				}
				/*Загрузка данных вкладки starships*/
				if(people.starships.length) {
					(people.starships).forEach(function(item, i, arr) {
  						store.loadData(item, store.loadDownDescription, false, "starships");
					});
				}
			}
		};
		/*-----------------------------функция выбора пункта меню-------------------------*/
		this.activeNavItem = function(id){
			store.navListId = id;
		};
		/*--------------функция изменения класса на "active" у выбранного пункта меню-----*/
		this.activeNavClass = function(check, data){
			return this.navListId===check?"active":"";
		};
		/*--------------функция отображения содержимого выбранного пункта меню------------*/
		this.showNavItem = function(check){
			return this.navListId === check;
		};

		this.chengeGender = function(getGender){
			
			if(!store.blockChengeGender){
				store.gender = getGender;
				store.activePage('peoples-catalog');
			}
		};
		this.activeGenderClass = function(check){
			return store.gender===check?"check":"";
		};
		this.chengeColorCart = function(getGender){
			if(getGender === "male"){ 
				return "cart_style_red";
			}else if(getGender === "female"){
				return "cart_style_blue";
			}
		}; 

		this.loadData("http://swapi.co/api/people/?page=1", store.unionLoad, true);/*<---вызываем загрузку с первого элемента*/
	});

	app.filter('addIngrFilter', function() {
   		return function (items, gender){
   			var filtered = [];
	        if(gender === ""){ 
	        	filtered = items;
	        }else{
		        for(var i = 0; i < items.length; i++){
		        	if(gender!=="others"){
		        		if (items[i].gender == gender){
		        			filtered[filtered.length] = items[i];	
		        		} 
		        	}else{
		        		if ((items[i].gender!=="male")&&(items[i].gender!=="female")){
		        			filtered[filtered.length] = items[i];	
		        		} 
		        	}
		        }
	    	}
	        return filtered;
    	};
	});

	
})();      