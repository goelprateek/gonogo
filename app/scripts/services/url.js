; (function () {
	'use strict';
	var app = angular.module('gonogo.commons',['ng-acl']);

	app.factory("APP_CONST", function () {
		var END_POINT = {
			BASE_URL_GNG : "http://172.26.1.211:9090/GoNoGo/",
			// BASE_URL_GNG : "http://gng.softcell.in/GoNoGo/",
			BASE_URL_SCORE:'http://gng.softcell.in/AppScoringV2Git/api/ScoringV3/',
			BASE_URL_DEMO: 'http://gng.softcell.in/GoNoGoV3/api/GoNoGoV3/',
			BASE_URL_DMI: 'http://gng.softcell.in/gonogo_dmi/',
			APP_CONTEXT: '/'
		};
		return {
			getConst: function (const_type) {
				return END_POINT[const_type];
			}
		}
	});
}).call(this);