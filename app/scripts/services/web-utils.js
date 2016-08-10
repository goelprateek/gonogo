var app=angular.module('gng-web-utils',[]);

app.factory('WEB_UTILS',function(){
	return {
		getBrowser:function(){
			var N= navigator.appName;
			var UA= navigator.userAgent;
			var temp;
			var browserName= UA.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
			if(browserName && (temp= UA.match(/version\/([\.\d]+)/i))!= null)
			browserName[2]= temp[1];
			browserName= browserName? [browserName[1], browserName[2]]: [N, navigator.appVersion,'-?'];
			return browserName[0]+" "+browserName[1];
		}
	};
});