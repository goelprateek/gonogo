;(function(){
	
	'use strict';
	
	var app = angular.module('gonogo.factories',[]);
	
	app.factory("SelectArrays",function(){
		
		var _getResidenceTypes = function(){
			return [{value:"OWNED-BUNGLOW","text":"OWNED-BUNGLOW"},
						{value:"OWNED-CHAWL","text":"OWNED-CHAWL"},
						{value:"OWNED-FLAT","text":"OWNED-FLAT"},
						{value:"OWNED-PENTHOUSE","text":"OWNED-PENTHOUSE"},
						{value:"OWNED-ROWHOUSE","text":"OWNED-ROWHOUSE"},
						{value:"RENTED-BUNGLOW","text":"RENTED-BUNGLOW"},
						{value:"RENTED-CHAWL","text":"RENTED-CHAWL"},
						{value:"RENTED-FLAT","text":"RENTED-FLAT"},
						{value:"RENTED-PENTHOUSE","text":"RENTED-PENTHOUSE"},
						{value:"RENTED-ROWHOUSE","text":"RENTED-ROWHOUSE"},
						{value:"RENTED-BACHELOR ACCOMODATION","text":"RENTED-BACHELOR ACCOMODATION"},
						{value:"COMPANY PROVIDED-FLAT","text":"COMPANY PROVIDED-FLAT"},
						{value:"PARENT OWNED-HOUSE","text":"PARENT OWNED-HOUSE"},
						{value:"PARENT OWNED-FLAT","text":"PARENT OWNED-FLAT"},
						{value:"COMPANY PROVIDED-HOUSE","text":"COMPANY PROVIDED-HOUSE"}];
		};
		return {
			getResidenceTypes:_getResidenceTypes
		};
	});
}).call(this)