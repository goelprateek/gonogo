;(function(){
	
	'use strict';	
	
	var app=angular.module("gonogo.cdl");

	app.directive("assetSelector",function(){
		return {
			require: '^form',
			scope:{
				asset:"=",
			},
			restrict: 'E',
			templateUrl: function(elem,attrs) {
           		return 'views/cdl/template-asset.html'
       		},
       		controller:["$scope","RestService","UserService",function($scope,RestService,UserService){

       			var user=UserService.getCurrentUser();

				//	 get all asset category from master
				$scope.fetchAssetCategory = function(){
					$scope.assetJson = {"oHeader":{"sInstID":user.institutionID},"sQuery":""};
					
					RestService.saveToServer("asset-category-web", $scope.assetJson).then(function(successResponse){
						if(successResponse){
							
							$scope.assetArray=successResponse;

							if($scope.asset && $scope.asset.category){
								$scope.fetchAssetMake($scope.asset.category);
							}
						}
					},function(failedResponse){
						$scope.serviceHitCount=$scope.serviceHitCount+1;
						
						if($scope.serviceHitCount<=3){
						
							$scope.fetchAssetCategory();
						
						}else{
							$scope.serviceHitCount=1;
							$scope.error="Sorry we can not process your Asset request";
							notifier.logError("Some error occured at server, we can not process your Asset request");
						}
					});
				};

				$scope.fetchAssetCategory();

				$scope.fetchAssetMake = function(val1){
					$scope.makeJson ={"oHeader":{"sInstID":user.institutionID},"sQuery":val1};

					RestService.saveToServer('asset-model-make-web', $scope.makeJson).then(function(successResponse){
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

					RestService.saveToServer("asset-model-all-web", $scope.mdlJson).then(function(successResponse){
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

					/*$scope.asset.make="";
					$scope.asset.model="";*/

					$scope.fetchAssetMake($scope.asset.category);
       			};

       			$scope.onMakeChanged=function(){
       				$scope.modelTags=[];

					/*$scope.asset.make="";
					$scope.asset.model="";*/

					$scope.fetchAssetModel($scope.asset.category,$scope.asset.make);
       			};

       			$scope.onModelChanged=function(){       				
					/*$scope.asset.model="";*/
       			};
       		}]
		}
	});
}).call(this);