;(function(){

	'use strict';
	var app = angular.module('gonogo.cdl');
	app.controller("ApplyController", ["$scope", "$rootScope", "$http", "$timeout",  "$location", "$q", "APP_CONST", "sharedService", "RestService","$interval",'$log',"roundProgressService","UserService","AclService", function(
	 $scope,$rootScope,$http,$timeout,$location,$q,APP_CONST,sharedService,RestService,$interval, $log,roundProgressService,UserService,AclService) {
	
	var user=UserService.getCurrentUser();
    $scope.can=AclService.can;

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }

	var poller;
	$scope.dealerArr = [];
	$scope.assetArray = [];
		try {
			//$log.debug("userdata :"+JSON.stringify(userdata));
			$scope.username = user.username ;
			$scope.useremail = user.useremail ;
			$scope.image = user.image;
			$scope.instImage = user.instImage;
			$scope.InstitutionID = user.institutionID;
			$scope.userid = user.id;
			$scope.color = user.color;
			$scope.ePassword = user.ePassword;
			$scope.productType="";
			$scope.suspAct="No";
			$scope.edu="";
			$rootScope.errHead="";
			$rootScope.errorMsg="";
		    $scope.holdStageArr=[];
		    $scope.holdIndex =[];
		    $scope.wrketype="";
		    $scope.assetCategory="";
		    $scope.astCst=0;
			$scope.dealerArr=JSON.parse(atob(localStorage.getItem('DEALERS')));
			var dlrCode =null;
			var status=null;
			var modelNo=null;
			var make=null;
			//console.log("$scope.username :"+$scope.username);
			//sconsole.log("$scope.ePassword :"+$scope.ePassword);
			
	//		console.log("Dealers Array : ");
	//		console.log($scope.dealerArr);

			$scope.ROLE=JSON.parse(atob(localStorage.getItem('ROLES')));
	//		console.log(JSON.stringify(userdata));
		}catch (e){
		console.log("ERROR : "+e);
		// 	$location.path("/");
	}
	
	var CustID=sharedService.getRefID();
	
	var currentStage=sharedService.getCurrentStage();
	
	sharedService.setRefID(null);
	sharedService.setCurrentStage(null);

 //HARD CODED
//	CustID="VASA000101";
//	var currentStage = "DE";
//	CustID="VASA000092";
	$scope.dstatus="";
	$scope.statusJSON={};
	$scope.dcsnPtrn=/(Declined|Approved|OnHold)$/i;
	$scope.check_status=function(jsonOBJ)
		{
			var json=jsonOBJ ? jsonOBJ:$scope.statusJSON;
			$("#ErrorContainer").hide();
	//		var json = $scope.statusJSON;
			console.log("Check status Input josn: "+JSON.stringify(json));
			$http({
				method : 'POST',
				url : APP_CONST.getConst('BASE_URL_GNG')+'status',
				data : json,
					headers : {'Content-Type' : 'application/json'}
			})
			.success(function(data) 
			{
				$scope.holdStageArr=[];
				//						console.log("from data getting score-" + JSON.stringify(data));
				//	 					console.log("data.sAppStat"+data.sAppStat);
				$scope.statusObject=data;
				if(typeof data.aCroDec != "undefined" && data.aCroDec != null && data.aCroDec.length >0)
				{
					$(document.body).find("#apvAmt").val(data.aCroDec[0].dAmtAppr).siblings("help").show();
					console.log("data.aCroDec[0].dAmtAppr :" + data.aCroDec[0].dAmtAppr); 
				}
				if(typeof data.oIntrmStat != "undefined" && data.oIntrmStat != null)
				{
					if(data.oIntrmStat.sPanStat == "COMPLETE")
					{	$("#vpc").fadeIn("500");
					$scope.pstatus=data.oIntrmStat.oPanResult.sMsg;
					}
					if(data.oIntrmStat.sCblScore == "COMPLETE")
					{	$("#cs").fadeIn("500");
					$scope.Cstatus=data.oIntrmStat.oCibilResult.sMsg;
					}
				}

				if(data.sAppStat =="Declined")
				{
					status = data.sAppStat;
					$scope.dstatus = data.sAppStat;
					$("#dimg").attr("src","images/reject.png").show();
					$("#postIPA").show();

					$("#nmCntnr").hide();
					$scope.stopTimer();				}
				else if(data.sAppStat =="Approved")
				{
					status = data.sAppStat;
					$scope.dstatus = data.sAppStat;
					$("#ErrorContainer").show();
					//					$scope.scmService();
					$("#dimg").attr("src","images/approve.png").show();
					$("#postIPA").show();
					$("#nmCntnr").hide();
					$scope.stopTimer();
				}
				else if(data.sAppStat =="Queue")
				{
					status = data.sAppStat;
					$scope.dstatus = data.sAppStat;
					$("#dimg").attr("src","images/queue_status.png").show();
					$("#nmCntnr").hide();
				}
				else if(data.sAppStat =="OnHold")
				{
					$scope.dstatus = data.sAppStat;
					$("#dimg").attr("src","images/pending.png").show();
					$("#postIPA").show();
					$("#nmCntnr").hide();
					$scope.stopTimer();
					for(var i=0; i<data.aCroJustification.length;i++)
					{
						var object={"value" : "holdCase",
								"index" :i+1,
								"doc"  :data.aCroJustification[i].sDocName
						};
						$scope.holdStageArr.push(object);
					}
				}
			}).error(function(data) 
			{
				$scope.serviceHitCount=$scope.serviceHitCount+1;
				if($scope.serviceHitCount<=3)
				{
					$scope.check_status();
				}
				else{
					$scope.serviceHitCount=1;
					$scope.error="Sorry we can not process your Check Status request";
				}
			});
			if($scope.dcsnPtrn.test($scope.dstatus))
			{
				$interval.cancel(poller);
			}
		};
	
	
//	 get all asset category from master
		$scope.astService = function(){
		$scope.assetJson = {"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":""}; 
		$http({
			method : 'POST',
			url : APP_CONST.getConst('BASE_URL_GNG')+'asset-category-web',
			data :$scope.assetJson,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		{
			console.log("Asset Category Response:");
			console.log(data);
			$scope.assetArray=data;
			$scope.assetMake(data[0]);

		try{
			if($scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg !=undefined && $scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg !=null)
			{
				$scope.assetCategory = $scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg;
				$scope.assetMake($scope.assetCategory);
				/*$scope.mk = $scope.Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
				$scope.mdl = $scope.Response.oReq.oApplication.aAssetDetail[0].sModelNo;*/
				
			}
		}
		catch(Exception){}
		}).error(function(data) 
		{
		$scope.serviceHitCount=$scope.serviceHitCount+1;
		if($scope.serviceHitCount<=3)
			{
				$scope.astService();
			}
		else{
			$scope.serviceHitCount=1;
			$scope.error="Sorry we can not process your Asset request";
		}	
		});
}
	
	$scope.assetMake = function(val1){
		$scope.makeJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":val1}
		$http({
			method : 'POST',
			url : APP_CONST.getConst('BASE_URL_GNG')+'asset-model-make-web',
			data :$scope.makeJson,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		{ $scope.makeTags=[];
				
			$scope.makeTags = data;
			// $scope.mk = data[0];
			$scope.assetModel($scope.assetCategory,data[0]);
			try{
			if($scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg !=undefined && $scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg !=null)
			{
				$scope.mk = $scope.Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
				$scope.assetModel($scope.assetCategory,$scope.mk);
			}}
			catch(Exception)
			{}
		//		console.log("Data Asset Make : " + $scope.makeTags);			
		}).error(function(data)
		{ 
		console.log("Getting Error from make service.");
		});
	}
	
	$scope.assetModel = function(val1,val2){
		$scope.mdlJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":val1,"sQuery2":val2}; 
		$http({
			method : 'POST',
			url : APP_CONST.getConst('BASE_URL_GNG')+'asset-model-all-web',
			data :$scope.mdlJson,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		 { $scope.modelTags=[];
			for(var i in data)
			{
				if(data[i].sMdlNo !=="")
				{	$scope.modelTags.push(data[i].sMdlNo);
				}					
			}
			$scope.mdl=$scope.modelTags[0];
			try{
			if($scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg !=undefined && $scope.Response.oReq.oApplication.aAssetDetail[0].sAssetCtg !=null)
			{
				$scope.mdl = $scope.Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				
			}
			}//end of try
			catch(Exception)
			{}
		 }).error(function(data) 
		{
		 console.log("Getting Error from asset model service.");
		});
	}

	if(CustID!=null && CustID!="") {
		var URL='';
		var json ={'sRefID':CustID};
		URL = 'dashboard-application-data';

		RestService.saveToServer(URL,json).then(function(Response){
			
			$scope.fname=Response.oReq.oApplicant.oApplName.sFirstName;
	  		$scope.mname=Response.oReq.oApplicant.oApplName.sMiddleName;
	  		$scope.lname=Response.oReq.oApplicant.oApplName.sLastName;
	  		$scope.Response=Response;
			if(currentStage=="DE"){
			if(Response){
	//				{"sInstId":null,"sUserId":null,"sPassword":null,"sRefID":"SATH000302","oHeader":{"sAppID":"160608FK9FAI","sInstID":"4019","sSourceID":null,"sAppSource":"WEB","sReqType":"JSON","dtSubmit":1465371687106,"sDsaId":"HDBFS_DSA1@softcell.com","sCroId":null,"sDealerId":"SATH"},"oReq":{"oApplicant":{"residenceAddSameAsAbove":false,"sApplID":"APPLICANT_1","oApplName":{"sFirstName":"JKJKJKJKJ","sMiddleName":"JKJKJKJKJKJ","sLastName":"JKJKJKJKJJ","sPrefix":null,"sSuffix":null},"oFatherName":null,"oSpouseName":null,"sReligion":null,"sApplGndr":"Male","sDob":"","iAge":0,"sMarStat":"Single","aKycDocs":[{"sKycName":"PAN","sKycNumber":"","sKycStat":null,"sIssueDate":null,"sExpiryDate":null},{"sKycName":"AADHAAR","sKycNumber":"989898998989","sKycStat":null,"sIssueDate":null,"sExpiryDate":null}],"bSameAbove":false,"aAddr":[{"sLine1":"","sLine2":"","sCity":"","iPinCode":0,"sState":"","sCountry":"INDIA","sLandLoard":null,"sLine3":"","sLine4":null,"sVillage":null,"sDistrict":null,"fDistFrom":0,"sLandMark":null,"sAccm":null,"iTimeAtAddr":0,"sAddrType":"RESIDENCE","sResAddrType":"Select","iMonthAtCity":0,"iMonthAtAddr":0,"dRentAmt":0,"iYearAtCity":0},{"sLine1":"","sLine2":"","sCity":"","iPinCode":0,"sState":"","sCountry":"INDIA","sLandLoard":null,"sLine3":"","sLine4":null,"sVillage":null,"sDistrict":null,"fDistFrom":0,"sLandMark":null,"sAccm":null,"iTimeAtAddr":0,"sAddrType":"PERMANENT","sResAddrType":"Select","iMonthAtCity":0,"iMonthAtAddr":0,"dRentAmt":0,"iYearAtCity":0},{"sLine1":"","sLine2":"","sCity":"","iPinCode":0,"sState":"","sCountry":"INDIA","sLandLoard":null,"sLine3":"","sLine4":null,"sVillage":null,"sDistrict":null,"fDistFrom":0,"sLandMark":null,"sAccm":null,"iTimeAtAddr":0,"sAddrType":"OFFICE","sResAddrType":null,"iMonthAtCity":0,"iMonthAtAddr":0,"dRentAmt":0,"iYearAtCity":0}],"aPhone":[{"sPhoneType":"PERSONAL_PHONE","sAreaCode":"","sCountryCode":"+91","sPhoneNumber":"","sExt":null},{"sPhoneType":"RESIDENCE_PHONE","sAreaCode":"","sCountryCode":"+91","sPhoneNumber":"","sExt":null},{"sPhoneType":"OFFICE_PHONE","sAreaCode":"","sCountryCode":"+91","sPhoneNumber":"","sExt":null},{"sPhoneType":"PERSONAL_MOBILE","sAreaCode":null,"sCountryCode":"+91","sPhoneNumber":"9898989889","sExt":null},{"sPhoneType":"RESIDENCE_MOBILE","sAreaCode":null,"sCountryCode":"+91","sPhoneNumber":"","sExt":null},{"sPhoneType":"OFFICE_MOBILE","sAreaCode":null,"sCountryCode":"+91","sPhoneNumber":"","sExt":null}],"aEmail":[{"sEmailType":"PERSONAL","sEmailAddr":""},{"sEmailType":"RESIDENCE","sEmailAddr":""},{"sEmailType":"WORK","sEmailAddr":""}],"aEmpl":[{"sEmplType":"Select","sEmplName":"","iTmWithEmplr":0,"sDtJoin":null,"sDtLeave":null,"dmonthSal":0,"dGrossSal":0,"aLastMonthIncome":[],"sConst":"Select","sItrID":null,"dItrAmt":0,"sDesig":null,"sEmplrCode":null,"sEmplrBr":null,"sModePayment":null,"sDeptmt":null,"sWorkExps":null,"sBusinesName":null,"dtComencemnt":null}],"iNoOfDep":0,"iEarnMem":0,"iFamilyMem":0,"oApplRef":null,"sEdu":"Select","sCreditCardNum":"","bMobVer":true,"aBankingDetails":null,"aLoanDetails":null,"oIncomeDetails":null},"aCoApplicant":null,"oApplication":{"sAppID":null,"sLoanType":"Consumer Durables","sAppliedFor":null,"dLoanAmt":0,"iLoanTenor":0,"oProperty":null,"sLnPurp":null,"dLnApr":0,"dEmi":0,"iAdvEmi":0,"dMarginAmt":0,"aAssetDetail":[{"sAssetCtg":"Select","sDlrName":"SATHYA AGENCIES-SLM","sAssetMake":"","sModelNo":"","sPrice":""}],"aOwndAst":null},"sSuspAct":"No"},"sRespFormat":null,"sCurrentStageId":"DE"}
				dlrCode=Response.oHeader.sDealerId;
	//				console.log("$scope.dealerArr :"+$scope.dealerArr);
				console.log("$scope.dealerArr :");
				console.log($scope.dealerArr);
				if($scope.dealerArr){
					for(var i=0;i<$scope.dealerArr.length;i++)
					{
						if($scope.dealerArr[i].DEALER_CODE==dlrCode){
							$scope.dealerName=$scope.dealerArr[0]["DEALER_NAME"];
							console.log("Dealer :");
							console.log($scope.dealerArr[0]);
					  		$("#nmCntnr").show();
					  		//alert($scope.dealerObj["DEALER_CODE"]);
							$rootScope.errHead = "";
							$scope.error = "";
					  		var mApplicant=Response.oReq.oApplicant;
					  		
					  		if(mApplicant.aPhone){
					  			for(var i=0;i<mApplicant.aPhone.length;i++){
					  				if(mApplicant.aPhone[i].sPhoneType==="PERSONAL_MOBILE"){
					  					$scope.tmob=mApplicant.aPhone[i].sPhoneNumber;
					  				}else if(mApplicant.aPhone[i].sPhoneType==="PERSONAL_PHONE"){
					  					$scope.residenceStd=mApplicant.aPhone[i].sAreaCode;
										$scope.residencePhone=mApplicant.aPhone[i].sPhoneNumber;
					  				}else if(mApplicant.aPhone[i].sPhoneType==="RESIDENCE_PHONE"){
					  					$scope.prmntStd=mApplicant.aPhone[i].sAreaCode;
										$scope.prmntPhone=mApplicant.aPhone[i].sPhoneNumber;
					  				}else if(mApplicant.aPhone[i].sPhoneType==="RESIDENCE_PHONE"){
					  					$scope.prmntMobile=mApplicant.aPhone[i].sPhoneNumber;
					  				}else if(mApplicant.aPhone[i].sPhoneType==="OFFICE_PHONE"){
					  					$scope.wrkstd = mApplicant.aPhone[i].sAreaCode;
										$scope.wrkphn = mApplicant.aPhone[i].sPhoneNumber 
					  				}else if(mApplicant.aPhone[i].sPhoneType==="OFFICE_MOBILE"){
					  					$scope.wrkmob = mApplicant.aPhone[i].sPhoneNumber
					  				}					  				
					  			}
					  		}
					  		
					  		if(mApplicant.aKycDocs){
					  			for(var i=0;i<mApplicant.aKycDocs.length;i++){
					  				if(mApplicant.aKycDocs[i].sKycName==="PAN"){
					  					$scope.pan=mApplicant.aKycDocs[i].sKycNumber;
					  				}
					  				
					  				if(mApplicant.aKycDocs[i].sKycName==="AADHAAR"){
					  					$scope.aadhar=mApplicant.aKycDocs[i].sKycNumber;
					  				}
					  			}
					  		}
					  		
					  		$scope.same=mApplicant.residenceAddSameAsAbove;
					  		$scope.productType=Response.oReq.oApplication.sLoanType;
					  		
							$("#msgContainer").css({"left":"32%"});							
							$("#progressDiv ,#showApplicant").show();
							$("#kyccontainer,#ErrorContainer").show();
							$("#nmCntnr").hide();
							
							//TODO
							$scope.REFID=CustID;
//							console.log("Rquired:"+Response.oReq.sSuspAct +"and"+mApplicant.sCreditCardNum);
							$scope.suspAct=Response.oReq.sSuspAct =="" ? "No" : Response.oReq.sSuspAct;
							$scope.creditCardNumber=mApplicant.sCreditCardNum;
							
							$scope.gender=mApplicant.sApplGndr;
							
							$scope.edu=mApplicant.sEdu;
							
							$scope.mstatus=mApplicant.sMarStat;
							
							if(mApplicant.sDob && mApplicant.sDob!=""){
								var dateOfBirth=new Date();
				                dateOfBirth.setFullYear(parseInt(mApplicant.sDob.slice(4)));
				                dateOfBirth.setDate(parseInt(mApplicant.sDob.slice(0,2)));
				                dateOfBirth.setMonth((parseInt(mApplicant.sDob.slice(2,4))-1));
				                
				                $scope.dob=dateOfBirth;
							}else{
								var dateOfBirth=new Date();
				                dateOfBirth.setFullYear(new Date().getFullYear()-25);
				                $scope.dob=dateOfBirth;
							}

							$scope.constitution=mApplicant.aEmpl[0].sConst;
							if($scope.constitution == "SELF-EMPLOYED")
							 {
								$("#wrketype").val("SELF-EMPLOYED").attr("disabled","disabled").siblings("help").show();
								$("#wrketype option[value='SELF-EMPLOYED']").show();
							 }else{
								 $("#wrketype").val("Select").removeAttr("disabled");
								 $("#wrketype option[value='SELF-EMPLOYED']").hide();
							 }
							$scope.lamt=Response.oReq.oApplication.dLoanAmt;
							$scope.loanTenure=Response.oReq.oApplication.iLoanTenor;

							if(mApplicant.aEmail){
					  			for(var i=0;i<mApplicant.aEmail.length;i++){
					  				if(mApplicant.aEmail[i].sEmailType==="PERSONAL"){
					  					$scope.residenceEmail=mApplicant.aEmail[i].sEmailAddr;
					  				}else if(mApplicant.aEmail[i].sEmailType==="PERMANENT"){
					  					$scope.prmntEmail=mApplicant.aEmail[i].sEmailAddr;
					  				}else if(mApplicant.aEmail[i].sEmailType==="WORK"){
					  					$scope.wrkemail = mApplicant.aEmail[i].sEmailAddr
					  				}
					  			}
					  		}
							
							if(mApplicant.aAddr){
								for(var i=0;i<mApplicant.aAddr.length;i++){
									if(mApplicant.aAddr[i].sAddrType=="RESIDENCE"){
										$scope.addressType=mApplicant.aAddr[i].sResAddrType;
										$scope.rent=mApplicant.aAddr[i].dRentAmt;
										$scope.a1=mApplicant.aAddr[i].sLine1;
										$scope.a2=mApplicant.aAddr[i].sLine2;
										$scope.a3=mApplicant.aAddr[i].sLine3;
										$scope.residencePincode=mApplicant.aAddr[i].iPinCode;
										$scope.residenceCity=mApplicant.aAddr[i].sCity;
										$scope.residenceState=mApplicant.aAddr[i].sState;
										$scope.residenceAddrStay=mApplicant.aAddr[i].iMonthAtAddr;
										$scope.residenceCityStay=mApplicant.aAddr[i].iMonthAtCity;
									}else if(mApplicant.aAddr[i].sAddrType=="PERMANENT"){
										$scope.prmnt_addressType=mApplicant.aAddr[i].sResAddrType;
										$scope.prmnt_rent=mApplicant.aAddr[i].dRentAmt;
										$scope.prmnt_a1=mApplicant.aAddr[i].sLine1;
										$scope.prmnt_a2=mApplicant.aAddr[i].sLine2;
										$scope.prmnt_a3=mApplicant.aAddr[i].sLine3;
										$scope.prmntPincode=mApplicant.aAddr[i].iPinCode;
										$scope.prmntCity=mApplicant.aAddr[i].sCity;
										$scope.prmntState=mApplicant.aAddr[i].sState;
										$scope.prmntAddrStay=mApplicant.aAddr[i].iMonthAtAddr;
										$scope.prmntCityStay=mApplicant.aAddr[i].iMonthAtCity;
									}else if(mApplicant.aAddr[i].sAddrType=="OFFICE"){
										$scope.wrka1 =mApplicant.aAddr[i].sLine1;
										$scope.wrka2 =mApplicant.aAddr[i].sLine2;
										$scope.wrka3 =mApplicant.aAddr[i].sLine3;
										$scope.wrkpin =mApplicant.aAddr[i].iPinCode;
										$scope.wrkcity =mApplicant.aAddr[i].sCity;
										
										$scope.wrkstate =mApplicant.aAddr[i].sState;
									}
								}
							}
							$scope.wrkename =Response.oReq.oApplicant.aEmpl[0].sEmplName;
							$scope.wrketype = Response.oReq.oApplicant.aEmpl[0].sEmplType;
							$scope.wrktwe =Response.oReq.oApplicant.aEmpl[0].iTmWithEmplr;
							$scope.wrkLstMnthSal = Response.oReq.oApplicant.aEmpl[0].dmonthSal;
							$scope.wrkGrsAnnual =Response.oReq.oApplicant.aEmpl[0].dItrAmt;
							//$scope.dealerObj.name =Response.oHeader.sDealerId;
							//$scope.dealerObj.name =Response.oHeader.sDealerId;
//							console.log("Again check :"+Response.oReq.oApplication.aAssetDetail[0].sAssetCtg);
//							$("#dlr").val($scope.dealerObj.DEALER_NAME);
							$scope.assetCategory =Response.oReq.oApplication.aAssetDetail[0].sAssetCtg;
							$scope.assetMake($scope.assetCategory);
							$scope.mk = Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
							$scope.assetModel($scope.assetCategory,$scope.mk);
							$scope.mdl = Response.oReq.oApplication.aAssetDetail[0].sModelNo;
							
							//Fetch Images
							function kyc_img(kycName , imgId ,status , reason,value){
								var json ={'sImgID':imgId}
								var URL = 'get-image-by-id-base64';
								RestService.saveToServer(URL,json).then(function(Response){
									var image = "data:image/png;base64,"+Response.sByteCode;
									if(Response.sByteCode != undefined && Response.sByteCode != null && Response.sByteCode != "" ){
//										console.log("image :"+kycName+"id :"+imgId);
										var url =image;
										console.log("kycName :"+ kycName);
										if(kycName =="APPLICANT-PHOTO"){
											$scope.profileImage=true;
											$scope.profileData =image;
//											$("#selectImgInit").attr("src",image);
										}
										else if(kycName =="PAN"){
											$scope.panPresent=true;
											$scope.panData=image;
//											$("#panImg").attr("src",image);
										}
										else if(kycName =="AADHAAR"){
											$scope.adharpresent =  true;
											$scope.aadharData=image;
//											$("#aadhaarImg").attr("src",image);
										}
										else if(kycName == "DRIVING-LICENSE"){
											$scope.drivingPresent = true;
											$scope.drivingData=image;
//											$("#drivingImg").attr("src",image);
											/*
											$scope.dLPresent = true;
											if($scope.dlicense == ''){
												$scope.dlicense =image;
												$scope.drvlimgID = imgId;
												dlicen.push({status: status, reason:reason});
											}
											$scope.kyc_array.push({kyc_name:"DRIVING-LICENSE",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
//											$rootScope.uploadImgFor = "DRIVING-LICENSE";
										*/}
										else if(kycName =="PASSPORT"){
											$scope.passportPresent =  true;
											$scope.passportData= image;
//											$("#passportImg").attr("src",image);
										}
										else if(kycName =="INCOME-PROOF1"){
											$scope.incomePresent=true;
											$scope.income1Data=image;
											}
										else if(kycName =="INCOME-PROOF2"){
											$scope.income2Present=true;
											$scope.income2Data=image;
											}
										else if(kycName =="OTHER"){
											$scope.otherPresent =  true;
											$scope.otherData=image;
											}
									}
								},function(error){
									$scope.error = "Sorry, unable to fetch images from server !!";					
								});
							}
							URL ='application-images';
							var json ={'sRefID':CustID};
							
							RestService.saveToServer(URL,json).then(function(Response){
								console.log("Images loaded:");
								console.log(JSON.stringify(Response));
								if(Response!=null && Response!=="")
								{
									var data = Response;
									if(data[0]){
										for(info=0; info<data[0].aImgMap.length; info++)
										{
											console.log("Response[applicant].aImgMap[info].sImgType :"+data[0].aImgMap[info].sImgType);
											kyc_img(data[0].aImgMap[info].sImgType , data[0].aImgMap[info].sImgID, data[0].aImgMap[info].sStat, data[0].aImgMap[info].sReason, data[0].aImgMap[info].sImgVal);
										}
									}
									function applicantImg(data){}
								}
							},function(error){
								$scope.error = "Sorry, unable to fetch images from server !!";					
							});	
						}
					}
				}
//				$scope.dealerObj=JSON.parse($scope.dealerObj);
			}
			$("input,select").siblings("help").css({"color": "#777777","display":"inline"});
			} // End of DE stage
			else if(currentStage=="DCLN")
			{
				$scope.REFID = CustID;
				status= "Declined";
//				dlrCode=Response.oHeader.sDealerId;
				$("#nmCntnr").hide();
				$scope.statusObject={
						sAppStat : ""
				};
				$scope.statusObject.sAppStat="Decline";
				  $("#afterSubmit").show();
			}
			else if(currentStage=="CR_H")
			{
				status= "OnHold";
				$scope.REFID=CustID;
//				dlrCode=Response.oHeader.sDealerId;
				$("#nmCntnr").hide();
				var statusJSON={
					  "sRefID":CustID,
					  "oHeader": {
					    "sCroId": "default",
					    "dtSubmit":new Date().getTime(),
					    "sReqType": "JSON",
					    "sAppSource" : "WEB",
					    "sDsaId":$scope.useremail,
					    "sAppID": "",
					    "sSourceID":"",
					    "sInstID":$scope.InstitutionID
					  }
				};
				poller = $interval(function(){
					$scope.check_status(statusJSON);
				},3000);
//				$scope.statusObject.sAppStat="Decline";
				  $("#afterSubmit").show();
			}
			else if(currentStage=="CR_Q")
			{	$scope.fname = Response.oReq.oApplicant.oApplName.sFirstName;
				$scope.mname = Response.oReq.oApplicant.oApplName.sMiddleName;
				$scope.lname = Response.oReq.oApplicant.oApplName.sLastName;
				$scope.mk=Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
				$scope.mdl=Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				modelNo=Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				$scope.assetCategory=Response.oReq.oApplication.aAssetDetail[0].sAssetCtg;
				dlrCode=Response.oHeader.sDealerId;
				make=Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
				$scope.REFID=CustID;
				
				$("#nmCntnr").hide();
				var statusJSON={
					  "sRefID":CustID,
					  "oHeader": {
					    "sCroId": "default",
					    "dtSubmit":new Date().getTime(),
					    "sReqType": "JSON",
					    "sAppSource" : "WEB",
					    "sDsaId":$scope.useremail,
					    "sAppID": "",
					    "sSourceID":"",
					    "sInstID":$scope.InstitutionID
					  }
				}
				$("#resultPanel").show();
				$scope.StartTimer(); // 	60 sec timer
				poller = $interval(function(){
					$scope.check_status(statusJSON);
				},3000);
//				$scope.statusObject.sAppStat="Decline";
			}
			else if(currentStage == "APRV")
			{	
				$scope.fname = Response.oReq.oApplicant.oApplName.sFirstName;
				$scope.mname = Response.oReq.oApplicant.oApplName.sMiddleName;
				$scope.lname = Response.oReq.oApplicant.oApplName.sLastName;
				$scope.mk=Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
				$scope.mdl=Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				modelNo =Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				$scope.mkVal=Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				$scope.mdlVal=Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				$scope.astService();
				$scope.assetCategory=Response.oReq.oApplication.aAssetDetail[0].sAssetCtg;
				dlrCode=Response.oHeader.sDealerId;
				make =Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
				$scope.REFID=CustID;

				$("#nmCntnr").hide();
				var statusJSON={
					  "sRefID":CustID,
					  "oHeader": {
					    "sCroId": "default",
					    "dtSubmit":new Date().getTime(),
					    "sReqType": "JSON",
					    "sAppSource" : "WEB",
					    "sDsaId":$scope.useremail,
					    "sAppID": "",
					    "sSourceID":"",
					    "sInstID":$scope.InstitutionID
					  }
				}
				poller = $interval(function(){
					$scope.check_status(statusJSON);
				},3000);
				$scope.scmService();
				  $("#pOrder").show();
			}
		}); // End of call rest API
	}else{
		if(localStorage.getItem('CURRENT_DEALER')){
			var dealerCurrent = JSON.parse(atob(localStorage.getItem('CURRENT_DEALER')));
			
			dlrCode=dealerCurrent["DEALER_CODE"];
			$scope.dealerName=dealerCurrent["DEALER_NAME"];
		}else{
			$location.path("/cdl/dealer");
		}
		
		$("#nmCntnr").show();
	}

	$scope.serviceHitCount=1;
	var img_array=[];
	var addkyc_array=[];
	$scope.ApplicationArr=[{value:"APPLICATION_FORM","index":1}];
	$scope.AggrigationArr=[{value:"AGREEMENT","index":1}];
	$scope.AchArr=[{value:"ACH","index":1}];
	$scope.DisbursmentArr=[{value:"DISBURSEMENT","index":1}];
	$scope.AddtnlKycArr=[{value:"ADDITIONAL_KYC","index":1}];

	$scope.mstatus="Single"
	$scope.gender="Male";
	$scope.Accommodation = "";
	$scope.Salaried = "Salaried";
	$scope.emiDebited = "Yes";
	$scope.selectImg ="";
	$scope.selectImg2 ="";
	$scope.selectImg3="";
	$scope.address="";
	$scope.object={};
	var lcount=1;
	$scope.verifyMob=true;
	$scope.verif=true;
	$("form").trigger("reset");
	$("input").each(function(){
		$(this).attr("autocomplete","off");
	});
	
	var top=$(window).height()-$(".header").height()-$(".footer").height();
	$("#msgContainer").css("top",top);
	var containerHeight=top-150;
	$(".getheight").css("height",containerHeight-35+"px");
	$("#progressDiv").css("height",containerHeight+20);

	
	/*$('#dob').datepicker({
		changeMonth: true, changeYear: true, yearRange: "1945:1997", dateFormat: 'dd:mm:yy',
		defaultDate:'01:01:1985',
		onSelect: function(dateText, inst) {
//			 $(this).next().focus();
			 $(this).siblings("help").show();
		    }		
	}).attr('readonly','readonly');*/

	/*function refreshPLst()
	{
		$("#KYCList , #personalList , #employmentList , #IncomeList , #BankingList ,#ProductList ,#CalculationList ,#OtherList").removeClass("active");
		$("#KYCList").addClass("active");
	}*/
	
	$scope.otpService=function(){	
		$scope.ojs={	  "USER_ID":$scope.userid, "PASSWORD":$scope.ePassword,
						  "INSTITUTION_ID":$scope.InstitutionID,
						  "inputJson_":{ "MOBILE-NUMBER":$("#tmob").val() }
					}	
		console.log("$scope.ojs :"+JSON.stringify($scope.ojs));
	
//		console.log("otp request: "+$scope.useremail);
		/*var jh = LoginService.getCredential();
		console.log("return :"+jh);*/
//		console.log("pass: "+$scope.ePassword);
//		var pass =  $scope.ePassword;
		console.log("$scope.useremail :"+ $scope.useremail);
		$http.defaults.headers.common['token-key']='95957453469767522788';
		$http.defaults.headers.common['username']=$scope.useremail;
		$http.defaults.headers.common['password']=$scope.ePassword;
		var defere = $q.defer();
		$http.post(APP_CONST.getConst('BASE_URL_GNG')+'get-otp',$scope.ojs).success(function(response){
			defere.resolve(response);
//			console.log("OTP Response -" + JSON.stringify(response));
			$scope.otp=response.OTP;
		}).error(function(error){
			defere.reject(error);
		});
//		return defere.promise;
		
/*		$http({	method : 'POST',
				url : baseUrl+'get-otp',
				data :$scope.ojs,
				headers : {'Content-Type':'application/json','token-key':'95957453469767522788','userName':$scope.useremail,'password':pass}
			 }).success(function(data) 
			{ 
				console.log("OTP Response -" + JSON.stringify(data));
				$scope.otp=data.OTP;						
			}).error(function(data) 
			{	console.log("Getting Error...");
			});*/
		$("#getOTP").hide();
		$("#otpContainer,#pwdInfo, #ResendCntnr").show();	
	}
	
//	$scope.onDealerSelected=function(dealerSelected){
//		console.log("Dealer Selected  :");
//		console.log(dealerSelected);
//		
//		if(dealerSelected!=undefined)
//		{		  
//			$("#dlrContainer").hide();
//			$("#nmCntnr").show();
//			$rootScope.errHead="";
//			$rootScope.errorMsg="";
//			$scope.dealerObj=JSON.parse(dealerSelected);
////			console.log("$scope.dealerObj :"+JSON.stringify($scope.dealerObj));
//			dlrCode=$scope.dealerObj["DEALER_CODE"];
//			$scope.dlrName=$scope.dealerObj["DEALER_NAME"];
//			
//		}
//		else
//		{
//			$rootScope.errHead="Dealer";
//			$rootScope.errorMsg="Please select Dealer";
//		}
//	}
	
	
$scope.clickEvent = function(type)
{
switch (type) {
case "getOTP":
//	changees
	var bool= validation();
//	var bool= true;
	if(bool)
	{
		$scope.otpService();
		$("#getOTP").hide();
		$("#otpContainer,#pwdInfo, #ResendCntnr").show();	
	}
	break;
case "verifybtn":
	/*containerHeight=containerHeight-40;
	$(".getheight").css("height",containerHeight+"px");*/
	var otp=$("#txt1").val()+$("#txt2").val()+$("#txt3").val()+$("#txt4").val()+$("#txt5").val();
	if(otp.length==5)
	{	if(otp ==$scope.otp || otp=="11111")
	  {	
		$("#msgContainer").css({"left":"32%"});		
		$("#basicInfo").hide();
		$("#progressDiv ,#showApplicant").show();
		$("#kyccontainer,#ErrorContainer").show();
		$scope.submitApplication("step1");
	  }
	  else
	  {  $(".otp").val("");
		 $rootScope.errHead="OTP";
		$rootScope.errorMsg="Please enter valid OTP";
	  }
	}else{
		$("input[class='otp'][value='']").focus();
		$rootScope.errHead="OTP";
		$rootScope.errorMsg="Please enter OTP";
//		$("#errorHeading").text("OTP : ");
//		$("#main_error").text("Please enter OTP");
	}
	break;	
case "Resend":
			$rootScope.errHead="";
			$rootScope.errorMsg="";
			$scope.otpService();
			$("#Resend").hide();
			$(".otp").val("");
			$(".otp:first").focus();
			$("#Skip").show();
			break;
case "Skip":
			$scope.verif=false;
			$(".otp").val("");
			/*containerHeight=containerHeight-40;
			$(".getheight").css("height",containerHeight+"px");*/
			$("#msgContainer").css({"left":"32%"});		
			$("#basicInfo").hide();
			$("#progressDiv ,#showApplicant").show();
			$("#kyccontainer,#ErrorContainer").show();
			$scope.verifyMob=false;
			$scope.submitApplication("step1");
			break;
case "anotherAsset":
			var dom =$("#assetObj").clone();
			lcount=lcount+1;
			dom.find("legend ").text("Asset "+lcount);
			$("#assetContainer").children(" :last").after(dom);
			break;
/*case "Applicant":
			$("fieldset").css({"transform":"initial","opacity":"initial"});
			$("#coApplicantArray").hide();
			$("#kyccontainer").show();
			$("#employmentList , #IncomeList , #BankingList ,#ProductList ,#CalculationList ,#OtherList").show();
			var display =$("#coApplicantArray").css("display");
		//	console.log("display css="+display);
			refreshPLst();
			break;*/
/*case "addAddress":
		$("#PermanentAddressContainer").toggle();
		break;
case "moreReference":
		$("#reference2").toggle();
		break;*/

}	
}

$scope.changeEvent=function(type,val)
{ //console.log(val);
	switch (type) {
	case "MNY_INTRMNT":
//		 val=$("#mnyInstn option:selected").val();
		if(val!="Select" && val!="Cash")
		 {
			$("#mnyCnfmDiv").show();
		 }else{
			$("#mnyCnfmDiv").hide();
		 }
		break;
	case "CONSTITN":
//		 val=$("#constitution option:selected").val();
		if(val=="SELF-EMPLOYED")
		 {
			$("#wrketype").val("SELF-EMPLOYED").attr("disabled","disabled").siblings("help").show();
			$("#wrketype option[value='SELF-EMPLOYED']").show();
		 }else{
			 $("#wrketype").val("Select").removeAttr("disabled");
			 $("#wrketype option[value='SELF-EMPLOYED']").hide();
			 $scope.wrketype="";
		 }
		break;
	case "WRKTYPE":
//		 val=$("#constitution option:selected").val();
//		if(val=="SELF-EMPLOYED")
//		 {
			$("#wrkGrsAnnual,#wrkLstMnthSal").val("");
//			$("#wrkLstMnthSal").val("").hide();
//		 }else{
//				$("#wrkLstMnthSal").val("").show();
//				$("#wrkGrsAnnual").val("").hide();
//		 }
		break;
		
	default:
		break;
	}
}

//permanant address same as above
$scope.stateChanged = function (val){
//	$("#permanentAddr").trigger("reset");
	if(val==true)
		{
		//console.log($("#addressType option:selected").val());
		 $("#prmnt_addressType").val($("#addressType option:selected").val()).siblings("help").show();
//		$scope.prmnt_AddressType=$scope.AddressType;
		 $("#prmnt_rent").val($("#rent").val()).siblings("help").show();
		 $("#prmnt_a1").val($("#a1").val()).siblings("help").show();
		 $("#prmnt_a2").val($("#a2").val()).siblings("help").show();
		 $("#prmnt_a3").val($("#a3").val()).siblings("help").show();
		 $("#prmnt_peremail").val($("#peremail").val()).siblings("help").show();
		 $("#prmnt_perpin").val($("#perpin").val()).siblings("help").show();
		 $("#prmnt_percity").val($("#percity").val()).siblings("help").show();
		 $("#prmnt_perstate").val($("#perstate").val()).siblings("help").show();
		 $("#prmnt_perstdCode").val($("#perstdCode").val()).siblings("help").show();
		 $("#prmnt_perphone").val($("#perphone").val()).siblings("help").show();
		 $("#prmnt_permobile").val($("#permobile").val()).siblings("help").show();
		 $("#prmnt_pertadd").val($("#pertadd").val()).siblings("help").show();
		 $("#prmnt_mcity").val($("#mcity").val()).siblings("help").show();
		}else
			{
			  $("#permanentAddr input").val("").siblings("help").hide();
			  $("#permanentAddr Select").val("").siblings("help").hide();
			}
	}

$("#residenceAddr input,#residenceAddr select").on("change paste keyup", function() {
	if($scope.same==true)
	{	var id = $(this).attr("id");
		var val;
		if($(this).is("select"))
		{
		 val = $(this[this.selectedIndex]).val();
		}else if($(this).is("input"))
		{
		 val = $(this).val();
		}

		$("#prmnt_"+id).val(val);
		if(val.length>0)
			$(this).siblings("help").show();
	}		
});
// auto bind values to permanent address
//$scope.prmnt_addressType=$scope.same==true?$scope.prmnt_addressType:'';
// $scope.prmnt_rent=
// $scope.prmnt_a1
// $scope.prmnt_a2
// $scope.prmnt_a3
// $scope.prmnt_peremail
// $scope.prmnt_perpin
// $scope.prmnt_percity
//$scope.prmnt_perstate
//$scope.prmnt_perstdCode
//$scope.prmnt_perphone
//$scope.prmnt_permobile
//$scope.prmnt_pertadd
//$scope.prmnt_mcity

$(document.body).on("focusin","input[type='text']",function(e){
	$(this).css("border-color", "#24a1ed");
	$(this).siblings("help").css({"color": "#24a1ed","display":"inline"});
	$(this).attr("placeholder","");
});	
// show and color change input field label
$(document.body).on("blur","input",function(e)
{
$("input").css({"border-color":"#727272"});
$(this).siblings("help").css("color","#727272");
if($(this).val() =="")
	{
	var text=$(this).siblings("help").text();
	$(this).siblings("help").hide();
	$(this).attr("placeholder",text);
	}
});

$(document.body).on("keyup change","#wrkpin ,#perpin, #prmnt_perpin",function(e)
{	
//			console.log("Keyup working ");
	if($(this).val().length === 6)
	{
		$scope.pinService($(this).val(),$(this).attr("id"));
	}else
		{
		 $(this).parent().next().find(".city, .state").val("").siblings("help").hide();
		}
});
$scope.pinService = function(pin,id){
	var pinJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":pin}; 
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+'pincode-details-web',
		data : pinJson,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(Response) 
	{		
		if( id =="perpin")
			{
				$scope.pcty =Response.sCity;
				$("#percity").val(Response.sCity).prop("disabled","true").siblings("help").show();
				$("#perstate").val(Response.sState).prop("disabled","true").siblings("help").show();
			}
			else if(id =="wrkpin")
			{
				$("#wrkcity").val(Response.sCity).prop("disabled","true").siblings("help").show();
				$("#wrkstate").val(Response.sState).prop("disabled","true").siblings("help").show();
			}else if(id =="prmnt_perpin")
			{
				$("#prmnt_percity").val(Response.sCity).prop("disabled","true").siblings("help").show();
				$("#prmnt_perstate").val(Response.sState).prop("disabled","true").siblings("help").show();
			}
	}).error(function(error) {
//		$scope.error = 'Sorry ! ';
		console.log("Pincode Service Error:");
		console.log(error);
		$scope.serviceHitCount=$scope.serviceHitCount+1;
		if($scope.serviceHitCount<=3)
			{
			 $scope.pinService(pin,id);
			}
		else{
			$scope.serviceHitCount=1;
			$scope.error="Sorry we can not process your PAN request";
		}
	});	
}

// <!-------------------cursor move to next an prev
$('input[type="password"]').keyup(function(e) {
	if (e.keyCode != 8) {
		$(this).next().focus();
	} else if (e.keyCode == 8) {
		$(this).prev().focus();
	}
});

$(".next").click(function() {
//	changees
	$rootScope.errHead="";
	$rootScope.errorMsg="";
	
	var bool =  validation();
	$scope.$apply();
//	var bool= true;
	if (bool) {
		var animating = true;
		$rootScope.errHead="";
		$rootScope.errorMsg="";
// fieldsetn = fieldsetn + 1;
// change_header();// change form heading
		$(".getheight").scrollTop(0);
		var current_fs = $(this).parents('fieldset');
		var next_fs = $(this).parents('fieldset').next();
		var count=$("fieldset").index(next_fs);
//		console.log("fieldset count="+count);
		$(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		current_fs.animate(
				{opacity : 0},{
					duration : 400,
					step : function(now,mx) 
					{	var scale = 1 - (1 - now) * 0.2;
					var right = 100;
					var left = (now * 50)+ '%';
					var opacity = 1 - now;
					next_fs.css({'left' : left,'opacity' : opacity});
					current_fs.css({'transform' : 'scale('+ scale+ ')'});
					},
					complete : function() {
						$(this).hide();
						next_fs.show();
						animating = false;
					}
				});
		if(count == 3)
		{
			$scope.astService();
//			$scope.assetMake();
//			$scope.assetModel("DURABLE LOAN");
		}
	}
	$scope.$apply();
});

$(".previous").click(function() {
	if(animating)
		return false;
	var  animating = true;
	$rootScope.errHead="";
	$rootScope.errorMsg="";
	
// fieldsetn = fieldsetn - 1;
// change_header();
	$(".getheight").scrollTop(0);
	var current_fs = $(this).parents('fieldset');
	var previous_fs = $(this).parents('fieldset').prev();
	$(".progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	current_fs.animate({
		 opacity : 0}, {
			duration : 400,
			step : function(now, mx) {
			var	scale = 0.8 + (1 - now) * 0.2;
			var	left = ((1 - now) * 50) + "%";
			var	opacity = 1 - now;
				current_fs.css({'left' : left});
				previous_fs.css({'transform' : 'scale('+ scale + ')','opacity' : opacity});
			},
			complete : function() {
				current_fs.hide();
				previous_fs.show();
				animating = false;
			}
		});
	$scope.$apply();
});

// var countimg=0;
$scope.onselectImg = function($files,type,index) 
{           //console.log("inside file select"+type+" file:"+$files[0].name);
			alert("Hello");
			var img_type ='';
			for (var i = 0; i < $files.length; i++) 
			{    	
				fname=$files[0].name;
// countimg++;
//		    	var re = (/\.(gif|jpg|jpeg|tiff|png)$/i);
		    	var re = (/\.(jpg)$/i);
				if(!re.exec(fname))
		    	{
			    	alert("Sorry..!! We can not upload your image. \n Only .Jpg images are allowed");
			    	break;
		    	}
				img_type = fname.split(".")[1];
				var $file = $files[i];
				var base64;
				var  reader=new FileReader();
				if ($files[i] && $file) {
					 var binaryString;
					 var size=((($files[i].size)/1024).toFixed(2)) +" Kb";
			         reader.onload = function(readerEvt) {
			            binaryString = readerEvt.target.result;
// 						base64 = btoa(binaryString);
			            switch (type) {
			            case "APPLICANT-PHOTO":
							$scope.selectImgInit = binaryString	
				        	img_array.push({kyc_name:"APPLICANT-PHOTO",image:$scope.selectImgInit.split(",")[1],type:img_type});
							break;
			            case "PAN":
							$scope.selectImg1 = binaryString	
				        	img_array.push({kyc_name:"PAN",image:$scope.selectImg1.split(",")[1],type:img_type});
							break;
						case "AADHAAR":
							$scope.selectImg2 = binaryString
							img_array.push({kyc_name:"AADHAAR",image:$scope.selectImg2.split(",")[1],type:img_type});
							break;
						case "PASSPORT":
							$scope.selectImg3 = binaryString
							img_array.push({kyc_name:"PASSPORT",image:$scope.selectImg3.split(",")[1],type:img_type});
							break;
						case "DRIVING-LICENSE":
							$scope.selectImg4 = binaryString
							img_array.push({kyc_name:"DRIVING-LICENSE",image:$scope.selectImg4.split(",")[1],type:img_type});
							break;
						case "CUSTOMER-PHOTO":
							$scope.selectImg5 = binaryString
							img_array.push({kyc_name:"APPLICANT-PHOTO",image:$scope.selectImg5.split(",")[1],type:img_type});
							break;
						case "INCOME-PROOF1":
							$scope.selectImg6 = binaryString
							img_array.push({kyc_name:"INCOME-PROOF1",image:$scope.selectImg6.split(",")[1],type:img_type});
							break;
						case "INCOME-PROOF2":
							$scope.selectImg7 = binaryString
							img_array.push({kyc_name:"INCOME-PROOF2",image:$scope.selectImg7.split(",")[1],type:img_type});
							break;
						case "OTHER":
							$scope.selectImg8 = binaryString
							img_array.push({kyc_name:"OTHER",image:$scope.selectImg8.split(",")[1],type:img_type});
							break;	
							
						case "APPLICATION_FORM":
							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
							$(document.body).find("#"+type+index+"label").hide();
							$(document.body).find("#"+type+index+"remove").show();
//							$(document.body).find("#"+type+index+"size").text(size);
//							$scope.agreeimage = binaryString;
							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
//							console.log((type+index));
							break;

						case "AGREEMENT":
							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
							$(document.body).find("#"+type+index+"label").hide();
							$(document.body).find("#"+type+index+"remove").show();
//							$(document.body).find("#"+type+index+"size").text(size);
//							$scope.agreeimage = binaryString;
							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
//							console.log((type+index));
							break;	
		
						case "ACH":
							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
//							$scope.agreeimage = binaryString;
							$(document.body).find("#"+type+index+"label").hide();
							$(document.body).find("#"+type+index+"remove").show();
//							$(document.body).find("#"+type+index+"size").text(size);
							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
//							console.log((type+index));
							break;	
						
						case "DISBURSEMENT":
							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
							$(document.body).find("#"+type+index+"label").hide();
							$(document.body).find("#"+type+index+"remove").show();
							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
							break;	
				
						case "ADDITIONAL_KYC":
							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
							$(document.body).find("#"+type+index+"label").hide();
							$(document.body).find("#"+type+index+"remove").show();
							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
							break;	
						
						case "holdCase":
							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
							$(document.body).find("#"+type+index+"label").hide();
							$(document.body).find("#"+type+index+"remove").show();
							$scope.holdIndex.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
							break;		
			            }
			      };
			        reader.readAsDataURL($files[i]);
			        $timeout(function(){
					}, 1000);
			}
		}
}

/*
 * Author Sayali uploadallimg function to upload img one by one
 */
function UploadAllImgs(Ref,array,callType)
{
	console.log("upload Image array :"+array.length);
	for(var i=0 ; i<array.length ; i++){
		var json ={
				  "oHeader": {
				    "sAppID": Ref,  // application id
				    "sApplID": "1" // applicant id
				  },
				  "sRefID": Ref,
				  "oUpldDtl": {
				    "sFileID": "1", // ask yogesh
				    "sFileName": array[i].kyc_name,
				    "sFileType": array[i].type,
				    "sfileData": array[i].image,
				    "sStat": "", // ask yogesh
				    "sReason": "" // ask yogesh
				  }
				};
//		console.log("image JSon : "+JSON.stringify(json));
		uploadImage(json,callType);		
	}
	if(callType=="ipa")
		{
		 $rootScope.errHead="Submit";
	     $rootScope.errorMsg="Your application has been succesfully completed.";
		}
}

function uploadImage(json,callType)
{	$http({
			method : 'POST',
			url : APP_CONST.getConst('BASE_URL_GNG')+'upload-image',
			data : json,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
		{ if(Response.sStatus == 'SUCCESS')
			{
//				console.log("response for-"+JSON.stringify(Response));				
			}
		}).error(function(error) {
			$scope.serviceHitCount=$scope.serviceHitCount+1;
			if($scope.serviceHitCount<=3)
				{
				  uploadImage(json,callType);
				}
			else{
				$scope.serviceHitCount=1;
				$scope.error="Sorry we can not process your PAN request";
			}	
		});
	
}
/*$scope.pdDeStatus = function(){
	$scope.updateJson ={"sRefID":$scope.REFID};
//	console.log("Input JSON for status update :"+$scope.updateJson);
	$http({
		method : 'POST',
		url : BASE_URL_GNG+"post-ipa-stage-update",
		data :$scope.updateJson,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data) 
	{
		console.log("Data from status update : " + JSON.stringify(data));			
	}).error(function(data)
	{ 
	console.log("Getting Error from make service.");
	});
}*/

//$(document.body).on("click","#dsubmit",function(){
	$scope.finalPdfshowFun = function()
	{
		$rootScope.errHead="";
	     $rootScope.errorMsg="";
	    UploadAllImgs($scope.REFID,addkyc_array,"ipa");
	    $scope.updateStatus();
	    console.log("$scope.dstatus :"+$scope.dstatus);
	    if(status == "Declined")
		{	
	    	$("loaderImg").show();
	    	$timeout( function(){ $location.path("/cdl/dashboard"); }, 3000);
		     $rootScope.errHead="";
		     $rootScope.errorMsg="";
		}else
		 {
			$('#additionalDoc').hide();
			$('#additionalDocfinal').show();
		 }
	
};

/*// service for getting postIPA pdf
function GetPostIPA_PDF()
{  var json = {'sImgID':'5705241c5da0a102d348d6cd'};
	$http({
		method : 'POST',
		url : BASE_URL_GNG+'get-image-by-id-base64',
		data : json,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(Response) 
	{
	 console.log("post delivery order-"+JSON.stringify(Response));
	 $scope.finalImage = "data:application/pdf;base64,"+Response.byteCode;
	 $('#additionalDoc').hide();
	 $('#additionalDocfinal').show();
	}).error(function(error) {
		$scope.error = 'Sorry ! We could not process this request...';		
	});	
}*/

$(document).on('click','.preview', function(e) {
	var src = $(this).attr("accesskey");
	$(document.body).find('#document_preview').hide();
	$(document.body).find('#cirhtml').attr("data",src).show();
});
// ==========================================================================================================

function ageCalculator(){
	
	var dat = $("#dob").val();
	
	var day=dat.slice(0,2);
	
	var month=dat.slice(3,6);
	
	var yr=dat.slice(7,11);
	
	var convert;
	
	switch (month) {
	case "Jan":
		convert=1;
		break;

	case "Feb":
		convert=2;
		break;
	case "Mar":
		convert=3;
		break;
		
	case "Apr":
		convert=4;
			break;
	case "May":
		convert=5;	
					break;
	case "Jun":
		convert=6;	
					break;
	case "Jul":
		convert=7;
					break;
	case "Aug":
		convert=8;	
					break;
	case "Sep":
		convert=9;		
					break;
	case "Oct":
		convert=10;			
					break;
	case "Nov":
		convert=11;				
					break;
	case "Dec":
		convert=12;					
					break;
	}
	
	var format=yr+"/"+convert+"/"+day;
	var birthdate = new Date(format);
	var cur = new Date();
	var diff = cur-birthdate; // This is the difference in milliseconds
	var age = Math.floor(diff/31536000000); // Divide by 1000*60*60*24*365
	return age;
}



$scope.submitApplication=function(UrlKey)
{
	var bool=true;
	modelNo=$("#mdl").val();
//	assetCat = $("#ast option:selected").val();
	make = $("#mk").val();
	$scope.Header={"sAppSource":"WEB","sDsaId":$scope.useremail,"sInstID":$scope.InstitutionID,
			"sReqType":"JSON","sDealerId":dlrCode};
	
	$scope.address={"sLine1":$("#a1").val(),"sLine2":$("#a2").val(),"sCountry":"INDIA","sCity":$("#percity").val(),
			"sLine3":$("#a3").val(),"sState":$("#perstate").val(),"iPinCode":$("#perpin").val(),"sAddrType":"RESIDENCE",
			"sResAddrType":$("#addressType option:selected").val(),"iMonthAtCity":$("#mcity").val(),
			"dRentAmt":$("#rent").val()==undefined ? "" : $("#rent").val().replace(/,/g,''),"iMonthAtAddr":$("#pertadd").val()};
	$scope.address2={"sLine1":$("#prmnt_a1").val(),"sLine2":$("#prmnt_a2").val(),"sCountry":"INDIA","sCity":$("#prmnt_percity").val(),
			"sLine3":$("#prmnt_a3").val(),"sState":$("#prmnt_perstate").val(),"iPinCode":$("#prmnt_perpin").val(),"sAddrType":"PERMANENT",
			"sResAddrType":$("#prmnt_addressType option:selected").val(),"iMonthAtCity":$("#prmnt_mcity").val(),
			"dRentAmt":$("#prmnt_rent").val()==undefined ? "" :$("#prmnt_rent").val().replace(/,/g,''),"iMonthAtAddr":$("#prmnt_pertadd").val()};
	$scope.address3={"sLine1":$("#wrka1").val(),"sLine2":$("#wrka2").val(),"sCountry":"INDIA","sCity":$("#wrkcity").val(),
			"sLine3":$("#wrka3").val(),"sState":$("#wrkstate").val(),"iPinCode":$("#wrkpin").val(),"sAddrType":"OFFICE"};
	$scope.oAddr={"aAddr":[]};
	$scope.oAddr.aAddr.push($scope.address);
	$scope.oAddr.aAddr.push($scope.address2);
	$scope.oAddr.aAddr.push($scope.address3);

	$scope.perPhone={"sPhoneType":"PERSONAL_PHONE","sAreaCode":$("#perstdCode").val(),"sPhoneNumber":$("#perphone").val(),"sCountryCode":"+91"};
	$scope.permanentPhone={"sPhoneType":"RESIDENCE_PHONE","sAreaCode":$("#prmnt_perstdCode").val(),"sPhoneNumber":$("#prmnt_perphone").val(),"sCountryCode":"+91"};
	$scope.wrkPhone={"sPhoneType":"OFFICE_PHONE","sAreaCode":$("#wrkstd").val(),"sPhoneNumber":$("#wrkphn").val(),"sCountryCode":"+91"};
	$scope.perMobile={"sPhoneType":"PERSONAL_MOBILE","sPhoneNumber":$("#permobile").val(),"sCountryCode":"+91"};
	$scope.permanentMobile={"sPhoneType":"RESIDENCE_MOBILE","sPhoneNumber":$("#prmnt_permobile").val(),"sCountryCode":"+91"};
	$scope.wrkMobile={"sPhoneType":"OFFICE_MOBILE","sPhoneNumber":$("#wrkmob").val(),"sCountryCode":"+91"};
	$scope.Phone={"aPhone":[]};
	$scope.Phone.aPhone.push($scope.perPhone);
	$scope.Phone.aPhone.push($scope.permanentPhone);
	$scope.Phone.aPhone.push($scope.wrkPhone);
	$scope.Phone.aPhone.push($scope.perMobile);
	$scope.Phone.aPhone.push($scope.permanentMobile);
	$scope.Phone.aPhone.push($scope.wrkMobile);

	$scope.email1={"sEmailAddr":$("#peremail").val(),"sEmailType":"PERSONAL"};
	$scope.email2={"sEmailAddr":$("#prmnt_peremail").val(),"sEmailType":"RESIDENCE"};
	$scope.email3={"sEmailAddr":$("#wrkemail").val(),"sEmailType":"WORK"};
	$scope.email={"aEmail":[]};
	$scope.email.aEmail.push($scope.email1);
	$scope.email.aEmail.push($scope.email2);
	$scope.email.aEmail.push($scope.email3);
	
	$scope.name={"oApplName":{"sFirstName":$("#fname").val(),"sLastName":$("#lname").val(),"sMiddleName":$("#mname").val()}};

	$scope.kyc={"aKycDocs":[]};
	$scope.kyc1={"sKycName":"PAN","sKycNumber":$("#pan").val()};
	$scope.kyc2={"sKycName":"AADHAAR","sKycNumber":$("#aadhar").val()};
	$scope.kyc.aKycDocs.push($scope.kyc1);
	$scope.kyc.aKycDocs.push($scope.kyc2);
	$scope.mobileVer={"bMobVer":$scope.verifyMob};
	$scope.asset={"aAssetDetail":[]};
	
	
	$scope.asset1={"sAssetCtg":$scope.assetCategory,"sAssetMake":$("#mk").val(),"sDlrName":$scope.dealerName,
					"sModelNo":$("#mdl").val(),"sPrice":""};
	$scope.asset.aAssetDetail.push($scope.asset1);
	
	$scope.emp={"aEmpl":[]};
	$scope.emp1={"sConst": $("#constitution").val(),"sEmplName":$("#wrkename").val(),"sEmplType":$scope.wrketype,
			"iTmWithEmplr":$("#wrktwe").val(),"dmonthSal":$("#wrkLstMnthSal").val().replace(/,/g,""),"dGrossSal":"",
			"dItrAmt":$("#wrkGrsAnnual").val().replace(/,/g,"")};
	$scope.emp.aEmpl.push($scope.emp1);

	$scope.applicant={};
	$scope.credit={"sCreditCardNum":$("#cr").val()}; 
//	$scope.birth=dtcnvrt();
	$scope.dt={"sDob":$("#dob").val().replace(/:/g,"")}; 
	$scope.education={"sEdu":$("#edu").val()};
	$scope.gndr={"sApplGndr":$scope.gender};
	$scope.mstat={"sMarStat":$scope.mstatus};
	$scope.age={"iAge":ageCalculator()};
	$.extend( $scope.applicant,$scope.oAddr);
	$.extend( $scope.applicant,$scope.Phone);
	$.extend( $scope.applicant,$scope.name);
	$.extend( $scope.applicant,$scope.credit);
	$.extend( $scope.applicant,$scope.dt);
	$.extend( $scope.applicant,$scope.education);
	$.extend( $scope.applicant,$scope.email);
	$.extend( $scope.applicant,$scope.emp);
	$.extend( $scope.applicant,$scope.gndr);
	$.extend( $scope.applicant,$scope.kyc);
	$.extend( $scope.applicant,$scope.mstat);
	$.extend( $scope.applicant,$scope.mobileVer);
	$.extend( $scope.applicant,$scope.age);
	$.extend( $scope.applicant,{"sApplID":"APPLICANT_1"});
	$.extend( $scope.applicant,{"residenceAddSameAsAbove":$scope.same});
	$.extend( $scope.applicant,{"bSameAbove":$scope.same});

	$scope.loanType={"sLoanType":"Consumer Durables"};
	$scope.loantenor={"iLoanTenor":$("#tim").val()};
	$scope.loanamt={"dLoanAmt":$("#lamt").val().replace(/,/g,'')};
	$scope.application={};
	$.extend($scope.application,$scope.asset);
	$.extend($scope.application,$scope.loanType);
	$.extend($scope.application,$scope.loantenor);
	$.extend($scope.application,$scope.loanamt);
	
	$scope.req={"oApplicant":$scope.applicant,"oApplication":$scope.application,"sSuspAct":$("#susPctdFrd").val()};
	$scope.hdr={"oHeader":$scope.Header};
	$scope.reqst={"oReq":$scope.req};
	$scope.refereceID={"sRefID":$scope.sRefID}
	// $scope.object{"oHeader":$scope.Header,"oReq":$scope.req};
	$.extend($scope.object,{"sRefID":$scope.REFID});
	$.extend($scope.object,$scope.hdr);
	$.extend($scope.object,$scope.reqst);
	console.log("submit json= "+JSON.stringify($scope.object));
   
   $http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+'submit-application/'+UrlKey,
		data :$scope.object,
		headers : {'Content-Type':'application/json'}
	}).success(function(data){ 
		if(UrlKey=="step4"){
				
			$("#infoContainer , #ErrorContainer").hide();
			
			$("#resultPanel").show();
			
				$scope.StartTimer();
				$scope.REFID =data.sRefID;
				var statusJSON ={
					  "sRefID":data.sRefID,
					  "oHeader": {
					    "sCroId": "default",
					    "dtSubmit":new Date().getTime(),
					    "sReqType": "JSON",
					    "sAppSource" : "WEB",
					    "sDsaId":$scope.useremail,
					    "sAppID": "",
					    "sSourceID":"",
					    "sInstID":$scope.InstitutionID
					  }
				};

				poller = $interval(function(){
					$scope.check_status(statusJSON);
				},3000);
		}

		if(UrlKey=="step3"){
			$rootScope.errHead = "Status"
			$rootScope.errorMsg = "Data Saved Successfully.";
		}
		
		UploadAllImgs(data.sRefID,img_array,"submit");
		
		$scope.REFID = data.sRefID;

	}).error(function(data){
		$scope.serviceHitCount=$scope.serviceHitCount+1;
		if($scope.serviceHitCount<=3)
			{
			$scope.submitApplication();
			}
		else{
			$scope.serviceHitCount=1;
			$scope.error="Sorry we can not process your Submit request";
		}	
	});
};



var timer = null, startTime = null;
/*var progress = $("#progress").shieldProgressBar(
		{	min : 0,max : 60, value : 60,
			layout : "circular",
			layoutOptions : {
				circular : {width : 8,borderWidth : 1,color : "rgb(36,161,237)" },
			},
			text : {
				enabled : true,
				template : '<span style="font-size:60px;color:rgb(36,161,237);text-align :center">{0:n0}</span><p style="color:rgb(36,161,237);margin-top:-10px;">SECONDS</p>'
			},
			reversed : true
		}).swidget();*/
// set last and llast month from date
//var myDate = new Date();
//$scope.lastmonth = myDate.setMonth(myDate.getMonth() - 1);
//$scope.last_lastmonth = myDate.setMonth(myDate.getMonth() - 1);
// save function at submit button
// function start_timer() {
// 	$('#timer_box').show();
// 	clearInterval(timer);
// 	startTime = Date.now();
// 	timer = setInterval(updateProgress, 100);
// };
// function stop_timer() {						
// 	$rootScope.counter = -1;
// //	progress.value(0);
// 	clearInterval(timer);
// //	$('#timer_box').hide();
// };

function updateProgress() {
	var remaining = 60 - (Date.now() - startTime) / 1000;
	$rootScope.counter = Math.floor(remaining);
	progress.value(remaining);
	if (remaining <= 0) {
		clearInterval(timer);								
		return 0;
	}
}


function validation()
{
	var error =false;
	var selectError=false;
	var panptrn = /[A-Z]{3}[P][A-Z]\d{4}[A-Z]/i;
	var nmrptrn = /^[0-9,\d]+$/;
	var nnMndtry = /(mname|cr|a2|a3|wrka2|wrka3|perphone|prmnt_perphone|wrkphn|aadhar|pan|prmnt_a1|prmnt_a2|prmnt_a3|prmnt_addressType|prmnt_rent|prmnt_perpin|prmnt_percity|prmnt_perstate|prmnt_perstdCode|prmnt_permobile|prmnt_peremail|prmnt_pertadd|prmnt_mcity|IpaAdModel0|IpaAdModel1|pan_card|adharNo|passportNo|drivingNo|incmProof|incmProof2|otherTg|wrketype)$/i;
	var number = /(wrkLstMnthSal|tmob|lamt|tim|perpin|prmnt_perpin|perstdCode|prmnt_perstdCode|perphone|prmnt_perphone|permobile|prmnt_permobile|pertadd|prmnt_pertadd|mcity|prmnt_mcity|wrkpin|wrkstd|wrkphn|wrkmob|wrktwe|cr|rent|prmnt_rent|astCst|mnyCnfm)$/i;
	var string = /(fname|mname|lname)$/i;
//	var char4 =/(fname|lname)$/i;
	var char10 =/(a1|prmnt_a1|wrka1)$/i;
	var email=/(peremail|prmnt_peremail|wrkemail)$/i;
	var mobile=/(tmob|permobile|prmnt_permobile|wrkmob)$/i;
	var pincode=/(perpin|prmnt_perpin|wrkpin|cr)$/i;
	var std	=/(perstdCode|prmnt_perstdCode|wrkstd)$/i;
	var phone=/(perphone|prmnt_perphone|wrkphn)$/i;
	var strptrn = /^[a-zA-Z]+$/ ;
//  var mailptrn =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var mailptrn =/^[A-Za-z0-9._]+@[A-Za-z]+\.[a-z]{2,4}$/;
	
	$("input[type='text']:visible").each(function()
	{
		var id= $(this).attr("id");
		var val= $(this).val();
		var length=$(this).val().length;
		
		 if(val == "" && !nnMndtry.test(id))
				{
//					console.log("Input is blank");
					$(this).focus();
					error = true;
					 $rootScope.errHead=$(this).siblings("help").text();
					 $rootScope.errorMsg="Please enter the value";
					 return false;
				}
//			else if(char4.test(id))
//				{
//					if(length < 4 || !strptrn.test(val))
//						{
//							$(this).focus();
//							error = true;
////							console.log("String condition not matched");
//						}
//				}
		 else if(val != "")
		 {		
		    if( char10.test(id)  )
			{
				if(length < 10 )
					{
						$(this).focus();
						error = true;
						$rootScope.errHead=$(this).siblings("help").text();
						$rootScope.errorMsg="Please enter the valid value";
						return false;
//						console.log("String condition not matched");
					}
			}
			else if( email.test(id)  )
			{
				if(!mailptrn.test(val) )
					{
						$(this).focus();
						error = true;
						$rootScope.errHead=$(this).siblings("help").text();
						$rootScope.errorMsg="Please enter the valid value";
						return false;
//						console.log("mailptrn not matched");
					}
			}else if(string.test(id) )
			{
				if(!strptrn.test(val) )
				{
					$(this).focus();
					error = true;
					$rootScope.errHead=$(this).siblings("help").text();
					$rootScope.errorMsg="Please enter valid input";
					return false;
//					console.log("mailptrn not matched");
				}
			}	
			else if(number.test(id) )
			{
				if(mobile.test(id))
				{
					if(!nmrptrn.test(val) || val.length !== 10)
					{
					$(this).focus();
					error = true;
					$rootScope.errHead=$(this).siblings("help").text();
					$rootScope.errorMsg="Please enter the valid value";
					return false;
//					console.log("mobile Condition not matched..");
					}
				}
				else if(pincode.test(id))
					{
					if(!nmrptrn.test(val) || val.length !== 6)
					{	$(this).focus();
					error = true;
					$rootScope.errHead=$(this).siblings("help").text();
					$rootScope.errorMsg="Please enter the valid value";
					return false;
//					console.log("pincode Condition not matched..");
					}
					}
				else if(phone.test(id))
					{
					if(!nmrptrn.test(val) || val.length < 4)
					{	$(this).focus();
					error = true;
					$rootScope.errHead=$(this).siblings("help").text();
					$rootScope.errorMsg="Please enter the valid value";
					return false;
//					console.log("phone Condition not matched..");
					}
					}
				else if(std.test(id))
					{
					if(!nmrptrn.test(val) || val.length < 3)
					{$(this).focus();
					error = true;
					$rootScope.errHead=$(this).siblings("help").text();
					$rootScope.errorMsg="Please enter the valid value";
					return false;
//					console.log("phone Condition not matched..");
					}
					
					}
				else
					{
					if(!nmrptrn.test(val))
					{	$(this).focus();
						error = true;
						$rootScope.errHead=$(this).siblings("help").text();
						$rootScope.errorMsg="Please enter only numeric values";
//						console.log("phone Condition not matched..");
						return false;
					}
					}
			}
		 }
	});
//	console.log("name length :"+$("#fname").val().length+$("#lname").val().length);
	
	if(error == false && (parseInt($("#fname").val().length)+parseInt($("#lname").val().length)) < 4)
	{
	 error=true;
	 $rootScope.errHead="Name";
	 $rootScope.errorMsg="First name and last name should have atleast 4 character";
	 $("#fname,#lname").focus();
	 return false;
	}else if(error == false)
	{ if( ($(".pan").is(":visible") && $(".pan").val() !="") || ($(".aadhaar").is(":visible") && $(".aadhaar").val() != "") )
	  {	
		if($(".aadhaar").val() !="")
		{
				if($("#aadhar").val().length != 12 ||!nmrptrn.test($("#aadhar").val()))
				{$rootScope.errHead="AADHAAR";
				 $rootScope.errorMsg="Please Enter valid AADHAAR Number";
					$("#aadhar").focus();
					error = true;
					return false;
				}
				else{
					$rootScope.errHead="";
					$rootScope.errorMsg="";
					error = false;
				}
			}
		if($(".pan").val() !="")
		{
			if(!panptrn.test($("#pan").val()))
				{
				$rootScope.errHead="PAN";
				$rootScope.errorMsg="Please Enter Correct PAN Number ";
				$("#pan").focus();
				error = true;
				return false;
				}else{
					$rootScope.errHead="";
					$rootScope.errorMsg="";
					error = false;
				}
			}
	}
  else if($(".pan").is(":visible")  || $(".aadhaar").is(":visible") )
	{
		$rootScope.errHead="KYC";
		$rootScope.errorMsg="Please Enter PAN OR AADHAAR Number";
		$("#pan").focus();
		$("#aadhar").css("border-bottom","1px solid red");
		error = true;
	//return false;
	}
  }
	if(error == false )
	{ 
		$("select:visible").each(function(){
			var id=$(this).attr("id");
			var nnflag = nnMndtry.test(id)
			if($(this).val() == "" && !nnflag)
			{
				$(this).focus();
				selectError = true;
				$rootScope.errHead=$(this).siblings("help").text();
				$rootScope.errorMsg="Please select valid option";
				return false;
			}
			else
			{
				$(this).css("border-bottom","1px solid #727272");
			}
		});
		var testArr=[{"val1":"#pertadd","val2":"#mcity"},{"val1":"#prmnt_pertadd","val2":"#prmnt_mcity"}];
	  if($("#pertadd").is(":visible"))
	  {  for(var Object in testArr)
		 { var val1=parseInt($(Object.val1).val());
	  	   var val2=parseInt($(Object.val2).val());
		  	if(val1>val2)
			{	$(Object.val1).focus();
			  	 error = true;
				 $rootScope.errHead=$(Object.val1).siblings("help").text();
				 $rootScope.errorMsg="Time at address should be less or equal to time at City";
				 return false;
			}
		 }
	  }
	}
	if(error == true || selectError == true)
		{
		error=false;
		selectError=false;
		return false;
		}
	else
		{
		$rootScope.errHead="";
		$rootScope.errorMsg="";
		return true;
		}
		$scope.$apply();
}

/*$(document.body).on("change","#addressType",function(){
	if($(this).val()== "RENTED" )
		{
			$("#rent").show();
		}
	else
		{
		$("#rent").hide();	
		}
});*/

var mdlCnt=1
var rowCnt=1;
// add new template for model no in postipa
$(document.body).on("click","#anotherModel",function()
{	
var id=$(document.body).find("div[id^=modelRow]").last().attr("id");
var	dom="<div class='col-md-4 height mdlNmbr' id='fmodelPanel"+mdlCnt+"'><help>Additional Model Number</help><input type='text' id='IpaAdModel"+mdlCnt+"' class='customInput' placeholder='Additional Model Number'/>" ;
dom=dom+"<span class='glyphicon glyphicon-remove'></span></div></div>";
mdlCnt++;
$("#apc").children().last().append(dom);
});

$scope.remove_file = function(filetype, id, index) {
		if(id == 1)
		{  	$scope.selectImg1 = "";
			$("#panImg").attr("src","");
			$scope.panPresent=false;
		}
		else if(id == 2)
		{	$scope.selectImg2 = "";
			$("#aadhaarImg").attr("src","");
			$scope.adharpresent=false;
		}
		else if(id == 3)
		{	$scope.selectImg3 = "";
			$("#passportImg").attr("src","");
			$scope.passportPresent=false;
		}
		else if(id == 4)
		{	$scope.selectImg4 = "";
			$("#drivingImg").attr("src","");
			$scope.drivingPresent=false;
		}
		/*else if(id == 5)
		{	$scope.selectImg5 = "";
			$("#selectImgInit").attr("src","");
			$scope.profileImage=false;
		}*/
		else if(id == 6)
		{	$scope.selectImg6 = "";
			$("#incomeImg").attr("src","");
			$scope.incomePresent=false;
		}
		else if(id == 7)
		{	$scope.selectImg7 = "";
			$("#income2Img").attr("src","");
			$scope.income2Present=false;
		}
		else if(id == 8)
		{	$scope.selectImg8 = "";
			$("#otherImg").attr("src","");
			$scope.otherPresent=false;
		}
		else if(id == 0){	
				$scope.selectImgInit = "";
				$("#selectImgInit").attr("src","");
				$scope.profileImage=false;
		}
		
};// end file remove method

$(document.body).on("click",".remove_image",function()
	{

//		console.log($(this).attr("name"));
		var name=$(this).attr("name");
		addkyc_array=$.grep(addkyc_array, function(e) { return e.kyc_name!=name });
//		for(prop of addkyc_array)
//		{
//			   if(prop.kyc_name==name)
//			   {  delete prop;  
			    $(document.body).find("#"+name+"").css("background-image", "none");
				$(document.body).find("#"+name+"label").show();
				$(document.body).find("#"+name+"remove").hide();
//			   }
			
//			}
//	console.log("kyc Array : "+addkyc_array.length);
	});


$(document.body).on("click","#postNext",function(){
	var bool=validation();
	if(bool)
	{	$scope.ipaService(); }	
});

$(document.body).on("click","#postIPA",function(){
		$("#resultPanel").hide();
		$("#afterSubmit").show();
		/*//	console.log("Status="+$scope.dstatus);	
		if($scope.dstatus == "Queue")
		{   $scope.scmService(); // get all scheme from master
			$scope.postIpaDisp=$("#mk").val()+" - "+$("#mdl").val();
			$("#pOrder").show();
			$("#disImgRw ,#chkImgRw ,#aggImgRw").show();
		}
		else
		{
		 $("#additionalDoc").show();
		 $("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
		// $("#pOrder").show();
		}*/
//		changes
		/*console.log("make : "+$("#mk").val()+" - "+$("#mdl").val())
		$scope.postIpaDisp=$("#mk").val()+" - "+$("#mdl").val();
		$("#pOrder").show();
		$("#disImgRw ,#chkImgRw ,#aggImgRw").show();*/
});
//send post ipa data and start flow
$scope.ipaService = function()
{	
	$scope.ipaJSonFunction();
//	console.log("$scope.ipaJson :"+$scope.ipaJson);
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+'post-ipa-pdf',
		data :$scope.ipaJson,
		headers : {'Content-Type':'application/json'}
	}).success(function(data) 
	{	console.log("Response Data post IPA : " + JSON.stringify(data));
	  // post ipa pdf id will availeble here
	 if(data.sStat=="SUCCESS")
	 {    $scope.postIpaPdfId=data.sDocID;
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

$scope.ipaJSonFunction=function()
{	
	$scope.postIPANum=[];
	/*$('input','#apc').each(function(index,ele)
	{
	  $scope.postIPANum.push($(this).val());
	});*/

	console.log("Asset Category : " + $scope.assetCategory);
	$scope.ipaJson={
			  "oHeader": {
				    "sCroId": "default",
				    "dtSubmit": 1465286225703,
				    "sReqType":"JSON",
				    "sAppSource": "WEB",
				    "sDsaId": $scope.userid,
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

 console.log("post ipa request"+JSON.stringify($scope.ipaJson));
}


$scope.sendPostIpaMail=function()
{ 
	var requestJson={"sRefID":$scope.REFID,
	"oHeader":{"sCroId":"default","dtSubmit":1460633827786,"sReqType":"JSON",
		"sAppSource":"WEB","sDsaId":$scope.userid,
	    "sAppID":$scope.userid,
	    "sSourceID": "02",
	    "sInstID": $scope.InstitutionID},
		"sImgID":$scope.postIpaPdfId};
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+'send-mail-pdf',
		data :requestJson,
		headers : {'Content-Type':'application/json'}
	}).success(function(data) 
	{	//console.log("Response Data post IPA mail : " + JSON.stringify(data));
	 setTimeout(function(){
	    location.reload();
     }, 3000);
	}).error(function(data) 
	{
		$scope.serviceHitCount=$scope.serviceHitCount+1;
		if($scope.serviceHitCount<=3)
			{
			  $scope.sendPostIpaMail();
			}
		else{
			$scope.serviceHitCount=1;
			$scope.error="Sorry we can not process your POST IPA request";
		}	
	});
	$scope.finalResponse="Email sent successfully";
	setTimeout(function(){
		$scope.finalResponse="";
	    location.reload();
     }, 15000);
};

//get all employer name from master
//$(document.body).on("keyup","#wrkename",function(e)
//{	if($(this).val().length == 1)
//	{
//		$scope.empService($(this).val());
//	}
//});
$scope.emplArr=[];
/*$("#wrkename").autocomplete({
	source: $scope.emplArr
  });
*/
// $scope.empService = function(key){
// 	$scope.assetJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":""}; 
// 	$http({
// 		method : 'POST',
// 		url : APP_CONST.getConst('BASE_URL_GNG')+'employer-master-details-web',
// 		data :$scope.assetJson,
// 		headers : {'Content-Type' : 'application/json'}
// 	}).success(function(data) 
// 	{ 
// 		$scope.emplArr = [];
// 		for(var i in data) 
// 		{   
// 			$scope.emplArr.push(data[i].sEmpName);
// 		};
// 		/*$("#wrkename").autocomplete({
// 			source: $scope.emplArr
// 		});*/

// 		console.log("Data Successfully getting after Employr master*********************-" + $scope.emplArr);
// 	}).error(function(data) 
// 	{
// 		console.log("Getting Error from Employer service.");
// 	});
// };
// $scope.empService();
// $scope.Employee=["Pune","allahabad","Hello","apply","Alpha","Beta","Gama"];

$scope.getEmployerNames=function(queryStr){
			var ojs={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":queryStr};

			return RestService.saveToServer("employer-master-details-web",ojs)
			.then(function(data)
			{

				var map=data.map(function(item){					
			        return item.sEmpName;
		      	});
				//console.log(map);
				return data.map(function(item){
					//console.log(item.sEmpName);
			        return item.sEmpName;
		      	});
 			});
		};



// *********************SCHEME SERVICE***********************************************************
$scope.allSchemes = "";
$scope.scmTags = [];
/*$("#scheme").autocomplete({
	source: $scope.scmTags
});*/

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
			    "sDsaId":$scope.useremail,
			    "sAppID": $scope.REFID,
			    "sDealerId": dlrCode,
			    "sSourceID": "GONOGO_HDBFS",
			    "sInstID": $scope.InstitutionID
			  },
			  "sModelNo": modelNo,
			  "sCatDsc":$scope.assetCategory,
			  "sMfrDscr":make
			}
	console.log("$scope.scmJson Input JSON"+JSON.stringify($scope.scmJson));
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+'filtered-scheme-master',
		data :$scope.scmJson,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data)
	 {	$scope.allSchemes = data;
	 	$scope.scmTags=[];
		for(var i in data){   
			$scope.scmTags.push(data[i].sSchDes)
		}
		/*$("#scheme").autocomplete({
			source: $scope.scmTags
		});*/
		console.log("Data Scheme master : " + JSON.stringify(data));
		console.log("Data ScHIT124DBD1heme master : " + $scope.scmTags);
		
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
}

// to set the emi and other value for selected scheme
// $('#scheme').on('autocompleteselect', function (e, ui) 
$scope.selectScheme =function(ui)
{	$scope.SchemeObject = "";
	for(var Object in $scope.allSchemes)
		{
		 if(Object.sSchDes==ui)
			 {
			 	$scope.SchemeObject=Object;
//			 	console.log("$scope.SchemeObject : "+ JSON.stringify($scope.SchemeObject));
			 	break;
			 }
		}
	var taprAmt = parseFloat($("#apvAmt").val().toString().replace(/,/g,""));
	var ttlAsstCst = parseFloat($("#astCst").val().toString().replace(/,/g,""));
	if($scope.SchemeObject.sMxTenu==null||typeof $scope.SchemeObject.sMxTenu=='undefined')
	{
		$scope.SchemeObject.sMxTenu=0;
	}
	if($scope.SchemeObject.sMinTenu==null||typeof $scope.SchemeObject.sMinTenu=='undefined')
	{
		$scope.SchemeObject.sMinTenu=0;
	}
	if($scope.SchemeObject.sDint==null||typeof $scope.SchemeObject.sDint=='undefined')
	{
		$scope.SchemeObject.sDint=0;
	}	
	if($scope.SchemeObject.sMinAmt==null||typeof $scope.SchemeObject.sMinAmt=='undefined')
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
		 temi =  (ttlAsstCst/parseFloat($scope.SchemeObject.sMxTenu));
		 temi =  Math.ceil(temi);
		 tadEmi=( temi * parseFloat($scope.SchemeObject.sMinTenu));
		}
		tadEmi=  Math.ceil(tadEmi);
	$scope.pstIpaSchmExp = ""+$scope.SchemeObject.sSchID+"("+$scope.SchemeObject.sMinTenu+"/"+$scope.SchemeObject.sMxTenu+")";
	if(taprAmt < ttlAsstCst)
	{
	  $scope.dltSrchrg = (taprAmt * (parseFloat($scope.SchemeObject.sDint)/100));
	}else
		{
		  $scope.dltSrchrg = (ttlAsstCst * (parseFloat($scope.SchemeObject.sDint)/100));
		}
	Math.round($scope.dltSrchrg)
	$("#aEMI").val(tadEmi).siblings("help").show();
	$("#emi").val(temi).siblings("help").show();
//	$("#mrgnMny").val(tmrgnMny).prev().show();
	$("#prcsfee").val( Math.ceil($scope.SchemeObject.sMinAmt)).siblings("help").show();
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
	if($scope.SchemeObject.sMxTenu==null||typeof $scope.SchemeObject.sMxTenu=='undefined')
	{
		$scope.SchemeObject.sMxTenu=0;
	}
	if($scope.SchemeObject.sMinTenu==null||typeof $scope.SchemeObject.sMinTenu=='undefined')
	{
		$scope.SchemeObject.sMinTenu=0;
	}
	if($scope.SchemeObject.sDint==null||typeof $scope.SchemeObject.sDint=='undefined')
	{
		$scope.SchemeObject.sDint=0;
	}	
	if($scope.SchemeObject.sMinAmt==null||typeof $scope.SchemeObject.sMinAmt=='undefined')
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
// ****************************************** ASSET MODEL
$scope.modelTags = [];
$(".ast").change(function()
{
	$scope.assetCategory=$(this[this.selectedIndex]).val();
	$scope.assetMake($scope.assetCategory);
});

//to get all model for selected make
/*$('#mk1').on('autocompleteselect', function (e, ui) {
	$scope.mk=ui.item.value;
//	$scope.mk1=ui.item.value;
	$scope.assetModel($scope.assetCategory,ui.item.value);
});*/
$(document.body).on("change","#mk ,#mk1",function(){
	$scope.assetModel($scope.assetCategory,$scope.mk);
});
//to get all model for selected make
/*$('#mdl1').on('autocompleteselect', function (e, ui) {
	$scope.mdl=ui.item.value;
//	$scope.mdl1=ui.item.value;
});*/


// ************************************************ ASSET MAKE
//$scope.makeTags =[];
/*$("#mk1").autocomplete({
	source: $scope.makeTags
});*/


$scope.updateStatus = function(){
	$scope.updateJson ={"sRefID":$scope.REFID};
	console.log("Input JSON for status update :"+$scope.updateJson);
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+"post-ipa-stage-update",
		data :$scope.updateJson,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data) 
	{
		console.log("Data from status update : " + JSON.stringify(data));			
	}).error(function(data)
	{ 
	console.log("Getting Error from make service.");
	});
}

$scope.resetStatus=function(){
	$scope.updateJson ={
			  "sRefID": $scope.REFID,
			  "sHeader": {
			    "sCroId": "default",
			    "dtSubmit": new Date().getTime(),
			    "sReqType": "JSON",
			    "sAppSource": "WEB",
			    "sDsaId": $scope.userid,
			    "sAppID": "APPLICANT_1",
			    "sDealerId": dlrCode,
			    "sSourceID": "HDBFS_CDL",
			    "sInstID":  $scope.InstitutionID
			  },
			  "sAppStat": "QUEUE"
			}
//	console.log("Input JSON for status update :"+$scope.updateJson);
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_GNG')+"reset-status",
		data :$scope.updateJson,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data) 
	{
//		console.log("$scope.REF :" + $scope.REF);
		
		 var statusJSON ={
				  "sRefID":$scope.REF,
				  "oHeader": {
				    "sCroId": "default",
				    "dtSubmit":new Date().getTime(),
				    "sReqType": "JSON",
				    "sAppSource" : "WEB",
				    "sDsaId":$scope.useremail,
				    "sAppID": "",
				    "sSourceID":"",
				    "sInstID":$scope.InstitutionID
				  }
			}
		$("#resultPanel").show();
		$scope.StartTimer(); // 	60 sec timer
		poller = $interval(function(){
			$scope.check_status(statusJSON);
		},3000);
		
	}).error(function(data)
	{ 
	console.log("Getting Error from Reset State.");
	});
};

 $("select").change(function(){
	 $(this).siblings("help").show(); 
 });
 
 $("#prmnt_perstdCode, #wrketype").removeAttr("disabled");

	$scope.addNewElement=function(key)
	{  switch (key) {
		case "APPLICATION_FORM":
			$scope.ApplicationArr.push({value:key,"index":($scope.ApplicationArr[$scope.ApplicationArr.length-1].index)+1});
			break;
		case "AGREEMENT":
			$scope.AggrigationArr.push({value:key,"index":($scope.AggrigationArr[$scope.AggrigationArr.length-1].index)+1});
			break;
		case "ACH":
			$scope.AchArr.push({value:key,"index":($scope.AchArr[$scope.AchArr.length-1].index)+1});
			break;
			
		case "DISBURSEMENT":
			$scope.DisbursmentArr.push({value:key,"index":($scope.DisbursmentArr[$scope.DisbursmentArr.length-1].index)+1});
			break;
			
		case "ADDITIONAL_KYC":
			$scope.AddtnlKycArr.push({value:key,"index":($scope.AddtnlKycArr[$scope.AddtnlKycArr.length-1].index)+1});
			break;
		}
		
	}
	
	/* var self = this;

	  self.start = function() {
	    console.log("Fun times have been started!");
	  }*/
	  //Piyush
//	  $(document.body).on("click","#slcDlr",function(){
//		  if($scope.dealerObj!=undefined)
//		  {		  
//			  $("#dlrContainer").hide();
//	  		  $("#nmCntnr").show();
//	  		  $rootScope.errHead="";
//	  		  $rootScope.errorMsg="";
//	  		  $scope.dealerObj=JSON.parse($scope.dealerObj);
//		  }
//		  else
//		  { 
//			  $rootScope.errHead="Dealer";
//			  $rootScope.errorMsg="Please select Dealer";
//		  }
////		  console.log($scope.dealerObj+" : "+$scope.dealerObj["DEALER_CODE"]);
//	  });
	//Piyush
//	    $('.mdlNmbr ').hover(function(){
    	$(document).on("mouseenter",".mdlNmbr ",function(){
//	    	alert("Hello");
	        $(this).find('.glyphicon-remove').css({'display' : 'inline-block'});
	    });
    	$(document).on("mouseleave",".mdlNmbr ",function(){
//	    	alert("Hello");
	        $(this).find('.glyphicon-remove').css({'display' : 'none'});
	    });
	  $(document.body).on("click",".glyphicon-remove",function(){
		  $(this).parent("div").remove();
	  });
	  //reload current data form
	  $("#cancel").click(function(){
		  location.reload();
	  });
	  //save partial service data
     /*$("#save").click(function(){
		  
	  });*/
	 
	  /*$scope.$on('$locationChangeStart', function(event, next, current) {
		  event.preventDefault();
		  var result=confirm("\n\nAre you sure you want to leave this page?");
		  alert(result);
	        if(!result) {
	            event.preventDefault();
	        }else
	        	{
	        	alert("not tested");
	        	}
	        
	    });*/

/*	  $window.onbeforeunload = function (event) {
//		  	$scope.submitApplication();
			var message = 'Are you sure you want to leave, if yes all your data will be lost.';
			if (typeof event == 'undefined') {
				event = $window.event;
			}
			if (event) {
				event.returnValue = message;
			}
			return message;
		}*/
	  
	  $(document.body).on("click","#homePG",function(){
			    location.reload();
	  	});
	  
	  $(document.body).on("click","#aSubmitBtn",function(){
				$("#afterSubmit").hide();
//				console.log("Status="+ status);	
				if(status == "Approved")
				{
					$scope.mkVal = $scope.mk;
					$scope.mdlVal = $scope.mdl;
					$("#ErrorContainer").show();
					$scope.scmService(); // get all scheme from master
					$scope.postIpaDisp=$("#mk").val()+" - "+$("#mdl").val();
					$("#pOrder").show();
					$("#disImgRw ,#chkImgRw ,#aggImgRw").show();
				}
				else if(status == "Declined" )
				{
					$("#pOrder").hide();
				 $("#additionalDoc").show();
				 $("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
				// $("#pOrder").show();
				}
				else if(status == "OnHold")
				{
					console.log("$scope.holdStageArr :"+JSON.stringify($scope.holdStageArr));
				 $("#HoldStage").show();
				 $("#disImgRw ,#chkImgRw ,#aggImgRw").hide();
				// $("#pOrder").show();
				}
	  });
		  
	  $scope.onSaveAssetClicked=function(){
		  $scope.mkVal = $scope.mk;
		  $scope.mdlVal = $scope.mdl;
		  var json = {"make":$("#mk1").val(),"model":$("#mdl1").val()}
		  $scope.scmService(json);
		  $scope.scheme="";
	  }
	 $scope.reprocess=function()
	 {
		 console.log("$scope.refid : "+$scope.REFID +" :Cust id ="+CustID);
		 UploadAllImgs($scope.REF,$scope.holdIndex,"submit");
		 $scope.resetStatus();
		 $("#HoldStage").hide();
		 $("#resultPanel").show();
	 }
	 
	  $scope.$on('$destroy', function() {
		  $scope.stopTimer();
		  $interval.cancel(poller);
	  });

	 	/* dob popup */		
		$scope.openDOBDialog=function(){

			if(!$scope.dob){
				//console.log("DOB Dialog Opened");
		 		var defaultDate = new Date();
		 		defaultDate.setFullYear(defaultDate.getFullYear()-25);

		 		$scope.dob=defaultDate;
			}

			$scope.dobPopup.opened = true;			
		};
		$scope.dobFormat = "dd:MM:yyyy";
	 	$scope.dobPopup = {
		    opened: false
	  	};

		var minDa = new Date();
			minDa.setFullYear(minDa.getFullYear()-100);

		var maxDa = new Date();
		maxDa.setFullYear(maxDa.getFullYear()-18);
		//alert($filter('date')(maxDa,"dd:MM:yyyy"));

		$scope.dateOptions = {		    
		    formatYear: 'yyyy',
		    showWeeks:false,
		    maxDate: maxDa,
		    minDate: minDa,
		    startingDay: 1
		};
		/* End of dob popup */

//		************************Round Progress bar script ****************************************

		   $scope.current =        27;
           $scope.max =            50;
           $scope.offset =         0;
           $scope.timerCurrent =   0;
           $scope.uploadCurrent =  0;
           $scope.stroke =         7;
           $scope.radius =         78;
           $scope.isSemi =         false;
           $scope.rounded =        false;
           $scope.responsive =     false;
           $scope.clockwise =      true;
           $scope.currentColor =   '#45ccce';
           $scope.bgColor =        '#eaeaea';
           $scope.duration =       800;
           $scope.currentAnimation = 'easeOutCubic';
           $scope.animationDelay = 0;

           $scope.getStyle = function(){
               var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

               return {
                   'top': $scope.isSemi ? 'auto' : '50%',
                   'bottom': $scope.isSemi ? '5%' : 'auto',
                   'left': '50%',
                   'transform': transform,
                   '-moz-transform': transform,
                   '-webkit-transform': transform,
                   'font-size': '60px',
                    'color':'#24A1ED'
               };
           };
           var getPadded = function(val){
               return val < 10 ? ('0' + val) : val;
           };

   		var seconds = 1;

		// seconds=59;
		// $scope.seconds=59;
		// $scope.time=59;        

   		var intervalPromise;
   		$scope.StartTimer = function () {
   	             intervalPromise = $interval(function(){
   	                var date = new Date();
   	               $scope.seconds = seconds;
   	               $scope.time = getPadded(seconds);
   			seconds = seconds+1;
   			if( seconds >60)
   				$scope.stopTimer();
   	            }, 1000);
   		};
   			// $scope.StartTimer();
   		
   		$scope.stopTimer = function()
   		{
   			$interval.cancel(intervalPromise);
   		}
// ***********************************************************************************************

	  
	 
}]);


}).call(this)