;(function(){

	'use strict';

	var app=angular.module("gonogo.cdl");

	app.factory("CustFormObject",function(){
    	var _obj = {
    		"sInstId":"",
    		"sUserId":"",
    		"sPassword":"",
    		"sRefID":"",
    		"oHeader":{
    			"sAppID":"",
    			"sInstID":"",
    			"sSourceID":"",
    			"sAppSource":"",
    			"sReqType":"",
    			"dtSubmit":"",
    			"sDsaId":"",
    			"sCroId":"",
    			"sDealerId":""
    		},
    		"oReq":{
    			"oApplicant":{
    				"residenceAddSameAsAbove":"",
    				"sApplID":"",
    				"oApplName":{
    					"sFirstName":"",
    					"sMiddleName":"",
    					"sLastName":"",
    					"sPrefix":"",
    					"sSuffix":""
    				},
    				"oFatherName":"",
    				"oSpouseName":"",
    				"sReligion":"",
    				"sApplGndr":"",
    				"sDob":"",
    				"iAge":"",
    				"sMarStat":"",
    				"aKycDocs":[{
    					"sKycName":"",
    					"sKycNumber":"",
    					"sKycStat":"",
    					"sIssueDate":"",
    					"sExpiryDate":""
    				}],
    				"bSameAbove":"",
    				"aAddr":[{
    					"sLine1":"",
    					"sLine2":"",
    					"sCity":"",
    					"iPinCode":"",
    					"sState":"",
    					"sCountry":"",
    					"sLandLoard":"",
    					"sLine3":"",
    					"sLine4":"",
    					"sVillage":"",
    					"sDistrict":"",
    					"fDistFrom":"",
    					"sLandMark":"",
    					"sAccm":"",
    					"iTimeAtAddr":"",
    					"sAddrType":"",
    					"sResAddrType":"",
    					"iMonthAtCity":"",
    					"iMonthAtAddr":"",
    					"dRentAmt":"",
    					"iYearAtCity":""
    				}],
    				"aPhone":[{
    					"sPhoneType":"",
    					"sAreaCode":"",
    					"sCountryCode":"",
    					"sPhoneNumber":"",
    					"sExt":""}],
    				"aEmail":[{
    					"sEmailType":"",
    					"sEmailAddr":""
    				}],
    				"aEmpl":[{
    					"sEmplType":"",
    					"sEmplName":"",
    					"iTmWithEmplr":"",
    					"sDtJoin":"",
    					"sDtLeave":"",
    					"dmonthSal":"",
    					"dGrossSal":"",
    					"aLastMonthIncome":[],
    					"sConst":"",
    					"sIndustType":"",
    					"sItrID":"",
    					"dItrAmt":"",
    					"sDesig":"",
    					"sEmplrCode":"",
    					"sEmplrBr":"",
    					"sModePayment":"",
    					"sDeptmt":"",
    					"sWorkExps":"",
    					"sBusinesName":"",
    					"dtComencemnt":"",
    					"sIndstryType":""
    				}],
    				"iNoOfDep":"",
    				"iEarnMem":"",
    				"iFamilyMem":"",
    				"oApplRef":"",
    				"sEdu":"",
    				"sCreditCardNum":"",
    				"bMobVer":"",
    				"sAdharVer":"",
    				"aBankingDetails":"",
    				"aLoanDetails":"",
    				"oIncomeDetails":"",
    				"oSurrogate":""
    			},
    			"aCoApplicant":"",
    			"oApplication":{
    				"sAppID":"",
    				"sLoanType":"",
    				"sAppliedFor":"",
    				"dLoanAmt":"",
    				"iLoanTenor":"",
    				"oProperty":"",
    				"sLnPurp":"",
    				"dLnApr":"",
    				"dEmi":"",
    				"iAdvEmi":"",
    				"dMarginAmt":"",
    				"aAssetDetail":[{
    					"sAssetCtg":"",
    					"sDlrName":"",
    					"sAssetMake":"",
    					"sModelNo":"",
    					"sPrice":""
    				}],
    				"aOwndAst":""
    			},
    			"sSuspAct":""
    		},
    		"sRespFormat":"",
    		"sCurrentStageId":""
    	}
        return {
        	dummy : _obj
        }	
    });

app.controller("kycDocuments",['$scope', 'ImageFeed','$uibModalInstance','$timeout','RestService',
    function($scope,ImageFeed,$uibModalInstance,$timeout,RestService){
    $scope.croImages = false;
    $scope.noWrapSlides = true;
    $scope.active = ImageFeed.index;
    $scope.iseditMode = ImageFeed.editMode;
    $scope.imageTag = 1;
    $scope.slides = _.each(ImageFeed.docData,function(value,key){
        return value["id"] = key;
    });
    $scope.closeModal = function(){
          $uibModalInstance.dismiss();
    };
}]);

app.controller("CustomerFormCntrolr",
	['$scope','$rootScope','sharedService',"RestService","APP_CONST","$uibModal","GNG_GA","notifier","$state",
	function($scope,$rootScope,sharedService, RestService, APP_CONST,$uibModal,GNG_GA,notifier,$state){

	$scope.isApplicationDataLoaded=false;
	var CustID=sharedService.getRefID();
	sharedService.setRefID(null);

	$scope.refID = CustID;

	//TODO
	var json ={'sRefID':CustID};

	if(CustID==null || CustID==""){
		$state.go("/cdl/dashboard");
	}

	$scope.addrType = [
	                  {value:'Residence', name:'Residence'},
	                  {value:'Office', name:'Office'},
	                  {value:'Permanent', name:'Permanent'}];

	$scope.phoneData = [{value:'OFFICE_PHONE', name:'Office Phone'},
                      {value:'RESIDENCE_PHONE',name:'Residence Phone'},
                      {value:'PERSONAL_PHONE',name:'Personal Phone'},
   	                  {value:'PERSONAL_MOBILE', name:'Personal Mobile'},
   	                  {value:'RESIDENCE_MOBILE', name:'Residence Mobile'},
   	                  {value:'OFFICE_MOBILE', name:'Office Mobile'}
   	                  ];

  	$scope.constitutionType=[{value:"SAL",name:"Salaried"},
       	{value:"SEB",name:"Self Employed Business"},
       	{value:"SEP",name:"Self Employed Professional"}];

    $scope.findAddressType = function(orignal,final){
    	return (angular.lowercase(orignal) == angular.lowercase(final));
    }

	RestService.saveToServer('dashboard-application-data',json).then(function(Response){
		if(Response){
			$scope.isApplicationDataLoaded=true;

			if(Response)
				$scope.objectSet = Response;
			else
			 	$scope.objectSet = CustFormObject.dummy;

			$scope.name = $scope.objectSet.oReq.oApplicant.oApplName.sFirstName+"  "+ $scope.objectSet.oReq.oApplicant.oApplName.sLastName.replace("null","");							    	
			if($scope.objectSet.oReq.oApplicant.sDob && $scope.objectSet.oReq.oApplicant.sDob.trim()!=="")
			{
				$scope.dob = $scope.objectSet.oReq.oApplicant.sDob.slice(0,2)+"/"+$scope.objectSet.oReq.oApplicant.sDob.slice(2,4)+"/"+$scope.objectSet.oReq.oApplicant.sDob.slice(4);
			}else{
				$scope.dob ="";
			}

			if($scope.objectSet.oReq.oApplicant.aEmpl){
				var tempConstitutionType = $scope.objectSet.oReq.oApplicant.aEmpl[0].sConst;
				var enumText = $scope.getTextOfValueMatched(tempConstitutionType,$scope.aplcntType);
				if(enumText)
					$scope.constitution = enumText;
				else
					$scope.constitution = tempConstitutionType;
			}

			$scope.addr_type = $scope.addrType[0];

			/*$scope.applicationData=Response;

			$scope.applicant = Response.oReq.oApplicant;
			$scope.kyc_data = Response.oReq.oApplicant;
			$scope.applicantbckUp = Response.oReq.oApplicant; 
			
			$scope.officeaddr = "";
			$scope.peraddr = '';
			$scope.resaddr='';
			$scope.phn="";
			$scope.RefID = CustID;
			$scope.dealerID=Response.oHeader.sDealerId;
			var data = 	$scope.notifarray;
			for (j in data)
			{
				if(data[j].sRefID == $rootScope.applicationID){
					$scope.applctnstatus = data[j].sStat;
				}
			}

			$scope.name = Response.oReq.oApplicant.oApplName.sFirstName+"  "+ Response.oReq.oApplicant.oApplName.sLastName.replace("null","");							    	
			$scope.mobile = Response.oReq.oApplicant.aPhone[0].sPhoneNumber;
			$scope.Amount = Response.oReq.oApplication.dLoanAmt;
			$scope.email = Response.oReq.oApplicant.aEmail;//[0].sEmailAddr

			if(Response.oReq.oApplicant.sDob && Response.oReq.oApplicant.sDob.trim()!=="")
			{
				$scope.dob = Response.oReq.oApplicant.sDob.slice(0,2)+"/"+Response.oReq.oApplicant.sDob.slice(2,4)+"/"+Response.oReq.oApplicant.sDob.slice(4);
			}else{
				$scope.dob ="";
			}
			$scope.gender = Response.oReq.oApplicant.sApplGndr;
			$scope.age = Response.oReq.oApplicant.iAge;			
			$scope.mStatus = Response.oReq.oApplicant.sMarStat;

			if(Response.oReq.oApplicant.aAddr){
				var address = Response.oReq.oApplicant.aAddr[0];	
				$scope.statelist= address.sState;
				$scope.address1 = address.sLine1;
				$scope.address2 = address.sLine2;
				$scope.pin = address.iPinCode;
				// $scope.time_address = $scope.timeataddress[$scope.getTime(address.iTimeAtAddr,  $scope.timeataddress)];
				$scope.location =address.sLine2;
			}

			if(Response.oReq.oApplication.aAssetDetail && Response.oReq.oApplication.aAssetDetail.length>0)
			{
				
				$scope.project = Response.oReq.oApplication.aAssetDetail[0].sAssetMake;	
				$scope.model= Response.oReq.oApplication.aAssetDetail[0].sModelNo;

				$scope.dealer =Response.oReq.oApplication.aAssetDetail[0].sDlrName;
				$scope.assetctg = Response.oReq.oApplication.aAssetDetail[0].sAssetCtg;
				$scope.assetData =Response.oReq.oApplication.aAssetDetail;
			}

			if(Response.oReq.oApplicant.aEmpl){
				$scope.time_employer = Response.oReq.oApplicant.aEmpl[0].iTmWithEmplr+" Months";
				$scope.employer = Response.oReq.oApplicant.aEmpl[0].sEmplName;
				$scope.gross_annual =  Response.oReq.oApplicant.aEmpl[0].dGrossSal;
				$scope.loanAmt =  Response.oReq.oApplicant.aEmpl[0].dmonthSal;
				$scope.education= Response.oReq.oApplicant.sEdu;
				$scope.employment_type = Response.oReq.oApplicant.aEmpl[0].sEmplType;

				var tempConstitutionType = Response.oReq.oApplicant.aEmpl[0].sConst;
				var enumText = $scope.getTextOfValueMatched(tempConstitutionType,$scope.aplcntType);
				if(enumText)
					$scope.constitution = enumText;
				else
					$scope.constitution = tempConstitutionType;


				$scope.lastsalary = Response.oReq.oApplicant.aEmpl[0].dmonthSal;
				$scope.ITamt =  Response.oReq.oApplicant.aEmpl[0].dItrAmt;
			}

			$scope.current_emi =  Response.oReq.oApplication.dEmi;
			$scope.cro2Data =Response.oPostIPA;
			
			if($scope.cro2Data!=null){
				$scope.apprvdAmt=$scope.cro2Data.dApvAmt;
				$scope.scheme=$scope.cro2Data.sScheme;
				$scope.totalAssetCost=$scope.cro2Data.dTotAssCost;
				$scope.marginMoney=$scope.cro2Data.dMarMoney;
				$scope.marginMoneyInst=$scope.cro2Data.sMarginMoneyInstru;
				$scope.marginMoneyConf=$scope.cro2Data.sMarMoneyConfirm;
				$scope.addvncEmi=$scope.cro2Data.dAdvEmi;
				$scope.processnFee=$scope.cro2Data.dProcFees;
				$scope.asstmodal=$scope.cro2Data.aAssMdl;
			}

			$scope.credit = Response.oReq.oApplicant.sCreditCardNum;
			$scope.tenor = Response.oReq.oApplication.iLoanTenor  + " Months";
		
			$scope.objectSet.sCurrentStageId = Response.sCurrentStageId;
			var fulladdress = Response.oReq.oApplicant.aAddr;
			for (var j in fulladdress)
			{
				if(fulladdress[j].sAddrType=="OFFICE"){
					$scope.officeaddr = fulladdress[j]; 
				}else if(fulladdress[j].sAddrType=="PERMANENT"){
					$scope.peraddr = fulladdress[j];
				}else if(fulladdress[j].sAddrType=="RESIDENCE"){
					$scope.resaddr= fulladdress[j];
				}
			} 
			var phoneArray=[];
			phoneArray = Response.oReq.oApplicant.aPhone;
			for(j in phoneArray){
				phoneArray[j].sPhoneType=$scope.getTextOfValueMatched(phoneArray[j].sPhoneType,  $scope.phoneData);
			}
			$scope.phn= phoneArray;

			$scope.error = "";
			$scope.done = "";
			$scope.appScore ='';
			$scope.tree ='';
			$scope.pdf ='';
			$('#descReason').val("");
			$("#approvemsg").text("");
			$scope.rejectArray=[];
			$scope.rejectFlag = false;
			$scope.losID ="";
			$scope.kyc_array=[];
			var appForm_array=[];
			var disburst_array=[];
			var agreement_array=[];			
			var evidence_array=[];
			var ach_array=[];
			var addkyc_array=[];
			var ach_array=[];
			var arrayDesc=[];
			var arrayDclnDesc=[];
			$(document.body).find('#OfferBox0').css("background-color","#F4F8F9");	
			$scope.appStatflag = '';
			$scope.appform = '';
			$scope.disburstment ='';
			$scope.agreemnt ='';
			$scope.achdata ='';
			$scope.addKyc ='';
			$scope.src_img = '';
			$scope.aadhar = '';
			$scope.dlicense = '';
			$scope.passport = '';
			var panStatus=[];
			var passport=[];
			var dlicen=[];
			var adhar=[];			
			$scope.uploadedImg1 ='';
			$scope.uploadedImg2 ='';
			$(document.body).find('#imgpreview1').attr('src', "");
			$(document.body).find('#imgpreview2').attr('src', "");
			$('#imgpreview1').hide();
			$('#imgpreview2').hide();
			$scope.losStatus1="";
			$('#losStatusId1').val("");
			$('#losId').val('');
			$('#utrData').val('');
			$(document.body).find('#utrData').prop('disabled', true);
			$('#losId , #utrData').css("border","1px solid #cfcfcf");

			$scope.apprAmount = '';
			$scope.DetailsResp=[];
			$scope.Emi ="";

			$scope.panpresent =false;
			$scope.adharpresent =  false; 
			$scope.passportPresents =false;
			$scope.dLPresent = false;
			$scope.income1Present = false;
			$scope.income2Present = false;
			$scope.applicantPhotoPresent = false;
			$scope.otherPresent = false;
			$scope.extraPresent=false;
			$scope.evidPresent=false;

			$scope.applicantID = Response.oReq.oApplicant.sApplID;
			$scope.kycid =Response.oReq.oApplicant.sApplID;
			$scope.applicationID = Response.sRefID;
			$scope.applicID = Response.	oHeader.sAppID;
			var data = 	$scope.notifarray;
			for (j in data)
			{
				if(data[j].sRefID == $scope.applicationID){
					$scope.applctnstatus = data[j].sStat;
				}
			}
			
			$scope.Picked = CustID;
			$scope.error="";
			$scope.showrefid = "true";
			$scope.currApplicant = $scope.kycid ;

			$scope.bureau = Response.aAppScoRslt;
			$scope.refID =Response.sRefID;

			if(Response.oReq.oCoApplicant!=null && Response.oReq.oCoApplicant.length>0)
			{
				$scope.coAppId =Response.oReq.oCoApplicant[0].sApplID;
			
			}
	
			
			//Fetch Images
			//alert("Call Images");
			var json ={'sRefID':CustID};
			RestService.saveToServer('application-images',json).then(function(Response){
					
				if(Response!=null)
				{
					var data = Response;
					for (j in data)
					{
							$scope.appkycimg = data[j].aImgMap;
							applicantImg(data[j].aImgMap);
					}
					$scope.array = $scope.appkycimg;
				}
			},function(error){
				$scope.error = "Sorry...Unable to fetch images from server !!";					
			});				
	
		  	if(typeof Response.aDeDupe !== "undefined" && Response.aDeDupe.length != 0){
			  	if(Response.aDeDupe !='' || Response.aDeDupe !=null){
				  	var dedupeArray = Response.aDeDupe;
					var arrayData=[];
					for (j in dedupeArray)
					{arrayData.push(dedupeArray[j].sRefID);}
					$scope.dedupeArray = arrayData;	
			  	}else{$scope.dedupeArray= false;}
		  	}else{$scope.dedupeArray= false;}
				$scope.appldAmount = Response.oReq.oApplication.dLoanAmt;
	
			$scope.supecious = Response.oReq.sSuspAct;
	
			$scope.croRemark = Response.aCroJustification;
		*/}
		  return Response;
	}).then(function(data){
            if(data){
            	var json ={'sRefID':data.sRefID};
				RestService.saveToServer('application-images',json).then(function(Response){
	                var objArray = _.flatten(_.map(_.pluck(Response, 'aImgMap'),function(data){
	                        return data;
	                }));

	                $scope.imageDataArray = [];
	                $scope.applicantPhoto = [];
                    _.each(objArray,function(val){
                        return RestService.saveToServer('get-image-by-id-base64', { 'sImgID' : val.sImgID}).then(function(data){
                            if(!_.isUndefined(data) || !_.isNull(data)){
                                if(!_.isEmpty(data.sByteCode)){
	                                val["sByteCode"] = "data:image/png;base64,"+data.sByteCode;
	                                if(val.sImgType === "APPLICANT-PHOTO"){
	                                	$scope.applicantPhoto.push(val);
	                                }else{
	                                	$scope.imageDataArray.push(val); 
	                                }
                                }  
                            }
                        });
                    });
                    console.log($scope.applicantPhoto);
                    console.log($scope.imageDataArray);
                });
            }
        },function(error){
		$scope.error = "Sorry...System is under maintenance !!";					
	});

	$scope.getTextOfValueMatched=function(pValue, pArray)
	{
		var textReturned;

		_.each(pArray,function(obj,index){
			if(pValue === obj.value)
			{
				textReturned = obj.name;
			}
		});
		return textReturned;
	}

	// $scope.getTime=function(value, array)
	// {
	// 	var index;
	// 	jQuery.each(array,function(val,text){
	// 		if(value === text.value)
	// 		{
	// 			index = val;
	// 		}else if(value === text)
	// 		{
	// 			index = val;
	// 		}
	// 	});
	// 	return index;
	// }

	function checkRejectedImg(array){
		for(var i=0;i<array.length;i++){
			if(array[i].sStat == "Reject"){
				if(array[i].sImgType !=null && array[i].sImgType!=''){
					$scope.rejectArray.push({Name: array[i].sImgType,Image:"",Reason:array[i].sReason,Id:array[i].sImgID});
				}
			}
		}
	}

	function applicantImg(data){
		var map =data;
		checkRejectedImg(map);
		for (var i in map)
		{
			if(map[i].sImgType == "PAN")
			{
				$scope.panid = map[i].sImgID;
			}
			else if(map[i].sImgType =="AADHAAR"){
				$scope.aadhaarid = map[i].sImgID;
			}
			else if(map[i].sImgType =="PASSPORT"){
				$scope.passportId = map[i].sImgID;
			}
			else if(map[i].sImgType =="DRIVING-LICENSE"){
				$scope.dlId = map[i].sImgID;
			}
			else if(map[i].sImgType =="INCOME-PROOF1"){
				$scope.income1 = map[i].sImgID;
			}
			else if(map[i].sImgType =="INCOME-PROOF2"){
				$scope.income2 = map[i].sImgID;
			}
			else if(map[i].sImgType =="APPLICANT-PHOTO"){
				$scope.custphoto = map[i].sImgID;
			}
			else if(map[i].sImgType =="OTHER"){
				$scope.other = map[i].sImgID;
			}
			else if(/^APPLICATION_FORM/.test(map[i].sImgType)){
				$scope.appformId = map[i].sImgID;
			}
			else if(/^DISBURSEMENT/.test(map[i].sImgType)){
				$scope.disburstmentId = map[i].sImgID;
			}
			else if(/^AGREEMENT/.test(map[i].sImgType)){
				$scope.agreemntId = map[i].sImgID;
			}
			else if(/^ACH/.test(map[i].sImgType)){
				$scope.achId = map[i].sImgID;
			}
			else if(/^ADDITIONAL_KYC/.test(map[i].sImgType)){ 
				$scope.addKycId = map[i].sImgID;
			}else if(map[i].sImgType.indexOf('_EVIDENCE') !== -1){
				$scope.evidenceId = map[i].sImgID;
			}else{
				$scope.extraId = map[i].sImgID;
			}
			kyc_img(map[i].sImgType , map[i].sImgID, map[i].sStat, map[i].sReason, map[i].sImgVal);
		}			
	}
	
	function kyc_img(kycName , imgId ,status , reason,value){
		var json ={'sImgID':imgId}
		RestService.saveToServer('get-image-by-id-base64',json).then(function(Response){
//				//console.log("Response: "+JSON.stringify(Response));
			var image = "data:image/png;base64,"+Response.sByteCode;
			var extra_array=[],adhar=[],panStatus=[];
			if(Response.sByteCode != undefined && Response.sByteCode != null && Response.sByteCode != "" ){
				//console.log("image :"+kycName+"id :"+imgId);
				var url =image;
				if(kycName =="PAN"){
					$scope.panpresent =  true;
					if($scope.src_img == ''){
						$scope.src_img =image;
						$scope.panimgID = imgId;
						panStatus.push({status: status, reason:reason});
					}
					$scope.kyc_array.push({kyc_name:"PAN",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
//						$rootScope.uploadImgFor = "PAN";
				}
				else if(kycName =="AADHAAR"){
					$scope.adharpresent =  true; 
					if($scope.aadhar == ''){
						$scope.aadhar =image;
						$scope.adhrimgID = imgId;
						adhar.push({status: status, reason:reason});
					}
					$scope.kyc_array.push({kyc_name:"AADHAAR",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
//						$rootScope.uploadImgFor = "AADHAAR";
				}
				else if(kycName =="DRIVING-LICENSE"){
					$scope.dLPresent = true;
					if($scope.dlicense == ''){
						$scope.dlicense =image;
						$scope.drvlimgID = imgId;
						dlicen.push({status: status, reason:reason});
					}
					$scope.kyc_array.push({kyc_name:"DRIVING-LICENSE",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
//						$rootScope.uploadImgFor = "DRIVING-LICENSE";
				}
				else if(kycName =="PASSPORT"){
					$scope.passportPresents =true;
					if($scope.passport == ''){
						$scope.passport =image;
						$scope.passimgID = imgId;
						passport.push({status: status, reason:reason});
					}
					$scope.kyc_array.push({kyc_name:"PASSPORT",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
//						$rootScope.uploadImgFor = "PASSPORT";
				}
				else if(kycName =="INCOME-PROOF1"){
					$scope.income1Present = true;
					$scope.income1 =image;
					$scope.income1Id = imgId;
					$scope.kyc_array.push({kyc_name:"INCOME-PROOF1",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(kycName =="INCOME-PROOF2"){
					$scope.income2Present = true;
					$scope.income2 =image;
					$scope.income2Id = imgId;
					$scope.kyc_array.push({kyc_name:"INCOME-PROOF2",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(kycName =="OTHER"){
					$scope.otherPresent = true;
					$scope.others =image;
					$scope.otherId = imgId;
					$scope.kyc_array.push({kyc_name:"OTHER",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(kycName =="APPLICANT-PHOTO"){
					$scope.applicantPhotoPresent = true;
					$scope.applicantPhotoImg =image;
					$scope.applicantPhotoImgID = imgId;
					//$scope.kyc_array.push({kyc_name:"APPLICANT-PHOTO",image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(/^APPLICATION_FORM/.test(kycName)){
					$scope.appformPresent = true;
					if($scope.appform == ''){
						$scope.appform =image;
						$scope.appformId = imgId;
						$scope.appFormName = kycName;
					}
					appForm_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(/^DISBURSEMENT/.test(kycName)){
					$scope.disbstPresent = true;
					if($scope.disburstment == ''){
						$scope.disburstment =image;
						$scope.disbId = imgId;
						$scope.disbursName = kycName;
					}
					disburst_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(/^AGREEMENT/.test(kycName)){
					$scope.agreemntPresent = true;
					if($scope.agreemnt == ''){
						$scope.agreemnt =image;
						$scope.agrmtId = imgId;
						$scope.agreemntName = kycName;
					}					
					agreement_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(/^ACH/.test(kycName)){
					$scope.achPresent = true;
					if($scope.achdata == ''){
						$scope.achdata =image;
						$scope.achId = imgId;
						$scope.achName = kycName;
					}			
					ach_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(/^ADDITIONAL_KYC/.test(kycName)){
					$scope.addKycPresent = true;
					if($scope.addKyc == ''){
						$scope.addKyc =image;
						$scope.addkycId = imgId;
						$scope.addKycName = kycName;
					}
					addkyc_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
				else if(kycName.indexOf('_EVIDENCE') !== -1){
					$scope.evidPresent = true;
					if($scope.evidence != undefined){
					}else{
						$scope.evidencename = kycName;
						$scope.evidence =image;
						$scope.evdnId = imgId;
					}
					evidence_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}else{
					$scope.extraPresent=true;
					if($scope.extra != undefined){
					}else{
						$scope.extraname = kycName;
						$scope.extra =image;
						$scope.extraId = imgId;
					}
					extra_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason,val:value});
				}
//					$(document.body).find('#document_preview').attr("src", url).show();	
			}
		},function(error){
			$scope.error = "Sorry...Unable to fetch images from server !!";					
		});
	}

	$scope.restartClicked=function(){
		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_CUSTOMER_FORM"),
		 		GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
		 		GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_RESTART"),
		 		$scope.refID,1);

//		if($scope.objectSet.sCurrentStageId=="DE"){
//			$state.go("/apply");
//		}else if($scope.objectSet.sCurrentStageId=="PD_DE"){
//			$state.go("/apply");
//		}else if($scope.objectSet.sCurrentStageId=="CR_Q"){
//			
//		}else if($scope.objectSet.sCurrentStageId=="DCLN"){
//			alert("Your Application for loan has been declined.");
//		}

		//alert($scope.objectSet.sCurrentStageId);
		if($scope.objectSet.sCurrentStageId && $scope.objectSet.sCurrentStageId.startsWith("LOS_")){
			$scope.loadPDF();
		}else if($scope.objectSet.sCurrentStageId==="APRV"){
			$rootScope.DashFlag = true;
			// sharedService.setCurrentStage($scope.objectSet.sCurrentStageId);
			// sharedService.setRefID($scope.refID);
			// $state.go("/cdl/apply");

			sharedService.setRefID($scope.refID);
			sharedService.setDealerCode($scope.objectSet.oHeader.sDealerId);
			sharedService.setApplicationData($scope.objectSet);
			$state.go("/cdl/post-ipa");
		}else if($scope.objectSet.sCurrentStageId==="PD_DE"){
			var status=sharedService.getDecisionStatus();
			status=status.toLowerCase();
			//alert("status : "+status);
			if(status=="approved"){
				$scope.loadPDF();
			}else if(status==="declined"){
				alert("This application has been declined.");
				sharedService.setRefID($scope.refID);
				$state.go("/cdl/dashboard");
			}
		}else if($scope.objectSet.sCurrentStageId==="DCLN"){
			sharedService.setRefID($scope.refID);
			sharedService.setDealerCode($scope.objectSet.oHeader.sDealerId);
			sharedService.setApplicationData($scope.objectSet);
			$state.go("/cdl/after-submit");
		}else if($scope.objectSet.sCurrentStageId==="CR_H"){
			sharedService.setRefID($scope.refID);
			sharedService.setDealerCode($scope.objectSet.oHeader.sDealerId);
			$state.go("/cdl/after-submit");
		}else if($scope.objectSet.sCurrentStageId==="CR_Q"){
			sharedService.setRefID($scope.refID);
			$state.go("/cdl/result");
		}else{
//			alert("Sending : "+$scope.objectSet.sCurrentStageId);
//			$rootScope.DashFlag=true;
			sharedService.setCurrentStage($scope.objectSet.sCurrentStageId);
			sharedService.setRefID($scope.refID);
			$state.go("/cdl/apply.personal");
		}
	}

	$scope.shwPDFModal = function (response,refID,canSubmit) {
		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_CUSTOMER_FORM"),
		 		GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
		 		GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_DO_PDF"),
		 		$scope.dashboardType,1);

	 	//alert('modal baseURL'+baseURL);
	 	var modalInstance = $uibModal.open({
	 		animation: $scope.animationsEnabled,
	 		templateUrl: 'views/modal-do-view.html',
	 		controller: 'PDFViewerModalCtrl',
	 		size: 'lg',
	 		resolve: {
	 			response:function(){
	 				return response;
	 			},
	 			refID:function(){
	 				return refID;
	 			},
	 			canSubmit:function(){
	 				return canSubmit;
	 			}
	 		}
	 	});
	};

	$scope.loadPDF=function(){
// 		$scope.keyarr = localStorage.getItem('LOGID');
		var userdata = JSON.parse(atob(localStorage.getItem('GUID')));
		//console.log("Localstage data : ");
		//console.log(userdata);
		$scope.username = userdata.name;
		$scope.useremail = userdata.email;
		$scope.image = userdata.userImage;
		$scope.instImage = userdata.instImage;
		$scope.InstitutionID = userdata.InstitutionID;
		$scope.userid = userdata.userid;

		var postIPARequest=
		{
			oHeader:
			{
				sCroId:"default",
				dtSubmit:new Date().getTime(),
				sReqType:null,
				sAppSource:"WEB",
				sDsaId:$scope.username,
				sAppID:"",
				sDealerId:null,
				sSourceID:null,
				sInstID:$scope.InstitutionID
			},
			opostIPA:null,
			sRefID:CustID,
			refID:CustID,
			dtDateTime:new Date().getTime()
		};
		//alert(JSON.stringify(request));
		//console.log("JSON IPA REQUEST : "+JSON.stringify(postIPARequest));

		RestService.saveToServer('get-post-ipa',JSON.stringify(postIPARequest)).then(function(Response){	 
			//console.log("JSON IPA RESPONSE : ");
			//console.log(JSON.stringify(Response));
			if(Response){
				/*
				 * {"dOtherChrg":0,"sScheme":"100109(4\/12)","dDelSubven":240,"aAssMdl":null,"sMarginMoneyI
						nstru":"Select Margin Money Instrument","dTotAssCost":5435345,"aAssMdls":
						[{"sAssetCtg":"AIR CONDITIONER","sPrice":"","sDlrName":"SATHYA AGENCIES-
						SLM","sModelNo":"FTKM71QRV16\/RKM71QRV16 2.2
						INVERTER","sAssetMake":"DAIKIN"}],"dProcFees":499,"dApvAmt":12000,"sMarMoneyConfir
						m":"","dMarMoney":5423345,"dAdvEmi":4000,"dManfSubDel":0}
				 *
				 * */		
				postIPARequest.opostIPA=Response;

				//console.log(" IPA PDF REQUEST : "+JSON.stringify(postIPARequest));

				RestService.saveToServer('get-pdf-ref',JSON.stringify(postIPARequest)).then(function(Response){
					//console.log("JSON IPA PDF RESPONSE : ");
					//console.log(JSON.stringify(Response));
					if(Response){
						$scope.shwPDFModal(Response,CustID,true);
					}else{
						notifier.logWarning("We are unable to load DO for this application") ;
					}
				});
			}else{
				notifier.logWarning("We are unable to load DO for this application") ;
			}
		});
	};

	$scope.gotoDashboard=function(){
		$state.go("/cdl/dashboard");
	};

	$scope.showPreviewModal=function(obj,isImgFlag,index,editMode){
	/*	if(img.startsWith("data")){
			if(img.startsWith("data:image/")){
				$(document.body).find('#cirhtml').attr("data", "").hide();
				$(document.body).find('#document_preview').attr("src", img).show();
			}else if(img.startsWith("data:application/pdf")){
				$(document.body).find('#document_preview').hide();
				$(document.body).find('#img_panel').remove();
				$('#img_preview').prepend(' <object id="cirhtml" type="text/html" width="100%" height="620px" style="border:none;"></object>');
				$('#approve_rejectPanel').hide();
				$(document.body).find('#cirhtml').attr("data", img).show();
			}
		}else{
			if (img.toUpperCase()=="PDF") 
			{
				$('#document_preview').hide();
				$(document.body).find('#cirhtml').attr("data", img).show();
			}else if (img.toUpperCase()=="JPG"||img.toUpperCase()=="JPEG"||img.toUpperCase()=="PNG"){
				$(document.body).find('#cirhtml').attr("data", "").hide();
				$(document.body).find('#document_preview').attr("src", img).show();
			}
		}*/
		 var modalInstance = $uibModal.open({
          	templateUrl: 'views/templates/modal.html',
	      	controller: 'kycDocuments',
	      	size: 'lg',
	      	resolve:{
                ImageFeed : function (){
               		var imageData;
                    return imageData = {
                        isImage : isImgFlag,
                        docData : obj,
                        index : index,
                        editMode : editMode
                	}
            	} 
    		}
        });
	}
}]);

app.config(['$compileProvider',
	function( $compileProvider )
	{   
	//        	  alert("Hei");
	      //$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|data|mailto|chrome-extension):/);
	      // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image|data:application\//);
	}
]);
}).call(this);