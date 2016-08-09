;(function(){
	
	'use strict';
	
	
	var app = angular.module('gonogo');
	
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
			title : 'Login',
			templateUrl : 'views/login.html',
		}). when('/apply', {
			templateUrl: 'views/template/hdbfs-cdl/application.html',
		}).when('/hdbfsnotification', {
			templateUrl: 'views/templates/notify.html',
		}). when('/analytics', {
			templateUrl: 'views/templates/analytics.html',
		}).when('/cdl/dealer',{
			templateUrl: 'views/cdl/dealer.html'
		}).when('/cdl/result',{
			templateUrl: 'views/cdl/result.html',
			controller: 'DEResultController'
		}).when('/cdl/basic-de',{
			templateUrl: 'views/cdl/basic-de.html',
			controller: 'BasicDEController'
		}).when('/cdl/after-submit',{
			templateUrl: 'views/cdl/after-submit.html',
			controller: 'AfterSubmitController'
		}).when('/cdl/post-ipa',{
			templateUrl: 'views/cdl/post-ipa.html',
			controller: 'PostIPAController'
		}).when('/cdl/hold-stage',{
			templateUrl: 'views/cdl/hold-stage.html',
			controller: 'HoldStageController'
		}).when('/cdl/apply', {
			templateUrl: 'views/cdl/apply.html',
			controller: 'ApplyController'
		}).when('/cdl/dashboard', {
			templateUrl: 'views/cdl/dashboard.html',
			controller: 'DashboardController'
		}).	when('/cdl/assetMaster', {
			templateUrl: 'views/cdl/manufacturer.html',
			controller: 'manufacturerController'
		}).when('/cdl/customerForm', {
			templateUrl: 'views/cdl/customer-form.html',
			controller: 'CustomerFormCntrolr'
		}).otherwise({ redirectTo: '/' })
	}]);
	
	
	app.factory("Interceptor", function($q, $location) {
		return {
			
			request : function(config) {
				config.requestTimestamp = new Date().getTime();
				return config;
			},
			
			response : function(response) {

				response.config.responseTimestamp = new Date().getTime();

				return response || $q.when(response);
			},
			
			responseError : function(response) {

				//TODO in case of error define your handler function 

				return $q.reject(response);
			}
		};
	});

	

	app.run(function($rootScope, $location, APP_CONST){

		$rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc){
			var guid = localStorage.getItem('GUID');
			if (_.isUndefined(guid) || _.isNull(guid) ){
				$location.path( APP_CONST.getConst('APP_CONTEXT'));
			}	
		})		
	});
}).call(this);