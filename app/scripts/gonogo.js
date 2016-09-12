;(function(){

	'use strict';

	var app = angular.module('gonogo', [ 'ui.router', 
	                                     'ngAria',
	                                     'ngMessages' ,
	                                     'ngResource',
	                                     'ngCookies',
	                                     'ngSanitize',
	                                     'ngAnimate',
	                                     'ngMaterial',
	                                     'ui.bootstrap',
	                                     'angular-loading-bar',
	                                     'ngFileUpload',
	                                     'angular-svg-round-progressbar',
	                                     'gonogo.analytics',
	                                     'gonogo.login',
	                                     'gonogo.directives',
	                                     'gonogo.cdl',
	                                     'gonogo.utilities',
	                                     'gonogo.commons',
	                                     'gonogo.factories',
	                                     'score-directives',
	                                     'daterangepicker',
	                                     'ngTagsInput'
	                                    ]);

	app.controller("Maincontroller",['$scope', '$log', 'notifier' , '$timeout','RestService','$location','UserService','APP_CONST','AclService',
		function($scope, $log, notifier , $timeout,RestService,$location,UserService,APP_CONST,AclService) {


		$scope.$on('onSuccessfulLogin', function (event, args) {

			var currentUser=UserService.getCurrentUser();

			if(!_.isUndefined(currentUser.id))
			{
				if(currentUser.actions && currentUser.actions.length!=0)
				{ 
					$scope.app=_.contains(currentUser.actions,'APPLICATION' );
					$scope.notif=_.contains(currentUser.actions,'NOTIFICATION');
					$scope.policy=_.contains(currentUser.actions,'POLICY' );
					$scope.analytics=_.contains(currentUser.actions,'ANALYTCS');
				}

				$scope.username = currentUser.username;
				$scope.useremail = currentUser.useremail;
				$scope.image = currentUser.image;	
				$scope.instImage = currentUser.instImage;
				$scope.InstitutionID = currentUser.institutionID;
				$scope.userid = currentUser.userid;
				$scope.color = currentUser.color;
			}
		});

		$scope.status = {
		    isopen: false
		};

		$scope.statusCdl = {
		    isopen: false
		};

		$scope.isSpecificPage = function() {
			var path;
			return path = $location.path(),  _.contains(["/",'/test'], path) ;
		}

		$scope.isCdlPage = function() {
			var path;
			return path = $location.path(),  _.contains(["/cdl/dealer","/cdl/apply",'/cdl/apply/personal','/cdl/apply/address','/cdl/apply/professional','/cdl/apply/asset','/cdl/apply/kyc','/cdl/dashboard','/cdl/assetMaster','/cdl/customerForm','/cdl/basic-de','/cdl/result','/cdl/after-submit','/cdl/hold-stage','/cdl/post-ipa','/cdl/additnl-doc'], path);
		}

		$scope.logout = function() {

			var json ={
					"oHeader":
					{
						"sReqType":"JSON",
						"sAppSource":"WEB",
						"sSourceID":"GONOGO_HDBFS",
						"sInstID":$scope.InstitutionID
					},
					"sInstID": $scope.InstitutionID,
					"sUserID": $scope.userid
			}

			RestService.postDataWithHeaders('logout',json);

			UserService.cleanUpUserDetails();
			$location.path(APP_CONST.getConst('APP_CONTEXT'));
		};

		var currentUser = UserService.getCurrentUser();

		if(currentUser.id){
			if(currentUser.actions && currentUser.actions.length != 0){ 
				$scope.app=_.contains(currentUser.actions,'APPLICATION' );
				$scope.notif=_.contains(currentUser.actions,'NOTIFICATION');
				$scope.policy=_.contains(currentUser.actions,'POLICY' );
				$scope.analytics=_.contains(currentUser.actions,'ANALYTCS');
			}

			$scope.username = currentUser.username;
			$scope.useremail = currentUser.useremail;
			$scope.image = currentUser.image;	
			$scope.instImage = currentUser.instImage;
			$scope.InstitutionID = currentUser.institutionID;
			$scope.userid = currentUser.userid;
			$scope.color = currentUser.color;
		}
	}]);
}).call(this);