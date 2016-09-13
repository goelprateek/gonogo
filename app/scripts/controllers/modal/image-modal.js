;
(function() {

    'use strict';
    var app = angular.module('gonogo');
    app.controller("supportedDocuments", ['$scope', '$uibModalInstance', '$timeout', 'RestService', 'notifier', 'sharedService', 'ImageFeed', 'UserService',
        function($scope, $uibModalInstance, $timeout, RestService, notifier, sharedService, ImageFeed, UserService) {
            var user = UserService.getCurrentUser();
            $scope.croImages = true;
            $scope.noWrapSlides = true;
            $scope.active = ImageFeed.index;
            var rejectedImgArray = [];
            $scope.iseditMode = ImageFeed.editMode;
            var backUpImgData = angular.copy(ImageFeed.docData);

            if (ImageFeed.isImage) {
                $scope.imageTag = 1;
                $scope.slides = _.each(ImageFeed.docData, function(value, key) {
                    return value["id"] = key;
                });
            } else {
                $scope.imageTag = 0;
                $scope.pdf = ImageFeed.docData;
            }

            $scope.approveImg = function(index) {
                if (ImageFeed.editMode) {
                    $scope.slides[index].sStat = "Approve";
                    var json = {
                        "oHeader": {
                            "sAppID": ImageFeed.applicationId,
                            "sApplID": ImageFeed.applicantId,
                            "sInstID": user.institutionID,
                            "sSourceID": "",
                            "sAppSource": "WEB",
                            "sReqType": "JSON"
                        },
                        "sRefID": ImageFeed.refId,
                        "sImageID": $scope.slides[index].sImgID,
                        "oUpldDtl": {
                            "sStat": "Approve",
                            "sReason": ""
                        }
                    };
                    $scope.imageService(json, $scope.slides[index], index);
                }
            }

            $scope.rejectImg = function(index) {
                if (ImageFeed.editMode) {
                    $scope.slides[index].sStat = "Reject";
                }
            }

            $scope.rejectService = function(index) {
                if (ImageFeed.editMode) {
                    var json = {
                        "oHeader": {
                            "sAppID": ImageFeed.applicationId,
                            "sApplID": ImageFeed.applicantId,
                            "sInstID": user.institutionID,
                            "sSourceID": "",
                            "sAppSource": "WEB",
                            "sReqType": "JSON"
                        },
                        "sRefID": ImageFeed.refId,
                        "sImageID": $scope.slides[index].sImgID,
                        "oUpldDtl": {
                            "sStat": "Reject",
                            "sReason": $scope.slides[index].sReason
                        }
                    };
                    $scope.imageService(json, $scope.slides[index], index);
                }
            }

            $scope.imageService = function(json, object, index) {

                RestService.saveToServer('update-image-status', json).then(function(Response) {
                    if (Response.sStatus == "SUCCESS") {
                        backUpImgData[index].sStat = json.oUpldDtl.sStat;
                        backUpImgData[index].sReason = json.oUpldDtl.sReason;
                        notifier.logSuccess("Image status has been updated Successfully !!");
                    } else {
                        $scope.slides[index].sStat = backUpImgData[index].sStat;
                        notifier.logWarning("Sorry! Unable to update image status !");
                    }
                });
            }

            $scope.onFileSelect = function($files, imageName, imageIndex) {
                if (ImageFeed.editMode) {
                    for (var i = 0; i < $files.length; i++) {
                        var fname = $files[0].name
                        var re = (/\.(jpg)$/i);
                        if (!re.exec(fname)) {
                            notifier.logWarning("File extension not supported!");
                            return;
                        }
                        var $file = $files[i];
                        var base64;
                        var reader = new FileReader();
                        if ($files[i] && $file) {
                            var binaryString;
                            reader.onload = function(readerEvt) {
                                binaryString = readerEvt.target.result;
                                base64 = binaryString;
                                if (base64.split(",")[1].substring(0, 13) == "/9j/4AAQSkZJR") {
                                    if (!$scope.slides[imageIndex]["evdncArray"]) {
                                        $scope.slides[imageIndex]["evdncArray"] = [];
                                    }
                                    var json = {
                                        "oHeader": {
                                            "sAppID": ImageFeed.applicationId,
                                            "sApplID": ImageFeed.applicantId,
                                            "sInstID": ImageFeed.institutionId,
                                            "sAppSource": "WEB",
                                            "sReqType": "JSON"
                                        },
                                        "sRefID": ImageFeed.refId,
                                        "oUpldDtl": {
                                            "sFileID": "1",
                                            "sFileName": $scope.slides[imageIndex].sImgType + "_EVIDENCE" + ($scope.slides[imageIndex].evdncArray.length + 1),
                                            "sFileType": "JPG",
                                            "sfileData": base64.split(",")[1],
                                            "sStat": "",
                                            "sReason": ""
                                        }
                                    };
                                    if ($scope.slides[imageIndex]["evdncArray"].length < 2) {

                                        RestService.saveToServer('upload-image', json).then(function(Response) {
                                            if (Response.sStatus == 'SUCCESS') {
                                                if (!$scope.slides[imageIndex]["evdncArray"]) {
                                                    $scope.slides[imageIndex]["evdncArray"] = [];
                                                }
                                                var evdcJson = {
                                                    "id": $scope.slides[imageIndex]["evdncArray"].length,
                                                    "sByteCode": base64,
                                                    "sImgID": '',
                                                    "sImgType": $scope.slides[imageIndex].sImgType + "_EVIDENCE" + ($scope.slides[imageIndex].evdncArray.length + 1),
                                                    "sReason": '',
                                                    "sStat": ''
                                                };
                                                $scope.slides[imageIndex].evdncArray.push(evdcJson);
                                                evdcJson.id = $scope.slides.length;
                                                $scope.slides.push(evdcJson);
                                            }
                                        });
                                    } else {
                                        notifier.logWarning("Maximum limit to upload images reached");
                                    }
                                } else {
                                    notifier.logWarning("File Type not supported");
                                }
                            };

                            reader.readAsDataURL($files[i]);

                            $timeout(function() {}, 3000);
                        }
                    }
                }
            }

            $scope.closeModal = function() {
                $uibModalInstance.dismiss(backUpImgData);
            };

        }
    ]);

}).call(this)
