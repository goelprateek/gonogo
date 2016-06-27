;(function(window, document, undefined){
	
	
	var app = angular.module("gonogo.login", ['angular-loading-bar','ngCookies']);
	
	app.controller("loginController",[ '$scope', '$cookies','RestService','BASE_URL_GNG' ,function($scope, $cookies,RestService,BASE_URL_GNG) {
		
		var expireDate = new Date();
		$scope.isForgotOpen=false;
		var actions,instid,usid,valid = 0;
		
		$scope.rememberMe = function(){
			if ($scope.username != "") {
				expireDate.setDate(expireDate.getDate() + 45)
				var user = $scope.username;
				$cookies.put('RMID', btoa(user), {'expires' : expireDate});
			}
		}

		// forget password recovery block
		$scope.forgetPassword = function() {
			if (($scope.recoveryemail != "" || typeof $scope.recoveryemail != 'undefined')
					&& valid == 0) {
				$scope.error = "Please contact Admin (Softcell)...!! Currently this services is not activated on your account";
			}
		}
		
		

		if ($cookies.get("RMID")  !== undefined) {
			$scope.username = atob($cookies.get("RMID"));
		}

		
		changeErrorMsg();
		
		$scope.submitted = false;
		 $scope.interacted = function(field) {
		      return $scope.submitted || field.$dirty;
		 };
		
		$scope.$watch('recoveryemail',function(val){
			if (/^[A-Za-z0-9._]+@[A-Za-z]+\.[a-z]{2,4}$/.test(val)) 
			{ $('input[name="email"]').css("border","1px solid green");
			  changeErrorMsg();
			  valid = 1;
			} else if (val) {
			  $('input[name="email"]').css("border", "1px solid red");
			  $scope.error = "Please Enter Valid Recovery Email";
		    	valid = 0;
			}
		});
		
		$scope.login = {
				'userName':'',
				'password':'',
				'rememberme':''
		},
		
		$scope.submit = function(){
				
				var _data = {'userName' : $scope.login.userName, 'password' : SHA1($scope.login.password)};
				
				RestService.saveToServer("login-web",_data).then(function(data){
						
						
					if(data.STATUS=="SUCCESS"){  
						
						 if(data.USER_DETAILS.length > 0){
							actions= data.ACTION;
							var details = data.USER_DETAILS[0];
						    var listvalues = { 
									'name' : details.USER_NAME,
									'email' : details.EMAIL,
									'InstitutionID': details.INSTITUTION_ID,
									'instImage': details.INSTITUTE_IMAGE,
									'userImage': details.USER_IMAGE, 
									'userid': details.USER_ID,
									'color': details.COLOR
						    };
						    
						    instid = details.INSTITUTION_ID;
							usid = details.USER_ID;
							expireDate.setDate(expireDate.getDate() + 30)
							$cookies.put('UID', btoa(data.USER_DETAILS[0].USER_NAME),{'expires': expireDate});
							localStorage.setItem('GUID', btoa(JSON.stringify(listvalues)));
							localStorage.setItem('DEALERS', btoa(JSON.stringify(data.DEALERS)));
							localStorage.setItem('ROLES', btoa(JSON.stringify(data.ROLES)));
							localStorage.setItem('DETAILS', btoa(JSON.stringify(data.USER_DETAILS)));
							
							if(actions == null || actions == undefined){
								
								$http.get('JSON/Auth.json').success(function(data){		     
									actions = data[instid][usid].actions;
								    redirect(data);
								});
								
							}else{
								redirect(data); 
							}
						   }else{
							   $scope.error = "Sorry ! User Details are not availeble.\n Please contact system admin";
						   }
						 
					}else if(data.ERRORS.length > 0){
						$scope.error = data.ERRORS[0].DESCRIPTION;
					}
					
				},function(error){
					
					$scope.error = "Sorry ! System is under maintenance.\n\t Please try later.";
				});
		}
		
		// action contains {APPLICATION,NOTIFICATION}
		
		function redirect(Response){
			
			localStorage.setItem('actions', btoa(JSON.stringify(actions)));
			
			if(_.contains(actions, 'APPLICATION') && !_.contains(actions, 'NOTIFICATION')){
				
				if(instid == '4019'){
					var url = '/Hdbfs_CDL/Application.html';
			    }else if(instid == '4011'){
			    	var url ='#/dmiapplication';
			    }else{
			    	var url = '#/application';
			    }			
				
				$(location).attr('href',url);
				
			}else if (_.contains(actions, 'NOTIFICATION')){
				
				if(instid == '4019'){ 
					var url = '#/hdbfsnotification';
				}				
				else if(instid == '4011'){ 					
					var url = '#/DMINotification';
				
				}else{
						
					var url = '#/notification';
				}
				
				$(location).attr('href',url);
			}else if ( _.contains(actions , 'POLICY') &&  !_.contains(actions , 'NOTIFICATION')){
				
				var url = '#/policy';
				$(location).attr('href',url);
				
			}else if(!_.contains(actions , 'NOTIFICATION')  &&  !_.contains(actions , 'POLICY')  &&  _.contains(actions,'ANALYTCS')){
				
				var url = '#/analytics';
				$(location).attr('href',url);
				
			}else if(!_.contains(actions, 'APPLICATION') &&
					!_.contains(actions , 'NOTIFICATION') &&
					!_.contains(actions , 'POLICY') &&
					!_.contains(actions , 'ANALYTCS' )){
				
				$scope.error = "Sorry... User has been blocked. Please contact your system Admin !!!";
			}
		}
			
		function changeErrorMsg() {
			if ($cookies.get("UID") != undefined) {
				$scope.error = "Welcome "+atob($cookies.get("UID"))+" to GoNoGo Portal";
			} else {
				$scope.error = "Welcome to GoNoGo Portal";
			}
		}
		
		

	function SHA1(msg) {
	    function rotate_left(n,s) {
	      var t4 = ( n<<s ) | (n>>>(32-s));
	      return t4;
	    };
	    function lsb_hex(val) {
	      var str="";
	      var i;
	      var vh;
	      var vl;
	      for( i=0; i<=6; i+=2 ) {
	        vh = (val>>>(i*4+4))&0x0f;
	        vl = (val>>>(i*4))&0x0f;
	        str += vh.toString(16) + vl.toString(16);
	      }
	      return str;
	    };
	    function cvt_hex(val) {
	      var str="";
	      var i;
	      var v;
	      for( i=7; i>=0; i-- ) {
	        v = (val>>>(i*4))&0x0f;
	        str += v.toString(16);
	      }
	      return str;
	    };
	    function Utf8Encode(string) {
	      string = string.replace(/\r\n/g,"\n");
	      var utftext = "";
	      for (var n = 0; n < string.length; n++) {
	        var c = string.charCodeAt(n);
	        if (c < 128) {
	          utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	          utftext += String.fromCharCode((c >> 6) | 192);
	          utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	          utftext += String.fromCharCode((c >> 12) | 224);
	          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	          utftext += String.fromCharCode((c & 63) | 128);
	        }
	      }
	      return utftext;
	    };
	    var blockstart;
	    var i, j;
	    var W = new Array(80);
	    var H0 = 0x67452301;
	    var H1 = 0xEFCDAB89;
	    var H2 = 0x98BADCFE;
	    var H3 = 0x10325476;
	    var H4 = 0xC3D2E1F0;
	    var A, B, C, D, E;
	    var temp;
	    msg = Utf8Encode(msg);
	    var msg_len = msg.length;
	    var word_array = new Array();
	    for( i=0; i<msg_len-3; i+=4 ) {
	      j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
	      msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
	      word_array.push( j );
	    }
	    switch( msg_len % 4 ) {
	      case 0:
	        i = 0x080000000;
	      break;
	      case 1:
	        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
	      break;
	      case 2:
	        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
	      break;
	      case 3:
	        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
	      break;
	    }
	    word_array.push( i );
	    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
	    word_array.push( msg_len>>>29 );
	    word_array.push( (msg_len<<3)&0x0ffffffff );
	    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
	      for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
	      for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
	      A = H0;
	      B = H1;
	      C = H2;
	      D = H3;
	      E = H4;
	      for( i= 0; i<=19; i++ ) {
	        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      for( i=20; i<=39; i++ ) {
	        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      for( i=40; i<=59; i++ ) {
	        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      for( i=60; i<=79; i++ ) {
	        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      H0 = (H0 + A) & 0x0ffffffff;
	      H1 = (H1 + B) & 0x0ffffffff;
	      H2 = (H2 + C) & 0x0ffffffff;
	      H3 = (H3 + D) & 0x0ffffffff;
	      H4 = (H4 + E) & 0x0ffffffff;
	    }
	    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	    return temp.toLowerCase();
	  }
		
		
	}]);

	
}).call(window, document)




 /*previous module for login */ 

/*var app1 = new angular.module("gonogo", ['angular-loading-bar','ngCookies'])
.config(['cfpLoadingBarProvider','$compileProvider',function(cfpLoadingBarProvider,$compileProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.parentSelector = 'nav';
    $compileProvider.debugInfoEnabled(false);
}]);

app1.controller("login_controller",function($scope, $http, $cookies,BASE_URL_GNG) {
	var expireDate = new Date();
	var actions;
	var instid,usid,valid=0;
	$scope.rememberMe = function() {
		if ($scope.username != "") {
			expireDate.setDate(expireDate.getDate() + 45)
			var user = $scope.username;
			$cookies.put('RMID', btoa(user), {'expires' : expireDate});
		}
	}

	// forget password recovery block
	$scope.forgetPassword = function() {
		if (($scope.recoveryemail != "" || typeof $scope.recoveryemail != 'undefined')
				&& valid == 0) {
			$scope.error = "Please contact Admin (Softcell)...!! Currently this services is not activated on your account"
		}
	}

	if ($cookies.get("RMID") != undefined) {
		valid = 2;
		$scope.username = atob($cookies.get("RMID"));
	}

	// console.log($cookies.get("UID")+$cookies.get("UID") !=undefined);
	changeErrorMsg();
	$scope.$watch('username',function(val) 
	 {
		if(val && val.length>4) 
		{ $('input[name="username"]').css("border","1px solid green");
			changeErrorMsg();
			valid = 1;
		} else if (val) 
		{ $('input[name="username"]').css("border", "1px solid red");
		  $scope.error = "Please Enter Valid User Name";
		  valid = 0;
		}
	});
	$scope.$watch('recoveryemail',function(val) 
	 {
		if (/^[A-Za-z0-9._]+@[A-Za-z]+\.[a-z]{2,4}$/.test(val)) 
		{ $('input[name="email"]').css("border","1px solid green");
		  changeErrorMsg();
		  valid = 1;
		} else if (val) {
		  $('input[name="email"]').css("border", "1px solid red");
		  $scope.error = "Please Enter Valid Recovery Email";
	    	valid = 0;
		}
	});
	$scope.$watch('userpass',function(val) 
			{
		if (typeof val != 'undefined') {
			if (val.length >= 5) {
				$('input[name="userpass"]')
						.css("border",
								"1px solid green");
				changeErrorMsg();
				valid = 1;
			} else if (val) {
				$('input[name="userpass"]')
						.css("border",
								"1px solid red");
				$scope.error = "Password Must Be greater than 4 digit";
				valid = 0;
			}
			}
			});

	$scope.submit2 = function(){
		var listvalues = { 
				'name' : 'Sumit Kumar','email' : 'Sumit@gmail.com',
				'InstitutionID':'4019','instImage':'./images/Institution Data/hdbfs.jpg',
				'userImage':'./images/Users/sumit.jpg', 'userid':'27',
				'color':'#EA2020'
		};
		expireDate.setDate(expireDate.getDate() + 30)
		$cookies.put('UID', btoa('Sumit Kumar'),{'expires': expireDate});
		$cookies.put('UTID', "ajkhashk",{'expires': expireDate});
		localStorage.setItem('GUID', btoa(JSON.stringify(listvalues)));
//		localStorage.setItem('LOGID', Response.Data.userid);
		if(actions == null || actions == undefined || typeof actions == 'undefined' || actions == "")
		{
			$http.get('JSON/Auth.json').success(function(data) 
			 {   //console.log("AUTH : "+JSON.stringify(data)+Response.Data.InstitutionID);
				actions = data["4019"]["27"].actions;
				localStorage.setItem('actions', btoa(JSON.stringify(actions)));		
				console.log("response 1:"+JSON.stringify(actions));
				if ($.inArray('APPLICATION',actions ) > -1 ==true) 
				{	var url = '/GoNoGo/GoNoGo.html#/application';
				$(location).attr('href',url);
				}
					});
		}else{
//			redirect(Response);
		}
		console.log("Inside Login "+JSON.stringify(listvalues)+""+JSON.stringify(actions));
	}

	
	// save function at submit button
	$scope.submit = function() {
		if($scope.username=="ankur@softcell.com"||$scope.username=="ankur1@softcell.com")
		{
			$scope.submitUAT();
		}
		else if(valid == 1 && ($scope.username && $scope.userpass))
		{ 
			$scope.userpass = SHA1($scope.userpass);
			$http({
			method : 'POST',
			url : BASE_URL_GNG+'login-web',
			data : {'userName' : $scope.username, 'password' : $scope.userpass},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
		 { console.log("Login : "+JSON.stringify(Response));
			if(Response.STATUS=="SUCCESS")
			{  
			 if(Response.USER_DETAILS.length>0)
			   {
				actions=Response.ACTION;
			    var listvalues = { 
						'name' : Response.USER_DETAILS[0].USER_NAME,'email' : Response.USER_DETAILS[0].EMAIL,
						'InstitutionID':Response.USER_DETAILS[0].INSTITUTION_ID,'instImage':Response.USER_DETAILS[0].INSTITUTE_IMAGE,
						'userImage':Response.USER_DETAILS[0].USER_IMAGE, 'userid':Response.USER_DETAILS[0].USER_ID,
						'color':Response.USER_DETAILS[0].COLOR,'ePassword':$scope.userpass
				   };
				   instid=Response.USER_DETAILS[0].INSTITUTION_ID;
				   usid=Response.USER_DETAILS[0].USER_ID;
			   
				expireDate.setDate(expireDate.getDate() + 30)
				$cookies.put('UID', btoa(Response.USER_DETAILS[0].USER_NAME),{'expires': expireDate});
//				$cookies.put('UTID', Response.Data.token,{'expires': expireDate});
				localStorage.setItem('GUID', btoa(JSON.stringify(listvalues)));
				localStorage.setItem('DEALERS', btoa(JSON.stringify(Response.DEALERS)));
				localStorage.setItem('ROLES', btoa(JSON.stringify(Response.ROLES)));
//				localStorage.setItem('LOGID', Response.Data.userid);
				if(actions == null || actions == undefined)
				{
					$http.get('JSON/Auth.json').success(function(data) 
					{		     
						actions = data[instid][usid].actions;
					    redirect(Response);
					});
				}else{
					redirect(Response); 
				}
			   }else{
				   $scope.error = "Sorry ! User Details are not availeble.\n Please contact system admin";
			   }
			}else if(Response.ERRORS.length>0)
				{
				  $scope.error = Response.ERRORS[0].DESCRIPTION;
				}
			
				}).error(function(e) 
				 { 
					$scope.error="Sorry ! System is under maintenance.\n\t Please try later.";
				 });
		}else
		{
			$scope.error = "Please Enter valid Username and Password";
		}
	}

	function redirect(Response)
	{
		localStorage.setItem('actions', btoa(JSON.stringify(actions)));
		if ($.inArray('APPLICATION',actions ) > -1 ==true &&  $.inArray('NOTIFICATION',actions ) > -1 ==false) 
		{	if(instid == '4019'){
				var url = './Hdbfs_CDL/Application.html';
		    }else{
		    	var url = '/GoNoGo.html#/application';
		    }			
			$(location).attr('href',url);
		} else if ( $.inArray('NOTIFICATION',actions ) > -1 ==true)
		{   if(instid == '4019'){
			var url = '/GoNoGo.html#/hdbfsnotification';
		    }else{
			var url = '/GoNoGo.html#/notification';
		    }
			$(location).attr('href',url);
		} else if ( $.inArray('POLICY',actions ) > -1 ==true &&  $.inArray('NOTIFICATION',actions ) > -1 ==false)
		{
			var url = '/GoNoGo/GoNoGo.html#/policy';
			$(location).attr('href',url);
		} else if ( $.inArray('NOTIFICATION',actions ) > -1 == false &&  $.inArray('POLICY',actions ) > -1 ==false
				&&  $.inArray('ANALYTCS',actions ) > -1 == true)
		{
			var url = '/GoNoGo/GoNoGo.html#/analytics';
			$(location).attr('href',url);
		}else if ($.inArray('APPLICATION',actions ) > -1 ==false &&
				$.inArray('NOTIFICATION',actions ) > -1 ==false &&
				$.inArray('POLICY',actions ) > -1 ==false &&
				$.inArray('ANALYTCS',actions ) > -1 ==false) {
			$scope.error = "Sorry... User has been blocked. Please contact your system Admin !!!";
		}	
	}

	function changeErrorMsg() {
		if ($cookies.get("UID") != undefined) {
			$scope.error = "Welcome "+atob($cookies.get("UID"))+" to GoNoGo Portal";
		} else {
			$scope.error = "Welcome to GoNoGo Portal";
		}
	}
	
	$('#olvidado').click(function(e) {
	    e.preventDefault();
	    $('div#forget_password').toggle('500');
	  });
	  $('#acceso').click(function(e) {
	    e.preventDefault();
	    $('div#forget_password').toggle('500');
	  });
	  
	  *//**
	  *  Secure Hash Algorithm (SHA1)
	  *  http://www.webtoolkit.info/
	  **//*
	  function SHA1(msg) {
	    function rotate_left(n,s) {
	      var t4 = ( n<<s ) | (n>>>(32-s));
	      return t4;
	    };
	    function lsb_hex(val) {
	      var str="";
	      var i;
	      var vh;
	      var vl;
	      for( i=0; i<=6; i+=2 ) {
	        vh = (val>>>(i*4+4))&0x0f;
	        vl = (val>>>(i*4))&0x0f;
	        str += vh.toString(16) + vl.toString(16);
	      }
	      return str;
	    };
	    function cvt_hex(val) {
	      var str="";
	      var i;
	      var v;
	      for( i=7; i>=0; i-- ) {
	        v = (val>>>(i*4))&0x0f;
	        str += v.toString(16);
	      }
	      return str;
	    };
	    function Utf8Encode(string) {
	      string = string.replace(/\r\n/g,"\n");
	      var utftext = "";
	      for (var n = 0; n < string.length; n++) {
	        var c = string.charCodeAt(n);
	        if (c < 128) {
	          utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	          utftext += String.fromCharCode((c >> 6) | 192);
	          utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	          utftext += String.fromCharCode((c >> 12) | 224);
	          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	          utftext += String.fromCharCode((c & 63) | 128);
	        }
	      }
	      return utftext;
	    };
	    var blockstart;
	    var i, j;
	    var W = new Array(80);
	    var H0 = 0x67452301;
	    var H1 = 0xEFCDAB89;
	    var H2 = 0x98BADCFE;
	    var H3 = 0x10325476;
	    var H4 = 0xC3D2E1F0;
	    var A, B, C, D, E;
	    var temp;
	    msg = Utf8Encode(msg);
	    var msg_len = msg.length;
	    var word_array = new Array();
	    for( i=0; i<msg_len-3; i+=4 ) {
	      j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
	      msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
	      word_array.push( j );
	    }
	    switch( msg_len % 4 ) {
	      case 0:
	        i = 0x080000000;
	      break;
	      case 1:
	        i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
	      break;
	      case 2:
	        i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
	      break;
	      case 3:
	        i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
	      break;
	    }
	    word_array.push( i );
	    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
	    word_array.push( msg_len>>>29 );
	    word_array.push( (msg_len<<3)&0x0ffffffff );
	    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
	      for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
	      for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
	      A = H0;
	      B = H1;
	      C = H2;
	      D = H3;
	      E = H4;
	      for( i= 0; i<=19; i++ ) {
	        temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      for( i=20; i<=39; i++ ) {
	        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      for( i=40; i<=59; i++ ) {
	        temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      for( i=60; i<=79; i++ ) {
	        temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
	        E = D;
	        D = C;
	        C = rotate_left(B,30);
	        B = A;
	        A = temp;
	      }
	      H0 = (H0 + A) & 0x0ffffffff;
	      H1 = (H1 + B) & 0x0ffffffff;
	      H2 = (H2 + C) & 0x0ffffffff;
	      H3 = (H3 + D) & 0x0ffffffff;
	      H4 = (H4 + E) & 0x0ffffffff;
	    }
	    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	    return temp.toLowerCase();
	  }
});
*/
