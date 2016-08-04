;(function(){

	'use strict';

	/**
	*  Module
	*
	* Description
	*  setting system wide configurations
	*/
	var app  = angular.module('gonogo');

	
	app.config([ "$httpProvider", function($httpProvider) {
		$httpProvider.interceptors.push('Interceptor');
		
	}]);

	app.config(['cfpLoadingBarProvider','$compileProvider', function(cfpLoadingBarProvider,$compileProvider) {
		cfpLoadingBarProvider.includeSpinner = true;
		cfpLoadingBarProvider.parentSelector = 'nav';
		$compileProvider.debugInfoEnabled(false);
		
	}]);

	app.config(['$uibModalProvider',function($uibModalProvider){
		$uibModalProvider.options = {
			backdrop: 'static',
            keyboard: false	,
            animation : true 
		}

	}]);


	app.config(['$provide','$logProvider', function($provide,$logProvider){
		$logProvider.debugEnabled(true);
		$provide.decorator('$log' , ['$delegate' , function($delegate){
			
			var origDebug = $delegate.debug;
			var origInfo = $delegate.info;
			var origLog = $delegate.log;

			$delegate.info = function(){
				if($logProvider.debugEnabled()){
					origInfo.apply(null, arguments);
				}
			};

			$delegate.log = function(){
				if($logProvider.debugEnabled()){
					origLog.apply(null,arguments);
				}
			}

			$delegate.debug = function(){
				var args = [].slice.call(arguments);
				args[0] = [new Date().toString(), ':', args[0]].join('');
				origDebug.apply(null, args);
			};

			return $delegate;
		}]);
	}]);




}).call(this)