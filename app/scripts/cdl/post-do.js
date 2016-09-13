;
(function() {
    var app = angular.module("gonogo.cdl");

    app.controller('PostDOCntrolr', ['$scope', 'sharedService', 'notifier', "$state", "UserService", "RestService", "$uibModal",
        function($scope, sharedService, notifier, $state, UserService, RestService, $uibModal) {

            var user = UserService.getCurrentUser();

            $scope.doResponse = null;

            if (sharedService.getRefID()) {
                $scope.referenceID = sharedService.getRefID();
                sharedService.setRefID(null);
            } else {
                $state.go("/cdl/basic-de");
                return;
            }

            if (sharedService.getApplicationStatus()) {
                $scope.statusObject = sharedService.getApplicationStatus();
                sharedService.setApplicationStatus(null);
            } else {
                $state.go("/cdl/basic-de");
            }

            var doDocument = sharedService.getDODocument();

            if ($scope.doDocument) {
                sharedService.setDODocument(null);

                $scope.doResponse = doDocument;
            } else {
                var postIPARequest = {
                    oHeader: {
                        sCroId: "default",
                        dtSubmit: new Date().getTime(),
                        sReqType: null,
                        sAppSource: "WEB",
                        sDsaId: user.username,
                        sAppID: "",
                        sDealerId: null,
                        sSourceID: null,
                        sInstID: user.institutionID
                    },
                    opostIPA: null,
                    sRefID: $scope.referenceID,
                    dtDateTime: new Date().getTime()
                };

                RestService.saveToServer('get-post-ipa', JSON.stringify(postIPARequest)).then(function(response) {
                    if (response) {
                        postIPARequest.opostIPA = response;

                        RestService.saveToServer("get-pdf-ref", JSON.stringify(postIPARequest)).then(function(response) {
                            if (response) {
                                $scope.doResponse = response;
                            } else {
                                notifier.logWarning("We are unable to load DO for this application");
                            }
                        });
                    } else {
                        notifier.logWarning("We are unable to load DO for this application");
                    }
                });
            }

            $scope.shwPDFModal = function(response, refID, canSubmit) {
                //alert('modal baseURL'+baseURL);
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/modal-do-view.html',
                    controller: 'PDFViewerModalCtrl',
                    size: 'lg',
                    resolve: {
                        response: function() {
                            return response;
                        },
                        refID: function() {
                            return refID;
                        },
                        canSubmit: function() {
                            return canSubmit;
                        }
                    }
                });
            };

            $scope.sendDOMail = function(imgID, refID) {
                var mailRequest = {
                    oHeader: {
                        sCroId: "default",
                        dtSubmit: new Date().getTime(),
                        sReqType: null,
                        sAppSource: "WEB",
                        sDsaId: user.username,
                        sAppID: "",
                        sDealerId: null,
                        sSourceID: null,
                        sInstID: user.institutionID
                    },
                    sRefID: refID,
                    sImgID: imgID
                };

                RestService.postDataWithHeaders('send-mail-pdf', JSON.stringify(mailRequest), user.username, user.ePassword).then(function(Response) {
                    if (Response && Response.sStat === "SUCCESS") {
                        notifier.logSuccess("DO has been sent to dealer.");
                    } else {
                        notifier.logWarning("Some error occured while sending DO");
                    }
                    $state.go("/cdl/dashboard");
                });
            };

            $scope.onHomeClicked = function() {
                $state.go("/cdl/basic-de");
            }
        }
    ]);
}).call(this);
