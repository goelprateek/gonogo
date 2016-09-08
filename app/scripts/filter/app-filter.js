;(function(){

 'use strict';

  var app = angular.module('gonogo');

 app.filter('time', function() {
	return function(item) {
		var timereg = /^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]+\s?(?:am|pm)?/;
		var datereg = /^[0-3][0-9]:[0-3][0-9]:(?:[0-9][0-9])?[0-9][0-9]$/;
		var month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec' ];
		if (datereg.test(item)) {
			var temp = item.substring(3, 5);
			if (temp.substring(0, 1) == 0) {
				temp = temp.substring(1, 2);
			}
			temp = parseInt(temp);
			item = item.substring(0, 2) + " - " + month[temp-1];
		} else if (timereg.test(item)) {
			item = item.substring(0, 5) + item.substring(8, 11);
		}
		return item;
	};
}),

app.filter('rupee', function() {
	return function(value, symbol) {
		if ((value != undefined)&&($.isNumeric(value)) && value.length >4 ) {
			value = value.toString();
			for (var i = 0; i < value.length; i++)
				value = value.replace(",", "");
			var lastThree = value.substring(value.length - 3);
			var otherNumbers = value.substring(0, value.length - 3);
			if (otherNumbers != '')
				lastThree = ',' + lastThree;
			var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",")+ lastThree;

			return symbol + res;
		}
		return value;		
	};
}),

app.filter('index', function() {
	return function(value) {
		if ((value != undefined)&&($.isNumeric(value))) {
			value = value+1;
		}
		return value;
		
	};
}),

app.filter('operator', function() {
	return function(value) {
		if (value != undefined) {
			if(value == "&&")
				value = "AND";
			else if(value == "||")
				value = "OR";
		}
		return value;
		
	};
}),

app.filter('format', function() {
	return function(value, type) {
		if (value != undefined) {
			value = value.toString();
			for (var i = 0; i < value.length; i++)
			{
				value = value.replace('["', '');
				value = value.replace('"]', '');
			}
			return value;
		}
	};
}),

app.filter('expression', function() {
	return function(value) {
		if (value != undefined) {
			value = value.toString();			
				value = value.replace('=', ' Is ');
				value = value.replace('!', ' Is Not ');
				value = value.replace('?', ' Contains ');
				value = value.replace("`", ' Not Contains');
				value = value.replace('$', ' Start With ');
				value = value.replace('#', ' End With');
				value = value.replace('~', ' <= ');
				value = value.replace('^', ' >= ');
				value = value.replace('null', 'Not Availeble');
			
			return value;
		}
	};
}),

app.filter('dateFormat', function() {
	return function(item) {
		
		var result;

		if(!item) return;

		// handling for dob type date
		if(8 === item.length ){
			return moment(item,'DDmmYYYY').format('DD/MM/YYYY');
		}
		
		if(moment().diff(moment(item),'days') == 0 ){
			result = moment(item).format('HH:mm:ss');
		}else if(moment().diff(moment(item),'days') == 1){
			result='Yesterday';	
		}else{
			result = moment(item).format('DD/MM/YYYY');
		}

		return result;
	};
}),

app.filter('currency', function() {
	return function(value, symbol) {
		if(value != undefined){
		if ($.isNumeric(value) || value.length >3 ) {
			value = value.toString();
			for (var i = 0; i < value.length; i++)
				value = value.replace(",", "");
			var lastThree = value.substring(value.length - 3);
			var otherNumbers = value.substring(0, value.length - 3);
			if (otherNumbers != '')
				lastThree = ',' + lastThree;
			var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",")+ lastThree;

			return symbol + res;
		}}
		return value;		
	};
});

}).call(this)