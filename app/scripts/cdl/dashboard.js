var app=angular.module('gonogo');

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

app.controller("DashboardController",["$scope","$filter",'sharedService','$location',"$uibModal",'APP_CONST',"RestService","UserService","$rootScope","GNG_GA",
							function($scope,$filter,sharedService,$location,$uibModal,APP_CONST,RestService,UserService,$rootScope,GNG_GA){
	 //sayali (added stacked graph service using directive)
	var user=UserService.getCurrentUser();

	$scope.dashboardType="ApplicationList";
	$scope.trueAppList = true;

	$scope.isLoadingDashboardData=true;

	$scope.applnOptionChange=function(value){

		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DASHBOARD"),
				 		GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
				 		GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_DATA_TYPE"),
				 		$scope.dashboardType,1);

	   	if(value == 'ApplicationList'){
	   		$scope.trueAppList = true;
	   	}else{
			var json = {'sInstID':user.institutionID,'sDsaId':user.username};
			RestService.saveToServer("stack-graph",json).then(function(data){
				$scope.orignalData = data;
			});
	   		$scope.trueAppList = false;
	   	}
  	}
	//end

	$scope.duration="LastYear";
	$scope.dashboardResult=[];

	$rootScope.errHead="";
	$rootScope.errorMsg="";

	//console.log("Scope :");
	//console.log($scope);

	$scope.sortType     = 'dDate'; // set the default sort type
	$scope.sortDesc  = true;  // set the default sort order
	$scope.searchText   = '';     // set the default search/filter term
	$scope.query   = '';

	$scope.fetchDashboardList=function(){
		//alert("Search String: "+$scope.searchText+" Duration: "+$scope.duration);

		if(!_.isUndefined(user.id) )
		{
			if(user.actions && user.actions.length!=0)
			{ 
				$scope.app=_.contains(user.actions,'APPLICATION' );
				$scope.notif=_.contains(user.actions,'NOTIFICATION');
				$scope.policy=_.contains(user.actions,'POLICY' );
				$scope.analytics=_.contains(user.actions,'ANALYTCS');
			}

			$scope.username = user.username;
			$scope.useremail = user.useremail;
			$scope.image = user.image;	
			$scope.instImage = user.instImage;
			$scope.InstitutionID = user.InstitutionID;
			$scope.userid = user.userid;
			$scope.color = user.color;
		}else{
			$location.path(APP_CONST.getConst('APP_CONTEXT'));
		}

//		alert($scope.useremail.toLowerCase());
//		alert($scope.useremail.toLowerCase().indexOf("dsa"));
		if(user.role!="DSA")
		{
//			console.log();
//			alert("Moving to root");
			$location.path("/");
		}

		$scope.query   = $scope.searchText;

		var todayStr = $filter('date')(new Date(),'yyyy-MM-dd');

		var fromDate=new Date();

		if($scope.duration=="LastYear"){
			fromDate.setYear(fromDate.getFullYear()-1);
		}else if($scope.duration=="LastMonth"){
			fromDate.setMonth(fromDate.getMonth()-1);
		}else if($scope.duration=="LastWeek"){
			fromDate.setDate(fromDate.getDate()-7);
		}
		var fromDateStr = $filter('date')(fromDate,'yyyy-MM-dd');

		//TODO Get sDsaId
		dashboardJson={"iLimit":10000,"dtToDate":todayStr,"sDsaId":$scope.username,"iSkip":0,"dtFromDate":fromDateStr};

		var dashboardJson=JSON.stringify(dashboardJson);
		// var urlConst= APP_CONST.getConst('BASE_URL_GNG');

		//console.log("APP_CONST.getConst('BASE_URL_GNG')" + APP_CONST.getConst('BASE_URL_GNG'));
		RestService.saveToServer("dashboard-detail",dashboardJson)
		.then(function(data){
			//console.log("dashboard-detail response:");
			//console.log(data);
			$scope.isLoadingDashboardData=false;

			$scope.dashboardResult=data;
		});
	};

	$scope.loadCDLForm=function(refID,decisionStatus){
		GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_CDL_DEALER"),
					 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
					 GNG_GA.getConstAction("ACTION_CLICK_DASHBOARD_APPLICATION_CLICKED"),
					 "Dashboard Application Clicked",1,"","",refID);

		sharedService.setRefID(refID);
		sharedService.setDecisionStatus(decisionStatus);
		$location.path( "/cdl/customerForm" );
	};

	$scope.fetchDashboardList();

    $scope.search = function (row) {
//    	console.log("Row:");
//    	console.log(row);
    	var name=row.sName;
    	name=name.toLowerCase();

    	var query=$scope.query || "";
    	query=query.toLowerCase();

    	var stage=row.sStages;
    	stage=stage.toLowerCase();

    	var refID=row.sRefId;
    	refID=refID.toLowerCase();

    	var amt=row.dAmtApprvd;

    	var scheme=row.sScheme;
    	scheme=scheme.toLowerCase();

        return (name.indexOf(query || '') !== -1 
        		|| stage.indexOf(query || '') !== -1
        		|| refID.indexOf(query || '') !== -1
        		|| amt==query
        		|| scheme.indexOf(query || '') !== -1);
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