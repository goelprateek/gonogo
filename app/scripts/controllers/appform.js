;(function(){

	'use strict';

	var app = angular.module('gonogo');

	app.controller('appFormController', ['$scope','$filter','RestService','UserService','AclService','$log','notifier','$state','sharedService','$uibModal','SelectArrays','$stateParams',
                                function($scope,$filter,RestService,UserService,AclService,$log,notifier,$state,sharedService,$uibModal,SelectArrays,$stateParams){
	var user=UserService.getCurrentUser();
    $scope.can=AclService.can;

    $scope.isUpdating=false; 

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }

    //console.log("Reference ID : "+$stateParams.id);
    

    if(sharedService.getApplicationData())
	{
		$scope.objectSet=sharedService.getApplicationData();
        //console.log("objectSet");
        //console.log($scope.objectSet);

        $scope.referenceID=$scope.objectSet.sRefID;

		sharedService.setApplicationData(null);
	}else{
        $state.go("notification");
        return;
    }

    if(sharedService.getApplicationSource())
	{
		$scope.source=sharedService.getApplicationSource();
        //console.log("source");
        //console.log($scope.source);
		sharedService.setApplicationData(null);
        if($scope.source != "notification"){
            $scope.losIdval = true;
            $scope.utrVal = true;
            $scope.editLosStat = true;
            $scope.invoiceDate = true;
            $scope.invoiceNumber = true;
        }
	}

    //from notification
    $scope.isUpdating = false;
    $scope.addrType = SelectArrays.getAddrType();
    $scope.addr_type = $scope.addrType[1]; 
    $scope.findAddressType = function(orignal,final){
        return (angular.lowercase(orignal) == angular.lowercase(final));
    };

    $scope.selectResidence = SelectArrays.getResidenceTypes();
	//from analytics
	$scope.isImg = true;

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

    $scope.datefilter.date = '';

    if($scope.objectSet.oInvDtls && $scope.objectSet.oInvDtls.dtInv && $scope.objectSet.oInvDtls.sInvNumber){
        var Dateformat = moment($scope.objectSet.oInvDtls.dtInv);
        $scope.datefilter.date = Dateformat._d;
        $scope.invoiceDate = true;
        $scope.invoiceNumber = true;
        $scope.isInvoiceAvailable = false;
    }

    if($scope.objectSet.oAppReq.oReq.oApplicant.sDob){
        $scope.app_form = { 
                pickerDob : moment($scope.objectSet.oAppReq.oReq.oApplicant.sDob,'DDmmYYYY')._d
        };
    }

    if($scope.objectSet.oPostIPA && $scope.objectSet.oPostIPA.aAssMdls){
        $scope.assetData = $scope.objectSet.oPostIPA.aAssMdls;
    }else{
        $scope.assetData = $scope.objectSet.oAppReq.oReq.oApplication.aAssetDetail;
    }

    //Surrogate
    $scope.surrTypeSelected=null;

    $scope.surrogateType=["Banking","Business","Credit Card","Owned House","Owned Car","Salary House"];

    $scope.surrogate=$scope.objectSet.oAppReq.oReq.oApplicant.oSurrogate
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

    //check reason of this variable
    $scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName + "  " + $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName + "  " + $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;

    $scope.croDecision = $scope.objectSet.aCroDec;

    try {
        $scope.pdfData = "data:application/pdf;base64," + $scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];
    } catch (e) {
        $scope.pdfData = '';
    }

    try {
        $scope.foirAmount = $scope.objectSet.oCompRes.scoringServiceResponse['ELIGIBILITY_RESPONSE']['FOIR_AMOUNT'].toFixed(2);
    } catch (e) {
        $scope.foirAmount = '';
    }

    if ($scope.objectSet) {
	    var objArray = _.map(_.pluck($scope.objectSet.aAppImgDtl, 'aImgMap'), function(data) {
	        return data;
	    });

        $scope.bankSurrogateImages=[];
	    $scope.imageDataArray = [];
	    var evidenceData = [];
	    var maindata = [];
	    _.each(_.flatten(objArray), function(val) {
	        if (val.sImgType.indexOf("_EVIDENCE") > -1) {
	            evidenceData.push(val);
	        }
	        maindata.push(val);
	    });

	    _.each(evidenceData, function(val) {
	        var whosEvdnc = val.sImgType.slice(0, -10);
	        _.each(maindata, function(data) {
	            if (data.sImgType == whosEvdnc) {
	                if (!data.evdncArray)
	                    data.evdncArray = [];
	                data.evdncArray.push(val);
	            }
	        });
	    });

	    _.each(maindata, function(val) {
	        return RestService.saveToServer('get-image-by-id-base64', { 'sImgID': val.sImgID,"oHeader":{"sInstID":user.institutionID} }).then(function(data) {
	            if (!_.isUndefined(data) || !_.isNull(data)) {
	                if (!_.isEmpty(data.sByteCode)) {
	                    val["sByteCode"] = "data:image/png;base64," + data.sByteCode;

                        if($scope.surrogate && val.sImgType==="BANK_STATEMENT"){
                            $scope.bankSurrogateImages.push(val)
                        }else{
                            $scope.imageDataArray.push(val); 
                        }
	                }
	            }
	        });
	    });

	    var rejectImgFromServer = [];
	    _.each($scope.imageDataArray, function(val) {
	        if (val.sStat == "Reject") {
	            rejectImgFromServer.push(val);
	        }
	    });
	    $scope.rejectImgFromServer = rejectImgFromServer;
	}

    $scope.toggleForm = function(source) {
    	if(source == 'analytics'){
            var serviceName = sharedService.getAnalyticsServiceName();
            sharedService.setAnalyticsServiceName(serviceName);

            var serviceParm = sharedService.getAnalyticsServiceParm();
            sharedService.setAnalyticsServiceParm(serviceParm);

            $state.go('/analytics');

    		/* $scope.isTableData = false;
       		 $scope.appView = !$scope.appView;*/
    	}else{
    		sharedService.setApplicationData($scope.objectSet);
    		sharedService.setRefID($scope.objectSet.oAppReq.sRefID);
    		sharedService.setApplicationImages($scope.imageDataArray);
    		$state.go('notification');
    	}
    }

    //reinitiate form
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

    $scope.updateForm=function(){
        console.log("updateForm");
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

                $scope.showReinitiateModal("lg",$scope.referenceID,$scope.objectSet,$scope.fieldsUpdated);
            }else{
                $scope.showReinitiateModal("lg",$scope.referenceID,$scope.objectSet);
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

        modalInstance.result.then(function (response) {           
            if(response.isSuccess){
                $scope.objectSet.iNoReTry=$scope.objectSet.iNoReTry +1;
                $scope.showReinitiateStatusModal(response.referenceID);
            }
        });
    };

    $scope.showReinitiateStatusModal = function (refID) {
        //alert('modal baseURL'+baseURL);
        var modalInstance = $uibModal.open({
           animation: $scope.animationsEnabled,
           templateUrl: 'views/modal-reinitiate-status.html',
           controller: 'ReinitiateStatusModalController',
           size: "lg",
           resolve: {
               refID:function(){
                   return refID;
               }
           },
           backdrop  : 'static',
           keyboard  : false
        });
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
                        sKycName:"VOTER-ID",
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

    $scope.showimage = function(obj, isImgFlag, index, editMode) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/templates/modal.html',
            controller: 'supportedDocuments',
            size: 'lg',
            resolve: {
                ImageFeed: function() {
                    var imageData;
                    return imageData = {
                        isImage: isImgFlag,
                        docData: obj,
                        index: index,
                        applicationId: $scope.objectSet.oAppReq.oHeader.sAppID,
                        applicantId: $scope.objectSet.oAppReq.oReq.oApplicant.sApplID,
                        institutionId: user.institutionID,
                        refId: $scope.objectSet.oAppReq.sRefID,
                        editMode: editMode
                    }
                }
            }
        });

        modalInstance.result.then(function(selected) {}, function(array) {
            $log.info($scope.rejectImgFromServer);
            var filter = _.filter(array, function(arr2obj) {
                return arr2obj.sStat == "Reject";
            });
            $scope.rejectImgFromServer = filter;
        });
    };
    //copied
    $scope.saveInvoice = function(invoiceNum,invoiceDate){
          if($scope.objectSet.oAppReq.sRefID!=""){
            if(invoiceNum && invoiceDate ){
               //var dobFormatted=$filter('date')(invoiceDate._d,"dd-MM-yyyy HH:mm:ss"),
               json = {
                       "oHeader":{
                       "sInstID":user.institutionID,
                       "sCroId":user.username,
                       "sAppSource":"WEB"
                       },
                       "sRefID":$scope.objectSet.oAppReq.sRefID,
                       "oInvDtls":{
                       "sInvNumber":invoiceNum,
                       "dtInv":invoiceDate._d.getTime()
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
            sRefID:$scope.referenceID,
            dtDateTime:new Date().getTime()
        };

        RestService.saveToServer('get-post-ipa',JSON.stringify(postIPARequest)).then(function(response){
            if(response){        
                postIPARequest.opostIPA=response;

                RestService.saveToServer("get-pdf-ref",JSON.stringify(postIPARequest)).then(function(response){
                    if(response){
                        $scope.shwPDFModal(response,$scope.referenceID,false);
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
    // $scope.negPinVerified=false;

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

    var statusCheckedCounter=0;
    $scope.showProgress=true;
    var statusPoller = $interval(function(){
        statusCheckedCounter++;

        if(statusCheckedCounter===40){
            $interval.cancel(statusPoller);
            $scope.showProgress=false;
        }

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
                        if(resp.oIntrmStat.oCibilResult.sMsg == "COMPLETED")                
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
                        $scope.showProgress=false;
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

}).call(this)