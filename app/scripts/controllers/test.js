;(function(){
	'use strict';


	var app = angular.module('test',['angularUtils.directives.dirPagination']);

	app.controller('TestCntrl',['$scope','RestService','UserService',function($scope,RestService,UserService){	

		$scope.total_count = 2000;
		$scope.datasource = [];
		$scope.pageno = 1;
		var user = UserService.getCurrentUser();
		$scope.itemPerPage = 100;

		$scope.fetchDateFromServer = function($pageno){
			$scope.datasource = [];
			var json = {
                        'sInstID': user.institutionID,
                        'iSkip': ($scope.itemPerPage * ($pageno -1)),
                        'iLimit': $scope.itemPerPage,
                        'oCriteria': {
                            "oHierarchy": user.hierarchy,
                            "aProducts": user.getProductNames()
                        }
                };

               console.log(json); 
	
			RestService.saveToServer('score-log',json).then(function(response){
				console.log(response.length);
				$scope.datasource = response;
			})

		} 


		
		$scope.fetchDateFromServer($scope.pageno);
		

	}]);

}).call(this)