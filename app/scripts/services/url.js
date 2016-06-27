;(function(){
	
	'use strict';
	
	var app = angular.module('gonogo');
	app.constant('BASE_URL_GNG','http://gng.softcell.in/GoNoGo/'),
//	app.constant('BASE_URL_GNG','http://172.26.1.211:9090/GoNoGo/'),
	app.constant('BASE_URL_SCOR','http://gng.softcell.in/AppScoringV2Git/api/ScoringV3/'),
	app.constant('BASE_URL_DEMO','http://gng.softcell.in/GoNoGoV3/api/GoNoGoV3/'),
	app.constant('BASE_URL_DMI','http://gng.softcell.in/gonogo_dmi/'),

	app.service("RestService",['$q','$http','BASE_URL_GNG',function($q,$http,BASE_URL_GNG){
		var _saveToserver = function(url,data){
			var defere = $q.defer();
			$http.post(BASE_URL_GNG+url,data).success(function(response){
				defere.resolve(response);
			}).error(function(error){
				defere.reject(error);
			})
			return defere.promise;
		}
		
		var getFromServer =function(url){
			var defere = $q.defered();
			
			$http.get(url).success(function(resp){
				defere.resolve(resp);
			}).error(function(error){
				defere.resolve(error);
			})
			return defere.promise;
		}
		
		var getStreamFromServer = function(url,data){
			var deferred = $q.defer();
			$http({
                url:url,
                method:"PUT",
                data:data,
                headers:{'Content-type': 'application/json'},
                responseType : 'arraybuffer',
               })
               .success(function (data) {
                   console.debug("SUCCESS");
                   deferred.resolve(data);
               }).error(function (data) {
                    console.error("ERROR");
                    deferred.reject(data);
               });
			
			return deferred.promise;

		}
		
		return {
			saveToServer:_saveToserver,
			getFromServer:getFromServer,
			getStreamFromServer : getStreamFromServer
		}
	}])
	
	
}).call(this)

