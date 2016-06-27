;(function(){

	'use strict';

	angular.module("gonogo.cdl",['gng.cdl.dealer']);
	
	var app = angular.module("gng.cdl.dealer",[]);

	app.controller("DealerController",["$rootScope","$scope","$location",'UserService','APP_CONTEXT',function($rootScope,$scope,$location,UserService,APP_CONTEXT){

	var user = UserService.getCurrentUser();

	if(!_.isUndefined(user.id) ){

			var currDealer  = user.dealer;
			$scope.dealers = user.dealers;

			if(currDealer){
				if(currDealer.DEALER_NAME){
					$location.path("/cdl/apply");	
				}

			}else if($scope.dealers){
			
				$location.path("/cdl/dealer");
			
			}else{
				$location.path(APP_CONTEXT);
			}
		
	}else{
		$location.path(APP_CONTEXT);
	}

	
	$scope.onDealerSelected=function(dealerSelected){
		
		if(!_.isUndefined(dealerSelected)) {
			
			var dealerObj = JSON.parse(dealerSelected);


			UserService.persistDataTolocalStorage('CURRENT_DEALER',btoa(dealerSelected));
			
			var dealerCode = dealerObj["DEALER_CODE"];
			
			$rootScope.dealerName = dealerObj["DEALER_NAME"];
			
			$location.path("/cdl/apply");
		
		}else {
			$scope.errHead="Dealer";
			$scope.errorMsg="Please select Dealer";
		}
	}
}]);


}).call(this)