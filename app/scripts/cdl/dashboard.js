var app=angular.module('gonogo.cdl');

app.controller('DecisionViewController', function ($scope,$uibModalInstance, data) {
//	alert(response);
//	console.log("Dialog parameter 3: ");
//	console.log(baseURL);
	$scope.data = data;
	$scope.closeModal = function(){
        $uibModalInstance.dismiss();
    };
//	 $scope.selected = {
//			 item: $scope.items[0]
//	 };
});

app.controller("DashboardController",["$scope","$filter",'sharedService',"$uibModal",'APP_CONST',"RestService","UserService","$rootScope","GNG_GA","$state",
							function($scope,$filter,sharedService,$uibModal,APP_CONST,RestService,UserService,$rootScope,GNG_GA,$state){
	
	var user = UserService.getCurrentUser();

	if(user.role != "DSA"){
		$state.go(APP_CONST.getConst('APP_CONTEXT'));
	}

	// TODO need to check with sayali & piyush

	if(!_.isUndefined(user.id) ){

			if(user.actions && user.actions.length != 0) { 
				$scope.app =_.contains(user.actions,'APPLICATION' );
				$scope.notif =_.contains(user.actions,'NOTIFICATION');
				$scope.policy =_.contains(user.actions,'POLICY' );
				$scope.analytics =_.contains(user.actions,'ANALYTCS');
			}

			$scope.username = user.username;
			$scope.useremail = user.useremail;
			$scope.image = user.image;	
			$scope.instImage = user.instImage;
			$scope.InstitutionID = user.InstitutionID;
			$scope.userid = user.userid;
			$scope.color = user.color;
		
	}else{
			
		$state.go(APP_CONST.getConst('APP_CONTEXT'));
		
	}

	
	$scope.trueAppList = 1;
	
	$scope.applnOptionChange = function(){

		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DASHBOARD"),
				 		GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
				 		GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_DATA_TYPE"),
				 		$scope.dashboardType,1);

	   	if($scope.dashfilters.type !== 'ApplicationList'){
	   		
	   		var json = {
						'sInstID':user.institutionID,
						'sDsaId':user.username,
						'oCriteria': { 
										"oHierarchy":user.hierarchy,
										"aProducts":user.getProductNames()
									 }
						};
			RestService.saveToServer("stack-graph",json).then(function(data){
				$scope.orignalData = data;
			});

			$scope.trueAppList = 0;
	   	}else{
	   		$scope.trueAppList = 1;
	   	}

	   	

  	}
	//end

	
	$scope.dashboardResult=[];

	$scope.sortType     = 'dDate'; 
	$scope.sortDesc  = true; 

	/*$scope.searchText   = ''; 
	$scope.query   = '';*/

	$scope.dashfilters = {
		type:"ApplicationList",
		duration : "LastWeek",
		search:""
	},$scope.dashType = ['Application List','Application Summary'].map(function(item){
		return {view:item, value : item.replace(/ +/g, "")};
	}),$scope.durationTypes = ['Last Week','Last Month','Last Year'].map(function(item){
		return {view : item, value : item.replace(/ +/g, "")};
	})

	function calculateFromDate($type){
		switch($type) {
			case 'LastYear' : 
				return moment().subtract(1,'year').format('YYYY-MM-DD');
				break;
			case 'LastMonth' : 	
				return  moment().subtract(1,'month').format('YYYY-MM-DD');
				break;
			case 'LastWeek' : 
				return  moment().subtract(1,'week').format('YYYY-MM-DD');
				break;
			default : 
				return moment().format('YYYY-MM-DD');
		}

	}

	$scope.fetchDashboardList=function(){
		
		$scope.isLoadingDashboardData=true;
		var todate = moment().format('YYYY-MM-DD'),
			fromDate =	calculateFromDate($scope.dashfilters.duration),

		//TODO Get sDsaId
		dashboardJson={
				"iLimit":1000,
				"dtToDate":todate,
				"dtFromDate":fromDate,
				"sDsaId":$scope.username,
				"iSkip":0
		};

		RestService.saveToServer("dashboard-detail",dashboardJson)
		.then(function(data){
			if(data){
				console.log(data);
				$scope.dashboardResult = data;	
			}
			
		}).finally(function(){
			$scope.isLoadingDashboardData=false;
		});
	};

	$scope.loadCDLForm=function(refID,decisionStatus){
		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DEALER"),
					 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
					 GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_APPLICATION_CLICKED"),
					 "Dashboard Application Clicked",1,"","",refID);

		sharedService.setRefID(refID);

		sharedService.setDecisionStatus(decisionStatus);
		
		$state.go( "/cdl/customerForm" );
	};

	$scope.fetchDashboardList();

    $scope.dashSearch = function (row) {

    	var name = row.sName,
    	name=name.toLowerCase(),

    	stage = row.sStages,
    	stage = stage.toLowerCase(),

    	refID = row.sRefId,
    	refID = refID.toLowerCase(),

    	amt = row.dAmtApprvd,

    	scheme=row.sScheme,
 	   	scheme=scheme.toLowerCase();

    	var query = $scope.dashfilters.search,
    		query = query.toLowerCase();

		if(!$scope.dashfilters.search || 
			(name.indexOf(query) != -1)  || 
			(stage.indexOf(query) != -1) || 
			(refID.indexOf(query) != -1) || 
			(amt == query) || 
			(scheme.indexOf(query) != -1)){
			return true;
		}

    	return false;	
        
    };

    $scope.moreClicked=function(decision,remark,subject){ 

		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DEALER"),
					 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
					 GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_APPLICATION_MORE_CLICKED"),
					 "Dashboard Application More Clicked",1);
   	
    	var data={
			decision:decision,
			remark:remark,
			subject:subject
    	}
    	
    	$scope.shwDecisionModal('lg',data);
    };
    
	$scope.shwDecisionModal = function (size,data) {
		 //alert('modal baseURL'+baseURL);
	 	var modalInstance = $uibModal.open({
	 		animation: true,
	 		templateUrl: 'views/cdl/dashboard-result.html',
	 		controller: 'DecisionViewController',
	 		size: size,
	 		resolve: {
	 			data:function(){
	 				//alert("Data :"+data);
	 				return data;
	 			}
	 		}
		});
	};
}]);

app.directive('ngModelOnblur',['GNG_GA', function(GNG_GA) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope:{
        	durationSelected:"=",
        	fetchDashboard:"&"
        },
        link: function(scope, elm, attr, ngModelCtrl) {        	 
            if (attr.type === 'radio' || attr.type === 'checkbox') return;           
            elm.unbind('input').unbind('change');
            elm.bind('keyup', function() {            	
                scope.$apply(function() {
                	//console.log("Duration Fetched:"+scope.durationSelected+" Value:"+elm.val());
                	ngModelCtrl.$setViewValue(elm.val());
                	if(elm.val().length>=0)
                	{
						GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DEALER"),
									 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
									 GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_SEARCH"),
									 "Dashboard Search Clicked",1);

                		scope.fetchDashboard();
                	}                   
                });         
            });
        }
    };
}]);