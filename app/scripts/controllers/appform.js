;(function(){

	'use strict';

	var app = angular.module('gonogo');

	app.controller('appFormController', ['$scope','$filter','RestService','UserService','AclService','$log','notifier','$state','sharedService','$uibModal','SelectArrays',
                                function($scope,$filter,RestService,UserService,AclService,$log,notifier,$state,sharedService,$uibModal,SelectArrays){
	var user=UserService.getCurrentUser();
    $scope.can=AclService.can;

    if(user.id){
        $scope.$emit('onSuccessfulLogin');
    }
    
    if(sharedService.getApplicationData())
	{
		$scope.objectSet=sharedService.getApplicationData();
		sharedService.setApplicationData(null);
	}

	 if(sharedService.getApplicationSource())
	{
		$scope.source=sharedService.getApplicationSource();
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
    }                               
    $scope.selectResidence = SelectArrays.getResidenceTypes();
	//from analytics
	$scope.isImg = true;

	if ($scope.objectSet.oAppReq.oReq.oApplicant.sDob && $scope.objectSet.oAppReq.oReq.oApplicant.sDob != "") {
        $scope.dob = $scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0, 2) + "/" + $scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2, 4) + "/" + $scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4);
        var dateOfBirth = new Date();
        dateOfBirth.setFullYear(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4)));
        dateOfBirth.setDate(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0, 2)));
        dateOfBirth.setMonth((parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2, 4)) - 1));

        $scope.app_form = { pickerDob: dateOfBirth };

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
	        return RestService.saveToServer('get-image-by-id-base64', { 'sImgID': val.sImgID }).then(function(data) {
	            if (!_.isUndefined(data) || !_.isNull(data)) {
	                if (!_.isEmpty(data.sByteCode)) {
	                    val["sByteCode"] = "data:image/png;base64," + data.sByteCode;
	                    $scope.imageDataArray.push(val);
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
    		$state.go('/hdbfsnotification');

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
                $scope.showReinitiateStatusModal($scope.refID);
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
            }
    //copied

   
}]);



}).call(this)