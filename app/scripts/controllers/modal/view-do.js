app.controller('PDFViewerModalCtrl', [
    'RestService', '$scope', '$uibModalInstance', 'response', 'refID', '$location', 'UserService', 'notifier', 'canSubmit', "$state",
    function(RestService, $scope, $uibModalInstance, response, refID, $location, UserService, notifier, canSubmit, $state) {

        var user = UserService.getCurrentUser();
        $scope.response = response;
        $scope.refID = refID;
        $scope.canSubmitDO = canSubmit;

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

                if (Response) {}
            });

            $uibModalInstance.close();

            notifier.logSuccess("DO has been sent to dealer.");
            $state.go("/cdl/dashboard");
        };

        $scope.closeModal = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
]);
