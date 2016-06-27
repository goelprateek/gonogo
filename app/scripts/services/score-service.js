;(function(){

	'use strict';

	angular.module('gonogo').factory("Score", function($http,BASE_URL_SCOR) {
	  var users=[];
	  return {
 // get all scoring tables from database		           
//	function getAll_ScoringTables(callback) 
	getAll_ScoringTables: function(InstitutionID ,callback) {
		$http({
			method : 'GET',
			url : BASE_URL_SCOR+'GetTables',
			params : {'INSTITUTION_ID': InstitutionID,'type' : ''},
			headers : {'Content-Type' : 'application/json'}
		   }).success(function(data) 
				   { $('#T_LoaderSpinner').hide(1000);
					 if (data.StatusCode === 101) 
					 {	if(data.Data != null)
						 { /*for (var i = 0; i < data.Data.length; i++) 
					       {	
//							 $scope.tableList.push(data.Data[i]);
							 users.push(data.Data[i]);
					       }*/
						 users=data.Data;
//						 console.log("Data in loop ..."+JSON.stringify(users));
						 callback(users);
						  }
						
					 } else 
					 {
//							alert( "Request failed due to an internal error...Please contact 'System Admin'");

					 }
				
			      }).error(function(data) 
			    		  {
			    	  		$('#T_LoaderSpinner').hide();
			    	  		console.log("We could not process your request......Please try later.")
						   });
	} 
	  };
	});

}).call(this)