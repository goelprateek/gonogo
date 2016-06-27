;(function(){

	'use strict';

	var app = angular.module('gonogo');

	app.controller('NotifController', ['$scope','$rootScope', 
								'$timeout','Validation','$filter',
								'RestService',function($scope, $rootScope, $timeout,Validation,$filter,RestService){
	
	var height=$(window).height()-200;
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
	var tempReject=[];
	$scope.setFlag = false;
	$scope.countSelected="Select";
	$scope.losStatus1="";
	$('#losStatusId1').val("");
	$('#losId').val('');
	$('#losId').css("border","1px solid #cfcfcf");
	$scope.set={}; 
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
					var json ={'sCroID':"STP_PL", //default
							'sInstID':$scope.InstitutionID, 
							'sGrpID':"0", 'iSkip': minimum, 'iLimit' : $scope.limit }
				}else{
					var json ={'sCroID':"STA", //default
							'sInstID':$scope.InstitutionID,
							'sGrpID':"0" , 'iSkip': minimum, 'iLimit' : $scope.limit}
				}
			}else if($scope.userid=="586"){
				var json ={'sCroID':"PL_QUEUE", //default
						'sInstID':$scope.InstitutionID, 
						'sGrpID':"0" , 'iSkip': minimum, 'iLimit' :$scope.limit }
			}
			else{var json ={'sCroID':"default", //default
						'sInstID':$scope.InstitutionID, 
						'sGrpID':"0" , 'iSkip': minimum, 'iLimit' :$scope.limit }
				}
			var URL;
			if(croQueue){
				URL = 'cro-queue';
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
	                  
	$scope.employment_type = $scope.jobType[0];
	$scope.addr_type = $scope.addrType[1];
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
	}],
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
	{'Name':'Rejected Proof',
		'ID':'4',
		'Icon':'img/rejected proof.png',
		'Count':'5',
		'Offers':[]
	}];

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
			$scope.fullData = Response;
			$(document.body).find('#cirhtml').attr("data", "").hide();
			$scope.error = "";
			$scope.done = "";
			$scope.appScore ='';
			$scope.tree ='';
			$scope.pdf ='';
			docData[4].Offers=[];
			$('#descReason').val("");
			$("#approvemsg").text("");
			$rootScope.rejectArray=[];
			$scope.rejectFlag = false;
			$scope.losID="";
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
			
			temp=[];
			passport=[];
			dlicen=[];
			adhar=[];			
			$rootScope.uploadedImg1 ='';
			$rootScope.uploadedImg2 ='';
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
			$scope.evidPresent=false;
			
			$scope.fullData = Response;
			$rootScope.applicantID = Response.oAppReq.oReq.oApplicant.sApplID;
			$scope.kycid =Response.oAppReq.oReq.oApplicant.sApplID;
			$rootScope.applicationID = Response.oAppReq.sRefID;
			$rootScope.applicID = Response.oAppReq.oHeader.sAppID;
			var data = 	$scope.notifarray;

			for (var j in data)
			{if(data[j].sRefID == $rootScope.applicationID){
					$scope.applctnstatus = data[j].sStat;}
			}
			$scope.details = Response.oAppReq;
			$scope.applicant = Response.oAppReq.oReq.oApplicant;
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
			$scope.assetData =Response.oAppReq.oReq.oApplication.aAssetDetail;
			$scope.dealership = Response.oAppReq.oReq.oApplication.aAssetDetail[0].sDlrName;

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
				var data = Response.aAppImgDtl;
				for (j in data)
				{

						$scope.appkycimg = data[j].aImgMap;
						applicantImg(data[j].aImgMap);

				}
				$scope.array = $scope.appkycimg;
			}
			catch(error){
				$scope.array = '';
			}
			try{

				$scope.pdf ="data:application/pdf;base64,"+Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];

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
				  $scope.DetailsResp=Response.oCompRes.scoringServiceResponse["DECISION_RESPONSE"].Details;
				 
			}catch(error){
				  $scope.DetailsResp="";
			}
			try{
				 $scope.Emi = Response.aCroDec[0].dEmi;	
			}catch(error){
				  $scope.Emi ="";
			}
			try{
				$scope.Eremark=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"].REMARK;
				$scope.ElgbltyGrid=Response.oCompRes.scoringServiceResponse["ELIGIBILITY_RESPONSE"]["RULE-SEQ"];
			}catch(error){
				$scope.Eremark="";
				$scope.ElgbltyGrid="";
			}
		  try{
			  $scope.eligibility = Response.oElgGrdOut.dElgAmt;
			  $scope.decision = Response.oElgGrdOut.sDec;
			  $scope.score =Response.oCompRes.multiBureauJsonRespose.FINISHED[0]["JSON-RESPONSE-OBJECT"].scoreList[0].score;
		  }catch(error){
			  $scope.eligibility = "";
			  $scope.decision = "";
			  $scope.score = "";
		  }
		  try{
			  if(flag == "true"){
			  if(typeof Response.aDeDupe !== "undefined" && Response.aDeDupe.length != 0){
				  if(Response.aDeDupe !='' || Response.aDeDupe !=null){
					  var dedupeArray = Response.aDeDupe;
						var arrayData=[];
						for (j in dedupeArray)
						{arrayData.push(dedupeArray[j].sRefID);}
						$scope.dedupeArray = arrayData;	
				  }else{$scope.dedupeArray= false;}
			  }else{$scope.dedupeArray= false;}
			  }
			  }
			catch(e) {
				$scope.dedupeArray = "";
			}
			try{
			$scope.appldAmount = Response.oAppReq.oReq.oApplication.dLoanAmt;
			}catch(e){
				$scope.appldAmount = '';
			}
			try{
				  $scope.croDec=Response.aCroDec[0];
			}catch(error){
				$scope.croDec="";
			}
			try{
				$scope.offAddrStab= Response.oIntrmStat.oOffAddressResult.iAddrStblty;
				$scope.resAddrStab= Response.oIntrmStat.oResAddressResult.iAddrStblty;
			}catch(e){
				$scope.offAddrStab="";
				$scope.resAddrStab="";
			}
			try{
				if(!Response.oLosDtls.sLosID)
				{
				$timeout(function(){
				$scope.losID="";
				 $(document.body).find('#losId').prop('disabled', false);
				});
				}else{	
					$timeout(function(){
					$scope.losID= Response.oLosDtls.sLosID;
					$('#losId').val(Response.oLosDtls.sLosID);
					 $(document.body).find('#losId').prop('disabled', true);
					});
				}
				
				if(!Response.oLosDtls.sStat)
					{
					$timeout(function(){
					 $('#losStatusId1').val("");
					 $scope.losStatus1 ="";
					});
					}else{	
						$timeout(function(){
							$('#losStatusId1').val(Response.oLosDtls.sStat);
							$scope.losStatus1 = Response.oLosDtls.sStat;
							if(Response.oLosDtls.sStat == "LOS_DISB"){
								 $(document.body).find('#utrData').prop('disabled', false);
							}else{
								 $(document.body).find('#utrData').prop('disabled', true);
								 $(document.body).find('#utrData').val("");
								 $(document.body).find('#utrData').css("border","1px solid #cfcfcf");
							}
						});
					}
			}catch(e){
				 $scope.losID="";
				 $(document.body).find('#losId').prop('disabled', false);
				 $('#losStatusId1').val("");
				 $scope.losStatus1 ="";
			}
			try{
				$scope.supecious = Response.oAppReq.oReq.sSuspAct;
			}catch(e){
				$scope.supecious ="";
			}
			try{
				$scope.croRemark = Response.aCroJustification;
			}catch(e){
				$scope.croRemark = "";
			}
			try{
				if(!Response.oLosDtls.sUtr)
				{
					$timeout(function(){
						$scope.utrValue = "";
					});
				}else{	
					$timeout(function(){
					$scope.utrValue = Response.oLosDtls.sUtr;
					$(document.body).find('#utrData').val(Response.oLosDtls.sUtr);
					$(document.body).find('#utrData').prop('disabled', true);
					});
				}
				$scope.utrValue = Response.oLosDtls.sUtr;
			}catch(e){
				$scope.utrValue = "";
			}
			try{
				$scope.CureentLoan = Response.oAppReq.oReq.oApplicant.aBankingDetails[0].sCurRunLon;
				$scope.loanEmi = Response.oAppReq.oReq.oApplicant.aBankingDetails[0].sAnyEmi;
				
			}catch(e){
				$scope.CureentLoan ='';
				$scope.loanEmi = '';
			}
			if(!croQueue){	
				$scope.newApplication(CustID);
			}
	});
}
	
	$scope.cro_action = function(appID, action){ 
		$scope.appltnID = appID;
		$scope.actions = action;
		if(($scope.applctnstatus.toUpperCase() == "QUEUE") || (!croQueue)){
			var arr=[];
			if((appID !== "undefined") && (typeof $scope.details !== "undefined")){
				 if(action == "OnHold"){
					 console.log("final array : "+JSON.stringify(rejectArray));
					 var data= $rootScope.rejectArray;
					 for (j in data){
								docData[4].Offers.push(data[j]);
					 }	
					 $('div[contextmenu="blur"]').addClass("blured");
					 $('#OfferPanel').slideDown();
					 $scope.flag = true;
					 
					 dataset =docData;
					 
					 $scope.OfferArrey =dataset ;
					 
					 $scope.AvailebleOffers = $scope.OfferArrey[0].Offers;
					 
					 $scope.ID = 0;
					 
					 $('#SendOffer').text("Request Document");
					 
					 $('#SendOffer').css("width","19%");
					 
					 setTimeout(function() { 	
						 $(document.body).find('div[id^="OfferBox"]').css("background-color","#fff");
						 $(document.body).find('#OfferBox0').css("background-color","#F4F8F9");
					 },100);
				 
				 }else if(action == "Declined"){
				
					 $('div[contextmenu="blur"]').addClass("blured");
					 $('#declinereason').slideDown();
					 $('#reason1container,#reason2container').text('');
				 
				 }else{
						 $('div[contextmenu="blur"]').addClass("blured");
						 $('#approveReason').show();
						 $('#appr1Container,#appr2Container').text(''); 
						$scope.error = "Please select enquiry from Queue...!!!";
						$scope.done = "";
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
					"aDedupeRefID": ($scope.dedupeArray ? $scope.dedupeArray : arr)
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
	 
	 function  requestFordecline(json){
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
	});	}
 $scope.updateStatus=function()
 {  
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

	$(document.body).on("click","#back",function(){
		// alert("Closing...");
		$("#application-main-container").slideUp();				
		$("#notification-main-container").show();
		$timeout(function(){
		$('#losStatusId1').val("");
		$scope.losStatus1 ="";
		$('#losId').val('');
		$('#losId').css("border","1px solid #cfcfcf");
	
		});
	});

	$(document.body).on("click","#submit",function(){
if(Validation.validate())
	{   console.log("Amount="+$("#project_amount").val());
		$('.LoaderSpinner').show();
		$("#erro-msg").hide();
		var dataset = {
				'CUSTOMER' : {
					'name' : $scope.name,
					'city' : $("#city").val(),
					'address' : $scope.address1+","+$scope.address2,
					'mobile' : $scope.mobile,
					'email' : $scope.email,
					// 'employer' : $("#job_compnay_name").val(),
					'timeEmployer' : $scope.time_employer.value,
					'dob' : $('#dob').val(),
					'gender':$scope.gender,
					'timeAddress' : $scope.time_address.value,
					// / 'grossAnnual' : $scope.gross_annual.replace(/,/g , ""),
					// 'currentEmi' : $scope.current_emi.replace(/,/g , ""),
					'lastMonthIncome' : $scope.lmth.replace(/,/g , ""),
					'lastLastMonthIncome' : $scope.llmth.replace(/,/g , ""),
					'pincode': $scope.pin,
					'state':$("#statelist").val(),
					'maritalStatus':$scope.maritalStatus

				},
				'DSA' : {
					'DsaID':$scope.userid
				},
				'KYC' : {
					'pan' : $scope.pan,
					'aadhar' : $scope.aadhar,
					'panStatus' : 'Unverified',
					'aadharStatus' : 'Unverified',
				},
				'PROPERTY' : {
					'ProjectName' : $("#projectname").val(),
					'Amount' : $scope.Amount.toString().replace(/,/g ,""),
					'Location' : $("#city").val()
				},
				'APPLICATION':{
					'INSTITUTION_ID':$scope.InstitutionID,
					'AppType':'01'
				}
		};

	}else{
		$("#erro-msg").show();
	}

	});

	$scope.newApplication = function(refid)
	{ 
		$('#dob').datepicker({changeMonth: true, changeYear: true, yearRange: "1945:1997", dateFormat: 'dd:M:yy'});
		if(croQueue){//for CRO1 and CRO9
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
			$scope.name = $scope.details.oReq.oApplicant.oApplName.sFirstName+"  "+ $scope.details.oReq.oApplicant.oApplName.sMiddleName+"  "+ $scope.details.oReq.oApplicant.oApplName.sLastName.replace("null","");							    	
			$scope.mobile = $scope.details.oReq.oApplicant.aPhone[0].sPhoneNumber;
			$scope.Amount = $scope.details.oReq.oApplication.dLoanAmt;
			$scope.email = $scope.details.oReq.oApplicant.aEmail;//[0].sEmailAddr
			$scope.dob = $scope.details.oReq.oApplicant.sDob.slice(0,2)+"/"+$scope.details.oReq.oApplicant.sDob.slice(2,4)+"/"+$scope.details.oReq.oApplicant.sDob.slice(4);
			$scope.gender = $scope.details.oReq.oApplicant.sApplGndr;
			$scope.age = $scope.details.oReq.oApplicant.iAge;
		}catch(error){
			$scope.name ="";							    	
			$scope.mobile = "";
			$scope.Amount = "";
			$scope.email = "";
			$scope.dob = "";
			$scope.gender ="";
			$scope.age ="";
		}
		try{
			var address = $scope.details.oReq.oApplicant.aAddr[0];	
			$scope.statelist= address.sState;
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
	$scope.project = $scope.details.oReq.oApplication.aAssetDetail[0].sAssetMake;	
	$scope.model= $scope.details.oReq.oApplication.aAssetDetail[0].sModelNo;

}catch(e){
	$scope.project ="";	
	$scope.model="";
}

		try{
		$scope.employment_type = $scope.jobType[3];
		$scope.time_employer = $scope.details.oReq.oApplicant.aEmpl[0].iTmWithEmplr+" Months";
		$scope.employer = $scope.details.oReq.oApplicant.aEmpl[0].sEmplName;
		$scope.gross_annual =  Validation.NoWithComma($scope.details.oReq.oApplicant.aEmpl[0].dGrossSal);
		$scope.current_emi =  $scope.details.oReq.oApplication.dEmi;
		$scope.loanAmt =  $scope.details.oReq.oApplicant.aEmpl[0].dmonthSal;
		$scope.education= $scope.details.oReq.oApplicant.sEdu;
		$scope.employment_type = $scope.details.oReq.oApplicant.aEmpl[0].sEmplType;
		$scope.workExp = $scope.details.oReq.oApplicant.aEmpl[0].sWorkExps;
		}catch(error){
			$scope.employment_type = "";
			$scope.time_employer = "";
			$scope.employer = "";
			$scope.gross_annual = "";
			$scope.current_emi =  "";
			$scope.loanAmt ="";
			$scope.education="";
			$scope.employment_type ="";
			$scope.workExp = '';
		}
		try{
			$scope.cro2Data =$scope.fullData.oPostIPA;
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
			var temp = $scope.details.oReq.oApplicant.aEmpl[0].sConst;
			var databoolean = getTime(temp,$scope.aplcntType);
			if(databoolean!=undefined)
			$scope.constitution = $scope.aplcntType[databoolean].text;
			else
				$scope.constitution = temp;
			$scope.credit = $scope.details.oReq.oApplicant.sCreditCardNum;
			$scope.tenor = $scope.details.oReq.oApplication.iLoanTenor;
						
		}catch(error){
			$scope.credit ="";
			$scope.tenor = "";
			$scope.constitution = "";
		}
		try{
			$scope.dealer = $scope.details.oReq.oApplication.aAssetDetail[0].sDlrName;
			$scope.assetctg = $scope.details.oReq.oApplication.aAssetDetail[0].sAssetCtg;

		}catch(e){
			$scope.dealer = "";
			$scope.assetctg ="";
		}
		try{
			$scope.cibilS = $scope.cibilScore.sFldVal;
			$scope.mStatus = $scope.details.oReq.oApplicant.sMarStat;
		}catch(e){
			$scope.cibilS ="";
			$scope.mStatus ="";
		}
		try{
			$scope.currStage = $scope.details.sCurrentStageId;
		}catch(error){
			$scope.currStage ="";
		}
		try{
			var fulladdress = $scope.details.oReq.oApplicant.aAddr;
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
		phoneArray = $scope.details.oReq.oApplicant.aPhone;
		
		$scope.phn = phoneArray;
	}catch(e){
		$scope.phn= '';
	}
	try{
		$scope.lastsalary = $scope.details.oReq.oApplicant.aEmpl[0].dmonthSal;
		$scope.resAddrRslt= $scope.fullData.oIntrmStat.oResAddressResult.iAddrStblty;
		if($scope.resAddrRslt=="-1"){
			$scope.resAddrRslt="";
		}else{
			$scope.resAddrRslt = $scope.resAddrRslt;
		}
		$scope.offAddrRslt= $scope.fullData.oIntrmStat.oOffAddressResult.iAddrStblty;
		if($scope.offAddrRslt=="-1"){
			$scope.offAddrRslt="";
		}else{
			$scope.offAddrRslt = $scope.offAddrRslt;
		}
	}catch(e){
		$scope.lastsalary ="";
		$scope.resAddrRslt="";
		$scope.offAddrRslt="";
	}
	try{
		$scope.ITamt =  $scope.details.oReq.oApplicant.aEmpl[0].dItrAmt;
	}catch(error){
		$scope.ITamt ='';
	}
		$('#Job').show();
		
	}
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
	}
	
	$scope.Load_Offer = function(NodeID,Obj){
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
	
	$scope.checkboxUpdate = function(Obj,id){ 
		if(Obj){
			
			if (typeof dataset[$scope.ID].selected != "undefined") { 
			 
			 	dataset[$scope.ID].selected.push(id);	
	      		
	      		if(typeof dataset[$scope.ID].Offers[id].selected == "undefined"){ 
	      			$.extend( dataset[$scope.ID].Offers[id], {'selected':'true'});
	      		}

	    	} else {
			  
				  var selected={'selected':[]};
				  
				  $.extend( dataset[$scope.ID], selected);
				  
				  dataset[$scope.ID].selected.push(id);	
	 	  	
		 	  	if(typeof dataset[$scope.ID].Offers[id].selected == "undefined"){
		 	  		 
		 	  		 $.extend( dataset[$scope.ID].Offers[id], {'selected':'true'});
		 	  	}
	        }	
	  
	  } else {
		
		dataset[$scope.ID].selected.splice($.inArray(id, dataset[$scope.ID].selected),1);
		
		delete dataset[$scope.ID].Offers[id].selected;
	  }

	  if((typeof dataset[$scope.ID].selected !="undefined") && (dataset[$scope.ID].selected.length > 0)){
		
		$('#active'+$scope.ID+'').css("background-color","green");
		
		$scope.OfferArrey = dataset;
	  
	  } else {
		$('#active'+$scope.ID+'').css("background-color","#fff");
	  }
	}


	$(document.body).on("click","#closeOffer" ,function() {
		  
		  docData[4].Offers=[];
		  
		  $('#OfferPanel').slideUp();
		  
		  $('#descReason').val("");
		  
		  $('#msg').text("");
		  
		  $('div[contextmenu="blur"]').removeClass("blured");
		  
		  $('#offrform').trigger('reset');
		  
		  $('div[id^="active"').css("background-color","#E4EDE4"); 
		  
		  $('#descReason').css("border","1px solid #999");
		  
		  for(j=0; j<$scope.OfferArrey.length ; j++){
			  for (i = 0; i <   $scope.OfferArrey[j].Offers.length ; i++) {
				  if( $scope.OfferArrey[j].Offers[i].selected)
					  $scope.OfferArrey[j].Offers[i].selected = false;
			  } 
		  }
	 });

	$scope.scoreTree = function(){
		
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
						$(document.body).find('#cirhtml').attr("data", $scope.pdf).show();
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
	 
	$(document.body).on('click','#applicant',function() 
	{
		$('#applicant').parent().addClass("active");
		$('a[id^="coapplicants"]').parent().removeClass("active");
		$scope.applicant =  $scope.applicantbckUp;
		$scope.kyc_data = $scope.details.oReq.oApplicant;
		$scope.currApplicant = $scope.kycid ;
		applicantImg($scope.appkycimg);
		$scope.$apply(); 
	});
	$scope.coapplicantdetails = function(id){
		$("#coapplicants"+id).parent().attr("class","active");
		$("#applicant").parent().removeClass("active");	
		$.each( $rootScope.coapplicant, function(i, temp) {
			if(i != id){
				$("#coapplicants"+i).parent().removeClass("active");	
			}
		});	
		$scope.applicant =  $rootScope.coapplicant[id];
		$scope.kyc_data = $scope.details.oReq.oCoApplicant[0];
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
			$scope.load_details($rootScope.refID,"true");
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
		$scope.losStatus1 =this.value;
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
				'sHeader':{'sAppID':$scope.appltnID,'sInstID':$scope.InstitutionID,'sCroId':$scope.userid},
				'sRefID':$scope.refID,
				'sAppStat':"Approved",
				"aCroJustification":arrayApprvDesc,
				"bApprAmtExist":true,
				"dApprAmt":$('#ApprvValue').val(),
				"iTenor":$('#tenorValue').val(),
				"dEmi":$('#emiValue').val(),
				"aDedupeRefID": ($scope.dedupeArray ? $scope.dedupeArray : arr)
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
					'sHeader':{'sAppID':$scope.appltnID,'sInstID':$scope.InstitutionID,'sCroId':$scope.userid},
					"sAppStat":"Declined",
					"aCroJustification":arrayDclnDesc, //not yet
					"aDedupeRefID ": ($scope.dedupeArray ? $scope.dedupeArray : arr)
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
	$scope.closeApprvData=function(){
		 $('#approveReason').slideUp();
		 $('div[contextmenu="blur"]').removeClass("blured");
		 $('#appr1Container , #appr2Container ,#approvemsg').text('');
		 $('#ApprvValue , #emiValue , #tenorValue').css("border","1px solid #999");
		 $('#ApprvValue').val("");
		 $('#ApprvValue').val($scope.croDec.dAmtAppr);
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
				         "sAppID":$rootScope.applicID,
				         "sInstID":$scope.InstitutionID,
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
						        uploadImgSevice(json1 , '1');
				        	}
				        	else if(($("#imgpreview2").attr("src")== undefined || $("#imgpreview2").attr("src")== "") && $("#imgpreview1").attr("src")!= undefined){
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
	 
	
	 
}]);


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