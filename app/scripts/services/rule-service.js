;(function(){

	'use strict';

 angular.module('gonogo').factory("Decision", function($http,BASE_URL_SCOR) {
	  var users=[];
	  return { 
 /* new code for policy and rules*/
 getRuleList: function(InstitutionID,RuleValue ,callback) {
 	$('#T_LoaderSpinner').show();
 	$http({ method : 'POST',
 		url : BASE_URL_SCOR+'DecisionRules',
 		params:{'INSTITUTION_ID':InstitutionID,'RuleID':RuleValue,'CType':"Find-All"},
 		headers : {'Content-Type' : 'application/json'}
 	}).success(function(data) 
 	 { 
// 		console.log("inCondition"+ JSON.stringify(data.Data));
 		$('#T_LoaderSpinner').hide(1000);
 		if(data.StatusCode === 101)
 		{ 
  		  $('#T_LoaderSpinner').hide();
  	/*	 for (var i = 0; i < data.Data.length; i++) 
	       {	
	//			 $scope.tableList.push(data.Data[i]);
			 users.push(data.Data[i]);
	       }*/
  		 users=data.Data;
//		 console.log("Data in loop ..."+JSON.stringify(users));
		 callback(users);
		   }
 		//  		  $scope.RuleList = data.Data;
  		 
 	
 	 
 	 }).error(function(data)
 		{$('#T_LoaderSpinner').hide();
		console.log("Request failed due to an internal error...Please contact 'System Admin'");

 		});

 }
	  };
	});

 

}).call(this)