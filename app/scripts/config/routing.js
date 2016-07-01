;(function(){
	
	'use strict';
	
	
	var app = angular.module('gonogo');
	
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
			title : 'Login',
			templateUrl : 'views/login.html',
		}).when('/application', {
			templateUrl: 'views/template/application.html',
			controller: 'Maincontroller'
		}). when('/apply', {
			templateUrl: 'views/template/hdbfs-cdl/application.html',
			controller: 'HdbfsAppController'
		}). when('/dmiapplication', {
			templateUrl: 'views/templates/dmi-application.html',
			controller: 'Maincontroller'
		}).	when('/hdbfsnotification', {
			templateUrl: 'views/templates/notify.html',
			controller: 'NotifController'
		}).	when('/notification', {
			templateUrl: 'views/templates/notification.html',
			controller: 'NotificationController'
		}). when('/policy', {
			templateUrl: 'views/templates/policy.html',
			controller: 'Maincontroller'
		}). when('/analytics', {
			templateUrl: 'views/templates/analytics.html',
		}).when('/cdl/dealer',{
			templateUrl: 'views/cdl/dealer.html'
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

	app.config([ "$httpProvider", function($httpProvider) {
		$httpProvider.interceptors.push('Interceptor');
		
	}]);

	app.config(['cfpLoadingBarProvider','$compileProvider', function(cfpLoadingBarProvider,$compileProvider) {
		cfpLoadingBarProvider.includeSpinner = true;
		cfpLoadingBarProvider.parentSelector = 'nav';
		$compileProvider.debugInfoEnabled(false);
		
	}]);

	

	app.run(function($rootScope, $location, APP_CONST){

		$rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc){
			var guid = localStorage.getItem('GUID');
			if (_.isUndefined(guid) || _.isNull(guid) ){
				$location.path( APP_CONST.getConst('APP_CONTEXT'));
			}	
		})		
	});

	
}).call(this)

