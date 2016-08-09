;(function(){
	'use strict';	
	var app=angular.module("gonogo.cdl");

	app.directive("assetSelector",function(){
		return {
			scope:{
				asset:"="				
			},
			restrict: 'E',
			templateUrl: function(elem,attrs) {
           		//return attrs.templateUrl || 'some/path/default.html'
           		return 'views/cdl/template_asset.html'
       		},
       		controller:["$scope","RestService","UserService",function($scope,RestService,UserService){

       			var user=UserService.getCurrentUser();

				//	 get all asset category from master
				$scope.fetchAssetCategory = function(){
					$scope.assetJson = {"oHeader":{"sInstID":user.institutionID},"sQuery":""};
					var url="asset-category-web";

					RestService.saveToServer(url, $scope.assetJson).then(function(successResponse){
						if(successResponse){
							$scope.assetArray=successResponse;

							if($scope.asset && $scope.asset.category){
								$scope.fetchAssetMake($scope.asset.category);
							}
						}
					},function(failedResponse){
						$scope.serviceHitCount=$scope.serviceHitCount+1;
						if($scope.serviceHitCount<=3)
							{
								$scope.fetchAssetCategory();
							}
						else{
							$scope.serviceHitCount=1;
							$scope.error="Sorry we can not process your Asset request";
							notifier.logError("Some error occured at server, we can not process your Asset request");
						}
					});
				};
				$scope.fetchAssetCategory();

				$scope.fetchAssetMake = function(val1){
					$scope.makeJson ={"oHeader":{"sInstID":user.institutionID},"sQuery":val1};
					var url="asset-model-make-web";

					RestService.saveToServer(url, $scope.makeJson).then(function(successResponse){
						if(successResponse){
							$scope.makeTags = successResponse;

							if($scope.asset && $scope.asset.make){
								$scope.fetchAssetModel($scope.asset.category,$scope.asset.make);
							}
						}
					},function(failedResponse){
						$scope.serviceHitCount=$scope.serviceHitCount+1;
						if($scope.serviceHitCount<=3)
							{
								$scope.fetchAssetMake(val1);
							}
						else{
							$scope.serviceHitCount=1;
							$scope.error="Sorry we can not process your Asset request";
							notifier.logError("Some error occured at server, we can not process your Asset request");
						}
					});
				};

				if($scope.asset && $scope.asset.make){
					$scope.fetchAssetMake($scope.asset.category);
				}

				$scope.fetchAssetModel = function(val1,val2){
					$scope.mdlJson ={"oHeader":{"sInstID":user.institutionID},"sQuery":val1,"sQuery2":val2}; 

					var url="asset-model-all-web";

					RestService.saveToServer(url, $scope.mdlJson).then(function(successResponse){
						if(successResponse){
							$scope.modelTags=[];
							for(var i in successResponse)
							{
								if(successResponse[i].sMdlNo !=="")
								{	
									$scope.modelTags.push(successResponse[i].sMdlNo);
								}					
							}
						}
					},function(failedResponse){
						$scope.serviceHitCount=$scope.serviceHitCount+1;
						if($scope.serviceHitCount<=3)
						{
							$scope.fetchAssetMake(val1);
						}
						else{
							$scope.serviceHitCount=1;
							$scope.error="Sorry we can not process your Asset request";
							notifier.logError("Some error occured at server, we can not process your Asset request");
						}
					});
				};

				if($scope.asset && $scope.asset.model){
					$scope.fetchAssetModel($scope.asset.category,$scope.asset.make);
				}

       			$scope.onCategoryChanged=function(){
       				$scope.makeTags=[];
					$scope.modelTags=[];

					$scope.asset.make="";
					$scope.asset.model="";

					$scope.fetchAssetMake($scope.asset.category);
       			};

       			$scope.onMakeChanged=function(){
       				$scope.modelTags=[];

					$scope.asset.make="";
					$scope.asset.model="";

					$scope.fetchAssetModel($scope.asset.category,$scope.asset.make);
       			};

       			$scope.onModelChanged=function(){       				
					$scope.asset.model="";
       			};
       		}]
		};
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