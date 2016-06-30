;(function(){

	'use strict';

	var app = angular.module('gonogo.score',[]);

	app.factory("Score", ['$http','APP_CONST',function($http,APP_CONST) {
	  var users=[];
	  return {
				getAll_ScoringTables: function(InstitutionID ,callback) {
					$http({
						method : 'GET',
						url : APP_CONST.getConst('BASE_URL_SCORE')+'GetTables',
						params : {'INSTITUTION_ID': InstitutionID,'type' : ''},
						headers : {'Content-Type' : 'application/json'}
					   }).success(function(data) { 
				   			 $('#T_LoaderSpinner').hide(1000);
							 if (data.StatusCode === 101) {	
							 	if(data.Data != null){ 
								
								 users=data.Data;
								
								 callback(users);
								
								}
								
							 } else {
								console.log( "Request failed due to an internal error...Please contact 'System Admin'");

							 }
							
					    }).error(function(data){

						    $('#T_LoaderSpinner').hide();
						    console.log("We could not process your request......Please try later.")
					});
				} 
	  };
	}]);

}).call(this)