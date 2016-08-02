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

	app.directive('imageUpload',function($compile,RestService){
		var linker = function(scope, element, attrs) {
			var template = 	  '<div class="row clearfix">'
			template=template+	'<div class="col-md-4" ng-repeat="item in requestImageArray">';		
			template=template+		'<content-item item="item" imagearray="imageArrayToUpload"></content-item>';
			template=template+	'</div>';
			template=template+'</div>';
			template=template+'<div class="row clearfix" style="text-align: center;">';
			template=template+	'<button class="customButton submit" id="reprocess" ng-click="uploadAllImgs()" style="float: inherit;">Submit</button>';
			template=template+'</div>';
			element.html(template);
			$compile(element.contents())(scope);
		};

		var _controller=["$scope",function($scope){
			// console.log("Image Array Request: ");
			// console.log($scope.requestImageArray);

			console.log("Reference ID: ");
			console.log($scope.referenceId);

			$scope.imageArrayToUpload=[];

			$scope.imageUploadedCount=0;

			/*
			 * Author Sayali uploadallimg function to upload img one by one
			 */
			$scope.uploadAllImgs=function()
			{
				// console.log("upload Image array :"+array.length);
				for(var i=0 ; i<$scope.imageArrayToUpload.length ; i++){
					if($scope.imageArrayToUpload[i] != null){
						var json ={
					  		"oHeader": {
						    	"sAppID": $scope.referenceId,  // application id
							    "sApplID": "1" // applicant id
						  	},
						  	"sRefID": $scope.referenceId,
					  		"oUpldDtl": {
							    "sFileID": "1", // ask yogesh
							    "sFileName": $scope.imageArrayToUpload[i].kyc_name,
							    "sFileType": $scope.imageArrayToUpload[i].type,
							    "sfileData": $scope.imageArrayToUpload[i].image,
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
	});

	app.directive('contentItem', function ($compile) {
		var linker = function(scope, element, attrs) {
			var template = '<div class="row clearfix" style="padding: 8px;">';
			template=template+'<label>{{item.doc}}</label>';
			template=template+'<div class="preview" id="{{item.value}}{{item.index}}">';
			template=template+'<input id="{{item.value}}l{{item.index}}" type="file" ngf-select="onselectImg($files,'+"'{{item.value}}'"+','+"'{{item.index}}'"+')">';
			template=template+'<label for="{{item.value}}l{{item.index}}" id="{{item.value}}{{item.index}}label">';
			template=template+'<img alt="" src="../images/camera-128.png" class="img_icon"></label></div>';
			template=template+'<small id="{{item.value}}{{item.index}}size" class="size"></small>';
			template=template+'<div style="height:20px;display:inline"><a class="remove_image" id="{{item.value}}{{item.index}}remove" name="{{item.value}}{{item.index}}" style="display:none" ng-click="onImageRemove(item)">Remove</a></div>';
			template=template+'</div>';
			element.html(template);
			$compile(element.contents())(scope);
		};

		var _controller=["$scope",function($scope){
			console.log("Image Array To Upload: ");
			console.log($scope.imagearray);
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

			$scope.onselectImg = function($files,type,index) 
			{           
				//console.log("inside file select"+type+" file:"+$files[0].name);
				//alert("Hello");
				var img_type ='';
				for (var i = 0; i < $files.length; i++) 
				{    	
					var fname=$files[0].name;
	// countimg++;
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
	// 						base64 = btoa(binaryString);
							if(_.contains(["APPLICANT-PHOTO","PAN","AADHAAR","PASSPORT","DRIVING-LICENSE","CUSTOMER-PHOTO","INCOME-PROOF1","INCOME-PROOF2","OTHER"],type)){
								$scope.imagearray.push({kyc_name:type,image:binaryString.split(",")[1],type:img_type});
							}else if(_.contains(["APPLICATION_FORM","AGREEMENT","ACH","DISBURSEMENT","ADDITIONAL_KYC","holdCase"],type)){
								$scope.imagearray.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
							}

							$("#"+type+index+"").css("background-image", "url("+binaryString+")");
							$("#"+type+index+"label").hide();
							$("#"+type+index+"remove").show();

	// 			            switch (type) {
	// 			            case "APPLICANT-PHOTO":
	// 							$scope.selectImgInit = binaryString	
	// 				        	img_array.push({kyc_name:"APPLICANT-PHOTO",image:$scope.selectImgInit.split(",")[1],type:img_type});
	// 							break;
	// 			            case "PAN":
	// 							$scope.selectImg1 = binaryString	
	// 				        	img_array.push({kyc_name:"PAN",image:$scope.selectImg1.split(",")[1],type:img_type});
	// 							break;
	// 						case "AADHAAR":
	// 							$scope.selectImg2 = binaryString
	// 							img_array.push({kyc_name:"AADHAAR",image:$scope.selectImg2.split(",")[1],type:img_type});
	// 							break;
	// 						case "PASSPORT":
	// 							$scope.selectImg3 = binaryString
	// 							img_array.push({kyc_name:"PASSPORT",image:$scope.selectImg3.split(",")[1],type:img_type});
	// 							break;
	// 						case "DRIVING-LICENSE":
	// 							$scope.selectImg4 = binaryString
	// 							img_array.push({kyc_name:"DRIVING-LICENSE",image:$scope.selectImg4.split(",")[1],type:img_type});
	// 							break;
	// 						case "CUSTOMER-PHOTO":
	// 							$scope.selectImg5 = binaryString
	// 							img_array.push({kyc_name:"APPLICANT-PHOTO",image:$scope.selectImg5.split(",")[1],type:img_type});
	// 							break;
	// 						case "INCOME-PROOF1":
	// 							$scope.selectImg6 = binaryString
	// 							img_array.push({kyc_name:"INCOME-PROOF1",image:$scope.selectImg6.split(",")[1],type:img_type});
	// 							break;
	// 						case "INCOME-PROOF2":
	// 							$scope.selectImg7 = binaryString
	// 							img_array.push({kyc_name:"INCOME-PROOF2",image:$scope.selectImg7.split(",")[1],type:img_type});
	// 							break;
	// 						case "OTHER":
	// 							$scope.selectImg8 = binaryString
	// 							img_array.push({kyc_name:"OTHER",image:$scope.selectImg8.split(",")[1],type:img_type});
	// 							break;
	// 						case "APPLICATION_FORM":
	// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
	// 							$(document.body).find("#"+type+index+"label").hide();
	// 							$(document.body).find("#"+type+index+"remove").show();
	// //							$(document.body).find("#"+type+index+"size").text(size);
	// //							$scope.agreeimage = binaryString;
	// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
	// //							console.log((type+index));
	// 							break;

	// 						case "AGREEMENT":
	// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
	// 							$(document.body).find("#"+type+index+"label").hide();
	// 							$(document.body).find("#"+type+index+"remove").show();
	// //							$(document.body).find("#"+type+index+"size").text(size);
	// //							$scope.agreeimage = binaryString;
	// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
	// //							console.log((type+index));
	// 							break;	

	// 						case "ACH":
	// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
	// //							$scope.agreeimage = binaryString;
	// 							$(document.body).find("#"+type+index+"label").hide();
	// 							$(document.body).find("#"+type+index+"remove").show();
	// //							$(document.body).find("#"+type+index+"size").text(size);
	// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
	// //							console.log((type+index));
	// 							break;	

	// 						case "DISBURSEMENT":
	// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
	// 							$(document.body).find("#"+type+index+"label").hide();
	// 							$(document.body).find("#"+type+index+"remove").show();
	// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
	// 							break;	

	// 						case "ADDITIONAL_KYC":
	// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
	// 							$(document.body).find("#"+type+index+"label").hide();
	// 							$(document.body).find("#"+type+index+"remove").show();
	// 							addkyc_array.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
	// 							break;	

	// 						case "holdCase":
	// 							$(document.body).find("#"+type+index+"").css("background-image", "url("+binaryString+")");
	// 							$(document.body).find("#"+type+index+"label").hide();
	// 							$(document.body).find("#"+type+index+"remove").show();
	// 							imagearray.push({kyc_name:(type+index),image:binaryString.split(",")[1],type:img_type});
	// 							break;
	// 			            }
				      };
				        reader.readAsDataURL($files[i]);
				  //       $timeout(function(){
						// }, 1000);
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

	// directives from simdirecctive.js (Piyush) (need to disccuss why need all these)
	// app.directive('policy', function() {
	//     var directive = {};

	//     directive.restrict = 'E'; 
	//     directive.templateUrl = 'views/templates/policy-outcome.html';
	//     return directive;
	// });

	// app.directive('score', function() {
	//     var directive = {};

	//     directive.restrict = 'E'; 
	//     directive.templateUrl = 'views/templates/score-rule.html';
	//     return directive;
	// });

	// app.directive('matrix', function() {
	//     var directive = {};

	//     directive.restrict = 'E'; /* restrict this directive to elements */
	//     directive.templateUrl = 'views/templates/matrix.html';
	//     return directive;
	// });

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
	      /*  var regex = new RegExp(scope.regex);
	        var replaced = val.replace(regex, scope.with); 
	        if (replaced !== val) {
	          model.$setViewValue(replaced);
	          model.$render();
	        }         
	        return replaced;  */       
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

	app.directive('selectRequired',function(){
	    return {
	        restrict: "A",
	        require:"ngModel",
	        link: function(element,scope,attr,controller){
	            controller.$validators.selectrequired = function(modelValue){                   
	                return modelValue === '' || (modelValue && modelValue.startsWith('Select')) ? false : true;
	            }
	        }
	    }
	});
}).call(this);