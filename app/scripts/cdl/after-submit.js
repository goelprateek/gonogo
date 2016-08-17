;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");

	app.controller("AfterSubmitController",["$scope","sharedService","UserService","RestService","$state",
				function($scope,sharedService,UserService,RestService,$state){

		//HARD CODED FOR TESTING
		//sharedService.setRefID("SATH000216"); // Declined
		// /sharedService.setRefID("SATH000224"); // Approved
		// sharedService.setRefID("25052000019"); // On Hold
		//HARD CODED FOR TESTING

		if(sharedService.getDealerCode())
		{
			$scope.dealerID=sharedService.getDealerCode();
			sharedService.setDealerCode(null);
		}

		if(sharedService.getApplicationData())
		{
			$scope.applicationData=sharedService.getApplicationData();
			sharedService.setApplicationData(null);
		}

		if(sharedService.getApplicationStatus()){
			$scope.statusObject=sharedService.getApplicationStatus();
			sharedService.setApplicationStatus(null);
		}else{
			var user=UserService.getCurrentUser();

			if(sharedService.getRefID()){
				$scope.referenceID=sharedService.getRefID();
				sharedService.setRefID(null);
			}else{
				$state.go("/cdl/basic-de");
			}

			var json={
				"sRefID":$scope.referenceID,
				"oHeader": {
					"sCroId": "default",
					"dtSubmit":new Date().getTime(),
					"sReqType": "JSON",
					"sAppSource" : "WEB",
					"sDsaId":user.username,
					"sAppID": "",
					"sSourceID":"",
					"sInstID":user.institutionID
				}
			};

			RestService.saveToServer('status', json)
			.then(function(data){
				if(data && data.sStatus == 'SUCCESS'){
					$scope.statusObject=data;
				}else{
					notifier.logError("Sorry we can not process your check status request, please try again later.");
				}
			},function(failedResponse){
				notifier.logError("Sorry we can not process your Check Status request");
			});
		}

		$scope.onSubmitClicked=function(){
			if($scope.statusObject.sAppStat == "Approved")
			{
				// $scope.mkVal = $scope.mk;
				// $scope.mdlVal = $scope.mdl;
				/*
					$("#ErrorContainer").show();
					$scope.scmService(); // get all scheme from master
					$scope.postIpaDisp=$("#mk").val()+" - "+$("#mdl").val();
					$("#pOrder").show();
					$("#disImgRw ,#chkImgRw ,#aggImgRw").show();
				*/

				sharedService.setRefID($scope.referenceID);
			 	sharedService.setDealerCode($scope.dealerID);
			 	sharedService.setApplicationStatus($scope.statusObject);
			 	sharedService.setApplicationData($scope.applicationData);

			 	$state.go("/cdl/post-ipa");
			}
			else if($scope.statusObject.sAppStat == "Declined" )
			{
				// $("#pOrder").hide();
			 // 	$("#additionalDoc").show();
			 // 	$("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
				sharedService.setRefID($scope.referenceID);
				sharedService.setApplicationStatus($scope.statusObject);
			 	//$state.go("/cdl/additnl-doc");
			 	$state.go("/cdl/additnl-doc");
			}
			else if($scope.statusObject.sAppStat == "OnHold")
			{
				// console.log("$scope.holdStageArr :"+JSON.stringify($scope.holdStageArr));
			 	// $("#HoldStage").show();
			 	// $("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
			 	sharedService.setRefID($scope.referenceID); // Declined
			 	sharedService.setDealerCode($scope.dealerID); // Declined
			 	sharedService.setApplicationStatus($scope.statusObject);
			 	$state.go("/cdl/hold-stage");
				// $("#pOrder").show();
			}
		};

// 	  	$(document.body).on("click","#aSubmitBtn",function(){
// 			//$("#afterSubmit").hide();
// //			console.log("Status="+ status);	
// 			if($scope.statusObject.sAppStat == "Approved")
// 			{
// 				// $scope.mkVal = $scope.mk;
// 				// $scope.mdlVal = $scope.mdl;
// 				$("#ErrorContainer").show();
// 				$scope.scmService(); // get all scheme from master
// 				$scope.postIpaDisp=$("#mk").val()+" - "+$("#mdl").val();
// 				$("#pOrder").show();
// 				$("#disImgRw ,#chkImgRw ,#aggImgRw").show();
// 			}
// 			else if($scope.statusObject.sAppStat == "Declined" )
// 			{
// 				$("#pOrder").hide();
// 			 	$("#additionalDoc").show();
// 			 	$("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
// 			// $("#pOrder").show();
// 			}
// 			else if($scope.statusObject.sAppStat == "OnHold")
// 			{
// 				// console.log("$scope.holdStageArr :"+JSON.stringify($scope.holdStageArr));
// 			 	// $("#HoldStage").show();
// 			 	// $("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
// 			 	sharedService.setRefID($scope.referenceID); // Declined
// 			 	sharedService.setApplicationStatus($scope.statusObject);
// 			 	$state.go("/cdl/hold-stage");
// 			// $("#pOrder").show();
// 			}
// 	  	});
	}]);
}).call(this);