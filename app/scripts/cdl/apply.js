;(function(){
	'use strict';
	var app = angular.module('gonogo.cdl');

	

	app.controller("ApplyController", ["$scope", "$rootScope", "$http", "$timeout",
									   "$location", "$q", "APP_CONST", "sharedService", 
									   "RestService","$interval",'$log',"UserService",
									   "AclService","GNG_GA","$state","ApplyObject",
									   "UploadImages","notifier","$filter","SelectArrays",
	 					function($scope,$rootScope,$http,$timeout,
	 							$location,$q,APP_CONST,sharedService,
	 							RestService,$interval, $log,UserService,
	 							AclService,GNG_GA,$state,ApplyObject,
	 							UploadImages,notifier,$filter,SelectArrays) {

		var CustID = null;

		$scope.currentPageNumber=1;

		$scope.applicant = {
	        "suspected": "No",
	        "creditCard": "12312",
	        "gender": "Male",
	        "education": "DOCTORATE",
	        "maritalStat":"Single",
	        "dob":new Date(),
	        "constitution":"TRUST",
	        "sameAbove":false,
	        "application":{
	        	"loanType":"Consumer Durables",
	        	"loanAmt":"234234324",
	        	"tenor":"2"
	        },
	        "aKycDocs":[],
	        "empl":{
	        	"emplType":"SELF-EMPLOYED",
	        	"emplMob":"9579321319",
	        	"emplLandLine":"",
	        	"emplStd":"333",
	        	"emplITReturn":"3333",
	        	"emplSalary":"33333333",
	        	"emplMonthWithEmp":"33",
	        	"emplName":"Madras Chemicals",
	        	"emplEmail":"goelpratee@gmail.com",
	        	"emplState":"MAHARASHTRA",
	        	"emplCity":"PUNE",
	        	"emplPin":"411005",
	        	"emplAddr1":"asfds",
	        	"emplAddr2":"sdf",
	        	"emplAddr3":"sdfdsf"
	        },
	        "oResidence":{
	        	"oAddress":{
	        		"addrType":"OWNED-FLAT",
	        		"sAddress1":"asasf",
	        		"sAddress2":"asda",
	        		"sAddress3":"asdsa",
	        		"sState":"MAHARASHTRA",
	        		"sCity":"PUNE",
	        		"sPinCode":"411005",
	        		"addrType":"OWNED-FLAT",
	        		"iMonthCity":"33",
	        		"dRentPerMonth":"",
	        		"iMonthAddress":"3"
	        	},
	        	"oPhone":{
	        		"iMobile":"9579321319",
	        		"iLandLine":"",
	        		"sStdCode":"222"
	        	},
	        	"sEmail":"goelpratee@gmail.com"
	        },
	        "oPermanent":{
	        	"oAddress":{
	        		"addrType":"OWNED-FLAT",
	        		"sAddress1":"asasf",
	        		"sAddress2":"asasf",
	        		"sAddress3":"asasf",
	        		"sState":"",
	        		"sCity":"",
	        		"sPinCode":"411005",
	        		"addrType":"OWNED-FLAT",
	        		"iMonthCity":"33",
	        		"dRentPerMonth":"",
	        		"iMonthAddress":"3"
	        	},"oPhone":{
	        		"iMobile":"9579321319",
	        		"iLandLine":"",
	        		"sStdCode":"222"
	        	},
	        	"sEmail":"goelpratee@gmail.com"
	        },
	       	"asset":{
	       		"category":"",
	       		"make":"",
	       		"model":""
	       	}
        };

		$scope.kycArray=[];

		$scope.kycDocImages=[];

		$scope.addNewDocElement=function(pDocType,pDocNumber){
			if($scope.kycArray.length>0){
				$scope.kycArray.push({
					index:($scope.kycArray[$scope.kycArray.length-1].index+1),
					docType:pDocType,
					docNumber:pDocNumber,
					style:{
                    	background:'url("../images/camera-128.png") center/60px no-repeat'
                    },
                    isDefault:true
				});
  			}else{
  				$scope.kycArray.push({
  					index:1,
  					docType:pDocType,
  					docNumber:pDocNumber,
  					style:{
                   		background:'url("../images/camera-128.png") center/60px no-repeat'
                    },
                    isDefault:true
  				});
  			}
		};

		$scope.addNewDocElementImage=function(pDocName,pDocByteImage){
			var docNameFound=false;
			for(var docIndex=0;docIndex<$scope.kycArray.length;docIndex++){
				if($scope.kycArray[docIndex].docType===pDocName && $scope.kycArray[docIndex].isDefault){
					docNameFound=true;
					$scope.kycArray[docIndex].style={
                   		background:'url('+pDocByteImage+') center/contain no-repeat'
                    };
                    $scope.kycArray[docIndex].isDefault=false;
				}
			}

			if(!docNameFound){
				$scope.kycArray.push({
  					index:($scope.kycArray[$scope.kycArray.length-1].index+1),
  					docType:pDocName,
  					docNumber:'',
  					style:{
                   		background:'url('+pDocByteImage+') center/contain no-repeat'
                    },
                    isDefault:false
  				});
			}
		};

		$scope.removeKycDoc = function(pIndex){
			var spliceIndex = _.chain($scope.kycArray).pluck("index").indexOf(pIndex).value();
			$scope.kycArray.splice(spliceIndex,1);
			if($scope.kycDocImages[spliceIndex]){
				$scope.kycDocImages.splice(spliceIndex,1);
			}
		};

		var user=UserService.getCurrentUser();
    	$scope.can=AclService.can;

    	if(user.id){
        	$scope.$emit('onSuccessfulLogin');
   		}

   		$scope.suspectedActivities = ["Refer to Credit","Suspected Fraud","Confirmed Fraud"].map(function(activity){
   			return {view : activity}
   		}),
   		$scope.genders = ["Male" , "Female"].map(function(gender){
   			return {view:gender};
   		}),
   		$scope.qualifications = ["DOCTORATE","GRADUATE","POST-GRADUATE","PROFESSIONAL","UNDER GRADUATE","OTHERS"].map(function(qualification){
   			return {view:qualification}
   		}),
   		$scope.maritalStat = ["Single","Married"].map(function(status){
   			return {view:status};
   		}),
   		$scope.consitutions = ["TRUST","SELF-EMPLOYED","SALARIED","PARTNERSHIP","PRIVATE LIMITED COMPANY"].map(function(consitution){
   			return {view:consitution};
   		}),
   		$scope.residenceTypes = SelectArrays.getResidenceTypes().map(function(resType){
   			return {view:resType.value};
   		}),
   		$scope.employmentTypes = SelectArrays.getEmploymentType().map(function(empType){
   			return {view:empType};
   		}),
   		$scope.employerNames = {
	    	employerName : loadAll(),
		    simulateQuery:false,
		    isDisabled:false,
		    querySearch: querySearch,
	    }

	    function querySearch (query) {
	    	
	      var results = query ? $filter("filter")($scope.employerNames.employerName.$$state.value,query) : $scope.employerNames.employerName;
	      console.log(results);
	      return results;
	    }

	    function createFilterFor(query) {
	      var lowercaseQuery = angular.lowercase(query);

	      return function filterFn(item) {
	      	return (item.value.indexOf(lowercaseQuery) === 0);
	      };

	    }

	    function loadAll(){
	    	
	    	var ojs={"oHeader":{"sInstID":user.institutionID},"sQuery":''};
	    	
			return RestService.saveToServer("employer-master-details-web",ojs).then(function(data){
				return _.map(data,function(item){
			        return item.sEmpName;
		      	});
 			});
	    }

   		var nextState=function(currentState) {
	      switch (currentState) {
	          case '/cdl/apply.personal':
	              return '/cdl/apply.address'
	              break;
	          case '/cdl/apply.address':
	              return '/cdl/apply.professional'
	              break;
	          case '/cdl/apply.professional':
	              return '/cdl/apply.asset';
	              break;
	          case '/cdl/apply.asset':
	          	  return '/cdl/apply.kyc';
	          	  break;	
	          case '/cdl/apply.kyc' :
	          		return '';
	          		break;
	          default:
	              alert('Did not match any switch');
	      }
	      
	    };

	    $scope.onNextClicked=function(isInvalid){
	      if(isInvalid) {
	      	$scope.currentPageNumber++;
	        $state.go(nextState($state.current.name));
	      } 
		};

    	// Start : If from step 1 screen
		if(sharedService.getRefID()){
			$scope.referenceID=sharedService.getRefID();
			CustID=sharedService.getRefID()
		}else{
			$location.path("/cdl/basic-de");
		}
		sharedService.setRefID(null);

		if(sharedService.getApplicationID()){
			$scope.applicationID=sharedService.getApplicationID();
		}
		sharedService.setApplicationID(null);

		if(sharedService.getStep1Object()){
			$scope.applicationObject=sharedService.getStep1Object();
			sharedService.setStep1Object(null);

			var _applicant=$scope.applicationObject.oReq.oApplicant;
			$scope.fname=_applicant.oApplName.sFirstName;
	  		$scope.mname=_applicant.oApplName.sMiddleName;
	  		$scope.lname=_applicant.oApplName.sLastName;

	  		$scope.dealerCode=$scope.applicationObject.oHeader.sDealerId;
	  		$scope.dealerName=$scope.applicationObject.oReq.oApplication.aAssetDetail[0].sDlrName;
			$scope.applicant.oResidence.oPhone.iMobile=_applicant.aPhone[0].sPhoneNumber;
			
			if(_applicant.aKycDocs){
				for(var kycDocIndex=0;kycDocIndex<_applicant.aKycDocs.length;kycDocIndex++){
		  			$scope.addNewDocElement(_applicant.aKycDocs[kycDocIndex].sKycName,_applicant.aKycDocs[kycDocIndex].sKycNumber);
	  			}
	  		}else{
	  			$scope.addNewDocElement("","");
	  		}

  			$scope.applicant.application.loanType=$scope.applicationObject.oReq.oApplication.sLoanType;
		}
		// End : If from step 1 screen

	sharedService.setRefID(null);
	sharedService.setCurrentStage(null);

	if($scope.applicationObject==null && CustID!=null && CustID!="") {
		var URL='';
		var json ={'sRefID':CustID};
		URL = 'dashboard-application-data';

		RestService.saveToServer(URL,json).then(function(Response){

			$scope.fname=Response.oReq.oApplicant.oApplName.sFirstName;
	  		$scope.mname=Response.oReq.oApplicant.oApplName.sMiddleName;
	  		$scope.lname=Response.oReq.oApplicant.oApplName.sLastName;

	  		if(Response.oReq.oApplication.aAssetDetail && Response.oReq.oApplication.aAssetDetail.length>0){
	  			$scope.dealerName=Response.oReq.oApplication.aAssetDetail[0].sDlrName;
	  		}
			if(Response){
				$scope.dealerCode=Response.oHeader.sDealerId;

		  		var mApplicant=Response.oReq.oApplicant;

		  		if(mApplicant.aPhone){
		  			for(var i=0;i<mApplicant.aPhone.length;i++){
		  				if(mApplicant.aPhone[i].sPhoneType==="PERSONAL_MOBILE"){
		  					$scope.applicant.oResidence.oPhone.iMobile=mApplicant.aPhone[i].sPhoneNumber;
		  				}else if(mApplicant.aPhone[i].sPhoneType==="PERSONAL_PHONE"){
		  					$scope.applicant.oResidence.oPhone.sStdCode=mApplicant.aPhone[i].sAreaCode;
							$scope.applicant.oResidence.oPhone.iLandLine=mApplicant.aPhone[i].sPhoneNumber;
		  				}else if(mApplicant.aPhone[i].sPhoneType==="RESIDENCE_PHONE"){
		  					$scope.applicant.oPermanent.oPhone.sStdCode=mApplicant.aPhone[i].sAreaCode;
							$scope.applicant.oPermanent.oPhone.iLandLine=mApplicant.aPhone[i].sPhoneNumber;
		  				}else if(mApplicant.aPhone[i].sPhoneType==="RESIDENCE_MOBILE"){
		  					$scope.applicant.oPermanent.oPhone.iMobile=mApplicant.aPhone[i].sPhoneNumber;
		  				}else if(mApplicant.aPhone[i].sPhoneType==="OFFICE_PHONE"){
		  					$scope.applicant.empl.emplStd = mApplicant.aPhone[i].sAreaCode;
							$scope.applicant.empl.emplLandLine = mApplicant.aPhone[i].sPhoneNumber;
		  				}else if(mApplicant.aPhone[i].sPhoneType==="OFFICE_MOBILE"){
		  					$scope.applicant.empl.emplMob = mApplicant.aPhone[i].sPhoneNumber
		  				}					  				
		  			}
		  		}

		  		if(mApplicant.aKycDocs){
		  			for(var kycDocIndex=0;kycDocIndex<mApplicant.aKycDocs.length;kycDocIndex++){
			  			$scope.addNewDocElement(mApplicant.aKycDocs[kycDocIndex].sKycName,mApplicant.aKycDocs[kycDocIndex].sKycNumber);
		  			}
		  		}else{
		  			$scope.addNewDocElement("","");
		  		}

		  		$scope.applicant.sameAbove=mApplicant.residenceAddSameAsAbove;
		  		$scope.applicant.application.loanType=Response.oReq.oApplication.sLoanType;

				//TODO
				$scope.referenceID=CustID;
				$scope.applicant.suspected=(!Response.oReq.sSuspAct) ? "No" : Response.oReq.sSuspAct;
				$scope.applicant.creditCard=mApplicant.sCreditCardNum;

				$scope.applicant.gender=(!mApplicant.sApplGndr) ? "Male" : mApplicant.sApplGndr;
				$scope.applicant.education=mApplicant.sEdu;
				$scope.applicant.maritalStat=(!mApplicant.sMarStat) ? "Single" : mApplicant.sMarStat;

				if(mApplicant.sDob && mApplicant.sDob!=""){
					var dateOfBirth=new Date();
	                dateOfBirth.setFullYear(parseInt(mApplicant.sDob.slice(4)));
	                dateOfBirth.setDate(parseInt(mApplicant.sDob.slice(0,2)));
	                dateOfBirth.setMonth((parseInt(mApplicant.sDob.slice(2,4))-1));

	                $scope.applicant.dob=dateOfBirth;
				}else{
					var dateOfBirth=new Date();
	                dateOfBirth.setFullYear(new Date().getFullYear()-25);
	                $scope.applicant.dob=dateOfBirth;
				}

				if(mApplicant.aEmpl && mApplicant.aEmpl.length>0)
				{
					$scope.applicant.constitution=mApplicant.aEmpl[0].sConst;
					if($scope.applicant.constitution === "SELF-EMPLOYED")
					{
						$scope.applicant.empl.emplType="SELF-EMPLOYED";
					}else{
						$scope.applicant.empl.emplType="";
					}

					$scope.applicant.empl.emplName =Response.oReq.oApplicant.aEmpl[0].sEmplName;
					$scope.applicant.empl.emplType = Response.oReq.oApplicant.aEmpl[0].sEmplType;
					$scope.applicant.empl.emplMonthWithEmp = (Response.oReq.oApplicant.aEmpl[0].iTmWithEmplr == 0 ? '' :Response.oReq.oApplicant.aEmpl[0].iTmWithEmplr);
					$scope.applicant.empl.emplSalary = Response.oReq.oApplicant.aEmpl[0].dmonthSal;
					$scope.applicant.empl.emplITReturn =Response.oReq.oApplicant.aEmpl[0].dItrAmt;
				}
				$scope.applicant.application.loanAmt=Response.oReq.oApplication.dLoanAmt;
				$scope.applicant.application.tenor=(Response.oReq.oApplication.iLoanTenor == 0 ? '' : Response.oReq.oApplication.iLoanTenor);

				if(mApplicant.aEmail){
		  			for(var i=0;i<mApplicant.aEmail.length;i++){
		  				if(mApplicant.aEmail[i].sEmailType==="PERSONAL"){
		  					$scope.applicant.oResidence.sEmail = mApplicant.aEmail[i].sEmailAddr;
		  				}else if(mApplicant.aEmail[i].sEmailType === "PERMANENT"){
		  					$scope.applicant.oPermanent.sEmail = mApplicant.aEmail[i].sEmailAddr;
		  				}else if(mApplicant.aEmail[i].sEmailType === "WORK"){
		  					$scope.applicant.empl.emplEmail = mApplicant.aEmail[i].sEmailAddr;
		  				}
		  			}
		  		}

				if(mApplicant.aAddr){
					for(var i=0;i<mApplicant.aAddr.length;i++){
						if(mApplicant.aAddr[i].sAddrType=="RESIDENCE"){
							$scope.applicant.oResidence.oAddress.addrType = mApplicant.aAddr[i].sResAddrType;
							$scope.applicant.oResidence.oAddress.dRentPerMonth = mApplicant.aAddr[i].dRentAmt;
							$scope.applicant.oResidence.oAddress.sAddress1 = mApplicant.aAddr[i].sLine1;
							$scope.applicant.oResidence.oAddress.sAddress2 = mApplicant.aAddr[i].sLine2;
							$scope.applicant.oResidence.oAddress.sAddress3 = mApplicant.aAddr[i].sLine3;
							$scope.applicant.oResidence.oAddress.sPinCode = (mApplicant.aAddr[i].iPinCode == 0 ? '' : mApplicant.aAddr[i].iPinCode);
							$scope.applicant.oResidence.oAddress.sCity = mApplicant.aAddr[i].sCity;
							$scope.applicant.oResidence.oAddress.sState = mApplicant.aAddr[i].sState;
							$scope.applicant.oResidence.oAddress.iMonthAddress = (mApplicant.aAddr[i].iMonthAtAddr == 0 ? '' :mApplicant.aAddr[i].iMonthAtAddr);
							$scope.applicant.oResidence.oAddress.iMonthCity = (mApplicant.aAddr[i].iMonthAtCity == 0 ? '' : mApplicant.aAddr[i].iMonthAtCity);
						}else if(mApplicant.aAddr[i].sAddrType=="PERMANENT"){
							$scope.applicant.oPermanent.oAddress.addrType = mApplicant.aAddr[i].sResAddrType;
							$scope.applicant.oPermanent.oAddress.dRentPerMonth = mApplicant.aAddr[i].dRentAmt;
							$scope.applicant.oPermanent.oAddress.sAddress1 = mApplicant.aAddr[i].sLine1;
							$scope.applicant.oPermanent.oAddress.sAddress2 = mApplicant.aAddr[i].sLine2;
							$scope.applicant.oPermanent.oAddress.sAddress3 = mApplicant.aAddr[i].sLine3;
							$scope.applicant.oPermanent.oAddress.sPinCode = (mApplicant.aAddr[i].iPinCode == 0 ? '' : mApplicant.aAddr[i].iPinCode);
							$scope.applicant.oPermanent.oAddress.sCity = mApplicant.aAddr[i].sCity;
							$scope.applicant.oPermanent.oAddress.sState = mApplicant.aAddr[i].sState;
							$scope.applicant.oPermanent.oAddress.iMonthAddress = (mApplicant.aAddr[i].iMonthAtAddr == 0 ? '' : mApplicant.aAddr[i].iMonthAtAddr);
							$scope.applicant.oPermanent.oAddress.iMonthCity = (mApplicant.aAddr[i].iMonthAtCity == 0 ? '' : mApplicant.aAddr[i].iMonthAtCity);
						}else if(mApplicant.aAddr[i].sAddrType=="OFFICE"){
							$scope.applicant.empl.emplAddr1 = mApplicant.aAddr[i].sLine1;
							$scope.applicant.empl.emplAddr2 = mApplicant.aAddr[i].sLine2;
							$scope.applicant.empl.emplAddr3 = mApplicant.aAddr[i].sLine3;
							$scope.applicant.empl.emplPin = (mApplicant.aAddr[i].iPinCode == 0 ? '' :mApplicant.aAddr[i].iPinCode);
							$scope.applicant.empl.emplCity = mApplicant.aAddr[i].sCity;
							$scope.applicant.empl.emplState = mApplicant.aAddr[i].sState;
						}
					}
				}


				var assetDetails=Response.oReq.oApplication.aAssetDetail;

				if(assetDetails && assetDetails.length>0){
					$scope.applicant.asset.category = Response.oReq.oApplication.aAssetDetail[0].sAssetCtg;
					$scope.applicant.asset.make = Response.oReq.oApplication.aAssetDetail[0].sAssetMake;
					$scope.applicant.asset.model = Response.oReq.oApplication.aAssetDetail[0].sModelNo;
				}

				function kyc_img(kycName , imgId ,status , reason,value){
					var json ={'sImgID':imgId}
					var URL = 'get-image-by-id-base64';
					RestService.saveToServer(URL,json).then(function(Response){

						if(Response && Response.sByteCode){
							if(kycName!=="APPLICANT-PHOTO"){
								$scope.addNewDocElementImage( kycName , "data:image/png;base64,"+Response.sByteCode );
							}else{
								$scope.applicantPhoto={
									doc:"Applicant Photo",
									value:"APPLICANT-PHOTO",
									index:1,
									image:"data:image/png;base64,"+Response.sByteCode,
                   					isDefault:false
                   				};
							}
						}
					},function(error){
						$scope.error = "Sorry, unable to fetch images from server !!";					
					});
				};

				var json ={'sRefID':CustID};

				RestService.saveToServer('application-images',json).then(function(Response){
					if(Response!=null && Response!=="")
					{
						var data = Response;
						if(data[0]){
							for(var info=0; info<data[0].aImgMap.length; info++)
							{
								kyc_img(data[0].aImgMap[info].sImgType , data[0].aImgMap[info].sImgID, data[0].aImgMap[info].sStat, data[0].aImgMap[info].sReason, data[0].aImgMap[info].sImgVal);
							}
						}
					}
				},function(error){
					$scope.error = "Sorry, unable to fetch images from server !!";					
				});
			}
		});
	}else{
		if(user.dealer){			
			$scope.dealerCode=user.dealer["DEALER_CODE"];
			$scope.dealerName=user.dealer["DEALER_NAME"];
		}else{
			$location.path("/cdl/dealer");
		}
	}

	if(!$scope.applicantPhoto){
		$scope.applicantPhoto={
				doc:"Applicant Photo",
				value:"APPLICANT-PHOTO",
				index:1,
				image:null,
				isDefault:true
			};
	}

	$scope.serviceHitCount=1;
	var img_array=[];
	var addkyc_array=[];
	$scope.selectImg ="";
	$scope.selectImg2 ="";
	$scope.selectImg3="";
	$scope.address="";
	var lcount=1;
	$scope.verifyMob=true;
	$scope.verif=true;
	

$scope.onChanged=function(type,val)
{
	switch (type) {

	case "CONSTITN":
	
	 	if($scope.applicant.constitution === "SELF-EMPLOYED")
		{
			$scope.applicant.empl.emplType="SELF-EMPLOYED";
		}else{
			$scope.applicant.empl.emplType="";
		}
		break;
	case "WRKTYPE":
			$scope.applicant.empl.emplITReturn="";
			$scope.applicant.empl.emplSalary="";
		break;
		
	default:
		break;
	}
}

$scope.stateChanged = function (val){
	if(val==true)
		{
			if($scope.applicant.oPermanent==undefined){
				$scope.applicant.oPermanent="";
			}
			var backUpResidenceData = angular.copy($scope.applicant.oResidence);
			$scope.applicant.oPermanent = backUpResidenceData;
			
		}else{
				$scope.applicant.oPermanent="";
		}
	}

$scope.pinService = function(pin,id){
	if(pin && pin.length == 6){
		var pinJson ={"oHeader":{"sInstID":user.institutionID},"sQuery":pin}; 

		RestService.saveToServer('pincode-details-web', pinJson).then(function(successResponse){
			if(successResponse){
				if( id =="perpin")
				{
					$scope.applicant.oResidence.oAddress.sCity = successResponse.sCity;
					$scope.applicant.oResidence.oAddress.sState = successResponse.sState;
				}
				else if(id =="wrkpin")
				{
					$scope.applicant.empl.emplCity = successResponse.sCity;
					$scope.applicant.empl.emplState = successResponse.sState;

				}else if(id =="prmnt_perpin")
				{
					$scope.applicant.oPermanent.oAddress.sCity = successResponse.sCity;
					$scope.applicant.oPermanent.oAddress.sState = successResponse.sState;
				}
			}else{
				notifier.logError("Some error occured at server, please retry !");
			}
		},function(failedResponse){
			notifier.logError("Some error occured at server, please retry !");
		});
	}
};


// $scope.onselectImg = function($files,type,index) 
// {        
// 			var img_type ='';
// 			for (var i = 0; i < $files.length; i++) 
// 			{    	
// 				var fname=$files[0].name;
// 		    	var re = (/\.(jpg)$/i);
// 				if(!re.exec(fname))
// 		    	{
// 			    	notifier.logWarning("Sorry..!! We can not upload your image. \n Only .Jpg images are allowed");
// 			    	break;
// 		    	}
// 				img_type = fname.split(".")[1];
// 				var $file = $files[i];
// 				var base64;
// 				var  reader=new FileReader();
// 				if ($files[i] && $file) {
// 					 var binaryString;
// 					 var size=((($files[i].size)/1024).toFixed(2)) +" Kb";
// 			         reader.onload = function(readerEvt) {
// 			            binaryString = readerEvt.target.result;
// 			            switch (type) {
// 			            case "APPLICANT-PHOTO":
// 							$scope.selectImgInit = binaryString	
// 				        	img_array.push({kyc_name:"APPLICANT-PHOTO",image:$scope.selectImgInit.split(",")[1],type:img_type});
// 							$scope.applicant.aKycDocs.push({
// 									"sExpiryDate":null,
// 									"sIssueDate":null,
// 									"sKycName":"APPLICANT-PHOTO",
// 									"sKycNumber":"",
// 									"sKycStat":null
// 							});
// 							break;
// 			            case "PAN":
// 							$scope.selectImg1 = binaryString	
// 				        	img_array.push({kyc_name:"PAN",image:$scope.selectImg1.split(",")[1],type:img_type});
// 							break;
// 						case "AADHAAR":
// 							$scope.selectImg2 = binaryString
// 							img_array.push({kyc_name:"AADHAAR",image:$scope.selectImg2.split(",")[1],type:img_type});
// 							break;
// 						case "PASSPORT":
// 							$scope.selectImg3 = binaryString
// 							img_array.push({kyc_name:"PASSPORT",image:$scope.selectImg3.split(",")[1],type:img_type});
// 							$scope.applicant.aKycDocs.push({
// 									"sExpiryDate":null,
// 									"sIssueDate":null,
// 									"sKycName":"PASSPORT",
// 									"sKycNumber":"",
// 									"sKycStat":null
// 							});
// 							break;
// 						case "DRIVING-LICENSE":
// 							$scope.selectImg4 = binaryString
// 							img_array.push({kyc_name:"DRIVING-LICENSE",image:$scope.selectImg4.split(",")[1],type:img_type});
// 							$scope.applicant.aKycDocs.push({
// 									"sExpiryDate":null,
// 									"sIssueDate":null,
// 									"sKycName":"DRIVING-LICENSE",
// 									"sKycNumber":"",
// 									"sKycStat":null
// 							});
// 							break;
// 						case "CUSTOMER-PHOTO":
// 							$scope.selectImg5 = binaryString
// 							img_array.push({kyc_name:"APPLICANT-PHOTO",image:$scope.selectImg5.split(",")[1],type:img_type});
// 							break;
// 						case "INCOME-PROOF1":
// 							$scope.selectImg6 = binaryString
// 							img_array.push({kyc_name:"INCOME-PROOF1",image:$scope.selectImg6.split(",")[1],type:img_type});
// 							$scope.applicant.aKycDocs.push({
// 									"sExpiryDate":null,
// 									"sIssueDate":null,
// 									"sKycName":"OTHER",
// 									"sKycNumber":"",
// 									"sKycStat":null
// 							});
// 							break;
// 						case "INCOME-PROOF2":
// 							$scope.selectImg7 = binaryString
// 							img_array.push({kyc_name:"INCOME-PROOF2",image:$scope.selectImg7.split(",")[1],type:img_type});
// 							$scope.applicant.aKycDocs.push({
// 									"sExpiryDate":null,
// 									"sIssueDate":null,
// 									"sKycName":"OTHER",
// 									"sKycNumber":"",
// 									"sKycStat":null
// 							});
// 							break;
// 						case "OTHER":
// 							$scope.selectImg8 = binaryString
// 							img_array.push({kyc_name:"OTHER",image:$scope.selectImg8.split(",")[1],type:img_type});
// 							$scope.applicant.aKycDocs.push({
// 									"sExpiryDate":null,
// 									"sIssueDate":null,
// 									"sKycName":"OTHER",
// 									"sKycNumber":"",
// 									"sKycStat":null
// 							});
// 							break;	
							
// 						case "APPLICATION_FORM":
// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
// 							$(document.body).find("#"+type+index+"label").hide();
// 							$(document.body).find("#"+type+index+"remove").show();
// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
// 							break;

// 						case "AGREEMENT":
// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
// 							$(document.body).find("#"+type+index+"label").hide();
// 							$(document.body).find("#"+type+index+"remove").show();
// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
// 							break;	
		
// 						case "ACH":
// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
// 							$(document.body).find("#"+type+index+"label").hide();
// 							$(document.body).find("#"+type+index+"remove").show();
// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
// 							break;	

// 						case "DISBURSEMENT":
// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
// 							$(document.body).find("#"+type+index+"label").hide();
// 							$(document.body).find("#"+type+index+"remove").show();
// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
// 							break;	
				
// 						case "ADDITIONAL_KYC":
// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
// 							$(document.body).find("#"+type+index+"label").hide();
// 							$(document.body).find("#"+type+index+"remove").show();
// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
// 							break;	
						
// 						case "holdCase":
// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
// 							$(document.body).find("#"+type+index+"label").hide();
// 							$(document.body).find("#"+type+index+"remove").show();
// 							$scope.holdIndex.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
// 							break;		
// 			            }
// 			      };
// 			        reader.readAsDataURL($files[i]);
// 			        $timeout(function(){
// 					}, 1000);
// 			}
// 		}
// }

// function UploadAllImgs(Ref,array,callType)
// {
// 	for(var i=0 ; i<array.length ; i++){
// 		var json ={
// 				  "oHeader": {
// 				    "sAppID": Ref,  // application id
// 				    "sApplID": "1" // applicant id
// 				  },
// 				  "sRefID": Ref,
// 				  "oUpldDtl": {
// 				    "sFileID": "1", 
// 				    "sFileName": array[i].kyc_name,
// 				    "sFileType": array[i].type,
// 				    "sfileData": array[i].image,
// 				    "sStat": "", 
// 				    "sReason": "" 
// 				  }
// 				};
// 		uploadImage(json,callType);		
// 	}
// 	if(callType=="ipa"){
// 		 $rootScope.errHead="Submit";
// 	     $rootScope.errorMsg="Your application has been succesfully completed.";
// 	}
// }

// function uploadImage(json,callType)
// {	
// 	$http({
// 			method : 'POST',
// 			url : APP_CONST.getConst('BASE_URL_GNG')+'upload-image',
// 			data : json,
// 			headers : {'Content-Type' : 'application/json'}
// 		}).success(function(Response){
// 			 if(Response.sStatus == 'SUCCESS'){
// 			}
// 		}).error(function(error) {
// 			$scope.serviceHitCount=$scope.serviceHitCount+1;
// 			if($scope.serviceHitCount<=3){
// 				  uploadImage(json,callType);
// 			}else{
// 				$scope.serviceHitCount=1;
// 				$scope.error="Sorry we can not process your PAN request";
// 			}	
// 		});
// }


$scope.submitApplication=function(UrlKey)
{
	var dobFormatted = $filter('date')($scope.applicant.dob,"dd:MM:yyyy").replace(/:/g,'');
	//console.log(dobFormatted);

	if(!$scope.dealerCode){
		$state.go("/cdl/dealer");
	}

	var json = 
	{
		"oHeader":{
			"sAppID":"",
			"sAppSource":"WEB:1.06.01",//added version
			"sCroId":"default",
			"sDealerId":$scope.dealerCode,
			"sDsaId":user.username,
			"sInstID":user.institutionID,
			"sReqType":"JSON",
			"sSourceID":"GONOGO_HDBFS"
		},
		"sRefID":$scope.referenceID,
		"oReq":{
			"oApplicant":{
				"residenceAddSameAsAbove":$scope.applicant.sameAbove,
				"aAddr":[{
					"sLine1":$scope.applicant.oResidence.oAddress.sAddress1,
					"sLine2":$scope.applicant.oResidence.oAddress.sAddress2,
					"sCity":$scope.applicant.oResidence.oAddress.sCity,
					"sCountry":"India",
					"sVillage":null,
					"sDistrict":null,
					"sLandMark":null,
					"sLine3":$scope.applicant.oResidence.oAddress.sAddress3,
					"sLine4":null,
					"sState":$scope.applicant.oResidence.oAddress.sState,
					"fDistFrom":0.0,
					"iPinCode":$scope.applicant.oResidence.oAddress.sPinCode,
					"sAddrType":"RESIDENCE",
					"sResAddrType":$scope.applicant.oResidence.oAddress.addrType,
					"iMonthAtCity":$scope.applicant.oResidence.oAddress.iMonthCity,
					"dRentAmt":$scope.applicant.oResidence.oAddress.dRentPerMonth ? ($scope.applicant.oResidence.oAddress.dRentPerMonth+"").replace(/,/g,"") : 0,
					"iMonthAtAddr":$scope.applicant.oResidence.oAddress.iMonthAddress,
					"iTimeAtAddr":"",
					"iYearAtCity":"",
				},
				{
					"sLine1":$scope.applicant.empl.emplAddr1,
					"sLine2":$scope.applicant.empl.emplAddr2,
					"sCity":$scope.applicant.empl.emplCity,
					"sCountry":"India",
					"sVillage":null,
					"sDistrict":null,
					"sLandMark":null,
					"sLine3":$scope.applicant.empl.emplAddr3,
					"sLine4":null,
					"sState":$scope.applicant.empl.emplState,
					"fDistFrom":0.0,
					"iPinCode":$scope.applicant.empl.emplPin,
					"sAddrType":"OFFICE",
					"sResAddrType":"",//not for office
					"iMonthAtCity":"",
					"dRentAmt":"",
					"iMonthAtAddr":"",
					"iTimeAtAddr":"",
					"iYearAtCity":""
				},
				{
					"sLine1":$scope.applicant.oPermanent.oAddress.sAddress1,
					"sLine2":$scope.applicant.oPermanent.oAddress.sAddress2,
					"sCity":$scope.applicant.oPermanent.oAddress.sCity,
					"sCountry":"India",
					"sVillage":null,
					"sDistrict":null,
					"sLandMark":null,
					"sLine3":$scope.applicant.oPermanent.oAddress.sAddress3,
					"sLine4":null,
					"sState":$scope.applicant.oPermanent.oAddress.sState,
					"fDistFrom":0.0,
					"iPinCode":$scope.applicant.oPermanent.oAddress.sPinCode,
					"sAddrType":"PERMANENT",
					"sResAddrType":$scope.applicant.oPermanent.oAddress.addrType,
					"iMonthAtCity":$scope.applicant.oPermanent.oAddress.iMonthCity,
					"dRentAmt":$scope.applicant.oPermanent.oAddress.dRentPerMonth ? ($scope.applicant.oPermanent.oAddress.dRentPerMonth+"").replace(/,/g,"") : 0,
					"iMonthAtAddr":$scope.applicant.oPermanent.oAddress.iMonthAddress,
					"iTimeAtAddr":"",
					"iYearAtCity":""
				}],
				"sApplID":"APPLICANT_1",
				"oApplName":{
					"sFirstName":$scope.fname,
					"sLastName":$scope.mname,
					"sMiddleName":$scope.lname,
					"sPrefix":null,
					"sSuffix":null
				},
				"oApplRef":null,
				"aBankingDetails":null,
				"sCreditCardNum":$scope.applicant.creditCard,
				"sDob":dobFormatted,
				"sEdu":$scope.applicant.education,
				"aEmail":[{
					"sEmailAddr":$scope.applicant.oResidence.sEmail,
					"sEmailType":"PERSONAL"
				},
				{
					"sEmailAddr":$scope.applicant.oPermanent.sEmail,
					"sEmailType":"PERMANENT"
				},
				{
					"sEmailAddr":$scope.applicant.empl.emplEmail,
					"sEmailType":"WORK"
				}],
				"aEmpl":[{
					"sConst":$scope.applicant.constitution,
					"sDtJoin":null,
					"sDtLeave":null,
					"sDesig":null,
					"sEmplrBr":null,
					"sEmplrCode":null,
					"sEmplName":$scope.applicant.empl.emplName,
					"sEmplType":$scope.applicant.empl.emplType,
					"aLastMonthIncome":[],
					"sItrID":null,
					"iTmWithEmplr":$scope.applicant.empl.emplMonthWithEmp,
					"dGrossSal":0.0,
					"dmonthSal":$scope.applicant.empl.emplSalary ? ($scope.applicant.empl.emplSalary+"").replace(/,/g,"") : 0,
					"dItrAmt":$scope.applicant.empl.emplITReturn ? ($scope.applicant.empl.emplITReturn + "").replace(/,/g,"") : 0
				}],
				"oFatherName":null,
				"sApplGndr":$scope.applicant.gender,
				"oIncomeDetails":null,
				"oSpouseName":null,
				"aKycDocs":[],
				"aLoanDetails":null,
				"sMarStat":$scope.applicant.maritalStat,
				"sReligion":null,
				"aPhone":[{
					"phoneType":"PERSONAL_MOBILE",
					"sPhoneType":"PERSONAL_MOBILE",
					"sAreaCode":"",
					"sCountryCode":"+91",
					"sExt":"",
					"sPhoneNumber":$scope.applicant.oPermanent.oPhone.iMobile
				},
				{
					"phoneType":"PERSONAL_PHONE",
					"sPhoneType":"PERSONAL_PHONE",
					"sAreaCode":$scope.applicant.oPermanent.oPhone.sStdCode,
					"sCountryCode":"+91",
					"sExt":"",
					"sPhoneNumber":$scope.applicant.oPermanent.oPhone.iLandLine
				},
				{
					"phoneType":"RESIDENCE_MOBILE",
					"sPhoneType":"RESIDENCE_MOBILE",
					"sAreaCode":"",
					"sCountryCode":"+91",
					"sExt":"",
					"sPhoneNumber":$scope.applicant.oResidence.oPhone.iMobile
				},
				{
					"phoneType":"RESIDENCE_PHONE",
					"sPhoneType":"RESIDENCE_PHONE",
					"sAreaCode":$scope.applicant.oResidence.oPhone.sStdCode,
					"sCountryCode":"+91",
					"sExt":"",
					"sPhoneNumber":$scope.applicant.oResidence.oPhone.iLandLine
				},
				{
					"phoneType":"OFFICE_PHONE",
					"sPhoneType":"OFFICE_PHONE",
					"sAreaCode":$scope.applicant.empl.emplStd,
					"sCountryCode":"+91",
					"sExt":"",
					"sPhoneNumber":$scope.applicant.empl.emplLandLine
				},
				{
					"phoneType":"OFFICE_MOBILE",
					"sPhoneType":"OFFICE_MOBILE",
					"sAreaCode":"",
					"sCountryCode":"+91",
					"sExt":"",
					"sPhoneNumber":$scope.applicant.empl.emplMob
				}],
				"iEarnMem":0,
				"iFamilyMem":0,
				"iNoOfDep":0,
				"bMobVer":true,
				"sAdharVer":false,
				"bSameAbove":$scope.applicant.sameAbove,//check key
				"iAge":0
			},
			"oApplication":{
				"sApID":null,
				"sAppliedFor":null,
				"aAssetDetail":[{
					"sAssetCtg":$scope.applicant.asset.category,
					"sAssetMake":$scope.applicant.asset.make,
					"sAssetModelMake":"",
					"sDlrName":$scope.dealerName,
					"sModelNo":$scope.applicant.asset.model,
					"sPrice":""
				}],
				"oProperty":null,
				"sLoanType":$scope.applicant.application.loanType,
				"dEmi":0.0,
				"dLoanAmt":$scope.applicant.application.loanAmt ? ($scope.applicant.application.loanAmt+"").replace(/,/g,"") : 0,
				"dMarginAmt":0.0,
				"iAdvEmi":0,
				"iLoanTenor":$scope.applicant.application.tenor
			},
			"aCoApplicant":null,
			"sSuspAct":$scope.applicant.suspected
		}
	};

	_.each($scope.kycArray,function(kycDoc){
		var resultIndex = _.chain(json.oReq.oApplicant.aKycDocs).pluck("sKycName").indexOf(kycDoc.docType).value();
		if(resultIndex === -1){
			json.oReq.oApplicant.aKycDocs.push({ 
				"sExpiryDate":null,
				"sIssueDate":null,
				"sKycName":kycDoc.docType,
				"sKycNumber":kycDoc.docNumber,
				"sKycStat":null
			});
		}else{
			json.oReq.oApplicant.aKycDocs[resultIndex].sKycNumber=kycDoc.docNumber;
		}
	});

 	var docImageFound=false;
	for(var docIndex=0;docIndex<$scope.kycArray.length;docIndex++){
		if(!$scope.kycArray[docIndex].isDefault){
			docImageFound=true;
			break;
		}
	}

	if(!docImageFound && UrlKey === 'step4' && $scope.kycDocImages.length==0){
		notifier.logWarning("Please select atleast 1 image to upload.");
	}else{
		RestService.saveToServer('submit-application/'+UrlKey, json).then(function(data){
			if(data && data.sStat==="SUCCESS"){
				$scope.referenceID = data.sRefID;

				if(UrlKey=="step1"){
					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_SUCCESS"),GNG_GA.getConstAction("API_STEP1"),1,"submit-application","",data.sRefID);
				}else if(UrlKey=="step4"){

					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_SUCCESS"),GNG_GA.getConstAction("API_STEP4"),1,"submit-application","",data.sRefID);
				}

				if(UrlKey=="step3"){
					notifier.logSuccess("Data Saved Successfully.");
				}

				if($scope.kycDocImages.length!=0){
					UploadImages.upload($scope.referenceID,$scope.kycDocImages).then(function(imageUploadedCount) {
					  	$log.debug('Image upload Success, Total image uploaded : ' + imageUploadedCount);

					}, function(reason) {
					  	$log.debug('Image upload Failed, Total image uploaded : ' + imageUploadedCount);
					});

					if(UrlKey=="step4"){
						sharedService.setRefID($scope.referenceID);
						$state.go('/cdl/result');
					}
				}
			}else{
				notifier.logError("Some error occured while application submission, please try again.");
			}
		},function(failedResponse){
			if(UrlKey=="step1"){
				GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_SUCCESS"),GNG_GA.getConstAction("API_STEP1"),1,"submit-application","",data.sRefID);
			}else if(UrlKey=="step4"){

				GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_APPLY"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_SUCCESS"),GNG_GA.getConstAction("API_STEP4"),1,"submit-application","",data.sRefID);
			}

			$scope.serviceHitCount=$scope.serviceHitCount+1;
			if($scope.serviceHitCount<=3){
				$scope.submitApplication(UrlKey);
			}else{
				$scope.serviceHitCount=1;
				notifier.logError("We are unable to submit your request, please try again later");
			}
		});
	}
};


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
				$scope.selectImgInit = true;
				$("#selectImgInit").attr("src","");
				$scope.profileImage=false;
		}
		for(var i=0; i<img_array.length;i++){
	       if(img_array[i] != null){
	       	if(img_array[i].kyc_name == filetype){
	              img_array.splice(i,1);
	          }
	      }
	  }
		
};

	$scope.getEmployerNames=function(queryStr){
		var ojs={"oHeader":{"sInstID":user.institutionID},"sQuery":queryStr};

		return RestService.saveToServer("employer-master-details-web",ojs)
		.then(function(data)
		{
			var map=data.map(function(item){					
		        return item.sEmpName;
	      	});
			return data.map(function(item){
		        return item.sEmpName;
	      	});
		});
	};


		$scope.openDOBDialog=function(){

			if(!$scope.applicant.dob){
		 		var defaultDate = new Date();
		 		defaultDate.setFullYear(defaultDate.getFullYear()-25);

		 		$scope.applicant.dob=defaultDate;
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

		$scope.dateOptions = {		    
		    formatYear: 'yyyy',
		    showWeeks:false,
		    maxDate: maxDa,
		    minDate: minDa,
		    startingDay: 1
		};

		$scope.cancelApplication = function(){
			location.reload();
		}

		$scope.isCurrPanel = function(currentPage){
			if(currentPage==$scope.currentPageNumber)
				return true;
		};
		$scope.onPreviousClicked=function(previousURL){
			$scope.currentPageNumber--;
			$state.go(previousURL);
		};


		$scope.resAddrTypeChange = function(type){
			console.log(type);
			if(type.indexOf('RENTED') != -1){ 
				$scope.applicant.oResidence.oAddress.dRentPerMonth = "";
			}
		}

		$scope.perAddrTypeChange = function(type){
			if(type.indexOf('RENTED') != -1){ 
				$scope.applicant.oPermanent.oAddress.dRentPerMonth = "";
			}
		}
		
	}]);

	app.config(['$compileProvider',
		function( $compileProvider ){   
			$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image|data:application\//);
		}
	]);
}).call(this);