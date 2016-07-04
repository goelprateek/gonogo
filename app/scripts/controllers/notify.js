;(function(){

	'use strict';

	var app = angular.module('gonogo');

	app.factory("NotificationObject",function(){
	var _obj = {
    "applicationLog": {},
    "sRefID": "",
    "bStatFlag": "",
    "iNoReTry": "",
    "oAppReq": {
        "sInstId": "",
        "sUserId": "",
        "sPassword": "",
        "sRefID": "",
        "oHeader": {
            "sAppID": "",
            "sInstID": "",
            "sSourceID": "",
            "sAppSource": "",
            "sReqType": "",
            "dtSubmit": "",
            "sDsaId": "",
            "sCroId": "",
            "sDealerId": ""
        },
        "oReq": {
            "oApplicant": {
                "residenceAddSameAsAbove": "",
                "sApplID": "",
                "oApplName": {
                    "sFirstName": "",
                    "sMiddleName": "",
                    "sLastName": "",
                    "sPrefix": "",
                    "sSuffix": ""
                },
                "oFatherName": "",
                "oSpouseName": "",
                "sReligion": "",
                "sApplGndr": "",
                "sDob": "",
                "iAge": "",
                "sMarStat": "",
                "aKycDocs": [
                    {
                        "sKycName": "",
                        "sKycNumber": "",
                        "sKycStat": "",
                        "sIssueDate": "",
                        "sExpiryDate": ""
                    }
                ],
                "bSameAbove": "",
                "aAddr": [
                    {
                        "sLine1": "",
                        "sLine2": "",
                        "sCity": "",
                        "iPinCode": "",
                        "sState": "",
                        "sCountry": "",
                        "sLandLoard": "",
                        "sLine3": "",
                        "sLine4": "",
                        "sVillage": "",
                        "sDistrict": "",
                        "fDistFrom": "",
                        "sLandMark": "",
                        "sAccm": "",
                        "iTimeAtAddr": "",
                        "sAddrType": "",
                        "sResAddrType": "",
                        "iMonthAtCity": "",
                        "iMonthAtAddr": "",
                        "dRentAmt": "",
                        "iYearAtCity": ""
                    }
                ],
                "aPhone": [
                    {
                        "sPhoneType": "",
                        "sAreaCode": "",
                        "sCountryCode": "",
                        "sPhoneNumber": "",
                        "sExt": ""
                    }
                ],
                "aEmail": [
                    {
                        "sEmailType": "",
                        "sEmailAddr": ""
                    }
                ],
                "aEmpl": [
                    {
                        "sEmplType": "",
                        "sEmplName": "",
                        "iTmWithEmplr": "",
                        "sDtJoin": "",
                        "sDtLeave": "",
                        "dmonthSal": "",
                        "dGrossSal": "",
                        "aLastMonthIncome": [],
                        "sConst": "",
                        "sItrID": "",
                        "dItrAmt": "",
                        "sDesig": "",
                        "sEmplrCode": "",
                        "sEmplrBr": "",
                        "sModePayment": "",
                        "sDeptmt": "",
                        "sWorkExps": "",
                        "sBusinesName": "",
                        "dtComencemnt": ""
                    }
                ],
                "iNoOfDep": "",
                "iEarnMem": "",
                "iFamilyMem": "",
                "oApplRef": "",
                "sEdu": "",
                "sCreditCardNum": "",
                "bMobVer": "",
                "sAdharVer": "",
                "aBankingDetails": "",
                "aLoanDetails": "",
                "oIncomeDetails": "",
                "oSurrogate": ""
            },
            "aCoApplicant": "",
            "oApplication": {
                "sAppID": "",
                "sLoanType": "",
                "sAppliedFor": "",
                "dLoanAmt": "",
                "iLoanTenor": "",
                "oProperty": "",
                "sLnPurp": null,
                "dLnApr": "",
                "dEmi": "",
                "iAdvEmi": "",
                "dMarginAmt": "",
                "aAssetDetail": [
                    {
                        "sAssetCtg": "",
                        "sDlrName": "",
                        "sAssetMake": "",
                        "sModelNo": "",
                        "sPrice": ""
                    }
                ],
                "aOwndAst": ""
            },
            "sSuspAct": ""
        },
        "sRespFormat": "",
        "sCurrentStageId": ""
    },
    "oCompRes": {
        "multiBureauJsonRespose": {},
        "scoringServiceResponse": {
            "ELIGIBILITY_RESPONSE": {
                "ElgbltyID":"",
                "GridID": "",
                "FOIR_AMOUNT": "",
                "APPROVED_AMOUNT": "",
                "Error": "",
                "DECISION": "",
                "COMPUTE_DISP": "",
                "COMPUTE_LOGIC": "",
                "MAX_AMOUNT": "",
                "MIN_AMOUNT": "",
                "DP": "",
                "MAX_TENOR": "",
                "REMARK": "",
                "COMPUTED_AMOUNT": "",
                "ELIGIBILITY_AMOUNT": "",
                "CNT": "",
                "RULE-SEQ": "",
                "GRID_EXP": ""
            },
            "DECISION_RESPONSE": {
                "RuleID": "",
                "Decision": "",
                "Details": [
                    {
                        "CriteriaID": "",
                        "RuleName": "",
                        "Outcome": " ",
                        "Remark": "",
                        "Exp": "",
                        "Value": "",
                        "Values": {
                            "SCORE_VALUE": "",
                            "NEG_PINCODE_CHECK": ""
                        }
                    }
                ]
            }
        }
    },
    "oIntrmStat": {
        "sRefId": "",
        "sAppID": "",
        "sInstID": "",
        "dtStart": "",
        "dtETime": "",
        "sAppStart": "",
        "sDedupe": "",
        "sEmailStat": "",
        "sOtpStat": "",
        "sAppStat": "",
        "sPanStat": "",
        "sAadharStat": "",
        "sMbStat": "",
        "sVarScoreStat": "",
        "sScoreStat": "",
        "sCblScore": "",
        "sCroStat": "",
        "oPanResult": {
            "sCustID": "",
            "sFldName": "",
            "iOrder": "",
            "sFldVal": "",
            "sMsg": "",
            "iAddrStblty": "",
            "fNameScore": ""
        },
        "oCibilResult": {
            "sCustID": "",
            "sFldName": "",
            "iOrder": "",
            "sFldVal": "",
            "sMsg": "",
            "iAddrStblty": "",
            "fNameScore": ""
        },
        "oResAddressResult": {
            "sCustID": "",
            "sFldName": "",
            "iOrder": "",
            "sFldVal": "",
            "sMsg": "",
            "iAddrStblty": "",
            "fNameScore": ""
        },
        "oOffAddressResult": {
            "sCustID": "",
            "sFldName": "",
            "iOrder": "",
            "sFldVal": "",
            "sMsg": "",
            "iAddrStblty": "",
            "fNameScore": ""
        },
        "oScoringResult": {
            "sCustID": "",
            "sFldName": "",
            "iOrder": "",
            "sFldVal": "",
            "sMsg": "",
            "iAddrStblty": "",
            "fNameScore": ""
        },
        "oAadharResult": "",
        "oExperianResult": "",
        "oEquifaxResult": "",
        "oCHMResult": "",
        "oMbResult": ""
    },
    "aCroDec": [
        {
            "dAmtAppr": "",
            "dItrRt": "",
            "dDpay": "",
            "dEmi": "",
            "iTenor": "",
            "dEligibleAmt": ""
        }
    ],
    "bNegPinCodeFlag": "",
    "aAppScoRslt": [
        {
            "sCustID": "",
            "sFldName": "",
            "iOrder": "",
            "sFldVal": "",
            "sMsg": "",
            "iAddrStblty": "",
            "fNameScore": ""
        }
    ],
    "aDeDupe": [],
    "aAppImgDtl": [
        {
            "sApplID": "",
            "aImgMap": [
                {
                    "sImgID": "",
                    "sImgType": "",
                    "sStat": "",
                    "sReason": ""
                }
            ],
            "sImageBlock": ""
        }
    ]
}
		return {
			dummy : _obj
		};
	});

	app.controller('NotifController', ['$scope','$rootScope', 
								'$timeout','Validation','$filter',
								'RestService','NotificationObject','UserService','AclService','$uibModal','SelectArrays',function($scope, $rootScope, $timeout,Validation,$filter,RestService,NotificationObject,UserService,AclService,$uibModal,SelectArrays){
	var user=UserService.getCurrentUser();
    $scope.can=AclService.can;

    $scope.selectResidence = SelectArrays.getResidenceTypes();

    $scope.isDisabled=true;

    if(_.isUndefined(user.id) ){
        $location.path(APP_CONST.getConst('APP_CONTEXT'));
    }

	var object  = NotificationObject.dummy;
	$scope.objectSet =  object;

	$scope.container = true;
	$scope.toggleDocPanel = false;
	$scope.toggleApprvPanel = false;
	$scope.toggleDclnPanel = false;
	$scope.invalidMsg = false;
	var height=$(window).height()-200;

	/*$scope.objectSet.aAppScoRslt = [];
	$scope.objectSet.oApplicant =[];
	$scope.objectSet.oAppReq.oReq.oApplication.aAssetDetail =[];*/

	var nextImg=[];
	var prevImg=[];
	$scope.currImg= 0;
	var kyc_array=[];
	$scope.appStatflag = '';
	var appForm_array=[];
	var disburst_array=[];
	var agreement_array=[];
	var ach_array=[];
	var addkyc_array=[];
	var arrayDesc=[];
	var arrayDclnDesc=[],extra_array=[], evidence_array=[],arrayApprvDesc=[];
	var temp=[], passport=[],dlicen=[],adhar=[];
	var rejectArray=[],income1_array=[], income2_array=[],custImg_array=[],other_array=[];
	var tempReject=[];
	$scope.setFlag = false;
	$scope.countSelected="Select";
/*	$scope.objectSet.oLosDtls.sStat=""; */
	$('#losStatusId1').val("");
	$('#losId').val('');
	$('#losId').css("border","1px solid #cfcfcf");
	var offersAllowed = $scope.authenticate('NOFRS');
	var crodefault = $scope.authenticate('NAPPDATADEF'); 
	var croQueue = $scope.authenticate('NCROQUE'); 
	var treeData = [], map;
	$rootScope.template ="notification";
	$scope.minVal = 0;
	$scope.limit = 10;
	var current1 = 0;
	var queArray = [];
	
	$scope.loadData = function(){
		 $scope.minVal = $scope.minVal+$scope.limit;
		 polling($scope.minVal);
	 }
	
	polling($scope.minVal);
	
	function polling(minimum) {
		if($rootScope.template == "notification")
  		{
			if(!crodefault)
			{
				if($scope.userid=="599"){
					var json ={'sCroID':"STP_PL", 
							'sInstID':user.institutionID, 
							'sGrpID':"0", 'iSkip': minimum, 'iLimit' : $scope.limit }
				}else{
					var json ={'sCroID':"STA", 
							'sInstID':user.institutionID,
							'sGrpID':"0" , 'iSkip': minimum, 'iLimit' : $scope.limit}
				}
			}else if($scope.userid=="586"){
				var json ={'sCroID':"PL_QUEUE", 
						'sInstID':user.institutionID, 
						'sGrpID':"0" , 'iSkip': minimum, 'iLimit' :$scope.limit }
			}
			else{var json ={'sCroID':"default", 
						'sInstID':user.institutionID, 
						'sGrpID':"0" , 'iSkip': minimum, 'iLimit' :$scope.limit }//,'sCriteria' :"SIKKIM" 
				}
			var URL;
			if(croQueue){
				URL = 'cro-queue';
				//URL = 'cro-queue-criteria';
			}else{
				URL = 'cro2-queue';
			}
			RestService.saveToServer(URL,json).then(function(Response){
				if(Response !=null || Response!= undefined || Response!=""){
					for(var i in Response){
						queArray.push(Response[i]);	
					}
					$scope.notifarray = queArray;
					$scope.error ="";
				}

			});	
  		}
	}

	$scope.timeataddress = [ { value: 'select', name: 'Select Time @ address'},
	                         { value: '5', name: 'Less than 6 months'},
	                         { value: '11', name: '6 to 12 months'},
	                         { value: '15', name: '1 to 3 years'},
	                         { value: '37', name: 'More than 3 years'}					          
	                         ];
	$scope.time_address =  $scope.timeataddress[0];

	$scope.jobType = [{value:'selected', name:'Please Select Employment'},
	                  {value:'Professional', name:'Professional'},
	                  {value:'Business', name:'Bussiness'},
	                  {value:'Job', name:'Job'}
	                  ];
	$scope.addrType = [{value:'selected', name:'Please Select Addr Type'},
	                  {value:'Residence', name:'Residence'},
	                  {value:'Office', name:'Office'},
	                  {value:'Permanent', name:'Permanent'}
	                  ]; 
   $scope.phoneData = [{value:'OFFICE_PHONE', name:'Office Phone'},
                      {value:'RESIDENCE_PHONE',name:'Residence Phone'},
                      {value:'PERSONAL_PHONE',name:'Personal Phone'},
   	                  {value:'PERSONAL_MOBILE', name:'Personal Mobile'},
   	                  {value:'RESIDENCE_MOBILE', name:'Residence Mobile'},
   	                  {value:'OFFICE_MOBILE', name:'Office Mobile'}
   	                  ];
	$scope.addr_type = $scope.addrType[1];   //to set default address

	/*$scope.objectSet.oAppReq.oReq.oApplicant.aEmpl[0].sEmplType = $scope.jobType[0];
	$scope.addr_type = $scope.addrType[1];
	$scope.objectSet.oAppReq.oReq.oApplicant.aEmpl[0].iTmWithEmplr =  $scope.timeataddress[0];*/
	// end variable default value section
	var dataset = [{'Name':'Auto Loan',
		'ID':'0',
		'Icon':'images/icons-auto.png',
		'Count':'2',
		'Type' : 'Approve',
		'Offers':[{'Name':'Refinance your Auto Loan at 12% APR','Icon':'images/icons-auto.png'},
		          {'Name':'Get up-to 60% discounts on Auto Insurance ','Icon':'images/icons-auto.png'}]
	},
	{'Name':'Personal Loan',
		'ID':'1',
		'Icon':'images/icon-personal-loan.png',
		'Count':'1',
		'Type' : 'Approve',
		'Offers':[{'Name':'Avail 10% of your sanctioned Home Loan amount at zero processing charges','Icon':'images/icon-personal-loan.png'}]
	},
	{'Name':'Credit Card',
		'ID':'2',
		'Icon':'images/Credit_Card.png',
		'Count':'4',
		'Type' : 'Approve',
		'Offers':[{'Name':'5000 INR cash-back if you pay the Home Loan processing fee using your new credit card','Icon':'images/Credit_Card.png'},
		          {'Name':'0% on New purchases for the first three months ','Icon':'images/Credit_Card.png'},
		          {'Name':'Credit Card with no credit limit cap','Icon':'images/Credit_Card.png'},
		          {'Name':'Consolidate your balances for 6% APR for the first 6 months','Icon':'images/Credit_Card.png'}]
	},
	{'Name':'Home Insurance',
		'ID':'3',
		'Icon':'images/Home_Insurance.png',
		'Count':'3',
		'Type' : 'Approve',
		'Offers':[{'Name':'50% discount on Premium for long-term Home Insurance policy ','Icon':'images/Home_Insurance.png'},
		          {'Name':'10% discount on the Home Content Insurance for covers upto 4 Lakh Rupees ','Icon':'images/Home_Insurance.png'},
		          {'Name':'Protect your home for 20 years with a single premium','Icon':'images/Home_Insurance.png'}]
	}];

	var docData = [{'Name':'Address Proof',
		'ID':'0',
		'Icon':'images/address-proof.png',
		'Count':'1',
		'Type' : 'Approve',
		'Offers':[{'Name':'Valid Passport','Icon':'images/address-proof.png','Code':'101'},
			        {'Name':'Latest Electricity Bill','Icon':'images/address-proof.png','Code':'102'},
			        {'Name':'Telephone Bill','Icon':'images/address-proof.png','Code':'103'},
			        {'Name':'Driving License','Icon':'images/address-proof.png','Code':'104'},
			        {'Name':'Ration Card','Icon':'images/address-proof.png','Code':'105'},
			        {'Name':'Bank Account Statement/Pass Book 1st page','Icon':'images/address-proof.png','Code':'106'},
			        {'Name':'Rent Agreement','Icon':'images/address-proof.png','Code':'107'},
			        {'Name':'Gas Connection Bill or Post Paid Mobile Bill with full address ','Icon':'images/address-proof.png','Code':'108'},
			        {'Name':'Property Tax receipt or Water Bill','Icon':'images/address-proof.png','Code':'109'},
			        {'Name':'Voter’s Identity card','Icon':'images/address-proof.png','Code':'110'},
			        {'Name':'Aadhar UID Card','Icon':'images/address-proof.png','Code':'111'}]
	},
	{'Name':'DOB Proof',
		'ID':'1',
		'Icon':'images/date of birth proof.png',
		'Count':'2',
		'Type' : 'Approve',
		'Offers':[{'Name':'Valid Passport','Icon':'images/date of birth proof.png','Code':'101'},
			        {'Name':'PAN Card','Icon':'images/date of birth proof.png','Code':'112'},
			        {'Name':'Driving License','Icon':'images/date of birth proof.png','Code':'104'},
			        {'Name':'Birth Certificate (Govt agency)','Icon':'images/date of birth proof.png','Code':'113'},
			        {'Name':'School Leaving certificate (10th/12th)','Icon':'images/date of birth proof.png','Code':'114'},
			        {'Name':'Voter ID Card','Icon':'images/date of birth proof.png','Code':'110'},
			        {'Name':'Pension Certificate / Govt. ID Card / Aadhar UID Card','Icon':'images/date of birth proof.png','Code':'111'}]
	},
	{'Name':'Identification Proof',
		'ID':'2',
		'Icon':'images/identification number.png',
		'Count':'3',
		'Type' : 'Approve',
		'Offers':[{'Name':'Valid Passport','Icon':'images/identification number.png','Code':'101'},
			        {'Name':'PAN Card','Icon':'images/identification number.png','Code':'112'},
			        {'Name':'Driving License','Icon':'images/identification number.png','Code':'104'},
			        {'Name':'Voter’s Identity Card','Icon':'images/identification number.png','Code':'110'},
			        {'Name':'Aadhar UID card','Icon':'images/identification number.png','Code':'111'},
			        {'Name':'Bank Passbook with photo','Icon':'images/identification number.png','Code':'115'}]
	},
	{'Name':'Signature Proof',
		'ID':'3',
		'Icon':'images/signature proof.png',
		'Count':'4',
		'Offers':[{'Name':'Signature verification from bank','Icon':'images/signature proof.png','Code':'116'},
			        {'Name':'Passport Copy','Icon':'images/signature proof.png','Code':'101'},
			        {'Name':'PAN Card','Icon':'images/signature proof.png','Code':'112'},
			        {'Name':'Driving license with photograph and signature','Icon':'images/signature proof.png','Code':'104'},
			        {'Name':'Clearance of processing fees cheque','Icon':'images/signature proof.png','Code':'117'}]
	},
	{'Name':'Rejected Proof',
		'ID':'4',
		'Icon':'images/rejected proof.png',
		'Count':'5',
		'Offers':[]
	}];

	 $scope.OfferArrey =docData ;
	 $scope.AvailebleOffers = $scope.OfferArrey[0].Offers;
	 $scope.ID = 0;
	/* $scope.OfferArrey[0].addClass("sayali");*/

	$scope.aplcntType=[{value:"SAL","text":"Salaried"},
				               	{value:"SEB","text":"Self Employed Business"},
				               	{value:"SEP","text":"Self Employed Professional"}];

    $scope.findAddressType = function(orignal,final){
    	return (angular.lowercase(orignal) == angular.lowercase(final));
    }				               	

	$scope.load_details = function(CustID,flag)
	{  
		var URL='';
		var json ={'sRefID':CustID};	
		if(croQueue)//for CRO1
		{ 
			URL = 'application-data';
			if(flag == "true"){
				$('#approve , #decline, #onhold').show();
				 $("#dedupe , #dedupe1").val("Select");
			}else{
				$('#approve , #decline, #onhold').hide();
			}
		}else{
			URL = 'application-data-cro2';
			if(flag == "true"){
				$('#accept , #reject').show();
				 $("#dedupe , #dedupe1").val("Select");
			}else{
				$('#accept , #reject').hide();
			}
		}
		RestService.saveToServer(URL,json).then(function(Response){
			if(Response != '')
				$scope.objectSet = Response;
			else
			$scope.objectSet = NotificationObject.dummy();
			$scope.Picked = CustID;
			$scope.showrefid = "true";
			$scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;
			var data = 	$scope.notifarray;
			for (var j in data)
			{if(data[j].sRefID ==  $scope.objectSet.oAppReq.sRefID){
					$scope.applctnstatus = data[j].sStat;}
			}
			$scope.croDecision = Response.aCroDec;
			/*$(document.body).find('#cirhtml').attr("data", "").hide();
			$scope.error = "";
			$scope.done = "";
			$scope.appScore ='';
			 $scope.objectSet.oCompRes.scoringServiceResponse.SCORE_TREE ='';
			$scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"] ='';
			$('#descReason').val("");
			$("#approvemsg").text("");
			$rootScope.rejectArray=[];
			$scope.rejectFlag = false;
			$scope.objectSet.oLosDtls.sLosID="";
			kyc_array=[];appForm_array=[];disburst_array=[];agreement_array=[];extra_array=[];evidence_array=[];
			ach_array=[];addkyc_array=[];ach_array=[];arrayDesc=[];arrayDclnDesc=[];
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
			
			$scope.income1 = '';
			$scope.income2 = '';
			$scope.others = '';
			$scope.extra = undefined;
			$scope.evidence = undefined;
			$scope.custimg = '';
			
			var temp=[];
			var passport=[];
			var dlicen=[];
			var adhar=[];			
			$rootScope.uploadedImg1 ='';
			$rootScope.uploadedImg2 ='';
			$(document.body).find('#imgpreview1').attr('src', "");
			$(document.body).find('#imgpreview2').attr('src', "");
			$('#imgpreview1').hide();
			$('#imgpreview2').hide();
			$scope.objectSet.oLosDtls.sStat="";
			$('#losStatusId1').val("");
			$('#losId').val('');
			$('#utrData').val('');
			$(document.body).find('#utrData').prop('disabled', true);
			$('#losId , #utrData').css("border","1px solid #cfcfcf");
		
			$scope.apprAmount = '';
			$scope.objectSet.oCompRes.scoringServiceResponse["DECISION_RESPONSE"].Details=[];
			$scope.objectSet.aCroDec[0].dEmi ="";
			$scope.objectSet.oAppReq.oReq.oApplication.aAssetDetail[0].sDlrName ="";
			
			$scope.panpresent =false;
			$scope.adharpresent =  false; 
			$scope.passportPresents =false;
			$scope.dLPresent = false;
			$scope.income1Present = false;
			$scope.income2Present = false;
			$scope.custPresent = false;
			$scope.otherPresent = false;
			$scope.extraPresent=false;
			$scope.evidPresent=false;*/
			
		});
}
$scope.newApplication = function(){ 
	if(croQueue){
	$scope.container = false;
	}		
}
$scope.toggleForm= function(){
	$scope.container = !$scope.container;
}
	
$scope.cro_action = function(appID, action){ 
	$scope.appltnID = appID;
	if(($scope.applctnstatus.toUpperCase() == "QUEUE") || (!croQueue)){
		var arr=[];
		if((appID !== "undefined") && (typeof $scope.objectSet.oAppReq !== "undefined")){
			 if(action == "OnHold"){
				/* var data= $rootScope.rejectArray;
				 for (j in data){
							docData[4].Offers.push(data[j]);
				 }	*/
				 /*$('div[contextmenu="blur"]').addClass("blured");
				 $('#OfferPanel').slideDown();*/
				 //blurr main container

				 $scope.toggleDocPanel = !$scope.toggleDocPanel;
				 $scope.docOfferFlag = true;
								 
				 
				/* $('#SendOffer').css("width","19%");*/
				 
				 /*setTimeout(function() { 	
					 $(document.body).find('div[id^="OfferBox"]').css("background-color","#fff");
					 $(document.body).find('#OfferBox0').css("background-color","#F4F8F9");
				 },100);*/
			 
			 }else if(action == "Declined"){
			/*
				 $('div[contextmenu="blur"]').addClass("blured");
				 $('#declinereason').slideDown();
				 $('#reason1container,#reason2container').text('');*/
			 	$scope.toggleDclnPanel = !$scope.toggleDclnPanel;

			 }else{
					/* $('div[contextmenu="blur"]').addClass("blured");
					 $('#approveReason').show();
					 $('#appr1Container,#appr2Container').text(''); 
					$scope.error = "Please select enquiry from Queue...!!!";
					$scope.done = "";*/
					$scope.toggleApprvPanel = !$scope.toggleApprvPanel;
			}

		}else if($scope.applctnstatus == null){
	
		$scope.error = "Application status is not defined...!!!";
		$scope.done = "";
	
	}else{
		$scope.error = "Application has already taken an action...!!!";
		$scope.done = "";
	}
	
	$scope.showrefid = "true";
}

$scope.closeDclnPanel=function(){
	/* $('#declinereason').slideUp();
	 $('div[contextmenu="blur"]').removeClass("blured");
	 $('#reason1container , #reason2container').text('');
	 $('#declinemsg').text("");*/
	 $scope.dclnRemark = '';
	 $scope.dclnSubTo = '';
	 $scope.toggleDclnPanel = !$scope.toggleDclnPanel;
}
$scope.closeApprvPanel=function(){
	/* $('#approveReason').slideUp();
	 $('div[contextmenu="blur"]').removeClass("blured");
	 $('#appr1Container , #appr2Container ,#approvemsg').text('');
	 $('#ApprvValue , #emiValue , #tenorValue').css("border","1px solid #999");
	 $('#ApprvValue').val("");
	 $('#ApprvValue').val($scope.objectSet.aCroDec[0].dAmtAppr);*/
	 	$scope.apprvRemark = '';
	 	$scope.apprvSubTo = '';
	 	$scope.croDecision = '';
	 	console.log("apprv : "+$scope.apprvRemark+" sfs:"+$scope.apprvSubTo);
	 	$scope.toggleApprvPanel = !$scope.toggleApprvPanel;
}
$scope.setSelected=function() {  
	var offers={'offers':[],'documents':[]};
	if(offersAllowed)
	{
	  for(var i=0;i<docData.length;i++)
	  {for(var j=0;j<docData[i].Offers.length;j++)
	   {if((typeof docData[i].Offers[j].selected != 'undefined'))
	    {
		   if($scope.docOfferFlag == true){
				offers.documents.push(docData[i].Offers[j]);
				$scope.docOfferFlag == false;
		   }
		   else{
				offers.offers.push(docData[i].Offers[j]);
		   }
	    }
	   }
	  }
	 $scope.offrData = offers.documents; 
    /* $('#OfferPanel').slideUp();
     $('div[contextmenu="blur"]').removeClass("blured");*/
	 } 
}
	$scope.Load_Offer = function(NodeID,Obj){
		var BoxID = Obj.currentTarget.attributes.id.nodeValue;
		$('div[id^='+BoxID.slice(0,BoxID.length-1)+']').css("background-color","#fff");
		$('#'+BoxID+'').css("background-color","#F4F8F9");
		for(var i=0; i<docData.length; i++)
		{if(docData[i].ID == NodeID)
		{	$scope.AvailebleOffers = docData[i].Offers;
			$scope.ID = NodeID;
		}
		}
	}
	
	$scope.checkboxUpdate = function(Obj,id){ 
		if(Obj){
			
			if (typeof docData[$scope.ID].selected != "undefined") { 
			 
			 	docData[$scope.ID].selected.push(id);	
	      		
	      		if(typeof docData[$scope.ID].Offers[id].selected == "undefined"){ 
	      			$.extend( docData[$scope.ID].Offers[id], {'selected':'true'});
	      		}

	    	} else {
			  
				  var selected={'selected':[]};
				  
				  $.extend( docData[$scope.ID], selected);
				  
				  docData[$scope.ID].selected.push(id);	
	 	  	
		 	  	if(typeof docData[$scope.ID].Offers[id].selected == "undefined"){
		 	  		 
		 	  		 $.extend( docData[$scope.ID].Offers[id], {'selected':'true'});
		 	  	}
	        }	
	  
	  } else {
		
		docData[$scope.ID].selected.splice($.inArray(id, docData[$scope.ID].selected),1);
		delete docData[$scope.ID].Offers[id].selected;
	  }

	  if((typeof docData[$scope.ID].selected !="undefined") && (docData[$scope.ID].selected.length > 0)){
		$('#active'+$scope.ID+'').css("background-color","green");
		$scope.OfferArrey = docData;
	  } else {
		$('#active'+$scope.ID+'').css("background-color","#fff");
	  }
	}

	$scope.closeDocument = function(){
		$scope.toggleDocPanel = !$scope.toggleDocPanel;
		 $scope.invalidMsg = !$scope.invalidMsg;
	}

	$scope.requestDoc = function(){
		if($scope.reqComment != '' && $scope.reqComment != undefined){
			$scope.setSelected();
			 var data = $scope.offrData;
			 for (j in data){
				arrayDesc.push({sJCode:data[j].Code,sDescrip:$scope.reqComment,sDocName:data[j].Name});
			  }
			 var arr=[];
			 var json = {
						"sRefID":$scope.objectSet.oAppReq.sRefID,
						'sHeader':{'sAppID':$scope.appltnID,'sInstID':user.institutionID,'sCroId':$scope.userid},
						"sAppStat":"OnHold",
						"aCroJustification":arrayDesc,
						"aDedupeRefID": ($scope.objectSet.aDeDupe ? $scope.objectSet.aDeDupe : arr)
						};
			// requestFordclnOnhold(json);//call to server
			  for(var j=0; j<$scope.OfferArrey.length ; j++){
				  for (var i = 0; i <   $scope.OfferArrey[j].Offers.length ; i++) {
					  if( $scope.OfferArrey[j].Offers[i].selected)
						  $scope.OfferArrey[j].Offers[i].selected = false;
				  } 
			  }
			  console.log("json :"+JSON.stringify(json));
              $scope.toggleDocPanel = !$scope.toggleDocPanel;
              if($scope.invalidMsg)
                  $scope.invalidMsg = !$scope.invalidMsg;
			/* $("#approvemsg").text("");
			 $scope.updateStatus();
			 var reason = $('#descReason').val();
			 var data = $scope.offrData;
			 for (j in data)
				{
					arrayDesc.push({sJCode:data[j].Code,sDescrip:reason,sDocName:data[j].Name});
				}
			 var arr=[];
			 var json = {
						"sRefID":$scope.refID,
						'sHeader':{'sAppID':$scope.appltnID,'sInstID':user.institutionID,'sCroId':$scope.userid},
						"sAppStat":"OnHold",
						"aCroJustification":arrayDesc,
						"aDedupeRefID": ($scope.objectSet.aDeDupe ? $scope.objectSet.aDeDupe : arr)
						};
			 requestFordecline(json);
			  $('#offrform').trigger('reset');
			  for(var j=0; j<$scope.OfferArrey.length ; j++){
				  for (i = 0; i <   $scope.OfferArrey[j].Offers.length ; i++) {
					  if( $scope.OfferArrey[j].Offers[i].selected)
						  $scope.OfferArrey[j].Offers[i].selected = false;
				  } 
			  }
			  $('div[id^="active"').css("background-color","#E4EDE4"); 
			  $('#descReason').css("border","1px solid #999");
			  docData[4].Offers=[];*/
		 }else{
		 	//console.log("invalid : "+$scope.invalidMsg);
			 $scope.invalidMsg = !$scope.invalidMsg;
		 }
	}


/*$(document.body).on("click","#SendOffer",function(){
		 if($('#descReason').val()!=''){
		 $("#approvemsg").text("");
		 $scope.updateStatus();
		 var reason = $('#descReason').val();
		 var data = $scope.offrData;
		 for (j in data)
			{
				arrayDesc.push({sJCode:data[j].Code,sDescrip:reason,sDocName:data[j].Name});
			}
		 var arr=[];
		 var json = {
					"sRefID":$scope.refID,
					'sHeader':{'sAppID':$scope.appltnID,'sInstID':user.institutionID,'sCroId':$scope.userid},
					"sAppStat":"OnHold",
					"aCroJustification":arrayDesc,
					"aDedupeRefID": ($scope.objectSet.aDeDupe ? $scope.objectSet.aDeDupe : arr)
					};
		 requestFordecline(json);
		  $('#offrform').trigger('reset');
		  for(j=0; j<$scope.OfferArrey.length ; j++){
			  for (i = 0; i <   $scope.OfferArrey[j].Offers.length ; i++) {
				  if( $scope.OfferArrey[j].Offers[i].selected)
					  $scope.OfferArrey[j].Offers[i].selected = false;
			  } 
		  }
		  $('div[id^="active"').css("background-color","#E4EDE4"); 
		  $('#descReason').css("border","1px solid #999");
		  docData[4].Offers=[];
		 }else{
			 $("#msg").text("Please enter your reason for Onhold");
		 }
	 });
	 */
	 function  requestFordclnOnhold(json){
			var URL='cro-onhold';
			RestService.saveToServer(URL,json).then(function(Response){
				if(Response.STATUS == "OK UPDATE SUCCESSFULLY")						
				{
					setTimeout(function() 
					{ $('.LoaderSpinner').hide()},2000);
					$(document.body).find("#"+$scope.appltnID+"").addClass($scope.actions);

					$scope.done = "Application is successfully "+$scope.actions+""; 
					polling();// check it out
					setTimeout(function() 
					{ 
						$scope.done="";
					},4000);
				}
			});
		}
	 
	function requestForStatus(json)
	{
	var URL = 'cro-approval';
	RestService.saveToServer(URL,json).then(function(Response){
		$scope.appStatflag =json.sAppStat;
		if(Response.STATUS == "OK UPDATE SUCCESSFULLY")						
		{
			setTimeout(function() 
			{ $('.LoaderSpinner').hide()},2000);
				$(document.body).find("#"+$scope.appltnID+"").addClass($scope.actions);
				$scope.done = "Application is successfully "+$scope.actions+""; 
				setTimeout(function() 
						{ 
							$scope.done="";
						},4000);
		}
		else{
			$scope.error= "Sorry...Unable to update your action !!";
		}
	setTimeout(function() { $scope.error = "";},1500);
	});	
  }

    $scope.scoreTree = function(){
        console.log("function called");
        treeData = [];
        function generate_scoreJson(temp){

            var colors = ['#689f38','#EF3D16','#fb8c00','#8BC34A','#2196F3','#9C27B0','#bdbdbd','#009688','#ffc107','#689f38'];
            
            try{
                if(temp != null && typeof temp != 'undefined')
                { treeData.push({"name":"Application Score", "score":temp.AppScore, "color":"#2196F3", "children":[]});
                for(var i=0; i<temp.Scores.length; i++)
                {
                    var color = colors[i];
                    var cat = temp.masterMap[temp.Scores[i].name];
                    treeData[0].children.push({"name":temp.Scores[i].name, "score":temp.Scores[i].score, "color":color, "children":[]});
                    for(var j=0; j< temp.Scores[i].Plans[0].length; j++)
                    {
                        var att = cat[temp.Scores[i].Plans[0][j].name];
                        treeData[0].children[i].children.push({"name":temp.Scores[i].Plans[0][j].name, "score":temp.Scores[i].Plans[0][j].score, "color":color, "children":[]}); 
                        for(var k=0; k<temp.Scores[i].Plans[0][j].Fields[0].length; k++)
                        {
                            var field = att[temp.Scores[i].Plans[0][j].Fields[0][k].name];
                            var exp = field["FieldName"]; //fieldname
                            var dscore = field["value"]; //
                            var weight = field["weight"];
                            treeData[0].children[i].children[j].children.push({"score":temp.Scores[i].Plans[0][j].Fields[0][k].score, "color":color,"dscore":dscore, "exp":exp, "weight":weight});
                        }
                    }
                }
                }
            
            }catch(error){
                
                console.log(error);
                
                $("#scoreTree").text("Sorry we cant process this score tree");
            }

            var margin = {top: 120,right: 150,bottom: 80,left: 120},
            width = 1000,
            height = 10;
            var i = 0,duration = 750,root,depth = 0;
            var tree = d3.layout.tree().nodeSize([120, 80]).separation(function separation(a, b) {
                return (a.parent == b.parent ? 1 : 1);
            });

            var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y, d.x];
            });

            var svg = d3.select("#scoreTree").append("svg")
            .attr("width", width)
            .attr("height", height).call(zm = d3.behavior.zoom().scaleExtent([1, 1]).on("zoom", redraw))
            .append("g").attr("transform", "translate(" + width / 2 + "," + 20 + ")");

            zm.translate([width / 2, 20]); 
            root = treeData[0];
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            root.children.forEach(collapse);
            
            update(root);
            
            function update(source) {
                var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

                nodes.forEach(function(d) {
                    d.y = d.depth * 120;
                });

                var levelWidth = [1];
                var childCount = function(level, n) {
                    if (n.children && n.children.length > 0) {
                        if (levelWidth.length <= level + 1) {
                            levelWidth.push(0);
                        }
                        levelWidth[level + 1] += n.children.length;
                        n.children.forEach(function(d) {
                            childCount(level + 1, d);
                        });

                    }
                };
                childCount(0, root);
                    height = height + 160;
                    depth = levelWidth.length;
                } 


                $("#scoreTree").css("height", height);
                d3.select("svg").attr("height", height);


                var node = svg.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

                var SVGmouseTip = d3.select("g.tooltip.mouse");
                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                .attr("class", "node")      
                .attr("transform", function(d) {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                })
                .on("click", click).on("mouseout", function() {
                    d3.select("#tooltip").classed("hidden", true);
                })
                .on("mouseover", function(d) {
                    var matrix = this.getScreenCTM()
                    .translate(+this.getAttribute("cx"), +this.getAttribute("cy")); 
                    d3.select("#tooltip")
                    .style("left", Math.max(0, d3.event.pageX - 20) + "px")
                    .style("top", (d3.event.pageY - 120) + "px");

                    $('#node_expression').text(d.exp);
                    $('#node_details').text("Value : "+ d.dscore);
                    d3.select("#tooltip").classed("hidden", false); 
                                                                    

                })
                .on('mousemove', function(d) {
                    d3.select("#tooltip").style("left", Math.max(0, d3.event.pageX - 20) + "px") 
                    .style("top", (d3.event.pageY - 120) + "px");
                });              

                nodeEnter.append("ellipse")
                .attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : d.color;
                });

                nodeEnter.append("text")
                .attr("y", function(d) {
                    return d.children || d._children ? -20 : 20;
                })
                .attr("dy", ".20em")
                .attr("text-anchor", "middle")
                .text(function(d) {
                    return d.name;
                })
                .style("fill-opacity", 1);

                nodeEnter.append("text") 
                .style("fill", "white")  
                .attr("dy", ".20em")   
                .attr("text-anchor", "middle") 
                .text(function(d) {
                    return d.score;
                });        

                var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                var diagonal = d3.svg.diagonal()
                .projection(function(d) {
                    return [d.x, d.y];
                });

                nodeUpdate.select("ellipse")
                .attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12)
                .style("fill", function(d) {
                    // return d.color;
                    return d._children ? "lightsteelblue" : d.color;
                });


                nodeUpdate.select("text").style("fill-opacity", 1);

                var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.x + "," + source.y + ")";
                })
                .remove();

                nodeExit.select("ellipse")
                .attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12);

                nodeExit.select("text")
                .style("fill-opacity", 1e-6);

                var link = svg.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

                link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", diagonal);

                link.transition()
                .duration(duration)
                .attr("d", diagonal);

                link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {
                            x: d.x0,
                            y: d.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            function click(d) 
            {              
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);            
            }

            function redraw() 
            {
                svg.attr("transform", "translate(" + d3.event.translate + ")");
            }
        }
    }
 
	/*$(document.body).on("click","#back",function(){
		// alert("Closing...");
		$("#application-main-container").slideUp();				
		$("#notification-main-container").show();
		$timeout(function(){
		$('#losStatusId1').val("");
		$scope.objectSet.oLosDtls.sStat ="";
		$('#losId').val('');
		$('#losId').css("border","1px solid #cfcfcf");
	
		});
	});

*//*
	function getTime(value, array){
		var index;
		jQuery.each(array,function(val,text){
			if(value === text.value)
			{
				index = val;
			}else if(value === text)
			{
				index = val;
			}
		});
		return index;
	}*/
	/*$(document.body).on("click","#closeOffer" ,function() {
		  
		  docData[4].Offers=[];
		  
		  $('#OfferPanel').slideUp();
		  
		  $('#descReason').val("");
		  
		  $('#msg').text("");
		  
		  $('div[contextmenu="blur"]').removeClass("blured");
		  
		  $('#offrform').trigger('reset');
		  
		  $('div[id^="active"').css("background-color","#E4EDE4"); 
		  
		  $('#descReason').css("border","1px solid #999");
		  
		  for(var j=0; j<$scope.OfferArrey.length ; j++){
			  for (var i = 0; i <   $scope.OfferArrey[j].Offers.length ; i++) {
				  if( $scope.OfferArrey[j].Offers[i].selected)
					  $scope.OfferArrey[j].Offers[i].selected = false;
			  } 
		  }
	 });*/


	$(document).on('click', '.close', function(e) {
		$("#scoreTree").text("");
		$(document.body).find('#document_preview').attr("src","");
		$(document.body).find("#rjct").removeClass("reject");
		$(document.body).find("#apprv").removeClass("btn-success");
		$(document.body).find("#apprv,#rjct").addClass("btn-default");
		$(document.body).find('#reason').val("");
		$(document.body).find('#reason').css("border","1px solid #ccc");
		$(document.body).find('#reason').css("box-shadow","inset 0 1px 1px rgba(0,0,0,0.075)");
		$(document.body).find('#reason').hide();
		$(document.body).find('#submitreason').hide();
		$(document.body).find('#cirhtml').attr("data", "").hide();
		$rootScope.uploadedImg1 ='';
		$rootScope.uploadedImg2 ='';
		$(document.body).find('#imgpreview1').attr('src', "");
		$(document.body).find('#imgpreview2').attr('src', "");
		$('#imgpreview1').hide();
		$('#imgpreview2').hide();
		 $('#upload_button').show();
	});
	
	$(function() {
		$('#chat_window').hide();
		if(navigator.platform.toUpperCase().indexOf('MAC') !== -1)
		{
			$('.leftbar_scroll').css("margin","0px");			
		}
	});
	$(document.body).on('click','.custom_img_rounded',function() 
		    {
					if($(this).attr("id")!="imgpreview1" && $(this).attr("id")!="imgpreview2"){
		    		$(document.body).find('#cirhtml').attr("data", "").hide();
					var src = $(this).attr("src");
					$(document.body).find('#myModalnew').find('.modal-title').find('h5[class="modal-title"]').remove();
					if($(this).hasClass("Report-Icon"))
					{  src=$(this).attr("name");
					}
					else if($(this).hasClass("arrow"))
					{  
						var imgname = $(this).attr("name");
						if(imgname == "PAN" || imgname == "AADHAAR" || imgname=="PASSPORT" || imgname=="DRIVING-LICENSE"){
							for(i=0;i<kyc_array.length;i++){
								if(imgname == kyc_array[i].kyc_name){
									checkImgStatus(kyc_array[i].img_status);}
							}
						 }else{
							 for(i=0;i<extra_array.length;i++){
									if(imgname == extra_array[i].kyc_name){
										checkImgStatus(extra_array[i].img_status);}
								}
						 }
					    var imgID= $(this).attr("usermap");
						findCurrentImg(imgname);
						$('#approve_rejectPanel').show();
						$('#uploadNewimgPanel').show();
						src = $(this).attr("src");
						$(document.body).find('#myModalnew').find('.modal-title').append('<h5 class="modal-title" title='+imgID+'>'+imgname+'</h5>');
					}
					else{
						var imgname = $(this).attr("name");
						var imgID= $(this).attr("usermap");
						if(imgname=="INCOME-PROOF1"){
							 checkImgStatus(income1_array[0].img_status);
						}else if(imgname=="INCOME-PROOF2"){
							 checkImgStatus(income2_array[0].img_status);
						}else if(imgname=="OTHER"){
							 checkImgStatus(other_array[0].img_status);
						}else if(imgname=="APPLICANT-PHOTO"){
							 checkImgStatus(custImg_array[0].img_status);
						}
						$(document.body).find('#img_panel').remove();
						$('#img_preview').prepend('<div class="row clearfix" id="img_panel"><img id="document_preview" src=""></div>');
						$('#approve_rejectPanel').show();
						$('#uploadNewimgPanel').show();
						src = $(this).attr("src");
						$(document.body).find('#myModalnew').find('.modal-title').append('<h5 class="modal-title" title='+imgID+'>'+imgname+'</h5>');
					}
					var url=src;
					src = src.substring(src.lastIndexOf('.') + 1);
					if (src.toUpperCase()=="PDF") 
					{
						$('#document_preview').hide();
						$(document.body).find('#cirhtml').attr("data", url).show();
					}else if (src.toUpperCase()=="JPG"||src.toUpperCase()=="JPEG"||src.toUpperCase()=="PNG"){
						$(document.body).find('#cirhtml').attr("data", "").hide();
						$(document.body).find('#document_preview').attr("src", url).show();
					}else if(src.startsWith("data:image/")){
						$(document.body).find('#cirhtml').attr("data", "").hide();
						$(document.body).find('#document_preview').attr("src", url).show();
					}else if(src.startsWith("data:application/pdf")){
						$(document.body).find('#document_preview').hide();
						$(document.body).find('#img_panel').remove();
						$('#img_preview').prepend(' <object id="cirhtml" type="text/html" width="100%" height="620px" style="border:none;"></object>');
						$('#approve_rejectPanel').hide();
						$(document.body).find('#cirhtml').attr("data", $scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"]).show();
					}
		    }
			});
		
	function applicantImg(data){
		var map =data;
		for (i in map)
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
			kyc_img(map[i].sImgType , map[i].sImgID, map[i].sStat, map[i].sReason);

		
			
		}
		$scope.rejectFlag = false;
		 checkRejectedImg(kyc_array);
		 checkRejectedImg(income1_array);
		 checkRejectedImg(income2_array);
		 checkRejectedImg(other_array);
		 checkRejectedImg(custImg_array);
		 checkRejectedImg(appForm_array);
		 checkRejectedImg(disburst_array);
		 checkRejectedImg(agreement_array);
		 checkRejectedImg(ach_array);
		 checkRejectedImg(addkyc_array);
		 checkRejectedImg(evidence_array);
		 checkRejectedImg(extra_array);
	}
	function kyc_img(kycName , imgId ,status , reason){
		var json ={'sImgID':imgId}
		var URL = 'get-image-by-id-base64';
		RestService.saveToServer(URL,json).then(function(Response){
				var image = "data:image/png;base64,"+Response.sByteCode;
				if(Response.sByteCode != undefined && Response.sByteCode != null && Response.sByteCode != "" ){
					var url =image;
					if(kycName =="PAN"){
						$scope.panpresent =  true;
						if($scope.src_img == ''){
						$scope.src_img =image;
						$scope.panimgID = imgId;
						temp.push({status: status, reason:reason});
						}
						kyc_array.push({kyc_name:"PAN",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "PAN";
						checkRejectedImg(kyc_array);
					}
					else if(kycName =="AADHAAR"){
						$scope.adharpresent =  true; 
						if($scope.aadhar == ''){
						$scope.aadhar =image;
						$scope.adhrimgID = imgId;
						adhar.push({status: status, reason:reason});
						}
						kyc_array.push({kyc_name:"AADHAAR",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "AADHAAR";
					}
					else if(kycName =="DRIVING-LICENSE"){
						$scope.dLPresent = true;
						if($scope.dlicense == ''){
						$scope.dlicense =image;
						$scope.drvlimgID = imgId;
						dlicen.push({status: status, reason:reason});
						}
						kyc_array.push({kyc_name:"DRIVING-LICENSE",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "DRIVING-LICENSE";
					}
					else if(kycName =="PASSPORT"){
						$scope.passportPresents =true;
						if($scope.passport == ''){
						$scope.passport =image;
						$scope.passimgID = imgId;
						passport.push({status: status, reason:reason});
						}
						kyc_array.push({kyc_name:"PASSPORT",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "PASSPORT";
					}
					else if(kycName =="INCOME-PROOF1"){
						$scope.income1Present = true;
						$scope.income1 =image;
						$scope.income1Id = imgId;
						income1_array.push({kyc_name:"INCOME-PROOF1",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(income1_array);
					}
					else if(kycName =="INCOME-PROOF2"){
						$scope.income2Present = true;
						$scope.income2 =image;
						$scope.income2Id = imgId;
						income2_array.push({kyc_name:"INCOME-PROOF2",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(income2_array);
					}
					else if(kycName =="OTHER"){
						$scope.otherPresent = true;
						$scope.others =image;
						$scope.otherId = imgId;
						other_array.push({kyc_name:"OTHER",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(other_array);
					}
					else if(kycName =="APPLICANT-PHOTO"){
						$scope.custPresent = true;
						$scope.custimg =image;
						$scope.custimgId = imgId;
						custImg_array.push({kyc_name:"APPLICANT-PHOTO",image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(custImg_array);
					}
					else if(/^APPLICATION_FORM/.test(kycName)){
						$scope.appformPresent = true;
						if($scope.appform == ''){
							$scope.appform =image;
							$scope.appformId = imgId;
							$scope.appFormName = kycName;
						}
						appForm_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(appForm_array);//incomplete
					}
					else if(/^DISBURSEMENT/.test(kycName)){
						$scope.disbstPresent = true;
						if($scope.disburstment == ''){
							$scope.disburstment =image;
							$scope.disbId = imgId;
							$scope.disbursName = kycName;
						}
						disburst_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(disburst_array);
					}
					else if(/^AGREEMENT/.test(kycName)){
						$scope.agreemntPresent = true;
						if($scope.agreemnt == ''){
							$scope.agreemnt =image;
							$scope.agrmtId = imgId;
							$scope.agreemntName = kycName;
						}					
						agreement_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(agreement_array);
					}
					else if(/^ACH/.test(kycName)){
						$scope.achPresent = true;
						if($scope.achdata == ''){
						 $scope.achdata =image;
						 $scope.achId = imgId;
						 $scope.achName = kycName;
						}			
						ach_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(ach_array);
					}
					else if(/^ADDITIONAL_KYC/.test(kycName)){
						$scope.addKycPresent = true;
						if($scope.addKyc == ''){
						 $scope.addKyc =image;
						 $scope.addkycId = imgId;
						 $scope.addKycName = kycName;
						}
						addkyc_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(addkyc_array);
					}
					else if(kycName.indexOf('_EVIDENCE') !== -1){
						$scope.evidPresent = true;
						if($scope.evidence != undefined){
						}else{
							$scope.evidencename = kycName;
							$scope.evidence =image;
							$scope.evdnId = imgId;
						}
						evidence_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(evidence_array);
					}else{
						$scope.extraPresent=true;
						if($scope.extra != undefined){
						}else{
							$scope.extraname = kycName;
							$scope.extra =image;
							$scope.extraId = imgId;
						}
						extra_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						checkRejectedImg(extra_array);
					}
					$(document.body).find('#document_preview').attr("src", url).show();	
				}
		});
	}
	
	function iterateImg(current , array){
		$(document.body).find('#myModalnew').find('.modal-title').find('h5').text(array[current].kyc_name);
		$(document.body).find('#myModalnew').find('.modal-title').find('h5').attr("title",array[current].ImageID);
		$(document.body).find('#reason').hide();
		$(document.body).find('#submitreason').hide();
		if(current == array.length-1){
			$('#nextarrow').css("opacity","0.5");
			$('#prevarrow').css("opacity","1");
		}else if(current == 0){
			$('#prevarrow').css("opacity","0.5");
			$('#nextarrow').css("opacity","1");
		}
		else{
			$('#prevarrow').css("opacity","1");
			$('#nextarrow').css("opacity","1");
		}
		checkImgStatus(array[current].img_status);
		$(document.body).find('#document_preview').attr("src", array[current].image).show();
		$rootScope.uploadImgFor =  array[current].kyc_name;
		nextImg = [];
		prevImg = [];
		$scope.index = current;
		$scope.currImg = current;
		for(i=current+1; i<array.length; i++){
			nextImg.push(array[i]);
		}
		for(j=0; j<=current-1; j++){
			prevImg.push(array[j]);
		}
		$rootScope.uploadedImg1 ='';
		$rootScope.uploadedImg2 ='';
		$(document.body).find('#imgpreview1').attr('src', "");
		$(document.body).find('#imgpreview2').attr('src', "");
		$('#imgpreview1').hide();
		$('#imgpreview2').hide();
	}
		
	$(document).on('click', '#nextarrow', function(e) {
		var current='';
		if($scope.currImg == 0){
		 current = $scope.currImg+1;
		}
		else{
		  current =$scope.index+1;
		}
		var title = $('#img_panel').attr("title");
		if(/^APPLICATION_FORM/.test(title)){
			iterateImg(current,appForm_array);
		}
		else if(/^AGREEMENT/.test(title)){  
			iterateImg(current,agreement_array);
		}
		else if(/^ACH/.test(title)){
			iterateImg(current,ach_array);
		}
		else if(/^DISBURSEMENT/.test(title)){
			iterateImg(current,disburst_array);
		}
		else if(/^ADDITIONAL_KYC/.test(title)){
			iterateImg(current,addkyc_array);
		}
		else if(title=="APPLICANT-PHOTO"){
			iterateImg(current,custImg_array);
		}
		else{
			var temp= 	$(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
			if((temp=="PAN" || temp=="DRIVING-LICENSE" || temp=="AADHAAR" || temp=='PASSPORT'))
			{
				iterateImg(current,kyc_array);
			}else if(temp.indexOf('_EVIDENCE') !== -1){				
				iterateImg(current,evidence_array);
			}
			else{
				iterateImg(current,extra_array);
			}
		}
	});
	
	$(document).on('click', '#prevarrow', function(e) {
		var current = '' ;
		if($scope.currImg == 0){
			 current = $scope.currImg-1;
			}
			else{
			  current =$scope.index-1;
			}
		var title = $('#img_panel').attr("title");
		if(/^APPLICATION_FORM/.test(title)){
			iterateImg(current,appForm_array);
		}
		else if(/^AGREEMENT/.test(title)){  
			iterateImg(current,agreement_array);
		}
		else if(/^ACH/.test(title)){
			iterateImg(current,ach_array);
		}
		else if(/^DISBURSEMENT/.test(title)){
			iterateImg(current,disburst_array);
		}
		else if(/^ADDITIONAL_KYC/.test(title)){
			iterateImg(current,addkyc_array);
		}
		else if(title=="APPLICANT-PHOTO"){
			iterateImg(current,custImg_array);
		}
		else{	
			var temp= 	$(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
			if((temp=="PAN" || temp=="DRIVING-LICENSE" || temp=="AADHAAR" || temp=='PASSPORT'))
			{
				iterateImg(current,kyc_array);
			}else if(temp.indexOf('_EVIDENCE') !== -1){				
				iterateImg(current,evidence_array);
			}
			else{
				iterateImg(current,extra_array);
			}
		}
	});
	
	$(document).on('click', '#addkyc', function(e) {
		$('#addkyc_layout').toggle();
		e.preventDefault();
	});
	$(document).on('click', '#kycdoc', function(e) {
		$('#kycdoc_layout').after().append();
		$('#kycdoc_layout').after().append("<div class='col-md-3'><a href='#myModal' data-toggle='modal' ><div class='preview' ng-style='{'background-image':'url('+image_url4+')'}' accesskey='{{image_url4}}'> <span ng-if='!image_url4'>Document Not available</span></div><label class='control-label'> Income Proof 2</label></a></div>");

	});

	$(document).on('change', '#id_option', function() 
			{
		if(this.value=="PASSPORT"){
			$("#id_number").attr('maxlength','1');
			$('#kyc_text_field, #kyc_submit').slideDown();
			console.log("selected:"+(this).value);

		}
		else if(this.value=="VOTER_ID"){
			$("#id_number").attr('maxlength','2');
			$('#kyc_text_field, #kyc_submit').slideDown();
			console.log("selected:"+(this).value);

		}
		else if(this.value=="DRIVING_LICENSE"){
			$("#id_number").attr('maxlength', '3');
			$('#kyc_text_field, #kyc_submit').slideDown();
			console.log("selected:"+(this).value);

		}

		else if(this.value=="SELECTKYC"){
			$('#kyc_text_field, #kyc_submit').slideUp();
			console.log("selected:"+(this).value);
		}
			});

	$(document).on('click', '#submit_kyc', function(e)

			{
		var id_n = document.getElementById('id_number').value;// text field of number
		var option = document.getElementById('id_option').value;
		var optionid = document.getElementById('id_option');
		var mlength = $("#id_number").attr('maxLength');
		$('#kyc_layout').after().append();
		$('#kyc_layout').after().append("<div class='col-md-3' 'name'='kyc'><input class='form-control' type='text' id="+option+" ng-model="+option+" name="+option+" value="+id_n+" maxlength="+mlength+" /><p></p></div>");
		optionid.remove(optionid.selectedIndex);
		$("#id_number").val("");
		$('#id_number').attr("ng-model"," ");	
		id_n="";

		$('#addkyc_layout').slideUp();
		$('#kyc_text_field').slideUp();
		$('#kyc_submit').slideUp();
		e.preventDefault();

			});
	$(document).on('click', '.preview', function(e) {  //preview click
		var src = $(this).attr("accesskey"); 
		var currentImgID = $(this).attr("name"); 
		$scope.index=0;
		var boxId = $(this).attr("title");
		$(document.body).find('#myModalnew').find('.modal-title').find('h5[class="modal-title"]').remove();
		$(document.body).find('#myModalnew').find('.modal-title').append('<h5 class="modal-title" title='+currentImgID+'>'+boxId+'</h5>');
		$(document.body).find('#img_panel').remove();
		if(src != ''){	
			if(/^APPLICATION_FORM/.test(boxId)){
				appendPanel(appForm_array,boxId);
				for(i=0;i<appForm_array.length;i++){
					if(currentImgID == appForm_array[i].ImageID){
						checkImgStatus(appForm_array[i].img_status);}
				}
			}
			else if(/^AGREEMENT/.test(boxId)){
				appendPanel(agreement_array,boxId);
				for(i=0;i<agreement_array.length;i++){
					if(currentImgID == agreement_array[i].ImageID){
						checkImgStatus(agreement_array[i].img_status);}
				}
			}
			else if(/^ACH/.test(boxId)){
				appendPanel(ach_array,boxId);
				for(i=0;i<ach_array.length;i++){
					if(currentImgID == ach_array[i].ImageID){
						checkImgStatus(ach_array[i].img_status);}
				}
			}
			else if(/^DISBURSEMENT/.test(boxId)){
				appendPanel(disburst_array,boxId);
				for(i=0;i<disburst_array.length;i++){
					if(currentImgID == disburst_array[i].ImageID){
						checkImgStatus(disburst_array[i].img_status);}
				}
			}
			else if(/^ADDITIONAL_KYC/.test(boxId)){
				appendPanel(addkyc_array,boxId);
				for(i=0;i<addkyc_array.length;i++){
					if(currentImgID == addkyc_array[i].ImageID){
						checkImgStatus(addkyc_array[i].img_status);}
				}
	
			}else if(boxId=="APPLICANT-PHOTO"){
				appendPanel(custImg_array,boxId);
				for(i=0;i<custImg_array.length;i++){
					if(currentImgID == custImg_array[i].ImageID){
						checkImgStatus(custImg_array[i].img_status);}
				}
	
			}else{
				findCurrentImg(boxId);
			}
		$(document.body).find('#cirhtml').attr("data", "").hide();
		$(document.body).find('#document_preview').attr("src", src).show();
	}else{
		$(document.body).find('#document_preview').attr("src", "").show();
		$('#approve_rejectPanel').hide();
		$(document.body).find('#cirhtml').attr("data", "").hide();
	}
	});
	
	function appendPanel(arrayData, boxId){
		if(arrayData.length!='1'){
			$('#img_preview').prepend('<div class="row clearfix" id="img_panel" title='+boxId+' style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" src="img/newprev.png" style="opacity:0.5"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" src="img/newnext.png"></div>');
		}
		else{
			$('#img_preview').prepend('<div class="row clearfix" id="img_panel"title='+boxId+'><img id="document_preview" src=""></div>');
		}
		$('#approve_rejectPanel').show();
	}
	function findCurrentImg(name){
		 $scope.index=0;
		 $scope.currImg =0;
		 $(document.body).find('#img_panel').remove();
		 var pointerImg = '';
		 var array=[];
		 
		 if(name == "PAN" || name == "AADHAAR" || name=="PASSPORT" || name=="DRIVING-LICENSE"){
			 array=kyc_array;
			 for(i=0;i<kyc_array.length;i++){
					if(name == kyc_array[i].kyc_name){
						checkImgStatus(kyc_array[i].img_status);}
				}
		 }
		
		 else if(name=="INCOME-PROOF1"){
			 array=income1_array;
			 checkImgStatus(income1_array.img_status);
		 }
		 else if(name=="INCOME-PROOF2"){
			 array=income2_array;
			 checkImgStatus(income2_array.img_status);
		 }
		 else if(name=="OTHER"){
			 array=other_array;
			 checkImgStatus(other_array.img_status);
		 }
		 else if(name.indexOf('_EVIDENCE') !== -1){
			 $('#upload_button').hide();
			 array=evidence_array;
			 for(i=0;i<evidence_array.length;i++){
					if(name == evidence_array[i].kyc_name){
						checkImgStatus(evidence_array[i].img_status);}
				}
		 }
		 else{
			 array = extra_array;
			 for(i=0;i<extra_array.length;i++){
					if(name == extra_array[i].kyc_name){
						checkImgStatus(extra_array[i].img_status);}
				}
		 }

		if(array.length!='1'){
			for(var i=0 ; i<array.length; i++){
				if(array[i].kyc_name == name)
					{
					pointerImg = i;
					$scope.currImg = i;
					$scope.index = i;
					}
			}
			if(pointerImg == 0){
				$('#img_preview').prepend('<div class="row clearfix" id="img_panel" style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" style="opacity:0.5" src="img/newprev.png"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" src="img/newnext.png"></div>');
			}else if(pointerImg == array.length-1){
				$('#img_preview').prepend('<div class="row clearfix" id="img_panel" style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" src="img/newprev.png"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" style="opacity:0.5" src="img/newnext.png"></div>');					
			}else{
				$('#img_preview').prepend('<div class="row clearfix" id="img_panel" style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" src="img/newprev.png"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" src="img/newnext.png"></div>');
			}
		}
		else{
			$('#img_preview').prepend('<div class="row clearfix" id="img_panel"><img id="document_preview" src=""></div>');
		}
		$('#approve_rejectPanel').show();
		$('#uploadNewimgPanel').hide();
	}
	$scope.onchange = function(id) {
		if(id!='Select'){
		$scope.load_details(id,"false");
		}else{
			$scope.load_details($scope.objectSet.oAppReq.sRefID,"true");
		}
	    }
	$(document).on('change', '#losStatusId1', function() 
			{
		var utr = $('#utrData').val();
		var action = $scope.applctnstatus;
		if($(this).val() == "LOS_DISB" && (utr=='' || utr==null) && action.toUpperCase()=="APPROVED"){
			 $(document.body).find('#utrData').prop('disabled', false);
		}else{
			 $(document.body).find('#utrData').prop('disabled', true);
			 $(document.body).find('#utrData').css("border","1px solid #cfcfcf");
		}
		$('#losStatusId1').val(this.value);
		$scope.objectSet.oLosDtls.sStat =this.value;
			});

	
	$scope.saveApprvData=function(){
		$scope.checkValidation=false;
		$('input[type="text"]:visible').each(function(){
			if($(this).css("border")=="1px solid rgb(255, 0, 0)"){
				$scope.checkValidation = true;
			}
		});
		if($('#ApprvValue').val()!='' && $('#tenorValue').val()!='' &&  $('#emiValue').val()!='' && $('#appr1Container').text()!='' && $('#appr2Container').text()!='' && $scope.checkValidation!=true ){
		arrayApprvDesc=[];
		var remark = $('#appr1Container').text().replace("\t",' ');
		var subject = $('#appr2Container').text().replace("\t",' ');
		arrayApprvDesc.push({sJCode:null,sDescrip:null,sDocName:null,sSubTo:subject,sRemark:remark});
		var arr=[];
		var json=null;
	    json={
				'sHeader':{'sAppID':$scope.appltnID,'sInstID':user.institutionID,'sCroId':$scope.userid},
				'sRefID':$scope.refID,
				'sAppStat':"Approved",
				"aCroJustification":arrayApprvDesc,
				"bApprAmtExist":true,
				"dApprAmt":$('#ApprvValue').val(),
				"iTenor":$('#tenorValue').val(),
				"dEmi":$('#emiValue').val(),
				"aDedupeRefID": ($scope.objectSet.aDeDupe ? $scope.objectSet.aDeDupe : arr)
				}
		 requestForStatus(json);
		 $('#approveReason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#appr1Container, #appr2Container,#approvemsg').text('');
		 $('#ApprvValue , #emiValue , #tenorValue').css("border","1px solid #999");
		}else{
			$('#approvemsg').text("Please fill all the field");
		}
	}
	$scope.saveDclnData=function(){
		if($('#reason1container').text()!='' && $('#reason2container').text()!=''){
		var remark = $('#reason1container').text().replace("\t",' ');
		var subject = $('#reason2container').text().replace("\t",' ');
		arrayDclnDesc.push({sJCode:null,sDescrip:null,sDocName:null,sSubTo:subject,sRemark:remark});
		var arr=[];
		 var json = {
					"sRefID":$scope.refID,
					'sHeader':{'sAppID':$scope.appltnID,'sInstID':user.institutionID,'sCroId':$scope.userid},
					"sAppStat":"Declined",
					"aCroJustification":arrayDclnDesc, //not yet
					"aDedupeRefID ": ($scope.objectSet.aDeDupe ? $scope.objectSet.aDeDupe : arr)
					};
		 requestFordecline(json);
		 $('#declinereason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#reason1container,#reason2container').text("");
		 $('#declinemsg').text("");
		}else{
			$('#declinemsg').text("Please fill all the field");
		}
	}
	
	$(document.body).on('change','select[id="select_addr"]',
			function() {
		var value = "#"+ $(this[this.selectedIndex]).val();
		if ($('#addr_detail').is(':parent')) {
			$('#addr_detail').children().hide();
		}
		$(value).show();
	});
	
	function checkImgStatus(status){
		if(status=="Approve"){
			 $(document.body).find("#apprv").addClass("btn-success");
			 $(document.body).find("#rjct").addClass("btn-default");
			 $(document.body).find("#rjct").removeClass("reject");
			 $(document.body).find("#apprv").removeClass("btn-default");
		}else if(status=="Reject"){
			 $(document.body).find("#rjct").addClass("reject");
			 $(document.body).find("#apprv").addClass("btn-default");
			 $(document.body).find("#apprv").removeClass("btn-success");
			 $(document.body).find("#rjct").removeClass("btn-default");
		}else{
			 $(document.body).find("#rjct").addClass("btn-default");
			 $(document.body).find("#apprv").addClass("btn-default");
			 $(document.body).find("#apprv").removeClass("btn-success");
			 $(document.body).find("#rjct").removeClass("reject");
		}
	}

	$scope.updateLosData = function(status){	  
	var losStat = status;
	var losId = $('#losId').val();
	var utr = $('#utrData').val();
	if(($('#utrData').prop("disabled")==false && utr!='') || ($('#utrData').prop("disabled")==true && utr=='')){
	if(losId != "" && losStat !="Select"){
		 var jsondata=	 {
				    "sRefID":$scope.refID,
				    "oHeader":{
				         "sAppID":$scope.objectSet.sAppID,
				         "sInstID":user.institutionID,
				         "sSourceID":"WEB",
				         "sAppSource":"WEB",
				         "sReqType":"JSON",
				         "sCroId":$scope.userid
				    },
				    "oLosDtls":{
				        "sLosID":losId,
				        "sStat":losStat,
				        "sUtr":utr
				    }
				}	 
		 var URL='update-los-details';
		 RestService.saveToServer(URL,jsondata).then(function(Response){
				console.log("Response: "+JSON.stringify(Response));
				if(Response.STATUS == "SUCCESS"){
					alert("LOS Status updated successfully");
					 $(document.body).find('#utrData').prop('disabled', true);
					 $(document.body).find('#losId').prop('disabled', true);
					 $(document.body).find('#utrData').css("border","1px solid #cfcfcf");
					 $(document.body).find('#losId').css("border","1px solid #cfcfcf");
				}else{
					alert("LOS Status is not updated successfully");
				}
		 });
		}
	}
}
	
	
	$(document).on('click', '#btn_close', function(e) {
		e.preventDefault();
		$(this).parent().parent().hide();
	});


	$(document).on('click', '#minimize', function(e) {
		$(this).parent().parent().animate({
			height : '30px'
		}, 200);
		e.preventDefault();
	});
	$(document).on('click', '#maxmize', function(e) {
		$(this).parent().parent().animate({
			height : '250px'
		}, 200);
		e.preventDefault();
	});
	 $rootScope.onFileSelect = function($files) 
	   {       
		   $scope.status = ''; 
		   $scope.uploadedImg ="";
		   var imageName = $(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
	  			for (var i = 0; i < $files.length; i++) 
	  			{    	
	  				fname=$files[0].name
	  		    	var re = (/\.(jpg)$/i);
	  				if(!re.exec(fname))
	  		    	{
	  		    	alert("File extension not supported!");
	  		    	break;
	  		    	}
	  				var $file = $files[i];
	  				var base64;
	  				var  reader=new FileReader();
	  				if ($files[i] && $file) {
	  					 var binaryString;
				        reader.onload = function(readerEvt) {
				            binaryString = readerEvt.target.result;
				            base64 = binaryString;
				            if(base64.split(",")[1].substring(0, 13) == "/9j/4AAQSkZJR"){
				        	if($("#imgpreview1").attr("src")== undefined || $("#imgpreview1").attr("src")== ''){
				        		 var json1 ={
					  					  "oHeader": {
					  					    "sAppID": $scope.objectSet.sAppID,
					  					    "sApplID": $scope.objectSet.sApplID,
					  					    "sInstID": user.institutionID
					  					  },
					  					  "sRefID": $scope.objectSet.oAppReq.sRefID,
					  					  "oUpldDtl": {
					  					    "sFileID": "1",
					  					    "sFileName": imageName+"_EVIDENCE1",
					  					    "sFileType": "JPG",
					  					    "sfileData":  base64.split(",")[1],
					  					    "sStat": $scope.statusVal,
					  					    "sReason":$('#reason').val()
					  					  }
					  					};
						        uploadImgSevice(json1 , '1');
				        	}
				        	else if(($("#imgpreview2").attr("src")== undefined || $("#imgpreview2").attr("src")== "") && $("#imgpreview1").attr("src")!= undefined){
				        		 var json2 ={
					  					  "oHeader": {
					  					    "sAppID": $scope.objectSet.sAppID,
					  					    "sApplID": $scope.objectSet.sApplID,
					  					    "sInstID": user.institutionID
					  					  },
					  					  "sRefID": $scope.objectSet.oAppReq.sRefID,
					  					  "oUpldDtl": {
					  					    "sFileID": "1",
					  					    "sFileName": imageName+"_EVIDENCE2",
					  					    "sFileType": "JPG",
					  					    "sfileData":  base64.split(",")[1], //sFileData
					  					    "sStat": $scope.statusVal,
					  					    "sReason":$('#reason').val()
					  					  }
					  					};
						        console.log("updated file2: ");
						        uploadImgSevice(json2 , '2');
				        	}
				        	else{
				        		alert("You have max limit of 2 images! ");
				        	}
				           }else{
				            	alert("File Type Not Supported");
				           }
				        };
				        reader.readAsDataURL($files[i]);
				        $timeout(function() {
						}, 3000);
	  			}
	  		}
	   }
	 $(document.body).find('#apprv').click(function(e){
			 $(this).addClass("btn-success");
			 $(document.body).find("#rjct").removeClass("reject");
			 $(document.body).find("#apprv").removeClass("btn-default");
			 $(document.body).find("#rjct").addClass("btn-default");
			 $(document.body).find('#reason').hide();
			 $(document.body).find('#submitreason').hide();
			 $(document.body).find('#reason').val("");
			 $scope.statusVal = $(this).text();
			 var imageId = $(document.body).find('#myModalnew').find('.modal-title').find('h5').attr("title");
			 var imageName = $(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
			 var json ={
 					  "oHeader": {
 					    "sAppID": $scope.objectSet.sAppID,
 					    "sApplID": $scope.objectSet.sApplID
 					  },
 					  "sRefID": $scope.objectSet.oAppReq.sRefID,
 					  "sImageID":imageId,
 					  "oUpldDtl": {
 					    "sStat": "Approve",
 					    "sReason":""
 					  }
 					};
			 console.log("approve : "+JSON.stringify(json));
			 ImgSevice(json,imageName);
			 e.stopImmediatePropagation();

		});

	 $(document.body).find('#rjct').click(function(e){
		 	if($(this).attr("class")!="btn mybtn reject"){
		 		 $(this).addClass("reject");
				 $(document.body).find("#apprv").addClass("btn-default");
				 $(document.body).find("#apprv").removeClass("btn-success");
				 $(document.body).find("#rjct").removeClass("btn-default");
				 $(document.body).find('#reason').show();
				 $(document.body).find('#submitreason').show();
				 $scope.statusVal = $(this).text();
		 	}
			 e.stopImmediatePropagation();

		});
	 $(document.body).find('#submitreason').click(function(e){
			 var imageId = $(document.body).find('#myModalnew').find('.modal-title').find('h5').attr("title");
			 var imageName = $(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
			 var reason =  $(document.body).find('#reason').val();
			 var json ={
 					  "oHeader": {
 					    "sAppID": $scope.objectSet.sAppID,
 					    "sApplID": $scope.objectSet.sApplID
 					  },
 					  "sRefID": $scope.objectSet.oAppReq.sRefID,
 					  "sImageID":imageId,
					  "oUpldDtl": {
					    "sStat": "Reject",
					    "sReason":reason
					  }
 					};
			 ImgSevice(json,imageName);
			 rejectArray.push({Name: imageName,Image:"",Reason:reason});
			 $(document.body).find('#reason, #submitreason').hide();
			 e.stopImmediatePropagation();
		});
	    function ImgSevice(json,name){
	    	var URL ='update-image-status';
	    	 RestService.saveToServer(URL,json).then(function(Response){
					if(Response.sStatus == "SUCCESS"){
						var currStatus = json.oUpldDtl.sStat;
						var currReason = json.oUpldDtl.sReason;
						var id= json.sImageID;
						if(name=="PAN" ||name == "AADHAAR" ||name == "DRIVING-LICENSE" ||name == "PASSPORT"){
							updateStatus(name,id,kyc_array ,currStatus,currReason)
						}else if(name=="INCOME-PROOF1"){  
							updateStatus(name,id,income1_array ,currStatus,currReason);
						}
						else if(name=="INCOME-PROOF2"){
							updateStatus(name,id,income2_array ,currStatus,currReason);
						}
						else if(name=="APPLICANT-PHOTO"){
							updateStatus(name,id,custImg_array ,currStatus,currReason);
						}
						else if(name=="OTHER"){
							updateStatus(name,id,other_array ,currStatus,currReason);
						}
						else if(/^APPLICATION_FORM/.test(name)){
							updateStatus(name,id,appForm_array ,currStatus,currReason);
						}
						else if(/^AGREEMENT/.test(name)){
							updateStatus(name,id,agreement_array ,currStatus,currReason);
						}
						else if(/^ACH/.test(name)){
							updateStatus(name,id,ach_array ,currStatus,currReason);
						}
						else if(/^DISBURSEMENT/.test(name)){
							updateStatus(name,id,disburst_array ,currStatus,currReason);
						}
						else if(/^ADDITIONAL_KYC/.test(name)){
							updateStatus(name,id,addkyc_array ,currStatus,currReason);
						}
						else if(name.indexOf('_EVIDENCE') !== -1){
							updateStatus(name,id,evidence_array ,currStatus,currReason);
						}
						else{
							updateStatus(name,id,extra_array ,currStatus,currReason);
						}					
					}
	    	 });
	    }
	    function updateStatus(name,id,array,status,reason){
	    	for(i=0 ; i<array.length ; i++){
				if(name == array[i].kyc_name && id==array[i].ImageID){
					if(status == "Reject"){
						array[i].img_reason = reason; 
					}else{
						array[i].reason ='';
					}
					array[i].img_status =status; }
				}
	    }
	    
		function uploadImgSevice(jsondata , index ){
			var URL = 'upload-image';
			 RestService.saveToServer(URL,jsondata).then(function(Response){
					if(Response.sStatus == 'SUCCESS'){
						var image = "data:image/jpg;base64,"+jsondata.oUpldDtl.sfileData;
						var imageName = jsondata.oUpldDtl.sFileName.slice(0, -10); 
						if(index == '1'){
						$("#imgpreview1").show();
							$rootScope.uploadedImg1 = image;
							$("#imgpreview1").attr("src",image);
							addToArray(imageName,image);
						}
						else if(index == '2'){
							$("#imgpreview2").show();
							$rootScope.uploadedImg2 = image;
							$("#imgpreview2").attr("src",image);
							addToArray(imageName,image);
						}
						else{
							console.log("approved declined");
						}
					}
			 });
		}
	function addToArray(name,image){
		if(name=="PAN" ||name == "AADHAAR" ||name == "DRIVING-LICENSE" ||name == "PASSPORT"){
			kyc_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}else if(name=="INCOME-PROOF1"){
			income1_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(name=="INCOME-PROOF2"){
			income2_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(name=="APPLICANT-PHOTO"){
			custImg_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(name=="OTHER"){
			other_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(/^APPLICATION_FORM/.test(name)){
			appForm_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(/^AGREEMENT/.test(name)){
			agreement_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(/^ACH/.test(name)){
			ach_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(/^DISBURSEMENT/.test(name)){
			disburst_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else if(/^ADDITIONAL_KYC/.test(name)){
			addkyc_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}
		else{
			extra_array.push({kyc_name:name,image:image, ImageID:"",img_status:"", img_reason:""});
		}	
	
	
	}
	 function checkRejectedImg(array){
			 for(i=0;i<array.length;i++){
				 if(array[i].img_status == "Reject"){
						$scope.rejectFlag = true;
						rejectArray.push({Name: array[i].kyc_name,Image:"",Reason:array[i].img_reason});
						return;
				 }
			 }	 
	 }
	 
	
	 $(document.body).on("keyup",'input',function(e) {
			if ($(this).attr("id") != "appno") 
			{
				var val = $(this).val();
				if($(this).attr("id")=="reason" || $(this).attr("id")=="descReason"){
					if (!(/^[a-zA-Z0-9&!.$\-,(): ]+$/.test(val))) {
						error = 1;
						$(this).css("border","1px solid red");
					} else {
						error = 0;
						$(this).css("border","1px solid green");
					}
				}
				else if($(this).attr("id")=="losId" || $(this).attr("id")=="utrData"){
					if (!(/^[a-zA-Z0-9]+$/.test(val))) {
						error = 1;
						$(this).css("border","1px solid red");
					} else {
						error = 0;
						$(this).css("border","1px solid green");
					}
				}
				else if($(this).attr("id")=="ApprvValue" || $(this).attr("id")=="emiValue" || $(this).attr("id")=="tenorValue"){
					if (!(/^[0-9]+$/.test(val))) {
						error = 1;
						$(this).css("border","1px solid red");
					} else {
						error = 0;
						$(this).css("border","1px solid green");
					}
				}
			}
		});
	 
	 $("#loadMoreRecord").click(function(){
		 $scope.minVal = $scope.minVal+ $scope.limit; 
		 polling($scope.minVal);
	 });
	/******************* Reinitiate & Update *****************/
	$scope.dobFormat = "dd/MM/yyyy";
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

    $scope.enableForm=function(){
        $scope.nameOld=$scope.name;
        $scope.dobOld=$scope.dob;
        
        $scope.resAddr1Old=$scope.dob;
        $scope.resAddr2Old=$scope.dob;
        $scope.resAddr3Old=$scope.dob;
        $scope.resCityOld=$scope.dob;
        $scope.resStateOld=$scope.dob;
        $scope.resPincodeOld=$scope.dob;
        $scope.resMonthlyRentOld=$scope.dob;
        $scope.resAddrTypeOld=$scope.dob;
        $scope.resStayMonthOld=$scope.dob;
        $scope.resCityStayMonthOld=$scope.dob;
        
        $scope.isUpdating=!$scope.isUpdating;
        
        if($scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs!=null){
            var isAadhaarPresent=false;
            var isVoterPresent=false;
            var isPanPresent=false;

            for(var i=0;i<$scope.details.oReq.oApplicant.aKycDocs.length;i++){
                if($scope.details.oReq.oApplicant.aKycDocs[i].sKycName.toLowerCase().indexOf("aadhar")>=0){
                    isAadhaarPresent=true;
                }
                
                if($scope.details.oReq.oApplicant.aKycDocs[i].sKycName.toLowerCase().indexOf("pan")>=0){
                    isPanPresent=true;
                }
                
                if($scope.details.oReq.oApplicant.aKycDocs[i].sKycName.toLowerCase().indexOf("voter")>=0){
                    isVoterPresent=true;
                }
            }
            
            if(!isAadhaarPresent){
                var newKYC={
                    sExpiryDate:null,
                    sIssueDate:null,
                    sKycName:"AADHAR",
                    sKycNumber:"",
                    sKycStat:null
                }
                
                $scope.details.oReq.oApplicant.aKycDocs.push(newKYC);
            }
            
            if(!isVoterPresent){
                var newKYC={
                    sExpiryDate:null,
                    sIssueDate:null,
                    sKycName:"VOTERID",
                    sKycNumber:"",
                    sKycStat:null
                }
                $scope.details.oReq.oApplicant.aKycDocs.push(newKYC);
            }
            
            if(!isPanPresent){
                var newKYC={
                    sExpiryDate:null,
                    sIssueDate:null,
                    sKycName:"PAN",
                    sKycNumber:"",
                    sKycStat:null
                }
                $scope.details.oReq.oApplicant.aKycDocs.push(newKYC);
            }
        }
        /* dob popup */     
        $scope.openDOBDialog=function(){
            
            $scope.dobPopup.opened = true;          
        };      
        /* dob popup */
    };

    $scope.updateForm=function(){
        
        $scope.isUpdating=!$scope.isUpdating;
        
        console.log("Updating form : ");
        console.log($scope.objectSet);
        
        $scope.showReinitiateModal("lg",$scope.currentApplicationFormRefID,$scope.objectSet.oAppReq);
    };
    
    $scope.onValueChanged=function(valueChanged){
        console.log("Value Changed :"+valueChanged);
    };  
    
    $scope.showReinitiateModal = function (size,refID,applicantFormObject) {
         //alert('modal baseURL'+baseURL);
         var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './views/modal-reinitiate.html',
            controller: 'ReinitiateModalController',
            size: size,
            resolve: {
                refID:function(){
                    return refID;
                },
                applicantFormObject:function(){
                    return applicantFormObject;
                }
            }
         });
    };
    
    $scope.getStateCity=function($event,address){
        
        console.log("getStateCity");
        console.log(address);
        var pin=$event.target.value;
        
        address.sCity="";
        address.sState="";
        
        if(pin.length==6){
            //alert($event.target.value);

            var pinJson ={"oHeader":{"sInstID":user.institutionID},"sQuery":pin}; 
            
            RestService.saveToServer("pincode-details-web",pinJson).then(function(data){
                if(data!=""){
                    address.sCity=data.sCity;
                    address.sState=data.sState;
                }
                //console.log(data);
            });
        };
    };
}]);


app.controller("ReinitiateModalController",["$scope","RestService","refID","applicantFormObject",function($scope,RestService,refID,applicantFormObject){
    $scope.refID = refID;
    $scope.applicantFormObject = applicantFormObject;
    
    var reinitiateModules=[
                                {sModuleName : "101", bRunModule : false},
                                {sModuleName : "201", bRunModule : false},
                                {sModuleName : "202", bRunModule : false},
                                {sModuleName : "301", bRunModule : false},
                                {sModuleName : "302", bRunModule : false},
                                {sModuleName : "401", bRunModule : false},
                                {sModuleName : "402", bRunModule : false}
                            ];
//  var reinitiateModules=[
//                          {main:"MB" ,subs: [{name:"Cibil",id:101}]},
//                          {main:"KYC" , subs: [{name:"PAN",id:201},
//                                               {name:"Aadhaar",id:201}]},
//                          {main:"Dedupe" , subs: [{name:"Dedupe",id:301},
//                                                  {name:"Negative Pin Code",id:302}]},
//                          {main:"SOBRE" , subs: [{name:"Verificaton scoring",id:401},
//                                                 {name:"Application scoring",id:402}]}
//                       ];
    $scope.tab = 0;
    $scope.tabSuccess=[true,false,true,false];
    
    $scope.tags = [];

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

    $scope.getTabStyle=function(pTab){
        //console.log("pTab:"+pTab);
        var val="";
        if(pTab==$scope.tab){
            //This tab is active
            val={
                    color:"white",
                    background:$scope.getColor(pTab),
                    outline:null
                };
        }else{
            //This tab is not active
            val={
                    color:$scope.getColor(pTab),
                    border:"1px solid "+$scope.getColor(pTab)
                }
        }
        return val;
    };
    
    $scope.getTabStyle=function(pTab){
        //console.log("pTab:"+pTab);
        var val="";
        if(pTab==$scope.tab){
            //This tab is active
            val= {
                    color:"white",
                    background:$scope.getColor(pTab),
                    outline:null
                    };
        }else{
            //This tab is not active
            val= {
                    color:$scope.getColor(pTab),
                    border:"1px solid "+$scope.getColor(pTab)
                }
        }
        return val;
    };
    
    $scope.getOptionStyle=function(pTab){
//      console.log("pTab:"+pTab);
        var val="";
        //This tab is not active
        val= {
                color:$scope.getColor(pTab),
                outline:null        
            }
        return val;
    };
    
    $scope.getColor=function(pTab){
        if($scope.tabSuccess[pTab]){ //Color code == green
            return "#22ab4a";
        }else{
            return "#ee1f23";
        }
    };
    
    $scope.addTag=function(pTag,tagId){
        //alert(pTag);
        var tagFound=false;
        
        for(var i=0;i<$scope.tags.length;i++)
        {
            if($scope.tags[i].text==pTag){
                tagFound=true;
                break;
            }
        }
        if(tagFound!=true)
        {
            $scope.tags.push({text: pTag,id:tagId});
        }
    };
    
    $scope.reinitiateForm=function(){
        console.log("Reinitiate form :"+$scope.refID);
        
        var moduleArr=[];
        for(var i=0;i<$scope.tags.length;i++){
            console.log("Reinitiating :"+$scope.tags[i].id+" "+$scope.tags[i].text);
            
            for(var j=0;j<reinitiateModules.length;j++)
            {
                if(reinitiateModules[j].sModuleName==$scope.tags[i].id){
                    reinitiateModules[j].bRunModule=true;
                }               
            }
        }
        
        if(applicantFormObject==null){
            var requestJson={
                    sGngRefId:$scope.refID,
                    aModuleConfig:reinitiateModules
            };

            var URL="/worker/reprocess-by-id/";

            RestService.saveToServer(URL,JSON.stringify(requestJson)).then(function(Response){
                if(Response !=null || Response!= undefined || Response!=""){
                }
            });
        }else{
            var requestJson={
                sWorkFlowConfig : {
                    sGngRefId : $scope.refID,
                    aModuleConfig : reinitiateModules
                },
                oApplicationRequest : applicantFormObject
            };

            var URL="/worker/reprocess-updated/";

            RestService.saveToServer(URL,JSON.stringify(requestJson)).then(function(Response){
                if(Response !=null || Response!= undefined || Response!=""){
                }
            });
        }
    };
    
}]);

app.directive('selectRequired',function(){
    return {
        restrict: "A",
        require:"ngModel",
        link: function(element,scope,attr,controller){

            controller.$validators.selectrequired = function(modelValue){                   
                return modelValue === '' || modelValue.startsWith('Select') ? false : true;
            }
        }
    }
});

app.directive('thisEarlierThan', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            var cityStay,residenceStay;

            scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
                residenceStay = newVal;
                check();
            });

            scope.$watch(attrs.thisEarlierThan, function (newVal, oldVal, scope) {
                cityStay = newVal;
                check();
            });

            var check = function () {
                if (typeof cityStay === 'undefined' || typeof residenceStay === 'undefined') {
                    return;
                }

                if (!validate(cityStay)) {
                    return;                     
                }

                if (!validate(residenceStay)) {
                    return;                     
                }

                if (parseInt(cityStay) >= parseInt(residenceStay)) {
                    ctrl.$setValidity('thisEarlierThan', true);
                }
                else {
                    ctrl.$setValidity('thisEarlierThan', false);
                }

                return;
            };

            var validate = function (iYears) {                  
                if (isNaN(parseInt(iYears))) {
                    return false;
                }
                else {
                    return true;
                }                   
            };
        }
    };
});

app.directive('updateCityState',function(RestService,BASE_URL_GNG,UserService){
    return{
        restrict: 'A',
        require: 'ngModel',
        scope : {
            pin: '='
        },
        priority:2,
        link: function(scope, elm, attrs, ngModelCtrl) {
            if (attrs.type === 'radio' || attrs.type === 'checkbox') 
                return;
            
            var pinJson ={"oHeader":{"sInstID":UserService.getCurrentUser().institutionID},"sQuery":'202521'}; 
            
            console.log(scope);
            
            scope.$watch('pin', function(newVal,oldVal){
                console.log(newVal);
                console.log(oldVal);
            },true);
            
            var state,city;
            RestService.saveToServer("pincode-details-web",pinJson).then(function(data){
                
                city = data.sCity || '';
                state = data.sState || ""; 
                
                console.log(city);
                
                if(attrs.fetchModels){
                    var array = attrs.fetchModels.split('|'),
                    state = array[0],
                    city = array[1];
                    
                }
                
            });
        
            console.log("element value: "+elm.val());
            if(elm.val()!="" && elm.val().length==6){
                
            }else{
                return;
            }           
        }
    }
});

app.directive('changeOnBlur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        priority:1,
        link: function(scope, elm, attrs, ngModelCtrl) {
            if (attrs.type === 'radio' || attrs.type === 'checkbox') 
                return;

            var expressionToCall = attrs.changeOnBlur;

            var oldValue = null;
            elm.bind('focus',function() {
                oldValue = elm.val();
                //console.log(oldValue);
            })
            elm.bind('blur', function() {
                scope.$apply(function() {
                    var newValue = elm.val();
                    //console.log(newValue);
                    if (newValue !== oldValue){
                        scope.$eval(expressionToCall);
                    }
                        //alert('changed '  oldValue);
                });         
            });
        }
    };
});


app.directive("whenScrolled",function(){
    return function(scope, elm, attr) {
      var raw = elm[0];
      elm.bind('scroll', function() {
        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          scope.$apply(attr.whenScrolled);
        }
      });
    };
  })

app.filter('dateFormat', function() {
	return function(item) {
		var month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec' ];

		var curdate= new Date(new Date());
		var dt=curdate.getDate();
		var mnth=curdate.getMonth()+1;
		var year=curdate.getFullYear();
		
		var receivedDay = new Date(item).getDate();
		var receivedMon = new Date(item).getMonth()+1;
		
		if(receivedDay == dt && receivedMon== mnth){
			var time = new Date(item).getHours()+":"+new Date(item).getMinutes()+":"+new Date(item).getSeconds();
			result = time;
		}else if(receivedDay == dt-1 && receivedMon== mnth){
			result='Yesterday';	
		}else{
			result  = receivedDay+"-"+month[new Date(item).getMonth()]+"-"+new Date(item).getFullYear();
		}	
		return result;
	};
});

	app.filter('currency', function() {
	return function(value, symbol) {
		if(value != undefined){
		if ($.isNumeric(value) || value.length >3 ) {
			value = value.toString();
			for (var i = 0; i < value.length; i++)
				value = value.replace(",", "");
			var lastThree = value.substring(value.length - 3);
			var otherNumbers = value.substring(0, value.length - 3);
			if (otherNumbers != '')
				lastThree = ',' + lastThree;
			var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",")+ lastThree;

			return symbol + res;
		}}
		return value;		
	};
});


}).call(this)