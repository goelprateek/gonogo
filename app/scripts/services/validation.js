;(function(){

	'use strict';

	var app = angular.module('gonogo.validation',[]);

	app.factory("Validation", function() {
	var selectError =0,inputError=0;
	return{
		validate : function() {	    
			$("input[type='text'][id!='appno']:visible").each(function(){
				var fieldset = $(this).closest("fieldset").index();
				if($(this).val() == '')
				{
					var value = $(this).attr("name");
					inputError = 1;
					$('#error').text("Please enter your "+value.charAt(0).toUpperCase()+value.slice(1)+"");
					$('#error_head').text(value.charAt(0).toUpperCase()+value.slice(1));
					$(this).focus().css("border","1px solid red");
					return false;
				}
				else if($(this).css("border-bottom-color") == 'rgb(255, 0, 0)')
				{
					var value = $(this).attr("name");
					inputError = 1;
					$('#error').text("Please enter a valid "+value.charAt(0).toUpperCase()+value.slice(1)+"");
					$('#error_head').text(value.charAt(0).toUpperCase()+value.slice(1));
					$(this).focus().css("border","1px solid red");
					return false;
				}/*else{
    				inputError=0;
    				$(this).css("border","1px solid green");
    			}*/

			});
			$("select:visible").each(function(){
				var fieldset = $(this).closest("fieldset").index();
				if(($(this[this.selectedIndex]).val()=="Select")||($(this[this.selectedIndex]).val()=="select")
						|| ($(this[this.selectedIndex]).val()=="undefined"))
				{
					var value = $(this).attr("name");
					selectError = 1;
					$('#error').text("Please select a valid "+value.charAt(0).toUpperCase()+value.slice(1)+"");
					$('#error_head').text(value.charAt(0).toUpperCase()+value.slice(1));
					$(this).focus().css("border","1px solid red");
					return false;
				}/*else if($(this).css("border-bottom-color") == 'rgb(255, 0, 0)')
    			{
    			 var value = $(this).attr("name");
    			 selectError = 1;
				 $('#error').text("Please select a valid "+value.charAt(0).toUpperCase()+value.slice(1)+"");
				 $('#error_head').text(value.charAt(0).toUpperCase()+value.slice(1));
				 $(this).focus().css("border","1px solid red");
				 return false;
    			}*/
				else{
					selectError=0;
					$(this).css("border","1px solid green");
					$(this).next().focus();
				}
			});

			if(selectError == 1 || inputError == 1)
			{
				inputError=0;
				selectError=0;
				return false;
			}
			else{
				inputError=0;
				selectError=0;
				return true;
			}
		},
		vaildateForm : function()
		{
			$("input[id!='appno']").each(function(){
				if($(this).val() == '')
				{
					var value = $(this).attr("name");
					inputError = 1;
					$('#error').text("Please enter  "+value.charAt(0).toUpperCase()+value.slice(1)+"");
					$('#error_head').text(value.charAt(0).toUpperCase()+value.slice(1));
					var fieldset = $(this).closest("fieldset").index();
					$("#progressbar li").eq(fieldset-1).addClass("Error");
					$(this).css("border","1px solid red");
					return false;
				}
				else if($(this).css("border-bottom-color") === 'rgb(255, 0, 0)')
				{
					var value = $(this).attr("name");
					inputError = 1;
					$('#error').text("Please enter a valid "+value.charAt(0).toUpperCase()+value.slice(1)+"");
					$('#error_head').text(value.charAt(0).toUpperCase()+value.slice(1));
					var fieldset = $(this).closest("fieldset").index();
					$("#progressbar li").eq(fieldset-1).addClass("Error");
					$(this).css("border","1px solid red");
					return false;
				}
				else{
					$(this).css("border","1px solid green");	
					inputError=0;
				}	    		
			});	
		},
		// function to add comma in currency field
		NoWithComma : function(x) {
			x=x.toString().replace(/,/g,'');
			if(x.length > 3)
			{ var lastThree = x.substring(x.length-3);
			  var otherNumbers = x.substring(0,x.length-3);
			  if(otherNumbers != '')
				{ lastThree = ',' + lastThree; }
			  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
			  return res;
			}else{
				return x;
			}
		},

		//function for convert number to text amount
		ToRupee : function(val){
			val =  val.replace(/,/g,'');						
			var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
			var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];					    
			n = ('000000000' + val).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
			if (!n) return; var str = '';
			str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
			str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
			str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
			str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
			str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only ' : '';
			return str;					   
		},

		//In application leftbar height
		getHeight : function(val){
			var ht=$(window).height();
			ht=ht-200;
			$("#leftbar").css({"height":ht});	
			$("#rightbar").css({"height":ht});	
		},
		
		//check browser
		checkBrowser : function(){
			var ua = window.navigator.userAgent, tem, 
			M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)| [];
			if (/trident/i.test(M[1])) {
				tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
				return { name : 'IE',version : (tem[1] || '')};
			}
			if (M[1] === 'Chrome') {
				tem = ua.match(/\bOPR\/(\d+)/)
				if (tem != null){
					return {name : 'Opera',version : tem[1]	};
				}
			}
			M = M[2] ? [ M[1], M[2] ] : [ navigator.appName,navigator.appVersion, '-?' ];
			if ((tem = ua.match(/version\/(\d+)/i)) != null) {
				M.splice(1, 1, tem[1]);
			}
			if (M[0] == "Firefox" && M[1] <= 25) {
				return {name : M[0],version : M[1],	valid : false};
			} else if (M[0] == "Chrome" && M[1] <= 35) {
				return {name : M[0],version : M[1],valid : false };
			} else if (M[0] == "Opera" && M[1] <= 17) {
				return {name : M[0],version : M[1],	valid : false};
			} else if (M[0] == "IE" && M[1] <= 17) {
				return {name : M[0],version : M[1],valid : false};
			} else {
				return {name : M[0],version : M[1],valid : true};
			}
		}
	}  
});

}).call(this)