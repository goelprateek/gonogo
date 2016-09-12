;(function(){

	'use strict';

	var app = angular.module('gonogo');

	app.controller('NotifController', ['$scope','$rootScope', '$interval','$filter',
								'RestService','ObjectStore','UserService','AclService','$uibModal','SelectArrays','$log','notifier','$state','sharedService',
                                function($scope, $rootScope, $interval,$filter,RestService,ObjectStore,UserService,AclService,
                                    $uibModal,SelectArrays,$log,notifier,$state,sharedService){

	var user=UserService.getCurrentUser();

    $scope.can=AclService.can;

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }

    if(_.isUndefined(user.id) ){
        $state.go(APP_CONST.getConst('APP_CONTEXT'));
    }

    $scope.selectResidence = SelectArrays.getResidenceTypes();
    $scope.objectSet = ObjectStore.notify();

   // $scope.showReinitiate=true;	  
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
    $scope.editLosStat = false;

	$scope.countSelected="Select";
	
    //FIXME
    //sayali if this action is present then show onhold panel otherwise directly on click of onhold ,onhold 
    //the application
    var offersAllowed = AclService.can('NOFRS');

	$rootScope.template ="notification";
    sharedService.setApplicationSource("notification");
    sharedService.setAnalyticsServiceName(null);
    sharedService.setAnalyticsServiceParm(null);
	$scope.minVal = 0;
	$scope.limit = 100;
    $scope.notifarray = [];
    var timer ;
    var startPoling = function(){
        if(_.isUndefined(timer)){
          timer  = $interval(function(){
                   polling($scope.minVal);
          }, 60000, 0,true);    
        }
    }

    var stopPoling = function(){
        if(angular.isDefined(timer)){
            $interval.cancel(timer);   
            timer = undefined; 
        }
    }

    // method to implement ELSearch
    $scope.searchNotification = function($viewValue){

        if(_.isUndefined($viewValue)) return;

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
                        "sCroId":user.username,
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
        }else if($viewValue.length === 0){
            //$scope.notifarray = [];
            startPoling();
        }
    }

	function polling (minimum ) {
        
		if($rootScope.template == "notification"){

            //CRO ID - Application fetching based on CRO ID
            $scope.json ={
                "oHeader":{
                    /* not working with this institution id*/
                     "sInstID":user.institutionID,
                     "sSourceID":"WEB",
                     "sAppSource":"WEB",
                     "sReqType":"JSON",
                     "sCroId":user.username
                },
                'sCroID':"", 
                'sInstID':user.institutionID,
                'sGrpID':"0" , 
                'iSkip': minimum, 
                'iLimit' : $scope.limit,
                'oCriteria':{
                    "oHierarchy":user.hierarchy,
                    "aProducts":user.getProductNames()
                }
            };

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
				
                if(data){

                    $scope.notifarray = _.uniq(_.union($scope.notifarray,data), function(item, key, sRefID) { 
                        return item.sRefID;
                    });
                    //to preserve data after clicking back of ref id 
                     if(sharedService.getApplicationData()){
                        $scope.objectSet = sharedService.getApplicationData();
                        var data =  $scope.notifarray;
                        _.each(data ,function(value){
                            if(value.sRefID ==  $scope.objectSet.oAppReq.sRefID){
                                $scope.Picked = value.sRefID;
                                $scope.showrefid = true;
                            }
                        });
                        setModifiedData($scope.objectSet);
                        $scope.imageDataArray = sharedService.getApplicationImages();
                    }
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

        var URL='';
		var json ={
              "oHeader":{
                             "sInstID":user.institutionID,
                             "sSourceID":"WEB",
                             "sAppSource":"WEB",
                             "sReqType":"JSON",
                             "sCroId":user.username
                        },
            'sRefID':CustID};	

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
                transfrmedOject = response;
                transfrmedOject.aAppScoRslt = _.uniq(transfrmedOject.aAppScoRslt,function(item, key, sFldName){
                    return item.sFldName;
                });
            }
            return transfrmedOject;

        }).then(function(response){
            if(!response) return;

            $scope.objectSet = response || ObjectStore.notify();

            sharedService.setApplicationData($scope.objectSet);
            sharedService.setApplicationSource("notification");

            if(!AclService.can('NCROQUE')){
                $state.transitionTo("notification.appForm", { id: CustID });
            }

            $scope.Picked = CustID;
            $scope.dedupeRefArray = [];
            $scope.isAllImgApprove = true;
            $scope.showrefid = true;
            $scope.invoiceDate = false;
            $scope.invoiceNumber = false;
            $scope.isInvoiceAvailable = true;
            $scope.losIdval = false;
            $scope.pdfData = '';
            $scope.foirAmount = 

            setModifiedData(response);

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
                    var imageJson = {
                            "oHeader":{
                                  "sApplID": "",
                                  "sInstID":user.institutionID,
                                  "sSourceID":"",
                                  "sAppSource":"WEB",
                                  "sReqType":"JSON",
                                  "sCroId":user.username,
                            },
                            'sImgID' : val.sImgID
                        };
                    return RestService.saveToServer('get-image-by-id-base64', imageJson).then(function(data){
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
    };

    function setModifiedData(response){
            $scope.croDecision = response.aCroDec;
            $scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;

            if($scope.objectSet.oCompRes.scoringServiceResponse && $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE){
                $scope.ElgbltyGrid = ( $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.ElgbltyID || "" ) 
                                     +"."
                                     + ($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE.GridID : ($scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] ? $scope.objectSet.oCompRes.scoringServiceResponse.ELIGIBILITY_RESPONSE["RULE-SEQ"] : "" ));
            }

            if($scope.objectSet.oPostIPA && $scope.objectSet.oPostIPA.aAssMdls){
                $scope.assetData = $scope.objectSet.oPostIPA.aAssMdls;
            }else{
                $scope.assetData = $scope.objectSet.oAppReq.oReq.oApplication.aAssetDetail;
            }

            //Fetch application status of selected application 
            var data =  $scope.notifarray;
            _.each(data ,function(value){
                if(value.sRefID ==  $scope.objectSet.oAppReq.sRefID){
                        $scope.applctnstatus = value.sStat;
                }
            });

            if($scope.objectSet.oLosDtls && $scope.objectSet.oLosDtls.sLosID){
                $scope.losIdval = true;
            }

            if($scope.objectSet.oCompRes.multiBureauJsonRespose && $scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED && $scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"]){
                 $scope.pdfData ="data:application/pdf;base64,"+$scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];             
            }

            if($scope.objectSet.aDeDupe){
                 _.each($scope.objectSet.aDeDupe,function(val){
                    $scope.dedupeRefArray.push(val.sRefID);  
                });
            }

            if($scope.objectSet.oCompRes.scoringServiceResponse && $scope.objectSet.oCompRes.scoringServiceResponse['ELIGIBILITY_RESPONSE'] && $scope.objectSet.oCompRes.scoringServiceResponse['ELIGIBILITY_RESPONSE']['FOIR_AMOUNT']){
                $scope.foirAmount = $scope.objectSet.oCompRes.scoringServiceResponse['ELIGIBILITY_RESPONSE']['FOIR_AMOUNT'].toFixed(2);
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
                            'oHeader':{
                                'sAppID':$scope.objectSet.oAppReq.oHeader.sAppID,
                                'sInstID':user.institutionID,
                                'sCroId':user.username,
                                'sAppSource':"WEB",
                                'sReqType':"JSON",
                            },
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
                                    'oHeader':{
                                        'sAppID':$scope.objectSet.oAppReq.oHeader.sAppID,
                                        'sInstID':user.institutionID,
                                        'sCroId':user.username,
                                        'sAppSource':"WEB",
                                        'sReqType':"JSON"
                                    },
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
                            'oHeader':{
                                'sAppID':$scope.objectSet.oAppReq.oHeader.sAppID,
                                'sInstID':user.institutionID,
                                'sAppSource':"WEB",
                                'sReqType':"JSON",
                                'sCroId':user.username
                            },
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
     if(status == "LOS_DISB" &&   $scope.applctnstatus.toUpperCase()=="APPROVED"){ 
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
        			         "sCroId":user.username
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

   /* $scope.invoiceDate = false;
    $scope.invoiceNumber = false;*/
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
                            "sCroId":user.username,
                            "sDealerId":null
                          },
                     "sRefID" : requestObj.oAppReq.sRefID,
                     "sProduct" : "Consumer Durables",
                     "iNoOfRecord" : requestObj.iNoReTry
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

/*app.controller("supportedDocuments",['$scope', 'ImageFeed','$uibModalInstance','$timeout','RestService','notifier',
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

}]),*/

    app.controller('ModalInstanceCtrl', ['$scope','$rootScope','modalFeed',
       '$uibModalInstance','$log','notifier', 
       function($scope, $rootScope,modalFeed,$uibModalInstance,$log,notifier){

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

    app.controller('DeclInstanceCtrl', ['$scope','$rootScope',
       '$uibModalInstance','dclnModelFeed','notifier', 
       function($scope, $rootScope,$uibModalInstance,dclnModelFeed,notifier){ 
           
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

    app.controller('onholdModelCtrl', ['$scope','$rootScope',
       '$uibModalInstance','holdModelFeed','SelectArrays','notifier',
        function($scope, $rootScope,$uibModalInstance,holdModelFeed,SelectArrays,notifier){ 

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
        };

        $scope.Load_Offer = function(NodeID,Obj,index){
            $scope.tabIndex = index;

            for(var i = 0; i < docData.length; i++){
                if(docData[i].ID == NodeID){ 
                    $scope.AvailebleOffers = docData[i].Offers;
                    $scope.ID = NodeID;
                }
            }
        };

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
}).call(this);