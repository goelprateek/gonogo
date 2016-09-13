;
(function() {
    'use strict';

    var app = angular.module('gonogo.cdl');

    app.controller("DEResultController", ["$scope", "APP_CONST", "sharedService", "RestService", '$log', "UserService", "AclService", "GNG_GA", "notifier", "$interval", "$state", function(
        $scope, APP_CONST, sharedService, RestService, $log, UserService, AclService, GNG_GA, notifier, $interval, $state) {
        //HARD CODED FOR TESTING
        //sharedService.setRefID("SATH000216"); // Declined
        // /sharedService.setRefID("SATH000224"); // Approved
        //sharedService.setRefID("25052000019"); // On Hold

        //HARD CODED FOR TESTING
        var user = UserService.getCurrentUser();

        if (sharedService.getRefID()) {
            $scope.referenceID = sharedService.getRefID();
            sharedService.setRefID(null);
        } else {
            $state.go("/cdl/basic-de");
        }

        $scope.showRejectImg = false;
        $scope.showApprvImg = false;
        $scope.showQueImg = false;
        $scope.showPendingImg = false;
        $scope.showNextBtn = false;

        $scope.check_status = function() {
            var json = {
                "sRefID": $scope.referenceID,
                "oHeader": {
                    "sCroId": "default",
                    "dtSubmit": new Date().getTime(),
                    "sReqType": "JSON",
                    "sAppSource": "WEB",
                    "sDsaId": user.username,
                    "sAppID": "",
                    "sSourceID": "",
                    "sInstID": user.institutionID
                }
            };

            RestService.saveToServer('status', json)
                .then(function(data) {
                    if (data) {
                        // $scope.holdStageArr=[];
                        $scope.statusObject = data;
                        if (data.aCroDec && data.aCroDec.length > 0) {
                            //$(document.body).find("#apvAmt").val(data.aCroDec[0].dAmtAppr).siblings("help").show();
                            //console.log("data.aCroDec[0].dAmtAppr :" + data.aCroDec[0].dAmtAppr);
                        }
                        if (typeof data.oIntrmStat != "undefined" && data.oIntrmStat != null) {
                            if (data.oIntrmStat.sPanStat == "COMPLETE") { //$("#vpc").fadeIn("500");
                                $scope.pstatus = data.oIntrmStat.oPanResult.sMsg;
                            }
                            if (data.oIntrmStat.sCblScore == "COMPLETE") { //$("#cs").fadeIn("500");
                                $scope.Cstatus = data.oIntrmStat.oCibilResult.sMsg;
                            }
                        }

                        if (data.sAppStat == "Declined") {
                            //status = data.sAppStat;
                            $scope.dstatus = data.sAppStat;
                            $scope.showRejectImg = true;
                            $scope.showNextBtn = true;

                            //$("#dimg").attr("src","images/reject.png").show();
                            //$("#postIPA").show();

                            //$("#nmCntnr").hide();
                            $scope.stopTimer();
                        } else if (data.sAppStat == "Approved") {
                            //status = data.sAppStat;
                            $scope.dstatus = data.sAppStat;
                            $scope.showNextBtn = true;
                            $scope.showApprvImg = true;
                            //$("#ErrorContainer").show();
                            //$scope.scmService();
                            //$("#dimg").attr("src","images/approve.png").show();
                            //$("#postIPA").show();
                            $scope.stopTimer();
                        } else if (data.sAppStat == "Queue") {
                            //status = data.sAppStat;
                            $scope.dstatus = data.sAppStat;
                            $scope.showQueImg = true;
                            $scope.stopTimer();
                            //$("#dimg").attr("src","images/queue_status.png").show();
                        } else if (data.sAppStat == "OnHold") {
                            $scope.dstatus = data.sAppStat;
                            $scope.showNextBtn = true;
                            $scope.showPendingImg = true;
                            //$("#dimg").attr("src","images/pending.png").show();
                            //$("#postIPA").show();
                            $scope.stopTimer();
                            // for(var i=0; i<data.aCroJustification.length;i++)
                            // {
                            // 	var object={"value" : "holdCase",
                            // 			"index" :i+1,
                            // 			"doc"  :data.aCroJustification[i].sDocName
                            // 	};
                            // 	$scope.holdStageArr.push(object);
                            // }
                        }
                    }
                }, function(failedResponse) {
                    $scope.serviceHitCount = $scope.serviceHitCount + 1;
                    if ($scope.serviceHitCount <= 3) {
                        $scope.check_status();
                    } else {
                        $scope.serviceHitCount = 1;
                        notifier.logError("Sorry we cannot process your Check Status request");
                    }
                });

            $scope.dcsnPtrn = /(Declined|Approved|OnHold)$/i;
            if ($scope.dcsnPtrn.test($scope.dstatus)) {
                $interval.cancel(poller);
            }
        };

        var statusJSON = {
            "sRefID": $scope.referenceID,
            "oHeader": {
                "sCroId": "default",
                "dtSubmit": new Date().getTime(),
                "sReqType": "JSON",
                "sAppSource": "WEB",
                "sDsaId": user.username,
                "sAppID": "",
                "sSourceID": "",
                "sInstID": user.institutionID
            }
        };

        var poller = $interval(function() {
            $scope.check_status(statusJSON);
        }, 3000);

        var seconds = 1;

        var intervalPromise;
        $scope.startTimer = function() {
            intervalPromise = $interval(function() {
                var date = new Date();
                $scope.seconds = seconds;
                $scope.time = getPadded(seconds);
                seconds = seconds + 1;
                if (seconds > 60)
                    $scope.stopTimer();
            }, 1000);
        };
        $scope.startTimer();

        $scope.stopTimer = function() {
            $interval.cancel(intervalPromise);
        };

        //HARD CODED FOR TESTING
        //$interval.cancel(poller);
        //HARD CODED FOR TESTING

        var getPadded = function(val) {
            return val < 10 ? ('0' + val) : val;
        };

        $scope.$on('$destroy', function() {
            $scope.stopTimer();
            $interval.cancel(poller);
        });

        /*$(document.body).on("click","#postIPA",function(){
//			$("#resultPanel").hide();
//			$("#afterSubmit").show();
			sharedService.setApplicationStatus($scope.statusObject);
			$state.go("/cdl/after-submit");
		});*/

        $scope.nextOfResultPanel = function() {
            sharedService.setApplicationStatus($scope.statusObject);
            sharedService.setRefID($scope.referenceID);
            $state.go("/cdl/after-submit");
        }
    }]);
}).call(this);
