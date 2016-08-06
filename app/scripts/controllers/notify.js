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
        }
	
       return {
    		dummy : _obj
       }
	
    });

	app.controller('NotifController', ['$scope','$rootScope', '$interval','Validation','$filter',
								'RestService','NotificationObject','UserService','AclService','$uibModal','SelectArrays','$log','notifier',
                                function($scope, $rootScope, $interval,Validation,$filter,RestService,NotificationObject,UserService,AclService,
                                    $uibModal,SelectArrays,$log,notifier){

	var user=UserService.getCurrentUser();
    $scope.can=AclService.can;

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }

    $scope.selectResidence = SelectArrays.getResidenceTypes();

   /* $scope.isDisabled=true;*/
    $scope.isUpdating = false;

    if(_.isUndefined(user.id) ){
        $location.path(APP_CONST.getConst('APP_CONTEXT'));
    }

    var object  = NotificationObject.dummy;
	$scope.objectSet =  object;    

	$scope.container = true;
    $scope.isDedupeSelected = true;
    $scope.isImg = true;
    $scope.backUpDefaultRefId = [];

    $scope.isLosId = function(){
        if($scope.objectSet.oLosDtls){
             if($scope.objectSet.oLosDtls.sLosID)
                return true;
            else
                return false;//can edit
        }else
        return false;
    }

    $scope.isUtr = function(){
        if($scope.objectSet.oLosDtls){
             if($scope.objectSet.oLosDtls.sUtr)
                return true;
            else
                return false;//can edit
        }else
        return false;
    }

    $scope.utrVal = true;
    $scope.losIdval = false;
    $scope.editLosStat = false;

	$scope.countSelected="Select";
	var offersAllowed = AclService.can('NOFRS');

	$rootScope.template ="notification";
	$scope.minVal = 0;
	$scope.limit = 100;
    $scope.notifarray = [];
    var timer ;
    
    // method to implement ELSearch

    $scope.searchNotification = function($viewValue){
        console.log($viewValue);
        if($viewValue.length >= 3){
        var _serviceInput = {
                      "oHeader": {
                        "sAppID":null,
                        "sInstID": user.institutionID,
                        "sSourceID": "WEB",
                        "sAppSource": "GNG_WEB",
                        "sReqType": "JSON",
                        "dtSubmit":"",//ask kishor
                        "sDsaId":null,//ask kishor
                        "sCroId":user.id,//ask kishor
                        "sDealerId":null//ask kishor
                      },
                      "oFilter": {
                         "dloanAmt":0,//ask
                         "sStage":"",//ask
                         "sMobileNumber":"",//ask
                         "sProduct":"CDL"//ask
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
                console.log(data);
                  if(data.notifications.length>0){
                        console.log("destroying timer");
                        $interval.cancel(timer);
                        $scope.notifarray = [];
                        var filteredSearchData = _.uniq(data.notifications, function(item, key, sRefID) { 
                            return item.sRefID;
                        });
                        $scope.notifarray = filteredSearchData;
                  }
            });
        }else if($viewValue.length == 0){
            polling(0);
            timer  = $interval(function(){
                 console.log("timer started again");
                 polling(0);
            }, 60000, 0,true); 
        }

    }

    //when to bottom of queue load next records
	/*$scope.loadData = function(){
         $scope.minVal = $scope.minVal+$scope.limit;
		 polling($scope.minVal);
	 }*/
	
	function polling (minimum ) {
        
		if($rootScope.template == "notification"){

			if(!AclService.can('NAPPDATADEF')){
				if(user.id=="599"){ 
                    $scope.json ={'sCroID':"STP_PL", 
                    'sInstID':user.institutionID, 
                    'sGrpID':"0", 'iSkip': minimum, 'iLimit' : $scope.limit}
				}else{
                    $scope.json ={'sCroID':"STA",  // CRO9
                    'sInstID':user.institutionID,
                    'sGrpID':"0" , 'iSkip': minimum, 'iLimit' : $scope.limit};
				}
			}else if(user.id=="586"){
                $scope.json ={'sCroID':"PL_QUEUE",  // CRO1 PL Normal
                        'sInstID':user.institutionID, 
                        'sGrpID':"0" , 'iSkip': minimum, 'iLimit' :$scope.limit};
            }else{
                $scope.json ={'sCroID':"default", // CRO1,CRO2 Normal
                        'sInstID':user.institutionID, 
                        'sGrpID':"0" , 'iSkip': minimum, 'iLimit' :$scope.limit}
			}

			var URL;

			if(AclService.can('NCROQUE')){
				URL = 'cro-queue'; //All 
			}else{
				URL = 'cro2-queue'; // Only CRO2
			}

           
			RestService.fetchDataQuietly(URL,$scope.json).then(function(data){
				
                if(!_.isNull(data) || !_.isUndefined(data)){

                    var queArray = _.union($scope.notifarray,data);
                    //only union, after interval adds +10 element in queue
                    var filteredData = _.uniq(queArray, function(item, key, sRefID) { 
                        return item.sRefID;
                    });

                    $scope.notifarray = filteredData;                    
				}
			});	
  		}
	}

    if(_.isUndefined(timer)){
         console.log("starting timer");
          timer  = $interval(function(){
                    polling($scope.minVal);
          }, 60000, 0,true);    
    }

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

	$scope.load_details = function(CustID,dedupeflag,applicationRequestType)
	{
        $scope.currentApplicationFormRefID=CustID;

        $scope.isUpdating=false;        
		
        var URL='';
		var json ={'sRefID':CustID};	

        if(applicationRequestType && applicationRequestType=="PS"){
            URL = 'application-data-partial';
        }else if(applicationRequestType && applicationRequestType=="FP"){
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
                transfrmedOject.aAppScoRslt = _.uniq(transfrmedOject.aAppScoRslt,true,function(object){
                    return object.sFldName;
                });

            }
            return transfrmedOject;

        }).then(function(response){
            if(response)
				$scope.objectSet = response;
			else
			 $scope.objectSet = NotificationObject.dummy();
			
            $scope.Picked = CustID;
            $scope.dedupeRefArray = [];
            $scope.isAllImgApprove = true;
            $scope.showrefid = true;
            $scope.invoiceDate = false;
            $scope.invoiceNumber = false;
            $scope.isInvoiceAvailable = true;
            $scope.datefilter.date = '';
            $scope.invoiceNum = "";//when received from server..this will variable get removed
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
                         $scope.datefilter.date = $scope.objectSet.oInvDtls.dtInv;
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
            return response;
			
		}).then(function(data){
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
                                 $scope.imageDataArray.push(val); 
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
 }

$scope.newApplication = function(){ 
	if(AclService.can('NCROQUE')){
	   $scope.container = false;
	}		
}

//for back button of grey form
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
                        treeData : $scope.objectSet.oCompRes.scoringServiceResponse.SCORE_TREE
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
      console.log($scope.isAllImgApprove);

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
                                    "aCroJustification":arrayDclnDesc, //not yet
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
        notifier.logWarning("Please select enquiry from Queue!!");
    }       
}

function requestForStatus(json){
    var URL = 'cro-approval';
    RestService.saveToServer(URL,json).then(function(Response){
        if(Response.status == "OK UPDATE SUCCESSFULLY")                     
        {
          _.each($scope.notifarray,function(value,key){
                        if($scope.notifarray[key].sRefID == $scope.objectSet.oAppReq.sRefID){
                            return($scope.notifarray[key].sStat = json.sAppStat);
                        }  
                  });
             notifier.logSuccess("Application is successfully "+json.sAppStat+""); 
        }
        else{
            notifier.logWarning("Sorry...Unable to Approve your application !!");
        }
    }); 
}

function requestFordclnOnhold(json){
    var URL='cro-onhold';
    RestService.saveToServer(URL,json).then(function(Response){
        if(Response.status == "OK UPDATE SUCCESSFULLY")                     
        {
              _.each($scope.notifarray,function(value,key){
                    if($scope.notifarray[key].sRefID ==  $scope.objectSet.oAppReq.sRefID){
                        return($scope.notifarray[key].sStat = json.sAppStat);
                    }  
              });
             notifier.logSuccess("Application is successfully "+json.sAppStat+""); 
        }
        else{
            notifier.logWarning("Sorry...Unable to update your action !!");
        }
    });
}

$scope.losStatusChange=function(status){
    var utr =  $scope.objectSet.oLosDtls.sUtr;
     if(status == "LOS_DISB" &&   $scope.applctnstatus.toUpperCase()=="APPROVED"){ //
            //$scope.isUtrEdit = false; //&& (utr=='' || utr==null)//can edit
            if(utr=='' || utr==null){
                 $scope.isUtr();
                $scope.utrVal = false; //enable utr field to edit       
            }
        }else{
             // $scope.isUtrEdit = true;
             $scope.utrVal = true; //disable utr field
        }
}

//clicking refId from drop down of dedupe cases
$scope.onchange = function(id) {
        $scope.backUpDefaultRefId.push($scope.objectSet);
        if(id!='Select'){
             $scope.load_details(id,false);
        }else{
            $scope.defaultRefId= $scope.backUpDefaultRefId[0].oAppReq.sRefID;
            $scope.load_details($scope.defaultRefId,true);
        }
}

$scope.updateLosData = function(status){
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
			    "sRefID":$scope.objectSet.sRefID,
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
            console.log(jsondata);
    		 var URL='update-los-details';
    		RestService.saveToServer(URL,jsondata).then(function(Response){
    				if(Response.status == "SUCCESS"){
                        notifier.logSuccess("LOS Status updated successfully");
    					$scope.losIdval = true;
                        $scope.utrVal = true;
    				}else{
                        notifier.logWarning("Sorry! We are unable to update your LOS Status");
    				}
    		 });
    	}
	}
}
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
    //alert($filter('date')(maxDa,"dd:MM:yyyy"));
    
    $scope.dateOptions = {          
        formatYear: 'yyyy',
        showWeeks:false,
        maxDate: maxDa, 
        minDate: minDa,
        startingDay: 1
    };

    $scope.enableForm=function(){
        if($scope.objectSet.iNoReTry>=2){
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

            //$scope.oldPinCode=;

            $scope.isUpdating=!$scope.isUpdating;
            
            if($scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs!=null){
                var isAadhaarPresent=false;
                var isVoterPresent=false;
                var isPanPresent=false;

                for(var i=0;i<$scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs.length;i++){
                    if($scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs[i].sKycName.toLowerCase().indexOf("aadhar")>=0){
                        isAadhaarPresent=true;
                    }

                    if($scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs[i].sKycName.toLowerCase().indexOf("pan")>=0){
                        isPanPresent=true;
                    }

                    if($scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs[i].sKycName.toLowerCase().indexOf("voter")>=0){
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
                    
                    $scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs.push(newKYC);
                }
                
                if(!isVoterPresent){
                    var newKYC={
                        sExpiryDate:null,
                        sIssueDate:null,
                        sKycName:"VOTERID",
                        sKycNumber:"",
                        sKycStat:null
                    }
                    $scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs.push(newKYC);
                }
                
                if(!isPanPresent){
                    var newKYC={
                        sExpiryDate:null,
                        sIssueDate:null,
                        sKycName:"PAN",
                        sKycNumber:"",
                        sKycStat:null
                    }
                    $scope.objectSet.oAppReq.oReq.oApplicant.aKycDocs.push(newKYC);
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
        if($scope.objectSet.iNoReTry>=2){
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
        console.log("Value Changed :"+valueChanged);

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
    };

    $scope.getStateCity=function($event,address){
        
        console.log("getStateCity");
        console.log(address);
        var pin=$event.target.value;
        
        address.sCity="";
        address.sState="";
        
        if(pin.length==6){
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

    $scope.showReinitiatedDecisionData=function(size,requestObj){
//      console.log("showDecisionReinitiatedData");
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

   //invoice information
    
    $scope.invoiceDate = false;
    $scope.invoiceNumber = false;
    console.log("invoiceDate :"+$scope.invoiceDate);
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
                     $scope.datefilter.date.startDate = moment();
                 },
                 'hide.daterangepicker': function(ev,picker){
                     console.log('hide picker');
                 }
             }   
         }
     };
    
     $scope.saveInvoice = function(invoiceNum,invoiceDate){
          if($scope.objectSet.oAppReq.sRefID!=""){
            if((invoiceNum != undefined && invoiceNum!="") && (invoiceDate != undefined && invoiceDate !="")){
               var dobFormatted=$filter('date')(invoiceDate._d,"dd-MM-yyyy HH:mm:ss");
               var json = {
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
                           console.log(json);
                           var URL="update-invoice-details";

                RestService.saveToServer(URL,json).then(function(Response){
                    if(Response.status == "SUCCESS"){
                        notifier.logSuccess("Invoice details updated successfully");
                        $scope.invoiceNumber = true;
                        $scope.invoiceDate = true;
                        $scope.isInvoiceAvailable = false;
                    }else{
                        notifier.logWarning("Sorry! We are unable to update Invoice details") ;
                    }
                });
            }
        }else{
            notifier.logWarning("Please select application from queue!") ;
        }
    };

    $scope.loadPDF=function(){        
        var postIPARequest=
        {
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
            opostIPA:null,
            sRefID:$scope.currentApplicationFormRefID,
            refID:$scope.currentApplicationFormRefIDssss,
            dtDateTime:new Date().getTime()
        };
        //alert(JSON.stringify(request));
        //console.log("JSON IPA REQUEST : "+JSON.stringify(postIPARequest));
        
        URL = 'get-post-ipa';
        RestService.saveToServer(URL,JSON.stringify(postIPARequest)).then(function(Response){
            //console.log("JSON IPA RESPONSE : ");
            //console.log(JSON.stringify(Response));
            if(Response){        
                postIPARequest.opostIPA=Response;
                
                //console.log(" IPA PDF REQUEST : "+JSON.stringify(postIPARequest));
                
                URL = 'get-pdf-ref';
                RestService.saveToServer(URL,JSON.stringify(postIPARequest)).then(function(Response){
                    //console.log("JSON IPA PDF RESPONSE : ");
                    //console.log(JSON.stringify(Response));
                    if(Response){
                        $scope.shwPDFModal('lg',Response);
                    }
                });
            }
        });
    };

    $scope.shwPDFModal = function (size,response) {
         //alert('modal baseURL'+baseURL);
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal-do-view.html',
            controller: 'DOModalCtrl',
            size: size,
            resolve: {
                response:function(){
                    return response;
                }
            }
        });
    };

    // destructor function for scope 
    $scope.$on("$destroy",function(){
        console.log("destroying timer");
        if(angular.isDefined(timer)){
             $interval.cancel(polling);
             timer = undefined;
        }
    });
}]);

app.controller("ReinitiatedDecisionModalController",["$scope","RestService","$uibModalInstance","requestObj","UserService","notifier",
    function($scope,RestService,$uibModalInstance,requestObj,UserService,notifier){

    var user=UserService.getCurrentUser();

    $scope.appForms=[];

    if(requestObj.oCompRes.scoringServiceResponse && requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE){
        requestObj.elgbltyGrid = ( requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID ? requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID : "" ) 
                                +"."
                                + (requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : (requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
    }
    $scope.appForms.push(requestObj);
    
//  $scope.bureau = requestObj.aAppScoRslt;
//
//  $scope.cibilS = requestObj.oIntrmStat.oCibilResult.sFldVal;
//
//  $scope.offAddrStab= requestObj.oIntrmStat.oOffAddressResult.iAddrStblty;
//
//  $scope.resAddrStab= requestObj.oIntrmStat.oResAddressResult.iAddrStblty;
//
//  $scope.kyc_status = requestObj.oIntrmStat.oPanResult; 
//
//  $scope.appldAmount = requestObj.oAppReq.oReq.oApplication.dLoanAmt;
//
//  $scope.croDec=requestObj.aCroDec[0];
//
//  $scope.offAddrStab= requestObj.oIntrmStat.oOffAddressResult.iAddrStblty;
//
//  $scope.resAddrStab= requestObj.oIntrmStat.oResAddressResult.iAddrStblty;
//
//  $scope.DetailsResp=requestObj.oCompRes.scoringServiceResponse["DECISION_RESPONSE"].Details;
//  
//  if(Response.oCompRes.scoringServiceResponse && Response.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE){
//      $scope.Eremark = requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.REMARK;
//      $scope.ElgbltyGrid = ( requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID ? Response.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID : "" ) 
//                           +"."
//                           + (requestObj.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? Response.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : (Response.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? Response.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
//  }

    //'sAppID':$scope.appltnID,'sInstID':user.institutionID,'sCroId':user.id
    var requestJson={"oHeader":{"sAppID":requestObj.oAppReq.sRefID,"sInstID":user.institutionID,"sSourceID":"WEB","sAppSource":"WEB","sReqType":"JSON","dtSubmit":new Date().getTime(),"sDsaId":null,"sCroId":user.id,"sDealerId":null},"sRefID":requestObj.oAppReq.sRefID,"sProduct":"Consumer Durables","iNoOfRecord":2}

    var URL="worker/bre-audit-data/";

     RestService.saveToServer(URL,JSON.stringify(requestJson)).then(function(Response){
        //[{"applicationLog":{},"sRefID":"5788d78b5bc7ec48de2796c2","bStatFlag":false,"iNoReTry":0,"oCompRes":{},"oIntrmStat":{"sRefId":null,"sAppID":null,"sInstID":null,"dtStart":1468681176705,"dtETime":null,"sAppStart":"DEFAULT","sDedupe":"DEFAULT","sEmailStat":"DEFAULT","sOtpStat":"COMPLETE","sAppStat":"DEFAULT","sPanStat":"DEFAULT","sAadharStat":"DEFAULT","sMbStat":"DEFAULT","sVarScoreStat":"DEFAULT","sScoreStat":"DEFAULT","sCblScore":"DEFAULT","sCroStat":"DEFAULT","oPanResult":null,"oCibilResult":null,"oResAddressResult":null,"oOffAddressResult":null,"oScoringResult":null,"oAadharResult":null,"oExperianResult":null,"oEquifaxResult":null,"oCHMResult":null,"oMbResult":null},"bNegPinCodeFlag":false,"aAppScoRslt":[]},{"applicationLog":{},"sRefID":"5788d78b5bc7ec48de2796c3","bStatFlag":false,"iNoReTry":0,"oCompRes":{},"oIntrmStat":{"sRefId":null,"sAppID":null,"sInstID":null,"dtStart":1468681176705,"dtETime":null,"sAppStart":"DEFAULT","sDedupe":"DEFAULT","sEmailStat":"DEFAULT","sOtpStat":"COMPLETE","sAppStat":"DEFAULT","sPanStat":"DEFAULT","sAadharStat":"DEFAULT","sMbStat":"DEFAULT","sVarScoreStat":"DEFAULT","sScoreStat":"DEFAULT","sCblScore":"DEFAULT","sCroStat":"DEFAULT","oPanResult":null,"oCibilResult":null,"oResAddressResult":null,"oOffAddressResult":null,"oScoringResult":null,"oAadharResult":null,"oExperianResult":null,"oEquifaxResult":null,"oCHMResult":null,"oMbResult":null},"bNegPinCodeFlag":false,"aAppScoRslt":[]}]
        if(Response){
            _.each(Response,function(resp){
                resp=resp.auditData;
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
    /*$scope.myInterval = 5000;*/
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
         var URL ='update-image-status';
         RestService.saveToServer(URL,json).then(function(Response){
                if(Response.sStatus == "SUCCESS"){
                    backUpImgData[index].sStat = json.oUpldDtl.sStat;
                     backUpImgData[index].sReason = json.oUpldDtl.sReason;
                }else{
                    $scope.slides[index].sStat = backUpImgData[index].sStat;
                }
        });
    }

    $scope.onFileSelect = function($files,imageName,imageIndex){
               // $files: an array of files selected, each file has
           if(ImageFeed.editMode){
                for (var i = 0; i < $files.length; i++){       
                    var fname=$files[0].name
                    var re = (/\.(jpg)$/i);
                    if(!re.exec(fname))
                    {
                        notifier.logWarning("File extension not supported!") ;
                        break;
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
                                         var URL = 'upload-image';
                                         RestService.saveToServer(URL,json).then(function(Response){
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
                                                notifier.logWarning("You have max limit of 2 images") ;
                                          }
                                }else{
                                    notifier.logWarning("File Type not supported") ;
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
   '$uibModalInstance','$log', function($scope, $rootScope,NotificationObject,modalFeed,$uibModalInstance,$log){
   
    $scope.modalFeed = modalFeed;
    $scope.approvemsg = false;

    $scope.saveApprvPanel = function () {
         if($scope.modalFeed.apprvRemark !=undefined && $scope.modalFeed.apprvRemark !=''){
             if($scope.modalFeed.apprvSubTo!=undefined && $scope.modalFeed.apprvSubTo!=''){
                if(modalFeed.approveAmt !=undefined && modalFeed.emi!=undefined && modalFeed.tenor!=undefined){
                    $uibModalInstance.close($scope.modalFeed);   
                }else{
                    $scope.approvemsg = true;
                }
             }else{
                $scope.approvemsg = true;
            }
        }else{
            $scope.approvemsg = true;
        }
    };

    $scope.closeApprvPanel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('scoreTreeCtr', ['$scope','$uibModalInstance','treeFeed', 
    function($scope,$uibModalInstance,treeFeed){ 
       
    $scope.treeFeed = treeFeed.treeData;    
    $scope.closeTreePanel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('DeclInstanceCtrl', ['$scope','$rootScope','NotificationObject',
   '$uibModalInstance','dclnModelFeed', function($scope, $rootScope,NotificationObject,$uibModalInstance,dclnModelFeed){ 
       
    $scope.dclnModelFeed = dclnModelFeed;
    $scope.errorMsg = false;
    $scope.saveDclnPanel = function () {
        if($scope.dclnModelFeed.dclnRemark !='' && $scope.dclnModelFeed.dclnRemark !=undefined){
            if($scope.dclnModelFeed.dclnSubTo !='' && $scope.dclnModelFeed.dclnSubTo !=undefined){
                $uibModalInstance.close($scope.dclnModelFeed);        
            }else{
                 $scope.errorMsg = true;     
            }
        }else{
            $scope.errorMsg = true;
        }
    };
    $scope.closeDclnPanel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.controller('onholdModelCtrl', ['$scope','$rootScope','NotificationObject',
   '$uibModalInstance','holdModelFeed','SelectArrays', function($scope, $rootScope,NotificationObject,$uibModalInstance,holdModelFeed,SelectArrays){ 
       
    var docData =  SelectArrays.getOfferData();
     $scope.OfferArrey =docData ;
     $scope.AvailebleOffers = $scope.OfferArrey[0].Offers;
     $scope.ID = 0;
     $scope.tabIndex = undefined;
     $scope.contentSelect = false;
     $scope.invalidMsg = false;
     $scope.docOfferFlag = true;
     $scope.holdModelFeed = holdModelFeed;

    $scope.holdObject = {
        reqComment : ""
    };

    _.each($scope.holdModelFeed.rejectedImage , function(image){
         docData[4].Offers.push({'Name':image.sImgType , 'Icon':'images/rejected proof.png','Code':image.sImgType});
     });
    
      $scope.isCurrTab = function(index){
        if((index == 0 && $scope.tabIndex== undefined) || index == $scope.tabIndex){
            return true;
        }
    }

     $scope.isSelected = function(index){
          if((typeof docData[index].selected !="undefined") && (docData[index].selected.length > 0))
          return true;
    }

    $scope.Load_Offer = function(NodeID,Obj,index){
        $scope.tabIndex = index;
        for(var i=0; i<docData.length; i++)
        {if(docData[i].ID == NodeID)
        {   $scope.AvailebleOffers = docData[i].Offers;
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
      if($scope.holdObject.reqComment != '' && $scope.holdObject.reqComment != undefined){
        $scope.setSelected();
        var data = $scope.offrData;
        var arrayDesc = [];
         for (var j in data){
            arrayDesc.push({sJCode:data[j].Code,sDescrip:$scope.holdObject.reqComment,sDocName:data[j].Name});
          }
          if( $scope.invalidMsg == true)
             $scope.invalidMsg = !$scope.invalidMsg;
        $uibModalInstance.close(arrayDesc);
     }else{
         $scope.invalidMsg = !$scope.invalidMsg;
     }
};

$scope.closeDocument = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller("ReinitiateModalController",["$scope","RestService","refID","applicantData","$uibModalInstance","fieldsUpdated","notifier",
    function($scope,RestService,refID,applicantData,$uibModalInstance,fieldsUpdated,notifier){
    $scope.refID = refID;
    $scope.applicantData = applicantData;
    $scope.fieldsUpdated=fieldsUpdated;

    $scope.fieldModule={};
    
    $scope.tags = [];
    
    var requestReinitiateModules=[];
    
    // var requestReinitiateModules=[
    //                              {sModuleName : "101", bRunModule : false},
    //                              {sModuleName : "201", bRunModule : false},
    //                              {sModuleName : "202", bRunModule : false},
    //                              {sModuleName : "301", bRunModule : false},
    //                              {sModuleName : "302", bRunModule : false},
    //                              {sModuleName : "401", bRunModule : false},
    //                              {sModuleName : "402", bRunModule : false}
    //                          ];

    $scope.reinitiateModules=[
                         {main:"MB" ,subs: [{name:"Cibil",id:101,isSuccess:true}]},
                         {main:"KYC" , subs: [{name:"PAN",id:201,isSuccess:true},
                                              {name:"Aadhaar",id:202,isSuccess:true}]},
                         {main:"Dedupe" , subs: [{name:"Dedupe",id:301,isSuccess:true},
                                                 {name:"Negative Pin Code",id:302,isSuccess:true}]},
                         {main:"SOBRE" , subs: [{name:"Verificaton scoring",id:401,isSuccess:true},
                                                {name:"Application scoring",id:402,isSuccess:true}]}
                      ];
    
    $scope.tab = $scope.reinitiateModules[0].main;
    
    //Hard Coded for testing
//    var requestReinitiateModules=[
//                                  {sModuleName : "101", bRunModule : true},
//                                  {sModuleName : "201", bRunModule : true},
//                                  {sModuleName : "202", bRunModule : true},
//                                  {sModuleName : "301", bRunModule : true},
//                                  {sModuleName : "302", bRunModule : false},
//                                  {sModuleName : "401", bRunModule : true},
//                                  {sModuleName : "402", bRunModule : false}
//                              ];
//    $scope.applicantData.oWorkFlowConfig = {
//        sGngRefId : $scope.refID,
//        aModuleConfig : requestReinitiateModules
//    };
    //Hard Coded for testing

    
    if($scope.applicantData.oWorkFlowConfig && $scope.applicantData.oWorkFlowConfig.aModuleConfig){
        _.each($scope.applicantData.oWorkFlowConfig.aModuleConfig, function(mConfig){
            _.each($scope.reinitiateModules,function(module){
                _.each(module.subs,function(subModule){
                    if((subModule.id+"")==mConfig.sModuleName){
                        subModule.isSuccess=mConfig.bRunModule;
                    }
                });
            });
        });
    }
    
    //If Fields updated then add all into processing
    if($scope.fieldsUpdated && ($scope.fieldsUpdated.isNameUpdated || $scope.fieldsUpdated.isResAddressUpdated || $scope.fieldsUpdated.isOffAddressUpdated || $scope.fieldsUpdated.isPerAddressUpdated || $scope.fieldsUpdated.isPanUpdated || $scope.fieldsUpdated.isVoterIDUpdated || $scope.fieldsUpdated.isAadhaarUpdated || $scope.fieldsUpdated.isDobUpdated)){
        for(var i=0;i<$scope.reinitiateModules.length;i++) {
            for(var j=0;j<$scope.reinitiateModules[i].subs.length;j++) {
                $scope.tags.push({text: $scope.reinitiateModules[i].subs[j].name,id:$scope.reinitiateModules[i].subs[j].id});
            }
        }
    }

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
            val= {
                    color:"white",
                    background:$scope.getTabColor(pTab),
                    outline:null
                    };
        }else{
            //This tab is not active
            val= {
                    color:$scope.getTabColor(pTab),
                    border:"1px solid " + $scope.getTabColor(pTab)
                };
        }
        return val;
    };

    $scope.isTabSuccess=function(pTab){
        var isSuccess=true;
        for(var i=0;i<$scope.reinitiateModules.length;i++){
            if($scope.reinitiateModules[i].main==pTab){
                for(var j=0;j<$scope.reinitiateModules[i].subs.length;j++)
                {
                    if(!$scope.reinitiateModules[i].subs[j].isSuccess){
                        isSuccess=false;
                    }
                }
            }
        }

        return isSuccess;
    };

    $scope.getSubStyle=function(pSub){
//      console.log("pTab:"+pTab);
        var val="";
        //This tab is not active
        val= {
                color:$scope.getSubColor(pSub),
                outline:null        
            };
        return val;
    };

    $scope.getTabColor=function(pTab){
        if($scope.isTabSuccess(pTab)){ //Color code == green
            return "#22ab4a";
        }else{
            return "#ee1f23";
        }
    };

    $scope.getSubColor=function(pSub){
        for(var i=0;i<$scope.reinitiateModules.length;i++) {
            for(var j=0;j<$scope.reinitiateModules[i].subs.length;j++) {
                if($scope.reinitiateModules[i].subs[j].id==pSub){
                    if($scope.reinitiateModules[i].subs[j].isSuccess) { //Color code == green
                        return "#22ab4a";
                    }else{
                        return "#ee1f23";
                    }
                }
            }
        }
    };

    $scope.addTag=function(pTag,tagId){
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
        //console.log("Reinitiate form :"+$scope.refID);
        requestReinitiateModules=[];
        for(var mainIndex=0;mainIndex<$scope.reinitiateModules.length;mainIndex++) {
            for(var subIndex=0;subIndex<$scope.reinitiateModules[mainIndex].subs.length;subIndex++) {
                var shouldProcess=false;            
                for(var tagIndex=0;tagIndex<$scope.tags.length;tagIndex++) {                    
                    if($scope.reinitiateModules[mainIndex].subs[subIndex].id==$scope.tags[tagIndex].id) {
                        shouldProcess=true;
                    }
                }

                requestReinitiateModules.push({sModuleName : ""+$scope.reinitiateModules[mainIndex].subs[subIndex].id, bRunModule : shouldProcess});
            }
        }
        
        // var moduleArr=[];
        // for(var i=0;i<$scope.tags.length;i++){
        //     console.log("Reinitiating :"+$scope.tags[i].id+" "+$scope.tags[i].text);
            
        //     for(var j=0;j<$scope.reinitiateModules.length;j++)
        //     {
        //         if(reinitiateModules[j].sModuleName==$scope.tags[i].id){
        //             reinitiateModules[j].bRunModule=true;
        //         }          
        //     }
        // }
        if($scope.fieldsUpdated && ($scope.fieldsUpdated.isNameUpdated || $scope.fieldsUpdated.isResAddressUpdated || $scope.fieldsUpdated.isOffAddressUpdated || $scope.fieldsUpdated.isPerAddressUpdated || $scope.fieldsUpdated.isPanUpdated || $scope.fieldsUpdated.isVoterIDUpdated || $scope.fieldsUpdated.isAadhaarUpdated || $scope.fieldsUpdated.isDobUpdated)){
            var requestJson={
                oWorkFlowConfig : {
                    sGngRefId : $scope.refID,
                    aModuleConfig : requestReinitiateModules
                },
                oApplicationRequest : applicantData.oAppReq
            };

            var URL="/worker/reprocess-updated/";

            RestService.saveToServer(URL,JSON.stringify(requestJson)).then(function(Response){
                if(Response && Response.sStat=="SUCCESS"){
                    notifier.logSuccess("Application has been reinitiated successfully");
                }else{
                    notifier.logWarning("Error occured while reinitiating") ;
                }
                $uibModalInstance.dismiss();
            });
        }
        else{
            var requestJson={
                sGngRefId:$scope.refID,
                aModuleConfig:requestReinitiateModules
            };

            var URL="worker/reprocess-by-id/";

            RestService.saveToServer(URL,JSON.stringify(requestJson)).then(function(Response){
                if(Response && Response.sStat=="SUCCESS"){
                    notifier.logSuccess("Application has been reinitiated successfully");
                }else{
                    notifier.logWarning("Error occured while reinitiating") ;
                }
                $uibModalInstance.dismiss();
            });
        }
    };

    $scope.closeModal = function(){
          $uibModalInstance.dismiss();
    };
}]);

app.controller('DOModalCtrl', ['$scope', '$uibModalInstance', 'response',
    function ($scope, $uibModalInstance, response) {

    $scope.response = response;

    $scope.closeModal = function () {
        $uibModalInstance.dismiss();
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

/*app.filter('dateFormat', function() {
	return function(item) {
		var month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec' ];
console.log(item);
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
});*/

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