;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");

	app.controller("AdditionalDocumentController",["$scope","sharedService","UserService","RestService","$location","UploadImages","$log","notifier",
		function($scope,sharedService,UserService,RestService,$location,UploadImages,$log,notifier){

		$scope.additnlDocArrayToUpload=[];

		if(sharedService.getRefID()){
			$scope.referenceID=sharedService.getRefID();
			sharedService.setRefID(null);
		}else{
			$location.path("/cdl/basic-de");
		}

		if(sharedService.getApplicationStatus()){
			$scope.statusObject=sharedService.getApplicationStatus();
			sharedService.setApplicationStatus(null);

		}else{
			$location.path("/cdl/basic-de");
		}

		$scope.applicationFormArr=[{value:"APPLICATION_FORM","index":1}];
		$scope.agreementArr=[{value:"AGREEMENT","index":1}];
		$scope.achArr=[{value:"ACH","index":1}];
		$scope.disbursmentArr=[{value:"DISBURSEMENT","index":1}];
		$scope.addtnlKycArr=[{value:"ADDITIONAL_KYC","index":1}];

		$scope.addNewElement=function(key)
		{  
			switch (key) {
				case "APPLICATION_FORM":
					$scope.applicationFormArr.push({value:key,"index":($scope.applicationFormArr[$scope.applicationFormArr.length-1].index)+1});
					break;
				case "AGREEMENT":
					$scope.agreementArr.push({value:key,"index":($scope.agreementArr[$scope.agreementArr.length-1].index)+1});
					break;
				case "ACH":
					$scope.achArr.push({value:key,"index":($scope.achArr[$scope.achArr.length-1].index)+1});
					break;				
				case "DISBURSEMENT":
					$scope.disbursmentArr.push({value:key,"index":($scope.disbursmentArr[$scope.disbursmentArr.length-1].index)+1});
					break;				
				case "ADDITIONAL_KYC":
					$scope.addtnlKycArr.push({value:key,"index":($scope.addtnlKycArr[$scope.addtnlKycArr.length-1].index)+1});
					break;
			}		
		};

		$scope.submitImages = function()
		{
			if($scope.additnlDocArrayToUpload.length!=0){
				UploadImages.upload($scope.referenceId,$scope.additnlDocArrayToUpload).then(function(imageUploadedCount) {
				  	$log.debug('Image upload Success, Total image uploaded : ' + imageUploadedCount);
				  	$scope.updateStatus();
				}, function(reason) {
				  	$log.debug('Image upload Failed, Total image uploaded : ' + imageUploadedCount);
				});
			}else{
				notifier.logWarning("Please select atleast 1 image to upload.");
			}

		 //    UploadAllImgs($scope.REFID,addkyc_array,"ipa");
		 //    $scope.updateStatus();
		 //    // console.log("$scope.dstatus :"+$scope.dstatus);
		 //    if(status == "Declined")
			// {	
		 //    	$("loaderImg").show();
		 //    	$timeout( function(){ $location.path("/cdl/dashboard"); }, 3000);
			//      $rootScope.errHead="";
			//      $rootScope.errorMsg="";
			// }  else {
			// 	$('#additionalDoc').hide();
			// 	$('#additionalDocfinal').show();
			// }
		};

		$scope.updateStatus = function(){
			var updateJson ={"sRefID":$scope.referenceID};
			// console.log("Input JSON for status update :"+$scope.updateJson);

			RestService.saveToServer('post-ipa-stage-update', updateJson)
			.then(function(data){
				if(data){
					if(status == "Declined")
					{
				    	$location.path("/cdl/dashboard");
					}  else {
						$('#additionalDoc').hide();
						$('#additionalDocfinal').show();
					}
				}
			},function(failedResponse){
				notifier.logError("Sorry we can not reset the stage.");
			});
		};
	}]);
}).call(this);