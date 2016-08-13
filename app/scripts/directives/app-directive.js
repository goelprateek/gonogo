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
			// console.log("Image Array Request: ");
			// console.log($scope.requestImageArray);

			//console.log("Reference ID: ");
			//console.log($scope.referenceId);

			$scope.imageArrayToUpload=[];

			$scope.uploadImages=function(){

				if($scope.requestImageArray.length == $scope.imageArrayToUpload.length){
					UploadImages.upload($scope.referenceId,$scope.imageArrayToUpload).then(function(imageUploadedCount) {
					  	$log.debug('Image upload Success, Total image uploaded : ' + imageUploadedCount);
					  	$scope.onImageUploaded();
					}, function(reason) {
					  	$log.debug('Image upload Failed, Total image uploaded : ' + imageUploadedCount);
					});
				}else{
					notifier.logWarning("Please provide all images.") ;
				}
			};

			/*
			 * Author Sayali uploadallimg function to upload img one by one
			 */
			 /*
			$scope.uploadAllImgs=function(pReferenceID,pImageArrayToUpload)
			{
				// console.log("upload Image array :"+array.length);
				for(var i=0 ; i<$scope.imageArrayToUpload.length ; i++){
					if($scope.imageArrayToUpload[i] != null){
						var json ={
					  		"oHeader": {
						    	"sAppID": pReferenceID,  // application id
							    "sApplID": "1" // applicant id
						  	},
						  	"sRefID": pReferenceID,
					  		"oUpldDtl": {
							    "sFileID": "1", // ask yogesh
							    "sFileName": pImageArrayToUpload[i].kyc_name,
							    "sFileType": pImageArrayToUpload[i].type,
							    "sfileData": pImageArrayToUpload[i].image,
							    "sStat": "", // ask yogesh
							    "sReason": "" // ask yogesh
						  	}
						};
				//		console.log("image JSon : "+JSON.stringify(json));
						uploadImage(json);	
					}
				}
			};

			function uploadImage(json)
			{
				RestService.saveToServer("upload-image",json)
				.then(function(data)
				{
					$scope.imageUploadedCount=$scope.imageUploadedCount+1;

					if($scope.imageUploadedCount == $scope.imageArrayToUpload.length){
						$scope.onImageUploaded();
					}

					if(Response.sStatus == 'SUCCESS')
					{
		//				console.log("response for-"+JSON.stringify(Response));		
					}
	 			},function(failedResponse){
	 				$scope.serviceHitCount=$scope.serviceHitCount+1;
					if($scope.serviceHitCount<=3)
					{
					  	uploadImage(json);
					}else{
						$scope.serviceHitCount=1;

						$scope.imageUploadedCount=$scope.imageUploadedCount+1;
						if($scope.imageUploadedCount == $scope.imageArrayToUpload.length){
							$scope.onImageUploaded();
						}
						alert("Sorry we can not process your image upload request");
					}
				});
			};*/
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
			var template = '<div class="row clearfix" style="padding: 8px;">';
			template=template+'<label>{{item.doc}}</label>';
			template=template+'<div class="preview" id="{{item.value}}{{item.index}}">';
			template=template+'<input id="{{item.value}}l{{item.index}}" type="file" ngf-select="onselectImg($files,{{item}})">';
			template=template+'<label for="{{item.value}}l{{item.index}}" id="{{item.value}}{{item.index}}label">';
			template=template+'<img alt="" src="../images/camera-128.png" class="img_icon"></label></div>';
			template=template+'<small id="{{item.value}}{{item.index}}size" class="size"></small>';
			template=template+'<div style="height:20px;display:inline"><a class="remove_image" id="{{item.value}}{{item.index}}remove" name="{{item.value}}{{item.index}}" style="display:none" ng-click="onImageRemove(item)">Remove</a></div>';
			template=template+'</div>';
			element.html(template);
			$compile(element.contents())(scope);
		};

		var _controller=["$scope",function($scope){
			//console.log("Image Array To Upload: ");
			//console.log($scope.imagearray);
			// var countimg=0;

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
					if($scope.imagearray[i].kyc_name == kycName){
						/* delete img_array[i]; */
						$scope.imagearray.splice(i,1);
					}
				}
			};

			$scope.onselectImg = function($files,item) 
			{
				//console.log("inside file select"+type+" file:"+$files[0].name);
				//alert("Hello");
				var img_type ='';
				for (var i = 0; i < $files.length; i++) 
				{
					var fname=$files[0].name;
	// 				countimg++;
	//		    	var re = (/\.(gif|jpg|jpeg|tiff|png)$/i);
			    	var re = (/\.(jpg)$/i);
					if(!re.exec(fname))
			    	{
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
							if(_.contains(["APPLICANT-PHOTO","PAN","AADHAAR","PASSPORT","DRIVING-LICENSE","CUSTOMER-PHOTO","INCOME-PROOF1","INCOME-PROOF2","OTHER"],item.value)){
								$scope.imagearray.push({kyc_name:item.value,image:binaryString.split(",")[1],type:img_type});
							}else if(_.contains(["APPLICATION_FORM","AGREEMENT","ACH","DISBURSEMENT","ADDITIONAL_KYC"],item.value)){
								$scope.imagearray.push({kyc_name:(item.value+item.index),image:binaryString.split(",")[1],type:img_type});
							}else if(item.value==="holdCase"){
								$scope.imagearray.push({kyc_name:item.doc, image:binaryString.split(",")[1], type:img_type, state:item.state,reason:item.reason});
							}

							$("#"+item.value+item.index+"").css("background-image", "url("+binaryString+")");
							$("#"+item.value+item.index+"label").hide();
							$("#"+item.value+item.index+"remove").show();
						};
				        reader.readAsDataURL($files[i]);
					}
				}
			}
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
	                return !modelValue || modelValue === '' || (modelValue && modelValue.startsWith('Select')) ? false : true;
	            }
	        }
	    }
	});
	
}).call(this);