;
(function() {
    var app = angular.module("gonogo");

    app.controller("ReinitiateModalController", ["$scope", "RestService", "refID", "applicantData", "$uibModalInstance", "fieldsUpdated", "notifier", "UserService",
        function($scope, RestService, refID, applicantData, $uibModalInstance, fieldsUpdated, notifier, UserService) {

            var user = UserService.getCurrentUser();
            $scope.refID = refID;
            $scope.applicantData = applicantData;
            $scope.fieldsUpdated = fieldsUpdated;

            $scope.fieldModule = {};

            $scope.tags = [];

            var requestReinitiateModules = [];

            // var requestReinitiateModules=[
            //                              {sModuleName : "101", bRunModule : false},
            //                              {sModuleName : "201", bRunModule : false},
            //                              {sModuleName : "202", bRunModule : false},
            //                              {sModuleName : "301", bRunModule : false},
            //                              {sModuleName : "302", bRunModule : false},
            //                              {sModuleName : "401", bRunModule : false},
            //                              {sModuleName : "402", bRunModule : false}
            //                          ];

            $scope.reinitiateModules = [
                { main: "MB", subs: [{ name: "Cibil", id: 101, isSuccess: true }] }, {
                    main: "KYC",
                    subs: [{ name: "PAN", id: 201, isSuccess: true },
                        { name: "Aadhaar", id: 202, isSuccess: true }
                    ]
                },
                // {main:"Dedupe" , subs: [{name:"Dedupe",id:301,isSuccess:true},
                //                      {name:"Negative Pin Code",id:302,isSuccess:true}]},
                {
                    main: "Scoring",
                    subs: [{ name: "Verificaton scoring", id: 401, isSuccess: true },
                        { name: "Application scoring", id: 402, isSuccess: true }
                    ]
                }
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

            if ($scope.applicantData.oWorkFlowConfig && $scope.applicantData.oWorkFlowConfig.aModuleConfig) {
                _.each($scope.applicantData.oWorkFlowConfig.aModuleConfig, function(mConfig) {
                    _.each($scope.reinitiateModules, function(module) {
                        _.each(module.subs, function(subModule) {
                            if ((subModule.id + "") == mConfig.sModuleName) {
                                subModule.isSuccess = mConfig.bRunModule;
                            }
                        });
                    });
                });
            }

            //If Fields updated then add all into processing
            if ($scope.fieldsUpdated && ($scope.fieldsUpdated.isNameUpdated || $scope.fieldsUpdated.isResAddressUpdated || $scope.fieldsUpdated.isOffAddressUpdated || $scope.fieldsUpdated.isPerAddressUpdated || $scope.fieldsUpdated.isPanUpdated || $scope.fieldsUpdated.isVoterIDUpdated || $scope.fieldsUpdated.isAadhaarUpdated || $scope.fieldsUpdated.isDobUpdated)) {
                for (var i = 0; i < $scope.reinitiateModules.length; i++) {
                    for (var j = 0; j < $scope.reinitiateModules[i].subs.length; j++) {
                        $scope.tags.push({ text: $scope.reinitiateModules[i].subs[j].name, id: $scope.reinitiateModules[i].subs[j].id });
                    }
                }
            }

            $scope.setTab = function(newTab) {
                $scope.tab = newTab;
            };

            $scope.isSet = function(tabNum) {
                return $scope.tab === tabNum;
            };

            $scope.getTabStyle = function(pTab) {
                //console.log("pTab:"+pTab);
                var val = "";
                if (pTab == $scope.tab) {
                    //This tab is active
                    val = {
                        color: "white",
                        background: $scope.getTabColor(pTab),
                        outline: null
                    };
                } else {
                    //This tab is not active
                    val = {
                        color: $scope.getTabColor(pTab),
                        border: "1px solid " + $scope.getTabColor(pTab)
                    };
                }
                return val;
            };

            $scope.isTabSuccess = function(pTab) {
                var isSuccess = true;
                for (var i = 0; i < $scope.reinitiateModules.length; i++) {
                    if ($scope.reinitiateModules[i].main == pTab) {
                        for (var j = 0; j < $scope.reinitiateModules[i].subs.length; j++) {
                            if (!$scope.reinitiateModules[i].subs[j].isSuccess) {
                                isSuccess = false;
                            }
                        }
                    }
                }

                return isSuccess;
            };

            $scope.getSubStyle = function(pSub) {
                //      console.log("pTab:"+pTab);
                var val = "";
                //This tab is not active
                val = {
                    color: $scope.getSubColor(pSub),
                    outline: null
                };
                return val;
            };

            $scope.getTabColor = function(pTab) {
                if ($scope.isTabSuccess(pTab)) { //Color code == green
                    return "#22ab4a";
                } else {
                    return "#ee1f23";
                }
            };

            $scope.getSubColor = function(pSub) {
                for (var i = 0; i < $scope.reinitiateModules.length; i++) {
                    for (var j = 0; j < $scope.reinitiateModules[i].subs.length; j++) {
                        if ($scope.reinitiateModules[i].subs[j].id == pSub) {
                            if ($scope.reinitiateModules[i].subs[j].isSuccess) { //Color code == green
                                return "#22ab4a";
                            } else {
                                return "#ee1f23";
                            }
                        }
                    }
                }
            };

            $scope.addTag = function(pTag, tagId) {
                var tagFound = false;

                for (var i = 0; i < $scope.tags.length; i++) {
                    if ($scope.tags[i].text == pTag) {
                        tagFound = true;
                        break;
                    }
                }
                if (tagFound != true) {
                    $scope.tags.push({ text: pTag, id: tagId });
                }
            };

            $scope.reinitiateForm = function() {
                //console.log("Reinitiate form :"+$scope.refID);
                requestReinitiateModules = [];
                for (var mainIndex = 0; mainIndex < $scope.reinitiateModules.length; mainIndex++) {
                    for (var subIndex = 0; subIndex < $scope.reinitiateModules[mainIndex].subs.length; subIndex++) {
                        var shouldProcess = false;
                        for (var tagIndex = 0; tagIndex < $scope.tags.length; tagIndex++) {
                            if ($scope.reinitiateModules[mainIndex].subs[subIndex].id == $scope.tags[tagIndex].id) {
                                shouldProcess = true;
                            }
                        }

                        requestReinitiateModules.push({ sModuleName: "" + $scope.reinitiateModules[mainIndex].subs[subIndex].id, bRunModule: shouldProcess });
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
                if ($scope.fieldsUpdated && ($scope.fieldsUpdated.isNameUpdated || $scope.fieldsUpdated.isResAddressUpdated || $scope.fieldsUpdated.isOffAddressUpdated || $scope.fieldsUpdated.isPerAddressUpdated || $scope.fieldsUpdated.isPanUpdated || $scope.fieldsUpdated.isVoterIDUpdated || $scope.fieldsUpdated.isAadhaarUpdated || $scope.fieldsUpdated.isDobUpdated)) {
                    var requestJson = {
                        oHeader: {
                            sInstID: user.institutionID,
                            sCroId: user.username,
                            sAppSource: "WEB"
                        },
                        oWorkFlowConfig: {
                            sGngRefId: $scope.refID,
                            aModuleConfig: requestReinitiateModules
                        },
                        oApplicationRequest: applicantData.oAppReq
                    };

                    var URL = "/worker/reprocess-updated/";

                    RestService.saveToServer(URL, JSON.stringify(requestJson)).then(function(Response) {
                        if (Response && Response.sStat == "SUCCESS") {
                            notifier.logSuccess("Application has been reinitiated successfully");
                            $uibModalInstance.close({ isSuccess: true, referenceID: $scope.refID });
                        } else {
                            notifier.logWarning("Error occured while reinitiating");
                            $uibModalInstance.close({ isSuccess: false, referenceID: $scope.refID });
                        }
                    });
                } else {
                    var requestJson = {
                        oHeader: {
                            "sInstID": user.institutionID,
                            "sCroId": user.username,
                            "sAppSource": "WEB"
                        },
                        sGngRefId: $scope.refID,
                        aModuleConfig: requestReinitiateModules
                    };

                    var URL = "worker/reprocess-by-id/";

                    RestService.saveToServer(URL, JSON.stringify(requestJson)).then(function(Response) {
                        if (Response && Response.sStat == "SUCCESS") {
                            notifier.logSuccess("Application has been reinitiated successfully");
                            $uibModalInstance.close({ isSuccess: true, referenceID: $scope.refID });
                        } else {
                            notifier.logWarning("Error occured while reinitiating");
                            $uibModalInstance.close({ isSuccess: false, referenceID: $scope.refID });
                        }
                        //$uibModalInstance.dismiss();
                    });
                }
            };

            $scope.closeModal = function() {
                $uibModalInstance.dismiss();
            };
        }
    ]);

}).call(this)
