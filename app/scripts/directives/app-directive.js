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

	app.directive('initcap', function () {
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

	app.directive('rupees', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, modelCtrl) {
				var formate = function(inputValue) {
					if (inputValue == undefined) inputValue = '';
					var rupee = torupee(inputValue);
					if (rupee !== inputValue) {
						modelCtrl.$setViewValue(rupee);
						modelCtrl.$render();
					}
					return rupee;
				}
				function torupee(x) {
					x=x.toString().replace(/,/g,'');
					if(x.length > 3)
					{ var lastThree = x.substring(x.length-3);
					var otherNumbers = x.substring(0,x.length-3);
					if(otherNumbers != '')
					{ lastThree = ',' + lastThree; }
					var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
					return res;
					}else{
						return x;
					}
				}
				modelCtrl.$parsers.push(formate);
				formate(scope[attrs.ngModel]); // capitalize initial value
			}
		   };	
	});

	app.directive('contentItem', function ($compile) {
		var linker = function(scope, element, attrs) {
			var template = '<div class="row clearfix" style="padding: 8px;">';
			template=template+'<div class="preview" id="{{item.value}}{{item.index}}">';
			template=template+'<input id="{{item.value}}l{{item.index}}" type="file" ng-file-select="onselectImg($files,'+"'{{item.value}}'"+','+"'{{item.index}}'"+')">';
			template=template+'<label for="{{item.value}}l{{item.index}}" id="{{item.value}}{{item.index}}label">';
			template=template+'<img alt="" src="../img/camera-128.png" class="img_icon"></label></div>';
			template=template+'<small id="{{item.value}}{{item.index}}size" class="size"></small>';
			template=template+'<div style="height:20px;"><a class="remove_image" id="{{item.value}}{{item.index}}remove" name="{{item.value}}{{item.index}}" style="display:none">Remove</a></div></div>';
			element.html(template); 
			$compile(element.contents())(scope);
		};
		return {
			restrict : 'E',
			link : linker,
			scope : false
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

	app.directive("fixToTop", function($window){
		var $win = angular.element($window);
		return {
			restrict:'A',
			link:function(scope,elem,attrs,controller){
				var topClass = attrs.fixToTop,
				 parent = elem.parent(),
				 topPadding = parseInt(attrs.paddingWhenAtTop, 10),
                 offsetTop;	
				 

				 $win.on('scroll', function (e) {
				 	offsetTop = (parent.offset().top - topPadding);
	                if ($win.scrollTop() >= offsetTop) {
	                    elem.addClass(topClass);
	                    parent.height(elem.height());
	                } else {
	                    elem.removeClass(topClass);
	                    parent.css("height", null);
	                }
	            });
			}
		}
	}),

	

	app.directive('onlyDigits', function () {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function (scope, element, attrs, modelCtrl) {
	            modelCtrl.$parsers.push(function (inputValue) {
	                if (inputValue == undefined) return '';
	                var transformedInput = inputValue.replace(/[^0-9]/g, '');
	                if (transformedInput !== inputValue) {
	                    modelCtrl.$setViewValue(transformedInput);
	                    modelCtrl.$render();
	                }
	                return transformedInput;
	            });
	        }
	    };
	});

}).call(this)

