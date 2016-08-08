;(function(){

	'use strict';

	angular.module("gonogo.cdl",['gng.cdl.dealer','gonogo.directives']);
	
	var app = angular.module("gng.cdl.dealer",[]);

	app.controller("DealerController",["$rootScope","$scope","$location",'UserService','APP_CONST','GNG_GA',
							function($rootScope,$scope,$location,UserService,APP_CONST,GNG_GA){

		var user = UserService.getCurrentUser();

		$rootScope.errHead="";
		$rootScope.errorMsg="";
		
	    if(user.id){
	        $scope.$emit('onSuccessfulLogin');
	    }

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
					$location.path(APP_CONST.getConst('APP_CONTEXT'));
				}
			
		}else{
			$location.path(APP_CONST.getConst('APP_CONTEXT'));
		}

		$scope.onDealerSelected=function(dealerSelected){
			
			if(!_.isUndefined(dealerSelected)) {

				GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DEALER"),
							 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
							 GNG_GA.getConstAction("ACTION_CLICK_VERIFY_OTP"),
							 "Verify OTP Clicked",1);
				
				var dealerObj = JSON.parse(dealerSelected);


				UserService.persistDataTolocalStorage('CURRENT_DEALER',btoa(dealerSelected));
				
				var dealerCode = dealerObj["DEALER_CODE"];
				
				$rootScope.dealerName = dealerObj["DEALER_NAME"];
				
				$location.path("/cdl/apply");
			
			}else {
				$rootScope.errHead="Dealer";
				$rootScope.errorMsg="Please select Dealer";
			}
		}
	}]);
}).call(this)