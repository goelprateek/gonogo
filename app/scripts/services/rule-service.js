;(function(){

	'use strict';

 var app = angular.module('gonogo.rule',[]);
 
 app.factory("Decision", ['$http','APP_CONST' ,function($http,APP_CONST) {
	  var users=[];
	  return { 
 /* new code for policy and rules*/
 getRuleList: function(InstitutionID,RuleValue ,callback) {
 	$('#T_LoaderSpinner').show();
 	$http({ method : 'POST',
 		url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
 		params:{'INSTITUTION_ID':InstitutionID,'RuleID':RuleValue,'CType':"Find-All"},
 		headers : {'Content-Type' : 'application/json'}
 	}).success(function(data) 
 	 { 
 		$('#T_LoaderSpinner').hide(1000);
 		if(data.StatusCode === 101)
 		{ 
  		  $('#T_LoaderSpinner').hide();
  	
  		 users=data.Data;
		 callback(users);
		   }
 	 }).error(function(data)
 		{$('#T_LoaderSpinner').hide();
		console.log("Request failed due to an internal error...Please contact 'System Admin'");

 		});

 }
	  };
	
	
	}]);
}).call(this)