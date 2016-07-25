;(function(){

	var app = angular.module('gonogo.policy',[]);

	app.factory("Policy", ['$http','APP_CONST',function($http,APP_CONST) {
	  var output=[];
	  return {
		  getAllpolicy: function(InstitutionID ,callback) {
			return	$http({
					method : 'GET',
					url : APP_CONST.getConst('BASE_URL_SCORE')+'GetAllPolicy',
					params : {'INSTITUTION_ID': InstitutionID},
					headers : {'Content-Type' : 'application/json'}
				   
				   }).success(function(data) { 
			   		$('#T_LoaderSpinner').hide(1000);
					 
					 if (data.StatusCode === 101){
					 	 
					 	 output=data.Data;
						 
						 callback(output);
					 
					 } else { 
						console.log("Request failed due to an internal error...Please contact System Admin");
					 }

			      }).error(function(data) 
	    		  {$('#T_LoaderSpinner').hide();
	    		  console.log("We could not process your request......Please try later.")
			 });
	    }
	  };
	}]);

}).call(this)