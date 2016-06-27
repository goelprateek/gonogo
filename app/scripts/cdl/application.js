;(function(){


	'use strict';

	/*var app = angular.module('gonogo.cdl', []);

app.controller("ApplicationCDLController",["$rootScope","$scope","$http","BASE_URL_GNG","$location",function($rootScope,$scope,$http,BASE_URL_GNG,$location){

	if(localStorage.getItem('GUID')!=null){
		var userdata = JSON.parse(atob(localStorage.getItem('GUID')));
		$scope.username = userdata.name;
		$scope.useremail = userdata.email;
		$scope.instImage = userdata.instImage;
		$scope.InstitutionID = userdata.InstitutionID;
		$scope.userid = userdata.userid;
		$scope.color = userdata.color;
		$scope.ePassword = userdata.ePassword;

		if(localStorage.getItem('CURRENT_DEALER')){
			var dealerCurrent = JSON.parse(atob(localStorage.getItem('CURRENT_DEALER')));
			$scope.dealerName=dealerCurrent["DEALER_NAME"];
		}
	}

	// logout user and delete details
	$scope.logout = function() {
		var json ={
				"sInstID": $scope.InstitutionID,
				"sUserID": $scope.userid
		}
		$http({
			method : 'POST',url : BASE_URL_GNG+'logout',
			data : json,
			headers : {'Content-Type':'application/json','token-key':'95957453469767522788','userName':$scope.useremail,'password':$scope.ePassword}
		});

		localStorage.removeItem('GUID');
		localStorage.removeItem('actions');
		localStorage.removeItem('CURRENT_DEALER');
		localStorage.removeItem('DEALERS');
		localStorage.removeItem('ROLES');
		localStorage.removeItem('DETAILS');

		var url = "/GoNoGoV3";
		$(location).attr('href',url);

	};
}]);
*/






}).call(this)


