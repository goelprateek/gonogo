;(function(){

	'use strict';

	var app=angular.module("gonogo");

app.controller('PDFViewerModalCtrl', [
	'RestService','$scope', '$uibModalInstance', 'response','refID','$location','UserService',
	function (RestService,$scope, $uibModalInstance, response,refID,$location,UserService) {
	
	var user=UserService.getCurrentUser();
	$scope.response = response;
	$scope.refID = refID;

	$scope.submit = function (imgID,refID) {

		var mailRequest={
			oHeader:
			{
				sCroId:"default",
				dtSubmit:new Date().getTime(),
				sReqType:null,
				sAppSource:"WEB",
				sDsaId:user.username,
				sAppID:"",
				sDealerId:null,
				sSourceID:null,
				sInstID:user.institutionID
			},
			sRefID:refID,
			sImgID:imgID
		};

		RestService.postDataWithHeaders('send-mail-pdf',JSON.stringify(mailRequest),user.username,user.ePassword).then(function(Response){

			if(Response){}
		});	

		$uibModalInstance.close();

		alert("DO has been sent to dealer.");
		$location.path("/cdl/dashboard");
	 };

	 $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		$location.path("/cdl/dashboard");
	 };
}]);

app.controller("CustomerFormCntrolr",
	['$scope','$rootScope','sharedService',"RestService","APP_CONST","$location","$uibModal","GNG_GA",
	function($scope,$rootScope,sharedService, RestService, APP_CONST, $location,$uibModal,GNG_GA){

	var CustID=sharedService.getRefID();
	sharedService.setRefID(null);

	$scope.refID = CustID;

	//TODO
	var json ={'sRefID':CustID};

	if(CustID==null || CustID==""){
		$location.path("/cdl/dashboard");
	}
	
	var docData = [{'Name':'Address Proof',
		'ID':'0',
		'Icon':'img/address proof.png',
		'Count':'1',
		'Type' : 'Approve',
		'Offers':[{'Name':'Valid Passport','Icon':'img/address proof.png','Code':'101'},
			        {'Name':'Latest Electricity Bill','Icon':'img/address proof.png','Code':'102'},
			        {'Name':'Telephone Bill','Icon':'img/address proof.png','Code':'103'},
			        {'Name':'Driving License','Icon':'img/address proof.png','Code':'104'},
			        {'Name':'Ration Card','Icon':'img/address proof.png','Code':'105'},
			        {'Name':'Bank Account Statement/Pass Book 1st page','Icon':'img/address proof.png','Code':'106'},
			        {'Name':'Rent Agreement','Icon':'img/address proof.png','Code':'107'},
			        {'Name':'Gas Connection Bill or Post Paid Mobile Bill with full address ','Icon':'img/address proof.png','Code':'108'},
			        {'Name':'Property Tax receipt or Water Bill','Icon':'img/address proof.png','Code':'109'},
			        {'Name':'Voter’s Identity card','Icon':'img/address proof.png','Code':'110'},
			        {'Name':'Aadhar UID Card','Icon':'img/address proof.png','Code':'111'}]
	},
	{'Name':'DOB Proof',
		'ID':'1',
		'Icon':'img/date of birth proof.png',
		'Count':'2',
		'Type' : 'Approve',
		'Offers':[{'Name':'Valid Passport','Icon':'img/date of birth proof.png','Code':'101'},
			        {'Name':'PAN Card','Icon':'img/date of birth proof.png','Code':'112'},
			        {'Name':'Driving License','Icon':'img/date of birth proof.png','Code':'104'},
			        {'Name':'Birth Certificate (Govt agency)','Icon':'img/date of birth proof.png','Code':'113'},
			        {'Name':'School Leaving certificate (10th/12th)','Icon':'img/date of birth proof.png','Code':'114'},
			        {'Name':'Voter ID Card','Icon':'img/date of birth proof.png','Code':'110'},
			        {'Name':'Pension Certificate / Govt. ID Card / Aadhar UID Card','Icon':'img/date of birth proof.png','Code':'111'}]
	},
	{'Name':'Identification Proof',
		'ID':'2',
		'Icon':'img/identification number.png',
		'Count':'3',
		'Type' : 'Approve',
		'Offers':[{'Name':'Valid Passport','Icon':'img/identification number.png','Code':'101'},
			        {'Name':'PAN Card','Icon':'img/identification number.png','Code':'112'},
			        {'Name':'Driving License','Icon':'img/identification number.png','Code':'104'},
			        {'Name':'Voter’s Identity Card','Icon':'img/identification number.png','Code':'110'},
			        {'Name':'Aadhar UID card','Icon':'img/identification number.png','Code':'111'},
			        {'Name':'Bank Passbook with photo','Icon':'img/identification number.png','Code':'115'}]
	},
	{'Name':'Signature Proof',
		'ID':'3',
		'Icon':'img/signature proof.png',
		'Count':'4',
		'Offers':[{'Name':'Signature verification from bank','Icon':'img/signature proof.png','Code':'116'},
			        {'Name':'Passport Copy','Icon':'img/signature proof.png','Code':'101'},
			        {'Name':'PAN Card','Icon':'img/signature proof.png','Code':'112'},
			        {'Name':'Driving license with photograph and signature','Icon':'img/signature proof.png','Code':'104'},
			        {'Name':'Clearance of processing fees cheque','Icon':'img/signature proof.png','Code':'117'}]
	},
	{'Name':'Rejected Proof',
		'ID':'4',
		'Icon':'img/rejected proof.png',
		'Count':'5',
		'Offers':[]
	}
	];

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

	$scope.addr_type = $scope.addrType[0].value;

	RestService.saveToServer('dashboard-application-data',json).then(function(Response){
		if(Response){
			$scope.applicationData=Response;

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
			$scope.tenor = Response.oReq.oApplication.iLoanTenor;
		
			$scope.currStage = Response.sCurrentStageId;
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
			docData[4].Offers=[];
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
			
	//			$scope.coapplicant = Response.oAppReq.oCoApplicant[0].oApplName;
			}
	//		}catch(e){
	//			$scope.coAppId ='';
	//			$scope.coapplicant = '';
	//		}
	//		try{
			
			//Fetch Images
			//alert("Call Images");
			var json ={'sRefID':CustID};
			RestService.saveToServer('application-images',json).then(function(Response){
					//console.log("Images loaded:");
					//console.log(JSON.stringify(Response));
				if(Response!=null)
				{
					var data = Response;
					for (j in data)
					{
						//alert("Got Images");
		//					if(data[j].sApplID == $scope.applicantID){
							$scope.appkycimg = data[j].aImgMap;
							applicantImg(data[j].aImgMap);
						/*}
						else{
							$scope.coappImgs = data[j].aImgMap;
						}*/
					}
					$scope.array = $scope.appkycimg;
				}
			},function(error){
				$scope.error = "Sorry...Unable to fetch images from server !!";					
			});				
	//		}
	//		catch(error){
	//			$scope.array = '';
	//		}
	//		try{
				/*var pdfStatus =Response.oCompRes.multiBureauJsonRespose.FINISHED[0].STATUS ;
				if(pdfStatus =="SUCCESS"){*/
	//			console.log("Response.oCompRes.multiBureauJsonRespose:");
	//			console.log(Response.oCompRes.multiBureauJsonRespose);
	//			if(Response.oCompRes.multiBureauJsonRespose!=null && Response.oCompRes.multiBureauJsonRespose.FINISHED!=null && Response.oCompRes.multiBureauJsonRespose.FINISHED.length>0){
	//				$scope.pdf ="data:application/pdf;base64,"+Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];
	//				$scope.score =Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["JSON-RESPONSE-OBJECT"].scoreList[0].score;
	//				  $scope.sanctionedAmt =Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["BUREAU-RRP-OBJECT"].rrpTotalOutstanding ;
	//				  $scope.noEnquiry = Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["BUREAU-RRP-OBJECT"].rrpTotInqs;
	//			}
				/*}else{console.log("no pdf");}*/
	//		}
	//		catch(error){
	//			$scope.pdf ='';
	//		}
	//		try{
	//			if(Response.oCompRes.scoringServiceResponse["SCORE-DATA"]!=null){
	//				
	//				var data =Response.oCompRes.scoringServiceResponse["SCORE-DATA"].STATUS;
	//				if(data == "ERROR"){
	//					$scope.appScore ="Not Available";
	//				}
	//				else if(data == null){
	//					$scope.appScore ="No Score has been calculated";
	//				}			 
	//				else{
	//					$scope.appScore =Response.oCompRes.scoringServiceResponse.SCORE_TREE.AppScore;
	//					$scope.tree = Response.oCompRes.scoringServiceResponse.SCORE_TREE;//
	//				}
	//			}
	//		}
	//		catch(error){
	//			 $scope.appScore ='';
	//			 $scope.tree ='';
	//		}
	//		try{
	//			  $scope.DetailsResp=Response.oCompRes.scoringServiceResponse["DECISION_RESPONSE"].Details;
				 
	//		}catch(error){
	//			  $scope.DetailsResp="";
	//		}
	//		try{
	//			 $scope.Emi = Response.aCroDec[0].dEmi;	
	//		}catch(error){
	//			  $scope.Emi ="";
	//		}
	//		try{
	//			$scope.Eremark=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].REMARK;
	//		}catch(error){
	//			$scope.Eremark="";
	//		}
	//	  try{
	//			if(Response.oElgGrdOut!=null){
	//				$scope.eligibility = Response.oElgGrdOut.dElgAmt;
	//				$scope.decision = Response.oElgGrdOut.sDec;
	//			}
	
	//	  }catch(error){
	//		  $scope.eligibility = "";
	//		  $scope.decision = "";
	//		  $scope.score = "";
	////			  $scope.sanctionedAmt = "";
	////			  $scope.noEnquiry = "";
	//	  }
	//	  try{
		  	if(typeof Response.aDeDupe !== "undefined" && Response.aDeDupe.length != 0){
			  	if(Response.aDeDupe !='' || Response.aDeDupe !=null){
				  	var dedupeArray = Response.aDeDupe;
					var arrayData=[];
					for (j in dedupeArray)
					{arrayData.push(dedupeArray[j].sRefID);}
					$scope.dedupeArray = arrayData;	
			  	}else{$scope.dedupeArray= false;}
		  	}else{$scope.dedupeArray= false;}
	//		  }
	//		catch(e) {
	//			$scope.dedupeArray = "";
	//		}
	//		try{
			$scope.appldAmount = Response.oReq.oApplication.dLoanAmt;
	//		}catch(e){
	//			$scope.appldAmount = '';
	//		}
	//		try{
	//			  $scope.croDec=Response.aCroDec[0];
	//		}catch(error){
	//			$scope.croDec="";
	//		}
	//		try{
	//			$scope.offAddrStab= Response.oIntrmStat.oOffAddressResult.iAddrStblty;
	//			$scope.resAddrStab= Response.oIntrmStat.oResAddressResult.iAddrStblty;
	//		}catch(e){
	//			$scope.offAddrStab="";
	//			$scope.resAddrStab="";
	//		}
	//		try{
	//			if(Response.oLosDtls!=null){
	//				console.log("los ID : "+Response.oLosDtls.sLosID);
	//				if(!Response.oLosDtls.sLosID)
	//				{
	//					$timeout(function(){
	//						$scope.losID="";
	//						$(document.body).find('#losId').prop('disabled', false);
	//					});
	//				}else{	
	//					$timeout(function(){
	//						$scope.losID= Response.oLosDtls.sLosID;
	//						$('#losId').val(Response.oLosDtls.sLosID);
	//						$(document.body).find('#losId').prop('disabled', true);
	//					});
	//				}
	//
	//				if(!Response.oLosDtls.sStat)
	//				{
	//					$timeout(function(){
	//						$('#losStatusId1').val("");
	//						$scope.losStatus1 ="";
	//					});
	//				}else{	
	//					$timeout(function(){
	//						$('#losStatusId1').val(Response.oLosDtls.sStat);
	//						$scope.losStatus1 = Response.oLosDtls.sStat;
	//						if(Response.oLosDtls.sStat == "LOS_DISB"){
	//							$(document.body).find('#utrData').prop('disabled', false);
	//						}else{
	//							$(document.body).find('#utrData').prop('disabled', true);
	//							$(document.body).find('#utrData').val("");
	//							$(document.body).find('#utrData').css("border","1px solid #cfcfcf");
	//						}
	//					});
	//				}
	////				try{
	//					if(!Response.oLosDtls.sUtr)
	//					{
	//						$timeout(function(){
	//							$scope.utrValue = "";
	//						});
	//					}else{	
	//						$timeout(function(){
	//						$scope.utrValue = Response.oLosDtls.sUtr;
	//						$(document.body).find('#utrData').val(Response.oLosDtls.sUtr);
	//						$(document.body).find('#utrData').prop('disabled', true);
	//						});
	//					}
	//					$scope.utrValue = Response.oLosDtls.sUtr;
	////				}catch(e){
	////					$scope.utrValue = "";
	////				}
	//			}
	//		}catch(e){
	//			 $scope.losID="";
	//			 $(document.body).find('#losId').prop('disabled', false);
	//			 $('#losStatusId1').val("");
	//			 $scope.losStatus1 ="";
	//		}
	//		try{
			$scope.supecious = Response.oReq.sSuspAct;
	//		}catch(e){
	//			$scope.supecious ="";
	//		}
	//		try{
			$scope.croRemark = Response.aCroJustification;
	//		}catch(e){
	//			$scope.croRemark = "";
	//		}
	//		
	//		if(!croQueue)// for CRO2
	//		{	$scope.newApplication(CustID);}
			
			
	//		$scope.time_employer = $scope.timeataddress[$scope.getTime(Response.oReq.oApplicant.aEmpl[0].iTmWithEmplr, $scope.timeataddress)];							    	
	
	//		$scope.lmth =  Validation.NoWithComma(Response.oAppReq.CUSTOMER.lastMonthIncome);
	//		$scope.llmth =  Validation.NoWithComma(Response.oAppReq.CUSTOMER.lastLastMonthIncome);
	//		$('#Job').show();
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
			var extra_array=[];
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

//		if($scope.currStage=="DE"){
//			$location.path("/apply");
//		}else if($scope.currStage=="PD_DE"){
//			$location.path("/apply");
//		}else if($scope.currStage=="CR_Q"){
//			
//		}else if($scope.currStage=="DCLN"){
//			alert("Your Application for loan has been declined.");
//		}

		//alert($scope.currStage);
		if($scope.currStage && $scope.currStage.startsWith("LOS_")){
			$scope.loadPDF();
		}else if($scope.currStage=="APRV"){
			$rootScope.DashFlag = true;
			// sharedService.setCurrentStage($scope.currStage);
			// sharedService.setRefID($scope.refID);
			// $location.path("/cdl/apply");

			sharedService.setRefID($scope.refID);
			sharedService.setDealerCode($scope.dealerID);
			sharedService.setApplicationData($scope.applicationData);
			$location.path("/cdl/post-ipa");
		}else if($scope.currStage=="PD_DE"){
			var status=sharedService.getDecisionStatus();
			status=status.toLowerCase();
			//alert("status : "+status);
			if(status=="approved"){
				$scope.loadPDF();
			}else if(status=="declined"){
				alert("This application has been declined.");
				sharedService.setRefID($scope.refID);
				$location.path("/cdl/dashboard");
			}
		}else if($scope.currStage=="CR_H"){
			sharedService.setRefID($scope.refID);
			sharedService.setDealerCode($scope.dealerID);
			$location.path("/cdl/after-submit");
		}else{
//			alert("Sending : "+$scope.currStage);
//			$rootScope.DashFlag=true;
			sharedService.setCurrentStage($scope.currStage);
			sharedService.setRefID($scope.refID);
			$location.path("/cdl/apply");
		}
	}

	$scope.shwPDFModal = function (size,response,refID) {
		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_CUSTOMER_FORM"),
		 		GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
		 		GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_DO_PDF"),
		 		$scope.dashboardType,1);

		 //alert('modal baseURL'+baseURL);
		 var modalInstance = $uibModal.open({
	 		animation: $scope.animationsEnabled,
	 		templateUrl: 'views/cdl/modal-post-ipa-pdf.html',
	 		controller: 'PDFViewerModalCtrl',
	 		size: size,
	 		resolve: {
	 			response:function(){
	 				return response;
	 			},
	 			refID:function(){
	 				return refID;
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
						$scope.shwPDFModal('lg',Response,CustID);
					}
				});
			}
		});
	};

	$scope.gotoDashboard=function(){
		$location.path("/cdl/dashboard");
	};
	
	$scope.showPreviewModal=function(img){
		if(img.startsWith("data")){
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
		}
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

}).call(this)