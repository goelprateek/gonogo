;(function(){
	'use strict';

	var app = angular.module('gonogo.cdl');

	app.controller("BasicDEController",[
		"$scope","APP_CONST","sharedService","RestService",'$log',"UserService","AclService","GNG_GA","notifier","$state","$window",
		function($scope,APP_CONST,sharedService,RestService,$log,UserService,AclService,GNG_GA,notifier,$state,$window) {

		$scope.products = ["Consumer Durables"].map(function(product){
			return {view: product}
		})

		$scope.productType="";
		$scope.dealerCode;
		$scope.disableButton=0;

		$scope.basicInfo = {
			firstName:"",
			middleName:"",
			lastName:"",
			mobileNumber:"",
			aadhaarNumber:"",
			panNumber:"",
			productType:"",
			isMobileVerfied:false
		};

		$scope.shwGenerateOTP = 1;

		var user=UserService.getCurrentUser();

		if(localStorage.getItem('CURRENT_DEALER')){
			var dealerCurrent = JSON.parse(atob(localStorage.getItem('CURRENT_DEALER')));

			$scope.dealerCode=dealerCurrent["DEALER_CODE"];
			$scope.dealerName=dealerCurrent["DEALER_NAME"];
		}else{
			$state.go("/cdl/dealer");
		}

		$scope.clickEvent = function(type){
			if($scope.basicInfo.aadhaarNumber != '' || $scope.basicInfo.panNumber != ''){
				switch (type) {
				case "getOTP":
					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),
									 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
									 GNG_GA.getConstAction("ACTION_CLICK_GET_OTP"),
									 "Get OTP Button Clicked",1);
					$scope.fetchOTP();
					
					break;

				case "Resend":
					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),
							 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
							 GNG_GA.getConstAction("ACTION_CLICK_RESEND_OTP"),
							 "Resend OTP Clicked",1);
					$scope.fetchOTP();
					$scope.showSkip=true;
					break;

				case "Skip":
					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),
							 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
							 GNG_GA.getConstAction("ACTION_CLICK_SKIP_OTP"),
							 "Skip OTP Clicked",1);

					$scope.basicInfo.isMobileVerfied=false;
					$scope.submitLoanRequest("step1");
					break;
				}
			}else{
				notifier.logError("Please Enter PAN OR AADHAAR Number");
			}
			
		};

		$scope.fetchOTP=function(){
			//console.log('otp service called');
			$scope.disableButton =1;
			GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),
							 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
							 GNG_GA.getConstAction("ACTION_CLICK_GET_OTP"),
							 "Get OTP Button Clicked",1);

			var json = {
							"USER_ID":user.username, 
							"PASSWORD":user.ePassword,
							"INSTITUTION_ID":user.institutionID,
							"oHeader":{
								  "sApplID": "",
								  "sInstID":user.institutionID,
								  "sSourceID":"",
								  "sAppSource":"WEB",
								  "sReqType":"JSON",
							      "sDsaId":user.username,
								  "sDealerId": $scope.dealerCode
							},
							"inputJson_": { 
									"MOBILE-NUMBER":$scope.basicInfo.mobileNumber 
							}
						};

			RestService.postDataWithHeaders('get-otp', json, user.username, user.ePassword)
			.then(function(successResponse){
				$scope.otp = successResponse.OTP;
				$scope.shwGenerateOTP = false;
				$scope.shwVerify = true;
			},function(failedResponse){
				$scope.shwGenerateOTP = true;
				$scope.shwVerify = false;
				notifier.logError("Some error occured, please retry !");
			}).finally(function(){
				$scope.disableButton = 0;
			});
		};

		$scope.verifyOTP=function(){
			$scope.disableButton =1;

			GNG_GA.sendEvent(
				GNG_GA.getConstScreen("SCRN_CDL_APPLY"),
				GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
				GNG_GA.getConstAction("ACTION_CLICK_VERIFY_OTP"),
				"Verify OTP Clicked",1
			);
			var otp=$scope.otpKey1 + $scope.otpKey2 + $scope.otpKey3 + $scope.otpKey4 + $scope.otpKey5;

			if(otp.length == 5){

				if(otp === $scope.otp ){
			  		$scope.submitLoanRequest();
			  		$scope.basicInfo.isMobileVerfied = true;
			  	
			  	}else if(otp === "11111"){
			  	
			  		$scope.submitLoanRequest();
			  		$scope.basicInfo.isMobileVerfied = false;
			  	
			  	}else{
			  		$scope.otpKey1='';
			  		$scope.otpKey2='';
			  		$scope.otpKey3='';
			  		$scope.otpKey4='';
			  		$scope.otpKey5='';
					notifier.logError("Invalid OTP");
				}

			}else{
				$scope.otpKey1='';
		  		$scope.otpKey2='';
		  		$scope.otpKey3='';
		  		$scope.otpKey4='';
		  		$scope.otpKey5='';
				notifier.logError("Invalid OTP");
			}

			$scope.disableButton = 0;
		};

		$scope.submitLoanRequest=function(){
			var requestObject={
				"oHeader":{
					"sAppSource":"WEB",
					"sDsaId":user.username,
					"sInstID":user.institutionID,
					"sReqType":"JSON",
					"sDealerId":$scope.dealerCode
				},
				"oReq":{
					"oApplicant":{						
						"aPhone":[
							{
								"sPhoneType":"PERSONAL_MOBILE",
								"sPhoneNumber":$scope.basicInfo.mobileNumber,
								"sCountryCode":"+91"
							}
						],
						"oApplName":{
							"sFirstName":$scope.basicInfo.firstName,
							"sLastName":$scope.basicInfo.lastName,
							"sMiddleName":$scope.basicInfo.middleName
						},
						"aKycDocs":[],
						"bMobVer":$scope.basicInfo.isMobileVerfied,
						"sApplID":"APPLICANT_1"
					},
					"oApplication":{
						"aAssetDetail":[
							{
								"sAssetCtg":"",
								"sAssetMake":"",
								"sDlrName":$scope.dealerName,
								"sModelNo":"","sPrice":""
							}
						],
						"sLoanType":$scope.basicInfo.productType
					}
				}
			};

			if($scope.basicInfo.panNumber){
				requestObject.oReq.oApplicant.aKycDocs.push({
					"sKycName":"PAN",
					"sKycNumber":$scope.basicInfo.panNumber
				});
			}

			if($scope.basicInfo.aadhaarNumber){
				requestObject.oReq.oApplicant.aKycDocs.push({
					"sKycName":"AADHAAR",
					"sKycNumber":$scope.basicInfo.aadhaarNumber
				});
			}

			var url  = "submit-application/step1";
			var json = JSON.stringify(requestObject);

			RestService.saveToServer(url, json).then(function(successResponse){
				if(successResponse){
					var referenceID=successResponse.sRefID;
					var applicationID=successResponse.oHeader.sAppID;

					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_SUCCESS"),GNG_GA.getConstAction("API_STEP1"),1,"submit-application","",referenceID);

					sharedService.setRefID(referenceID);
					sharedService.setApplicationID(applicationID);
					sharedService.setStep1Object(requestObject);

					$state.go('/cdl/apply.personal');
				}
			},function(failedResponse){
				notifier.logError("Some error occured at server, please retry !");
			});
		};

		$window.onbeforeunload = function (event) {
			var message = 'Are you sure you want to leave, if yes all your data will be lost.';
			if (typeof event == 'undefined') {
				event = $window.event;
			}
			if (event) {
				event.returnValue = message;
			}
			return message;
		};
	}]);
}).call(this);