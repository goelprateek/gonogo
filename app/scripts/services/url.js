; (function () {

	'use strict';
	var app = angular.module('gonogo.commons',['ng-acl']);


	app.factory("APP_CONST", function () {
		var END_POINT = {
			//BASE_URL_GNG : "http://172.26.1.211:9090/GoNoGo/",
		    BASE_URL_GNG : "http://gng.softcell.in/GoNoGo/",

			BASE_URL_SCORE:'http://gng.softcell.in/AppScoringV2Git/api/ScoringV3/',
			BASE_URL_DEMO: 'http://gng.softcell.in/GoNoGoV3/api/GoNoGoV3/',
			BASE_URL_DMI: 'http://gng.softcell.in/gonogo_dmi/',
			APP_CONTEXT: '/'

		};
		return {
			getConst: function (const_type) {
				return END_POINT[const_type];
			}
		}
	});

	app.service("HttpService", ['$q', '$http', '$log', 'APP_CONST', function ($q, $http, $log, APP_CONST) {
		var get = function (url) {
			var defere = $q.defered();

			$http.get(url).success(function (resp) {
				$log.debug(resp);
				defere.resolve(resp);
			}).error(function (error) {
				$log.error(error);
				defere.resolve(error);
			})
			return defere.promise;
		}
		var post = function (url, data) {
			var defer = $q.defer();
			$http.post(url, data).success(function (response) {
				defer.resolve(response);
			}).error(function (error) {
				defer.reject(error);
			})
			return defer.promise;
		}
		return {
			get: get,
			post: post
		}
	}])

	app.service("RestService", ['$q', '$http', '$log', 'APP_CONST', function ($q, $http, $log, APP_CONST) {

		var _saveToServer = function (url, data) {
			var defere = $q.defer(),
				_url = APP_CONST.getConst('BASE_URL_GNG');

			$http.post(_url + url, data).success(function (response) {
				defere.resolve(response);
			}).error(function (error) {
				defere.reject(error);
			})

			return defere.promise;
		},

			getFromServer = function (url) {

				var defere = $q.defered();

				$http.get(url).success(function (resp) {
					$log.debug(resp);
					defere.resolve(resp);
				}).error(function (error) {
					$log.error(error);
					defere.resolve(error);
				})
				return defere.promise;
			},

			getStreamFromServer = function (url, data) {
				var deferred = $q.defer();
				console.log(data);
				$http({
					url: url,
					method: "POST",
					data: data,
					headers: { 'Content-type': 'application/json' },
					responseType: 'arraybuffer',
				})
					.success(function (data) {
						$log.debug("SUCCESS");
						deferred.resolve(data);
					}).error(function (data) {
						$log.error("ERROR");
						deferred.reject(data);
					});

				return deferred.promise;

			},

			postDataWithLoginHeaders = function (url, data, username, pass) {
				$http.defaults.headers.common['token-key'] = '95957453469767522788';
				$http.defaults.headers.common['username'] = username;
				$http.defaults.headers.common['password'] = pass;

				var defer = $q.defer();
				$http.post(url, data).success(function (data) {
					$log.info(data);
					defer.resolve(data);
				}).error(function (data) {
					$log.error(data);
					defer.reject(data);
				});
				return defer.promise;
			};

		return {
			saveToServer: _saveToServer,
			getFromServer: getFromServer,
			getStreamFromServer: getStreamFromServer,
			postDataWithHeaders: postDataWithLoginHeaders

		}

	}]);	

 	app.service('sharedService', function () {
	  	var refID="",
	  	 currentStage="",
	  	 decisionStatus="";
	  	return {
	        getRefID: function () {
	            return refID;
	        },
	        setRefID: function(value) {
	            refID = value;
	         
	        },
	        getCurrentStage: function () {
	            return currentStage;
	        },
	        setCurrentStage: function(value) {
	        	currentStage = value;
	        },
	        getDecisionStatus: function () {
	            return decisionStatus;
	        },
	        setDecisionStatus: function(value) {
	        	decisionStatus = value;
	        }
	    };
  	});

 	app.service("UserService",['$location','AclService',function($location,AclService){
 		
 		var fetchCurrentUser = function(){
    		
	    	var user={
    			roles:[],
    			getRoles: function () {
    	            return this.roles;
    	        }
    		};
	    	
	    	var guid = localStorage.getItem('GUID');
			
			if(guid){

				var userdata = JSON.parse(atob(guid));

				user.username = userdata.name;
				user.useremail = userdata.email;
				user.image = userdata.userImage;
				user.instImage = userdata.instImage;
				user.institutionID = userdata.InstitutionID;
				user.id = userdata.userid;
				user.color = userdata.color;
				//user.ePassword = userdata.ePassword;


				var dealers = localStorage.getItem('DEALERS');
				if (dealers) {
					user.dealers = JSON.parse(atob(dealers));
				}

				var currentDealer = localStorage.getItem('CURRENT_DEALER');
				if (currentDealer) {
					user.dealer = JSON.parse(atob(currentDealer));
				}


				if (user.useremail.indexOf("CRO1") > - 1) {
					user.roles = ["CRO1"]
				}

				AclService.setUserIdentity(user);
			}

		    return user;
    	},

	    cleanupTask = function(){
	    	localStorage.removeItem('GUID');
			localStorage.removeItem('actions');
			localStorage.removeItem('CURRENT_DEALER');
			localStorage.removeItem('DEALERS');
			localStorage.removeItem('ROLES');
			localStorage.removeItem('DETAILS');
	    }, 
	    

	    persistTolocalStorage = function(propertyName, propertyValue){
	    	localStorage.setItem(propertyName, propertyValue);
	    };
	    
	    return {
	    	getCurrentUser:fetchCurrentUser,
	    	cleanUpUserDeatails : cleanupTask,
	    	persistDataTolocalStorage : persistTolocalStorage
	    };

 	}]);

 	app.run(["AclService",function(AclService){
		AclService.addRole("4019");
		AclService.addRole("CRO1");
		
		AclService.addResource("Application");
		
		AclService.allow("CRO1","Application","Reinitiate");
		AclService.allow("CRO1","Application","Update");
	}]);

}).call(this)

