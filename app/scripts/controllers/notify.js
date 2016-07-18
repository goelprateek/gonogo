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
       }
	
    });

	app.controller('NotifController', ['$scope','$rootScope', '$timeout','Validation','$filter',
								'RestService','NotificationObject','UserService','AclService','$uibModal','SelectArrays','$log',
                                function($scope, $rootScope, $timeout,Validation,$filter,RestService,NotificationObject,UserService,AclService,
        
                                    $uibModal,SelectArrays,$log){
	var user=UserService.getCurrentUser();
    $scope.can=AclService.can;

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }

    $scope.selectResidence = SelectArrays.getResidenceTypes();

    $scope.isDisabled=true;
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
	var height=$(window).height()-200;

	$scope.currImg= 0;
	$scope.appStatflag = '';

	$scope.countSelected="Select";
	var offersAllowed = AclService.can('NOFRS');
	var crodefault = AclService.can('NAPPDATADEF'); 
	var croQueue = AclService.can('NCROQUE'); 
    //check
	var treeData = [], map;
	$rootScope.template ="notification";
	$scope.minVal = 0;
	$scope.limit = 10;
	var current1 = 0;
	
	$scope.loadData = function(){
		 $scope.minVal = $scope.minVal+$scope.limit;
		 polling($scope.minVal);
	 }
	
	polling($scope.minVal);
	
	function polling(minimum) {
		if($rootScope.template == "notification"){
			if(!crodefault){
				if(user.id=="599"){
					var json ={'sCroID':"STP_PL", 
							'sInstID':user.institutionID, 
							'sGrpID':"0", 'iSkip': minimum, 'iLimit' : $scope.limit }
				}else{
					var json ={'sCroID':"STA", 
							'sInstID':user.institutionID,
							'sGrpID':"0" , 'iSkip': minimum, 'iLimit' : $scope.limit}
				}
			}else if(user.id=="586"){
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
			RestService.saveToServer(URL,json).then(function(data){
				if(!_.isNull(data) || _.isUndefined(data)){
                    $scope.notifarray = _.uniq(_.union($scope.notifarray,data));
					$scope.error ="";
				}

			});	
  		}
	}

    $scope.addrType = SelectArrays.getAddrType();
	$scope.addr_type = $scope.addrType[1];   //to set default address
	$scope.aplcntType=[{value:"SAL","text":"Salaried"},
				               	{value:"SEB","text":"Self Employed Business"},
				               	{value:"SEP","text":"Self Employed Professional"}];

    $scope.findAddressType = function(orignal,final){
    	return (angular.lowercase(orignal) == angular.lowercase(final));
    }				               	



    $scope.showimage = function(obj,isImgFlag,index){
        var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
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
                                institutionId : $scope.InstitutionID,
                                refId : $scope.objectSet.oAppReq.sRefID
                            }
                        }
                      }
                    });

         modalInstance.result.then(function (selected) {
                        }, function (array) {
                            $log.info($scope.rejectImgFromServer);
                             var filter = _.filter(array,function(arr2obj){
                                return arr2obj.sStat == "Reject";
                            });
                            $scope.rejectImgFromServer = filter;
                            $scope.imageDataArray = array;

                        });
    }

	$scope.load_details = function(CustID,dedupeflag)
	{  
        $scope.currentApplicationFormRefID=CustID;

        $scope.isUpdating=false;        
		
        var URL='';
		var json ={'sRefID':CustID};	
		if(croQueue)//for CRO1
		{ 
			URL = 'application-data';
			if(dedupeflag == "true"){
				 $scope.isDedupeSelected = true;
                 $scope.backUpDefaultRefId = [];
			}else{
				 $scope.isDedupeSelected = false;
			}
		}else{
			URL = 'application-data-cro2';
			if(dedupeflag == "true"){
                 $scope.backUpDefaultRefId = [];
				/*$('#accept , #reject').show();*/
			}/*else{
				$('#accept , #reject').hide();
			}*/
		}
		
        RestService.saveToServer(URL,json).then(function(response){
            var transfrmedOject ;
            //console.log(response.aAppScoRslt);
            if(response){
                transfrmedOject =  response;
                transfrmedOject.aAppScoRslt = _.uniq(transfrmedOject.aAppScoRslt,true,function(object){
                   /* if(object.sFldName  && !_.isEmpty(object.sFldVal))*/
                    return object;
                });

            }
            //console.log(transfrmedOject.aAppScoRslt);         
            return transfrmedOject;

        }).then(function(response){
            if(response)
				$scope.objectSet = response;
			else
			 $scope.objectSet = NotificationObject.dummy();
			
            $scope.Picked = CustID;
            $scope.done = '';
            $scope.error = '';
            $scope.dedupeRefArray = [];
            $scope.isAllImgApprove = true;
            $scope.showrefid = "true";
            $scope.croDecision = response.aCroDec;
            $scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;

            if($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE){
                $scope.ElgbltyGrid = ( $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID : "" ) 
                                     +"."
                                     + ($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : ($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
            }

            if($scope.objectSet.oAppReq.oReq.oApplicant.sDob && $scope.objectSet.oAppReq.oReq.oApplicant.sDob!=""){

                var dateOfBirth=new Date();
                dateOfBirth.setFullYear(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4)));
                dateOfBirth.setDate(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0,2)));
                dateOfBirth.setMonth((parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2,4))-1));
                
                // $scope.objectSet.oAppReq.oReq.oApplicant.sDob =$scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0,2)
                //                                                 +"/"+$scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2,4)
                //                                                 +"/"+$scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4);

                $scope.app_form={pickerDob:dateOfBirth};
            }

			var data = 	$scope.notifarray;
			_.each(data ,function(value){

                if(value.sRefID ==  $scope.objectSet.oAppReq.sRefID){
                    $scope.applctnstatus = value.sStat;}
            });

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
                var finalImageArray = _.flatten(_.each(objArray,function(val){
                    return _.each(val,function(val){
                        return RestService.saveToServer('get-image-by-id-base64', { 'sImgID' : val.sImgID}).then(function(data){
                            if(!_.isUndefined(data) || !_.isNull(data)){
                                if(!_.isEmpty(data.sByteCode)){
                                val["sByteCode"] = "data:image/png;base64,"+data.sByteCode; 
                                 $scope.imageDataArray.push(val); 
                                }  
                            }
                        });
                    });
                }));

               /* $scope.imageDataArray =  finalImageArray;*/
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
	if(croQueue){
	   $scope.container = false;
	}		
}

//for back button of grey form
$scope.toggleForm= function(){
	$scope.container = !$scope.container;
}

$scope.scoreTree = function(){
    var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
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

    /*modalInstance.result.then(function (selected) {
       console.log("successfully");
        }, function () {
          $log.info('Modal dismissed at: ');
        });*/
    }
	
$scope.cro_action = function(appID, action){ 
	$scope.appltnID = appID;
    $scope.isAllImgApprove = true;
     _.each($scope.imageDataArray,function(val){
        if(val.sStat != "Approve"){
           $scope.isAllImgApprove = false;
           return;
        }
    });
      console.log($scope.isAllImgApprove);

	if(($scope.applctnstatus.toUpperCase() == "QUEUE") || (!croQueue)){
		if((appID !== "undefined") && (typeof $scope.objectSet.oAppReq !== "undefined")){
			 if(action == "OnHold"){
				/* $scope.toggleDocPanel = !$scope.toggleDocPanel;
				 $scope.docOfferFlag = true;*/
                  var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
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
                            'sInstID':$scope.InstitutionID,
                            'sCroId':user.id},
                            "sAppStat":"OnHold",
                            "aCroJustification":offerarray,
                            "aDedupeRefID": ($scope.dedupeRefArray ? $scope.dedupeRefArray : [])
                        };
                        requestFordclnOnhold(json);
                        });
			 
			 }else if(action == "Declined"){
			 	/*$scope.toggleDclnPanel = !$scope.toggleDclnPanel;*/
                  var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
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
                                    'sInstID':$scope.InstitutionID,'sCroId':user.id},
                                    "sAppStat":"Declined",
                                    "aCroJustification":arrayDclnDesc, //not yet
                                    "aDedupeRefID ": ($scope.dedupeRefArray ? $scope.dedupeRefArray : [])
                                    };
                        requestFordclnOnhold(json);
                        });
                

			 }else{
                    if($scope.isAllImgApprove){
                     var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
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
                            'sInstID':$scope.InstitutionID,'sCroId':user.id},
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
                        alert("Please approve all the images");
                    }
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
}

function requestForStatus(json)
    {
    var URL = 'cro-approval';
    RestService.saveToServer(URL,json).then(function(Response){
        if(Response.status == "OK UPDATE SUCCESSFULLY")                     
        {
          _.each($scope.notifarray,function(value,key){
                        if($scope.notifarray[key].sAppId == $scope.objectSet.oAppReq.oHeader.sAppID){
                            return($scope.notifarray[key].sStat = json.sAppStat);
                        }  
                  });
            $scope.done = "Application is successfully "+json.sAppStat+""; 
        }
        else{
            $scope.error= "Sorry...Unable to update your action !!";
        }
    setTimeout(function() { $scope.error = "";},1500);
    }); 
  }

 function  requestFordclnOnhold(json){
            var URL='cro-onhold';
            RestService.saveToServer(URL,json).then(function(Response){
                if(Response.status == "OK UPDATE SUCCESSFULLY")                     
                {
                      _.each($scope.notifarray,function(value,key){
                            if($scope.notifarray[key].sRefID ==  $scope.objectSet.oAppReq.sRefID){
                                return($scope.notifarray[key].sStat = json.sAppStat);
                            }  
                      });
                    $scope.done = "Application is successfully "+json.sAppStat+""; 
                }
            });
        }

  $scope.losStatusChange=function(status){
    var utr =  $scope.objectSet.oLosDtls.sUtr;
     if(status == "LOS_DISB" &&   $scope.applctnstatus.toUpperCase()=="APPROVED"){ //
            //$scope.isUtrEdit = false; //&& (utr=='' || utr==null)//can edit
            if(utr=='' || utr==null){
                 $scope.isUtr();
                $scope.utrVal = false;        
            }
        }else{
             // $scope.isUtrEdit = true;
             $scope.utrVal = true; 
        }
        /* $('#losStatusId1').val(this.value);
        $scope.objectSet.oLosDtls.sStat =this.value;*/
  }

  $scope.onchange = function(id) {
        $scope.backUpDefaultRefId.push($scope.objectSet);
        if(id!='Select'){
        $scope.load_details(id,"false");
        }else{
            $scope.defaultRefId= $scope.backUpDefaultRefId[0].oAppReq.sRefID;
            $scope.load_details($scope.defaultRefId,"true");
        }
        }

	$scope.updateLosData = function(status){
	var losStat = status;
	var losId = $scope.objectSet.oLosDtls.sLosID;
	var utr = $scope.objectSet.oLosDtls.sUtr;

    if(($scope.utrVal==false && utr!='') || ($scope.utrVal == true && (utr=='' || utr!=''))){
    	if(losId != "" && losStat !="Select"){
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
    		 var URL='update-los-details';
    		 RestService.saveToServer(URL,jsondata).then(function(Response){
    				if(Response.status == "SUCCESS"){
    					alert("LOS Status updated successfully");
    					 $scope.losIdval = true;
                         $scope.utrVal = true;
    					 $(document.body).find('#utrData').css("border","1px solid #cfcfcf");
    					 $(document.body).find('#losId').css("border","1px solid #cfcfcf");
    				}else{
    					alert("LOS Status is not updated successfully");
    				}
    		 });
    		}
	}
}
	
	//code for chatting application
	/*$(document).on('click', '#btn_close', function(e) {
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
	});*/
	 
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

        $scope.fieldsUpdated={
            isNameUpdated:false,
            isResAddressUpdated:false,
            isOffAddressUpdated:false,
            isPanUpdated:false,
            isVoterIDUpdated:false,
            isAadhaarUpdated:false,
            isDobUpdated:false
        }
        $scope.dobOld=$scope.app_form.pickerDob;

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
    };

    $scope.updateForm=function(){
        
        var dobFormatted=$filter('date')($scope.app_form.pickerDob,"dd/MM/yyyy")
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
        
        console.log("Updating form : ");
        console.log($scope.objectSet);
        
        $scope.showReinitiateModal("lg",$scope.currentApplicationFormRefID,$scope.objectSet.oAppReq,$scope.fieldsUpdated);
    };
    
    $scope.onValueChanged=function(valueChanged){
        console.log("Value Changed :"+valueChanged);

        if(valueChanged == "name"){
            $scope.fieldsUpdated.isNameUpdated=true;
        }else if(valueChanged == "resAddress"){
            $scope.fieldsUpdated.isResAddressUpdated=true;
        }else if(valueChanged == "offAddress"){
            $scope.fieldsUpdated.isOffAddressUpdated=true;
        }else if(valueChanged == "pan"){
            $scope.fieldsUpdated.isPanUpdated=true;
        }else if(valueChanged == "aadhaar"){
            $scope.fieldsUpdated.isAadhaarUpdated=true;
        }else if(valueChanged == "voter"){
            $scope.fieldsUpdated.isVoterIDUpdated=true;
        }
    };  
    
    $scope.showReinitiateModal = function (size,refID,applicantFormObject,fieldsUpdated) {
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

app.controller("supportedDocuments",['$scope', 'ImageFeed','$uibModalInstance','$timeout','RestService',
    function($scope,ImageFeed,$uibModalInstance,$timeout,RestService){
    /*$scope.myInterval = 5000;*/
    $scope.noWrapSlides = true;
    $scope.isReject = false;
    $scope.active = ImageFeed.index;
    var rejectedImgArray = [];
    
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
        $scope.imageService(json,$scope.slides[index]);

    }

    $scope.rejectImg = function(index){
        $scope.slides[index].sStat = "Reject";
        $scope.isReject = true;
    }

    $scope.rejectService = function(index){
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
            $scope.imageService(json,$scope.slides[index]);
//             rejectArray.push({Name: imageName,Image:"",Reason:reason});
    }

    $scope.imageService = function(json,object){
         var URL ='update-image-status';
         RestService.saveToServer(URL,json).then(function(Response){
                if(Response.sStatus == "SUCCESS"){
                   /* if(json.oUpldDtl.sStat == "Reject"){
                        rejectedImgArray.push(object);
                        console.log(rejectedImgArray);
                    }*/
                }else{
                    $scope.slides[index].sReason = '';
                }
                   
        });
    }

    $scope.onFileSelect = function($files,imageName,imageIndex){
               // $files: an array of files selected, each file has
                for (var i = 0; i < $files.length; i++) 
                {       
                    var fname=$files[0].name
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
                                 var json ={
                                          "oHeader": {
                                            "sAppID": ImageFeed.applicationId,
                                            "sApplID": ImageFeed.applicantId,
                                            "sInstID": ImageFeed.institutionId
                                          },
                                          "sRefID": ImageFeed.refId,
                                          "oUpldDtl": {
                                            "sFileID": "1",
                                            "sFileName": $scope.slides[imageIndex].sImgType+"_EVIDENCE1",
                                            "sFileType": "JPG",
                                            "sfileData": base64.split(",")[1],
                                            "sStat": "",
                                            "sReason":""
                                          }
                                        };
                                var URL = 'upload-image';
                                 RestService.saveToServer(URL,json).then(function(Response){
                                        if(Response.sStatus == 'SUCCESS'){
                                            if(!$scope.slides[imageIndex]["evdncArray"]){
                                                  $scope.slides[imageIndex]["evdncArray"]=[];
                                            }
                                            if($scope.slides[imageIndex]["evdncArray"].length < 2){
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
                                            }else{
                                                alert("You have max limit of 2 images!");
                                            }
                                     }
                                 });   
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

    $scope.closeModal = function(){
          $uibModalInstance.dismiss($scope.slides);
    };

}]),

app.controller('ModalInstanceCtrl', ['$scope','$rootScope','NotificationObject','modalFeed',
   '$uibModalInstance','$log', function($scope, $rootScope,NotificationObject,modalFeed,$uibModalInstance,$log){
   
    $scope.modalFeed = modalFeed;
     $scope.approvemsg = false;

    $scope.saveApprvPanel = function () {
         if($scope.modalFeed.apprvRemark !=undefined && $scope.modalFeed.apprvRemark !=''){
             if($scope.modalFeed.apprvSubTo!=undefined && $scope.modalFeed.apprvSubTo!=''){
                if(modalFeed.approveAmt !='' && modalFeed.emi!='' && modalFeed.tenor!=''){
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

                /*if($.inArray(id, docData[$scope.ID].selected),1)
                delete docData[$scope.ID].selected[id];
                else{*/
                    docData[$scope.ID].selected.push(id);   
                    if(typeof docData[$scope.ID].Offers[id].selected == "undefined"){ 
                        $.extend( docData[$scope.ID].Offers[id], {'selected':'true'});
                /*  }*/
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
         $scope.isSelected($scope.ID);
         $scope.OfferArrey = docData;
      /*} else {
        $('#active'+$scope.ID+'').css("background-color","#fff");
      }*/
    }

    $scope.setSelected=function() {  
    var offers={'offers':[],'documents':[]};
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

app.controller("ReinitiateModalController",["$scope","RestService","refID","applicantFormObject","$uibModalInstance","fieldsUpdated",function($scope,RestService,refID,applicantFormObject,$uibModalInstance,fieldsUpdated){
    $scope.refID = refID;
    $scope.applicantFormObject = applicantFormObject;
    $scope.fieldsUpdated=fieldsUpdated;
    
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
                         {main:"MB" ,subs: [{name:"Cibil",id:101,isSuccess:false}]},
                         {main:"KYC" , subs: [{name:"PAN",id:201,isSuccess:true},
                                              {name:"Aadhaar",id:202,isSuccess:false}]},
                         {main:"Dedupe" , subs: [{name:"Dedupe",id:301,isSuccess:true},
                                                 {name:"Negative Pin Code",id:302,isSuccess:true}]},
                         {main:"SOBRE" , subs: [{name:"Verificaton scoring",id:401,isSuccess:true},
                                                {name:"Application scoring",id:402,isSuccess:true}]}
                      ];

    $scope.fieldModule={};
    $scope.tab = $scope.reinitiateModules[0].main;

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
        
        if(applicantFormObject==null){
            var requestJson={
                sGngRefId:$scope.refID,
                aModuleConfig:requestReinitiateModules
            };

            var URL="/worker/reprocess-by-id/";

            RestService.saveToServer(URL,JSON.stringify(requestJson)).then(function(Response){
                if(Response !=null || Response!= undefined || Response!=""){
                }
            });
        }else{
            var requestJson={
                oWorkFlowConfig : {
                    sGngRefId : $scope.refID,
                    aModuleConfig : requestReinitiateModules
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