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
		           if(!inputValue) inputValue = '';
		           var capitalized = inputValue.replace(/^((.)|\s(.))+/g, 
		           	function(v){ 
		           		return v.toUpperCase( ); 
		           	});
		           if(capitalized !== inputValue) {
		              modelCtrl.$setViewValue(capitalized);
		              modelCtrl.$render();
		            }         
		            return capitalized;
		         }
		         modelCtrl.$parsers.push(capitalize);
		         modelCtrl.$formatters.push(capitalize);
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
					if (!inputValue) inputValue = '';
						var transformedInput = (inputValue+"").replace(/[^0-9]/g, '');
					
					var rupee = torupee(transformedInput);
					if (inputValue !== rupee) {
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
				modelCtrl.$formatters.push(formate);
				formate(scope[attrs.ngModel]); // capitalize initial value
			}
	   	};	
	});

	app.directive('imageUpload',["RestService","UploadImages","notifier","$compile","$log",
	function(RestService,UploadImages,notifier,$compile,$log){

		var linker = function(scope, element, attrs) {
			var template = 	  '<div class="row clearfix">'
			template=template+	'<div class="col-md-4" ng-repeat="item in requestImageArray">';		
			template=template+		'<content-item item="item" imagearray="imageArrayToUpload"></content-item>';
			template=template+	'</div>';
			template=template+'</div>';
			template=template+'<div class="row clearfix" style="text-align: center;">';
			template=template+	'<button class="customButton submit" id="reprocess" ng-click="uploadImages()" style="float: inherit;">Submit</button>';
			template=template+'</div>';
			element.html(template);
			$compile(element.contents())(scope);
		};

		var _controller=["$scope",function($scope){

			$scope.imageArrayToUpload=[];

			$scope.uploadImages=function(){

				if($scope.requestImageArray.length == $scope.imageArrayToUpload.length){
					UploadImages.upload($scope.referenceId,$scope.imageArrayToUpload).then(function(responseArray) {
					  	$log.debug('Image upload Success, Total image uploaded : ' +  JSON.stringify(responseArray);
					  	$scope.onImageUploaded();
					}, function(reason) {
					  	$log.debug('Image upload Failed, Total image uploaded : ' +  JSON.stringify(responseArray));
					});
				}else{
					notifier.logWarning("Please provide all images.") ;
				}
			};
		}];

		return {
			restrict : 'E',
			link : linker,
			scope : {
				requestImageArray : "=",
				referenceId:"@",
				onImageUploaded:'&'
			},
			controller : _controller
		};
	}]);

	app.directive('contentItem', function ($compile) {
		var linker = function(scope, element, attrs) {

			var template =    ' <style>';
			template=template+'		.doc-preview{position:relative;bottom:0px;width:100%;height:100px;left:0px;border: none;border-bottom: 1px solid black;}';
			template=template+' </style>';
			template=template+'	<div class="row clearfix" style="padding: 8px;">';
			template=template+'		<label>{{item.doc}}</label>';
			template=template+'<div class="preview" id="{{item.value}}{{item.index}}">';
			template=template+'<input id="{{item.value}}l{{item.index}}" type="file" ngf-select="onselectImg($files,{{item}})">';
			template=template+'<label for="{{item.value}}l{{item.index}}" id="{{item.value}}{{item.index}}label">';
			template=template+'<img alt="" src="images/camera-128.png" ng-if="item.isDefault" class="img_icon">';
			template=template+'<img alt="" ng-src="{{item.image}}" ng-if="!item.isDefault" class="doc-preview"></label></div>';
			template=template+'<small id="{{item.value}}{{item.index}}size" class="size"></small>';
			template=template+'<div style="height:20px;display:inline"><a class="remove_image" id="{{item.value}}{{item.index}}remove" name="{{item.value}}{{item.index}}" style="display:none" ng-click="onImageRemove(item)">Remove</a></div>';
			template=template+'</div>';
			element.html(template);
			$compile(element.contents())(scope);
		};

		var _controller=["$scope","$log",function($scope,$log){

			$scope.onImageRemove=function(img){
				$("#"+img.value+img.index+"").css("background-image", "");
				$("#"+img.value+img.index+"label").show();
				$("#"+img.value+img.index+"remove").hide();

				var kycName="";
				if(_.contains(["APPLICANT-PHOTO","PAN","AADHAAR","PASSPORT","DRIVING-LICENSE","CUSTOMER-PHOTO","INCOME-PROOF1","INCOME-PROOF2","OTHER"],img.value)){
					kycName=img.value;
				}else if(_.contains(["APPLICATION_FORM","AGREEMENT","ACH","DISBURSEMENT","ADDITIONAL_KYC","holdCase"],img.value)){
					kycName=img.value+img.index;
				}

				for(var i=0; i<$scope.imagearray.length;i++){

					if($scope.imagearray[i].kyc_name === kycName){

						$scope.imagearray.splice(i,1);
					}
				}

				$scope.item.isDefault=true;
				$scope.item.image=null;
			};

			$scope.onselectImg = function($files,pItem) {

				// console.log("Image selected");
				// console.log($scope.item);

				var img_type ='';
				for (var i = 0; i < $files.length; i++){
					var fname=$files[0].name;
			    	var re = (/\.(jpg)$/i);
					if(!re.exec(fname)){
				    	alert("Sorry..!! We can not upload your image. \n Only .Jpg images are allowed");
				    	break;
			    	}
					img_type = fname.split(".")[1];
					var $file = $files[i];
					var base64;
					var  reader=new FileReader();
					if ($files[i] && $file) {
						var binaryString;
						var size=((($files[i].size)/1024).toFixed(2)) +" Kb";
						reader.onload = function(readerEvt) {
							binaryString = readerEvt.target.result;

							var spliceIndex = _.chain($scope.imagearray).pluck("index").indexOf(pItem.index).value();
							if(spliceIndex==-1){
								if(_.contains(["APPLICANT-PHOTO","PAN","AADHAAR","PASSPORT","DRIVING-LICENSE","CUSTOMER-PHOTO","INCOME-PROOF1","INCOME-PROOF2","OTHER"],pItem.value)){
									$scope.imagearray.push({index:pItem.index,kyc_name:pItem.value,image:binaryString.split(",")[1],type:img_type});
								}else if(_.contains(["APPLICATION_FORM","AGREEMENT","ACH","DISBURSEMENT","ADDITIONAL_KYC"],pItem.value)){
									$scope.imagearray.push({index:pItem.index,kyc_name:(pItem.value+pItem.index),image:binaryString.split(",")[1],type:img_type});
								}else if(pItem.value==="holdCase"){
									$scope.imagearray.push({index:pItem.index,kyc_name:pItem.doc, image:binaryString.split(",")[1], type:img_type, state:pItem.state,reason:pItem.reason});
								}
							}else{
								$scope.imagearray[spliceIndex].image=binaryString.split(",")[1];
							}

							//$log.debug("Images to upload");
							//$log.debug(JSON.stringify($scope.imagearray));

							$("#"+pItem.value+pItem.index+"").css("background-image", "url("+binaryString+")");
							$("#"+pItem.value+pItem.index+"label").hide();
							$("#"+pItem.value+pItem.index+"remove").show();

							// console.log("Image selected");
							// console.log($scope.item);

							$scope.item.isDefault=false;
							$scope.item.image=binaryString;
						};
				        reader.readAsDataURL($files[i]);
					}
				}				
			};
		}];

		return {
			restrict : 'E',
			link : linker,
			scope : {
				imagearray : "=",
				item: "="
			},
			controller : _controller
		};
	});

	app.directive('documentItem', function ($compile) {

		var linker = function(scope, element, attrs,form) {
			scope.form = form; //save parent form

			var template =    ' <style>';
			template=template+'		.doc-number{position:relative;bottom:0px;width:100%;left:0px;margin-top: 10px;border: none;border-bottom: 1px solid black;}';
			template=template+'		.btn-delete-doc{position:absolute;bottom:10px;right:10px;}';
			template=template+' </style>';
		 	template=template+'	<div class="col-md-4" style="padding: 8px;margin-bottom:20px;">';
	        template=template+'     <md-input-container class="md-block" flex-gt-sm > <label>Document Type</label> <md-select ng-model="item.docType" ng-change="onDocTypeSelected(item.docType)" select-required> <md-option ng-value="doc" ng-repeat="doc in arrDocTypes">{{ doc }}</md-option> </md-select> <div ng-messages="form[doc_type_+item.index].$error" > <div ng-message="selectrequired">Please select Document Type</div> </div> </md-input-container>';
	        template=template+'		<input type="text" class="doc-number" name="doc_no_{{item.index}}" ng-model="item.docNumber" capitalize placeholder="{{item.docType}} Number" ng-pattern="docNumberPattern" required/>';
	        template=template+'		<div ng-messages="form[\'doc_no_\'+item.index].$touched && form[\'doc_no_\'+item.index].$error" class="errorMsg">';
	        template=template+'			<p ng-message="required">Please enter Document Number</p>';
	        template=template+'			<p ng-message="pattern">Please enter valid Document Number</p>';        
	        template=template+'		</div>';
	        template=template+'		<div class="upload-preview" id="{{item.index}}"  title="Click to select image.">';
	        template=template+'			<input id="l{{item.index}}" name="l{{item.index}}" type="file" ngf-select="onselectImg($files,{{item}});" />';
	        // template=template+'			<label for="l{{item.index}}" id="{{item.index}}label" title="Click to select image." ng-class="{\'upload-default\': item.isDefault,\'upload-preview\': !item.isDefault}" ng-style="item.style">';
	        template=template+'			<label for="l{{item.index}}" id="{{item.index}}label" title="Click to select image." style="line-height: 12;width: 100%;">';
   	        template=template+'				<img src="images/camera-128.png" ng-if="item.isDefault" class="upload-default">';
			template=template+'				<img ng-src="{{item.image}}" ng-if="!item.isDefault" class="upload-preview">';
	        template=template+'			</label>';
	        template=template+'			<button class="btn btn-danger btn-xs btn-delete-doc" title="Delete this document" ng-click="removeDoc(item.index)"><span class="glyphicon glyphicon-trash"></span></button>';
	        template=template+'		</div>';
	        template=template+'	</div>';

			element.html(template);
			$compile(element.contents())(scope);

			scope.removeDoc=function(pIndex){
				scope.removeKycDoc({index:pIndex});
			};
		};

		var _controller=["$scope",function($scope){

			$scope.arrDocTypes=["PAN","AADHAAR","PASSPORT","DRIVING-LICENSE","INCOME-PROOF1","INCOME-PROOF2","OTHER"];

			$scope.onselectImg = function($files,pItem) {
				var img_type ='';
				for (var i = 0; i < $files.length; i++){
					var fname=$files[0].name;

			    	var re = (/\.(jpg)$/i);
					if(!re.exec(fname)){
				    	alert("Sorry..!! We can not upload your image. \n Only .Jpg images are allowed");
				    	break;
			    	}

					img_type = fname.split(".")[1];
					var $file = $files[i];
					var base64;
					var reader = new FileReader();
					if ($files[i] && $file) {
						var binaryString;
						var size=((($files[i].size)/1024).toFixed(2)) +" Kb";
						reader.onload = function(readerEvt) {
							binaryString = readerEvt.target.result;

							var spliceIndex = _.chain($scope.imagearray).pluck("index").indexOf(pItem.index).value();
							if(spliceIndex==-1){
								$scope.imagearray.push({index:pItem.index,kyc_name:pItem.docType,kyc_number:pItem.docNumber,image:binaryString.split(",")[1],type:img_type});
							}else{
								$scope.imagearray[spliceIndex].image=binaryString.split(",")[1];
							}

							$("#"+pItem.index).css("background-image", "url("+binaryString+")");
							// $("#"+pItem.index+"label").css("background-image", "none");
							//$("#"+pItem.index+"label").hide();
							$scope.item.isDefault=false;
							$scope.item.image=binaryString;
						};
				        reader.readAsDataURL($files[i]);
					}
				}

				// console.log("Image selected");
				// console.log($scope.item);
			};

			$scope.onDocTypeSelected=function(pDocType){
				if(pDocType==="PAN"){
					$scope.docNumberPattern= new RegExp("^[A-Z]{3}[P][A-Z]\\d{4}[A-Z]");
				}else if(pDocType==="AADHAAR"){
					$scope.docNumberPattern= new RegExp("^[0-9\\d]{12}$");
				}else{
					$scope.docNumberPattern= new RegExp("[a-zA-Z0-9_]*");
				}
			};

			$scope.onDocTypeSelected($scope.item.docType);
		}];

		return {
			restrict : 'E',
			link : linker,
			scope : {
				imagearray : "=",
				item: "=",
				removeKycDoc:"&"
			},
			require:"^form",
			controller : _controller
		};
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

	app.directive('replace', function() {
		return {
			restrict:'A',
			require: 'ngModel',
			link: function(scope, element, attrs, model) {
				model.$parsers.push(function(val) {
				if (!val) { return ''; }
				var transformedInput = val.replace(/[^a-zA-Z0-9]/g, '');
					if (transformedInput !== val) {
						model.$setViewValue(transformedInput);
						model.$render();
					}
					return transformedInput;
				});
			}
		};
	});


	app.directive('autoNext', function() {
	    return {
	       	restrict: 'A',
	       	link: function(scope, element, attr, form) { 
	           	var tabindex = parseInt(attr.tabindex);
	           	var maxLength = parseInt(attr.maxlength);

	           	element.on('keyup', function(e) {
	               	if (element.val().length > maxLength-1) {
	               		var next = angular.element(document.body).find('[tabindex=' + (tabindex+1) + ']');
	                  	if (next.length > 0) {
	                      	next.focus();
	                      	return true;
	                  	} else {
	                      	return false;                          
	                  	}
	               	}
	               	return true;
	          	});
	       	}
	    }
	});


    app.directive('fullscreen', function() {
		return {
            restrict: 'AC',
            template: '<i class="glyphicon glyphicon-fullscreen"></i>',
            link: function(scope, el, attr) {
                el.on('click', function() {
                    var element = el.parents(".modal-content").find(".modal-body")[0];
                    var angElelement=angular.element(element);
                    if (!$('body')
                        .hasClass("full-screen")) {
                        $('body')
                            .addClass("full-screen");
                        $('#fullscreen-toggler')
                            .addClass("active");
                            angElelement.addClass("pdfExpand");
                        if (element.requestFullscreen) {
                            element.requestFullscreen();
                        } else if (element.mozRequestFullScreen) {
                            element.mozRequestFullScreen();
                        } else if (element.webkitRequestFullscreen) {
                            element.webkitRequestFullscreen();
                        } else if (element.msRequestFullscreen) {
                            element.msRequestFullscreen();
                        }

                    } else {
                    	 angElelement.removeClass("pdfExpand");
                        $('body').removeClass("full-screen");
                        el.removeClass("active");

                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        }

                    }
                });
            }
        };
    });

    app.directive('widgetMaximize', function () {
        return {
            restrict: 'A',
            template: '<i class="fa fa-expand"></i>',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    var widget = el.parents(".modal-dialog").eq(0);
                    var button = el.find("i").eq(0);
                    var compress = "fa-compress";
                    var expand = "fa-expand";
                    if (widget.hasClass("maximized")) {
                        if (button) {
                            button.addClass(expand).removeClass(compress);
                        }
                        widget.removeClass("maximized");
                         widget.find("object").css("height","480px");
                    } else {
                        if (button) {
                            button.addClass(compress).removeClass(expand);
                        }
                        widget.addClass("maximized");
                     	el.parents("modal-content").css("height", "100%");
                     	widget.find("object").css("height","565px");
                    }
                });
            }
        };
    });

	app.directive('selectRequired',function(){
	    return {
	        restrict: "A",
	        require:"ngModel",
	        link: function(element,scope,attr,controller){
	            controller.$validators.selectrequired = function(modelValue){                   
	                return  (!!modelValue) && !modelValue.startsWith('Select') && modelValue != '';
	            }
	        }
	    }
	});
	
	app.directive('accessibleForm', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, elem) {

	            // set up event handler on the form element
	            elem.on('submit', function () {

	                // find the first invalid element
	                var firstInvalid = elem[0].querySelector('.ng-invalid');

	                // if we find one, set focus
	                if (firstInvalid) {
	                    firstInvalid.focus();
	                }
	            });
	        }
	    };
	}),

	app.directive("validateForm", ["$parse", function($parse){
		return {
			 post: function postLink(scope, element, iAttrs, controller) {
                    var form = element.controller('form');
                    form.$submitted = false;
                    var fn = $parse(iAttrs.validateForm);
                    element.on('submit', function(event) {
                        scope.$apply(function() {
                            element.addClass('ng-submitted');
                            form.$submitted = true;
                            if(form.$valid) {
                                fn(scope, {$event:event});
                            }
                        });
                    });
                    scope.$watch(function() { return form.$valid}, function(isValid) {
                        if(form.$submitted == false) return;
                        if(isValid) {
                            element.removeClass('has-error').addClass('has-success');
                        } else {
                            element.removeClass('has-success');
                            element.addClass('has-error');
                        }
                        element.focus();
                    });
            }
		};
	}]),

	app.directive('thisEarlierThan', function () {
		return {
			require: 'ngModel',
			restrict: 'A',
			link: function (scope, elem, attrs, ctrl) {
				var cityStay,residenceStay;

				scope.$watch(attrs.ngModel, function (newVal, oldVal, scope) {
					residenceStay = newVal;
					check();
				});

				scope.$watch(attrs.thisEarlierThan, function (newVal, oldVal, scope) {
					cityStay = newVal;
					check();
				});

				var check = function () {
					if (!cityStay || !residenceStay) {
						return;
					}

					if (!validate(cityStay)) {
						return;						
					}

					if (!validate(residenceStay)) {
						return;						
					}

					if (parseInt(cityStay) >= parseInt(residenceStay)) {
						ctrl.$setValidity('thisEarlierThan', true);
					}
					else {
						ctrl.$setValidity('thisEarlierThan', false);
					}

					return;
				};

				var validate = function (iYears) {					
					if (isNaN(parseInt(iYears))) {
						return false;
					}
					else {
						return true;
					}					
				};
			}
		};
	}),

	app.directive("requiredAny",function(){
	    var groups = {};

	    function determineIfRequired(groupName) {
	        var group = groups[groupName];
	        if (!group) return false;

	        var keys = Object.keys(group);
	        return keys.every(function (key) {
	            return (key === 'isRequired') || !group[key];
	        });
	    }

	    return {
	        restrict: 'A',
	        require: '?ngModel',
	        scope: {},
	        link: function postLink(scope, elem, attrs, modelCtrl) {
	            if (!modelCtrl || !attrs.requiredAny) return;

	            var groupName = attrs.requiredAny;
	            if (groups[groupName] === undefined) {
	                groups[groupName] = {isRequired: true};
	            }
	            var group = scope.group = groups[groupName];

	            scope.$on('$destroy', function () {
	                delete(group[scope.$id]);
	                if (Object.keys(group).length <= 1) {
	                    delete(groups[groupName]);
	                }
	            });

	            function updateValidity() {
	                if (group.isRequired) {
	                    modelCtrl.$setValidity('required', false);
	                } else {
	                    modelCtrl.$setValidity('required', true);
	                }
	            }

	            function validate(value) {
	                group[scope.$id] = !modelCtrl.$isEmpty(value);
	                group.isRequired = determineIfRequired(groupName);
	                updateValidity();
	                return value;
	            };

	            modelCtrl.$formatters.push(validate);
	            modelCtrl.$parsers.push(validate);
	            scope.$watch('group.isRequired', updateValidity);
	        }
	    };
	});

	app.directive('changeOnBlur', function() {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        priority:1,
	        link: function(scope, elm, attrs, ngModelCtrl) {
	            if (attrs.type === 'radio' || attrs.type === 'checkbox') 
	                return;

	            var expressionToCall = attrs.changeOnBlur;

	            var oldValue = null;
	            elm.bind('focus',function() {
	                oldValue = elm.val();
	            })
	            elm.bind('blur', function() {
	                scope.$apply(function() {
	                    var newValue = elm.val();
	                    if (newValue !== oldValue){
	                        scope.$eval(expressionToCall);
	                    }
	                });         
	            });
	        }
	    };
	});

	app.directive("whenScrolled",function(){
	    return function(scope, elm, attr) {
	      var raw = elm[0];
	      elm.bind('scroll', function() {
	        if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
	          scope.$apply(attr.whenScrolled);
	        }
	      });
	    };
	});
}).call(this);