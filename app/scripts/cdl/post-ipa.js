;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");

	app.controller("PostIPAController",["$scope","sharedService","$location","UserService",
				function($scope,sharedService,$location,UserService){

		// *********************SCHEME SERVICE***********************************************************
		$scope.allSchemes = "";
		$scope.scmTags = [];

		$scope.scmService = function(key){
			if( key !=undefined)
			{
				modelNo=key.model;
				make=key.make;
			}
		//	$scope.scmJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":"key"}; 
			$scope.scmJson ={
				"sRefID": $scope.REFID,
				"oHeader": {
					"sCroId": "default",
					"dtSubmit":new Date().getTime(),
					"sReqType":"JSON",
					"sAppSource": "WEB",
					"sDsaId":$scope.username,
					"sAppID": $scope.REFID,
					"sDealerId": dlrCode,
					"sSourceID": "GONOGO_HDBFS",
					"sInstID": $scope.InstitutionID
				},
				"sModelNo": modelNo,
				"sCatDsc":$scope.assetCategory,
				"sMfrDscr":make
			}
			// console.log("$scope.scmJson Input JSON"+JSON.stringify($scope.scmJson));
			$http({
				method : 'POST',
				url : APP_CONST.getConst('BASE_URL_GNG')+'filtered-scheme-master',
				data :$scope.scmJson,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data)
		 	{	
			 	$scope.allSchemes = data;
			 	$scope.scmTags=[];
				for(var i in data){   
					$scope.scmTags.push(data[i].sSchDes)
				}
				/*$("#scheme").autocomplete({
					source: $scope.scmTags
				});*/
				//console.log("Data Scheme master : " + JSON.stringify(data));
				//console.log("Data ScHIT124DBD1heme master : " + $scope.scmTags);
			}).error(function(data) 
				{
				$scope.serviceHitCount=$scope.serviceHitCount+1;
				if($scope.serviceHitCount<=3)
				{
				  $scope.scmService(key);
				}
				else{
					$scope.serviceHitCount=1;
					$scope.error="Sorry we can not process your Scheme request";
				}
			});
		};

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
		//			 	console.log("$scope.SchemeObject : "+ JSON.stringify($scope.SchemeObject));
				 	break;
			 	}
			}

			if($scope.SchemeObject){
				var taprAmt = parseFloat($("#apvAmt").val().toString().replace(/,/g,""));
				var ttlAsstCst = parseFloat($("#astCst").val().toString().replace(/,/g,""));
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
				if(taprAmt < ttlAsstCst)
				{	
						temi = (taprAmt/parseFloat($scope.SchemeObject.sMxTenu));
						temi =  Math.ceil(temi);
						tadEmi=(temi * parseFloat($scope.SchemeObject.sMinTenu));
				} else {
					temi =  (ttlAsstCst/parseFloat($scope.SchemeObject.sMxTenu));
				 	temi =  Math.ceil(temi);
				 	tadEmi=( temi * parseFloat($scope.SchemeObject.sMinTenu));
				}

				tadEmi=  Math.ceil(tadEmi);
				$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";

				if(taprAmt < ttlAsstCst)
				{
				  	$scope.dltSrchrg = (taprAmt * (parseFloat($scope.SchemeObject.sDint)/100));
				} else {
				  	$scope.dltSrchrg = (ttlAsstCst * (parseFloat($scope.SchemeObject.sDint)/100));
				}
				Math.round($scope.dltSrchrg)
				$("#aEMI").val(tadEmi).siblings("help").show();
				$("#emi").val(temi).siblings("help").show();
			//	$("#mrgnMny").val(tmrgnMny).prev().show();
				$("#prcsfee").val( Math.ceil($scope.SchemeObject.sMinAmt)).siblings("help").show();
			}
		};

		$("#astCst").keyup(function(){
			var tmrgnMny;
			var taprAmt = parseFloat($("#apvAmt").val().toString().replace(/,/g,""));	
			var ttlAsstCst = parseFloat($("#astCst").val().toString().replace(/,/g,""));
			
			if(ttlAsstCst >= taprAmt)
			{ tmrgnMny = ttlAsstCst-taprAmt; 
			}else{
				tmrgnMny=0;
			}	
			if(tmrgnMny<=0)
			{
			 $("#mnyInstrDiv, #mnyCnfmDiv").hide();
			}else
				{
				$("#mnyInstrDiv, #mnyCnfmDiv").show();
				}
			/*var taprAmt = parseFloat($("#apvAmt").val().toString().replace(/,/g,""));
			var ttlAsstCst = parseFloat($("#astCst").val().toString().replace(/,/g,""));*/
			if($scope.SchemeObject.sMxTenu)
			{
				$scope.SchemeObject.sMxTenu=0;
			}
			if($scope.SchemeObject.sMinTenu)
			{
				$scope.SchemeObject.sMinTenu=0;
			}
			if($scope.SchemeObject.sDint)
			{
				$scope.SchemeObject.sDint=0;
			}
			if($scope.SchemeObject.sMinAmt)
			{
				$scope.SchemeObject.sMinAmt=0;
			}	
			var tadEmi = 0;
			var temi=0;
			if(taprAmt < ttlAsstCst)
			{	
					temi = (taprAmt/parseFloat($scope.SchemeObject.sMxTenu));
					temi =  Math.ceil(temi);
					tadEmi=(temi * parseFloat($scope.SchemeObject.sMinTenu));
			}else
				{
				 temi =  (ttlAsstCst/parseFloat($scope.SchemeObject.sMxTenu))
				 temi =  Math.ceil(temi);
				 tadEmi=(temi * parseFloat($scope.SchemeObject.sMinTenu));
				}
				tadEmi=  Math.ceil(tadEmi);
		//	$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";
			if(taprAmt < ttlAsstCst)
			{
			  $scope.dltSrchrg = (taprAmt * (parseFloat($scope.SchemeObject.sDint)/100));
			}else
				{
				  $scope.dltSrchrg = (ttlAsstCst * (parseFloat($scope.SchemeObject.sDint)/100));
				}
			Math.round($scope.dltSrchrg);
			$("#aEMI").val(tadEmi).siblings("help").show();
			$("#emi").val(temi).siblings("help").show();
			$("#mrgnMny").val(tmrgnMny).siblings("help").show();
		});

		$(document.body).on("click","#postNext",function(){
			var bool=validation();
			if(bool)
			{	$scope.ipaService(); }	
		});

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

	}]);
}).call(this);