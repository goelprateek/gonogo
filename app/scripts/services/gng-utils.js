;(function(){


	'use strict';

	
	/**
	* gonogo.logging Module;
	*
	* Description
	*  This module solely used for logging application label logs 
	*  We can tune this setting by making a boolean variable debugEnabled = {0/1}
	*  Usages : 
	*  $log.info(messages)
	*  $log.log(messages)
	*  $log.debug(messages)
	*  $log.error(messages)
	*	
	*/
	angular.module('gonogo.utilities', ['gonogo.logging']);

	var app = angular.module('gonogo.logging',[])

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