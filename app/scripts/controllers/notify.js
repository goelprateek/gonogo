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
                    "sLnPurp": "",
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
        "aAppScoRslt": "",
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
        };
        return {
        	dummy : _obj
        }	
    });

	app.controller('NotifController', ['$scope','$rootScope', '$interval','$filter',
								'RestService','NotificationObject','UserService','AclService','$uibModal','SelectArrays','$log','notifier','$state',
                                function($scope, $rootScope, $interval,$filter,RestService,NotificationObject,UserService,AclService,
                                    $uibModal,SelectArrays,$log,notifier,$state){

	var user=UserService.getCurrentUser();
    
    $scope.can=AclService.can;

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }

    if(_.isUndefined(user.id) ){
        $state.go(APP_CONST.getConst('APP_CONTEXT'));
    }

    var timer ;
    

    $scope.selectResidence = SelectArrays.getResidenceTypes();
    $scope.objectSet = NotificationObject.dummy;

    $scope.isUpdating = false;
    $scope.showReinitiate=true;	  
	$scope.container = true;
    $scope.isDedupeSelected = true;
    $scope.isImg = true;
    $scope.backUpDefaultRefId = [];

    $scope.isLosId = function(){
        if($scope.objectSet.oLosDtls && $scope.objectSet.oLosDtls.sLosID){
                return true;
        }else{
            return false;    
        }        
    }

    $scope.isUtr = function(){
        if($scope.objectSet.oLosDtls && $scope.objectSet.oLosDtls.sUtr){
            return true;
        }else{
            return false;    
        }        
    }

    $scope.utrVal = true;
    $scope.losIdval = false;
    $scope.editLosStat = false;

	$scope.countSelected="Select";
	
    //FIXME
    //sayali if this action is present then show onhold panel otherwise directly on click of onhold ,onhold 
    //the application
    var offersAllowed = AclService.can('NOFRS');

	$rootScope.template ="notification";
	$scope.minVal = 0;
	$scope.limit = 100;
    $scope.notifarray = [];
    
    var startPoling = function(){
        if(_.isUndefined(timer)){
          timer  = $interval(function(){
                   console.log('polling started');
                   polling($scope.minVal);
          }, 60000, 0,true);    
        }
    }

    var stopPoling = function(){
        if(angular.isDefined(timer)){
            console.log('going to cancel timer as search hit',1);
            $interval.cancel(timer);   
            timer = undefined; 
        }
    }

    // method to implement ELSearch
    $scope.searchNotification = function($viewValue){
        if($viewValue.length >= 3){
            
        stopPoling();
        var _serviceInput = {
                      "oHeader": {
                        "sAppID":null,
                        "sInstID": user.institutionID,
                        "sSourceID": "WEB",
                        "sAppSource": "GNG_WEB",
                        "sReqType": "JSON",
                        "dtSubmit":"",
                        "sDsaId":null,
                        "sCroId":user.id,
                        "sDealerId":null
                      },
                      "oFilter": {
                         "dloanAmt":0,
                         "sStage":"",
                         "sMobileNumber":"",
                         "sProduct":"CDL"
                      },
                      "oCroQueue": $scope.json.sCroID,
                      "sQuery": $viewValue,
                      "oPagination": {
                        "iPageId": 0,
                        "iLimit": 10,
                        "iSkip": 0
                      }
                    }

            RestService.fetchDataQuietly("api/es/search",_serviceInput).then(function(data){
                  if(data.notifications.length > 0){
                        $scope.notifarray = [];
                        var filteredSearchData = _.uniq(data.notifications, function(item, key, sRefID) { 
                            return item.sRefID;
                        });
                        $scope.notifarray = filteredSearchData;
                  }
            });
        }else if($viewValue.length == 0){
            $scope.notifarray = [];
            startPoling();
        }

    }

	function polling (minimum ) {
        
		if($rootScope.template == "notification"){

            //CRO ID - Application fetching based on CRO ID
            $scope.json ={'sCroID':"", 'sInstID':user.institutionID,
                    'sGrpID':"0" , 'iSkip': minimum, 'iLimit' : $scope.limit,
                    'oCriteria':{"oHierarchy":user.hierarchy,"aProducts":user.getProductNames()}};

            if(_.contains(user.role, "CRO9")){
                if(_.contains(user.getProductNames(),"PERSONAL LOAN")){
                    $scope.json.sCroID="STP_PL";
                }else if(_.contains(user.getProductNames(),"CCBT")){
                    $scope.json.sCroID="STP_CCBT";
                }else{
                    $scope.json.sCroID="STA";
                }
            }else if(_.contains(user.role, "CRO1")){
                if(_.contains(user.getProductNames(),"CCBT")){
                    $scope.json.sCroID="CCBT_QUEUE";
                }else if(_.contains(user.getProductNames(),"PERSONAL LOAN")){
                    $scope.json.sCroID="PL_QUEUE";
                }else{
                    $scope.json.sCroID="default";
                }
            }else{
                $scope.json.sCroID="default";
            }

            //URL
            var URL;
            if(_.contains(user.role, "CRO3")){
                URL = 'cro3-queue';
            }else if(_.contains(user.role, "CRO4")){
                URL = 'cro4-queue';
            }else if($scope.can('NCROQUE')){
                URL = 'cro-queue';
            }else{
                URL = 'cro2-queue';
            }

			RestService.fetchDataQuietly(URL,$scope.json).then(function(data){
				
                if(!_.isNull(data) || !_.isUndefined(data)){

                    var queArray = _.union($scope.notifarray,data);
                    
                    var filteredData = _.uniq(queArray, function(item, key, sRefID) { 
                        return item.sRefID;
                    });

                    $scope.notifarray = filteredData;                    
				}
			});	
  		}
	}

    startPoling();
    polling($scope.minVal);


    $scope.addrType = SelectArrays.getAddrType();
	$scope.addr_type = $scope.addrType[1];   //to set default address
	$scope.aplcntType=[{value:"SAL","text":"Salaried"},
				               	{value:"SEB","text":"Self Employed Business"},
				               	{value:"SEP","text":"Self Employed Professional"}];

    $scope.findAddressType = function(orignal,final){
    	return (angular.lowercase(orignal) == angular.lowercase(final));
    }				               	

    $scope.showimage = function(obj,isImgFlag,index,editMode){
        var modalInstance = $uibModal.open({
                      templateUrl: 'views/templates/modal.html',
                      controller: 'supportedDocuments',
                      size: 'lg',
                      resolve:{
                        ImageFeed : function (){
                            var imageData;
                            return imageData = {
                                isImage : isImgFlag,
                                docData : obj,
                                index : index,
                                applicationId : $scope.objectSet.oAppReq.oHeader.sAppID,
                                applicantId : $scope.objectSet.oAppReq.oReq.oApplicant.sApplID,
                                institutionId : user.institutionID,
                                refId : $scope.objectSet.oAppReq.sRefID,
                                editMode : editMode
                            }
                        }
                      }
                    });

         modalInstance.result.then(function (selected) {
                        }, function (array) {
                            if(isImgFlag){
                                $log.info($scope.rejectImgFromServer);
                                 var filter = _.filter(array,function(arr2obj){
                                    return arr2obj.sStat == "Reject";
                                });
                                $scope.rejectImgFromServer = filter;
                                $scope.imageDataArray = array;
                            }
                        });
    }

	$scope.load_details = function(CustID,dedupeflag,applicationRequestType){

        $scope.currentApplicationFormRefID=CustID;

        $scope.isUpdating=false;        
		
        var URL='';
		var json ={'sRefID':CustID};	

        if((_.contains(user.role, "CRO4") || _.contains(user.role, "CRO3")) && applicationRequestType && applicationRequestType=="PS"){
            URL = 'application-data-partial';
        }else if(_.contains(user.role, "CRO3") && applicationRequestType && applicationRequestType=="FP"){

            URL = 'application-data';
        }else{
    		if(AclService.can('NCROQUE'))//for CRO1
    		{ 
    			URL = 'application-data';
    			if(dedupeflag){
    				 $scope.isDedupeSelected = true;
                     $scope.backUpDefaultRefId = [];
    			}else{
    				 $scope.isDedupeSelected = false;
    			}
    		}else{
    			URL = 'application-data-cro2';
    			if(dedupeflag){
                     $scope.backUpDefaultRefId = [];
    			}
    		}
        }
		
        RestService.saveToServer(URL,json).then(function(response){
            var transfrmedOject ;
            if(response){
                transfrmedOject =  response;
                transfrmedOject.aAppScoRslt = _.uniq(transfrmedOject.aAppScoRslt,function(item, key, sFldName){
                    return item.sFldName;
                });

            }
            return transfrmedOject;

        }).then(function(response){
            if(response)
				$scope.objectSet = response;
			else
			 $scope.objectSet = NotificationObject.dummy;
			
            $scope.Picked = CustID;
            $scope.dedupeRefArray = [];
            $scope.isAllImgApprove = true;
            $scope.showrefid = true;
            $scope.invoiceDate = false;
            $scope.invoiceNumber = false;
            $scope.isInvoiceAvailable = true;
            $scope.datefilter.date = '';
            $scope.croDecision = response.aCroDec;
            $scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;

            if($scope.objectSet.oCompRes.scoringServiceResponse && $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE){
                $scope.ElgbltyGrid = ( $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID : "" ) 
                                     +"."
                                     + ($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : ($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
            }

            if($scope.objectSet.oAppReq.oReq.oApplicant.sDob && $scope.objectSet.oAppReq.oReq.oApplicant.sDob!=""){

                var dateOfBirth=new Date();
                dateOfBirth.setFullYear(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4)));
                dateOfBirth.setDate(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0,2)));
                dateOfBirth.setMonth((parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2,4))-1));
                
                $scope.app_form={pickerDob:dateOfBirth};
            }

            //Fetch application status of selected application 
			var data = 	$scope.notifarray;
			_.each(data ,function(value){
                if(value.sRefID ==  $scope.objectSet.oAppReq.sRefID){
                        $scope.applctnstatus = value.sStat;
                }
            });

            try{
                if($scope.objectSet.oInvDtls){
                    if($scope.objectSet.oInvDtls.dtInv && $scope.objectSet.oInvDtls.sInvNumber){
                        var Dateformat = moment($scope.objectSet.oInvDtls.dtInv).format('DD-MM-YYYY hh:mm:s');
                         $scope.datefilter.date = Dateformat;
                         $scope.invoiceDate = true;
                         $scope.invoiceNumber = true;
                         $scope.isInvoiceAvailable = false;
                    }else{
                         $scope.invoiceDate = false;
                         $scope.invoiceNumber = false;
                         $scope.isInvoiceAvailable = true;
                         $scope.datefilter.date = '';
                    }
                }
            }catch(e){
                    $scope.invoiceDate = false;
                    $scope.invoiceNumber = false;
                    $scope.isInvoiceAvailable = true;
                    $scope.datefilter.date = '';
            }

            try{
                 if($scope.objectSet.oLosDtls.sLosID){
                    $scope.losIdval = true;
                 }else{
                     $scope.losIdval = false;
                 }   
            }catch(e){
                 $scope.losIdval = false;
            }

            try{
                 $scope.pdfData ="data:application/pdf;base64,"+$scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];             
            }catch(e){
                 $scope.pdfData = '';
            }

            try{
               if($scope.objectSet.aDeDupe){
                     _.each($scope.objectSet.aDeDupe,function(val){
                        $scope.dedupeRefArray.push(val.sRefID);  
                });
               }

            }catch(e){

            }
            try{
                $scope.foirAmount = $scope.objectSet.oCompRes.scoringServiceResponse['ELIGIBILITY_RESPONSE']['FOIR_AMOUNT'].toFixed(2);
            }catch(e){
                 $scope.foirAmount = '';
            }

            //Surrogate
            $scope.surrogate=$scope.objectSet.oAppReq.oReq.oApplicant.oSurrogate
//          console.log("Surrogate");
//          console.log($scope.surrogate);
            if($scope.surrogate){
                if($scope.surrogate.aCar){
                    $scope.surrTypeSelected="Owned Car";
                }
                else if($scope.surrogate.aOwnHouse){
                    $scope.surrTypeSelected="Owned House";
                }
                if($scope.surrogate.aSalary){
                    $scope.surrTypeSelected="Salary House";
                }
                else if($scope.surrogate.aTrader){
                    $scope.surrTypeSelected="Business";
                }
                else if($scope.surrogate.aCreditCard){
                    $scope.surrTypeSelected="Credit Card";
                }
                else if($scope.surrogate.aBankAccount){
                    $scope.surrTypeSelected="Banking";
                }
            }

            return response;
		}).then(function(data){
             $scope.bankSurrogateImages=[];
            if(data){            
                var objArray = _.map(_.pluck(data.aAppImgDtl, 'aImgMap'),function(data){
                        return data;
                    });

                $scope.imageDataArray = [];
                var evidenceData = [];
                var maindata = [];
                _.each(_.flatten(objArray),function(val){
                    if(val.sImgType.indexOf("_EVIDENCE") > -1){
                        evidenceData.push(val);
                    }
                    maindata.push(val);
                });
    
                _.each(evidenceData,function(val){
                    var whosEvdnc = val.sImgType.slice(0,-10);
                    _.each(maindata,function(data){
                        if(data.sImgType == whosEvdnc){
                            if(!data.evdncArray)
                              data.evdncArray = [];
                            data.evdncArray.push(val);                           
                        }
                    });
                });

                _.each(maindata,function(val){
                    return RestService.saveToServer('get-image-by-id-base64', { 'sImgID' : val.sImgID}).then(function(data){
                        if(!_.isUndefined(data) || !_.isNull(data)){
                            if(!_.isEmpty(data.sByteCode)){
                                val["sByteCode"] = "data:image/png;base64,"+data.sByteCode; 
                                if(val.sReason == null){
                                    val.sReason = "";
                                }

                                if($scope.surrogate && val.sImgType==="BANK_STATEMENT"){
                                    $scope.bankSurrogateImages.push(val)
                                }else{
                                    $scope.imageDataArray.push(val); 
                                }
                            }  
                        }
                    });
                });

                var rejectImgFromServer =[];
                _.each($scope.imageDataArray,function(val){
                    if(val.sStat == "Reject"){
                        rejectImgFromServer.push(val);
                    }  
                });
                $scope.rejectImgFromServer = rejectImgFromServer;
            }
        });
    };

    $scope.newApplication = function(){ 
    	if(AclService.can('NCROQUE')){
    	   $scope.container = false;
    	}		
    }


    $scope.toggleForm= function(){
    	$scope.container = !$scope.container;
    }

    $scope.scoreTree = function(){
            var modalInstance = $uibModal.open({
                  templateUrl: 'views/templates/score-tree.html',
                  controller: 'scoreTreeCtr',
                  size: 'lg',
                  resolve:{
                    treeFeed : function (){
                        var scoreTree;
                        return scoreTree = {
                            treeData : $scope.objectSet.oCompRes.scoringServiceResponse.SCORE_TREE,
                            custName : $scope.name,
                            custRefId :$scope.objectSet.oAppReq.sRefID
                        }
                    }
                  }
            });
    }
	
    $scope.cro_action = function(refID, action){ 
        $scope.isAllImgApprove = true;
         _.each($scope.imageDataArray,function(val){
            if(val.sStat != "Approve"){
               $scope.isAllImgApprove = false;
               return;
            }
        });

		if(refID !== ""){
            if(($scope.applctnstatus.toUpperCase() == "QUEUE") || (!AclService.can('NCROQUE'))){
			 if(action == "OnHold"){
				
                  var modalInstance = $uibModal.open({
                      templateUrl: 'views/templates/onhold-panel.html',
                      controller: 'onholdModelCtrl',
                      size: 'lg',
                      resolve: {
                        holdModelFeed : function (){
                            var dataForModel;
                            return dataForModel = {
                              rejectedImage : $scope.rejectImgFromServer
                            }
                        }
                      }
                    });

                     modalInstance.result.then(function (offerarray) {
                        var json = {
                            "sRefID":$scope.objectSet.oAppReq.sRefID,
                            'sHeader':{'sAppID':$scope.objectSet.oAppReq.oHeader.sAppID,
                            'sInstID':user.institutionID,
                            'sCroId':user.id},
                            "sAppStat":"OnHold",
                            "aCroJustification":offerarray,
                            "aDedupeRefID": ($scope.dedupeRefArray ? $scope.dedupeRefArray : [])
                        };
                        requestFordclnOnhold(json);
                        });
			 
			 }else if(action == "Declined"){
                  var modalInstance = $uibModal.open({
                      templateUrl: 'views/templates/decline-panel.html',
                      controller: 'DeclInstanceCtrl',
                      size: 'lg',
                      resolve: {
                         dclnModelFeed : function (){
                            var dataForDcl;
                            return dataForDcl = {
                            }
                        }
                      }
                    });
                   modalInstance.result.then(function (selected) {
                        var arrayDclnDesc = [];
                        $scope.selected = selected;
                        arrayDclnDesc.push({
                            sJCode:null,
                            sDescrip:null,
                            sDocName:null,
                            sSubTo:$scope.selected.dclnSubTo,
                            sRemark:$scope.selected.dclnRemark
                        });
                         var json = {
                                    "sRefID":$scope.objectSet.oAppReq.sRefID,
                                    'sHeader':{'sAppID':$scope.objectSet.oAppReq.oHeader.sAppID,
                                    'sInstID':user.institutionID,'sCroId':user.id},
                                    "sAppStat":"Declined",
                                    "aCroJustification":arrayDclnDesc, 
                                    "aDedupeRefID ": ($scope.dedupeRefArray ? $scope.dedupeRefArray : [])
                                    };
                        requestFordclnOnhold(json);
                        });
                

			 }else{
                    if($scope.isAllImgApprove){
                     var modalInstance = $uibModal.open({
                      templateUrl: 'views/templates/approve-panel.html',
                      controller: 'ModalInstanceCtrl',
                      size: 'lg',
                      resolve: {
                        modalFeed : function (){
                            var dataForModel;
                            return dataForModel = {
                                approveAmt : $scope.objectSet.aCroDec[0].dAmtAppr,
                                tenor: $scope.objectSet.aCroDec[0].iTenor,
                                emi : $scope.objectSet.aCroDec[0].dEmi
                            }
                        }
                      }
                    });

                     modalInstance.result.then(function (selected) {
                        var arrayApprvDesc = [];
                        $scope.selected = selected;

                        arrayApprvDesc.push({
                            sJCode:null,
                            sDescrip:null,
                            sDocName:null,
                            sSubTo:$scope.selected.apprvSubTo,
                            sRemark:$scope.selected.apprvRemark
                        });
                        var json={
                            'sHeader':{'sAppID':$scope.objectSet.oAppReq.oHeader.sAppID,
                            'sInstID':user.institutionID,'sCroId':user.id},
                            'sRefID':$scope.objectSet.oAppReq.sRefID,
                            'sAppStat':"Approved",
                            "aCroJustification":arrayApprvDesc,
                            "bApprAmtExist":true,
                            "dApprAmt":$scope.selected.approveAmt,
                            "iTenor":$scope.selected.tenor,
                            "dEmi":$scope.selected.emi,
                            "aDedupeRefID": ($scope.dedupeRefArray ? $scope.dedupeRefArray : [])
                            }
                            requestForStatus(json);

                        });
                 }else{
                    notifier.logWarning("Please approve all the images") ;
                 }
			  }
          }else if($scope.applctnstatus == null){
                notifier.logWarning("Application status is not defined!!");
        }else{
            notifier.logWarning("An action is already taken for this application!!");
         }
	  }else{
        notifier.logWarning("Please select application from Queue !");
    }       
 }

function requestForStatus(json){
    
    RestService.saveToServer('cro-approval',json).then(function(Response){
        
        if(Response.status == "OK UPDATE SUCCESSFULLY"){
          _.each($scope.notifarray,function(value,key){
                        if($scope.notifarray[key].sRefID == $scope.objectSet.oAppReq.sRefID){
                            return($scope.notifarray[key].sStat = json.sAppStat);
                        }  
                  });
             notifier.logSuccess("Application is successfully "+json.sAppStat+""); 
        }else{
            notifier.logWarning("Unable to Approve your application !");
        }
    }); 
}

function requestFordclnOnhold(json){
    
    RestService.saveToServer('cro-onhold',json).then(function(Response){
        
        if(Response.status == "OK UPDATE SUCCESSFULLY")                     {
              _.each($scope.notifarray,function(value,key){
                    if($scope.notifarray[key].sRefID ==  $scope.objectSet.oAppReq.sRefID){
                        return($scope.notifarray[key].sStat = json.sAppStat);
                    }  
              });
             notifier.logSuccess("Application is successfully "+json.sAppStat+""); 
        }
        else{
            notifier.logWarning("Unable to update your action !");
        }
    });
}

$scope.losStatusChange=function(status){
    var utr =  $scope.objectSet.oLosDtls.sUtr;
     if(status == "LOS_DISB" &&   $scope.applctnstatus.toUpperCase()=="APPROVED"){ //
            if(utr=='' || utr==null){
                 $scope.isUtr();
                $scope.utrVal = false;     
            }
        }else{
             $scope.utrVal = true;
        }
}

$scope.onchange = function(id) {
        $scope.backUpDefaultRefId.push($scope.objectSet);
        
        if(id != 'Select'){
             $scope.load_details(id,false);
        }else{

            $scope.defaultRefId= $scope.backUpDefaultRefId[0].oAppReq.sRefID;
            $scope.load_details($scope.defaultRefId,true);
        }
}

    $scope.updateLosData = function(status){
        if($scope.objectSet.oAppReq.sRefID!=""){
        	var losStat = status;
            var losId = '';
            var utr = '';
            if($scope.objectSet.oLosDtls){
                losId = $scope.objectSet.oLosDtls.sLosID;
                utr = $scope.objectSet.oLosDtls.sUtr;
            }

            if((!$scope.utrVal && ( utr!=null && utr!='')) || ($scope.utrVal)){
            	if((losId !=null && losId != "") && (losStat !=null && losStat !='')){
            		 var jsondata=	 {
        			    "sRefID":$scope.objectSet.oAppReq.sRefID,
        			    "oHeader":{
        			         "sAppID":$scope.objectSet.oAppReq.oHeader.sAppID,
        			         "sInstID":user.institutionID,
        			         "sSourceID":"WEB",
        			         "sAppSource":"WEB",
        			         "sReqType":"JSON",
        			         "sCroId":user.id
        			    },
        			    "oLosDtls":{
        			        "sLosID":losId,
        			        "sStat":losStat,
        			        "sUtr":utr
        			    }
        			};	 

            		RestService.saveToServer('update-los-details',jsondata).then(function(Response){
            				if(Response.status == "SUCCESS"){
                                notifier.logSuccess("LOS Status updated successfully");
            					$scope.losIdval = true;
                                $scope.utrVal = true;
            				}else{
                                notifier.logWarning("Sorry! We are unable to update your LOS Status");
            				}
            		 });
            	}else{
                     notifier.logWarning("Please provide LOS Data !");
                }
        	}
        }else{
            notifier.logWarning("Please select application from queue !");
        }
    };
	
    $scope.dobFormat = "dd/MM/yyyy";
    $scope.dobPopup = {
        opened: false
    };
    
    $scope.datePopup = {
        opened: false
    };

     $scope.openDateDialog=function(){
        $scope.datePopup.opened = true;
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

    $scope.enableForm=function(){
        if($scope.objectSet.iNoReTry >= 2){
                notifier.logWarning("This application is already re-initiated twice") ;
        }else{
            $scope.fieldsUpdated={
                isNameUpdated:false,
                isResAddressUpdated:false,
                isOffAddressUpdated:false,
                isPanUpdated:false,
                isVoterIDUpdated:false,
                isAadhaarUpdated:false,
                isDobUpdated:false
            }
            $scope.dobOld=$scope.dob;

            _.each($scope.objectSet.oAppReq.oReq.oApplicant.aAddr,function(addr){
                if(addr.sAddrType.toLowerCase()=="residence"){
                    $scope.oldResPincode=addr.iPinCode;
                }else if(addr.sAddrType.toLowerCase()=="office"){
                    $scope.oldOffPincode=addr.iPinCode;
                }
            });


            $scope.isUpdating=!$scope.isUpdating;

            var applicant=$scope.objectSet.oAppReq.oReq.oApplicant;
            
            if(applicant.aKycDocs!=null){
                var isAadhaarPresent=false;
                var isVoterPresent=false;
                var isPanPresent=false;

                for(var i=0;i<applicant.aKycDocs.length;i++){
                    if(applicant.aKycDocs[i].sKycName.toLowerCase().indexOf("aadhaar")>=0){
                        isAadhaarPresent=true;
                    }

                    if(applicant.aKycDocs[i].sKycName.toLowerCase().indexOf("pan")>=0){
                        isPanPresent=true;
                    }

                    if(applicant.aKycDocs[i].sKycName.toLowerCase().indexOf("voter")>=0){
                        isVoterPresent=true;
                    }
                }
                
                if(!isAadhaarPresent){
                    var newKYC={
                        sExpiryDate:null,
                        sIssueDate:null,
                        sKycName:"AADHAAR",
                        sKycNumber:"",
                        sKycStat:null
                    }
                    
                    applicant.aKycDocs.push(newKYC);
                }
                
                if(!isVoterPresent){
                    var newKYC={
                        sExpiryDate:null,
                        sIssueDate:null,
                        sKycName:"VOTERID",
                        sKycNumber:"",
                        sKycStat:null
                    }
                    applicant.aKycDocs.push(newKYC);
                }
                
                if(!isPanPresent){
                    var newKYC={
                        sExpiryDate:null,
                        sIssueDate:null,
                        sKycName:"PAN",
                        sKycNumber:"",
                        sKycStat:null
                    }
                    applicant.aKycDocs.push(newKYC);
                }
            }
            /* dob popup */     
            $scope.openDOBDialog=function(){                
                $scope.dobPopup.opened = true;          
            };      
            /* dob popup */
        }
    };

    $scope.updateForm=function(){
        if($scope.objectSet.iNoReTry >= 2){
            notifier.logWarning("This application is already re-initiated twice");
        }else{
            if($scope.isUpdating){
                var dobFormatted=$filter('date')($scope.app_form.pickerDob,"dd/MM/yyyy");
                if(dobFormatted && dobFormatted!="")
                {
                    $scope.objectSet.oAppReq.oReq.oApplicant.sDob=dobFormatted.replace(/\//g,"");
                }

                if($scope.objectSet.oAppReq.oReq.oApplicant.sDob!=dobFormatted){
                     $scope.fieldsUpdated.isDobUpdated=true;
                }

                _.each($scope.objectSet.oAppReq.oReq.oApplicant.aAddr,function(addr){
                    if(addr.sAddrType.toLowerCase()=="residence" && addr.iPinCode != $scope.oldResPincode){
                        $scope.fieldsUpdated.isResAddressUpdated=true;
                    }else if(addr.sAddrType.toLowerCase()=="office" && addr.iPinCode != $scope.oldOffPincode){
                        $scope.fieldsUpdated.isOffAddressUpdated=true;
                    }
                });

                $scope.isUpdating=!$scope.isUpdating;

                $scope.showReinitiateModal("lg",$scope.currentApplicationFormRefID,$scope.objectSet,$scope.fieldsUpdated);
            }else{
                 $scope.showReinitiateModal("lg",$scope.currentApplicationFormRefID,$scope.objectSet);
            }
        }
    };

    $scope.onValueChanged=function(valueChanged){
        if(valueChanged == "name"){
            $scope.fieldsUpdated.isNameUpdated=true;
        }else if(valueChanged == "resAddress"){
            $scope.fieldsUpdated.isResAddressUpdated=true;
        }else if(valueChanged == "offAddress"){
            $scope.fieldsUpdated.isOffAddressUpdated=true;
        }else if(valueChanged == "perAddress"){
            $scope.fieldsUpdated.isPerAddressUpdated=true;
        }else if(valueChanged == "pan"){
            $scope.fieldsUpdated.isPanUpdated=true;
        }else if(valueChanged == "aadhaar"){
            $scope.fieldsUpdated.isAadhaarUpdated=true;
        }else if(valueChanged == "voter"){
            $scope.fieldsUpdated.isVoterIDUpdated=true;
        }
    };  

    $scope.showReinitiateModal = function (size,refID,applicantData,fieldsUpdated) {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal-reinitiate.html',
            controller: 'ReinitiateModalController',
            size: size,
            resolve: {
                refID:function(){
                    return refID;
                },
                applicantData:function(){
                    return applicantData;
                },
                fieldsUpdated:function(){
                    return fieldsUpdated;
                }
            }
        });

        modalInstance.result.then(function (isSuccess,refID) {           
            if(isSuccess){
                $scope.objectSet.iNoReTry=$scope.objectSet.iNoReTry +1;
                 $scope.showReinitiateStatusModal("lg",$scope.refID);
            }
        });
    };

    $scope.showReinitiateStatusModal = function (size,refID) {
        //alert('modal baseURL'+baseURL);
        var modalInstance = $uibModal.open({
           animation: $scope.animationsEnabled,
           templateUrl: 'views/modal-reinitiate-status.html',
           controller: 'ReinitiateStatusModalController',
           size: size,
           resolve: {
               refID:function(){
                   return refID;
               }
           },
           backdrop  : 'static',
           keyboard  : false
        });
    };

    $scope.getStateCity=function($event,address){
        var pin = $event.target.value;
        address.sCity = "";
        address.sState = "";
        
        if(pin.length === 6){
            var pinJson ={"oHeader":{"sInstID":user.institutionID},"sQuery":pin}; 
            
            RestService.saveToServer("pincode-details-web",pinJson).then(function(data){
                if(data!=""){
                    address.sCity=data.sCity;
                    address.sState=data.sState;
                }
            });
        };
    };

    $scope.showReinitiatedDecisionData=function(size,requestObj){
        var modalInstance = $uibModal.open({
            templateUrl: 'views/modal-bre-results.html',
            controller: 'ReinitiatedDecisionModalController',
            size: size,
            resolve: {
                requestObj:function(){
                    return requestObj;
                }
            }
        });
    };

    $scope.invoiceDate = false;
    $scope.invoiceNumber = false;

    $scope.datefilter =  {            
         date : {
             startDate: null,
             endDate: moment()        
         },
         timePickerIncrement: 1,
         opts: {
             timePicker: true,
             singleDatePicker : true,
             max: moment().format('YYYY-MM-DD'), 
             opens : "center",
             applyClass: 'btn-primary',
             isCustomDate: function(data){
                 return '';
             },
             locale: {
                 applyLabel: "Apply",
                 fromLabel: "From",
                 format: "DD/MM/YYYY h:mm:ss A",
                 cancelLabel: 'Cancel',
                 customRangeLabel: 'Custom range',
                 daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                 monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                 firstDay: 1
             }, 
             eventHandlers: {
                 "apply.daterangepicker" : function(ev, picker){
                     //TODO call service to fetch data based on date range
                 },
                 'show.daterangepicker' : function(ev , picker){
                     $scope.datefilter.date.startDate = undefined;
                 },
                 'hide.daterangepicker': function(ev,picker){
                     //TODO hide picker;
                 }
             }   
         }
     };

     $scope.saveInvoice = function(invoiceNum,invoiceDate){
          if($scope.objectSet.oAppReq.sRefID!=""){
            if(invoiceNum && invoiceDate ){
               var dobFormatted=$filter('date')(invoiceDate._d,"dd-MM-yyyy HH:mm:ss"),
               json = {
                       "oHeader":{
                       "sInstID":user.institutionID,
                       "sCroId":user.id,
                       "sAppSource":"WEB"
                       },
                       "sRefID":$scope.objectSet.oAppReq.sRefID,
                       "oInvDtls":{
                       "sInvNumber":invoiceNum,
                       "dtInv":dobFormatted
                       }
                    };

                RestService.saveToServer("update-invoice-details",json).then(function(Response){
                    if(Response.status == "SUCCESS"){
                        notifier.logSuccess("Invoice details updated successfully");
                        $scope.invoiceNumber = true;
                        $scope.invoiceDate = true;
                        $scope.isInvoiceAvailable = false;
                    }else{
                        notifier.logWarning("We are unable to update Invoice details") ;
                    }
                });
            }
        }else{
            notifier.logWarning("Please select application from queue !") ;
        }
    };

    $scope.loadPDF=function(){        
        var postIPARequest = {
            oHeader: {
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
            opostIPA:null,
            sRefID:$scope.currentApplicationFormRefID,
            dtDateTime:new Date().getTime()
        };

        RestService.saveToServer('get-post-ipa',JSON.stringify(postIPARequest)).then(function(response){
            if(response){        
                postIPARequest.opostIPA=response;
                
                RestService.saveToServer("get-pdf-ref",JSON.stringify(postIPARequest)).then(function(response){
                    if(response){
                        $scope.shwPDFModal(response,$scope.currentApplicationFormRefID,false);
                    }else{
                        notifier.logWarning("We are unable to load DO for this application") ;
                    }
                });
            }else{
                notifier.logWarning("We are unable to load DO for this application") ;
            }
        });
    };

    $scope.shwPDFModal = function (response,refID,canSubmit) {
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

    // destructor function for scope 
    $scope.$on("$destroy",function(){
        console.log('scope destroyed');
        stopPoling();
    });

    /* Surrogate */
    $scope.surrogateType=["Banking","Business","Credit Card","Owned House","Owned Car","Salary House"];
}]);

app.controller("ReinitiateStatusModalController",["$scope","$uibModalInstance","UserService","RestService","refID","$interval",
                                          function($scope,$uibModalInstance,UserService,RestService,refID,$interval){
    var user=UserService.getCurrentUser();
    
    //Hard Coded for testing
//  $scope.showPanStatus=true;
//  $scope.showCibilStatus=true;
//  $scope.showAadhaarStatus=true;
//  $scope.showDedupeStatus=true;
//  $scope.showAppScoreStatus=true;
//  $scope.showVeriScoreStatus=true;
//  $scope.showNegPinStatus=true;
    //Hard Coded for testing
    
    $scope.panVerified=false;
    $scope.cibilVerified=false;
    $scope.aadhaarVerified=false;
    $scope.dedupeVerified=false;
    $scope.appScoreVerified=false;
    $scope.verifScoreVerified=false;
    $scope.negPinVerified=false;

    $scope.showCibilStatus=true;
    
    var URL="status";
    var statusJSON ={
          "sRefID":refID,
          "oHeader": {
            "sCroId": "default",
            "dtSubmit":new Date().getTime(),
            "sReqType": "JSON",
            "sAppSource" : "WEB",
            "sDsaId":user.username,
            "sAppID": "",
            "sSourceID":"",
            "sInstID":user.institutionID
          }
    };

    var statusPoller = $interval(function(){
        RestService.saveToServer(URL,JSON.stringify(statusJSON)).then(function(resp){
            //[{"applicationLog":{},"sRefID":"5788d78b5bc7ec48de2796c2","bStatFlag":false,"iNoReTry":0,"oCompRes":{},"oIntrmStat":{"sRefId":null,"sAppID":null,"sInstID":null,"dtStart":1468681176705,"dtETime":null,"sAppStart":"DEFAULT","sDedupe":"DEFAULT","sEmailStat":"DEFAULT","sOtpStat":"COMPLETE","sAppStat":"DEFAULT","sPanStat":"DEFAULT","sAadharStat":"DEFAULT","sMbStat":"DEFAULT","sVarScoreStat":"DEFAULT","sScoreStat":"DEFAULT","sCblScore":"DEFAULT","sCroStat":"DEFAULT","oPanResult":null,"oCibilResult":null,"oResAddressResult":null,"oOffAddressResult":null,"oScoringResult":null,"oAadharResult":null,"oExperianResult":null,"oEquifaxResult":null,"oCHMResult":null,"oMbResult":null},"bNegPinCodeFlag":false,"aAppScoRslt":[]},{"applicationLog":{},"sRefID":"5788d78b5bc7ec48de2796c3","bStatFlag":false,"iNoReTry":0,"oCompRes":{},"oIntrmStat":{"sRefId":null,"sAppID":null,"sInstID":null,"dtStart":1468681176705,"dtETime":null,"sAppStart":"DEFAULT","sDedupe":"DEFAULT","sEmailStat":"DEFAULT","sOtpStat":"COMPLETE","sAppStat":"DEFAULT","sPanStat":"DEFAULT","sAadharStat":"DEFAULT","sMbStat":"DEFAULT","sVarScoreStat":"DEFAULT","sScoreStat":"DEFAULT","sCblScore":"DEFAULT","sCroStat":"DEFAULT","oPanResult":null,"oCibilResult":null,"oResAddressResult":null,"oOffAddressResult":null,"oScoringResult":null,"oAadharResult":null,"oExperianResult":null,"oEquifaxResult":null,"oCHMResult":null,"oMbResult":null},"bNegPinCodeFlag":false,"aAppScoRslt":[]}]
            if(resp){
                if(resp.oIntrmStat){
                    if(resp.oIntrmStat.sAadharStat == "COMPLETE"){
                        $scope.showAadhaarStatus=true;
                        if(resp.oIntrmStat.sAadharStat.sMsg == "EXIST")                
                        {
                            $scope.aadhaarVerified=true;
                        }else{
                            $scope.aadhaarVerified=false;                 
                        }
                    }

                    if(resp.oIntrmStat.sPanStat == "COMPLETE"){
                        $scope.showPanStatus=true;
                        if(resp.oIntrmStat.oPanResult.sMsg == "EXIST")                
                        {
                            $scope.panVerified=true;
                        }else{
                            $scope.panVerified=false;                 
                        }
                    }

                    if(resp.oIntrmStat.sCblScore == "COMPLETE"){              
                        $scope.showCibilStatus=true;
                        if(resp.oIntrmStat.oCibilResult.sMsg == "SUCCESS")                
                        {
                            $scope.cibilVerified=true;
                        }else{
                            $scope.cibilVerified=false;
                        }
                    }
                    
                    if(resp.oIntrmStat.sScoreStat == "COMPLETE"){              
                        $scope.showAppScoreStatus=true;
                        if(resp.oIntrmStat.oCibilResult.sMsg == "SUCCESS")                
                        {
                            $scope.cibilVerified=true;
                        }else{
                            $scope.cibilVerified=false;
                        }
                    }

                    if(resp.oIntrmStat.sVarScoreStat == "COMPLETE"){              
                        $scope.showAppScoreStatus=true;
                        if(resp.oIntrmStat.oCibilResult.sMsg == "SUCCESS")                
                        {
                            $scope.appScoreVerified=true;
                        }else{
                            $scope.appScoreVerified=false;
                        }
                    }
                }

                if(resp.sAppStat){
                    //DECISION
                    if(['queue'].indexOf(resp.sAppStat.toLowerCase()) > -1){
                    }else if(['approved','declined'].indexOf(resp.sAppStat.toLowerCase()) > -1){
                        $interval.cancel(statusPoller);
                    }

                    if(resp.sAppStat.toLowerCase()=="approved")
                    {
                        $scope.decision="Approved";
                        $scope.plApproved=true;

                        if(resp.aCroDec!=null && resp.aCroDec!=undefined && resp.aCroDec.length>0){
                            $scope.decisionMessage="Your loan of amount ₹ " + resp.aCroDec[0].dAmtAppr +" has been approved.";
                        }
                        $scope.progressStatus="Your application for HDBFS Ziploan is approved. We will get in touch with you shortly for further processing.";
                    }else if(resp.sAppStat.toLowerCase()=="declined"){
                        $scope.decision="Declined";

                        $scope.progressStatus="Unfortunately, due to our internal polices, we are unable to process your Loan application form.";
                    }
                    else if(resp.sAppStat.toLowerCase()=="queue"){
                        $scope.decision="Queue";

                        $scope.progressStatus="for processing your application for HDBFS Ziploan of Rs. "+ resp.aCroDec[0].dAmtAppr +". We will get in touch with you shortly.";
                    }
                    else if(resp.sAppStat.toLowerCase()=="new"){
                        // $scope.decision="Queue";
                    }
                }
            }
        });
    },3000);
    
    $scope.onProceedClicked=function(){
        $interval.cancel(statusPoller);
        $uibModalInstance.dismiss();
    }
}]);

app.controller("ReinitiatedDecisionModalController",["$scope","RestService","$uibModalInstance","requestObj","UserService","notifier",
    function($scope,RestService,$uibModalInstance,requestObj,UserService,notifier){

    var user = UserService.getCurrentUser();

    $scope.appForms = [];

    if(requestObj.oCompRes.scoringServiceResponse && requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE){

        requestObj.elgbltyGrid = ( requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID ? requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID : "" ) 
                                +"."
                                + (requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : (requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
    }

    $scope.appForms.push(requestObj);
    

    var requestJson = {
                    "oHeader":{
                            "sAppID":requestObj.oAppReq.sRefID,
                            "sInstID":user.institutionID,
                            "sSourceID":"WEB",
                            "sAppSource":"WEB",
                            "sReqType":"JSON",
                            "dtSubmit":new Date().getTime(), 
                            "sDsaId":null,
                            "sCroId":user.id,
                            "sDealerId":null
                          },
                     "sRefID":requestObj.oAppReq.sRefID,
                     "sProduct":"Consumer Durables",
                     "iNoOfRecord":2
                  }


     RestService.saveToServer("worker/bre-audit-data/",JSON.stringify(requestJson)).then(function(response){
        if(response){
            _.each(response,function(resp){
                resp = resp.auditData;
                if(resp.oCompRes.scoringServiceResponse && resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE)
                {
                    resp.elgbltyGrid = ( resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID ? resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID : "" ) 
                        +"."
                        + (resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : (resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? resp.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
                }
                $scope.appForms.push(resp);
            });         
        }
    });

    $scope.closeModal = function(){
        $uibModalInstance.dismiss();
    };
}]);

app.controller("supportedDocuments",['$scope', 'ImageFeed','$uibModalInstance','$timeout','RestService','notifier',
    function($scope,ImageFeed,$uibModalInstance,$timeout,RestService,notifier){
    
    $scope.croImages = true;
    $scope.noWrapSlides = true;
    $scope.active = ImageFeed.index;
    var rejectedImgArray = [];
    $scope.iseditMode = ImageFeed.editMode;
    var backUpImgData = angular.copy(ImageFeed.docData);
    
    if(ImageFeed.isImage){
        $scope.imageTag = 1;
        $scope.slides = _.each(ImageFeed.docData,function(value,key){
            return value["id"] = key;
        });
    }else{
        $scope.imageTag = 0;
        $scope.pdf = ImageFeed.docData;
    }

    $scope.approveImg = function(index){
        if(ImageFeed.editMode){
            $scope.slides[index].sStat = "Approve";
             var json ={
                  "oHeader": {
                    "sAppID": ImageFeed.applicationId,
                    "sApplID": ImageFeed.applicantId
                  },
                  "sRefID": ImageFeed.refId,
                  "sImageID":$scope.slides[index].sImgID,
                  "oUpldDtl": {
                    "sStat": "Approve",
                    "sReason":""
                  }
            };
            $scope.imageService(json,$scope.slides[index],index);
        }
    }

    $scope.rejectImg = function(index){
        if(ImageFeed.editMode){
            $scope.slides[index].sStat = "Reject";
        }
    }

    $scope.rejectService = function(index){
        if(ImageFeed.editMode){
             var json ={
                      "oHeader": {
                        "sAppID": ImageFeed.applicationId,
                        "sApplID": ImageFeed.applicantId
                      },
                      "sRefID": ImageFeed.refId,
                      "sImageID": $scope.slides[index].sImgID,
                      "oUpldDtl": {
                        "sStat": "Reject",
                        "sReason":$scope.slides[index].sReason
                      }
                    };
            $scope.imageService(json,$scope.slides[index],index);
         }
    }

    $scope.imageService = function(json,object,index){
         
         RestService.saveToServer('update-image-status',json).then(function(Response){
                if(Response.sStatus == "SUCCESS"){
                    backUpImgData[index].sStat = json.oUpldDtl.sStat;
                    backUpImgData[index].sReason = json.oUpldDtl.sReason;
                    notifier.logSuccess("Image status has been updated Successfully !!");
                }else{
                    $scope.slides[index].sStat = backUpImgData[index].sStat;
                    notifier.logWarning("Sorry! Unable to update image status !");
                }
        });
    }

    $scope.onFileSelect = function($files,imageName,imageIndex){
           if(ImageFeed.editMode){
                for (var i = 0; i < $files.length; i++){       
                    var fname=$files[0].name
                    var re = (/\.(jpg)$/i);
                    if(!re.exec(fname)){
                        notifier.logWarning("File extension not supported!") ;
                        return;
                    }
                    var $file = $files[i];
                    var base64;
                    var  reader=new FileReader();
                    if ($files[i] && $file){
                        var binaryString;
                        reader.onload = function(readerEvt) {
                            binaryString = readerEvt.target.result;
                            base64 = binaryString;
                            if(base64.split(",")[1].substring(0, 13) == "/9j/4AAQSkZJR"){
                                  if(!$scope.slides[imageIndex]["evdncArray"]){
                                        $scope.slides[imageIndex]["evdncArray"]=[];
                                    }
                                 var json ={
                                      "oHeader": {
                                        "sAppID": ImageFeed.applicationId,
                                        "sApplID": ImageFeed.applicantId,
                                        "sInstID": ImageFeed.institutionId
                                      },
                                      "sRefID": ImageFeed.refId,
                                      "oUpldDtl": {
                                        "sFileID": "1",
                                        "sFileName": $scope.slides[imageIndex].sImgType+"_EVIDENCE"+($scope.slides[imageIndex].evdncArray.length+1),
                                        "sFileType": "JPG",
                                        "sfileData": base64.split(",")[1],
                                        "sStat": "",
                                        "sReason":""
                                      }
                                    };
                                    if($scope.slides[imageIndex]["evdncArray"].length < 2){
                                         
                                         RestService.saveToServer('upload-image',json).then(function(Response){
                                                if(Response.sStatus == 'SUCCESS'){
                                                    if(!$scope.slides[imageIndex]["evdncArray"]){
                                                          $scope.slides[imageIndex]["evdncArray"]=[];
                                                    }
                                                    var evdcJson = {
                                                        "id" : $scope.slides[imageIndex]["evdncArray"].length,
                                                        "sByteCode" : base64,
                                                        "sImgID" : '',
                                                        "sImgType" : $scope.slides[imageIndex].sImgType+"_EVIDENCE"+($scope.slides[imageIndex].evdncArray.length+1),
                                                        "sReason" : '',
                                                        "sStat" : ''
                                                    };
                                                    $scope.slides[imageIndex].evdncArray.push(evdcJson);
                                                    evdcJson.id = $scope.slides.length ;
                                                    $scope.slides.push(evdcJson);
                                                 }
                                             }); 
                                          }else{
                                              notifier.logWarning("Maximum limit to upload images reached") ;
                                          }
                                }else{
                                    notifier.logWarning("File Type not supported");
                            }
                        };

                        reader.readAsDataURL($files[i]);
                        
                        $timeout(function() {
                        }, 3000);
                    }
                }
            }
    }

    $scope.closeModal = function(){
          $uibModalInstance.dismiss(backUpImgData);
    };

}]),

app.controller('ModalInstanceCtrl', ['$scope','$rootScope','NotificationObject','modalFeed',
   '$uibModalInstance','$log','notifier', 
   function($scope, $rootScope,NotificationObject,modalFeed,$uibModalInstance,$log,notifier){
   
    $scope.modalFeed = modalFeed;

    $scope.saveApprvPanel = function () {
         if($scope.modalFeed.apprvRemark && $scope.modalFeed.apprvSubTo && $scope.modalFeed.approveAmt && ($scope.modalFeed.emi || $scope.modalFeed.emi === 0) && ($scope.modalFeed.tenor || $scope.modalFeed.tenor === 0)){
            $uibModalInstance.close($scope.modalFeed);   
        } else {
           notifier.logWarning("Please provide all the fields !");
        }
    };

    $scope.closeApprvPanel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

app.controller('scoreTreeCtr', ['$scope','$uibModalInstance','treeFeed',function($scope,$uibModalInstance,treeFeed){ 
    
    $scope.treeFeed = treeFeed.treeData; 
    $scope.custName = treeFeed.custName.toUpperCase();
    $scope.custRefId = treeFeed.custRefId;
    $scope.closeTreePanel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('DeclInstanceCtrl', ['$scope','$rootScope','NotificationObject',
   '$uibModalInstance','dclnModelFeed','notifier', 
   function($scope, $rootScope,NotificationObject,$uibModalInstance,dclnModelFeed,notifier){ 
       
    $scope.dclnModelFeed = dclnModelFeed;
    $scope.saveDclnPanel = function () {
        if($scope.dclnModelFeed.dclnRemark !='' && $scope.dclnModelFeed.dclnRemark !=undefined){
            if($scope.dclnModelFeed.dclnSubTo !='' && $scope.dclnModelFeed.dclnSubTo !=undefined){
                $uibModalInstance.close($scope.dclnModelFeed);        
            }else{
                   notifier.logWarning("Please provide Subject To !");   
            }
        }else{
            notifier.logWarning("Please provide Remark !"); 
        }
    };
    $scope.closeDclnPanel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('onholdModelCtrl', ['$scope','$rootScope','NotificationObject',
   '$uibModalInstance','holdModelFeed','SelectArrays','notifier',
    function($scope, $rootScope,NotificationObject,$uibModalInstance,holdModelFeed,SelectArrays,notifier){ 

    var docData =  SelectArrays.getOfferData();
    $scope.OfferArrey =docData ;
    $scope.AvailebleOffers = $scope.OfferArrey[0].Offers;
    $scope.ID = 0;
    $scope.tabIndex = undefined;
    $scope.contentSelect = false;
    $scope.docOfferFlag = true;
    $scope.holdModelFeed = holdModelFeed;

    $scope.holdObject = {
        reqComment : ""
    };

    _.each($scope.holdModelFeed.rejectedImage , function(image){
         docData[4].Offers.push({'Name':image.sImgType , 'Icon':'images/rejected proof.png','Code':image.sImgType});
     });

      $scope.isCurrTab = function(index){
        if((index === 0 && $scope.tabIndex=== undefined ) || index === $scope.tabIndex){
            return true;
        }
    }

     $scope.isSelected = function(index){
          if((typeof docData[index].selected != "undefined") && (docData[index].selected.length > 0))
          return true;
    }

    $scope.Load_Offer = function(NodeID,Obj,index){
        $scope.tabIndex = index;
        
        for(var i = 0; i < docData.length; i++){
            if(docData[i].ID == NodeID){ 
                $scope.AvailebleOffers = docData[i].Offers;
                $scope.ID = NodeID;
            }
        }
    }
    
    $scope.checkboxUpdate = function(obj,id){ 
        if(obj){
            if (typeof docData[$scope.ID].selected != "undefined") {
                    docData[$scope.ID].selected.push(id);   
                    if(typeof docData[$scope.ID].Offers[id].selected == "undefined"){ 
                        angular.extend( docData[$scope.ID].Offers[id], {'selected':'true'});
                }

            } else {
                  var selected={'selected':[]};
                  angular.extend( docData[$scope.ID], selected);
                  docData[$scope.ID].selected.push(id); 
                if(typeof docData[$scope.ID].Offers[id].selected == "undefined"){
                     angular.extend( docData[$scope.ID].Offers[id], {'selected':'true'});
                }
            }   
      
      } else {
        
        docData[$scope.ID].selected.splice($.inArray(id, docData[$scope.ID].selected),1);
        delete docData[$scope.ID].Offers[id].selected;
      }
         $scope.isSelected($scope.ID);
         $scope.OfferArrey = docData;
    }

$scope.setSelected=function() {  
    var offers={'offers':[],'documents':[]};
    for(var i=0;i<docData.length;i++){
        for(var j=0;j<docData[i].Offers.length;j++){
            if((typeof docData[i].Offers[j].selected != 'undefined')){
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
}

$scope.requestDoc = function () {
      if($scope.holdObject.reqComment!=''){
        $scope.setSelected();
        var data = $scope.offrData;
        if(data.length != 0){
             var arrayDesc = [];
             for (var j in data){
                arrayDesc.push({sJCode:data[j].Code,sDescrip:$scope.holdObject.reqComment,sDocName:data[j].Name});
              }
            $uibModalInstance.close(arrayDesc);
        }else{
             notifier.logWarning("Please select atleast one required document !");
        }      
     }else{
         notifier.logWarning("Please enter your reason for Onhold !");
     }
};

$scope.closeDocument = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

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
            })
            elm.bind('blur', function() {
                scope.$apply(function() {
                    var newValue = elm.val();
                    if (newValue !== oldValue){
                        scope.$eval(expressionToCall);
                    }
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
});

app.filter('dateFilter', function() {
    return function(date){
         var result = '';
        if(date){
           result = date.slice(0,2)+"/"+date.slice(2,4)+"/"+date.slice(4);
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