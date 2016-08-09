;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");
	app.controller("ChangeAssetCtrlr",["$scope","asset",function($scope,asset){
		$scope.asset=asset;
	}]);

	app.controller("PostIPAController",["$scope","sharedService","$location","UserService","RestService","notifier","$uibModal",
				function($scope,sharedService,$location,UserService,RestService,notifier,$uibModal){

		$scope.asset={
			category:"",
			make:"",
			model:""
		};

		$scope.approvedAmt="";
		$scope.astCst="";

		var user=UserService.getCurrentUser();

		if(sharedService.getDealerCode())
		{
			$scope.dealerID=sharedService.getDealerCode();
			sharedService.setDealerCode(null);
		}

		if(sharedService.getApplicationData()){
			$scope.applicationData = sharedService.getApplicationData();
			$scope.applicationID = $scope.applicationData.oHeader.sAppID;
			sharedService.getApplicationData(null);

			$scope.fname = $scope.applicationData.oReq.oApplicant.oApplName.sFirstName;
			$scope.mname = $scope.applicationData.oReq.oApplicant.oApplName.sMiddleName;
			$scope.lname = $scope.applicationData.oReq.oApplicant.oApplName.sLastName;

			$scope.asset.category=$scope.applicationData.oReq.oApplication.aAssetDetail[0].sAssetCtg;
			$scope.asset.make =$scope.applicationData.oReq.oApplication.aAssetDetail[0].sAssetMake;
			$scope.asset.model=$scope.applicationData.oReq.oApplication.aAssetDetail[0].sModelNo;

			$scope.dealerCode=$scope.applicationData.oHeader.sDealerId;
		}else{
			$location.path("/cdl/basic-de");
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
				$location.path("/cdl/basic-de");
			}

			var json={
				"sRefID":$scope.referenceID,
				"oHeader": {
					"sCroId": "default",
					"dtSubmit":new Date().getTime(),
					"sReqType": "JSON",
					"sAppSource" : "WEB",
					"sDsaId":user.username,
					"sAppID": $scope.applicationID,
					"sSourceID":"",
					"sInstID":user.institutionID
				}
			};

			RestService.saveToServer('status', json)
			.then(function(data){
				if(data){
					$scope.statusObject=data;
					//$scope.approvedAmt=data.aCroDec[0].dAmtAppr;
					$scope.approvedAmt=100000;
				}
			},function(failedResponse){
				notifier.logError("Sorry we cannot process your application status request");
			});
		}

		// *********************SCHEME SERVICE***********************************************************
		$scope.allSchemes = "";
		$scope.scmTags = [];

		$scope.onMoneyInstrumentChanged=function(){
			if($scope.mnyInstn && $scope.mnyInstn!="Cash")
		 	{
				$("#mnyCnfmDiv").show();
		 	}else{
				$("#mnyCnfmDiv").hide();
		 	}
		};

		$scope.scmService = function(){
		//	$scope.scmJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":"key"}; 
			var scmJson ={
				"sRefID": $scope.referenceID,
				"oHeader": {
					"sCroId": "default",
					"dtSubmit":new Date().getTime(),
					"sReqType":"JSON",
					"sAppSource": "WEB",
					"sDsaId":user.username,
					"sAppID": $scope.applicationID,
					"sDealerId": $scope.dealerCode,
					"sSourceID": "GONOGO_HDBFS",
					"sInstID": user.institutionID
				},
				"sModelNo": $scope.asset.model,
				"sCatDsc":  $scope.asset.category,
				"sMfrDscr": $scope.asset.make
			};

			RestService.saveToServer('filtered-scheme-master', scmJson)
			.then(function(data){
				if(data){
					$scope.allSchemes = data;
				 	$scope.scmTags=[];
					for(var i in data){   
						$scope.scmTags.push(data[i].sSchDes)
					}
				}
			},function(failedResponse){
				$scope.serviceHitCount=$scope.serviceHitCount+1;
				if($scope.serviceHitCount<=3)
				{
				  	$scope.scmService();
				}
				else{
					$scope.serviceHitCount=1;
					notifier.logError("Sorry we can not process your scheme request");
				}
			});
		};
		$scope.scmService();

		// to set the emi and other value for selected scheme
		// $('#scheme').on('autocompleteselect', function (e, ui) 
		$scope.onSchemeSelected =function(ui)
		{
			$scope.SchemeObject = null;
			for(var key in $scope.allSchemes)
			{
			 	if($scope.allSchemes[key].sSchDes==ui)
			 	{
				 	$scope.SchemeObject=$scope.allSchemes[key];
//			 		console.log("$scope.SchemeObject : "+ JSON.stringify($scope.SchemeObject));
				 	break;
			 	}
			}

			if($scope.SchemeObject){
			// 	var tAprAmt = parseFloat($("#apvAmt").val().toString().replace(/,/g,""));
			// 	var tAsstCst = parseFloat($("#astCst").val().toString().replace(/,/g,""));
			// 	if(!$scope.SchemeObject.sMxTenu)
			// 	{
			// 		$scope.SchemeObject.sMxTenu=0;
			// 	}
			// 	if(!$scope.SchemeObject.sMinTenu)
			// 	{
			// 		$scope.SchemeObject.sMinTenu=0;
			// 	}
			// 	if(!$scope.SchemeObject.sDint)
			// 	{
			// 		$scope.SchemeObject.sDint=0;
			// 	}	
			// 	if(!$scope.SchemeObject.sMinAmt)
			// 	{
			// 		$scope.SchemeObject.sMinAmt=0;
			// 	}

			// 	var tadEmi = 0;
			// 	var temi=0;
			// 	if(tAprAmt < tAsstCst)
			// 	{	
			// 		temi = (tAprAmt/parseFloat($scope.SchemeObject.sMxTenu));
			// 		temi =  Math.ceil(temi);
			// 		tadEmi=(temi * parseFloat($scope.SchemeObject.sMinTenu));
			// 	} else {
			// 		temi =  (tAsstCst/parseFloat($scope.SchemeObject.sMxTenu));
			// 	 	temi =  Math.ceil(temi);
			// 	 	tadEmi=( temi * parseFloat($scope.SchemeObject.sMinTenu));
			// 	}

			// 	tadEmi=  Math.ceil(tadEmi);
			// 	$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";

			// 	if(tAprAmt < tAsstCst)
			// 	{
			// 	  	$scope.dltSrchrg = (tAprAmt * (parseFloat($scope.SchemeObject.sDint)/100));
			// 	} else {
			// 	  	$scope.dltSrchrg = (tAsstCst * (parseFloat($scope.SchemeObject.sDint)/100));
			// 	}
			// 	Math.round($scope.dltSrchrg)
			// 	$("#aEMI").val(tadEmi).siblings("help").show();
			// 	$("#emi").val(temi).siblings("help").show();
			// //	$("#mrgnMny").val(tMrgnMny).prev().show();
			// 	$("#prcsfee").val( Math.ceil($scope.SchemeObject.sMinAmt)).siblings("help").show();

				$scope.calculateEmi();
			}
		};

		// $(document.body).on("click","#postNext",function(){
		// 	var bool=validation();
		// 	if(bool)
		// 	{	$scope.ipaService(); }	
		// });

		$scope.calculateEmi=function(){
			var tMrgnMny;
			var tAprAmt = parseFloat(($scope.approvedAmt+"").replace(/,/g,""));	
			var tAsstCst = parseFloat($scope.astCst.replace(/,/g,""));

			if(tAsstCst >= tAprAmt){ 
				tMrgnMny = tAsstCst-tAprAmt; 
			}else{
				tMrgnMny=0;
			}

			if(tMrgnMny<=0)
			{
			 	$("#mnyInstrDiv, #mnyCnfmDiv").hide();
			}else{
				$("#mnyInstrDiv, #mnyCnfmDiv").show();
			}
			/*var tAprAmt = parseFloat($("#apvAmt").val().toString().replace(/,/g,""));
			var tAsstCst = parseFloat($("#astCst").val().toString().replace(/,/g,""));*/
			
			if($scope.SchemeObject){
				if(!$scope.SchemeObject.sMxTenu)
				{
					$scope.SchemeObject.sMxTenu=0;
				}
				if(!$scope.SchemeObject.sMinTenu)
				{
					$scope.SchemeObject.sMinTenu=0;
				}
				if(!$scope.SchemeObject.sDint)
				{
					$scope.SchemeObject.sDint=0;
				}
				if(!$scope.SchemeObject.sMinAmt)
				{
					$scope.SchemeObject.sMinAmt=0;
				}	
				var tadEmi = 0;
				var temi=0;
				if(tAprAmt < tAsstCst)

				{	
					temi = (tAprAmt/parseFloat($scope.SchemeObject.sMxTenu));
					temi =  Math.ceil(temi);
					tadEmi=(temi * parseFloat($scope.SchemeObject.sMinTenu));
				}else{
					temi =  (tAsstCst/parseFloat($scope.SchemeObject.sMxTenu))
					temi =  Math.ceil(temi);
					tadEmi=(temi * parseFloat($scope.SchemeObject.sMinTenu));
				}
				tadEmi=  Math.ceil(tadEmi);
			//	$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";
				if(tAprAmt < tAsstCst)
				{
			  		$scope.dltSrchrg = (tAprAmt * (parseFloat($scope.SchemeObject.sDint)/100));
				}else{
			  		$scope.dltSrchrg = (tAsstCst * (parseFloat($scope.SchemeObject.sDint)/100));
				}
				Math.round($scope.dltSrchrg);
				$("#aEMI").val(tadEmi).siblings("help").show();
				$("#emi").val(temi).siblings("help").show();
				$("#mrgnMny").val(tMrgnMny).siblings("help").show();
				$("#prcsfee").val( Math.ceil($scope.SchemeObject.sMinAmt)).siblings("help").show();
			}
		};

		//send post ipa data and start flow
		$scope.ipaService = function()
		{	
			$scope.ipaJson={
				"oHeader": {
					"sCroId": "default",
					"dtSubmit": new Date().getTime(),
					"sReqType":"JSON",
					"sAppSource": "WEB",
					"sDsaId": $scope.username,
					"sAppID": "",
					"sDealerId":$scope.dealerID,
					"sSourceID":"HDBFS_CDL",
					"sInstID": user.institutionID
				},
				"opostIPA": {
					"dOtherChrg": 0,
					"sScheme": $scope.pstIpaSchmExp,
					"dDelSubven": $scope.dltSrchrg,
					"aAssMdl": [],
					"sMarginMoneyInstru": $("#mnyInstn").val(),
					"dTotAssCost":$("#astCst").val().replace(/,/g,''),
					"aAssMdls": [{
						"sAssetCtg":$("#ast").val(),
						"sDlrName":$scope.dealerName,
						"sModelNo":$("#mdl").val(),
						"sAssetMake":$("#mk").val()
					}],
					"dProcFees": $("#prcsfee").val().replace(/,/g,''),
					"dApvAmt": $("#apvAmt").val().replace(/,/g,''),
					"sMarMoneyConfirm": $("#mnyCnfm").val().replace(/,/g,''),
					"dMarMoney": $("#mrgnMny").val().replace(/,/g,''),
					"dAdvEmi": $("#aEMI").val(),
					"dManfSubDel": 0
				},
				"sRefID": $scope.REFID,
				"refID":  $scope.REFID,
				"dtDateTime": new Date().getTime()
			};
		//	console.log("$scope.ipaJson :"+$scope.ipaJson);
			$http({
				method : 'POST',
				url : APP_CONST.getConst('BASE_URL_GNG')+'post-ipa-pdf',
				data :$scope.ipaJson,
				headers : {'Content-Type':'application/json'}
			}).success(function(data) 
			{	
				// console.log("Response Data post IPA : " + JSON.stringify(data));
			  	// post ipa pdf id will availeble here
				if(data.sStat=="SUCCESS")
				{    
					$scope.postIpaPdfId=data.sDocID;
					$scope.postIpaPDFCode = "data:application/pdf;base64,"+data.sByteCode;
					$("#pOrder").hide();
					$("#additionalDoc").show();
				}
			}).error(function(data) 
			{
				$scope.serviceHitCount=$scope.serviceHitCount+1;
				if($scope.serviceHitCount<=3)
					{
					  $scope.ipaService();
					}
				else{
					$scope.serviceHitCount=1;
					$scope.error="Sorry we can not process your Asset request";
				}	
			});
			$("#pOrder").hide();
			$("#additionalDoc").show();
		}

		/*
		$scope.ipaJSonFunction=function()
		{	
			// $scope.postIPANum=[];
			// $('input','#apc').each(function(index,ele)
			// {
			//   $scope.postIPANum.push($(this).val());
			// });

			// console.log("Asset Category : " + $scope.assetCategory);
			$scope.ipaJson={
					  "oHeader": {
						    "sCroId": "default",
						    "dtSubmit": new Date().getTime(),
						    "sReqType":"JSON",
						    "sAppSource": "WEB",
						    "sDsaId": $scope.username,
						    "sAppID": "",
						    "sDealerId":dlrCode,
						    "sSourceID":"HDBFS_CDL",
						    "sInstID": "4019"
						  },
						  "opostIPA": {
						    "dOtherChrg": 0,
						    "sScheme": $scope.pstIpaSchmExp,
						    "dDelSubven": $scope.dltSrchrg,
						    "aAssMdl": [],
						    "sMarginMoneyInstru": $("#mnyInstn").val(),
						    "dTotAssCost":$("#astCst").val().replace(/,/g,''),
						    "aAssMdls": [{
						    	"sAssetCtg":$("#ast").val(),
						    	"sDlrName":$scope.dealerName,
						    	"sModelNo":$("#mdl").val(),
						    	"sAssetMake":$("#mk").val()
						    }],
						    "dProcFees": $("#prcsfee").val().replace(/,/g,''),
						    "dApvAmt": $("#apvAmt").val().replace(/,/g,''),
						    "sMarMoneyConfirm": $("#mnyCnfm").val().replace(/,/g,''),
						    "dMarMoney": $("#mrgnMny").val().replace(/,/g,''),
						    "dAdvEmi": $("#aEMI").val(),
						    "dManfSubDel": 0
						  },
						  "sRefID": $scope.REFID,
						  "refID":  $scope.REFID,
						  "dtDateTime": new Date().getTime()
						}

		 	// console.log("post ipa request"+JSON.stringify($scope.ipaJson));
		}*/
		$scope.onChangeAssetClicked=function(asset){
			var modalInstance = $uibModal.open({
              	animation: $scope.animationsEnabled,
              	templateUrl: 'views/cdl/modal-change-asset.html',
              	controller: 'ChangeAssetCtrlr',
              	size: 'lg',    
              	resolve:{
                	asset : function (){
                    	return asset;
                	}
              	}
            });

            modalInstance.result.then(function (asset) {
            	console.log("New Asset");
            	console.log(asset);
        	}, function (array) {
            
        	});
    	};
	}]);
}).call(this);