;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");

	app.controller("HoldStageController",["$scope","sharedService","UserService","$state","notifier",
				function($scope,sharedService,UserService,$state,notifier){

		var user=UserService.getCurrentUser();

		if(sharedService.getDealerCode())
		{
			$scope.dealerID=sharedService.getDealerCode();
			sharedService.setDealerCode(null);
		}

		if(sharedService.getRefID()){
			$scope.referenceID=sharedService.getRefID();
			sharedService.setRefID(null);
		}else{
			$state.go("/cdl/basic-de");
		}

		// Start : If from step 1 screen
		if(sharedService.getApplicationStatus()){
			$scope.statusObject=sharedService.getApplicationStatus();
			sharedService.setApplicationStatus(null);

			$scope.holdStageArr=[];
			for(var i=0; i<$scope.statusObject.aCroJustification.length;i++)
			{
				var object = {
					"value" : "holdCase",
					"index" :i+1,
					"doc"  :$scope.statusObject.aCroJustification[i].sDocName,
					"state":$scope.statusObject.aCroJustification[i].sCase,
					"reason":$scope.statusObject.aCroJustification[i].sDescrip,
					"isDefault" :true
				};
				$scope.holdStageArr.push(object);
			}
		}else{
			$state.go("/cdl/basic-de");
		}

		// $scope.reprocess=function()
		// {
		// 	// console.log("$scope.refid : "+$scope.REFID +" :Cust id ="+CustID);
		// 	UploadAllImgs($scope.referenceID,$scope.holdIndex,"submit");

		// 	var updateJson = {
		// 	  	"sRefID": $scope.referenceID,
		// 	  	"sHeader": {
		// 		    "sCroId": "default",
		// 		    "dtSubmit": new Date().getTime(),
		// 		    "sReqType": "JSON",
		// 		    "sAppSource": "WEB",
		// 		    "sDsaId": user.username,
		// 		    "sAppID": "APPLICANT_1",
		// 		    "sDealerId": dlrCode,
		// 		    "sSourceID": "HDBFS_CDL",
		// 		    "sInstID":  user.institutionID
		// 	  	},
		//   		"sAppStat": "QUEUE"
		// 	};
		// //	console.log("Input JSON for status update :"+$scope.updateJson);

		// 	RestService.saveToServer('reset-status', updateJson)
		// 	.then(function(data){
		// 		if(data){
		// 			sharedService.setRefID($scope.referenceID);
		// 			$state.go("/cdl/result");
		// 		}
		// 	},function(failedResponse){
		// 		notifier.logError("Sorry we can not reset the status request.");
		// 	});

		// // 	$http({
		// // 		method : 'POST',
		// // 		url : APP_CONST.getConst('BASE_URL_GNG')+"reset-status",
		// // 		data :$scope.updateJson,
		// // 		headers : {'Content-Type' : 'application/json'}
		// // 	}).success(function(data) 
		// // 	{
		// // //		console.log("$scope.REF :" + $scope.REF);
		// // 		var statusJSON ={
		// // 			"sRefID":$scope.referenceID,
		// // 			"oHeader": {
		// // 				"sCroId": "default",
		// // 				"dtSubmit":new Date().getTime(),
		// // 				"sReqType": "JSON",
		// // 				"sAppSource" : "WEB",
		// // 				"sDsaId":user.username,
		// // 				"sAppID": "",
		// // 				"sSourceID":"",
		// // 				"sInstID":user.institutionID
		// // 			}
		// // 		}

		// // 		$("#resultPanel").show();
		// // 		$scope.StartTimer(); // 	60 sec timer
		// // 		poller = $interval(function(){
		// // 			$scope.check_status(statusJSON);
		// // 		},3000);
		// // 	}).error(function(data)
		// // 	{ 
		// // 		console.log("Getting Error from Reset State.");
		// // 	});

		// 	// $("#HoldStage").hide();
		// 	// $("#resultPanel").show();
		// }

		$scope.onImageUploaded=function(){
			var updateJson = {
			  	"sRefID": $scope.referenceID,
			  	"sHeader": {
				    "sCroId": "default",
				    "dtSubmit": new Date().getTime(),
				    "sReqType": "JSON",
				    "sAppSource": "WEB",
				    "sDsaId": user.username,
				    "sAppID": "APPLICANT_1",
				    "sDealerId": $scope.dealerID,
				    "sSourceID": "HDBFS_CDL",
				    "sInstID":  user.institutionID
			  	},
		  		"sAppStat": "QUEUE"
			};
		//	console.log("Input JSON for status update :"+$scope.updateJson);

			RestService.saveToServer('reset-status', updateJson)
			.then(function(data){
				if(data && data.sStatus == 'SUCCESS'){
					sharedService.setRefID($scope.referenceID);
					notifier.logSuccess("Your request has bee processed successfully.");
					$state.go("/cdl/result");
				}else{
					notifier.logError("Unable to update status, please try again or contact system admin.");
				}
			},function(failedResponse){
				notifier.logError("Sorry we can not reset the status request.");
			});
		};

		// $scope.resetStatus=function(){
		// 	$scope.updateJson = {
		// 	  	"sRefID": $scope.REFID,
		// 	  	"sHeader": {
		// 		    "sCroId": "default",
		// 		    "dtSubmit": new Date().getTime(),
		// 		    "sReqType": "JSON",
		// 		    "sAppSource": "WEB",
		// 		    "sDsaId": user.username,
		// 		    "sAppID": "APPLICANT_1",
		// 		    "sDealerId": dlrCode,
		// 		    "sSourceID": "HDBFS_CDL",
		// 		    "sInstID":  user.institutionID
		// 	  	},
		//   		"sAppStat": "QUEUE"
		// 	}
		// //	console.log("Input JSON for status update :"+$scope.updateJson);

		// 	$http({
		// 		method : 'POST',
		// 		url : APP_CONST.getConst('BASE_URL_GNG')+"reset-status",
		// 		data :$scope.updateJson,
		// 		headers : {'Content-Type' : 'application/json'}
		// 	}).success(function(data) 
		// 	{
		// //		console.log("$scope.REF :" + $scope.REF);
		// 		var statusJSON ={
		// 			"sRefID":$scope.referenceID,
		// 			"oHeader": {
		// 				"sCroId": "default",
		// 				"dtSubmit":new Date().getTime(),
		// 				"sReqType": "JSON",
		// 				"sAppSource" : "WEB",
		// 				"sDsaId":user.username,
		// 				"sAppID": "",
		// 				"sSourceID":"",
		// 				"sInstID":user.institutionID
		// 			}
		// 		}

		// 		$("#resultPanel").show();
		// 		$scope.StartTimer(); // 	60 sec timer
		// 		poller = $interval(function(){
		// 			$scope.check_status(statusJSON);
		// 		},3000);
		// 	}).error(function(data)
		// 	{ 
		// 		console.log("Getting Error from Reset State.");
		// 	});
		// };
	}]);
}).call(this);