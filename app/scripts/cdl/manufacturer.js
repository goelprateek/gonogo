;(function(){


	'use strict';

	angular.module('gonogo').controller("manufacturerController",function(
		$upload,$scope,$http,$timeout,$window,$location,$q,APP_CONST) {
	
	var userdata = JSON.parse(atob(localStorage.getItem('GUID')));

	$scope.username = userdata.name;
	$scope.useremail = userdata.email;
	$scope.InstitutionID = userdata.InstitutionID;
	$scope.userid = userdata.userid;
	
	$scope.astMaster = function(){
	  	$scope.assetJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":""}; 
	  	$http({
	  		method : 'POST',
	  		url : APP_CONST.getConst('BASE_URL_GNG')+'asset-category-web',
	  		data :$scope.assetJson,
	  		headers : {'Content-Type' : 'application/json'}
	  	}).success(function(data) 
	  	{
	  		$scope.categoryArray=data;		
	  }).error(function(data) 
	  {
	  	$scope.serviceHitCount=$scope.serviceHitCount+1;
	  	if($scope.serviceHitCount<=3)
	  		{
	  			$scope.astService();
	  		}
	  	else{
	  		$scope.serviceHitCount=1;
	  		$scope.error="Sorry we can not process your Asset request";
	  	}	
	  });
	  }
	  $scope.astMaster();
	  $scope.Manufacturer=[];
	  $scope.assetManufacturer = function(val1){
		  console.log("val1:"+val1);
			$scope.makeJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":val1}
			$http({
				method : 'POST',
				url : APP_CONST.getConst('BASE_URL_GNG')+'asset-model-make-web',
				data :$scope.makeJson,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
			{
				$scope.Manufacturer = data;
				console.log("data:"+data);
				console.log("$scope.Manufacturer:"+$scope.Manufacturer);
				$scope.mjob=$scope.Manufacturer[0];
				
				$scope.assetModel(val1,$scope.mjob)
			}).error(function(data)
			{ 
			console.log("Getting Error from make service ...");
			});
		}	  
	  
	  $scope.assetArray=[];
	  $scope.assetModel = function(val1,val2){
		  console.log("val1 :"+val1+",val2:"+val2);
			$scope.mdlJson ={"oHeader":{"sInstID":$scope.InstitutionID},"sQuery":val1,"sQuery2":val2}; 
			$http({
				method : 'POST',
				url : APP_CONST.getConst('BASE_URL_GNG')+'asset-model-all-web',
				data :$scope.mdlJson,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
			 { $scope.assetArray=[];
				for(i in data)
				{
					if(data[i].sMdlNo !=="")
					{	$scope.assetArray.push(data[i].sMdlNo);
					}					
				}
				$scope.mjob1=$scope.assetArray[0];
				console.log("Data Asset Model : " + $scope.assetArray);			
				/*$("#mdl ,#mdl1").autocomplete({
					source: $scope.modelTags
				});
*/			 }).error(function(data) 
			{
			 console.log("Getting Error from asset model service ...");
			});
		}
	  
	  $(document.body).on("click",".category",function(){
		$(this).addClass("picked");
		$(this).siblings("div").removeClass("picked");
	  });

	
	});

}).call(this) 



	  