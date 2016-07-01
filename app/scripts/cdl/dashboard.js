var app=angular.module('gonogo');

app.controller('DecisionViewController', function ($scope,$uibModalInstance, data) {
//	alert(response);
//	console.log("Dialog parameter 3: ");
//	console.log(baseURL);
	 $scope.data = data;
//	 $scope.selected = {
//			 item: $scope.items[0]
//	 };
});

app.controller("DashboardController",["$scope","$filter",'sharedService','$location',"$uibModal",'APP_CONST',"RestService",function($scope,$filter,sharedService,$location,$uibModal,APP_CONST,RestService){
	$scope.applicationList="ApplicationList";
	$scope.duration="LastYear";
	$scope.dashboardResult=[];

	console.log("Scope :");
	console.log($scope);

	$scope.sortType     = 'dDate'; // set the default sort type
	$scope.sortDesc  = true;  // set the default sort order
	$scope.searchText   = '';     // set the default search/filter term
	$scope.query   = '';

	$scope.fetchDashboardList=function(){
		//alert("Search String: "+$scope.searchText+" Duration: "+$scope.duration);
		
		try {
//	 		$scope.keyarr = localStorage.getItem('LOGID');
			var userdata = JSON.parse(atob(localStorage.getItem('GUID')));
			console.log("Localstage data : ");
			console.log(userdata);
			$scope.username = userdata.name;
			$scope.useremail = userdata.email;
			$scope.image = userdata.userImage;
			$scope.instImage = userdata.instImage;
			$scope.InstitutionID = userdata.InstitutionID;
			$scope.userid = userdata.userid;
			$scope.color = userdata.color;
			$scope.ePassword = userdata.ePassword;
			$scope.dealerArr=JSON.parse(atob(localStorage.getItem('DEALERS')));
			$scope.ROLE=JSON.parse(atob(localStorage.getItem('ROLES')));
			var actions = JSON.parse(atob(localStorage.getItem('actions')));
//			console.log(JSON.stringify(actions));
			if(actions != null && actions.length!=0)
			{ $scope.app=$.inArray('APPLICATION',actions ) > -1;
			  $scope.notif=$.inArray('NOTIFICATION',actions ) > -1;
			  $scope.policy=$.inArray('POLICY',actions ) > -1;
			  $scope.analytics=$.inArray('ANALYTCS',actions ) > -1;
			}
//			console.log(JSON.stringify(userdata));
		}catch (e){
			console.log("ERROR GONOGO: "+e);
			$scope.redirect();
		}
		
//		alert($scope.useremail.toLowerCase());
//		alert($scope.useremail.toLowerCase().indexOf("dsa"));
		if($scope.useremail==null || $scope.useremail=="" || !($scope.useremail.toLowerCase().indexOf("dsa")>-1))
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
		dashboardJson={"iLimit":10000,"dtToDate":todayStr,"sDsaId":$scope.useremail,"iSkip":0,"dtFromDate":fromDateStr};
		
		var dashboardJson=JSON.stringify(dashboardJson);
		// var urlConst= APP_CONST.getConst('BASE_URL_GNG');
		console.log("APP_CONST.getConst('BASE_URL_GNG')" + APP_CONST.getConst('BASE_URL_GNG'));
		RestService.saveToServer("dashboard-detail",dashboardJson)

		.then(function(data){
			console.log("dashboard-detail response:");
			console.log(data);
			$scope.dashboardResult=data;
		});
	};
	
	$scope.loadCDLForm=function(refID,decisionStatus){
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
    	
        return !!((name.indexOf(query || '') !== -1 
        		|| stage.indexOf(query || '') !== -1
        		|| refID.indexOf(query || '') !== -1
        		|| amt==query
        		|| scheme.indexOf(query || '') !== -1));
    };

    $scope.moreClicked=function(decision,remark,subject){    	
    	var data={
			decision:decision,
			remark:remark,
			subject:subject
    	}
    	$scope.shwDecisionModal('sm',data);
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

app.directive('ngModelOnblur', function() {
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
                	console.log("Duration Fetched:"+scope.durationSelected+" Value:"+elm.val());
                	ngModelCtrl.$setViewValue(elm.val());
                	if(elm.val().length>=0)
                	{
                		scope.fetchDashboard();
                	}                   
                });         
            });
        }
    };
});