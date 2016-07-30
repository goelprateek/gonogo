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
	angular.module('gonogo.utilities', ['gonogo.logging','gonogo.notification']);

	var app = angular.module('gonogo.logging',[])


 	angular.module("gonogo.notification", []).factory("notifier", [function() {
            var logIt;
            return toastr.options = {
                closeButton: true,
                positionClass: "toast-bottom-right",
                timeOut: "3000",
                debug: false,
                newestOnTop: false,
                progressBar: false,
                preventDuplicates: false,
                timeOut: "5000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                closeMethod : 'fadeOut',
                closeDuration : 300,
                closeEasing : 'linear'
            }, logIt = function(message, type) {
                return toastr[type](message)
            }, {
                log: function(message) {
                    logIt(message, "info")
                },
                logWarning: function(message) {
                    logIt(message, "warning")
                },
                logSuccess: function(message) {
                    logIt(message, "success")
                },
                logError: function(message) {
                    logIt(message, "error")
                }
            }
        }]);


}).call(this)