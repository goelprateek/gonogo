;(function(){

	'use strict';
	
	var app = angular.module('gonogo.directives' , []);
	
	app.directive('backImg', function() {
		return function(scope, element, attrs) {
			var url = attrs.backImg;
			element.css({
				'background-image' : 'url(' + url + ')',
				'background-size' : 'cover'
			});
		};
	});

	app.directive('capitalize', function() {
		   return {
		     require: 'ngModel',
		     link: function(scope, element, attrs, modelCtrl) {
		        var capitalize = function(inputValue) {
		           if(inputValue == undefined) inputValue = '';
		           var capitalized = inputValue.replace(/^(.)|\s(.)/g, function(v){ return v.toUpperCase( ); });
		           if(capitalized !== inputValue) {
		              modelCtrl.$setViewValue(capitalized);
		              modelCtrl.$render();
		            }         
		            return capitalized;
		         }
		         modelCtrl.$parsers.push(capitalize);
		         capitalize(scope[attrs.ngModel]);  // capitalize initial value
		     }
		   };
		});
	
	app.directive('capital', function() {
		   return {
		     require: 'ngModel',
		     link: function(scope, element, attrs, modelCtrl) {
		        var capitalize = function(inputValue) {
		           if(inputValue == undefined) inputValue = '';
		           var capitalized = inputValue.toUpperCase(); 
		           if(capitalized !== inputValue) {
		              modelCtrl.$setViewValue(capitalized);
		              modelCtrl.$render();
		            }         
		            return capitalized;
		         }
		         modelCtrl.$parsers.push(capitalize);
		         capitalize(scope[attrs.ngModel]);  // capitalize initial value
		     }
		   };
		});

	// directives from simdirecctive.js (Piyush) (need to disccuss why need all these)
	app.directive('policy', function() {
	    var directive = {};

	    directive.restrict = 'E'; 
	    directive.templateUrl = 'views/templates/policy-outcome.html';
	    return directive;
	});

	app.directive('score', function() {
	    var directive = {};

	    directive.restrict = 'E'; 
	    directive.templateUrl = 'views/templates/score-rule.html';
	    return directive;
	});

	app.directive('matrix', function() {
	    var directive = {};

	    directive.restrict = 'E'; /* restrict this directive to elements */
	    directive.templateUrl = 'views/templates/matrix.html';
	    return directive;
	});
	
	
	app.directive("customBackground",function(){
		return {
            restrict: "A",
            controller: ["$scope", "$element", "$location", function($scope, $element, $location) {
                var addBg, path;
                return path = function() {
                    return $location.path()
                }, addBg = function(path) {
                    switch ($element.removeClass("body-home body-special body-tasks body-lock"), path) {
                        
                        case "/":
                        	return $element.addClass("body-special");
                    }
                }, addBg($location.path()), $scope.$watch(path, function(newVal, oldVal) {
                    return newVal !== oldVal ? addBg($location.path()) : void 0
                })
            }]
        }
	});
	
	app.directive("fileDownload",function(){
		return {
			restrict:'A',
	        scope:{
	            fileDownload:'=',
	            fileName:'=',
	        },
	        link:function(scope,elem,atrs){
	        	scope.$watch('fileDownload',function(newValue, oldValue){
	        		
	        		if(newValue!=undefined && newValue!=null){
	                    console.debug('Downloading a new file'); 
	                    
	                    var isFirefox = typeof InstallTrigger !== 'undefined';
	                    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	                    var isIE = /*@cc_on!@*/false || !!document.documentMode;
	                    var isEdge = !isIE && !! window.StyleMedia;
	                    var isChrome = !!window.chrome && !!window.chrome.webstore;
	                    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	                    var isBlink = (isChrome || isOpera) && !!window.CSS;

	                    if(isFirefox || isIE || isChrome){
	                        if(isChrome){
	                            console.log('Manage Google Chrome download');
	                            var url = window.URL || window.webkitURL;
	                            var fileURL = url.createObjectURL(scope.fileDownload);
	                            var downloadLink = angular.element('<a></a>');//create a new  <a> tag element
	                            downloadLink.attr('href',fileURL);
	                            downloadLink.attr('download',scope.fileName);
	                            downloadLink.attr('target','_self');
	                            downloadLink[0].click();//call click function
	                            url.revokeObjectURL(fileURL);//revoke the object from URL
	                        }
	                        if(isIE){
	                            console.log('Manage IE download>10');
	                            window.navigator.msSaveOrOpenBlob(scope.fileDownload,scope.fileName); 
	                        }
	                        if(isFirefox){
	                            console.log('Manage Mozilla Firefox download');
	                            var url = window.URL || window.webkitURL;
	                            var fileURL = url.createObjectURL(scope.fileDownload);
	                            var a=elem[0];//recover the <a> tag from directive
	                            a.href=fileURL;
	                            a.download=scope.fileName;
	                            a.target='_self';
	                            a.click();//we call click function
	                        }
	                    }else{
	                        alert('SORRY YOUR BROWSER IS NOT COMPATIBLE');
	                    }
	                }
	        	});	
	        }
		}
	})
	
	
}).call(this)

