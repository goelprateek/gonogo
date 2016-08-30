;(function(){
	
	'use strict';
	
	var app = angular.module('gonogo.analytics' ,['gonogo-directives','dndLists','ui.slimscroll','ngMaterial']);

    app.factory("AnalyticsObject",function(){
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
    }),

    app.factory("ReportStorage",function(){
        var reportConfig ;
        return reportConfig = {
              "oColumns": [
                {
                  "sCloumnKey": "",
                  "sColDispName": "",
                  "sColIndex": 0,
                  "bViewable": false,
                  "bDownloadable": false
                }],
              "oReports": [
                {
                  "oHeader": {
                    "sAppID": null,
                    "sInstID": "",
                    "sSourceID": null,
                    "sAppSource": null,
                    "sReqType": null,
                    "dtSubmit": "",
                    "sDsaId": "",
                    "sCroId": null,
                    "sDealerId": null
                  },
                  "sReportId": "",
                  "aProductType": [
                    "Consumer Durables"
                  ],
                  "aFlatConfig": {
                    "fileHeader": "Phone1,Phone2,Phone2,Phone3,Date",
                    "mHeaderMap": {
                      "0": {
                        "sCloumnKey": "",
                        "sColDispName": "",
                        "sColIndex": 0,
                        "bViewable": false,
                        "bDownloadable": false
                      }
                    },
                    "sReportName": null,
                    "sReportType": null,
                    "sReportFomat": null,
                    "sHeader": null,
                    "sSeperator": ","
                  },
                  "sBranchId": null,
                  "sUserId": "",
                  "oPaggination": {
                    "iPageId": 1,
                    "iLimit": 1,
                    "iSkip": 0
                  }
                },
               ]
              }
    }), 
	
    app.controller('AnalyticsController',['$scope','notifier',  '$timeout',
                                          'RestService','$filter','APP_CONST', '$uibModal','UserService','$log','AnalyticsObject','SelectArrays','AclService',
                                            function($scope, notifier ,  $timeout,
                                                RestService,$filter,APP_CONST,$uibModal,UserService,$log,AnalyticsObject,SelectArrays,AclService) {


		var user = UserService.getCurrentUser();
		
        $scope.can=AclService.can;
		$scope.objectSet =  AnalyticsObject.dummy;
		$scope.isImg = true;
        $scope.dataSourceCol = [];
        $scope.losIdval = true;
        $scope.utrVal = true;
        $scope.editLosStat = true;
        $scope.invoiceDate = true;
        $scope.invoiceNumber = true;
        $scope.copydataSourceCol =[];

        $scope.isSearchable = 1;
        $scope.dateRanger = 0;

        $scope.toggleSearch = function(){
            if($scope.dateRanger){
               $scope.dateRanger = !$scope.dateRanger; 
            }
            $scope.isSearchable = 1;   
            
        }
        $scope.toggleDatepicker = function($event){
            
            $scope.datefilter.date.startDate = undefined;
            $scope.datefilter.date.endDate = undefined;
            
            if($scope.isSearchable){
                $scope.isSearchable = !$scope.isSearchable; 
            }
            $scope.dateRanger = 1;
            angular.element("#daterange").trigger("click");

                   
        }
            
        $scope.datefilter =  {
            date : {
                startDate: null,
                endDate: moment()        
            },
            opts: {
                min:moment().subtract(1,'month'),
                max: moment().format('YYYY-MM-DD'), 
                opens : "center",
                linkedCalendars:true,
                autoUpdateInput: true,
                autoApply:true,
                applyClass: 'btn-primary',
                alwaysShowCalendars : true,
                parentEl:"daterange",
                isCustomDate: function(data){
                    return '';
                },
                locale: {
                    separator : " - ",
                    applyLabel: "Apply",
                    fromLabel: "From",
                    format: "YYYY-MM-DD",
                    toLabel: "To",
                    cancelLabel: 'Cancel',
                    customRangeLabel: 'Custom range',
                    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    firstDay: 1
                }, 
                ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')]
                },
                eventHandlers: {
                    "apply.daterangepicker" : function(ev, picker){
                        
                        var startDate = picker.startDate,
                            endDate = picker.endDate;
                            var filteredData =  _.filter($scope.copydataSourceCol , function(item){
                                var itemDate = moment($filter('date')(item.date, "yyyy-MM-dd"),"YYYY-MM-DD");
                                return itemDate.isBetween(startDate,endDate,'hours','[]')
                            });
                            
                            console.log(filteredData.length);

                       return $scope.drawTablularData(filteredData);


                    },
                    'show.daterangepicker' : function(ev , picker){
                        $scope.datefilter.date.startDate = undefined;
                        $scope.datefilter.date.endDate = undefined;
                        $scope.drawTablularData($scope.copydataSourceCol);
                    },

                    'hide.daterangepicker': function(ev,picker){
                       
                    },
                    'cancel.daterangepicker':function(ev,picker){
                        console.log('cancel.daterangepicker');    
                    }
                }   
            }
        };

       	$scope.findAddressType = function(orignal,final){
    		return (angular.lowercase(orignal) == angular.lowercase(final));
    	}	

    	$scope.showimage = function(obj,isImgFlag,index,editMode){
                    
            var modalInstance = $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: 'views/templates/modal.html',
                  controller: 'imagesCtr',
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

            modalInstance.result.then(function (selected) {}, function (array) {
                $log.info($scope.rejectImgFromServer);
                 var filter = _.filter(array,function(arr2obj){
                    return arr2obj.sStat == "Reject";
                });
                $scope.rejectImgFromServer = filter;
            });
        } 

        $scope.chartObj ;
		var json = {'sInstID':user.institutionID,'oCriteria':{"oHierarchy":user.hierarchy,"aProducts":user.getProductNames()}};
		RestService.saveToServer("stack-graph",json).then(function(data){
            $scope.chartOptions = data;
    	});

		$scope.reportDownload = function(){
			
			var _data = {
					'sInstId': user.institutionID,
					'sReportType': 'Credit Report',
					'sProductType':'Consumer Durables',
					'sReportCycle': 'MTD'
			}
			
			RestService.getStreamFromServer(APP_CONST.getConst('BASE_URL_GNG')+"report/download-credit",_data).then(function(data){
				var blob = new Blob([data], { type: "application/zip" });
				var downloadUrl = window.URL.createObjectURL(blob);
				var a = document.createElement("a");
				 a.href = downloadUrl;
				 a.download = new Date().getTime()+".zip";
				 document.body.appendChild(a);
			        a.click();
			});
		};

		// custom report modal
		$scope.openCustomReportDesigner = function(){
            var _serviceinput = {                  
                        "oHeader" : {                 
                                    "sAppID" :"",     
                                    "sInstID" :"4019",    
                                    "sSourceID" :"",  
                                    "sAppSource" :"WEB", 
                                    "sReqType":"",    
                                    "dtSubmit":"",    
                                    "sDsaId" :"",     
                                 "sCroId":"",      
                                 "sDealerId":""    
                                  },                
                         "sBranchId" : "",             
                         "sUserId" :"",                
                         "aProductType" :["CONSUMER DURABLE"],              
                         "dtAccessDate":""             
                        } ;

			var modalInstance = $uibModal.open({
							      templateUrl: 'views/templates/report-modal.html',
							      controller: 'CustomReportController',
							      size: 'lg',
                                  windowClass:"report-modal-popup"
							    });	

			modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};

	    $scope.appView = false;
		$scope.isTableData = true;
		
		$scope.toggleView = function(){
			
			$scope.isTableData = !$scope.isTableData;
			
			if(!$scope.isTableData){
				var json = {'sInstID':user.institutionID,'iSkip':"0",'iLimit':"0",
        'oCriteria':{"oHierarchy":user.hierarchy,"aProducts":user.getProductNames()}};
				RestService.saveToServer('score-log',json).then(function(data){
			     if(data){
                    $scope.copydataSourceCol = data;
		          	$scope.drawTablularData(data);
		          };
			    });
			}
		};

        $scope.drawTablularData = function(data){
              return  $scope.dataSourceCol = data,
                          $scope.stores = $scope.dataSourceCol
                          , $scope.searchKeywords = "", 

                          $scope.filteredStores = [],

                          $scope.row = "", 

                          $scope.select = function(page) {
                              var end, start;
                              return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.dataSourceCol = $scope.filteredStores.slice(start, end);
                          }, 

                          $scope.onFilterChange = function() {
                              return $scope.select(1), $scope.currentPage = 1, $scope.row = "";

                          }, $scope.onNumPerPageChange = function(number) {
                              $scope.numPerPage = number;
                              return $scope.select(1), $scope.currentPage = 1;

                          }, $scope.onOrderChange = function() {

                              return $scope.select(1), $scope.currentPage = 1;

                          }, $scope.search = function(value) {
                              return $scope.filteredStores = $filter("filter")($scope.stores, value), $scope.onFilterChange();

                          },$scope.order = function(rowName) {

                              return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.filteredStores, rowName), $scope.onOrderChange()) : void 0;

                          }, $scope.numPerPageOpt = [20,30,50],

                          $scope.numPerPage = $scope.numPerPageOpt[0], 

                          $scope.currentPage = 1, 

                          $scope.dataSourceCol = [],

                          ($scope.init = function() {
                              return $scope.search(), $scope.select($scope.currentPage);
                          })();

        }


		$scope.viewApplication = function(CustID,status){
            $scope.showReinitiate=false;
    		$scope.addrType = SelectArrays.getAddrType();
    		$scope.addr_type = $scope.addrType[1]; 
    		$scope.appView = true;
    		var URL='application-data';
    		var json ={'sRefID':CustID};
    		RestService.saveToServer(URL,json).then(function(response){
                if(response)
    				$scope.objectSet = response;
    			else
    			$scope.objectSet = NotificationObject.dummy();
    			
                $scope.Picked = CustID;

                if($scope.objectSet.oAppReq.oReq.oApplicant.sDob && $scope.objectSet.oAppReq.oReq.oApplicant.sDob!=""){
                    $scope.dob = $scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0,2)+"/"+$scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2,4)+"/"+$scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4);
                    var dateOfBirth=new Date();
                    dateOfBirth.setFullYear(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(4)));
                    dateOfBirth.setDate(parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(0,2)));
                    dateOfBirth.setMonth((parseInt($scope.objectSet.oAppReq.oReq.oApplicant.sDob.slice(2,4))-1));
                    
                    $scope.app_form={pickerDob:dateOfBirth};
            
                }

    			$scope.showrefid = "true";
    			$scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;
    			var data = 	$scope.dataSourceCol;
    			_.each(data,function(value,key){
                    if(value.applicationId ==  $scope.objectSet.oAppReq.sRefID){
    					$scope.applctnstatus = value.applicationStatus;
                    }
    			});
    			$scope.croDecision = response.aCroDec;
               
                try{
                     $scope.pdfData ="data:application/pdf;base64,"+$scope.objectSet.oCompRes.multiBureauJsonRespose.FINISHED[0]["PDF REPORT"];             
                }catch(e){
                     $scope.pdfData = '';
                }

                try{
                    $scope.foirAmount = $scope.objectSet.oCompRes.scoringServiceResponse['ELIGIBILITY_RESPONSE']['FOIR_AMOUNT'].toFixed(2);
                }catch(e){
                     $scope.foirAmount = '';
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

		$scope.toggleForm = function(){
			$scope.isTableData = false;
			$scope.appView = !$scope.appView;
		}
	}]);

app.controller("imagesCtr",['$scope', 'ImageFeed','$uibModalInstance','$timeout','RestService',
    function($scope,ImageFeed,$uibModalInstance,$timeout,RestService){
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

    $scope.approveImg = function(index){return false;}

    $scope.rejectImg = function(index){return false;}

    $scope.closeModal = function(){
          $uibModalInstance.dismiss($scope.slides);
    };
}]);

app.controller("CustomReportController", [ '$scope','$log','notifier','$uibModalInstance' ,'RestService','UserService' ,'ReportStorage','APP_CONST',function($scope,$log,notifier,$uibModalInstance,RestService,UserService,ReportStorage,APP_CONST){

        var user = UserService.getCurrentUser();
        $scope.preview = 0;
        $scope.systemPropertyList = [];
        $scope.selectedPropertyList = [];
        $scope.reportId ;


        $scope.reportdate = {
            date : {
                startDate : null,
                endDate : moment()
            },
            opts: {
                min:moment().subtract(1,'month'),
                max: moment().format('YYYY-MM-DD'), 
                opens : "center",
                linkedCalendars:true,
                autoUpdateInput: true,
                autoApply:true,
                applyClass: 'btn-primary',
                alwaysShowCalendars : true,
                isCustomDate: function(data){
                    return '';
                },
                locale: {
                    separator : " - ",
                    applyLabel: "Apply",
                    fromLabel: "From",
                    format: "YYYY-MM-DD",
                    toLabel: "To",
                    cancelLabel: 'Cancel',
                    customRangeLabel: 'Custom range',
                    firstDay: 1
                }, 
                
                eventHandlers: {
                    "apply.daterangepicker" : function(ev, picker){
                        

                    },
                    'show.daterangepicker' : function(ev , picker){

                    },

                    'hide.daterangepicker': function(ev,picker){
                       
                    },
                    'cancel.daterangepicker':function(ev,picker){

                    }
                }   
            }
        }

        $scope.$watch('reportName',function(newVal,oldval){
            if(!_.isUndefined(newVal) && newVal.length === 0){
                $scope.models = undefined;
                $scope.preview = 0;
                $scope.header = 0;
                $scope.noResults = 0;
                $scope.selectedPropertyList = [];
                $scope.models = undefined;
            }
        },true);

         
        $scope.$watch('models[1].items',function(newVal,oldVal){

            if(newVal == oldVal) return ;

            if(newVal && oldVal){
                $scope.preview = 1;
                $scope.header = 0;
            }
            
        },true);

        $scope.addnewReport = function(){
            
            var serviceInput = {
                "oHeader":{
                    "sInstID" : user.institutionID,
                     "sAppSource":"",
                     "dtSubmit":moment(),

                },
                "sUserId":user.username,
                "aProductType":["Consumer Durables"],
                "sReportId": "",
                "sReportName":$scope.reportName,
                "sReportCategory":"",
                "aFlatConfig":{
                    "mHeaderMap":{},
                    "sReportFomat":"json"
                },
                "sBranchId":"",
                "oPaggination":{
                    "iPageId":0,
                    "iLimit":5,
                    "iSkip":0
                }

              }

            RestService.saveToServer("/report/save-default-report",serviceInput).then(function(response){

                 if(response){
                        $scope.reportId = response.sReportId;
                        _.map(response.aFlatConfig.mHeaderMap,function(item){
                            $scope.selectedPropertyList.push(item);
                        })

                        $scope.systemPropertyList = response.oUnSelectedColumns;

                        
                    }

                    $scope.models = [
                        {listName: "Available", items: $scope.systemPropertyList, dragging: false},
                        {listName: "Selected", items: $scope.selectedPropertyList, dragging: false}
                    ];
                
            })
        }

        $scope.getReportConfiguration = function(viewValue){
            var searchObj = {
                "oHeader": {
                    "sInstID": user.institutionID,
                },
                "sReportName":viewValue
            }
            return RestService.saveToServer('report/search-report-name',searchObj).then(function(data){
                return data;
                
            });
        }

        
        $scope.selectedReport = function($item, $model, $label, $event){
            $scope.reportId = $item.reportId;
            var _serviceinput = {
                "oHeader": {
                    "sInstID": user.institutionID
                 },
                 "sUserId":user.username,
                 "sReportId":$item.reportId

            };

            RestService.saveToServer('report/fetch-report-config',_serviceinput).then(function(data){
                    
                    if(data){
                        
                        _.map(data.aFlatConfig.mHeaderMap,function(item){
                            $scope.selectedPropertyList.push(item);
                        })
                        
                        $scope.systemPropertyList = data.oUnSelectedColumns;

                        
                    }

                    $scope.models = [
                        {listName: "Available", items: $scope.systemPropertyList, dragging: false},
                        {listName: "Selected", items: $scope.selectedPropertyList, dragging: false}
                    ];
            });
        }

	    $scope.getSelectedItemsIncluding = function(list, item) {
	      item.selected = true;
	      return list.items.filter(function(item) { return item.selected; });
	    };

	    $scope.onDragstart = function(list, event) {
	       list.dragging = true;
	       if (event.dataTransfer.setDragImage) {
	       }
	    };

	    $scope.onDrop = function(list, items, index) {

           var viewCount = _.countBy(list.items,function(items){
                return items.bViewable;
           })
                
            
	      
          angular.forEach(items, function(item) {
             item.selected = false;

             if(viewCount < 10){
                item.bViewable = true;
             }else{
                item.bViewable = false;
             }
             
          });

	      list.items = list.items.slice(0, index)
	                  .concat(items)
	                  .concat(list.items.slice(index));
	      return true;
	    }

	    $scope.onMoved = function(list) {
	      list.items = list.items.filter(function(item) { return !item.selected; });
	    };

		$scope.saveConfiguration = function () {

            var selectedColumns = {};
            _.each($scope.models[1].items, function(value,key){
                selectedColumns[key] = value;
            })

            var serviceInput = {
                "oHeader":{
                    "sInstID" : user.institutionID,
                     "sAppSource":"",
                     "dtSubmit":moment(),

                },
                "sUserId":user.username,
                "aProductType":["Consumer Durables"],
                "sReportId": $scope.reportId,
                "sReportName":$scope.reportName,
                "sReportCategory":"",
                "aFlatConfig":{
                    "mHeaderMap":selectedColumns,
                    "sReportFomat":"csv"
                },
                "sBranchId":"",
                "oPaggination":{
                    "iPageId":0,
                    "iLimit":5,
                    "iSkip":0
                }

              }


              RestService.saveToServer("/report/save-custom-report",serviceInput).then(function(data){
                    if(data){
                        notifier.logSuccess("Report saves successfully ");
                    }
              })
	    	
	  	};

        
        

        $scope.dismiss = function(){
            $uibModalInstance.dismiss('close');
        }

	  	$scope.previewConfiguration = function () {
            $scope.previewLoading = true;

            var selectedColumns = {};
            _.each($scope.models[1].items, function(value,key){
                selectedColumns[key] = value;
            })
	    	  
              var serviceInput = {
                "oHeader":{
                    "sInstID" : user.institutionID,
                     "sAppSource":"",
                     "dtSubmit":moment(),

                },
                "sUserId":user.username,
                "aProductType":["Consumer Durables"],
                "sReportId":"",
                "sReportName":"",
                "sReportCategory":"",
                "aFlatConfig":{
                    "mHeaderMap":selectedColumns,
                    "sReportFomat":"json"
                },
                "sBranchId":"",
                "oPaggination":{
                    "iPageId":0,
                    "iLimit":5,
                    "iSkip":0
                }

              }

              RestService.saveToServer("/report/preview-custom-report",serviceInput).then(function(data){

                $scope.header = _.keys(data.oData[0]);
                $scope.values = [];

                _.each(data.oData,function(value,key){
                    $scope.values.push(_.values(value));
                });

              }).finally(function(){
                console.log("calling finally of preview request");
                $scope.previewLoading = false;
              });

              //$uibModalInstance.dismiss('cancel');
	  	};

        $scope.downloadCustomReport = function(){

            var selectedColumns = {};
            _.each($scope.models[1].items, function(value,key){
                selectedColumns[key] = value;
            })

            var serviceInput = {
                "oHeader":{
                    "sInstID" : user.institutionID,
                     "sAppSource":"",
                     "dtSubmit":moment(),

                },
                "sUserId":user.username,
                "aProductType":["Consumer Durables"],
                "sReportId":$scope.reportId,
                "sReportName":$scope.reportName,
                "sReportCategory":"",
                "aFlatConfig":{
                    "mHeaderMap":selectedColumns,
                    "sReportFomat":"csv"
                },
                "sBranchId":"",
                "oPaggination":{
                    "iPageId":0,
                    "iLimit":5,
                    "iSkip":0
                }

              }

            RestService.getStreamFromServer(APP_CONST.getConst('BASE_URL_GNG')+"report/download-zip-report",serviceInput).then(function(data){
                console.log(data);
                var blob = new Blob([data], { type: "application/zip" });
                var downloadUrl = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                 a.href = downloadUrl;
                 a.download = new Date().getTime()+".zip";
                 document.body.appendChild(a);
                    a.click();
            });

        }


	}]);

}).call(this)
