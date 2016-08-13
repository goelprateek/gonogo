;(function(){
	
	'use strict';
	
	var app = angular.module('gonogo');
	
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		 $stateProvider.state('/', {
			url : '/',
			templateUrl : 'views/login.html',
		}).state('/apply', {
			url : '/apply',
			templateUrl: 'views/template/hdbfs-cdl/application.html',
		}).state('/hdbfsnotification', {
			url : '/hdbfsnotification',
			templateUrl: 'views/templates/notify.html',
		}).state('/analytics', {
			url : '/analytics',
			templateUrl: 'views/templates/analytics.html',
		}).state('/cdl/dealer',{
			url : '/cdl/dealer',
			templateUrl: 'views/cdl/dealer.html'
		}).state('/cdl/result',{
			url : '/cdl/result',
			templateUrl: 'views/cdl/result.html',
			controller: 'DEResultController'
		}).state('/cdl/basic-de',{
			url : '/cdl/basic-de',
			templateUrl: 'views/cdl/basic-de.html',
			controller: 'BasicDEController'
		}).state('/cdl/after-submit',{
			url : '/cdl/after-submit',
			templateUrl: 'views/cdl/after-submit.html',
			controller: 'AfterSubmitController'
		}).state('/cdl/post-ipa',{
			url : '/cdl/post-ipa',
			templateUrl: 'views/cdl/post-ipa.html',
			controller: 'PostIPAController'
		}).state('/cdl/hold-stage',{
			url : '/cdl/hold-stage',
			templateUrl: 'views/cdl/hold-stage.html',
			controller: 'HoldStageController'
		}).state('/cdl/apply', {
			url : '/cdl/apply',
			templateUrl: 'views/cdl/apply.html',
			controller: 'ApplyController'
		}).state('/cdl/dashboard', {
			url : '/cdl/dashboard',
			templateUrl: 'views/cdl/dashboard.html',
			controller: 'DashboardController'
		}).	state('/cdl/assetMaster', {
			url : '/cdl/assetMaster',
			templateUrl: 'views/cdl/manufacturer.html',
			controller: 'manufacturerController'
		}).state('/cdl/customerForm', {
			url : '/cdl/customerForm',
			templateUrl: 'views/cdl/customer-form.html',
			controller: 'CustomerFormCntrolr'
		}).state('/cdl/apply.personal', {
		    templateUrl: "views/cdl/personal-data.html",
	    }).state('/cdl/apply.address', {
	     	templateUrl: "views/cdl/address-data.html",
	    }).state('/cdl/apply.professional', {
	        templateUrl: "views/cdl/professional-data.html",
	    }).state('/cdl/apply.kyc', {
	        templateUrl: "views/cdl/kyc-documents.html",
	    }).state('/cdl/apply.asset', {
	        templateUrl: "views/cdl/asset-data.html",
	    });
		 $urlRouterProvider.otherwise('/');

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