; (function () {
	'use strict';
	var app = angular.module('gonogo.commons',['ng-acl']);

	app.factory("APP_CONST", function () {
		var END_POINT = {
			BASE_URL_GNG : "https://gonogo.direct/GoNoGo/",
			// BASE_URL_GNG : "http://172.26.1.211:9090/GoNoGo/",
			BASE_URL_SOBRE: 'http://gng.softcell.in/SoBRE',
			APP_CONTEXT: '/'
		};
		return {
			getConst: function (const_type) {
				return END_POINT[const_type];
			}
		}
	});

}).call(this);

