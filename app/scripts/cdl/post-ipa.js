;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");
	app.controller("ChangeAssetCtrlr",["$scope","asset","$mdDialog",function($scope,asset,$mdDialog){
		$scope.asset=asset;

   //  	$scope.onSaveAssetClicked=function(){
			// // var json = {"make":$("#mk1").val(),"model":$("#mdl1").val()}

			// $uibModalInstance.close($scope.asset);
	  // 	}

	  	$scope.onSaveAssetClicked = function() {
      		$mdDialog.hide($scope.asset);
	    };

	    $scope.cancel = function() {
      		$mdDialog.cancel();
    	};
	  	
	}]);

	app.controller("DeductionCntrl",["$scope","deductionAmts","$mdDialog",function($scope,deductionAmts,$mdDialog){

		$scope.dealerSubvention=deductionAmts.dealerSubvention,
    	$scope.manufactureSubvention=deductionAmts.manufactureSubvention,
    	$scope.manufacturerProcessingFee=deductionAmts.manufacturerProcessingFee,
    	$scope.manufactureSubventionBourneByDealer=deductionAmts.manufactureSubventionBourneByDealer,
    	$scope.otherCharges=deductionAmts.otherCharges;

	    $scope.cancel = function() {
      		$mdDialog.cancel();
    	};
	}]);

	// function ChangeAssetCtrlr($scope, $mdDialog) {
	// 	$scope.onSaveAssetClicked = function() {
 //      		$mdDialog.hide($scope.asset);
	//     };
	// }

	app.controller("PostIPAController",["$scope","sharedService","UserService","RestService","notifier","$uibModal","$state","$mdDialog",
				function($scope,sharedService,UserService,RestService,notifier,$uibModal,$state,$mdDialog){

		$scope.asset={
			category:"",
			make:"",
			model:""
		};

		$scope.approvedAmt="0";
		$scope.astCst="0";
		$scope.tMrgnMny="0";

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
			$scope.dealerName=$scope.applicationData.oReq.oApplication.aAssetDetail[0].sDlrName;

			$scope.dealerCode=$scope.applicationData.oHeader.sDealerId;
		}else{
			$state.go("/cdl/basic-de");
			return;
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
				return;
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
					$scope.approvedAmt=data.aCroDec[0].dAmtAppr;

					//HARD CODED
					//$scope.approvedAmt=100000;
					//HARD CODED
				}else{
					notifier.logError("We cannot process your application status request, please try again or contact system admin.");
				}
			},function(failedResponse){
				notifier.logError("Sorry we cannot process your application status request");
			});
		}

		// *********************SCHEME SERVICE***********************************************************
		$scope.allSchemes = "";
		$scope.scmTags = [];

		$scope.onMoneyInstrumentChanged=function(instrumentSelected){
			$scope.mnyInstn=instrumentSelected;
			// if($scope.mnyInstn && $scope.mnyInstn!="Cash")
		 // 	{
			// 	$("#mnyCnfmDiv").show();
		 // 	}else{
			// 	$("#mnyCnfmDiv").hide();
		 // 	}
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
					"sDealerId": $scope.dealerID,
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

				$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";

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

				$scope.calculateValues();
			}else{
				notifier.logError("Sorry scheme not found");
			}
		};

		// $(document.body).on("click","#postNext",function(){
		// 	var bool=validation();
		// 	if(bool)
		// 	{	$scope.ipaService(); }	
		// });

		/*
		$scope.calculateEmi=function(){			
			var tAprAmt = parseFloat(($scope.approvedAmt ? ($scope.approvedAmt+"") : "0").replace(/,/g,""));	
			var tAsstCst = parseFloat(($scope.astCst ? $scope.astCst : "0") .replace(/,/g,""));

			if(tAsstCst >= tAprAmt){ 
				$scope.tMrgnMny = (tAsstCst-tAprAmt)+""; 
			}else{
				$scope.tMrgnMny="0";
			}

			// if($scope.tMrgnMny<=0)
			// {
			//  	$("#mnyInstrDiv, #mnyCnfmDiv").hide();
			// }else{
			// 	$("#mnyInstrDiv, #mnyCnfmDiv").show();
			// }

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
				$scope.tadEmi = 0;
				$scope.temi=0;
				if(tAprAmt < tAsstCst)

				{	
					$scope.temi = (tAprAmt/parseFloat($scope.SchemeObject.sMxTenu));
					$scope.temi =  Math.ceil($scope.temi);
					$scope.tadEmi=($scope.temi * parseFloat($scope.SchemeObject.sMinTenu));
				}else{
					$scope.temi =  (tAsstCst/parseFloat($scope.SchemeObject.sMxTenu))
					$scope.temi =  Math.ceil($scope.temi);
					$scope.tadEmi=($scope.temi * parseFloat($scope.SchemeObject.sMinTenu));
				}
				$scope.tadEmi=  Math.ceil($scope.tadEmi);
				$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";
				if(tAprAmt < tAsstCst)
				{
			  		$scope.dltSrchrg = (tAprAmt * (parseFloat($scope.SchemeObject.sDint)/100));
				}else{
			  		$scope.dltSrchrg = (tAsstCst * (parseFloat($scope.SchemeObject.sDint)/100));
				}
				$scope.dltSrchrg=Math.round($scope.dltSrchrg);
				// $("#aEMI").val(tadEmi).siblings("help").show();
				// $("#emi").val($scope.temi).siblings("help").show();
				// $("#mrgnMny").val($scope.tMrgnMny).siblings("help").show();

				$scope.SchemeObject.sMinAmt=Math.ceil($scope.SchemeObject.sMinAmt);
				//$("#prcsfee").val( Math.ceil($scope.SchemeObject.sMinAmt)).siblings("help").show();
			}
		};*/


		$scope.calculateValues=function() {
			// $("#financeAmt").siblings("help").show();
			// $("#prcsfee").siblings("help").show();
			// $("#aEMI").siblings("help").show();
			// $("#emi").siblings("help").show();
			// $("#mrgnMny").siblings("help").show();
			// $("#ipaTenor").siblings("help").show();
			// $("#ipaAdvEmiTenor").siblings("help").show();
			// $("#ipaNetFundingAmt").siblings("help").show();
			// $("#ipaNetDisbAmt").siblings("help").show();

			if($scope.SchemeObject){
				//console.log("Scheme selected");
				//console.log($scope.SchemeObject);

				var totalAssetCostVal=parseFloat( ( $scope.astCst ? $scope.astCst : 0 ).toString().replace(/,/g,""));
				var marginMoneyVal=parseFloat(( $scope.tMrgnMny ? $scope.tMrgnMny : 0 ).toString().replace(/,/g,""));
				var tenorVal=$scope.SchemeObject.sMxTenu ? $scope.SchemeObject.sMxTenu : 0;
				var advanceEmiTenorVal=$scope.SchemeObject.sMinTenu ? $scope.SchemeObject.sMinTenu : 0;
				var processingFeeVal=parseInt($scope.SchemeObject.sMinAmt ? $scope.SchemeObject.sMinAmt : 0);
				var sdIntVal=$scope.SchemeObject.sDint ? $scope.SchemeObject.sDint : 0;
				var sdRateVal=$scope.SchemeObject.sDRte ? $scope.SchemeObject.sDRte : 0;
				var sdAmtVal=$scope.SchemeObject.sDAmt ? $scope.SchemeObject.sDAmt : 0;

			    //Total Asset Cost - Margin Money
			    var financeAmount = totalAssetCostVal - marginMoneyVal;

			//     if (financeAmount > 0) {
			//         financeAmount = 0;
			//     }
			    //console.log("Value for finance amount :" + financeAmount);

			    //Finance Amount / Tenor
			    var emiWithoutCeil = financeAmount / tenorVal;
			    var emi = Math.ceil(emiWithoutCeil);
			//     emi = emiWithoutCeil;

			    //EMI * Advance EMI Tenor
			    var advanceEMI = emi * advanceEmiTenorVal;

			    //Finance Amount - Advance EMI
			    var netFundingAmount = financeAmount - advanceEMI;

			    //financeAmount * ((sdInt)/100)
			    var dealerSubventionBeforeRound = financeAmount * (sdIntVal / 100);
			    var dealerSubvention = Math.round(dealerSubventionBeforeRound);

			    //financeAmount * ((sdRate)/100)
			    var manufactureSubventionBourneByDealerBeforeRound = financeAmount * (sdRateVal / 100);
			    var manufactureSubventionBourneByDealer = Math.round(manufactureSubventionBourneByDealerBeforeRound);

			    //financeAmount * ((sdAmt)/100)
			    var manufactureSubventionBeforeRound = financeAmount * (sdAmtVal / 100);

			    var manufactureSubvention = Math.round(manufactureSubventionBeforeRound);

			    var manufacturerProcessingFee = 0;

			    var otherCharges = 0;

			    var netDisbursalAmount = financeAmount -
	               (advanceEMI + processingFeeVal + dealerSubvention + otherCharges);

			    $scope.financeAmt=financeAmount;
			    $scope.prcsfee=processingFeeVal;
			    $scope.temi=emi;
			    $scope.tadEmi=advanceEMI;
			    $scope.ipaTenor=tenorVal;
			    $scope.ipaAdvEmiTenor=advanceEmiTenorVal;
			    $scope.ipaNetFundingAmt=netFundingAmount;
			    $scope.ipaNetDisbAmt=netDisbursalAmount;

			    $scope.dealerSubvention=dealerSubvention;	    
			    $scope.manufactureSubvention=manufactureSubvention;
			    $scope.manufacturerProcessingFee=manufacturerProcessingFee;
			    $scope.manufactureSubventionBourneByDealer=manufactureSubventionBourneByDealer;
			    $scope.otherCharges=otherCharges;
			}else{
				 notifier.logError("Please select scheme !");
			}
		}

		//send post ipa data and start flow
		$scope.sendPostIPAData = function(isFormInvalid)
		{	
			// $scope.ipaJson={
			// 	"oHeader": {
			// 		"sCroId": "default",
			// 		"dtSubmit": new Date().getTime(),
			// 		"sReqType":"JSON",
			// 		"sAppSource": "WEB",
			// 		"sDsaId": $scope.username,
			// 		"sAppID": "",
			// 		"sDealerId":$scope.dealerID,
			// 		"sSourceID":"HDBFS_CDL",
			// 		"sInstID": user.institutionID
			// 	},
			// 	"opostIPA": {
			// 		"dOtherChrg": 0,
			// 		"sScheme": $scope.pstIpaSchmExp,
			// 		"dDelSubven": $scope.dltSrchrg,
			// 		"aAssMdl": [],
			// 		"sMarginMoneyInstru": $scope.mnyInstn,
			// 		"dTotAssCost":$scope.astCst.replace(/,/g,''),
			// 		"aAssMdls": [{
			// 			"sAssetCtg":$scope.asset.category,
			// 			"sDlrName":$scope.dealerName,
			// 			"sModelNo":$scope.asset.model,
			// 			"sAssetMake":$scope.asset.make
			// 		}],
			// 		"dProcFees": ($scope.SchemeObject.sMinAmt+"").replace(/,/g,''),
			// 		"dApvAmt": $scope.approvedAmt.replace(/,/g,''),
			// 		"sMarMoneyConfirm": $scope.mnyCnfm,
			// 		"dMarMoney": ($scope.tMrgnMny+"").replace(/,/g,''),
			// 		"dAdvEmi": $scope.tadEmi ? ($scope.tadEmi+"").replace(/,/g,'') : "0" ,
			// 		"dManfSubDel": 0
			// 	},
			// 	"sRefID": $scope.referenceID,
			// 	"dtDateTime": new Date().getTime()
			// };
			if(!isFormInvalid){
				$scope.ipaJson={
					"oHeader":
					{
						"sCroId":"default",
						"dtSubmit":new Date().getTime(),
						"sReqType":"JSON",
						"sAppSource":"WEB",
						"sDsaId":user.username,
						"sAppID":$scope.applicationID,
						"sDealerId": $scope.dealerID,
						"sSourceID": "GONOGO_HDBFS",
						"sInstID": user.institutionID
					},
					"opostIPA":
					{
						"dOtherChrg":$scope.otherCharges,
						"sScheme":$scope.pstIpaSchmExp,
						"dManSubMbd":$scope.manufactureSubventionBourneByDealer,
						"aAssMdl":null,
						"dNetDisbursalAmt": $scope.ipaNetDisbAmt.toString().replace(/,/g,''),
						"dNetFundingAmt":$scope.ipaNetFundingAmt.toString().replace(/,/g,''),
						"aAssMdls":[
						            {
						            	"sAssetCtg":$scope.asset.category,
						            	"sPrice":"",
						            	"sDlrName":$scope.dealerName,
						            	"sModelNo":$scope.asset.model,
						            	"sAssetMake":$scope.asset.make
				            		}],
			    		"iAdvEmiTenor":$scope.ipaAdvEmiTenor,
			    		"dProcFees":$scope.prcsfee.toString().replace(/,/g,''),
			    		"sMarMoneyConfirm":$scope.mnyCnfm,
			    		"dEmi":$scope.temi.toString().replace(/,/g,''),
			    		"dManfSubDel": $scope.manufactureSubvention.toString().replace(/,/g,''),
			    		"dFinanceAmt": $scope.financeAmt.toString().replace(/,/g,''),
			    		"dManProcFee":$scope.manufacturerProcessingFee.toString().replace(/,/g,''),
			    		"dDelSubven":$scope.dealerSubvention.toString().replace(/,/g,''),
			    		"iTenor":$scope.ipaTenor,
			    		"sMarginMoneyInstru":$scope.mnyInstn,
			    		"dTotAssCost":$scope.astCst.toString().replace(/,/g,''),
			    		"dApvAmt":$scope.approvedAmt.toString().replace(/,/g,''),
			    		"dMarMoney":$scope.tMrgnMny.toString().replace(/,/g,''),
			    		"dAdvEmi":$scope.tadEmi ? $scope.tadEmi.toString().replace(/,/g,'') : "0" ,
			    	},
					"sRefID":$scope.referenceID,
					"dtDateTime":new Date().getTime()
				};	

				RestService.saveToServer('post-ipa-pdf', $scope.ipaJson)
				.then(function(data){
					if(data && data.sStat=="SUCCESS"){

						var doDoc={
							sDocID:data.sDocID,
							sByteCode:data.sByteCode
						}
						// $scope.postIpaPdfId=data.sDocID;
						// $scope.postIpaPDFCode = "data:application/pdf;base64,"+data.sByteCode;
						// $("#pOrder").hide();
						// $("#additionalDoc").show();

						sharedService.setRefID($scope.referenceID);
						sharedService.setApplicationStatus($scope.statusObject);
						sharedService.setDODocument(doDoc);

					 	$state.go("/cdl/additnl-doc");
					}else{
						notifier.logError("Sorry we can not process your asset request, please try again or contact system admin.");
					}
				},function(failedResponse){
					$scope.serviceHitCount=$scope.serviceHitCount+1;
					if($scope.serviceHitCount<=3)
					{
					  	$scope.sendPostIPAData();
					} else {
						$scope.serviceHitCount=1;
						notifier.logError("Sorry we can not process your Asset request");
					}
				});
			}
		};

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
		$scope.onChangeAssetClicked=function(event){
			// var modalInstance = $uibModal.open({
   //            	animation: $scope.animationsEnabled,
   //            	templateUrl: 'views/cdl/modal-change-asset.html',
   //            	controller: 'ChangeAssetCtrlr',
   //            	size: 'lg',    
   //            	resolve:{
   //              	asset : function (){
   //                  	return asset;
   //              	}
   //            	}
   //          });

   //          modalInstance.result.then(function (asset) {
   //          	//console.log("New Asset");
   //          	//console.log(asset);
   //          	$scope.asset=asset;
			// 	$scope.scmService();
   //      	}, function (array) {});

        	$mdDialog.show({
	      		controller: 'ChangeAssetCtrlr',
		      	templateUrl: 'views/cdl/modal-change-asset.html',
		      	parent: angular.element(document.body),
		      	targetEvent: event,
		      	clickOutsideToClose:true,
		      	fullscreen: false,// Only for -xs, -sm breakpoints.
		      	locals: {
					asset: $scope.asset
				} 
		    })
		    .then(function(asset) {
		      	$scope.asset=asset;
				$scope.scmService();
		    }, function() {
		      	$scope.status = 'You cancelled the dialog.';
		    });
    	};

    	$scope.onShowDeductionClicked=function(event){

    		var amts={
    			dealerSubvention:$scope.dealerSubvention,
    			manufactureSubvention:$scope.manufactureSubvention,
    			manufacturerProcessingFee:$scope.manufacturerProcessingFee,
    			manufactureSubventionBourneByDealer:$scope.manufactureSubventionBourneByDealer,
    			otherCharges:$scope.otherCharges
    		};

        	$mdDialog.show({
	      		controller: 'DeductionCntrl',
		      	templateUrl: 'views/cdl/modal-ipa-deduction.html',
		      	parent: angular.element(document.body),
		      	targetEvent: event,
		      	clickOutsideToClose:true,
		      	fullscreen: false,// Only for -xs, -sm breakpoints.
		      	locals: {
					deductionAmts: amts
				} 
		    })
		    .then(function() {},function() {});
    	};
	}]);
}).call(this);