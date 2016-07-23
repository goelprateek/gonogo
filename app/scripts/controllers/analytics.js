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
	

    app.controller('AnalyticsController',['$scope','$rootScope','Rules','Score', 'Policy','Decision', '$http', '$timeout',
                                          'RestService','$filter','APP_CONST', '$uibModal','UserService','$log','AnalyticsObject','SelectArrays',
                                            function($scope,$rootScope, Rules,Score,Policy,Decision, $http, $timeout,
                                                RestService,$filter,APP_CONST,$uibModal,UserService,$log,AnalyticsObject,SelectArrays) {


		// chart functionality
		var user=UserService.getCurrentUser();
		var object  = AnalyticsObject.dummy;
		$scope.objectSet =  object; 
		$scope.isImg = true;
		$scope.findAddressType = function(orignal,final){
    		return (angular.lowercase(orignal) == angular.lowercase(final));
    	}	


        $scope.findHeight = function(){
            
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
                                institutionId : $scope.InstitutionID,
                                refId : $scope.objectSet.oAppReq.sRefID,
                                editMode : editMode
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

                        });
    } 

		var json = {'sInstID':user.institutionID};

		RestService.saveToServer("stack-graph",json).then(function(data){
			$scope.orignalData = data;
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
							      animation: true,
							      templateUrl: 'views/templates/report-modal.html',
							      controller: 'CustomReportController',
							      size: 'lg',
                                  resolve:{
                                    data : function(){
                                        return RestService.saveToServer('report/reporting-Dimension',_serviceinput).then(function(data){
                                            return data;
                                        })
                                    }
                                   }
							    });	

			modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};


		
	    $scope.appView = false;
		$scope.isTableData = true,

		$scope.dataSourceCol = [],
		$scope.toggleView = function(){
			
			$scope.isTableData = !$scope.isTableData;
			
			if($scope.isTableData == false){
				var json = {'sInstID':user.institutionID,'iSkip':"0",'iLimit':"100"};
				RestService.saveToServer('score-log',json).then(function(data){
				 if(data){
			          	data.sort(SortByDate);
							function SortByDate(x,y) {
								return ((x.date == y.date) ? 0 : ((x.date < y.date) ? 1 : -1 ));
							}
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

			              }, $scope.order = function(rowName) {

			                  return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.filteredStores, rowName), $scope.onOrderChange()) : void 0;

			              }, $scope.numPerPageOpt = [20,30,50],

			              $scope.numPerPage = $scope.numPerPageOpt[0], 

			              $scope.currentPage = 1, 

			              $scope.dataSourceCol = [],

			              ($scope.init = function() {
			                  return $scope.search(), $scope.select($scope.currentPage) , $scope.order("applicationId");
			              })();

			          };
			});
			}
		}
		
		

		//TODO stack bar click event 
		 $scope.updateData = function (parameter) {
			 parameter.sort(SortByDate);
				function SortByDate(x,y) {
					return ((x.date == y.date) ? 0 : ((x.date < y.date) ? 1 : -1 ));
				}
		       $scope.isTableData = false;
		       $scope.stores = parameter;
		        var data = $scope.stores;
		       if(data){
		          	//sort data in chronological order
		          	data.sort(SortByDate);
						function SortByDate(x,y) {
							return ((x.date == y.date) ? 0 : ((x.date < y.date) ? 1 : -1 ));
						}
		          	return  $scope.dataSourceCol = data,
		              $scope.stores = $scope.dataSourceCol 
		            ,$scope.searchKeywords = "", 

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

		              }, $scope.order = function(rowName) {

		                  return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.filteredStores, rowName), $scope.onOrderChange()) : void 0;

		              }, $scope.numPerPageOpt = [20,30,50],

		              $scope.numPerPage = $scope.numPerPageOpt[0], 

		              $scope.currentPage = 1, 

		              $scope.dataSourceCol = [],

		              ($scope.init = function() {
		                  return $scope.search(), $scope.select($scope.currentPage) , $scope.order("applicationId");
		              })();

		          };
		   };
		   
		
		$scope.viewApplication = function(CustID,status){
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
                
                $scope.objectSet.oAppReq.oReq.oApplicant.sDob=dateOfBirth;
            }

			$scope.showrefid = "true";
			$scope.name = $scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sFirstName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sMiddleName+"  "+$scope.objectSet.oAppReq.oReq.oApplicant.oApplName.sLastName;
			var data = 	$scope.notifarray;
			for (var j in data)
			{if(data[j].sRefID ==  $scope.objectSet.oAppReq.sRefID){
					$scope.applctnstatus = data[j].sStat;}
			}
			$scope.croDecision = response.aCroDec;
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
 
		}

		
		$scope.back = function(){
			$scope.isTableData = false;
			$scope.appView = !$scope.appView;
		}

		$scope.dashboardType = function(value) {
			if(value === 'Requests Summary')
			{	$('#Loader').show();
				$("#Simulator_container, #portfolio_container, #ytd_container").hide();
				$("#dashboard_container, #mtd_container").show();
				$("#chaid-container").hide();
				$("#scorecard_container,#matrix-container, #matrixbtn").hide();
				$('#Loader').hide(3000); 
				//for hiding new element like export and back button
			}
			else if(value=== 'Score Logs')
			{
				$('html,body').animate({
					scrollTop: $("#second_row").offset().top},
				'slow');
				getReportData(0,100);
				$("#Simulator_container, #mtd_container, #portfolio_container").hide();
				$("#dashboard_container, #ytd_container").show();
				$("#chaid-container, #matrix-container, #matrixbtn").hide();
				$("#scorecard_container").hide();
				$rootScope.tabledata=[];
			}
			else if(value=== 'Characteristic Analysis Performance'){ 
				$('#Loader').show();
			
				$('html,body').animate({
					scrollTop: $("#second_row").offset().top},
				'slow');
				
			$("#chaid-container").show();
			$("#Simulator_container, #matrix-container, #matrixbtn").hide();    
			$("#policy-container").hide();  
			$("#dashboard_container").show();
			$("#mtd_container").hide();
			$(" #portfolio_container").hide();
			$(" #ytd_container,#scorecard_container").hide();
			$('#Loader').hide(3000);
			}

			else if(value === 'portfolio')//check out value for portfolio
			{  $('#Loader').show();
			$('html,body').animate({
				scrollTop: $("#second_row").offset().top},
			'slow');
			$("#Simulator_container, #mtd_container, #ytd_container, #scorecard_container").hide();
			
            $("#chaid-container, #matrix-container, #matrixbtn").hide();
			$("#dashboard_container, #portfolio_container").show();
			$('#Loader').hide(3000);
			
			}else if(value === 'Score Card Performance'){
				$('html,body').animate({
					scrollTop: $("#second_row").offset().top},
				'slow');
				$('#Loader').show();
				$("#scorecard_container").show();
				$("#Simulator_container,#matrix-container, #matrixbtn").hide();    
				$("#policy-container").hide();  
				$(" #mtd_container").hide();
				$(" #portfolio_container").hide();
				$(" #ytd_container, #matrixbtn").hide();
				$("#chaid-container").hide();
				$('#Loader').hide(3000);
			}else if(value === 'matrix'){
				
				$('#Loader').show();
			
				$('html,body').animate({
					scrollTop: $("#second_row").offset().top},
			'slow');

			$("#matrix-container, #matrixbtn").show();
			$scope.Matrixcolor = "#F7931D";
			$scope.arr = fltrlist[2]["arr"];
			$scope.rate=true;
			$scope.createColumn($scope.arr,$scope.Matrixcolor,"report","decision_matrix");
			$("#Simulator_container,#scorecard_container").hide();    
			$("#policy-container").hide();  
			$(" #mtd_container").hide();
			$(" #portfolio_container").hide();
			$(" #ytd_container").hide();
			$("#chaid-container").hide();
			$('#Loader').hide(3000);
			}
				}
		
		
                	if(typeof user.institutionID != 'undefined'){
                		
                		$rootScope.tabledata =[];
                		$scope.type = "mtd";
                		var URL ="http://localhost:8080/GoNoGo";
                		var baseUrl="http://localhost:8080//AppScoringV2Git/api/ScoringV3/";
                		$rootScope.template ="analytics";
                		$scope.PcriteriaList = [];
                		$scope.AggrList=[];
                		$scope.reportList=[];
                		var  itemcount = 0,error, Catcount = 0, plancount = 0, idcount = 0, ids, flag=0, startAt=0, endOn=0, curr=0, current=0;
                		$scope.category_list = [{value:"Select Category"}];
                		$scope.attribute_list = [{value:"Select Attribute"}];
                		$scope.field_list = [{value:"Select Field"}];
                		var ilist= [
                		            {value: 'Select',text: 'Select IFF Field'},
                		            {value: '1',text: '1'},{value: ' 2',text: '2'},
                		            {value: '3',text: '3'},{value: '4',text: '4'},
                		            {value: '5',text: '5'}];

                		var clist=[
                		           {value: 'Select',text: 'Select IFF Field'},
                		           {value: '1',text: 'AccountList~paymentFrequency'}, 		 
                		           {value: ' 2',text: 'employmentList~dateReported'},
                		           {value: '3',text: 'accountList~accountType'},
                		           {value: '4',text: 'addressList~dateReported'},
                		           {value: '5',text: 'enquiryList~enquiryAmount'},
                		           {value: '6',text: 'accountList~cashLimit'},
                		           {value: '7',text: 'phoneList~telephoneNumber'},
                		           {value: '8',text: 'employmentList~accountType'},
                		           {value: '9',text: 'name~name3'},
                		           {value: '10',text: 'employmentList~occupationCode'},
                		           {value: '11',text: 'scorelist~score'},
                		           {value: '12',text: 'scoreList~scoreName'},
                		           {value: '13',text: 'addressList~pinCode'},
                		           {value: '14',text: 'accountList~dateClosed'},
                		           {value: '15',text: 'accountList~ownershipIndicator'}
                		           ];
                		var calist=[
                		            {value: 'Select',text: 'Select IFF Field'},
                		            {value: '1',text: 'rrpTotalOutstandingProdWise~BUSINESSLOAN-GENERAL'}, 		 
                		            {value: ' 2',text: 'rrpDpdBucket90Plus1MonthProdWise~TELCO-LANDLINE'},
                		            {value: '3',text: 'rrpDpdBucket90Plus3MonthProdWise~UNSECURED'},
                		            {value: '4',text: 'rrpDpdBucket121150ProdWise~HOUSING LOAN'},
                		            {value: '5',text: ' rrpLiveTradesCountProdWise~PERSONAL LOAN'},
                		            {value: ' 6',text: 'rrpDpdBucket30Plus6MonthProdWise~BUSINESS NON-FUNDED CREDIT FACILITY-PRIORITY SECTOR-AGRICULTURE  '},
                		            {value: ' 7',text: 'rrpTotInqsInLastOneMonth'},
                		            {value: ' 8',text: 'rrpDpdBucket30Plus3MonthProdWise~INDICATIVE REPORT'},
                		            {value: ' 9',text: 'rrpDpdBucket145ProdWise~LEASING'},
                		            {value: ' 10',text: 'rrpDpdBucket90Plus3MonthProdWise~OVERDRAFT'},
                		            {value: ' 11',text: 'rrpDpdBucket90Plus6MonthProdWise~CONSUMER DISCLOSURE REPORT'},
                		            {value: ' 12',text: 'rrpDpdBucket121150ProdWise~EDUCATION LOAN'},
                		            {value: ' 13',text: 'rrpDpdBucket90Plus6MonthProdWise~VB OLM RETRIEVAL SERVICE'},
                		            {value: ' 14',text: 'rrpDpdBucket3160ProdWise~OTHER'},
                		            {value: ' 15',text: 'rrpDpdBucket30Plus3MonthProdWise~BUSINESS NON-FUNDED CREDIT FACILITY-PRIORITY SECTOR-AGRICULTUR'}
                		            ];

                		// to store data temporary
                		var dataset ={'master': []}; 
                		$scope.CatArray = dataset.master;
                		$scope.WeightValueArray = [1,2,3,4,5];
                		$scope.tableList =[];
                		var categoryFlag=false, attributeFlag=false, FTypes=[], Fname=[], Dname=[];
                		var pclick=0,version=1;
                		var sclick=0;  
//	                                    		console.log("sclick :"+sclick+"pclick:  "+pclick);

                		$scope.policyNameList = [
                		                         { id:'select', label: 'Select Base'},
                		                         { id:'policy', label: 'Credit Policy'}, 		 
                		                         { id:'Demo 1', label: 'Credit Rules'}, 		 
                		                         { id:'Demo 2', label: 'Score Table'}];
                		$scope.selected = $scope.policyNameList[0];	

                		var creditPolicyList = [
                		                        {value:'Select Policy',text: 'Select Policy'},
                		                        {value:'Demo 1',text: 'Policy 1'}, 		 
                		                        {value:'Demo 2',text: 'Policy 2'}];

                		var creditRuleList = [
                		                      {value:'Select Rule',text: 'Select Rule'},
                		                      {value: 'Test 1',text: 'Test 1'}, 		 
                		                      {value: 'Test 2',text: 'Test 2'}, 		 
                		                      {value: 'Test 3',text: 'Test 3'}];

                		var creditScoreList = [
                		                       { value: 'Update Score ',text: 'Select Score'},
                		                       { value: '1001',text: 'Salaried'}, 		 
                		                       {  value: '1002',text: 'Self Employed'}];

                		$scope.policyList = [{
                			"PolicyID" : 1,
                			"name" : "Demo 1",
                			"priority" : "10",
                			"status" : "Approved",
                			"createdby" : "Ankur Handa",
                			"time" : "Wed Sep 30 10:59:29 IST 2015",
                			"PList": [{'value':'Car Loan'},{'value':'Credit Card'}],
                			"AList": [{'value':'QDE'},{'value':'ADE'}],
                			"valid": {"val1":"29:10:2015","val2":"31:11:2015"},
                			"CList": [{"val1":"","exp1":"","fieldname":"CUST_TYPE","displayname":"CUST_TYPE","exp2":"is","val2":"SE","operator":"&&"},
                			          {"val1":"","exp1":"","fieldname":"LOAN_AMOUNT","displayname":"LOAN_AMOUNT","exp2":">","val2":"2500000","operator":""}],
                			          "Table": 1001,
                			          "DRule": 11,
                			          "AggrList":[{'key':"Income",'value':'Sum off'},{'key':"TurnOver",'value':'Multiply off'},{'key':"EMI",'value':'Avg Off'}]
                		},{
                			"PolicyID" : 2,
                			"name" : "Demo 2",
                			"priority" : "11",
                			"status" : "Pending",
                			"createdby" : "Ankur Handa",
                			"time" : "Wed Sep 30 10:59:29 IST 2015",
                			"PList": [{'value':'Gold Loan'},{'value':'Visa Card'}],
                			"AList": [{'value':'GoNoGo'},{'value':'LOS'}],
                			"valid": {"val1":"29:10:2015","val2":""},
                			"CList":[{"val1":"","exp1":"","fieldname":"CUST_TYPE","displayname":"CUST_TYPE","exp2":"is","val2":"SAL","operator":"&&"},
                			         {"val1":"","exp1":"","fieldname":"LOAN_AMOUNT","displayname":"LOAN_AMOUNT","exp2":">","val2":"2500000","operator":""}],
                			         "Table": 1002,
                			         "DRule": 12,
                			         "AggrList":[{'key':"Loan Amount",'value':'Sum off'},{'key':"Tanure",'value':'Multiply off'},{'key':"Trades Account",'value':'Avg Off'}]
                		}];

                		var expressions = { 'NumberExpression' : [{value:'Select','text':'Select Expression (123)'},
                		                                          {value:'<','text':'Lest than  <'}, {value:'<=','text':'Less than equal to <='},
                		                                          {value:'==','text':'Equal to  =='},{value:'!=','text':'Not equal to  !='},
                		                                          {value:'>','text':'Greater than  >'},{value:'>=','text':'Greater than equal to  >='},
                		                                          {value:'Between','text':'Between'},{'value':'! Between','text':'Not Between'}],
                		                                          'StringExpression' :[{value:'Select','text':'Select Expression'},
                		                                                               {value:'is','text':'is'}, {value:'is not','text':'is not'},
                		                                                               {value:'start with','text':'start with'},{value:'end with','text':'end with'},
                		                                                               {value:'contains','text':'contains'},{value:'!contains','text':'does not contains'}
                		                                                               ],
                		                                                               'BooleanExpression' :[{value:'Select','text':'Select Expression'},
                		                                                                                     {value:'is','text':'true'}, {value:'is not','text':'false'}													          
                		                                                                                     ],
                		                                                                                     'DateExpression' :[{value:'Select','text':'Select Expression'},
                		                                                                                                        {value:'is','text':'is'}, {value:'is not','text':'is not'},
                		                                                                                                        {value:'Between','text':'Between'}, {value:'! Between','text':'Not Between'}
                		                                                                                                        ]
                		};

                		$scope.SList = [{'value':'1001','name':'Self Employed', 'status':'Approved', 'createdBy':'Ankur Handa'},{'value':'1002','name':'Salaried', 'status':'Approved', 'createdBy':'Ankur Handa'}];
                		$scope.DList = [{'value':'11','name':'Rule 1','type':'Matrix', 'status':'Approved', 'createdBy':'Ankur Handa'},{'value':'12','name':'Rule 2', 'type':'Criteria', 'status':'Approved', 'createdBy':'Ankur Handa'}];
                		$scope.PList = [{'value':'Car Loan'},{'value':'Credit Card'},{'value':'Gold Loan'},{'value':'Education Loan'},{'value':'Home Loan'}];
                		$scope.AList = [{'value':'QDE'},{'value':'ADE'},{'value':'SCRUB'},{'value':'GoNoGo'},{'value':'LOS'}];
                		$scope.OutputList = [{'value':'Approve','color':'#43A443'},{'value':'Decline','color':'#E42E28'},{'value':'Queue','color':'#2196f3'}];
                		
//                		$('#recordFrom').datepicker({changeMonth: true, changeYear: true, yearRange: "1945:2016", dateFormat: 'dd:M:yy', defaultDate:(new Date(new Date()).getDate() - 3)});

                /*		$('html,body').animate({
                			scrollTop: $("#second_row").offset().top},
                		'slow');
                *///		$("#recordTo").datepicker();
                		var sicount=0;

                		//get roles authentication
//	                                    		$http.get('JSON/Auth.json').success(function(data) {
//	                                    		$scope.Auth=data[""+user.institutionID+""].roles;
//	                                    		});
/*
                		$("#recordTo").datepicker({
                			changeMonth: true, changeYear: true, yearRange: "1945:2016", dateFormat: 'dd:M:yy', defaultDate:(new Date(new Date()).getDate() - 3) ,
                			onSelect: function(dateText, inst) {
                				// alert('on select triggered');
                				$('#loading_spinner').show();
                				setTimeout(function()
                						{
                					$('#loading_spinner').hide();
                					$("#recordCount").val("25568").show();
                					$("#Total").text("Records");
                					$("#totalRecordContainer, #Total,#recordCountContainer ").show();
                					// $('#find"]').prop('disabled', false);
                					$("#find").removeAttr("disabled")
                						},1000);	

                			}
                		});
*/
            		// For Hiding the user profile if any time he has seen
//	                                    		$("#UserContainer").hide();

            		function validation()
            		{  
            			var val=true; 
            			$("input:text , select").each(function(){			
            				if($(this).is(' :visible'))

            				{if($(this).attr("id") == "creditPolicy" && ($(this).val()=="Select Policy"||$(this).val()=="Scoring Name"))
            				{
            					// $(this).css({"border-right":'5px solid
            					// red'});
            					$(this).nextAll("p").text("Please select "+$(this).attr("name")).addClass("const");
            					val=false;
            					return false;
            				}

            				else if(($(this).val() == ''))
            				{
            					// $(this).css({"border-right":'5px solid rgb(255,
            					// 0, 0)'});val=false;
            					$(this).nextAll("p").text("Please select "+$(this).attr("name")).addClass("const");
            					val=false;
            					return false;
            				}
            				else 
            				{

            					// $(this).css({"border-right":'5px solid green'});

            					$(this).nextAll("p").text("");
            				}
            				}
            			});
            			return val;
            		}


            		$("#find").click(function(){
            			$("p").text("");
            			if(validation())
            			{
            				$('#loading_spinner').show();
            				$("#timestampDate").text(timestampDate());
            				$("#timestampTime").text(timestampTime());					
            				var value = $("body #policy :selected").text();	
            				$("body #selectedPolicy").attr("name",value);
            				switch(value)
            				{
            				case "Credit Policy":
            					$("#decisionGraph").show();
            					break;
            				case "Score Table":
            					$("#scoreGraphContainer").show();
            					break;
            				case "Credit Rules":
            					$("#decisionGraph").show();
            					break;
            				}
            				setTimeout(function()
            						{
            					$('#loading_spinner').hide();
            					$("#mainContainer").show();
            					$("#selectedPolicy").text($("#creditPolicy :selected").text());

            						},1000);	
            			}
            		});

            		$('#recordTo').blur(function()
            				{
            			/*
            			 * console.log("blur"+$("#recordCount").val());
            			 * setTimeout(function() {
            			 * console.log("blur"+$("#recordCount").val());
            			 * },1000);
            			 * console.log("blur"+$("#recordCount").val());
            			 */
            			console.log("Date"+$("#recordTo").datepicker("getDate"));

            				});

            		$scope.$watch('recordTo', function(value) {
//	                                    			console.log("value:"+value);
            			if (value != undefined) {
            				console.log("value:"+value);
            			}
            		});

            		// change field and value slider button
            		$(document.body).on('click', '.radio_inner_div', function()
            				{  
            			var type = $(this).attr("title");
            			if(type == "Value"){
            				$(this).hide();
            				$(this).next().show();
            				// console.log("Title: value");
            				$(this).parent().nextAll("input, select:not(:first)").hide();
            				$(this).parent().next("select[id^='expression']").val("Select").children("option[value='Between'], option[value='! Between']").attr("disabled","disabled");
            			} else
            			{
            				$(this).hide();
            				$(this).prev().show();
            				$(this).parent().nextAll("select:not(:first)").hide();
            				$(this).parent().next("select[id^='expression']").val("Select").children("option").attr("disabled",false);

            			}
            				});

//	                                    		************************************************** on Change  select*************************************************************		 
            		function addOptionOnChange(item ){
            			var value=true;
            			$('#creditPolicy').find('option').remove().end();
            			if($("#policy option:selected").index()!=0)
            			{
            				$("#creditPolicy ,#recordFrom ,#recordTo ,#find").show();
            			}
            			$.each(item, function(val, text) 
            					{
            				if(value == true)
            				{
            					$("#creditPolicy").append( $('<option selected="selected">').text(text.text).attr('value',text.value));
            					value=false;
            				}else{
            					$("#creditPolicy").append( $('<option>').text(text.text).attr('value',text.value));
            				}
            					}); 
            		}


            		$('button[id^="Operator"]').click(function()
            				{   var dom = $("div[id^=Field_Container]:last").clone();
            				var id = dom.attr("id");
            				var count = parseInt(id.slice(-1));
            				dom.attr("id",id.slice(0,-1)+(++count));
            				$(this).parent().before('<div class="col-md-1 op_and">&&</div>');
            				$(this).parent().before(dom);
            				$('select',dom).each(function(index,ele)
            						{id = $(this).attr("id");
            						$(this).attr("id",id.slice(0,-1)+count);
            						});

            				});

            		//create other fields inside scor matrix row in scor matrix panel
            		$(document.body).on('change', 'select[id^="condition"]', function()
            				{  var value = $(this[this.selectedIndex]).val();
            				idcount =0;
            				if(value != "Select")
            				{   $("#rule_error").text("");
            				$(this).parent().nextAll().children('input[id^="value1"], input[id^="score"]').slideDown().val("");
            				$(this).parent().parent().prev().children().children('input[id^="score"]').slideDown().val("");
            				if((value == "Between") || (value == "! Between"))
            				{ $(this).parent().nextAll().children('input[id^="value2"]').slideDown().val("");
            				} else
            				{$(this).parent().nextAll().children('input[id^="value2"]').hide().val("");
            				}
            				}else{
            					$(this).parent().nextAll().children('input[id^="value1"], input[id^="value2"]').val("").hide();
            					$(this).parent().parent().prev().children().children('input[id^="score"]').slideDown().val("").hide();
            				}
            				});

            		$(document.body).on('change', 'select[id^="totalRecord"]', function()
            				{
            			var option=$("#totalRecord").val();

            			switch(option)
            			{
            			case "100":
            				$("#recordCount").val("25568");
            				break;

            			case "75":

            				var value=(25568*75)/100

            				//alert($("#recordCount").text());
            				$("#recordCount").val(value);
            				break;
            			case "50":
            				var value=(25568*1)/2
            				$("#recordCount").val(value);
            				break;
            			case "25":
            				var value=(25568*1)/4
            				$("#recordCount").val(value);
            				break;
            			}

            				});

            		//*************************************** Getting Data From Server *********************************************

//	                                    		$scope.simulatorErr=false;
//	                                    		*****************Updating Scoring List***********************************************

            		/*	$("#scoreBlock").hide();*/
            		Score.getAll_ScoringTables(user.institutionID ,function(data){
            			$scope.tableList=data;
            		});			    
//	                                    		***************** Updating Policy **********************************************
            		Policy.getAllpolicy(user.institutionID ,function(data){
            			$scope.policyList=data;
            		});

//	                                    		*****************Updating Rules***********************************************
            		Decision.getRuleList(user.institutionID,$scope.Rule,function(data){
            			$scope.RuleList=data;
            		});

            		function resetSimulator( )
            		{
            			$("#creditPolicy , #recordFrom , #recordTo , #recordCountContainer ,#totalRecordContainer ,#find ,#loading_spinner ,#mainContainer ,#policy-container  ,#scoring_main_container ,#scoreBlock").hide();
            			//	$(".help").text(" ");
            			$("#editContainer , #policyUpdated ,#decisionGraph ,#in").hide();
            			$("#recordFrom , #recordTo").val('');
            			$("#total").text(" ");
            			$("#find").attr("disabled","disabled");
            			$("#Matrix_main_container_sim").hide();
            			//	$(".resultContainer").closest().remove();
            			//	$(".resultContainer :not(:first)").remove();


            		}

            		$(document.body).on('change','select[id="policy"]',function(){
            			var value = $("body #policy :selected").text();
            			resetSimulator();
            			removeClone();
            			function SortByName(x,y) {
            				return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
            			}

            			switch(value)
            			{
            			case "Credit Policy":
            				$("#creditPolicy").find('option ').remove().end();
            				// Call Sort By Name
            				console.log("Value in $scope.policyList "+$scope.policyList);

            				$scope.policyList.sort(SortByName);
            				$("#creditPolicy").append( $('<option selected>').text("Select Policy"));
            				for (var i = 0; i <  $scope.policyList.length; i++) 
            				{

            					$("#creditPolicy").append( $('<option >').text($scope.policyList[i].name ));

            				}
            				break;

            			case "Credit Rules" :
//	                                    				$scope.getRuleList(function(){});
            				$("#creditPolicy").find('option ').remove().end();
            				// Call Sort By Name
            				$scope.RuleList.sort(SortByName);
            				console.log("$scope.RuleList"+JSON.stringify($scope.RuleList));
            				$("#creditPolicy").append( $('<option selected>').text("Select Rule").val("none"));
            				for (var i = 0; i < $scope.RuleList.length; i++) 
            				{

            					$("#creditPolicy").append( $('<option >').text($scope.RuleList[i].name ).val($scope.RuleList[i].RuleID));


            				}

            				break;

            			case "Score Table" :
//	                                    				getAll_ScoringTablesName(function (){});
            				// Call Sort By Name
            				$("#creditPolicy").find('option ').remove().end();
            				$scope.tableList.sort(SortByName);
            				$("#creditPolicy").append( $('<option selected>').text("Scoring Name ").val("Scoring Name"));
            				for (var i = 0; i < $scope.tableList.length; i++) 
            				{

            					$("#creditPolicy").append( $('<option >').text($scope.tableList[i].name ).val($scope.tableList[i].TableID));


            				}
            				break;
            			}
            			var length=$("#creditPolicy").length;
            			console.log("Length ="+length);
            			if($("#policy option:selected").index()!=0 )
            			{
            				$("#creditPolicy ,#recordFrom ,#recordTo ,#find").show();
            			}
            			/*/*
            					 else
            						 {
            						 $scope.simulatorErr=true;
            						 $("#simulator-error").text($("#policy option:selected").text()+" data not available...");
            						 }*/
//	                                    			console.log("simulatorErr ="+simulatorErr);

            		});


            		$(document.body).on('change','select[id="aggr_file"]',function(){

            			var value = $("#aggr_file :selected").text();	
            			switch(value)
            			{
            			case "IRP":


            				addOptionOnAggr(ilist);

            				break;
            			case "CIBIL_RESPONSE" :
            				addOptionOnAggr(clist);

            				break;
            			case "CIBIL_ARP" :

            				addOptionOnAggr(calist);
            				break;
            			}

            		});

            		function addOptionOnAggr(item ){
            			var value=true;
            			$('#aggr_field').find('option')  .remove() .end() ;
            			$.each(item, function(val, text) 
            					{
            				if(value == true)
            				{

            					$("#aggr_field").append( $('<option selected="selected">').text(text.text).attr('value',text.value));
            					value=false;
            				}else{

            					$("#aggr_field").append( $('<option>').text(text.text).attr('value',text.value));
            				}
            					}); 
            		}


	                                    		
            		$("#criteria_panel_close").click(function(){
            			alert("Criteria Panel close Button...");

            		});

            		$(document.body).on("click","#criteria_panel_close:visible", function(){
            			// alert("Criteria Panel close Button...");

            			criteria_panel_close(); 
            		});


            		function criteria_panel_close()
            		{	
            			//	 alert("Criteria Panel...");
            			$("#add-criteria-panel").slideUp();
            			$("#rule_error").text("");
            			$("#add-criteria-panel1").remove();
            			$("#criteria-table-div").slideDown();  // not present
            			$(".criteria_rule_body:not(:first)").remove();
            			$(".criteriaRules:not(:first)").remove();
            			$("#crule, button.INOperator, button.OUTOperator").show();
            			$("#add-criteria-panel input, #add-criteria-panel1 input").val("");
            			$("span[id^='INOp_Value'], span[id^='OUTOp_Value']").text("").hide();
            		}

            		$(document.body).on("click","#Edit_Aggrigation", function(){
            			$("#Add_Aggrigation, td.hiden, #Edit_Aggrigation").slideToggle();

            		});


            		$(document.body).on("click","#Add_Aggrigation",function(){
            			//	 alert("working");
            			$("#Aggrigation_panel, #Add_Aggrigation").slideToggle();
            		});


            		$(document.body).on("click","#criteria_edit",function(){
            			$("#crit_box").append($("#add-criteria-panel").clone().attr("id","add-criteria-panel1"));
            			$("#add-criteria-panel1").find("#Criteria_outcome, #outcome_queue, .OUTOperator, #criteria_name, #criteria_priority").remove();
            			$("#add-criteria-panel1").slideDown();
            			$("#crule").hide();

            			Update_Master("IFF_File_first00");
            			Update_Master("IFF_File_second00");
            			$timeout(function(){
            				for(var obj in $scope.policyList)
            				{
            					if(obj.PolicyID == $scope.PolicyID)
            					{
            						for(var v=0; v<obj.CList.length; v++)
            						{if(v != 0)
            							create_inner("#add-criteria-panel1",$("#add-criteria-panel1").find("button.INOperator:visible:first"));
            						var div = $("#add-criteria-panel1").find("#criteriaRule0"+v+":visible");
            						var exp = getConditionOperator(obj.CList[v].exp1,obj.CList[v].exp2);
            						$(div).find("#IFF_File_first0"+v).val();
            						console.log(obj.CList[v].fieldname);
            						$(div).find("#IFF_Field_first0"+v+" option[title="+obj.CList[v].fieldname+"]").attr("selected","selected");
            						$(div).find("#expression0"+v).val(exp.value);
            						if(obj.CList[v].val1)
            							$(div).find("#firstValue0"+v).val(obj.CList[v].val1).show();
            						if(obj.CList[v].val2)
            							$(div).find("#secondValue0"+v).val(obj.CList[v].val2).show();
            						if(obj.CList[v].val2 == "select")
            							$(div).find("#IFF_File_second0"+v).val();
            						if(obj.CList[v].val2 == "select")
            							$(div).find("#IFF_Field_second00"+v).val(obj.CList[v].val2);
            						$(div).find("#INOp_Value0"+v).text();
            						}
            					}
            				}
            			});
            		});

            		// get all master for drop down list
            		function Update_Master(id)
            		{
            			$http({
            				method : 'GET',
            				url : baseUrl+'IFFDropDown',
            				params : {'INSTITUTION_ID':user.institutionID},
            				headers : {'Content-Type' : 'application/json'}
            			}).success(function(data) 
            					{    	  $('#'+id+' option:not(:first)').remove();
            					$.each(data.Data, function(val, text) 
            							{ $('#'+id+'').append( $('<option>').text(text.FILE_NAME).attr('value',text.FILE_ID));}); 
            					}).error(function(data)
            							{
            						alert("We could not process your request......Please try later.")
            							});
            		}// end master

            		$("#product").click(function(){
            			$("#product_panel").slideToggle();
            		});
            		$("#AppType").click(function(){
            			$("#AppType_panel").slideToggle();
            		});

            		$("#add-Product").click(function(){
            			var value = $("#product_list").val();
            			if(value != "Select")
            			{
            				$scope.ProductList.push({"name":value, 'value':value});
            				$scope.$apply();
            				$("#product_panel").slideToggle();
            			}else{
            				console.log("error");
            			}
            		});

            		$(document.body).on("click","#criteria_panel_add",function(){
            			$scope.createcriteriaRule();
            			$scope.$apply();
            		});


            		$(document.body).on('change', 'select[id^="table_list"]', function()
            				{ 
            			var value = $(this[this.selectedIndex]).val();
            			$scope.PolicyTable(value);
            			$scope.$apply();
            				});
//	                                    		$(document.body).on('click', 'span[title="Delete"]', function(e)
//	                                    		{ e.preventDefault();
//	                                    		$('#confirm').modal({ backdrop: 'static', keyboard: false })
//	                                    		.one('click', '#delete', function (e) {
//	                                    		angular.element(document.getElementById('cal')).scope().load_table('err','delete');
//	                                    		});
//	                                    		});

            		$(document.body).on('change', 'select[id^="rule_list"]', function()
            				{ 	var value = $(this[this.selectedIndex]).val();
            				console.log("value:"+value);
            				$scope.PolicyDRule(value);
            				$scope.$apply();
            				});

            		$("#add-AppType").click(function(){
            			var value = $("#AppType_list").val();
            			if(value != "Select")
            			{
            				$scope.AppList.push({"name":value, 'value':value});
            				$scope.$apply();
            				$("#AppType_panel").slideToggle();
            			}else{
            				console.log("error");
            			}
            		});

            		$(document.body).on('change', 'select[id^="valid_status"]', function()
            				{ 
            			$('#vfrom, #vtill').datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2015", dateFormat: 'dd:mm:yy'});
            			var value = $(this[this.selectedIndex]).val();
            			if(value == "Select")
            			{
            				$("#vfrom, #vtill").val("").slideUp();
            			}else if(value == "from")
            			{
            				$("#vtill").val("").slideUp();
            				$("#vfrom").val("").slideDown();
            			}else if(value == "till")
            			{
            				$("#vfrom").val("").slideUp();
            				$("#vtill").val("").slideDown();
            			}else if(value == "between"){
            				$("#vfrom, #vtill").val("").slideDown();
            			}
            				});




            		$scope.redirect = function() {
            			var url = 'NewLogin.html' + "?" + "user=logout";
            			$(location).attr('href', url);
            		};

            		var startAt=0, endOn=0, curr=0, current=0;
            		$scope.Submenu = true;
            		$('#Dashboard, #mtd').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"});
            		$('#dashboard_container').slideDown();
//	                                    		$("#mtd-box").html("");
//	                                    		$("#mtd-box").append('<object type="text/html" data="report.html" style="width:103%; min-height:400px"></object>');

            		$("#matrixbtn").hide();
            		// Tab click function

            		function removeClone()
            		{
            			$(".clone").remove().end();
            		}

            		$scope.open_tab = function(type)
            		{   
            			if(type == "Dashboard")
            			{   $scope.Submenu = true;		 
            			$('#Dashboard').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
            			$("#Simulator_container,#matrix-container, #matrixbtn").hide();
            			$("#dashboard_container").show();
            			$("#dashboardType").show();
            			$("#tablefilter").show();
            			resetSimulator();
            			}else if(type == "Simulator")
            			{  $scope.Submenu = false;
            			$('#simulator_form').trigger("reset");
            			$('#Simulator').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
            			$("#dashboard_container,#matrix-container, #matrixbtn").hide();
            			$("#Simulator_container").show();
            			$("#dashboardType").hide();
            			$("#tablefilter").hide();
            			resetSimulator();
            			removeClone();				
            			}
            		}
            		
            		

            		$("#updatePolicy").click(function()
            				{
            			$("#policyUpdated").show();
            				});

//	                                    		*********************************************Selected Policy click Event*****************************************************
            		$(document.body).on("click" ,"#selectedPolicy", function(){
            			$("#editContainer").show();
            			var option=$("body #selectedPolicy").attr("name");
            			switch(option)
            			{
            			case "Credit Policy" :
            				$("#mainContainer").hide();
            				$("#Simulator_container").hide();
            				$('#policy-container').show();
            				$("#table_list").empty();
            				for (var i = 0; i <  $scope.tableList.length; i++) 
            				{
            					$("#table_list").append( $('<option >').text($scope.tableList[i].TableID ));
            				}

            				$("#rule_list").empty();
            				for (var i = 0; i <  $scope.RuleList.length; i++) 
            				{
            					$("#rule_list").append( $('<option >').text($scope.RuleList[i].RuleID ));
            				}
            				// $('#policy_table').hide();
            				console.log("policyList: "+JSON.stringify($scope.policyList));
            				for(var obj in $scope.policyList)
            				{ 
            					if(obj.PolicyID == $scope.PolicyID) {
            						$scope.ProductList = obj.PList;
            						// console.log("productList: "+JSON.stringify($scope.ProductList));
            						$scope.AppList = obj.AList;
            						$scope.PcriteriaList = obj.CList;
            						$scope.Ppriority = obj.priority;
            						if(obj.valid.val1 && obj.valid.val2)
            						{
            							// alert("object validated");
            							$("#valid_status").val("between"); 
            							$("#vfrom").val(obj.valid.val1).show();
            							$("#vtill").val(obj.valid.val2).show();
            						}else if(obj.valid.val1)
            						{ $("#valid_status").val("from"); 
            						$("#vfrom").val(obj.valid.val1).show();
            						$("#vtill").val("").hide();
            						}else if(obj.valid.val2)
            						{ $("#valid_status").val("till");
            						$("#vfrom").val("").hide();
            						$("#vtill").val(obj.valid.val1).show();
            						}else
            						{
            							$("#valid_status").val("Select");
            							$("#vfrom, #vtill").val("").hide();
            						}
            						console.log("D rule parameter: "+obj.DRule);
            						$scope.PolicyDRule(obj.DRule);
            						$scope.PolicyTable(obj.Table);
            						bindlist("product_list", $scope.PList);	    			// bind
            						// all
            						// product
            						// to
            						// drop
            						// down
            						bindlist("AppType_list", $scope.AList);						// bind
            						// all
            						// product
            						// to
            						// drop
            						// down
            						bindlist("table_list", $scope.SList, obj.Table);	    		    // bind
            						// all
            						// product
            						// to
            						// drop
            						// down
            						bindlist("rule_list", $scope.DList, obj.DRule);	    		      // bind
            						// all
            						// product
            						// to
            						// drop
            						// //
            						// down
            						$scope.AggrigationLayout(obj.AggrList);
            					}
            				}
            				break;

            			case "Score Table":
            				$("#mainContainer").hide();
            				$("#Simulator_container").hide();
            				var id=$("#creditPolicy").val();
            				console.log("ID in cradit policy...:"+id);
            				$scope.load_table(id ,"view");
            				//	console.log($scope.CatArray);
            				break;

            			case "Credit Rules":
            				$("#mainContainer").hide();
            				$("#Simulator_container").hide();
            				var id=$("#creditPolicy").val();
            				//	console.log("ID in cradit policy...:"+id);
            				//	$scope.Load_Rule2(id,"edit","Matrix");
            				$scope.createColumn(null,null,"decision","decision_matrix1");
            				$("#Matrix_main_container_sim").show();
            				$("#scoreBlock").show();
            				break;

            			}


            		});

            		$("#closeSimulate").click(function()
            				{
            			$("#mainContainer , #Simulator_container").show();
            			$('#policy-container , #scoring_main_container ,#Matrix_main_container_sim').hide();
            			closeEditversion();
            				});

            		function timestampDate()
            		{
            			var timestamp= new Date(new Date());
            			var dt=timestamp.getDate();
            			var mnth=timestamp.getMonth()+1;
            			var year=timestamp.getFullYear();

//	                                    			var tf=timestamp.getTimezoneOffset();
            			var option=timestamp.getDay();
            			var day;
            			switch(option)
            			{
            			case 1:
            				day="Mon";
            				break;
            			case 2:
            				day="Tue";
            				break;
            			case 3:
            				day="Wed";
            				break;
            			case 4:
            				day="Thu";
            				break;
            			case 5:
            				day="Fri";
            				break;
            			case 6:
            				day="Sat";
            				break;
            			case 7:
            				day="Sun";
            				break;
            			}
            			return  day +"  " +dt+"/"+mnth+"/"+year;
            		}

            		function timestampTime()
            		{
            			var timestamp= new Date(new Date());
            			var hr=timestamp.getHours();
            			var min=timestamp.getMinutes();
            			var sec=timestamp.getSeconds();
            			return  hr+":"+min+":"+sec;
            		}

            		function clone()
            		{
            			var pclick=1;
            			$('html,body').animate({
            				scrollTop: $("#second_row").offset().top},
            			'slow');
            			var dom=$("#resultContainer:last").clone();
            			dom.attr("class","resultContainer row clearfix clone");
            			dom.find("#timestampDate").text(timestampDate());
            			dom.find("#timestampTime").text(timestampTime());
            			if(pclick==1)
            			{
            				if(pclick %2==1)
            				{
            					dom.find("img").attr("src","img/clonegraph.jpg");
            					dom.find("#approve").css({"width":"26%"}).text("26%");
            					dom.find("#queue").css({"width":"48%"}).text("48%");
            					dom.find("#decline").css({"width":"26%"}).text("26%");

            				}
            				dom.find("#base").text("v"+version++);       
            				$("#mainContainer").after().append(dom);
            				$("#Simulator_container").show();
            				var option=$("#selectedPolicy").attr("name");
            				resetSimulator();
            				// alert(option);
            				switch(option)
            				{

            				case "Credit Policy":

            					$(".decisionGraph").show();
            					$("#mainContainer").show();  
            					break;
            				case "Score Table":

            					//$("#scoreGraphContainer").show();
            					$("#mainContainer").show();  
            					//$("#decisionGraph").show();
            					break;
            				case "Credit Rules":
            					$(".decisionGraph").show();
            					$("#mainContainer").show(); 
            					break;

            				}

            				$("#policy-container").hide();
            				$("#scoring_main_container").hide();

            			}

            		}

            		// get all policy from server databse 
            		function getAllPolicyName() 
            		{   $("#Loader").show();
            		$http({
            			method : 'GET',
            			url : baseUrl+'GetAllPolicy',
            			params : {'INSTITUTION_ID': user.institutionID},
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data) 
            				{ $('#Loader,#simulator-error').hide();
            				console.log("All policy is."+JSON.stringify(data));
            				$("#creditPolicy").find('option ').remove().end();
            				if (data.StatusCode === 101) 
            				{
            					function SortByName(x,y) {
            						return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
            					}
            					// Call Sort By Name
            					data.Data.sort(SortByName);
            					$("#creditPolicy").append( $('<option selected>').text("Select Policy"));
            					for (var i = 0; i < data.Data.length; i++) 
            					{
            						$("#creditPolicy").append( $('<option >').text(data.Data[i].name ));
            					}

            					if($("#policy option:selected").index()!=0)
            					{
            						$("#creditPolicy ,#recordFrom ,#recordTo ,#find").show();
            					}
            				} else 
            				{ $("#simulator-error").show().text("We could not process your request......Please try later.");
            				}
            				}).error(function(data) 
            						{   $('#Loader').hide();
            						$("#simulator-error").show().text("We could not process your request......Please try later.");
            						});

            		}  

            		// get all scoring tables from database		           
            		function getAll_ScoringTablesName(callback) 
            		{ $scope.tableList = [];
            		$http({
            			method : 'GET',
            			url : baseUrl+'GetTables',
            			params : {'INSTITUTION_ID': user.institutionID,'type' : ''},
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data) 
            				{ 
            			//	   console.log("this function is working."+JSON.stringify(data));
            			$("#creditPolicy").find('option ').remove().end();
            			$('#Loader,#simulator-error').hide();
            			if (data.StatusCode === 101) 
            			{	if(data.Data != null)
            			{
            				function SortByName(x,y) {
            					return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
            				}

            				// Call Sort By Name
            				data.Data.sort(SortByName);
            				$("#creditPolicy").append( $('<option selected>').text("Scoring Name ").val("Scoring Name"));
            				for (var i = 0; i < data.Data.length; i++) 
            				{

            					$("#creditPolicy").append( $('<option >').text(data.Data[i].name ).val(data.Data[i].TableID));


            				}

            				if($("#policy option:selected").index()!=0)
            				{
            					$("#creditPolicy ,#recordFrom ,#recordTo ,#find").show();
            				}
            			}
            			} else 
            			{
            				$("#simulator-error").show().text("We could not process your request......Please try later.");
            			}
            			callback();
            				}).error(function(data) 
            						{$('#Loader').hide();
            						$("#simulator-error").show().text("We could not process your request......Please try later.");
            						});
            		}  



            		/* new code for policy and rules*/
            		$scope.getRuleList = function(callback)
            		{	$('#Loader').show();
            		$http({ method : 'POST',
            			url : baseUrl+'DecisionRules',
            			params:{'INSTITUTION_ID':user.institutionID,'RuleID':$scope.Rule,'CType':"Find-All"},
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data) 
            				{   $("#creditPolicy").find('option ').remove().end();
            				$('#Loader,#simulator-error').hide();
//	                                    				console.log("Rules"+JSON.stringify(data.Data));
            				if(data.StatusCode === 101)
            				{
            					function SortByName(x,y) {
            						return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
            					}

            					// Call Sort By Name
            					data.Data.sort(SortByName);
            					$("#creditPolicy").append( $('<option selected>').text("Select Rule").val("none"));
            					for (var i = 0; i < data.Data.length; i++) 
            					{			
            						$("#creditPolicy").append( $('<option >').text(data.Data[i].name ).val(data.Data[i].RuleID));			   
            					}

            					if($("#policy option:selected").index()!=0)
            					{
            						$("#creditPolicy ,#recordFrom ,#recordTo ,#find").show();
            					}
            				}else{
            					$("#simulator-error").show().text("We could not process your request......Please try later.");
            				}
            				callback();
            				}).error(function(data)
            						{
            					$("#simulator-error").show().text("We could not process your request......Please try later.");
            						});

            		}




            		function closeEditversion()
            		{
            			$("#editContainer").hide();
            		}


            		$("#createVersion").click(function(){

            			//	 console.log("Inside simulate clone sclick :"+sclick+"pclick: "+pclick);	
            			clone();
            			closeEditversion();
            		});

            		//load attribute_list for clicked categories
            		$scope.load_attributes = function(index, plancolor, MasterID)
            		{   
            			$scope.CatID = MasterID;
            			$scope.AttributeColor = plancolor;	
            			for(var i=0; i<dataset.master.length; i++)
            			{if(dataset.master[i].CatID == MasterID)
            			{ if((typeof dataset.master[i].plan != 'undefined') && (dataset.master[i].plan.length != 0))
            			{   $scope.planarrey = dataset.master[i].plan;						
            			$scope.fieldarrey = null;						
            			}
            			else {
            				$('#A_LoaderSpinner').show();
            				$http({
            					method : 'GET',
            					url : baseUrl+'GetAttributes',
            					params : {'CatID':MasterID,'INSTITUTION_ID':user.institutionID},
            					headers : {'Content-Type' : 'application/json'}
            				}).success(function(data) 
            						{   $('#A_LoaderSpinner').hide();
            						if(data.StatusCode == 101)
            							generateAttribute(data);								
            						}).error(function(data)
            								{alert("We could not process your request......Please try later.");
            								$('#A_LoaderSpinner').hide();
            								});
            			}
            			}			
            			}
            			$('#add_plan_rule_box').parent().find('span').remove();
            			categoryFlag=true;
            			$scope.display_plan_box = true;
            			$scope.display_item_box = false;
            		}


            		$('body #add_Cat_box').click(function() 
            				{
            			$('#Cat_input_box').slideToggle();
            			Catcount = Catcount + 1;
            				});

//	                                    		$('body #close_logic_panel').click(function() 
            		$(document.body).on("click","#close_logic_panel",function()
            				{
//	                                    			alert("working...");
            			close_logic_panel();  
            				});

            		function close_logic_panel()
            		{ $('body .logic_panel_row2, .logic_panel_row1, div[id^="Field_Container"]:not(:first), .op_and').remove();
            		$('body select[id^="logic_field"] option:not(:first)').remove();
            		idcount = 0;
            		$("body #rule_error").text("");
            		$('body #logic_panel_body #first_row').show();
            		$('body #logic_panel, #L_LoaderSpinner').hide($('.item, #addScoreField').slideDown());
//	                                    		$('#addScoreField').slideDown();
//	                                    		$('#L_LoaderSpinner').hide();
            		$scope.rule_update = false;
            		FTypes = [];
            		}

            		/* //close context panel and reset values
            	   $scope.close_context_panel = function()
            	    { 
            	 	   $scope.category_list.splice(1,$scope.category_list.length-1);
            	 	   $scope.category_dropdown = $scope.category_list[0];
            	 	   $scope.attribute_list.splice(1,$scope.attribute_list.lemgth-1);
            	 	   $scope.attribute_dropdown = $scope.attribute_list[0];
            	 	   $scope.field_list.splice(1,$scope.field_list.length-1);
            	 	   $scope.field_dropdown = $scope.field_list[0];
            	 	   $scope.update_context = false;
            	 	   $scope.hide_add_context_button =false;
            	 	   $scope.context_score_matrix = null;
            	 	   $("#context_panel , #context_panel_row2").hide();
            	 	   $('button[id=add_context], .item').slideDown();
            	    }
            		 */

            		//close context panel and reset values
            		$scope.close_context_panel = function()
            		{ 
            			$scope.category_list.splice(1,$scope.category_list.length-1);
            			$scope.category_dropdown = $scope.category_list[0];
            			$scope.attribute_list.splice(1,$scope.attribute_list.lemgth-1);
            			$scope.attribute_dropdown = $scope.attribute_list[0];
            			$scope.field_list.splice(1,$scope.field_list.length-1);
            			$scope.field_dropdown = $scope.field_list[0];
            			$scope.update_context = false;
            			$scope.hide_add_context_button =false;
            			$scope.context_score_matrix = null;
            			$('#context_panel, #context_panel_row2').hide();
            			$('button[id=add_context], .item').slideDown();
            		}

            		// create new attribute for selected category
            		$('body #add_attribute_box').click(function() 
            				{	if(categoryFlag)
            				{   $('#attribute_box').slideToggle();
            				plancount = plancount + 1;
            				}else
            				{   $(this).parent().append("<span class='error_msg' style=\"position: relative; display:block; color:red;\">Please select category!</span>");
            				$('.error_msg').hide(2000);
            				}
            				});


            		$scope.create_attribute = function() 
            		{  if($('#attributeName').val() != "")
            		{  $('#A_LoaderSpinner').show();
            		var DataSet = {'CatID' : $scope.CatID,'name' : $('#attributeName').val(),	'weight' : $('#attribute_weight').val(),
            				'color' : $scope.AttributeColor
            		}
            		$('#attributeName').val('');
            		$http({
            			method : 'POST',
            			url : baseUrl+'CreateAttribute',
            			params:{'INSTITUTION_ID' : user.institutionID},
            			data : DataSet,
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data)
            				{ if(data.StatusCode == 101)
            				{ $('#A_LoaderSpinner').hide();
            				generateAttribute(data);
            				}
            				}).error(function(data)
            						{   $('#A_LoaderSpinner').hide();
            						alert("We could not process your request......Please try later.")
            						});
            		$('#attribute_box').hide().slideUp();
            		$('#main_error').text("").parent().slideUp();
            		}else{
            			$('#main_error').text("Please enter Attribute Name").parent().slideDown();
            		}
            		};


            		$scope.create_Category = function()
            		{   if($('#CatName').val() != '')
            		{
            			$('#C_LoaderSpinner').show();
            			var colorcode = colorList[dataset.master.length+1];
            			if(typeof colorcode == 'undefined')
            			{ colorcode = '#607d8b';
            			}
            			var DataSet={
            					'TableID':$scope.ScoreTable,'name':$('#CatName').val(),'color':colorcode,
            					'weight':$scope.cweight		
            			}
            			$('body #Cat_input_box').slideUp().hide();
            			$('body #CatName').val('');
            			$http({
            				method : 'POST',
            				url : baseUrl+'CreateCategory',
            				params : {'INSTITUTION_ID':user.institutionID},
            				data : DataSet,
            				headers : {'Content-Type' : 'application/json'}
            			}).success(function(data) 
            					{	if(data.StatusCode == 101)
            					{  $('#C_LoaderSpinner').hide();
            					generateCategory(data);
            					}
            					}).error(function(data)
            							{   $('#C_LoaderSpinner').hide();
            							alert("We could not process your request......Please try later.")
            							});
            			$scope.cweight = 1;
            			$('body #main_error').text("").parent().slideUp();
            		}else{
            			$('body #main_error').text("Please enter Category Name").parent().slideDown();
            		}
            		};


            		// load field items for clicked attributes
            		$scope.load_field = function(attribute_name, AtID) 
            		{ if(!angular.equals(AtID,'undefined'))
            		{$scope.AtID = AtID;} 	   
            		for (var i = 0; i < dataset.master.length; i++) 
            		{  if(dataset.master[i].CatID === $scope.CatID)
            		{	for (var j = 0; j < dataset.master[i].plan.length; j++) 
            		{  	if (dataset.master[i].plan[j].AtID == AtID)
            		{				
            			if((typeof dataset.master[i].plan[j].items != 'undefined') && (dataset.master[i].plan[j].items.length != 0))
            			{	$scope.fieldarrey = dataset.master[i].plan[j].items;		
            			$scope.display_item_box = true;
            			break;
            			}
            			else{
            				$('#L_LoaderSpinner').show();
            				$http({
            					method : 'GET',
            					url : baseUrl+'GetItems',
            					params : {'AtID':AtID, 'INSTITUTION_ID':user.institutionID},
            					headers : {'Content-Type' : 'application/json'}
            				}).success(function(data) 
            						{	if(data.StatusCode == 101)
            						{  $('#L_LoaderSpinner').hide();
            						generateItems(data,"Logic_Create");
            						}
            						}).error(function(data)
            								{$('#L_LoaderSpinner').hide();
            								alert("We could not process your request......Please try later.")
            								});
            			}
            		}
            		}
            		}
            		}	
            		$scope.logic_panel_name = attribute_name;
            		attributeFlag = true;
            		$scope.display_item_box = true;

            		};



            		//view table contents in detail
            		$scope.load_table = function(id, type)
            		{ if(type === 'view')
            		{	  $scope.ScoreTable = id;
            		$scope.Table = "Table ID : "+id;
            		console.log("TableID "+id);
            		$('body #scoring_table, #scoring_main_container').slideToggle();
            		$('#C_LoaderSpinner').show();
            		$http({
            			method : 'GET',	url : baseUrl+'GetCategories',
            			params : {'TableID':id,'INSTITUTION_ID':user.institutionID},
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data) 
            				{       $('#C_LoaderSpinner').hide();
            				if(data.StatusCode === 101)
            				{ dataset.master.length = 0;
            				$scope.CatArray = [];
            				generateCategory(data);
            				}		    								
            				}).error(function(data)
            						{$('#C_LoaderSpinner').hide();
            						alert("We could not process your request......Please try later.");
            						});
            		}else if(type === 'delete')
            		{$('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function (e) 
            				{$scope.$apply(function(){
            					$scope.tableList =  $.grep($scope.tableList, function(e) { return e.TableID != id});
            				});
            				});
            		}
            		else if(type === 'approve')
            		{for(var i=0; i<$scope.tableList.length; i++)
            		{  if($scope.tableList[i].TableID === id)
            		{
            			$scope.tableList[i].status = "Approved";		 	
            		}
            		}	 
            		}else 
            		{$('#TableError').text("You are not authorised for this action").css("color","red").slideDown().delay(2000).slideUp();
            		}
            		}


            		//open context panel on click of add context button click
            		$scope.AddContext = function(value)
            		{ 
            			for(var i=0; i<dataset.master.length; i++)
            			{
            				$scope.category_list.push({'value':dataset.master[i].name});		    
            			}
            			$scope.ItemID = value;	  
            			$('#context_panel').slideDown();
            			$scope.hide_add_context_button = true;
            			$('#context_panel_heading').text($scope.logic_panel_name);		
            			$('.item').hide();
            		};

            		//update exiting rules
            		$scope.DeleteScoringRules = function(ItemID)
            		{ 	 idcount = 0; 
            		$scope.Update_ItemID = ItemID;//use to update item rule
            		$('.item, #addScoreField').hide($('#logic_panel').slideDown());
            		for(var i=0; i<$scope.fieldarrey.length;i++)
            		{ if($scope.fieldarrey[i].ItemID === ItemID)
            		{   var rulearr = $scope.fieldarrey[i];
            		}
            		}
            		$scope.rule_update = true;
            		$('#logic_panel_heading').text(rulearr.logic[0].displayname);
            		$('#logic_panel_body #first_row').hide();

//	                                    		---------------create rows of rule matrix----------------------------------------
            		for(var j=0; j<rulearr.logic.length; j++)
            		{
            			var domstr2 = '<div class="row logic_panel_row2" id="Rule'+j+'" style="position:relative">';
            			domstr2 = domstr2+'<span class="col-md-2" style="position:absolute; top:0%; right:-10px"><div class="col-md-6">';
            			domstr2 = domstr2+'<input id="score'+j+'" type="text" class="form-control score" maxlength="3" name="Score" style="display:block" value="'+rulearr.logic[j].score+'"/></div>';
            			domstr2 = domstr2+'<div class="col-md-6"><a id="'+j+'" class="delete-rule">&times;</a></div></span>';						
            			$('#logic_panel_body').append(domstr2);				   
            			FTypes = [],Fname=[],Dname =[];
            			create_Update_structure(j, 0 , rulearr.logic[j]);

            			idcount = idcount+1;
            		}
            		}//update rules ends


            		$scope.save_context = function(calltype)
            		{  $('#L_LoaderSpinner').show();
            		var newContext={'field': $scope.field_dropdown,'color':$scope.AttributeColor,'ItemID':$scope.ItemID, 'AtID':$scope.AtID};	
            		var count = $('select[id^="context_value"]').length;	
            		var newItem={'val':[]};
            		for(var i=0; i<count; i++)
            		{ newItem.val.push($('#context_value'+i+'').val());
            		}
            		$.extend(newContext,newItem);

            		if($scope.field_dropdown === undefined)//validate input
            		{
            			$scope.context_error = "Please Select Field Name";

            		}
            		$scope.close_context_panel();
            		if(calltype === 'Create')
            		{	 			$scope.context_error = "";
            		$http({ method : 'POST',
            			url : baseUrl+'CreateAdjustment',
            			params:{'INSTITUTION_ID':user.institutionID},
            			data : newContext,
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data) 
            				{if(data.Statuscode === 101)
            				{ 
            					$('#L_LoaderSpinner').hide();
            					generateItems(data, "Context_Create");
            				}
            				}).error(function(data)
            						{alert("We could not process your request......Please try later.")
            						});
            		}else if(calltype === 'Update')
            		{
            			$scope.context_error = "";
            			$http({ method : 'POST',
            				url : baseUrl+'UpdateAdjustment',
            				params:{'INSTITUTION_ID':user.institutionID},
            				data : newContext,
            				headers : {'Content-Type' : 'application/json'}
            			}).success(function(data) 
            					{if(data.Statuscode === 101)
            					{ 
            						$('#L_LoaderSpinner').hide();
            						generateItems(data, "Context_Update");
            					}
            					}).error(function(data)
            							{alert("We could not process your request......Please try later.")
            							});
            		}
            		};


            		function generateCategory(data)
            		{ for(var i=0; i<data.Data.length; i++)
            		{dataset.master.push(data.Data[i]);
            		}	
            		$scope.CatArray = dataset.master;
            		console.log($scope.CatArray);
            		$scope.load_attributes(1,$scope.CatArray[0].color,$scope.CatArray[0].CatID);

            		}

            		function generateAttribute(data)
            		{    var newItem = {'plan' : []};
            		for (var i = 0; i < dataset.master.length; i++) 
            		{ if (dataset.master[i].CatID == $scope.CatID) 
            		{   if (typeof dataset.master[i].plan == 'undefined')
            			$.extend(dataset.master[i],newItem);
            		for(var j=0;j<data.Data.length; j++)
            		{
            			dataset.master[i].plan.push(data.Data[j]);	
            		}
            		$scope.planarrey = dataset.master[i].plan;		
            		console.log("Plan array "+JSON.stringify($scope.planarrey));

            		$scope.load_field($scope.planarrey[0].name,$scope.planarrey[0].AtID);
            		}
            		}
            		}


            		//generic function for item list			   
            		function generateItems(data, calltype)
            		{    var newLogic = {'items' : []};
            		for (var i = 0; i < dataset.master.length; i++) 
            		{  if(dataset.master[i].CatID === $scope.CatID)
            		{for(var j=0;j < dataset.master[i].plan.length; j++)
            		{if (dataset.master[i].plan[j].AtID == $scope.AtID) 
            		{ if(calltype === "Logic_Create")
            		{  if ((typeof dataset.master[i].plan[j].items == "undefined"))
            		{$.extend(dataset.master[i].plan[j],newLogic);
            		}
            		for(var k=0; k<data.Data.length; k++)
            		{
            			dataset.master[i].plan[j].items.push(data.Data[k]);
            		}
            		}else if(calltype === "Logic_Update")
            		{ if ((typeof dataset.master[i].plan[j].items !== "undefined"))
            		{ 	for(var f=0;f<dataset.master[i].plan[j].items.length;f++)
            		{if(dataset.master[i].plan[j].items[f].ItemID === data.Data.ItemID)
            			dataset.master[i].plan[j].items[f].logic = data.Data.logic;
            		}
            		}
            		}else if(calltype === "Logic_Delete")
            		{ if ((typeof dataset.master[i].plan[j].items !== "undefined"))
            		{ 	for(var f=0;f<dataset.master[i].plan[j].items.length;f++)
            		{
            			if(dataset.master[i].plan[j].items[f].ItemID === data)
            				dataset.master[i].plan[j].items.splice(f,1);//remove that element from local cache JSON
            		}
            		}
            		}else if(calltype === "Weight_Update")
            		{ for(var k=0; k<dataset.master[i].plan[j].items.length; k++)
            		{ if (dataset.master[i].plan[j].items[k].ItemID == $scope.ItemID) 
            		{		 dataset.master[i].plan[j].items[k].weight = data.Data;									
            		break;													 
            		}
            		} 
            		}else if(calltype === "Context_Create")
            		{ var newContext = {'contextname' : []};
            		for(var k=0; k<dataset.master[i].plan[j].items.length; k++)
            		{ if (dataset.master[i].plan[j].items[k].ItemID == $scope.ItemID) 
            		{	if ((typeof dataset.master[i].plan[j].items[k].contextname == "undefined"))
            		{
            			$.extend(dataset.master[i].plan[j].items[k],newContext);
            		}
            		dataset.master[i].plan[j].items[k].contextname.push(data.Data);
            		break;													 
            		}
            		}							
            		}else if(calltype === "Context_Update")
            		{	for(var k=0; k<dataset.master[i].plan[j].items.length; k++)
            		{ if (dataset.master[i].plan[j].items[k].ItemID == $scope.ItemID) 
            		{for(var f=0; f<dataset.master[i].plan[j].items[k].contextname.length; f++)  
            		{	if (dataset.master[i].plan[j].items[k].contextname[f].field === data.Data.field)
            		{
            			dataset.master[i].plan[j].items[k].contextname[f] = data.Data;
            			break;
            		}
            		}
            		}
            		}							
            		}
            		$scope.fieldarrey = dataset.master[i].plan[j].items;
//	                                    		console.log(JSON.stringify($scope.fieldarrey));
            		}
            		}
            		}
            		}
            		}


            		//create new category 
            		$('body #add_master_rule_box').click(function() 
            				{
            			$('#master_rule_input_box').slideToggle();
            			mastercount = mastercount + 1;
            				});

            		$scope.create_master = function()
            		{   if($('#master_rule_input').val() != '')
            		{
            			$('#C_LoaderSpinner').show();
            			var colorcode = colorList[dataset.master.length+1];
            			if(typeof colorcode == 'undefined')
            			{ colorcode = '#607d8b';
            			}
            			var DataSet={
            					'TableID':$scope.ScoreTable,'name':$('#master_rule_input').val(),'color':colorcode,
            					'weight':$scope.cweight		
            			}
            			$('#master_rule_input_box').slideUp().hide();
            			$('#master_rule_input').val('');
            			$http({
            				method : 'POST',
            				url : baseUrl+'CreateCategory',
            				params : {'INSTITUTION_ID':user.institutionID},
            				data : DataSet,
            				headers : {'Content-Type' : 'application/json'}
            			}).success(function(data) 
            					{	if(data.StatusCode == 101)
            					{  $('#C_LoaderSpinner').hide();
            					generateCategory(data);
            					}
            					}).error(function(data)
            							{   $('#C_LoaderSpinner').hide();
            							alert("We could not process your request......Please try later.")
            							});
            			$scope.cweight = 1;
            			$('#main_error').text("").parent().slideUp();
            		}else{
            			$('#main_error').text("Please enter Category Name").parent().slideDown();
            		}
            		};

            		// function for set table value in policy screen
            		$scope.PolicyDRule = function(value)
            		{ 
            			console.log("In Policy Rule value "+value);
            			if((value == "Select")||(value == ""))
            			{	$scope.RuleDesc = "";
            			$scope.RuleType = "";
            			$scope.Rstatus = "";
            			$scope.RCreatedBy = "";
            			}else{
            				for(var obj in $scope.DList)
            				{
            					console.log("object value"+obj.value+"formal parameter"+value);
            					if(obj.value == value)
            					{$scope.RuleDesc = obj.name;
            					$scope.RuleType = "Type : "+ obj.type;
            					$scope.Rstatus = "Status : "+obj.status;
            					$scope.RCreatedBy = "Created By : "+obj.createdBy;
            					}}
            			}
            		};		
            		// function for set decision rule value in policy screen
            		$scope.PolicyTable = function(value)
            		{  if((value == "Select")||(value == ""))
            		{	$scope.TableDesc = "";
            		$scope.Tstatus = "";
            		$scope.TCreatedBy = "";
            		}else{
            			for(var obj in $scope.SList)
            			{ if(obj.value == value)
            			{$scope.TableDesc = obj.name;
            			$scope.Tstatus = "Status : "+obj.status;
            			$scope.TCreatedBy = "Created By : "+obj.createdBy;
            			}}
            		}
            		}

            		// function for create new down list
            		function bindlist(id, valuelist, value)
            		{
            			$('#'+id+' option:not(:first)').remove();
            			console.log("valuue list in bind list ().."+valuelist);
            			$.each(valuelist, function(val, text) 
            					{ if(value == text.value)
            						$('#'+id+'').append( $('<option selected="selected">').text(text.value).attr('value',text.value));
            					else 
            						$('#'+id+'').append( $('<option>').text(text.value).attr('value',text.value));
            					});
            		}

            		// function for set aggrigation table in policy screen
            		$scope.AggrigationLayout= function(list)
            		{	$scope.AggrList = list;
            		$("#aggr_table_body tr:not(:first)").remove();
            		for(var obj in list)
            		{  var domstr = '<tr><td>'+obj.name+'</td><td>'+obj.value+'</td><td class="hiden">';
            		domstr = domstr+'<a class="TC_Button DltAggr" id="'+obj.key+'">Delete</a></td></tr>';
            		$("#aggr_table_body").append(domstr);
            		}
            		}

            		//update exiting rules
            		$scope.UpdateScoringRules = function(ItemID)
            		{ 	 idcount = 0; 
            		$scope.Update_ItemID = ItemID;//use to update item rule
            		$('.item, #addScoreField').hide($('#logic_panel').slideDown());
            		for(var i=0; i<$scope.fieldarrey.length;i++)
            		{ if($scope.fieldarrey[i].ItemID === ItemID)
            		{   var rulearr = $scope.fieldarrey[i];
            		}
            		}
            		$scope.rule_update = true;
            		$('#logic_panel_heading').text(rulearr.logic[0].displayname);
            		$('#logic_panel_body #first_row').hide();
            		//---------------create rows of rule matrix----------------------------------------
            		for(var j=0; j<rulearr.logic.length; j++)
            		{
            			var domstr2 = '<div class="row logic_panel_row2" id="Rule'+j+'" style="position:relative">';
            			domstr2 = domstr2+'<span class="col-md-2" style="position:absolute; top:0%; right:-10px"><div class="col-md-6">';
            			domstr2 = domstr2+'<input id="score'+j+'" type="text" class="form-control score" maxlength="3" name="Score" style="display:block" value="'+rulearr.logic[j].score+'"/></div>';
            			domstr2 = domstr2+'<div class="col-md-6"><a id="'+j+'" class="delete-rule">&times;</a></div></span>';						
            			$('#logic_panel_body').append(domstr2);				   
            			FTypes = [],Fname=[],Dname =[];
            			create_Update_structure(j, 0 , rulearr.logic[j]);

            			idcount = idcount+1;
            		}	
            		}

            		function create_Update_structure(rowno, index, rule)
            		{       Fname.push(rule.fieldname);
            		Dname.push(rule.displayname);
            		var  domstr1 = '<span id="Field'+index+'" class="col-md-10">';
            		domstr1 = domstr1+'<div class="col-md-3 fname" style="margin:2px -10px 0px -17px">'+rule.displayname+'</div>';
            		domstr1 = domstr1+'<div class="col-md-3"><select id="condition'+rowno+index+'" class="form-control" name="Condition"></select></div>';
            		domstr1 = domstr1+'<div class="col-md-3"><input id="value1'+rowno+index+'" type="text" class="form-control" name="First Value" value="'+rule.val1+'"/></div>';
            		domstr1 = domstr1+'<div class="col-md-3"><input id="value2'+rowno+index+'" type="text" class="form-control" name="Second value" value="'+rule.val2+'"/></div></span>';
            		$("#Rule"+rowno).append(domstr1);
            		var Fid="#condition"+rowno+index;

            		if((rule.exp1 !== rule.exp2)&&(rule.val1 !== "")&&(rule.val2 !== ""))
            		{
            			var exprsn = rule.exp1=='>='? '<=':rulea[index].exp1 == '>'? '<':rule.exp1=='<='? '>=':rule.exp1=='<'? '>': '>';
            			getConditionOperator(exprsn, rule.exp2, Fid); // ---------------bind
            			// the
            			// operator
            			// to
            			// dropdown
            		}else{
            			getConditionOperator(rule.exp1, rule.exp2, Fid); // ---------------bind
            			// the
            			// operator
            			// to
            			// dropdown
            		}
//	                                    		--------------show ionput field which have value----------------
            		if((rule.val1 !== "")&&(rule.val2 !== ""))
            		{
            			$("#value1"+rowno+index+", #value2"+rowno+index+"").show();
            		}else if((rule.val1 === "")&&(rule.val2 !== "")){
            			$("#value1"+rowno+index+"").show().val(rule.val2);
            		}		 
            		if((rule.ref != 'undefined')&&(rule.ref.length != 0))
            		{
            			console.log(JSON.stringify(rule.ref[index]));
            			create_Update_structure(rowno, index+1, rule.ref[index]);
            		}
            		}

            		$(document.body).on('click', '.delete-rule', function()
            				{
            			$(this).parents('.logic_panel_row2').remove();
            				});

            		// bind value to drop down in expression
            		function Exp_Drop_Downs(id,list,value)
            		{
            			$.each(list, function(val, text) 
            					{
            				if((typeof value != 'undefined')&&(value == text.value))
            				{
            					$(id).append( $('<option selected="selected">').text(text.text).attr('value',text.value));
            				}else{
            					$(id).append( $('<option>').text(text.text).attr('value',text.value));
            				}
            					}); 
            		}

            		$scope.createRuleRow = function()
            		{		
            			console.log("Working");
            			add_new_rule(FTypes,ids);
            		}

            		// create new rule for field
            		function add_new_rule(val,id)
            		{   $("#rule_error").text("");
            		FTypes = [];			    
            		var fieldCount;
            		if((val.length == 0)||(typeof val == 'undefined'))
            		{   fieldCount = $('div[id^=Field_Container]').length;
            		Fname = [];
            		Dname = [];
            		for(var c=0; c<fieldCount; c++)
            		{
            			FTypes.push($("#logic_field"+c+" option:selected").val());
            			Fname.push($("#logic_IFF_file"+c+" option:selected").text()+"~"+$("#logic_field"+c+" option:selected").text());
            			Dname.push($("#logic_field"+c+" option:selected").attr("title"));
            		}
            		}else{
            			FTypes = val;
            			fieldCount = val.length;
            		}

            		if(validate_rules())
            		{var idcount = $(".logic_panel_row2").length;
            		if((idcount === "")||(typeof idcount == 'undefined'))
            		{
            			idcount = 0;
            		}
            		var domstr1 = '<div class="row logic_panel_row2" id="Rule'+idcount+'" style="position:relative">';
            		domstr1 = domstr1+'<span class="col-md-2" style="position:absolute; top:37%; right:10px;"><div class="col-md-6"><input id="score'+idcount+'" type="text" class="form-control score" maxlength="3" name="Score"/></div>';
            		domstr1 = domstr1+'<div class="col-md-6"><a id="'+idcount+'" class="delete-rule">&times;</a></div></span>';						
            		$('#logic_panel_body').append(domstr1);				   
            		for(var c=0; c<fieldCount; c++)
            		{
            			create_structure(idcount, FTypes[c], c);
            		}
            		}

            		};

            		function validate_rules()
            		{ var error;
            		$('#logic_panel_body :input').each(function() 
            				{ 
            			if($(this).is(':visible'))
            			{
            				var index = $(this).attr("id");
            				index = index.slice(-1);
            				if(($(this).val() == '') || ($(this).val == undefined))
            				{ $("#rule_error").text("Please enter value of "+$(this).attr('name')+" at row "+(++index)+"");
            				error = true;
            				return false;
            				}else if($(this[this.selectedIndex]).val()=="Select"){
            					$("#rule_error").text("Please Select Condition Expression");
            					error = true;
            					return false;
            				}else if($(this[this.selectedIndex]).val()=="Select")
            				{   $("#rule_error").text("Please Select Field Name");
            				error  = true;
            				return false;
            				}else{
            					$("#rule_error").text("");
            					error = false;
            				}
            			}
            				});				
            		if(error)
            		{return false;
            		}else{
            			return true;}
            		}

            		function create_structure(rowno, type, index)
            		{
            			var  domstr1 = '<span id="Field'+index+'" class="col-md-10">';
            			domstr1 = domstr1+'<div class="col-md-3 fname" style="margin:2px -10px 0px -17px">'+Dname[index]+'</div>';
            			domstr1 = domstr1+'<div class="col-md-3"><select id="condition'+rowno+index+'" class="form-control" name="Condition"></select></div>';
            			domstr1 = domstr1+'<div class="col-md-3"><input id="value1'+rowno+index+'" type="text" class="form-control" name="First Value"/></div>';
            			domstr1 = domstr1+'<div class="col-md-3"><input id="value2'+rowno+index+'" type="text" class="form-control" name="Second value"/></div></span>';
            			$("#Rule"+rowno).append(domstr1);
            			var id="#condition"+rowno+index;
            			if((type === 'Number') || (type === 'N'))
            			{   Exp_Drop_Downs(id,expressions.NumberExpression);
            			} else if((type === 'String') || (type === 'S'))
            			{Exp_Drop_Downs(id,expressions.StringExpression);				   			
            			} else if((type === 'Boolean') || (type === 'B'))
            			{Exp_Drop_Downs(id,expressions.BooleanExpression);				   			
            			} else if((type === 'Date') || (type === 'D'))
            			{Exp_Drop_Downs(id,expressions.DateExpression);
            			$('#value1'+rowno+index+', #value2'+rowno+index+'').datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2015", dateFormat: 'dd:mm:yy'});
            			}				 

            		}


            		// create new field items for selected attributes
//	                                    		$('body #addScoreField').click(function() 
            		$(document.body).on("click","#addScoreField",function()
            				{ if(attributeFlag)
            				{  $('.item').hide();
            				Update_Master("logic_IFF_file0");// call to recieve fields
            				$('#logic_panel').slideDown();				 
            				$('#logic_panel_heading').text($scope.logic_panel_name);
            				$(this).hide();	
            				}else{   $(this).parent().append("<span class='error_msg' style=\"position: relative;display:block;color:red;\">Please select Attribute!</span>");
            				$('.error_msg').hide(2000);
            				}	 
            				});

            		// select file in criteria panel rule row
            		/*
            		 * $(document.body).on('change', 'select[id^="IFF_File_first"],
            		 * select[id^="IFF_File_second"], select[id="aggr_file"]', function() {
            		 * $("#rule_error").text(""); var value =
            		 * $(this[this.selectedIndex]).val(); if(value != "Select File") {
            		 * //alert($(this).next().attr("id")); if($(this).next().attr("id") !=
            		 * undefined) Update_Rule_Field(value, $(this).next().attr("id")); else
            		 * Update_Rule_Field(value,
            		 * $(this).parent().next().children("select").attr("id")); } });
            		 */

            		// ---------------bind operator value to scoring field lavel
            		// rules----------------------------------------
            		function getConditionOperator(exp1, exp2, ID)
            		{
            			var brklp = false;
            			for(var key in expressions)
            			{ for(var k=0; k< expressions[key].length; k++)
            			{    // console.log(rulearr.logic[j].exp1+" :
            				// "+(rulearr.logic[j].exp1 == exp2));
            				if((exp1 != "")&&(exp1 == expressions[key][k].value))
            				{  if((exp1 === exp2)&&(exp1 == '<'))
            				{Exp_Drop_Downs(ID,expressions[key],'Between');}// ---------------select
            				// operaor
            				// for
            				// between
            				// condition
            				// from
            				// list
            				// and
            				// bind
            				// to
            				// dropdown
            				else if((exp1 == exp2)&&(exp1 == '>'))
            				{Exp_Drop_Downs(ID,expressions[key],'! Between');}// ---------------select
            				// operaor
            				// for
            				// !between
            				// condition
            				// from
            				// list
            				// and
            				// bind
            				// to
            				// dropdown
            				else
            				{Exp_Drop_Downs(ID,expressions[key],expressions[key][k].value);}// ---------------select
            				// operaor
            				// for
            				// other
            				// condition
            				// from
            				// list
            				// and
            				// bind
            				// to
            				// dropdown
            				FTypes.push(key.charAt(0));
            				brklp = true;
            				break;
            				}
            			}
            			if(brklp === false) // ---------------find second
            				// operator if frist operator is
            				// not found in list
            			{for(var k=0; k< expressions[key].length; k++)
            			{ if((exp2 != "")&&(exp2 == expressions[key][k].value))
            			{ if((exp1 == exp2)&&(exp1 == '>'))
            			{Exp_Drop_Downs(ID,expressions[key],'Between');}
            			else if((exp1 == exp2)&&(exp1 == '>'))
            			{Exp_Drop_Downs(ID,expressions[key],'! Between');}
            			else
            			{Exp_Drop_Downs(ID,expressions[key],expressions[key][k].value);}
            			FTypes.push(key.charAt(0));
            			brklp = true;
            			break;
            			}
            			}
            			}else if(brklp == true)
            			{	 break;}
            			}
            		}

            		//export xls
            	/*	$scope.exportToXl = function(data){
            			console.log("query :"+$scope.stores.length);
            			alasql('select * INTO XLSX("ScoreLog.xlsx",{headers:true}) FROM ?',[$scope.stores]); //HTML("#reportTable",{headers:true})
            			alasql('select * INTO CSV("ScoreLog.csv",{headers:true}) FROM ?',[$scope.stores]); 
            		}*/
            		
            		// build rule matrix json from logic panel
            		$scope.saveLogic = function(callType)
            		{
            			if(!validate_rules())
            			{
            				return false;
            			}
            			$('#L_LoaderSpinner').show();
            			var newmatrix={'logic':[],'AtID':$scope.AtID};
            			var firstcondition, secondconditcreate_structureion, j=-1, val1, val2, type, error=false;
            			var count = $('select[id^="condition"]').length;

            			$(".logic_panel_row2").each(function(index, element) 
            					{
            				var lastScore = $(this).prev().find('input[id^="score"]').val();
            				var curentScore = $(this).find('input[id^=score]').val();
            				newmatrix.logic.push({'score' : curentScore ,'operator':'&&'});
            				$("span[id^='Field']",$(this)).each(function(findex, element) 
            						{	var fname = Fname[findex];						
            						var dname = Dname[findex];								
            						if((FTypes[findex] !== 'undefined') && (typeof FTypes[findex] !== 'undefined') && (FTypes[findex] !== ''))
            						{ 
            							type = FTypes[findex];
            						}else{
            							type = $('#logic_field'+findex+' option:selected').val();
            						}

            						var condition = $(this).find('select[id^="condition"]').val();
            						var lastcondition = $(this).prev().find('select[id^="condition"]').val();			  
            						var value1 = $(this).find('input[id^="value1"]').val();
            						var value2 = $(this).find('input[id^="value2"]').val();

            						if((type === 'Number') || (type === 'N')) 
            						{ if(condition == "Between") 
            						{ firstcondition = '<';
            						secondcondition = '<';
            						val1 = value1;
            						val2 = value2;
            						} else if (condition == "! Between") 
            						{ firstcondition = '>';
            						secondcondition = '>';
            						val1 = value1;
            						val2 = value2;
            						} else if ((condition == '>') || (condition == '>=')) 
            						{ firstcondition = '';
            						secondcondition = condition;
            						val1 = '';
            						val2 = value1;
            						} else if ((condition == '<') || (condition == '<=')) 
            						{ firstcondition = '';
            						secondcondition = condition;
            						val1 = '';
            						val2 = value1;
            						} else if ((condition == '==') || (condition == '!=')) 
            						{	firstcondition = '';
            						secondcondition = condition;
            						val1 = '';
            						val2 = value1;
            						}
            						} else if ((type === 'String') || (type === 'S')) 
            						{ if (lastcondition === "is not") 
            						{
            							$("#rule_error").text("Please add condition 'is not' at last row");
            							error = true;
            							return false;
            						}else if (lastcondition === "!contains") 
            						{
            							$("#rule_error").text("Please add condition 'Does Not Contains' at last row");
            							error = true;
            							return false;
            						}else
            						{	firstcondition = '';
            						secondcondition = condition;
            						val1 = '';
            						val2 = value1;
            						}
            						} else if((type === 'Boolean') || (type === 'B')) 
            						{
            							if(lastcondition === 'is not')
            							{	$("#rule_error").text("Please add condition 'is not' at last row");
            							error= true;
            							return false;
            							}else
            							{ 	firstcondition = '';
            							secondcondition = condition;
            							val1 = '';
            							val2 = value1;
            							}
            						}else if ((type === 'Date') || (type === 'D')) 
            						{ if(lastcondition === 'is not')
            						{
            							$("#rule_error").text("Please add condition 'is not' at last row");
            							error = true;
            							return false;
            						}else if (condition === "Between") 
            						{  firstcondition = '<';
            						secondcondition = '<';
            						val1 = value1;
            						val2 = value2;
            						newmatrix.logic.pop(); // remove
            						// last
            						// condition
            						// for
            						// combined
            						// rule
            						} else if (condition === "! Between") 
            						{	firstcondition = '>';
            						secondcondition = '>';
            						val1 = value1;
            						val2 = value2;
            						newmatrix.logic.pop(); // remove
            						// last
            						// condition
            						// for
            						// combined
            						// rule
            						}else
            						{   firstcondition = '';
            						secondcondition = condition;
            						val1 = '';
            						val2 = value1;
            						}	
            						}// date condition end //create rule
            						// matrix in local cache variable
            						var rule = {'val1':val1, 'exp1':firstcondition, 'fieldname':fname, 'displayname':dname, 'exp2':secondcondition, 'val2':val2, 'operator':'','ref':[]};
            						if(findex === 0)
            						{
            							$.extend(newmatrix.logic[index],rule);
            						}else {										 
            							newmatrix.logic[index].operator = '&&';
            							newmatrix.logic[index].ref.push(rule);											
            						}
//	                                    						console.log(findex+" : "+JSON.stringify(newmatrix));
            						});
            					});						
            			if(error === false)
            			{/*
            						 $("#rule_error").text("");
            						 if((callType === 'Update')&& ($scope.Update_ItemID != undefined))
            							 {					 				 
            								$http({ method : 'POST',
            										url : '/AppScoringV2/api/ScoringV2/UpdateFieldRules',
            										params:{'INSTITUTION_ID':1001,'ItemID':$scope.Update_ItemID},
            										data : newmatrix,
            										headers : {'Content-Type' : 'application/json'}
            								}).success(function(data) 
            									 {	if(data.StatusCode == 101)
            										{generateItems(data, "Logic_Update");						    	 	
            								 		}	
            									 }).error(function(data)
            									    {alert("We could not process your request......Please try later.")
            										});							    
            							 }else if(callType === 'Create')
            							 {		 $http({method : 'POST',
            											url : '/AppScoringV2/api/ScoringV2/CreateFieldRules',
            											params:{'INSTITUTION_ID':1001},
            											data : JSON.stringify(newmatrix),
            											headers : {'Content-Type' : 'application/json'}
            							        	}).success(function(data) 
            								    		 {	if(data.StatusCode == 101)
            												{generateItems(data, "Logic_Create");						    	 	
            								    	 		}	
            								    		 }).error(function(data)
            											    {alert("We could not process your request......Please try later.")
            												});
            							 	}
            									$('#L_LoaderSpinner').hide();
            									close_logic_panel();
            			 */}

            		}


            		/*// close context panel and reset values
            	   $scope.close_context_panel = function()
            	    { 
            	 	   $scope.category_list.splice(1,$scope.category_list.length-1);
            	 	   $scope.category_dropdown = $scope.category_list[0];
            	 	   $scope.attribute_list.splice(1,$scope.attribute_list.lemgth-1);
            	 	   $scope.attribute_dropdown = $scope.attribute_list[0];
            	 	   $scope.field_list.splice(1,$scope.field_list.length-1);
            	 	   $scope.field_dropdown = $scope.field_list[0];
            	 	   $scope.update_context = false;
            	 	   $scope.hide_add_context_button =false;
            	 	   $scope.context_score_matrix = null;
            	 	   $('#context_panel, #context_panel_row2').hide();
            	 	   $('button[id=add_context], .item').slideDown();
            	    }*/



            		$scope.createcriteriaRule = function()
            		{  					 
            			var firstcondition, secondcondition, j=-1, val1, val2, type, error, value1, value2;
            			$(".criteria_rule_body:visible").each(function(index, mainelement) 
            					{	error = validate_criteriaRule($(this).attr("id"));
            					});
            			if($("#add-criteria-panel").is(':visible'))
            			{
            				if($("#criteria_name").val() == "")
            				{ error = false;$("#rule_error").text("Please Enter Criteria Name");}
            				else if($("#criteria_priority").val() == "")
            				{ error = false;$("#rule_error").text("Please Enter Criteria Priority");}

            				if(error == true) 
            				{ 
            					
            					var newmatrix={'ID':'001', 'name':$("#criteria_name").val(),'priority':$("#criteria_priority").val(),'rules':[]};							
            					$(".criteria_rule_body:visible").each(function(index, mainelement) 
            							{						
            						var outop = $(this).find("span[id^='OUTOp_Value']").attr("name");
            						if(typeof outop == 'undefined')									 
            						{   outop = '';}					  		  
            						$(".criteriaRules:visible",mainelement).each(function(findex, element) 
            								{// console.log($(this).attr("id"));
            							var rule =  create_criteria_rule(index, findex, element);
            							if(findex === 0)
            							{
            								$.extend(rule, {"OutOperator":"","ref":[]});
            								newmatrix.rules.push(rule);
            							}else {
            								newmatrix.rules[index].OutOperator = outop;
            								newmatrix.rules[index].ref.push(rule);											
            							}
            							// console.log(findex+" : "+JSON.stringify(newmatrix));
            								});
            							});
            					// console.log(JSON.stringify(newmatrix));
            					$scope.criteriaList.push(newmatrix);
            					criteria_panel_close();
            				}
            			}// block for panel end
            			else if($("#add-criteria-panel1").is(':visible'))
            			{
            				if(error == true) 
            				{ 
            					var newmatrix={'ID':'001', 'name':$("#criteria_name").val(),'priority':$("#criteria_priority").val(),'rules':[]};		
            					$(".criteria_rule_body:visible").each(function(index, mainelement) 
            							{ 	$(".criteriaRules:visible",mainelement).each(function(findex, element) 
            									{ 
            								var rule = create_criteria_rule(index, findex, element);
            								$scope.PcriteriaList.push(rule);
            									});
            							});
            					criteria_panel_close();
            				}
            			}
            		}// function end save

//	                                    		*********************************************************** End of Simulater *****************************************************
            //score log service
            		function getReportData(min, max)
            		{
            		$("#Loader").show();
            		$scope.reportList =[];
            		//sayali
            		if(user.institutionID == '4019'){
            			var json = {'sInstID':user.institutionID,'iSkip':min,'iLimit':max};
            			var URL = 'score-log';
            			RestService.saveToServer(URL,json).then(function(Response){
            				/*if(data.StatusCode === 101)
            				{*/
            				$("#Loader").hide(1000);
            				var points = Response;
            				points.sort(SortByDate);
            				function SortByDate(x,y) {
            					return ((x.date == y.date) ? 0 : ((x.date < y.date) ? 1 : -1 ));
            				}
//	                                    				console.log(points);
//	                                    				$timeout(function(){
            					$scope.reportList = points;
//	                                    					$scope.$apply();
//	                                    				});
            				
            				$scope.error = "";
            				if(min != 0)
            				{curr = min/10;}
            				else
            				{curr = min;}
            				$scope.min = min;
//	                                    				pagging($scope.reportList, data.length);
            				/*}else{
            					$scope.reportList=[];
            					$("#Loader").hide(2000);
            					$scope.error="Sorry we are unable generate your Reports...Please try later...!!!";
            				}*/
            			},function(error){
            				$("#Loader").hide();
            				$scope.reportList=null;
//	                                    				alert("We could not process your request......Please try later.");
            			});	
            			
            			/*$http({
	                                    				method : 'POST',
	                                    				url : URL+'/score-log',
	                                    				data : json,
	                                    				headers : {'Content-Type' : 'application/json'}
	                                    			}).success(function(data) 
	                                    				{      
	                                    				if(data.StatusCode === 101)
	                                    				{
	                                    				$("#Loader").hide(1000);
	                                    				var points = data;
	                                    				points.sort(SortByDate);
	                                    				function SortByDate(x,y) {
	                                    					return ((x.date == y.date) ? 0 : ((x.date < y.date) ? 1 : -1 ));
	                                    				}
	                                    				console.log("sorted : "+JSON.stringify(points));
//	                                    				$timeout(function(){
	                                    					$scope.reportList = points;
//	                                    					$scope.$apply();
//	                                    				});
	                                    				
	                                    				$scope.error = "";
	                                    				if(min != 0)
	                                    				{curr = min/10;}
	                                    				else
	                                    				{curr = min;}
	                                    				$scope.min = min;
//	                                    				pagging($scope.reportList, data.length);
	                                    				}else{
	                                    					$scope.reportList=[];
	                                    					$("#Loader").hide(2000);
	                                    					$scope.error="Sorry we are unable generate your Reports...Please try later...!!!";
	                                    				}

	                                    					}).error(function(data)
	                                    					{	$("#R_Loader").hide();
	                                    					$scope.reportList=null;
	                                    					alert("We could not process your request......Please try later.");
	                                    					});*/
            		}else{
            		$http({
            			method : 'GET',
            			url : baseUrl+'GetReports',
            			params : {'INSTITUTION_ID':user.institutionID, 'start':min, 'count':max, 'RType':'Live'},
            			headers : {'Content-Type' : 'application/json'}
            		}).success(function(data) 
            				{      
            			if(data.StatusCode === 101)
            			{ $("#Loader").hide(1000);
//	                                    			console.log(JSON.stringify(data.Data));
            			$scope.reportList = data.Data;
            			$scope.error = "";
            			if(min != 0)
            			{curr = min/10;}
            			else
            			{curr = min;}
            			$scope.min = min;
            			pagging($scope.reportList, data.total);
            			}else{
            				$scope.reportList=[];
            				$("#Loader").hide(2000);
            				$scope.error="Sorry we are unable generate your Reports...Please try later...!!!";
            			}

            				}).error(function(data)
            						{	$("#R_Loader").hide();
            						alert("We could not process your request......Please try later.");
            						});
            		}
            		}
            		function pagging(list, total)
            		{   
            		
            		var numItems = list.length;
            		var perPage;
            		//sayali
            		if(user.institutionID == '4019')
            		{ var pager = $("#pager1");
            		  $("#pager1").text("");
            		  perPage = parseInt($("#pagelimit1 option:selected").val());
            		  var tosize;
            		  if(($scope.min+perPage)<total){	  
            		    tosize= $scope.min+perPage;
            		  }else
            			  {
            			   tosize=total;
            			  }
            		  $scope.reportRange = ""+($scope.min+1)+" to "+total+".... of "+total+"";
            		}
            		else
            		{
            		  var pager = $("#pager");
            		  $("#pager").text("");
            		  perPage = parseInt($("#pagelimit option:selected").val());
            		  $scope.reportRange = ""+($scope.min+1)+" to "+($scope.min+parseInt($("#pagelimit option:selected").val()))+".... of "+total+"";
            		}
            		//
            		var numPages = Math.ceil(numItems/perPage);

            		$scope.reportList = list.slice(0, perPage);

            		$('<li><a href="#" aria-label="Previous" id="prev"> <span aria-hidden="true">&laquo;</span></a></li>').appendTo(pager);
            		while(numPages){
            			$('<li><a href="#" class="links">'+(curr+1)+'</a></li>').appendTo(pager);
            			numPages = numPages-1;
            			curr = curr+1;
            		}
            		$('<li><a href="#" aria-label="Next" id="next"> <span aria-hidden="true">&raquo;</span></a></li>').appendTo(pager);
            		pager.children().eq(1).addClass("active");

            		pager.find('li .links').click(function()
            				{
            			var clickedPage = parseInt($(this).parent().index()-1);
            			var pno = parseInt($(this).text())-1;
            			if(user.institutionID == '4019'){
            				$scope.reportRange = ""+((pno*parseInt($("#pagelimit1 option:selected").val()))+1)+" to "+((parseInt($("#pagelimit1 option:selected").val()))*(pno+1))+".... of "+total+"";
            			}else{
            				$scope.reportRange = ""+((pno*parseInt($("#pagelimit option:selected").val()))+1)+" to "+((parseInt($("#pagelimit option:selected").val()))*(pno+1))+".... of "+total+"";
            			}
            			goTo(clickedPage);
            			return false;
            				});
            		if(numItems < (perPage*numPages))
            		{
            			pager.find('li:last').addClass("disabled");
            			pager.find('li:last a').attr("onClick","return false");
            		}
            		if($scope.min == 0)
            		{
            			pager.find('li:first').addClass("disabled");
            			pager.find('li:last a').attr("onClick","return false");
            		}else{
            			pager.find('li:first').removeClass("disabled");
            			pager.find('li:last').removeClass("disabled");
            		}
            		pager.find('li #prev').click(function()
            				{
            			goTo(parseInt(current - 1));
            			if($scope.min != 0 && user.institutionID == '4019')
            			{	getReportData($scope.min-100,$scope.min-200); }
            			elseif($scope.min != 0)
            			{ pagging(list, total);
            			}
            			return false;
            				});
            		pager.find('li #next').click(function(){
            			goTo(parseInt(current + 1));
            			console.log("min : "+$scope.min);
            			if(total >= ($scope.min+100) && user.institutionID == '4019')
            			{	getReportData($scope.min+100, $scope.min+200); }
            			else if(total >= ($scope.min+100))
            			{ pagging(list, total); }
            			return false;
            		});
            		$(document.body).on('change', 'select[id="pagelimit"],select[id="pagelimit1"]', function()
            				{  	
            			$scope.reportList = list.slice(0,parseInt($(this[this.selectedIndex]).val()));
            			$scope.$apply();				   
            			curr = 0;
            			pagging(list, total);
            			return false;
            				});

            		function goTo(page){
            			startAt = page * perPage;
            			endOn = startAt + perPage;
            			$scope.$apply(function()
            					{
            				$scope.reportList = list.slice(startAt, endOn);
            					});

            			current = page;
            			pager.children().removeClass("active");
            			pager.children().eq(page+1).addClass("active");

            		}
            		}


            		$scope.draw_treeGraph = function(ccid)
            		{

            			for(var i=0; i<$scope.reportList.length; i++)
            			{
            				if($scope.reportList[i].CCID === ccid || $scope.reportList[i].APPLICATION_ID === ccid )
            				{
            					generateTree($scope.reportList[i].SCORE_JSON, $scope.reportList[i].VALUE_MAP);
            					break;
            				}
            			}
            		}
            		function generateTree(temp, ValueMap)
            		{  $("#graph, #scoreTree").text("");
            		var treeData=[];
            		var colors = ['#689f38','#EF3D16','#fb8c00','#8BC34A','#2196F3','#9C27B0','#bdbdbd','#009688','#ffc107','#689f38'];
            		try{
            			treeData.push({"name":"Application Score", "score":temp.AppScore, "color":"#2196F3", "children":[]});
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
            						var exp = field["expression"];
            						var dscore = field["dScore"];
            						var weight = field["weight"];
            						var fval = ValueMap[field.dField];


//	                                    						alert(JSON.stringify(fval));
            						treeData[0].children[i].children[j].children.push({"score":temp.Scores[i].Plans[0][j].Fields[0][k].score, "color":color,"dscore":dscore, "exp":exp, "weight":weight, "value":fval});
            					}
            				}
            			}
            		}catch(error)
            		{
            			console.log(error);
            			$scope.error = "Sorry we cant process this score tree";
            			return false;
            		}
            		console.log(JSON.stringify(treeData));
            		var margin = {top: 150,right: 150,bottom: 80,left: 120},
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
            		.append("g").attr("transform", "translate(" + width / 2 + "," + 30 + ")");

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

            		d3.select("#graph").style("height", "800px");

            		function update(source) {
//	                                    			Compute the new tree layout.
            			var nodes = tree.nodes(root).reverse(),
            			links = tree.links(nodes);
//	                                    			Normalize for fixed-depth.
            			nodes.forEach(function(d) {
            				d.y = d.depth * 120;
            			});


//	                                    			count no of chuldren
            			var levelWidth = [1];
            			var childCount = function(level, n) 
            			{  if (n.children && n.children.length > 0) {
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

//	                                    			increase height of graph with respect to depth
            if ((height > 100) && (levelWidth.length > depth)) {
            	height = height + 140;
            	depth = levelWidth.length;
            } else if (height < 100) {
            	height = 190;
            }
            //console.log(depth);

            $("#scoreTree").css("height", height);
            d3.select("svg").attr("height", height);


            //Update the nodes…
            var node = svg.selectAll("g.node").data(nodes, function(d) {
            	return d.id || (d.id = ++i);
            });

            var SVGmouseTip = d3.select("g.tooltip.mouse");
            //Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g").attr("class", "node")		
            .attr("transform", function(d) {
            	return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on("click", click).on("mouseout", function() {
            	$scope.fexpression = $scope.fscore = $scope.fweight ='';
            	$scope.$digest();
            })
            .on("mouseover", function(d) {
//	                                    	bind value with labels
            	if(!d.children)
            	{
            		$scope.fexpression = d.exp; // find function erturn the full string
            		$scope.fscore = d.dscore;
            		$scope.fweight = d.weight;
            		$scope.fvalue = d.value;
            		$scope.$digest();
            	}
            })
            .on('mousemove', function(d) {

            });


            nodeEnter.append("ellipse")
            .attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12)
            .style("fill", function(d) {
            	return d._children ? "lightsteelblue" : d.color;
            });

            nodeEnter.append("text").attr("y", function(d) {
            	return d.children || d._children ? -20 : 20;
            }).attr("dy", ".20em").attr("text-anchor", "middle")
            .text(function(d) {
            	return d.name;
            }).style("fill-opacity", 1);

            nodeEnter.append("text")  // append text
            .style("fill", "white")    // fill the text with the colour black
            .attr("dy", ".20em")    // set offset y position
            .attr("text-anchor", "middle")  // set anchor y justification
            .text(function(d) {
            	return d.score;
            });         


            //Transition nodes to their new position.
            var nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
            	return "translate(" + d.x + "," + d.y + ")";
            });

            var diagonal = d3.svg.diagonal().projection(function(d) {
            	return [d.x, d.y];
            });

            nodeUpdate.select("ellipse").attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12).style("fill", function(d) {
//	                                    	return  d.color;
            	return d._children ? "lightsteelblue" : d.color;
            });

            nodeUpdate.select("text").style("fill-opacity", 1);

            //Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) 
            		{
            	return "translate(" + source.x + "," + source.y + ")";
            		}).remove();

            nodeExit.select("ellipse").attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12);

            nodeExit.select("text").style("fill-opacity", 1e-6);

            //Update the links…
            var link = svg.selectAll("path.link")
            .data(links, function(d) {
            	return d.target.id;
            });

            //Enter any new links at the parent's previous position.
            link.enter().insert("path", "g").attr("class", "link").attr("d", diagonal);

            //Transition links to their new position.
            link.transition().duration(duration).attr("d", diagonal);

            //Transition exiting nodes to the parent's new position.
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
            }).remove();

            //Stash the old positions for transition.
            nodes.forEach(function(d) {
            	d.x0 = d.x;
            	d.y0 = d.y;
            });
            		}

//	                                    		Toggle children on click.
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

//	                                    		Redraw for zoom
            		function redraw() 
            		{     svg.attr("transform", "translate(" + d3.event.translate + ")");
            		}
            		}

            		// add new aggrigation field to AggrList
            		$scope.Add_Aggrigation = function()
            		{	
            			// alert("function"+$("#aggr_field option:selected").attr('title'));
            			$scope.AggrList.push({"key":$("#aggr_file").val()+"~"+$("#aggr_field option:selected").text(),
            				"name":$("#aggr_field option:selected").text(),"value":$("#aggr_operator").val()});
            			$scope.AggrigationLayout($scope.AggrList);// update aggrigation table
            			// layout
            			$("#Aggrigation_panel, #Edit_Aggrigation").slideToggle();
            			$("td.hiden, #Add_Aggrigation").hide();
            		};

            		$(document.body).on("click","a.DltAggr",function()
            				{ for(var i=0;i<$scope.AggrList.length;i++)
            				{if($scope.AggrList[i].key == $(this).attr("id"))
            				{$scope.AggrList.splice(i,1);
            				$scope.AggrigationLayout($scope.AggrList);// update
            				// aggrigation
            				// table layout
            				}
            				} 
            				});
            		$(document.body).on("click","img.report",function(){

            			var imgsrc = $(this).attr("src");
            			if(imgsrc=="images/score2.jpg")
            			{
            				$("#document_preview").attr("src","img/score.jpg");
            			}
            			else{
            				$("#document_preview").attr("src",imgsrc);
            			}
            		});

            		$(".btn-toggle").click(function(){
            			$(this).find('.btn').toggleClass('active');  	     
            			if ($(this).find('.btn-success').size()>0) {
            				$(this).find('.btn').toggleClass('btn-success');
            			}
            			$(this).find('.btn').toggleClass('btn-default');       

            			if($(this).find(".active").text()=="Rate")
            			{$scope.rate = true;
            			$scope.createColumn($scope.arr,$scope.Matrixcolor,"report","decision_matrix");
            			}else{
            				$scope.rate = false;
            				$scope.createColumn($scope.arr,$scope.Matrixcolor,"report","decision_matrix");
            			}
            		});

//	                                    		$('.btn-toggle').click(function() {

//	                                    		});

//	                                    		**************************************************Matrix Draw*****************************************************

            		$scope.BScoreList =  [ { "Code" : "A", "val1" : "", "fieldname" : "BScore", "exp1" : "", "val2" : "825", "exp2" : ">=" }, { "Code" : "B", "val1" : "800", "fieldname" : "BScore", "exp1" : "<", "val2" : "825", "exp2" : "<" }, 
            		                       { "Code" : "C", "val1" : "750", "fieldname" : "BScore", "exp1" : "<", "val2" : "800", "exp2" : "<" }, { "Code" : "D", "val1" : "650", "fieldname" : "BScore", "exp1" : "<", "val2" : "750", "exp2" : "<" }, 
            		                       { "Code" : "E", "val1" : "500", "fieldname" : "BScore", "exp1" : "<", "val2" : "650", "exp2" : "<" }, { "Code" : "F", "val1" : "", "fieldname" : "BScore", "exp1" : "", "val2" : "500", "exp2" : "<=" } ]; 
            		$scope.AScoreList =[ { "Code" : 1, "val1" : "", "fieldname" : "AScore", "exp1" : "", "val2" : "400", "exp2" : ">=" },
            		                     { "Code" : 2, "val1" : "300", "fieldname" : "AScore", "exp1" : "<", "val2" : "400", "exp2" : "<" }, { "Code" : 3, "val1" : "100", "fieldname" : "AScore", "exp1" : "<", "val2" : "300", "exp2" : "<" },
            		                     { "Code" : 4, "val1" : "50", "fieldname" : "AScore", "exp1" : "<", "val2" : "100", "exp2" : "<" }, { "Code" : 5, "val1" : "", "fieldname" : "AScore", "exp1" : "", "val2" : "50", "exp2" : "<=" } ];  
            		$scope.outcomeList = [ { "Key" : "1A", "value" : "Approve" }, { "Key" : "1B", "value" : "Approve" }, { "Key" : "1C", "value" : "Queue" }, 
            		                       { "Key" : "1D", "value" : "Queue" }, { "Key" : "1E", "value" : "Queue" }, { "Key" : "1F", "value" : "Decline" }, 
            		                       { "Key" : "2A", "value" : "Approve" }, { "Key" : "2B", "value" : "Approve" }, { "Key" : "2C", "value" : "Queue" }, 
            		                       { "Key" : "2D", "value" : "Queue" }, { "Key" : "2E", "value" : "Decline" }, { "Key" : "2F", "value" : "Decline" }, 
            		                       { "Key" : "3A", "value" : "Approve" }, { "Key" : "3B", "value" : "Queue" }, { "Key" : "3C", "value" : "Queue" },
            		                       { "Key" : "3D", "value" : "Decline" }, { "Key" : "3E", "value" : "Decline" }, { "Key" : "3F", "value" : "Decline" },
            		                       { "Key" : "4A", "value" : "Queue" }, { "Key" : "4B", "value" : "Queue" }, { "Key" : "4C", "value" : "Queue" }, 
            		                       { "Key" : "4D", "value" : "Decline" }, { "Key" : "4E", "value" : "Decline" }, { "Key" : "4F", "value" : "Decline" },
            		                       { "Key" : "5A", "value" : "Queue" }, { "Key" : "5B", "value" : "Queue" }, { "Key" : "5C", "value" : "Decline" }, 
            		                       { "Key" : "5D", "value" : "Decline" }, { "Key" : "5E", "value" : "Decline" }, { "Key" : "5F", "value" : "Decline" } ]; 


            		var fltrlist = [{"id":"F30","arr":[{"key":"1A","va1":"2.1%","val2":"4%"},{"key":"1B","va1":"3.5.%","val2":"6%"},{"key":"1C","va1":"2.4%","val2":"14%"},{"key":"1D","va1":"1.3%","val2":"12%"},{"key":"1E","va1":"0.7%","val2":"16%"},{"key":"1F","va1":"0.3%","val2":"13%"},{"key":"2A","va1":"3.6%","val2":"8%"},{"key":"2B","va1":"5.6%","val2":"11%"},{"key":"2C","va1":"3.4%","val2":"21%"},{"key":"2D","va1":"2.7%","val2":"22%"},{"key":"2E","va1":"2.1%","val2":"34%"},{"key":"2F","va1":"0.2%","val2":"38%"},{"key":"3A","va1":"4.2%","val2":"4%"},{"key":"3B","va1":"3.2%","val2":"12%"},{"key":"3C","va1":"4.7%","val2":"27%"},{"key":"3D","va1":"3.2%","val2":"31%"},{"key":"3E","va1":"3.6%","val2":"46%"},{"key":"3F","va1":"0.4%","val2":"35%"},{"key":"4A","va1":"3.7%","val2":"6%"},{"key":"4B","va1":"4.3%","val2":"17%"},{"key":"4C","va1":"3.2%","val2":"34%"},{"key":"4D","va1":"4.8%","val2":"37%"},{"key":"4E","va1":"4.9%","val2":"56%"},{"key":"4F","va1":"2.8%","val2":"45%"},{"key":"5A","va1":"1.9%","val2":"12%"},{"key":"5B","va1":"3.3%","val2":"21%"},{"key":"5C","va1":"2.9%","val2":"42%"},{"key":"5D","va1":"3.5%","val2":"48%"},{"key":"5E","va1":"2.3%","val2":"42%"},{"key":"5F","va1":"4.2%","val2":"64%"},{"key":"6A","va1":"0.8%","val2":"7%"},{"key":"6B","va1":"0.8%","val2":"28%"},{"key":"6C","va1":"0.9%","val2":"39%"},{"key":"6D","va1":"1.7%","val2":"32%"},{"key":"6E","va1":"3.2%","val2":"31%"},{"key":"6F","va1":"3.6%","val2":"28%"}]},
            		                {"id":"F60","arr": [{"key":"1A","va1":"1.8%","val2":"3.8%"}, {"key":"1B","va1":"3.1.%","val2":"5%"}, {"key":"1C","va1":"2.0%","val2":"13%"}, {"key":"1D","va1":"1.1%","val2":"11%"},
            		                                    {"key":"1E","va1":"0.5%","val2":"15.3%"}, {"key":"1F","va1":"0.1%","val2":"12.8%"},  {"key":"2A","va1":"3.3%","val2":"7%"}, {"key":"2B","va1":"5.1%","val2":"10.8%"},
            		                                    {"key":"2C","va1":"3.1%","val2":"20%"}, {"key":"2D","va1":"2.0%","val2":"21%"}, {"key":"2E","va1":"1.8%","val2":"33%"}, {"key":"2F","va1":"0.1%","val2":"37%"},
            		                                    {"key":"3A","va1":"3.6%","val2":"3.7%"}, {"key":"3B","va1":"3.0%","val2":"11.7%"}, {"key":"3C","va1":"4.3%","val2":"26.8%"}, {"key":"3D","va1":"3.1%","val2":"30%"},
            		                                    {"key":"3E","va1":"3.4%","val2":"45.8%"}, {"key":"3F","va1":"0.2%","val2":"34%"},  {"key":"4A","va1":"3.5%","val2":"5%"}, {"key":"4B","va1":"4.1%","val2":"16.7%"},
            		                                    {"key":"4C","va1":"3.0%","val2":"33.4%"}, {"key":"4D","va1":"4.5%","val2":"36.4%"}, {"key":"4E","va1":"4.4%","val2":"55.3%"}, {"key":"4F","va1":"2.3%","val2":"44%"},
            		                                    {"key":"5A","va1":"1.5%","val2":"11.4%"}, {"key":"5B","va1":"3.0%","val2":"20.2%"}, {"key":"5C","va1":"2.5%","val2":"41.2%"}, {"key":"5D","va1":"3.1%","val2":"47.2%"},
            		                                    {"key":"5E","va1":"2.1%","val2":"41%"}, {"key":"5F","va1":"4.0%","val2":"63.5%"},  {"key":"6A","va1":"0.5%","val2":"6.3%"}, {"key":"6B","va1":"0.4%","val2":"27.4%"},
            		                                    {"key":"6C","va1":"0.4%","val2":"38.4%"}, {"key":"6D","va1":"1.2%","val2":"31%"}, {"key":"6E","va1":"3.0%","val2":"30.2%"}, {"key":"6F","va1":"3.2%","val2":"27.3%"}]},
            		                                    {"id":"F90","arr":[ {"key":"1A","va1":"1.5%","val2":"3.5%"}, {"key":"1B","va1":"2.8%","val2":"4.7%"}, {"key":"1C","va1":"1.7","val2":"12.5%"}, {"key":"1D","va1":"1.0%","val2":"10.2%"}, {"key":"1E","va1":"0.4%","val2":"15%"}, {"key":"1F","va1":"0%","val2":"12.5%"},
            		                                                        {"key":"2A","va1":"3.1%","val2":"6.3%"}, {"key":"2B","va1":"4.6%","val2":"10.5%"}, {"key":"2C","va1":"3%","val2":"19.5%"},
            		                                                        {"key":"2D","va1":"1.4%","val2":"20.2%"}, {"key":"2E","va1":"1.2%","val2":"32.3%"}, {"key":"2F","va1":"0%","val2":"36.2%"},
            		                                                        {"key":"3A","va1":"3.1%","val2":"3.2%"}, {"key":"3B","va1":"2.7%","val2":"11.1%"}, {"key":"3C","va1":"4%","val2":"26.2%"},
            		                                                        {"key":"3D","va1":"2.5%","val2":"29.3%"}, {"key":"3E","va1":"3.1%","val2":"45.3%"}, {"key":"3F","va1":"0.05%","val2":"33.4%"},
            		                                                        {"key":"4A","va1":"3.3%","val2":"4.6%"}, {"key":"4B","va1":"3.6%","val2":"16.1%"}, {"key":"4C","va1":"2.4%","val2":"33.1%"},
            		                                                        {"key":"4D","va1":"4.1%","val2":"36.1%"}, {"key":"4E","va1":"4.1%","val2":"55.1%"}, {"key":"4F","va1":"1.4%","val2":"43.2%"},
            		                                                        {"key":"5A","va1":"1%","val2":"11%"}, {"key":"5B","va1":"2.4%","val2":"19.7%"}, {"key":"5C","va1":"2.1%","val2":"40.8%"},
            		                                                        {"key":"5D","va1":"2.1%","val2":"46.2%"}, {"key":"5E","va1":"1.6%","val2":"40.3%"}, {"key":"5F","va1":"3.3%","val2":"63%"},
            		                                                        {"key":"6A","va1":"0.1%","val2":"6%"}, {"key":"6B","va1":"0.2%","val2":"27%"}, {"key":"6C","va1":"0.1%","val2":"37.4%"},
            		                                                        {"key":"6D","va1":"0.7%","val2":"30.7%"}, {"key":"6E","va1":"2.5%","val2":"29.6%"}, {"key":"6F","va1":"2.8%","val2":"27%"} ]}];	


            		$scope.MFieldCode;

            		//create new column to matrix at every transaction	
            		$scope.createColumn = function(valuearray,color,calltype,id)
            		{   id = '#'+id+'';
            		//console.log("AscoreList  :"+$scope.AScoreList+"BscoreList"+$scope.BScoreList);
            		try{
            			$(""+id+" #MatrixAScore th").remove();
            			$(""+id+" #MatrixBScore tr:not(:first)").remove();
            			var domstr = '<th style="border: 1px solid white;"></th>';
            			$(""+id+" #MatrixAScore").append(domstr);
            			if((typeof $scope.BScoreList != 'undefined')&&($scope.BScoreList.length != 0))
            			{
            				for(var i=0; i<$scope.BScoreList.length; i++)
            				{
            					var domstr = '<th style="background-color: #C8E4FE">'+$scope.BScoreList[i].Code+'</th>';
            					$(""+id+" #MatrixAScore").append(domstr);
            				}
            			}else if(($scope.AScoreList.length == 0)&&($scope.BScoreList.length == 0))
            			{
            				$(''+id+'#MatrixAScore').append('<th>Please Define Decision Condition</th>');	
            			}
            			if((typeof $scope.AScoreList != 'undefined')&&($scope.AScoreList.length != 0))
            			{
            				for(var j=0;j<$scope.AScoreList.length; j++)
            				{ var domstr='<tr id="row'+$scope.AScoreList[j].Code+'"><th style="background-color: #DDD; width:35px;">'+$scope.AScoreList[j].Code+'</th>';
            				domstr=domstr+'</tr>';
            				$(""+id+" #MatrixBScore").append(domstr); 
            				for(var i=0; i<$scope.BScoreList.length;i++)
            				{					 
            					domstr='<th id="col'+$scope.AScoreList[j].Code+$scope.BScoreList[i].Code+'">';
            					if(calltype == "decision")
            					{
            						domstr=domstr+'<select class="trans-select" id="OutCome'+$scope.AScoreList[j].Code+$scope.BScoreList[i].Code+'" name="'+$scope.AScoreList[j].Code+'" title="'+$scope.BScoreList[i].Code+'"></select>';}
            					else if(calltype == "report")
            					{
            						domstr=domstr+'<span class="inline-control lft"></span><span class="inline-control rght hiden"></span></th>';}

            					$(""+id+" #row"+$scope.AScoreList[j].Code+"").append(domstr);
            					generate($scope.AScoreList[j].Code+""+$scope.BScoreList[i].Code,valuearray,calltype);
            				}
            				}
            			}
//	                                    			$(".rght").css("background-color",color);
            			if($scope.rate == true && (calltype == "report"))
            			{   $(".rght").css("background-color",color);
            			$(".rght").show();
            			}
            		}catch(error)
            		{
            			console.log(error);
            		}
            		}
            		//change outcoe of selected condition    
            		$(document.body).on('change', 'select[id^="OutCome"]', function()
            				{ 
            			var option=this.value;
            			//	var id=.attr("id");
            			//	alert(id); 
            			switch(option)
            			{
            			case "Queue":
            				$(this).parent().css({"background-color":$scope.OutputList[2].color});
            				break;
            			case "Approve":
            				$(this).parent().css({"background-color":$scope.OutputList[0].color});

            				break;
            			case "Decline":
            				$(this).parent().css({"background-color":$scope.OutputList[1].color});

            				break;

            			}

            				});

            		$(document.body).on("click","#BScoreSim, #AScoreSim",function(){
            			MField = $(this).attr("id");
            			// alert(MField);
            			$(this).toggleClass("glyphicon-plus glyphicon-minus");
            			$scope.Open_Add_panel(MField,null);
            		});

            		//open BScore And Ascore add panel in matrix container    
            		$scope.Open_Add_panel = function(field, id)
            		{	
            			// alert("field"+field);
            			MField = field;

            			if(field == "AScoreSim")
            			{
            				$("#BScore-blockSim").hide();
            				if($scope.AScoreList.length == 0)
            					$scope.MFieldCode = 1;
            				else{

            					/*var charCode = $scope.AScoreList[$scope.AScoreList.length-1].Code+1);
            					 */
            					$scope.MFieldCode = parseInt($scope.AScoreList[$scope.AScoreList.length-1].Code+1);
            					//alert($scope.MFieldCode);
            				}
            			}else if(field == "BScoreSim"){
            				$("#AScore-blockSim").hide();
            				//console.log("value : "+$scope.BScoreList[$scope.BScoreList.length-1].Code);
            				//console.log("charcode : "+parseInt($scope.BScoreList[$scope.BScoreList.length-1].Code.charCodeAt(0)+1));
            				if($scope.BScoreList.length == 0)
            					$scope.MFieldCode = 'A';
            				else{
            					console.log("$scope.BScoreList"+JSON.stringify($scope.BScoreList));
            					var charCode = parseInt($scope.BScoreList[$scope.BScoreList.length-1].Code.charCodeAt(0)+1);
            					//	alert(charcode);
            					$scope.MFieldCode = String.fromCharCode(charCode);
            				}
            			}
            			// 	alert(id);
            			if(id != null)
            			{
            				$("#add-matrixField-panel input").val("").hide();
            			}
            			if((id != null)&&(field == "AScoreSim"))
            			{ 
            				//		alert("In Condition" +id);	
            				$scope.UpdateFlag = true;
            				for(var obj in $scope.AScoreList)
            				{
            					console.log("Ascorelist"+JSON.stringify($scope.AScoreList));
            					if(obj.Code == id)
            					{
            						$scope.MFieldCode = obj.Code;
            						if((obj.exp1 != '')&&(obj.exp2 != ''))
            						{
            							$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
            							$timeout(function(){
            								$("#MFValue1Sim").show().val(obj.val1);
            								$("#MFValue2Sim").show().val(obj.val2);
            							});
            							break;
            						}
            						else
            							$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
            						$("#MFValue1Sim").show().val(obj.val2);
            					}
            				}
            			}else if((id != null)&&(field == "BScoreSim"))
            			{$scope.UpdateFlag = true;
            			for(var obj in $scope.BScoreList)
            			{
            				if(obj.Code == id)
            				{
            					$scope.MFieldCode = obj.Code;
            					if((obj.exp1 != '')&&(obj.exp2 != ''))
            					{
            						$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
            						$timeout(function(){
            							$("#MFValue1Sim").show().val(obj.val1);
            							$("#MFValue2Sim").show().val(obj.val2);
            						});
            						break;
            					}
            					else
            						$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
            					$("#MFValue1Sim").show().val(obj.val2);
            				}
            			}
            			}
            			//alert($scope.MFieldCode);
            			$("#MFieldCodeSim").text($scope.MFieldCode);
            			$("#add-matrixField-panelSim").show();
            		}

            		$scope.CloseFieldPanel = function()
            		{    $("#BScoreSim , #AScoreSim").removeClass("glyphicon-minus").addClass("glyphicon-plus"); // 
            		$("#add-matrixField-panelSim").hide();
            		$("#add-matrixField-panelSim input").val("").hide();
            		$("#AScore-blockSim, #BScore-blockSim").show();    
            		$timeout(function(){$scope.Expression = $scope.ExpressionList[0];
            		$scope.error = '';
            		$scope.UpdateFlag = false;
            		});
            		};

            		$scope.ExpressionList = expressions.NumberExpression;

            		// create and save new matrix condotion in matrix container 


            		$scope.add_MField = function(calltype)
            		{	
            			/* var flag=false;
            		    	 console.log("Ascorelist:.. "+JSON.stringify($scope.AScoreList)+"BscoreList:..."+JSON.stringify($scope.BScoreList));
            		    	 switch(MField)
            		    	 {
            		    	 case "AScoreSim":
            		    			for(var i=0;i<$scope.AScoreList.length;i++)
            		    	 add_MField		{
            		    	 		if(($scope.AScoreList[i].exp1=='>'&& $scope.AScoreList[i].exp2== '>')&&($scope.Expression.value =='! Between'))
            		    	 		{
            		    	 			alert("Please Update the Application Score Rule :"+$scope.AScoreList[i].Code );
            		    	 			flag=true;
            		    	 			break;
            		    	 		}
            		    	 		else if(($scope.AScoreList[i].exp1==''&& $scope.AScoreList[i].exp2== $scope.Expression.value ))
            		    	 		{
            		    	 			alert("Please Update the Application Score Rule :"+$scope.AScoreList[i].Code );
            		    	 			flag=true;
            		    	 			break;
            		    	 		}

            		    	 		else if(($scope.AScoreList[i].exp1=='<'&& $scope.AScoreList[i].exp2== '<')&&($scope.Expression.value== 'Between'))
            		    	 		{
            		    	 			alert("Please Update the Application Score Rule :"+$scope.AScoreList[i].Code );
            		    	 			flag=true;
            		    	 			break;
            		    	 		}
            		    	 	}

            		    		 break;
            		    	 case "BScoreSim":
            		    				for(var i=0;i<$scope.BScoreList.length;i++)
            		    		 		{
            		    		 		if(($scope.BScoreList[i].exp1=='>'&& $scope.BScoreList[i].exp2== '>')&&($scope.Expression.value =='! Between'))
            		    		 		{
            		    		 			alert("Please Update the Bureau Score Rule :"+$scope.BScoreList[i].Code );
            		    		 			flag=true;
            		    		 			break;
            		    		 		}
            		    		 		else if(($scope.BScoreList[i].exp1==''&& $scope.BScoreList[i].exp2== $scope.Expression.value ))
            		    		 		{
            		    		 			alert("Please Update the Bureau Score Rule :"+$scope.BScoreList[i].Code );
            		    		 			flag=true;
            		    		 			break;
            		    		 		}

            		    		 		else if(($scope.BScoreList[i].exp1=='<'&& $scope.BScoreList[i].exp2== '<')&&($scope.Expression.value== 'Between'))
            		    		 		{
            		    		 			alert("Please Update the Bureau Score Rule :"+$scope.BScoreList[i].Code );
            		    		 			flag=true;
            		    		 			break;
            		    		 		}
            		    		 	}

            		    		 break;
            		    	 }


            			 */ 	

//	                                    			if(validate_input()  )
//	                                    			{
            			if(calltype == "add")
            			{
            				var value1 = $("#MFValue1Sim").val();
            				var value2 = $("#MFValue2Sim").val();
            				//alert(value1);
            				var firstcondition, secondcondition;
            				if($scope.Expression.value  == "Between") 
            				{ firstcondition = '<';
            				secondcondition = '<';
            				val1 = value1;
            				val2 = value2;
            				} else if ($scope.Expression.value  == "! Between") 
            				{ firstcondition = '>';
            				secondcondition = '>';
            				val1 = value1;
            				val2 = value2;
            				} else if (($scope.Expression.value  == '>') || ($scope.Expression.value  == '>=')) 
            				{ firstcondition = '';
            				secondcondition = $scope.Expression.value ;
            				val1 = '';
            				val2 = value1;
            				} else if (($scope.Expression.value  == '<') || ($scope.Expression.value  == '<=')) 
            				{ firstcondition = '';
            				secondcondition = $scope.Expression.value ;
            				val1 = '';
            				val2 = value1;
            				} else if (($scope.Expression.value  == '==') || ($scope.Expression.value  == '!=')) 
            				{	firstcondition = '';
            				secondcondition = $scope.Expression.value ;
            				val1 = '';
            				val2 = value1;
            				}
            				var data = {'Code':$scope.MFieldCode , 'val1':val1,'exp1':firstcondition,'fieldname':MField,'exp2':secondcondition,'val2':val2};
//	                                    				if(data.StatusCode === 101)
//	                                    				{ 
            				$('#T_LoaderSpinner').hide();
//	                                    				console.log("Data in Mfield"+JSON.stringify(data));
            				if(MField == "AScoreSim")
            				{ 
            					$scope.AScoreList.push(data);
            				}else if(MField == "BScoreSim")
            				{ $scope.BScoreList.push(data);
            				}
            				// alert($scope.MFieldCode );
            				console.log("AscoreList data after Push :"+JSON.stringify($scope.AScoreList)+"BscoreList data after Push :"+JSON.stringify($scope.BScoreList));
            				$scope.createColumn();
            				//	}
            				/*else
            		   		 	alert("Error Ocurred....Please try later.");*/
            				//$http({ method : 'POST',
            				//	url : '/AppScoringV2/api/ScoringV2/DecisionRules',
            				//	params:{'INSTITUTION_ID':user.institutionID,'RuleID':$scope.Rule,'RType':'Matrix','FType':MField,'CType':'Create'},
            				//	data : data,
            				//	headers : {'Content-Type' : 'application/json'}
            				//}).success(function(data) 
            				//{
            				//}).error(function(data)
            				/*		{
            		   			 $('#T_LoaderSpinner').hide();
            		   			 alert("We could not process your request......Please try later.");
            		   			});*/
            			}else if((MField == "BScoreSim") && (calltype == 'delete'))
            			{
            				$scope.BScoreList = $.grep($scope.BScoreList, function(e) { return e.Code != $scope.MFieldCode});
            				$scope.createColumn();
            			}else if((MField == "AScoreSim") && (calltype == "delete"))
            			{	    $scope.AScoreList = $.grep($scope.AScoreList, function(e) { return e.Code != $scope.MFieldCode});
            			$scope.createColumn();
            			}
            			else if((MField == "AScoreSim") && (calltype == 'update'))
            			{  data.Code = $scope.MFieldCode;
            			for(var i=0; i<$scope.AScoreList.length; i++)
            			{
            				if($scope.AScoreList[i].Code == data.Code)
            				{ data.ID = $scope.AScoreList[i].ID;
            				$scope.AScoreList[i] = data;
            				}
            			}
            			}
//	                                    			}else if(calltype == "add"){
//	                                    			data.Code = $scope.MFieldCode;
//	                                    			data.ID = parseInt($scope.AScoreList[$scope.AScoreList.length-1].ID+1);
//	                                    			$scope.AScoreList.push(data);
//	                                    			$scope.createColumn();
//	                                    			}else if(calltype == "delete"){
//	                                    			$scope.AScoreList = $.grep($scope.AScoreList, function(e) { return e.Code != $scope.MFieldCode});
//	                                    			$scope.createColumn();
//	                                    			}
//	                                    			}else if(MField == "BScore")
//	                                    			{	    			

//	                                    			if(calltype == "update")
//	                                    			{data.Code = $scope.MFieldCode;
//	                                    			for(var i=0; i<$scope.BScoreList.length; i++)
//	                                    			{
//	                                    			if($scope.BScoreList[i].Code == data.Code)
//	                                    			{
//	                                    			data.ID = $scope.BScoreList[i].ID;
//	                                    			$scope.BScoreList[i] = data;
//	                                    			}
//	                                    			}
//	                                    			}else if(calltype == "add"){
//	                                    			data.Code = $scope.MFieldCode;
//	                                    			data.ID = parseInt($scope.BScoreList[$scope.BScoreList.length-1].ID+1);
//	                                    			$scope.BScoreList.push(data);
//	                                    			$scope.createColumn();
//	                                    			}else if(calltype == "delete"){
//	                                    			$scope.BScoreList = $.grep($scope.BScoreList, function(e) { return e.Code != $scope.MFieldCode});
//	                                    			$scope.createColumn();
//	                                    			}
//	                                    			}
//	                                    			alert(JSON.stringify($scope.BScoreList)+"Data"+JSON.stringify(data));
            			//alert(MField+calltype );
            			$scope.CloseFieldPanel();
            			//}
            		}


            		// validate input for add matrix column    
            		function validate_input()
            		{	var error=false;
            		$('input:visible, select', '#add-matrixField-panelSim').each(function(index, ele)
            				{  
            			if(($(this).val() == "")||($(this).val() == 'undefined'))
            			{	$scope.error = "Please Enter "+$(this).attr("name")+"";
            			error =true;
            			return false;
            			}else if($(this).val() == "Select")
            			{
            				$scope.error = "Please Select "+$(this).attr("name")+"";
            				error =true;
            				return false;
            			}
            				}); 
            		if(error)
            		{ return false;}
            		else
            		{ return true;}
            		}


            		// expresson change in add matrix column or BScore and Ascore   
            		$scope.Expression_change = function()
            		{
            			if($scope.Expression.value == "Select")
            			{
            				$("#MFValue1Sim, #MFValue2Sim").slideUp().val("");
            			}else if(($scope.Expression.value == 'Between')||($scope.Expression.value == '! Between')){
            				$("#MFValue1Sim, #MFValue2Sim").slideDown().val("");
            			}else{
            				$("#MFValue2Sim").hide().val("");
            				$("#MFValue1Sim").slideDown().val("");
            			}
            		}

            		function getConditionOperatorValue(exp1, exp2)
            		{
            			var brklp = false;
            			for(var key in expressions)
            			{ for(var k=0; k< expressions[key].length; k++)
            			{    
            				if((exp1 === exp2)&&(exp1 == '<'))
            				{return expressions[key][7];}//---------------select operaor for between condition from list and bind to dropdown
            				else if((exp1 == exp2)&&(exp1 == '>'))
            				{return expressions[key][8];}//---------------select operaor for !between condition from list and bind to dropdown
            				else if(exp2 == expressions[key][k].value)
            				{return expressions[key][k];}//---------------select operaor for other condition from list and bind to dropdown
            			}

            			}
            		}

//	                                    		================================================matrix==============================

            		$(".btnfltr").click(function(){

            			$scope.Matrixcolor = $(this).css("background-color");
            			change_value($(this).attr("id"),$scope.Matrixcolor);
            		});

            		function change_value(id,color)
            		{$scope.arr = []
            		for( var i=0;i<fltrlist.length;i++)
            		{
            			if(fltrlist[i]["id"]== id)
            			{
            				$scope.arr=fltrlist[i]["arr"];
            				$scope.createColumn($scope.arr,color,"report","decision_matrix");
            				break;				 
            			}
            		}
            		}


//	                                    		=====================================================================================	
            		//create and bind option value to select elemtn in matrix	
            		function generate(ids,valuearray,calltype)
            		{ 
            			// alert(calltype);
            			if(calltype == "decision")
            				var id = "#OutCome"+ids;
            			else if(calltype == "report")
            				var id = "#col"+ids;
            			if($scope.ViewMode == true)
            			{
            				$(id).attr("disabled","disabled");
            			}
            			var action = false;
            			for(var obj in $scope.outcomeList)
            			{
            				if(obj.Key === ids)
            				{				  
            					action = obj.value;
            					break;
            				}
            			}

            			$.each($scope.OutputList, function(index, text) 
            					{	if(calltype == "decision")
            					{ if(action == text.value)
            					{  $(id).parent().css("background-color",text.color);
            					$(id).append( $('<option selected="selected">').text(text.value).attr('value',text.value));
            					}
            					else if((text.value == "Queue") && (action == false))
            					{ $(id).parent().css("background-color",text.color);
            					$(id).append( $('<option selected="selected">').text(text.value).attr('value',text.value));
            					}else{
            						$(id).append( $('<option>').text(text.value).attr('value',text.value));
            					}
            					}else if(calltype == "report")  
            					{  if(action == text.value)
            					{  $(id).css("background-color",text.color);

            					$.each(valuearray, function(index, text) 
            							{if(text.key == ids)	
            							{$(id).find(".lft").text(text.va1);
            							$(id).find(".rght").text(text.val2);
            							return false;
            							}
            							});
            					return;
            					}
            					}
            					}); 
            		}
            		/*		 $("#view_profile").click(function(){
            				$('div[contextmenu="blur"]').hide();
            				$("#UserContainer").show();
            				$http({
            					method : 'POST',
            					url : '/GoNoGoV3/api/GoNoGoV3/UserProfile',
            					params:{'userid':$scope.userid,'INSTITUTION_ID':user.institutionID},
            					headers : {	'Content-Type' : 'application/json'}
            				}).success(function(Response) 
            				 {if(Response.StatusCode == 101)
            					{$scope.Profile = Response.Data;
            					console.log(JSON.stringify($scope.Profile));
            					 $scope.error = "";
            					}
            				}).error(function(data){
            					$scope.error = "System is under maintenance..Please try later";
            				});
            			});
            			$(document.body).on("click","#UserBack",function(){
            				$('div[contextmenu="blur"]').show();
            				$("#UserContainer").hide();
            			});
            		 */			
            		/*$(document.body).on("click","spy",function(){
            				alert("Working...");
            			 	$("#in").show();*/
            		$("#spy").click(function(){
//	                                    			alert("Working...");
            			$("#in").show();

            		});	 

            	}
            	
            }]);

 app.controller("imagesCtr",['$scope', 'ImageFeed','$uibModalInstance','$timeout','RestService',
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

    $scope.approveImg = function(index){return false;}

    $scope.rejectImg = function(index){return false;}

    $scope.closeModal = function(){
          $uibModalInstance.dismiss($scope.slides);
    };

}]);

	


	app.controller("CustomReportController", [ '$scope','$log','$uibModalInstance' ,'RestService', 'ReportStorage','data',function($scope,$log,$uibModalInstance,RestService,ReportStorage,data){

		/*$log.log(_.each(data.oColumns,function(value,key){console.log(value);}));*/


		$scope.models = [
	        {listName: "Available", items: data.oColumns, dragging: false},
      		{listName: "Selected", items: data.oColumns, dragging: false}	
	        
	    ];

        $scope.getReportConfiguration = function(viewValue){
            RestService.saveToServer('report/reports',{"reportName":viewValue}).then(function(data){
                console.log(data);
            })
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
	      angular.forEach(items, function(item) { item.selected = false; });
	      list.items = list.items.slice(0, index)
	                  .concat(items)
	                  .concat(list.items.slice(index));
	      return true;
	    }

	    $scope.onMoved = function(list) {
	      list.items = list.items.filter(function(item) { return !item.selected; });
	    };

	    
	    
	    $scope.$watch('models', function(model) {
	        $scope.modelAsJson = angular.toJson(model, true);
	    }, true);

		$scope.ok = function () {
	    	$uibModalInstance.close();
	  	};

	  	$scope.cancel = function () {
	    	$uibModalInstance.dismiss('cancel');
	  	};

	}]);

}).call(this)
