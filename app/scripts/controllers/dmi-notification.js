;(function(){

	'use strict';

	var app=angular.module('gonogo').controller('DMINotifController', ['$scope','$rootScope', '$http', 
'$timeout','Validation','$filter','BASE_URL_DMI',function($scope, $rootScope ,$http ,$timeout,Validation,$filter,BASE_URL_DMI) 
{
	var height=$(window).height()-200;
//	var serviceUrl ='http://gng.softcell.in/GoNoGo';
	
//	var serviceUrl = URLService.url();
//	console.log("serviceUrl :"+serviceUrl);
	
	$scope.bureau = [];
	$scope.kyc_data =[];
	$scope.assetData =[];
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
	$scope.setFlag = false;
	$scope.countSelected="Select";
	$scope.set={}; 
	$(document.body).find('#OfferBox0').css("background-color","#F4F8F9");
//	var docData[0].Offers.attr('selected','true');
	/*$('.leftbar_scroll').css("height", height-33);
	$('#applicant_panel').css("height", height-20);
*/
	/*if($scope.authenticate('NCONTAINER') == false){
		var fragment = $(document.body).find('#application-main-container');//("#application-main-container") ;
		$(document.body).find('#applicant_panel_cro2')append().innerHTML = fragment.context.innerHTML;
//		$('#applicant_panel').append("<div id='sayali'></div>");
	}*/
	// check offers access to this user.
	var offersAllowed = $scope.authenticate('NOFRS');
	var crodefault = $scope.authenticate('NAPPDATADEF'); // true for 1 and 2
	var croQueue = $scope.authenticate('NCROQUE'); //true for 1 and 9

	var st = 1;
	var treeData = [], map;
	$rootScope.template ="notification";
	polling();
	
//************************************fetching data from gonogo server************************************************************	
	function polling() {
		if($rootScope.template == "notification")
  		{
			if(!crodefault)
			{var json ={'sCroID':"STA", //default
						'sInstID':$scope.InstitutionID,
						'sGrpID':"0"}
			}
			else{var json ={'sCroID':"default", //default
						'sInstID':$scope.InstitutionID, 
						'sGrpID':"0"}
				}
			if (st == 1)
			{		var URL;
					URL = BASE_URL_DMI+'cro-queue';
				$http({
					method : 'POST',
					url : URL,
					data :json,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(Response){
					console.log("find all method :"+JSON.stringify(Response));
					if(Response !=null || Response!= undefined || Response!=""){
					$scope.notifarray = Response;
					st = 2;
					$scope.error ="";
					}
					else{
						$scope.notifarray = Response;
					}
				}).error(function(erro){
					$scope.error = "System is under maintenance..Please try later";
				});
	
			} else {
					var URL;
					URL = BASE_URL_DMI+'cro-queue';
				$http({
					method : 'POST',
					url : URL,
					data :json,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(Response){
						if(Response !=null || Response!= undefined || Response!=""){
								$scope.notifarray = Response;
								$scope.error ="";
						}
						else{
							$scope.notifarray = Response;
						}
				}).error(function(data){
//					$scope.error = "System is under maintenance..Please try later";
				});
			}
			$timeout(function() {
				polling();
			}, 30000);
  		}
	}
//	**************************end****************************************************************
	// variables for application re processing page
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
	                  
	$scope.employment_type = $scope.jobType[0];
	$scope.addr_type = $scope.addrType[0];
	$scope.time_employer =  $scope.timeataddress[0];
	// end variable default value section
	var dataset = [{'Name':'Auto Loan',
		'ID':'0',
		'Icon':'img/icons_auto.png',
		'Count':'2',
		'Type' : 'Approve',
		'Offers':[{'Name':'Refinance your Auto Loan at 12% APR','Icon':'img/icons_auto.png'},
		          {'Name':'Get up-to 60% discounts on Auto Insurance ','Icon':'img/icons_auto.png'}]
	},
	{'Name':'Personal Loan',
		'ID':'1',
		'Icon':'img/icon-personal-loan.png',
		'Count':'1',
		'Type' : 'Approve',
		'Offers':[{'Name':'Avail 10% of your sanctioned Home Loan amount at zero processing charges','Icon':'img/icon-personal-loan.png'}]
	},
	{'Name':'Credit Card',
		'ID':'2',
		'Icon':'img/Credit_Card.png',
		'Count':'4',
		'Type' : 'Approve',
		'Offers':[{'Name':'5000 INR cash-back if you pay the Home Loan processing fee using your new credit card','Icon':'img/Credit_Card.png'},
		          {'Name':'0% on New purchases for the first three months ','Icon':'img/Credit_Card.png'},
		          {'Name':'Credit Card with no credit limit cap','Icon':'img/Credit_Card.png'},
		          {'Name':'Consolidate your balances for 6% APR for the first 6 months','Icon':'img/Credit_Card.png'}]
	},
	{'Name':'Home Insurance',
		'ID':'3',
		'Icon':'img/Home_Insurance.png',
		'Count':'3',
		'Type' : 'Approve',
		'Offers':[{'Name':'50% discount on Premium for long-term Home Insurance policy ','Icon':'img/Home_Insurance.png'},
		          {'Name':'10% discount on the Home Content Insurance for covers upto 4 Lakh Rupees ','Icon':'img/Home_Insurance.png'},
		          {'Name':'Protect your home for 20 years with a single premium','Icon':'img/Home_Insurance.png'}]
	}];
//****************************documents allowed data************************************************************
	docData = [{'Name':'Address Proof',
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
/*	{'Name':'Rejected Proof',
		'ID':'4',
		'Icon':'img/rejected proof.png',
		'Count':'5',
		'Offers':[]
	}*/
	];

//	****************************************load customer data********************************************************************
	$scope.load_details = function(CustID,flag)
	{  
		var URL='';
		var json ={'sRefID':CustID};
//		console.log("CustID: "+CustID);
			URL = BASE_URL_DMI+'application-data';
			if(flag == "true"){
				$('#approve , #decline, #onhold').show();
//				 $("#dedupe , #dedupe1").val("Select");
			}else{
				$('#approve , #decline, #onhold').hide();
			}
		
		$http({
			method : 'POST',
			url : URL,
			data : json,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
			{
			console.log("Response: "+JSON.stringify(Response));
			$rootScope.fullData = Response;
			$(document.body).find('#cirhtml').attr("data", "").hide();
			$scope.error = "";
			$scope.done = "";
			$scope.appScore ='';
			$scope.tree ='';
			$scope.pdf ='';
			$scope.empTime='';
			$('#descReason').val("");
			$("#approvemsg").text("");
			$scope.rejectFlag = false;
			
			try{$scope.empTime=ageCalculator()}catch (e) {
				// TODO: handle exception
			}
			kyc_array=[];appForm_array=[];disburst_array=[];agreement_array=[];extra_array=[];evidence_array=[];
			ach_array=[];addkyc_array=[];ach_array=[];arrayDesc=[];arrayDclnDesc=[];
//			$('div[id^="OfferBox"]').css("background-color","#fff");
			$(document.body).find('#OfferBox0').css("background-color","#F4F8F9");
//			$(document.body).find('#OfferBox0').css("background-color","#F4F8F9");

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
			$scope.radd = '';
			$scope.padd = '';
			$scope.DOB  = '';
			$scope.ID = '';
			$scope.sign = '';
			$scope.panIMG = '';
			$scope.apPhoto = '';
			$scope.grsAnnual='';
			$scope.radd ='';
			$scope.padd ='';
			$scope.DOB='';
			$scope.ID='';
			$scope.sign='';
			$scope.panIMG='';
			$scope.apPhoto='';
			$scope.PresentAdd=false;
			$scope.PermanentAdd=false;
			$scope.Date = false;
			$scope.Identification = false;
			$scope.Signature =false;
			$scope.PANflag = false;
			$scope.Applicant =false;
			temp=[];
			passport=[];
			dlicen=[];
			adhar=[];			
			$rootScope.uploadedImg1 ='';
			$rootScope.uploadedImg2 ='';
//			$scope.extra = '';
			
			//new variable for eligibility
			$scope.appScoreEligibilityAmount="";
			$scope.appScoreEligibilityTenor="";
			$scope.appScoreEligibilityDownPayment="";
			$scope.appScoreEligibilityDecision="";
			$scope.apprAmount = '';
			$scope.decisionRep="";
			$scope.DetailsResp=[];
			$scope.Emi ="";
			$scope.dealership ="";
			
			$scope.panpresent =false;
			$scope.adharpresent =  false; 
			$scope.passportPresents =false;
			$scope.dLPresent = false;
			$scope.income1Present = false;
			$scope.income2Present = false;
			$scope.custPresent = false;
			$scope.otherPresent = false;
			$scope.extraPresent=false;
			
			$rootScope.fullData = Response;
			$rootScope.applicantID = Response.oAppReq.oReq.oApplicant.sApplID;
			$scope.kycid =Response.oAppReq.oReq.oApplicant.sApplID;
			$rootScope.applicationID = Response.oAppReq.sRefID;
			$rootScope.applicID = Response.oAppReq.oHeader.sAppID;
			$scope.yrAnnual = Response.oAppReq.oReq.oApplicant.oIncomeDetails.oSalriedDtl.dNetIncm;
			try{$scope.grsAnnual = Response.oAppReq.oReq.oApplicant.aEmpl[0].dGrossSal;}
			catch(e){$scope.grsAnnual =0;}
			var data = 	$scope.notifarray;
			/*for (j in data)
			{
				if(data[j].sAppId == $rootScope.applicationID){
					$scope.applctnstatus = data[j].sStat;
				}
			}		*/
			for (j in data)
			{if(data[j].sRefID == $rootScope.applicationID){
					$scope.applctnstatus = data[j].sStat;}
			}
			$rootScope.details = Response.oAppReq;
			$rootScope.applicant = Response.oAppReq.oReq.oApplicant;
			$scope.kyc_data = Response.oAppReq.oReq.oApplicant;
			$scope.kyc_status = Response.oIntrmStat.oPanResult; 
			$scope.cibilScore = Response.oIntrmStat.oCibilResult;
			$scope.applicantbckUp = Response.oAppReq.oReq.oApplicant;
			$scope.Picked = CustID;
			$scope.dob =Response.oAppReq.oReq.oApplicant.sDob.slice(0,2)+"/"+Response.oAppReq.oReq.oApplicant.sDob.slice(2,4)+"/"+Response.oAppReq.oReq.oApplicant.sDob.slice(4,8)
			$scope.error="";
			$scope.showrefid = "true";
			$scope.currApplicant = $scope.kycid ;
			
			try{
			$scope.bureau = Response.aAppScoRslt;
			$rootScope.refID =Response.oAppReq.sRefID;
			$scope.dsaName= Response.oAppReq.oHeader.sDsaId;
			}catch(e){
				$scope.bureau ="";
				$rootScope.refID ="";
				$scope.dsaName="";
			}
			try{
				$scope.LNtype = Response.oAppReq.oReq.oApplication.sLoanType;
				$scope.prptyPrps = Response.oAppReq.oReq.oApplication.oProperty.sPurpose;
				$scope.prptyOwnsp = Response.oAppReq.oReq.oApplication.oProperty.sPropertyType;
				$scope.PrptyEstVal = Response.oAppReq.oReq.oApplication.oProperty.sPropertyValue;
				$scope.PrptyMrktVal = Response.oAppReq.oReq.oApplication.oProperty.sMarketValue;
				$scope.PrpLn = Response.oAppReq.oReq.oApplication.oProperty.oPropertyAddress.sCity;
				$scope.lnPrs =  Response.oAppReq.oReq.oApplication.oProperty.sPurpose;
			}
			catch(e) {
				$scope.dealership ="";
				$scope.assetData ="";
			}
			try{
				$scope.coAppId =Response.oAppReq.oReq.oCoApplicant[0].sApplID;
				$rootScope.coapplicant = Response.oAppReq.oCoApplicant[0].oApplName;
			}catch(e){
				$scope.coAppId ='';
				$rootScope.coapplicant = '';
			}
			try{
//				console.log("kycName :"+JSON.stringify(Response.aAppImgDtl));
				var data = Response.aAppImgDtl;
				for (j in data)
				{
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
			catch(error){
				$scope.array = '';
			}
			try{
				/*var pdfStatus =Response.oCompRes.multiBureauJsonRespose.FINISHED[0].STATUS ;
				if(pdfStatus =="SUCCESS"){*/
				$scope.pdf ="data:application/pdf;base64,"+Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];
				/*}else{console.log("no pdf");}*/
			}
			catch(error){
				$scope.pdf ='';
			}
			try{	
			  var data =Response.oCompRes.scoringServiceResponse["SCORE-DATA"].STATUS;
				if(data == "ERROR"){$scope.appScore ="Not Available";}
				else if(data == null){$scope.appScore ="No Score has been calculated";}			 
				else{
					  $scope.appScore =Response.oCompRes.scoringServiceResponse.SCORE_TREE.AppScore;
					  $scope.tree = Response.oCompRes.scoringServiceResponse.SCORE_TREE;//
				  }
			}
			catch(error){
				 $scope.appScore ='';
				 $scope.tree ='';
			}
			try{
				 //new variable for eligibility
				  $scope.appScoreEligibilityAmount=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].ELIGIBILITY_AMOUNT;
				  $scope.appScoreEligibilityTenor=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].MAX_TENOR;
				  $scope.appScoreEligibilityDownPayment=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].DP;
				  $scope.appScoreEligibilityDecision=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].DECISION;
				
			}catch(error){
				 $scope.appScoreEligibilityAmount="";
				  $scope.appScoreEligibilityTenor="";
				  $scope.appScoreEligibilityDownPayment="";
				  $scope.appScoreEligibilityDecision="";
				
				}
			try{
				//new variable for decision response
				  $scope.decisionRep=Response.oCompRes.scoringServiceResponse["DECISION_RESPONSE"].Decision;
				  $scope.DetailsResp=Response.oCompRes.scoringServiceResponse["DECISION_RESPONSE"].Details;
				 
			}catch(error){
				  $scope.decisionRep="";
				  $scope.DetailsResp="";
			}
			try{
				 $scope.Emi = Response.aCroDec[0].dEmi;	
			}catch(error){
				  $scope.Emi ="";
			}
			try{
				$scope.Eremark=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].REMARK;
			}catch(error){
				$scope.Eremark="";
			}
		  try{
			  $scope.eligibility = Response.oElgGrdOut.dElgAmt;
			  $scope.decision = Response.oElgGrdOut.sDec;
			  $scope.openTrades = Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["BUREAU-RRP-OBJECT"].rrpLiveTradesCount ;
			  $scope.scorename =Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["JSON-RESPONSE-OBJECT"].scoreList[0].scoreName;
			  $scope.score =Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["JSON-RESPONSE-OBJECT"].scoreList[0].score;
			  $scope.sanctionedAmt =Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["BUREAU-RRP-OBJECT"].rrpTotalOutstanding ;
			  $scope.noEnquiry = Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["BUREAU-RRP-OBJECT"].rrpTotInqs;
		  }catch(error){
			  $scope.eligibility = "";
			  $scope.decision = "";
			  $scope.openTrades = "";
			  $scope.scorename = "";
			  $scope.score = "";
			  $scope.sanctionedAmt = "";
			  $scope.noEnquiry = "";
		  }
		  
			try{
			$scope.appldAmount = Response.oAppReq.oReq.oApplication.dLoanAmt;
			}catch(e){
				$scope.appldAmount = '';
			}
			try{
				  $scope.croDec=Response.aCroDec[0];
				/*  if($scope.croDec.dAmtAppr == 0 ||$scope.croDec.dAmtAppr == '' || $scope.croDec.dAmtAppr == null)
					  {
					   $scope.appAmtFlag = true;
					  }else{
						  $scope.appAmtFlag = false;		  
					  }*/
			}catch(error){
				/* if($scope.croDec==undefined || $scope.croDec=='' || Response.aCroDec=='' || Response.aCroDec==undefined){
					 $scope.appAmtFlag = true;
				  }else{
					  $scope.appAmtFlag = false;		  
				  }*/
				$scope.croDec="";
			}
			if(!croQueue)// if($scope.InstitutionID==4019 &&($scope.userid == "494")){ //28 if(!croQueue)
			{	$scope.newApplication(CustID);}
			
	}).error(function(data)
	{
		 $scope.error = "Sorry...System is under maintenance !!";
	});
		
}
//*********************************approve decline onhold *******************************************************
	$scope.cro_action = function(appID, action)
	{ //NEW // && $scope.appStatflag == ''
		console.log("status : "+$scope.applctnstatus);
		$scope.appltnID = appID;
		$scope.actions = action;
		if(($scope.applctnstatus.toUpperCase() == "QUEUE") || (!croQueue))
		{
			var arr=[];
		if((appID !== "undefined") && (typeof $rootScope.details !== "undefined"))
		{
			  $rootScope.details = "";
			 if(action == "OnHold"){
				 var data= $rootScope.rejectArray;
				 $('div[contextmenu="blur"]').addClass("blured");
				 $('#OfferPanel').slideDown();
				 $scope.flag = true;
				 dataset =docData;
				 $scope.OfferArrey =dataset ;
				 $scope.AvailebleOffers = $scope.OfferArrey[0].Offers;
				 $scope.ID = 0;
				 $('#SendOffer').text("Request Document");
				 $('#SendOffer').css("width","19%");
			 }
			 else if(action == "Declined"){
				 $('div[contextmenu="blur"]').addClass("blured");
				 $('#declinereason').slideDown();
				 $('#reason1container,#reason2container').text('');
			 }
			 else{
					 $('div[contextmenu="blur"]').addClass("blured");
					 $('#approveReason').show();
					 $('#appr1Container,#appr2Container').text('');
					 }
		
		}else{
			$scope.error = "Please select enquiry from Queue...!!!";
			$scope.done = "";
			}
		}else if($scope.applctnstatus == null){
			$scope.error = "Application status is not defined...!!!";
			$scope.done = "";
		}
		else{
			$scope.error = "Application has already taken an action...!!!";
			$scope.done = "";
		}
		$scope.showrefid = "true";
	}
	 $(document.body).on("click","#SendOffer",function(){
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
					'sHeader':{'sAppID':$scope.appltnID,'sInstID':$scope.InstitutionID,'sCroId':$scope.userid},
					"sAppStat":"OnHold",
					"aCroJustification":arrayDesc,
					"aDedupeRefID": arr
					};
//		 requestForonhold(json);//uncomment
		 requestFordecline(json);
		  $('#offrform').trigger('reset');
//		  docData[4].Offers=[];
		 }else{
//			 alert("asdhas");
//			 console.log("HEll0");
//			 msg = "Please enter your reason for Onhold";
			 $("#msg").text("Please enter your reason for Onhold");
		 }
	 });
	 
	 function  requestFordecline(json){
			console.log("requested JSon: "+JSON.stringify(json));
			 $http({
					method : 'POST',
					url : BASE_URL_DMI+'cro-onhold',
					data : json,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(Response) 
				{console.log("success JSon: "+JSON.stringify(Response));
					if(Response.STATUS == "OK UPDATE SUCCESSFULLY")						
					{
						setTimeout(function() 
						{ $('.LoaderSpinner').hide()},2000);
						$(document.body).find("#"+$scope.appltnID+"").addClass($scope.actions);
						$scope.done = "Application is successfully "+$scope.actions+""; 
						polling();// check it out
						$rootScope.details == "undefined";
						setTimeout(function() 
						{ 
							$scope.done="";
						},4000);
					}
				}).error(function(data)
				{
					 $scope.error = "Sorry...Server could't process your request !!";
				});
		}
	function requestForStatus(json)
	{
		console.log("approve json :"+JSON.stringify(json));
		  $http({
				method : 'POST',
				url : BASE_URL_DMI+'cro-approval',
				data : json,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response) 
			{
				$scope.appStatflag =json.sAppStat;
				console.log("update status :"+$scope.actions+"=="+$scope.appltnID);
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
			}).error(function(data)
			{
				 $scope.error = "Sorry...Server could't process your request !!";
			});	
	}
 $scope.updateStatus=function()
 {  
	//	 $('.LoaderSpinner').show();  
		var offers={'offers':[],'documents':[]};
		if(offersAllowed)
		{
		  for(var i=0;i<dataset.length;i++)
		  {for(var j=0;j<dataset[i].Offers.length;j++)
		   {if((typeof dataset[i].Offers[j].selected != 'undefined'))
		    {
			   if($scope.flag == true){
					offers.documents.push(dataset[i].Offers[j]);
					$scope.flag == false;
			   }
			   else{
					offers.offers.push(dataset[i].Offers[j]);
			   }
		    }
		   }
		  }
		 console.log("documents :"+JSON.stringify(offers));
		 $scope.offrData = offers.documents; 
	     $('#OfferPanel').slideUp();
	     $('div[contextmenu="blur"]').removeClass("blured");
	     } 
	};
//	********************************end***********************************************************
	
	$(document.body).on("click","#back",function(){
		// alert("Closing...");
		$("#application-main-container").slideUp();				
		$("#notification-main-container").show();
	});

	/*$scope.newApplication = function(refid)
	{*//* 
		$('#dob').datepicker({changeMonth: true, changeYear: true, yearRange: "1945:1997", dateFormat: 'dd:M:yy'});
		if(croQueue){//$scope.userid != "494" if(croQueue)
			$("#notification-main-container").hide();
			$("#application-main-container").show();
		}
		$scope.officeaddr = "";
		$scope.peraddr = '';
		$scope.resaddr='';
		$scope.phn="";
		$scope.RefID = refid;
		var data = 	$scope.notifarray;
		for (j in data)
		{if(data[j].sRefID == $rootScope.applicationID){
				$scope.applctnstatus = data[j].sStat;}
		}
		$scope.aplcntType=[{value:"SAL","text":"Salaried"},
		               	{value:"SEB","text":"Self Employed Business"},
		               	{value:"SEP","text":"Self Employed Professional"}];
		try{
			$scope.name = $rootScope.details.oReq.oApplicant.oApplName.sFirstName+"  "+ $rootScope.details.oReq.oApplicant.oApplName.sLastName.replace("null","");							    	
			$scope.mobile = $rootScope.details.oReq.oApplicant.aPhone[0].sPhoneNumber;
			$scope.Amount = $rootScope.details.oReq.oApplication.dLoanAmt;
			$scope.email = $rootScope.details.oReq.oApplicant.aEmail;//[0].sEmailAddr
			$scope.dob = $rootScope.details.oReq.oApplicant.sDob.slice(0,2)+"/"+$rootScope.details.oReq.oApplicant.sDob.slice(2,4)+"/"+$rootScope.details.oReq.oApplicant.sDob.slice(4);
			$scope.gender = $rootScope.details.oReq.oApplicant.sApplGndr;
		}catch(error){
			$scope.name ="";							    	
			$scope.mobile = "";
			$scope.Amount = "";
			$scope.email = "";
			$scope.dob = "";
			$scope.gender ="";
		}
		try{
			var address = $rootScope.details.oReq.oApplicant.aAddr[0];	
			$scope.statelist= address.sState;
//			$(document.body).find("#statelist").val(address.sState);
			$scope.address1 = address.sLine1;
			$scope.address2 = address.sLine2;
			$scope.pin = address.iPinCode;
			$scope.time_address = $scope.timeataddress[getTime(address.iTimeAtAddr,  $scope.timeataddress)];
			$scope.location =address.sLine2;
		}catch(error){
			$scope.statelist="";
			$scope.address1 = "";
			$scope.address2 = "";
			$scope.pin = "";
			$scope.time_address = "";
			$scope.location ="";
		}
try{
	$scope.project = $rootScope.details.oReq.oApplication.aAssetDetail[0].sAssetMake;	
	$scope.model= $rootScope.details.oReq.oApplication.aAssetDetail[0].sModelNo;

}catch(e){
	$scope.project ="";	
	$scope.model="";
}
// $scope.state = $scope.statelist[getTime($rootScope.details.CUSTOMER.state,
// $scope.statelist)];
		try{
		$scope.employment_type = $scope.jobType[3];
		$scope.time_employer = $rootScope.details.oReq.oApplicant.aEmpl[0].iTmWithEmplr+" Months";
		$scope.employer = $rootScope.details.oReq.oApplicant.aEmpl[0].sEmplName;
		$scope.gross_annual =  Validation.NoWithComma($rootScope.details.oReq.oApplicant.aEmpl[0].dGrossSal);
		$scope.current_emi =  $rootScope.details.oReq.oApplication.dEmi;
		$scope.loanAmt =  $rootScope.details.oReq.oApplicant.aEmpl[0].dmonthSal;
		$scope.education= $rootScope.details.oReq.oApplicant.sEdu;
		$scope.employment_type = $rootScope.details.oReq.oApplicant.aEmpl[0].sEmplType;
		}catch(error){
			$scope.employment_type = "";
			$scope.time_employer = "";
			$scope.employer = "";
			$scope.gross_annual = "";
			$scope.current_emi =  "";
			$scope.loanAmt ="";
			$scope.education="";
			$scope.employment_type ="";
		}
		try{
			$scope.cro2Data =$rootScope.fullData.oPostIPA;
			$scope.apprvdAmt=$scope.cro2Data.dApvAmt;
			$scope.scheme=$scope.cro2Data.sScheme;
			$scope.totalAssetCost=$scope.cro2Data.dTotAssCost;
			$scope.marginMoney=$scope.cro2Data.dMarMoney;
			$scope.marginMoneyInst=$scope.cro2Data.sMarginMoneyInstru;
			$scope.marginMoneyConf=$scope.cro2Data.sMarMoneyConfirm;
			$scope.addvncEmi=$scope.cro2Data.dAdvEmi;
			$scope.processnFee=$scope.cro2Data.dProcFees;
			$scope.asstmodal=$scope.cro2Data.aAssMdl;
						
		}catch(error){
			$scope.cro2Data ="";
			$scope.apprvdAmt="";
			$scope.scheme="";
			$scope.totalAssetCost="";
			$scope.marginMoney="";
			$scope.marginMoneyInst="";
			$scope.marginMoneyConf="";
			$scope.addvncEmi="";
			$scope.processnFee="";
			$scope.asstmodal="";
		}
		try{
			var temp = $rootScope.details.oReq.oApplicant.aEmpl[0].sConst;
			var databoolean = getTime(temp,$scope.aplcntType);
			if(databoolean!=undefined)
			$scope.constitution = $scope.aplcntType[databoolean].text;
			else
			$scope.constitution = temp;
			$scope.credit = $rootScope.details.oReq.oApplicant.sCreditCardNum;
			$scope.tenor = $rootScope.details.oReq.oApplication.iLoanTenor;
						
		}catch(error){
			$scope.credit ="";
			$scope.tenor = "";
			$scope.constitution = "";
		}
		try{
			$scope.dealer = $rootScope.details.oReq.oApplication.aAssetDetail[0].sDlrName;
			$scope.assetctg = $rootScope.details.oReq.oApplication.aAssetDetail[0].sAssetCtg;

		}catch(e){
			$scope.dealer = "";
			$scope.assetctg ="";
		}
		try{
			$scope.cibilS = $scope.cibilScore.sFldVal;
			$scope.mStatus = $rootScope.details.oReq.oApplicant.sMarStat;
		}catch(e){
			$scope.cibilS ="";
			$scope.mStatus ="";
		}
		try{
			$scope.currStage = $rootScope.details.sCurrentStageId;
		}catch(error){
			$scope.currStage ="";
		}
		try{
			var fulladdress = $rootScope.details.oReq.oApplicant.aAddr;
			for (j in fulladdress)
			{
				if(fulladdress[j].sAddrType=="OFFICE"){
					$scope.officeaddr = fulladdress[j]; 
				}else if(fulladdress[j].sAddrType=="PERMANENT"){
					$scope.peraddr = fulladdress[j];
				}else if(fulladdress[j].sAddrType=="RESIDENCE"){
					$scope.resaddr= fulladdress[j];
				}
			} 
		}catch(e){
			$scope.officeaddr ="";
			$scope.peraddr = "";
			$scope.resaddr= "";
		}
	try{
		var phoneArray=[];
		phoneArray = $rootScope.details.oReq.oApplicant.aPhone;
		for(j in phoneArray){
			phoneArray[j].sPhoneType= $scope.phoneData[getTime(phoneArray[j].sPhoneType,  $scope.phoneData)].name;
		}
		$scope.phn= phoneArray;
	}catch(e){
		$scope.phn= '';
	}
	try{
		$scope.lastsalary = $rootScope.details.oReq.oApplicant.aEmpl[0].dmonthSal;
		$scope.resAddrRslt= $rootScope.fullData.oIntrmStat.oResAddressResult.iAddrStblty;
		$scope.offAddrRslt= $rootScope.fullData.oIntrmStat.oOffAddressResult.iAddrStblty;

	}catch(e){
		$scope.lastsalary ="";
		$scope.resAddrRslt="";
		$scope.offAddrRslt="";
	}
	try{
		$scope.ITamt =  $rootScope.details.oReq.oApplicant.aEmpl[0].dItrAmt;
	}catch(error){
		$scope.ITamt ='';
	}
//		$scope.time_employer = $scope.timeataddress[getTime($rootScope.details.oReq.oApplicant.aEmpl[0].iTmWithEmplr, $scope.timeataddress)];							    	

//		$scope.lmth =  Validation.NoWithComma($rootScope.details.CUSTOMER.lastMonthIncome);
//		$scope.llmth =  Validation.NoWithComma($rootScope.details.CUSTOMER.lastLastMonthIncome);
		$('#Job').show();
		
	}*/
/*	function getTime(value, array)
	{
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

	$scope.Load_Offer = function(NodeID,Obj)
	{
		var BoxID = Obj.currentTarget.attributes.id.nodeValue;
		$('div[id^='+BoxID.slice(0,BoxID.length-1)+']').css("background-color","#fff");
		$('#'+BoxID+'').css("background-color","#F4F8F9");
		for(var i=0; i<dataset.length; i++)
		{if(dataset[i].ID == NodeID)
		{	$scope.AvailebleOffers = dataset[i].Offers;
			$scope.ID = NodeID;
		}
		}
	}
	
	$scope.checkboxUpdate = function(Obj,id)
	{ if(Obj)
	  {if (typeof dataset[$scope.ID].selected != "undefined") 
	    {  dataset[$scope.ID].selected.push(id);	
	      if(typeof dataset[$scope.ID].Offers[id].selected == "undefined")
	       { $.extend( dataset[$scope.ID].Offers[id], {'selected':'true'});}
	    }
	    else{
		  var selected={'selected':[]};
		  $.extend( dataset[$scope.ID], selected);
		  dataset[$scope.ID].selected.push(id);	
	 	  if(typeof dataset[$scope.ID].Offers[id].selected == "undefined")
		  { $.extend( dataset[$scope.ID].Offers[id], {'selected':'true'});}
	    }	
	  }else{
		dataset[$scope.ID].selected.splice($.inArray(id, dataset[$scope.ID].selected),1);
		delete dataset[$scope.ID].Offers[id].selected;
	     }
	  if((typeof dataset[$scope.ID].selected !="undefined") && (dataset[$scope.ID].selected.length > 0))
	   {
		$('#active'+$scope.ID+'').css("background-color","green");
//		$('#changeActive'+id+'').show();
		$scope.OfferArrey = dataset;
	   }
	  else{
		$('#active'+$scope.ID+'').css("background-color","#fff");
	  }
	}
//****************************************reset all values on close******************************************************
// $("#closeOffer").click(function()
	$(document.body).on("click","#closeOffer" ,function()	
	{
//		  docData[4].Offers=[];
		  $('#OfferPanel').slideUp();
		  $('#descReason').val("");
		  $('#msg').text("");
		  $('div[contextmenu="blur"]').removeClass("blured");
		  $('#offrform').trigger('reset');
		  $('div[id^="active"').css("background-color","#E4EDE4");
	 });
//***********************************end******************************************************************
	$scope.scoreTree = function()
	{
		treeData = [];
			$scope.error ="";
			generate_scoreJson($scope.tree);
		// generate json for tree
		function generate_scoreJson(temp)
		{
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
			}catch(error)
			{
				console.log(error);
				$("#scoreTree").text("Sorry we cant process this score tree");
			}

// console.log(JSON.stringify(treeData));
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

			zm.translate([width / 2, 20]); // add drag functionality
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
			/* d3.select("#graph").style("height", "800px"); */
			function update(source) {
				// Compute the new tree layout.
				var nodes = tree.nodes(root).reverse(),
				links = tree.links(nodes);

				// Normalize for fixed-depth.
				nodes.forEach(function(d) {
					d.y = d.depth * 120;
				});

				// count no of chuldren
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
				/* increase height of graph with respect to depth */
				if ((height > 100) && (levelWidth.length > depth)) {
					height = height + 160;
					depth = levelWidth.length;
				} else if (height < 100) {
					height = 170;
				}
				// console.log(depth);

				$("#scoreTree").css("height", height);
				d3.select("svg").attr("height", height);


				// Update the nodes…
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
					.translate(+this.getAttribute("cx"), +this.getAttribute("cy")); // Get
																					// this
																					// bar's
																					// x/y
																					// values,
																					// then
																					// augment
																					// for
																					// the
																					// tooltip

					d3.select("#tooltip") // Update the tooltip position and
											// value
					.style("left", Math.max(0, d3.event.pageX - 20) + "px")
					.style("top", (d3.event.pageY - 120) + "px");

					// bind value with labels
					$('#node_expression').text(d.exp);// find function erturn
														// the full string
					$('#node_details').text("Value : "+ d.dscore);
					d3.select("#tooltip").classed("hidden", false); // Show the
																	// tooltip

				})
				.on('mousemove', function(d) {
					d3.select("#tooltip").style("left", Math.max(0, d3.event.pageX - 20) + "px") // the
																									// d3.mouse()
																									// function
																									// calculates
																									// the
																									// mo
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

				nodeEnter.append("text") // append text
				.style("fill", "white")   // fill the text with the colour
											// black
				.attr("dy", ".20em")   // set offset y position
				.attr("text-anchor", "middle") // set anchor y justification
				.text(function(d) {
					return d.score;
				});        

				// Transition nodes to their new position.
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

				// Transition exiting nodes to the parent's new position.
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

				// Update the links…
				var link = svg.selectAll("path.link")
				.data(links, function(d) {
					return d.target.id;
				});

				// Enter any new links at the parent's previous position.
				link.enter().insert("path", "g")
				.attr("class", "link")
				.attr("d", diagonal);

				// Transition links to their new position.
				link.transition()
				.duration(duration)
				.attr("d", diagonal);

				// Transition exiting nodes to the parent's new position.
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

				// Stash the old positions for transition.
				nodes.forEach(function(d) {
					d.x0 = d.x;
					d.y0 = d.y;
				});
			}

			// Toggle children on click.
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

			// Redraw for zoom
			function redraw() 
			{// console.log("here", d3.event.translate, d3.event.scale);
				svg.attr("transform", "translate(" + d3.event.translate + ")");
// console.log("scroll "+$('#scoreTree').parent().parent().parent());
			}
		}
	}
	$(document).on('click', '.close', function(e) {
		$("#scoreTree").text("");
		$(document.body).find('#document_preview').attr("src","");
		$(document.body).find("#rjct").removeClass("reject");
		$(document.body).find("#apprv").removeClass("btn-success");
		$(document.body).find("#apprv,#rjct").addClass("btn-default");
		$(document.body).find('#reason').val("");
		$(document.body).find('#reason').css("border","1px solid #ccc");
		$(document.body).find('#reason').css("box-shadow","inset 0 1px 1px rgba(0,0,0,0.075)");
//		$(document.body).find('#reason').next().focus();
		$(document.body).find('#reason').hide();
		$(document.body).find('#submitreason').hide();
		$(document.body).find('#cirhtml').attr("data", "").hide();

	});
	
	$(function() {
//		get_name();
		$('#chat_window').hide();
		if(navigator.platform.toUpperCase().indexOf('MAC') !== -1)
		{
			$('.leftbar_scroll').css("margin","0px");			
		}
	});
//*******************************************type of image*****************************************************
	$(document.body).on('click','.custom_img_rounded',function() 
		    {		  $(document.body).find('#cirhtml').attr("data", "").hide();
					var src = $(this).attr("src");
					$(document.body).find('#myModalnew').find('.modal-title').find('h5[class="modal-title"]').remove();
					if($(this).hasClass("Report-Icon"))
					{  src=$(this).attr("name");
					}
					else if($(this).hasClass("arrow"))
					{  
						var imgname = $(this).attr("name");
					    var imgID= $(this).attr("usermap");
						findCurrentImg(imgname);
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
						$(document.body).find('#cirhtml').attr("data", $scope.pdf).show();
					}
				
			});
		
	function applicantImg(data){
		var map = data;
		for (i in map)
		{
			$scope.panid = map[i].sImgID;
			kyc_img(map[i].sImgType , map[i].sImgID, map[i].sStat, map[i].sReason);

		}
	}
	function kyc_img(kycName , imgId ,status , reason){
		var json ={
				'sImgID':imgId
		}
		  $http({
				method : 'POST',
				url : BASE_URL_DMI+'get-image-by-id-base64',
//				params : {'sImgID':imgId},
				data : json,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response) 
				{  
//				console.log("image :"+JSON.stringify(Response));
				var image = "data:image/png;base64,"+Response.sByteCode;
				if(Response.sByteCode != undefined && Response.sByteCode != null && Response.sByteCode != "" ){
					console.log("image :"+kycName+"id :"+imgId);
					var url =image;
					if(reason =="Present Residence Address"){ 
						$scope.PresentAdd =  true;
						if($scope.radd == ''){	//$scope.src_img
						$scope.radd =image;
						}
						custImg_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "Present Residence Address";
					}
					else if(reason =="Permanent Address Proof"){
						$scope.PermanentAdd =  true; 
						if($scope.padd == ''){
						$scope.padd =image;
						}
						kyc_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "Permanent Address Proof";
					}
					else if(reason =="Date of Birth" ){
						$scope.Date = true;
						if($scope.DOB == ''){
						$scope.DOB =image;
						}
						appForm_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "Date of Birth";
					}
					else if(reason == "Identification No."){
						$scope.Identification =true;
						if($scope.ID == ''){
						$scope.ID =image;
						}
						disburst_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "Identification No.";
					}
					else if(reason == "Signature Proof"){
						$scope.Signature = true;
						if($scope.sign == ''){
						$scope.sign =image;
						}
						income1_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "Signature Proof";
					}
					else if(reason =="PAN"){
						$scope.PANflag = true;
						if($scope.panIMG == ''){
						$scope.panIMG =image;
						}
						income2_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "PAN";
					}
					else if(reason =="Applicant Photo"){
						$scope.Applicant = true;
						if($scope.apPhoto == ''){
						$scope.apPhoto =image;
						}
						other_array.push({kyc_name:kycName,image:image, ImageID:imgId,img_status:status, img_reason:reason});
						$rootScope.uploadImgFor = "Applicant Photo";
					}
					$(document.body).find('#document_preview').attr("src", url).show();	
				}
				else
				{
					$('.arrow').attr("src", "img/imgnotavail.png").show();
				}
				}).error(function(data)
				{
					 $scope.error = "Sorry...Unable to fetch images from server !!";
				});
	}
	 
	$(document.body).on('click','#applicant',function() 
	{
		$('#applicant').parent().addClass("active");
		$('a[id^="coapplicants"]').parent().removeClass("active");
		$rootScope.applicant =  $scope.applicantbckUp;
		$scope.kyc_data = $rootScope.details.oReq.oApplicant;
		$scope.currApplicant = $scope.kycid ;
		applicantImg($scope.appkycimg);
		$scope.$apply(); 
	});
	$scope.coapplicantdetails = function(id){
//		console.log("click :"+$("#coapplicants"+id).attr("name"));
		$("#coapplicants"+id).parent().attr("class","active");
		$("#applicant").parent().removeClass("active");	
		$.each( $rootScope.coapplicant, function(i, temp) {
			if(i != id){
				$("#coapplicants"+i).parent().removeClass("active");	
			}
		});	
		$rootScope.applicant =  $rootScope.coapplicant[id];
		$scope.kyc_data = $rootScope.details.oReq.oCoApplicant[0];
		$scope.currApplicant = $scope.coAppId ;
		$scope.panpresent =false;
		$scope.adharpresent =  false; 
		$scope.passportPresents =false;
		$scope.dLPresent = false;
		$scope.income1Present = false;
		$scope.income2Present = false;
		$scope.custPresent = false;
		$scope.otherPresent = false;
		$scope.appformPresent = false;
		$scope.disbstPresent = false;
		$scope.addKyc = false;
		applicantImg($scope.coappImgs);
		$scope.$apply(); 
	}
	function iterateImg(current , array){
		$(document.body).find('#myModalnew').find('.modal-title').find('h5').text(array[current].kyc_name);
		$(document.body).find('#myModalnew').find('.modal-title').find('h5').attr("title",array[current].ImageID);
		$(document.body).find('#reason').hide();
		$(document.body).find('#submitreason').hide();
		if(current == array.length-1){
			$('#nextarrow').css("opacity","0.5");
			$('#prevarrow').css("opacity","1");
//			$('#prevarrow').show();
		}else if(current == 0){
			$('#prevarrow').css("opacity","0.5");
			$('#nextarrow').css("opacity","1");
//			$('#nextarrow').show();
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
//		console.log("iterate: "+$scope.index);
		$scope.currImg = current;
		for(i=current+1; i<array.length; i++){
			nextImg.push(array[i]);
		}
		for(j=0; j<=current-1; j++){
			prevImg.push(array[j]);
		}
//		console.log("current :"+$scope.index);
	}
		
	$(document).on('click', '#nextarrow', function(e) {
//		$(document.body).find('#document_preview').attr("src", "");
		/*$(document.body).find("#rjct").removeClass("reject");
		$(document.body).find("#apprv").removeClass("btn-success");
		$(document.body).find("#apprv,#rjct").addClass("btn-default");
		$(document.body).find('#reason').val("");*/
		var current='';
		if($scope.currImg == 0){
		 current = $scope.currImg+1;
		}
		else{
		  current =$scope.index+1;
		}
		var title = $('#img_panel').attr("title");
		if(title=="Present Residence Address"){
			iterateImg(current,appForm_array);
		}
		else if(title == "Date of Birth"){  
			iterateImg(current,agreement_array);
		}
		else if(title=="Identification No."){
			iterateImg(current,ach_array);
		}
		else if(title =="Signature Proof"){
			iterateImg(current,disburst_array);
		}
		else if(title=="PAN"){//(/^PAN/.test(title)){
			iterateImg(current,income2_array);
		}
		else if(title == "Applicant Photo"){//(/^Applicant Photo/.test(title)){
			iterateImg(current,other_array);
		}
		else if(title == "Permanent Address Proof"){
			iterateImg(current,kyc_array);
		}
		/*else{//CHECK CONDITION
			var temp= 	$(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
			if(((!/^ADDITIONAL_KYC_/.test(temp)) || (!/^ACH_/.test(temp)) || (!/^AGREEMENT_/.test(temp)) || (!/^DISBURSEMENT/.test(temp)) || (!/^APPLICATION_FORM_/.test(temp))) && (temp=="PAN" || temp=="DRIVING-LICENSE" || temp=="AADHAAR" || temp=='PASSPORT'))
			iterateImg(current,kyc_array);
			else{
				iterateImg(current,extra_array);
			}
			if((temp=="PAN" || temp=="DRIVING-LICENSE" || temp=="Driving License" || temp=="AADHAAR" || temp=='PASSPORT'))
				iterateImg(current,kyc_array);
				else{
					iterateImg(current,extra_array);
				}
		}*/
	});
	
	$(document).on('click', '#prevarrow', function(e) {
//		$(document.body).find('#document_preview').attr("src", "");
		var current = '' ;
		/*$(document.body).find("#rjct").removeClass("reject");
		$(document.body).find("#apprv").removeClass("btn-success");
		$(document.body).find("#apprv,#rjct").addClass("btn-default");
		$(document.body).find('#reason').val("");*/
		if($scope.currImg == 0){
			 current = $scope.currImg-1;
			}
			else{
			  current =$scope.index-1;
			}
		var title = $('#img_panel').attr("title");
//		var current = $scope.index-1;
		if(title=="Present Residence Address"){
			iterateImg(current,appForm_array);
		}
		else if(title == "Date of Birth"){  
			iterateImg(current,agreement_array);
		}
		else if(title=="Identification No."){
			iterateImg(current,ach_array);
		}
		else if(title =="Signature Proof"){
			iterateImg(current,disburst_array);
		}
		else if(title=="PAN"){//(/^PAN/.test(title)){
			iterateImg(current,income2_array);
		}
		else if(title == "Applicant Photo"){//(/^Applicant Photo/.test(title)){
			iterateImg(current,other_array);
		}
		else if(title == "Permanent Address Proof"){
			iterateImg(current,kyc_array);
		}
	});
	
	//	});
//**************************************end*********************************************************************
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
		var id_n = document.getElementById('id_number').value;// text field of
																// number
		var option = document.getElementById('id_option').value;
// var validity = document.getElementById('valid_upto').value;
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
	//********images array*********
	$(document).on('click', '.preview', function(e) {  //sayali
		var src = $(this).attr("accesskey"); 
		var currentImgID = $(this).attr("name"); 
//		console.log("img :"+currentImgID);
		$scope.index=0;
		var boxId = $(this).attr("title");
//		alert($(this).nextSibling.innerText);
		$(document.body).find('#myModalnew').find('.modal-title').find('h5[class="modal-title"]').remove();
		$(document.body).find('#myModalnew').find('.modal-title').append('<h5 class="modal-title" title='+currentImgID+'>'+boxId+'</h5>');
		$(document.body).find('#img_panel').remove();
		if(src != ''){	
			if(/^APPLICATION_FORM/.test(boxId)){
//				console.log("ashd : "+JSON.stringify(appForm_array));
				appendPanel(appForm_array,boxId);
				for(i=0;i<appForm_array.length;i++){
					if(currentImgID == appForm_array[i].ImageID){
						checkImgStatus(appForm_array[i].img_status);}
				}
//				$('#prevarrow').hide();
			}
			else if(/^AGREEMENT/.test(boxId)){
				appendPanel(agreement_array,boxId);
				for(i=0;i<agreement_array.length;i++){
					if(currentImgID == agreement_array[i].ImageID){
						checkImgStatus(agreement_array[i].img_status);}
				}
//				$('#prevarrow').hide();
			}
			else if(/^ACH/.test(boxId)){
				appendPanel(ach_array,boxId);
				for(i=0;i<ach_array.length;i++){
					if(currentImgID == ach_array[i].ImageID){
						checkImgStatus(ach_array[i].img_status);}
				}
//				$('#prevarrow').hide();
			}
			else if(/^DISBURSEMENT/.test(boxId)){
				appendPanel(disburst_array,boxId);
				for(i=0;i<disburst_array.length;i++){
					if(currentImgID == disburst_array[i].ImageID){
						checkImgStatus(disburst_array[i].img_status);}
				}
//				$('#prevarrow').hide();
			}
			else if(/^ADDITIONAL_KYC/.test(boxId)){
				appendPanel(addkyc_array,boxId);
				for(i=0;i<addkyc_array.length;i++){
					if(currentImgID == addkyc_array[i].ImageID){
						checkImgStatus(addkyc_array[i].img_status);}
				}
//				$('#prevarrow').hide();
	
			}else{
	//			if(src != ''){
				findCurrentImg(boxId);
	//				$('#approve_rejectPanel').show();
	//				src = $(this).attr("src");
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
			$('#img_preview').prepend('<div class="row clearfix" id="img_panel" title='+boxId+' style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" src="img/newprev.png" style="opacity:0.5"><img id="document_preview" src="" style="width: 100%; height: 100%; max-height: 400px"><img id="nextarrow" src="img/newnext.png"></div>');
		}
		else{
			$('#img_preview').prepend('<div class="row clearfix" id="img_panel"title='+boxId+'><img id="document_preview" src=""></div>');
		}
//		$('#approve_rejectPanel').show();
	}
	function findCurrentImg(name){
		 $scope.index=0;
		 $scope.currImg =0;
		 $(document.body).find('#img_panel').remove();
		 var pointerImg = '';
		 var array=[];
		/* if((/^ADDITIONAL_KYC_/.test(name)) || (/^ACH_/.test(name)) || (/^AGREEMENT_/.test(name)) || (/^DISBURSEMENT/.test(name)) || (/^APPLICATION_FORM_/.test(name))){
			 array = extra_array;
		 }else{
			 array=kyc_array;
		 }
*/		 
	/*	 if(name == "PAN" || name == "AADHAAR" || name=="PASSPORT" || name=="DRIVING-LICENSE" || name=="Driving License")
		 {
			 array=kyc_array;
			 for(i=0;i<kyc_array.length;i++){
					if(name == kyc_array[i].kyc_name){
						checkImgStatus(kyc_array[i].img_status);}
				}
		 }else{
			 array = extra_array;
			 for(i=0;i<extra_array.length;i++){
					if(name == extra_array[i].kyc_name){
						checkImgStatus(extra_array[i].img_status);}
				}
		 }
*/
		 array=kyc_array;
		if(array.length!='1'){
			for(var i=0 ; i<array.length; i++){
				if(array[i].reason == name)
					{
					pointerImg = i;
					$scope.currImg = i;
					$scope.index = i;
					}
			}
			pointerImg = 0;
			$scope.currImg = 0;
			$scope.index = 0;
/*//			if(pointerImg == 0){
				$('#img_preview').prepend('<div class="row clearfix" id="img_panel" title="kyc" style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" style="opacity:0.5" src="img/newprev.png"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" src="img/newnext.png"></div>');
			}else if(pointerImg == array.length-1){
				$('#img_preview').prepend('<div class="row clearfix" id="img_panel" title="kyc" style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" src="img/newprev.png"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" style="opacity:0.5" src="img/newnext.png"></div>');					
			}else{*/
//				$('#img_preview').prepend('<div class="row clearfix" id="img_panel" title="kyc" style="border-bottom: 1px solid #E5E5E5;"><img id="prevarrow" src="img/newprev.png"><img id="document_preview" src="" style="width: 86%; height: 100%; max-height: 400px"><img id="nextarrow" src="img/newnext.png"></div>');
$('#img_preview').prepend('<div class="row clearfix" id="img_panel" title="kyc" style="border-bottom: 1px solid #E5E5E5;"><img id="document_preview" src="" style="width: 100%; height: 100%; max-height: 400px"></div>');

			//			}
			
		}
		else{
			$('#img_preview').prepend('<div class="row clearfix" id="img_panel"><img id="document_preview" src=""></div>');
		}
//		$('#approve_rejectPanel').show();
	}
	/*$scope.onchange = function(id) {
		if(id!='Select'){
		$scope.load_details(id,"false");
		}else{
			$scope.load_details($rootScope.refID,"true");
			$scope.authenticate('NRPRCS') = false;
		}
	    }
	*/
	$scope.saveApprvData=function(){
		if($('#ApprvValue').val()!='' && $('#tenorValue').val()!='' &&  $('#emiValue').val()!='' && $('#appr1Container').text()!='' && $('#appr2Container').text()!='' ){
		arrayApprvDesc=[];
		var remark = $('#appr1Container').text().replace("\t",' ');
		var subject = $('#appr2Container').text().replace("\t",' ');
		arrayApprvDesc.push({sJCode:null,sDescrip:null,sDocName:null,sSubTo:subject,sRemark:remark});
		var arr=[];
		var json=null;
	    json={
				'sHeader':{'sAppID':$scope.appltnID,'sInstID':$scope.InstitutionID,'sCroId':$scope.userid},
				'sRefID':$scope.refID,
				'sAppStat':"Approved",
				"aCroJustification":arrayApprvDesc,
				"bApprAmtExist":true,
				"dApprAmt":$('#ApprvValue').val(),
				"iTenor":$('#tenorValue').val(),
				"dEmi":$('#emiValue').val(),
				"aDedupeRefID":arr
				}
		 requestForStatus(json);
		 $('#approveReason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#appr1Container, #appr2Container,#approvemsg').text('');
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
					'sHeader':{'sAppID':$scope.appltnID,'sInstID':$scope.InstitutionID,'sCroId':$scope.userid},
					"sAppStat":"Declined",
					"aCroJustification":arrayDclnDesc, //not yet
					"aDedupeRefID ":  arr
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
	$scope.closeDclnData=function(){
		 $('#declinereason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#reason1container , #reason2container').text('');
		 $('#declinemsg').text("");
	}
	/*$scope.closeDclnPanel = function(){
		$('#declinereason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#reason1container , #reason2container').text("");
		 $scope.setFlag = false;
	}*/
	$scope.closeApprvData=function(){
		 $('#approveReason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#appr1Container , #appr2Container ,#approvemsg').text('');
		/* $('#ApprvValue').val("");
		 $('#emiValue').val("");
		 $('#tenorValue').val("");*/
	}
	
	$(document.body).on('change','select[id="select_addr"]',
			function() {
		var value = "#"+ $(this[this.selectedIndex]).val();
		if ($('#addr_detail').is(':parent')) {
			$('#addr_detail').children().hide();
		}
		$(value).show();
	});
	
	/*function checkImgStatus(status){
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
			 $scope.rejectFlag = true;
		}else{
			 $(document.body).find("#rjct").addClass("btn-default");
			 $(document.body).find("#apprv").addClass("btn-default");
			 $(document.body).find("#apprv").removeClass("btn-success");
			 $(document.body).find("#rjct").removeClass("reject");
		}
	}*/
//	**************************************************************************************************************************
	
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
//	******************************************
	/* $rootScope.onFileSelect = function($files) 
	   {       
		   $scope.status = ''; 
		   $scope.uploadedImg ="";
//		   var imageName = $(document.body).find('.modal-header').children('h4').children('h5').text();
		   var imageName = $(document.body).find('#myModalnew').find('.modal-title').find('h5').text();

			   // $files: an array of files selected, each file has
	  			for (var i = 0; i < $files.length; i++) 
	  			{    	
	  				fname=$files[0].name
//	  		    	var re = (/\.(gif|jpg|jpeg|tiff|png)$/i);
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
//				            console.log("binaryString: " + base64);
//				           	$scope.base64data="data:image/jpg;base64,"+ $scope.base64data;
				        	if($("#imgpreview1").attr("src")== undefined){
				        		 var json1 ={
					  					  "oHeader": {
					  					    "sAppID": $rootScope.applicID,
					  					    "sApplID": $rootScope.applicantID,
					  					    "sInstID": $scope.InstitutionID
					  					  },
					  					  "sRefID": $rootScope.refID,
					  					  "oUpldDtl": {
					  					    "sFileID": "1",
					  					    "sFileName": imageName+"_EVIDENCE1",
					  					    "sFileType": "JPG",
					  					    "sfileData":  base64.split(",")[1],
					  					    "sStat": $scope.statusVal,
					  					    "sReason":$('#reason').val()
					  					  }
					  					};
						        console.log("updated file1: ");
						        uploadImgSevice(json1 , '1');
				        	}
				        	else if($("#imgpreview2").attr("src")== undefined && $("#imgpreview1").attr("src")!= undefined){
				        		 var json2 ={
					  					  "oHeader": {
					  					    "sAppID": $rootScope.applicID,
					  					    "sApplID": $rootScope.applicantID,
					  					    "sInstID": $scope.InstitutionID
					  					  },
					  					  "sRefID": $rootScope.refID,
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
				        	
			  				
				        };
				        reader.readAsDataURL($files[i]);
				        $timeout(function() {
						}, 3000);
	  			}
	  		}
	   }*/
	/* $(document.body).find('#apprv').click(function(e){
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
 					    "sAppID": $rootScope.applicID,
 					    "sApplID": $rootScope.applicantID
 					  },
 					  "sRefID": $rootScope.refID,
 					  "sImageID":imageId,
 					  "oUpldDtl": {
 					    "sStat": "Approve",
 					    "sReason":""
 					  }
 					};
			 console.log("approve : "+JSON.stringify(json));
			 ImgSevice(json,imageName);
			 e.stopImmediatePropagation();

		});*/

	/* $(document.body).find('#rjct').click(function(e){
			 $(this).addClass("reject");
			 $(document.body).find("#apprv").addClass("btn-default");
			 $(document.body).find("#apprv").removeClass("btn-success");
			 $(document.body).find("#rjct").removeClass("btn-default");
			 $(document.body).find('#reason').show();
			 $(document.body).find('#submitreason').show();
			 $scope.statusVal = $(this).text();
			 e.stopImmediatePropagation();

		});
	 $(document.body).find('#submitreason').click(function(e){
			 var imageId = $(document.body).find('#myModalnew').find('.modal-title').find('h5').attr("title");
			 var imageName = $(document.body).find('#myModalnew').find('.modal-title').find('h5').text();
			 var reason =  $(document.body).find('#reason').val();
			 var json ={
 					  "oHeader": {
 					    "sAppID": $rootScope.applicID,
 					    "sApplID": $rootScope.applicantID
 					  },
 					  "sRefID": $rootScope.refID,
 					  "sImageID":imageId,
					  "oUpldDtl": {
					    "sStat": "Reject",
					    "sReason":reason
					  }
 					};
			 console.log("reject : "+JSON.stringify(json));
			 ImgSevice(json,imageName);//uncomment later
			 rejectArray.push({Name: imageName,Image:"",Reason:reason});
			 $(document.body).find('#reason, #submitreason').hide();
			 $rootScope.rejectArray=rejectArray;
//			 console.log("array: "+JSON.stringify(rejectArray));
			 e.stopImmediatePropagation();
		});*/
	   /* function ImgSevice(json,name){
	    	$http({
				method : 'POST',
				url : serviceUrl+'update-image-status',
				data : json,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response) 
			{
				if(Response.sStatus == "SUCCESS"){
					var currStatus = json.oUpldDtl.sStat;
					var currReason = json.oUpldDtl.sReason;
					var id= json.sImageID;
					if(name=="PAN" ||name == "AADHAAR" ||name == "DRIVING-LICENSE" || name=="Driving License" ||name == "PASSPORT"){
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
					else{
						updateStatus(name,id,extra_array ,currStatus,currReason);
					}					
				}
			}).error(function(error) {
				$scope.error = 'Sorry ! We could not process this request...!';		
			});
	    }*/
	   /* function updateStatus(name,id,array,status,reason){
	    	for(i=0 ; i<array.length ; i++){
				if(name == array[i].kyc_name && id==array[i].ImageID){
					if(status == "Reject"){
						array[i].img_reason = reason; 
						$scope.rejectFlag = true;
					}else{
						array[i].reason ='';
					}
					array[i].img_status =status; }
				}
	    }*/
	    
		/*function uploadImgSevice(jsondata , index ){
			$http({
					method : 'POST',
					url : serviceUrl+'upload-image', //'http://gng.softcell.in/GoNoGo/upload-image',
					data : jsondata,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(Response) 
				{console.log("upload : "+JSON.stringify(jsondata));
					if(Response.sStatus == 'SUCCESS'){
						if(index == '1'){
						$("#imgpreview1").show();
							$rootScope.uploadedImg1 = "data:image/jpg;base64,"+jsondata.oUpldDtl.sfileData;
						}
						else if(index == '2'){
							$("#imgpreview2").show();
							$rootScope.uploadedImg2 = "data:image/jpg;base64,"+jsondata.oUpldDtl.sfileData;
						}
						else{
							console.log("approved declined");
						}
					}
					console.log("response: "+JSON.stringify(Response));
				}).error(function(error) {
					$scope.error = 'Sorry ! We could not process this request...';		
				});
		} */
		
		function ageCalculator()
		{
			var dat = $scope.fullData.oAppReq.oReq.oApplicant.aEmpl[0].sDtJoin;
			var age;
			if(dat =="")
				{
				age=0;	
				}
			else{
					var day = dat.slice(0,2);
					var month = dat.slice(2,4);
					var yr = dat.slice(4,8);
					var convert;
					var format = yr+"/"+month+"/"+day;
					var birthdate = new Date(format);
					var cur = new Date();
					var diff = cur-birthdate; // This is the difference in milliseconds
					age = Math.floor(diff/31536000000); // Divide by 1000*60*60*24*365 in year 
					age = age*12;
			  }
			console.log("age :"+age);
			return age;
		}

}]);

app.filter('dateFormat', function() {
	return function(item) {
		var month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec' ],
		curdate= new Date(new Date()),
		dt=curdate.getDate(),
		mnth=curdate.getMonth()+1,
		year=curdate.getFullYear(),
		receivedDay = new Date(item).getDate(),
		receivedMon = new Date(item).getMonth()+1,
		result,time;
		
		if(receivedDay == dt && receivedMon== mnth){
			result = new Date(item).getHours()+":"+new Date(item).getMinutes()+":"+new Date(item).getSeconds();
			
			//am pm pending
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