;(function(){

	angular.module('gonogo').factory("Policy", function($http,BASE_URL_SCOR) {
	  var output=[];
	  return {
		  getAllpolicy: function(InstitutionID ,callback) {
			return	$http({
					method : 'GET',
					url : BASE_URL_SCOR+'GetAllPolicy',
					params : {'INSTITUTION_ID': InstitutionID},
					headers : {'Content-Type' : 'application/json'}
				   }).success(function(data) 
				   { 
			   		$('#T_LoaderSpinner').hide(1000);
					 if (data.StatusCode === 101) 
					 {	output=data.Data;
						 callback(output);
					 } else 
					 { 
//									alert("Request failed due to an internal error...Please contact System Admin");
					 }
			      }).error(function(data) 
	    		  {$('#T_LoaderSpinner').hide();
	    		  console.log("We could not process your request......Please try later.")
				   });
	    }
	  };
	});



}).call(this)