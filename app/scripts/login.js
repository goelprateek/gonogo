; (function (window, document, undefined) {


	var app = angular.module("gonogo.login",['gng-ga']);

	app.controller("loginController", ['$scope', '$rootScope', '$cookies', 'RestService', 'APP_CONST', 'UserService', 'GNG_GA',
	function ($scope, $rootScope, $cookies, RestService, APP_CONST, UserService,GNG_GA) {

		(function () {
			if (!_.isUndefined($cookies.get("UID")) && !_.isNull($cookies.get("UID"))) {
				$scope.alert = "Welcome " + atob($cookies.get("UID")) + " to GoNoGo";

			} else {
				$scope.alert = "Welcome to GoNoGo Portal";
			}
		}).call(this);

		var expireDate = new Date();

		$scope.isForgotOpen = false;

		var actions, instid, usid, valid = 0;

		// forget password recovery block
		$scope.forgetPassword = function () {
			if (($scope.recoveryemail != "" || typeof $scope.recoveryemail != 'undefined')
				&& valid == 0) {
				$scope.alert = "Please contact Admin (Softcell)...!! Currently this services is not activated on your account";
			}
		}

		if ($cookies.get("RMID") !== undefined) {
			$scope.username = atob($cookies.get("RMID"));
		}

		//changeErrorMsg();
		
		$scope.submitted = false;
		$scope.interacted = function (field) {
			return $scope.submitted || field.$dirty;
		};

		$scope.login = {
			'userName': 'HDBFS_DSA1@softcell.com',
			'password': 'Qh@459',
			'rememberme': ''
		},

		$scope.submit = function () {

			GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_LOGIN"),
							 GNG_GA.getConstCategory("CAT_BUTTON_CLICK"),
							 GNG_GA.getConstAction("ACTION_CLICK_LOGIN"),
							 "Login Button Clicked",1);

			if ($scope.login.rememberme) {
				expireDate.setDate(expireDate.getDate() + 45);
				$cookies.put('RMID', btoa($scope.login.userName), { 'expires': expireDate });
			}

			UserService.cleanUpUserDetails();

			var _data = {
			"oHeader":
			{
				"sReqType":"JSON",
				"sAppSource":"WEB",
				"sSourceID":"GONOGO_HDBFS"
			},
			'userName': $scope.login.userName, 'password': SHA1($scope.login.password) };

			RestService.saveToServer("login-web", _data).then(function (data) {

				if (data.STATUS == "SUCCESS") {
					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_LOGIN"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_SUCCESS"),GNG_GA.getConstAction("API_LOGIN"),1,"login-web");

					if (data.USER_DETAILS.length > 0) {
						var details = data.USER_DETAILS[0];
						var listvalues = {
							'name': data.USERNAME,
							'email': details.EMAIL,
							'InstitutionID': details.INSTITUTION_ID,
							'instImage': details.INSTITUTE_IMAGE,
							'userImage': details.USER_IMAGE,
							'userid': details.USER_ID,
							'color': details.COLOR,
							//'branches': data.BRANCHES,
							'products': data.PRODUCTS,
							'ePassword': SHA1($scope.login.password),
							'hierarchy': data.HIERARCHY
						};

						//Hard Coded for Testing
						//data.HIERARCHY[0].HIERARCHY_VALUE="[\"Mumbai Central\"]";
						//Hard Coded for Testing

						// if(data.HIERARCHY && data.HIERARCHY.length>0){
						// 	if(data.HIERARCHY[0].HIERARCHY_LEVEL==="branchName"){
						// 		listvalues.branches=data.HIERARCHY[0].HIERARCHY_VALUE;
						// 	}
						// }

						$rootScope.loggedInUser = listvalues;

						instid = details.INSTITUTION_ID;

						usid = details.USER_ID;

						expireDate.setDate(expireDate.getDate() + 30)

						$cookies.put('UID', btoa(data.USER_DETAILS[0].USER_NAME), { 'expires': expireDate });
						UserService.persistDataTolocalStorage('GUID', btoa(JSON.stringify(listvalues)));
						UserService.persistDataTolocalStorage('DEALERS', btoa(JSON.stringify(data.DEALERS)));
						UserService.persistDataTolocalStorage('ROLES', btoa(JSON.stringify(data.ROLES)));
						UserService.persistDataTolocalStorage('DETAILS', btoa(JSON.stringify(data.USER_DETAILS)));
						UserService.persistDataTolocalStorage('ACTIONS', btoa(JSON.stringify(data.ACTION)))

						if (data.ACTION) {
							router(data.ROLES[0]);
						}
					} else {
						$scope.alert = "Sorry ! User Details are not available.\n Please contact system admin";
					}

				} else if (data.ERRORS.length > 0) {
					GNG_GA.sendEvent(GNG_GA.getConstScreen("SCRN_LOGIN"),GNG_GA.getConstCategory("CAT_API_CALL"),GNG_GA.getConstAction("ACTION_API_FAIL"),GNG_GA.getConstAction("API_LOGIN"),1,"login-web");
					$scope.alert = data.ERRORS[0].DESCRIPTION;
				}

			}, function (error) {
				$scope.alert = "Sorry ! System is under maintenance.\n\t Please try later.";
			});
		}

		// action contains {APPLICATION,NOTIFICATION}

		function router(role) {
			if(role.indexOf("DSA")!=-1) {

				$(location).attr('href', '#/cdl/dealer');

			}else if (role.indexOf("CRO")!=-1) {	

				$(location).attr('href', '#/notification');

			}else{
				$scope.alert = "Sorry... User has been blocked. Please contact your system Admin !!!";
			}
		}


		function SHA1(msg) {
			function rotate_left(n, s) {
				var t4 = (n << s) | (n >>> (32 - s));
				return t4;
			};
			function lsb_hex(val) {
				var str = "";
				var i;
				var vh;
				var vl;
				for (i = 0; i <= 6; i += 2) {
					vh = (val >>> (i * 4 + 4)) & 0x0f;
					vl = (val >>> (i * 4)) & 0x0f;
					str += vh.toString(16) + vl.toString(16);
				}
				return str;
			};
			function cvt_hex(val) {
				var str = "";
				var i;
				var v;
				for (i = 7; i >= 0; i--) {
					v = (val >>> (i * 4)) & 0x0f;
					str += v.toString(16);
				}
				return str;
			};
			function Utf8Encode(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					}
					else if ((c > 127) && (c < 2048)) {
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
			for (i = 0; i < msg_len - 3; i += 4) {
				j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
					msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
				word_array.push(j);
			}
			switch (msg_len % 4) {
				case 0:
					i = 0x080000000;
					break;
				case 1:
					i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
					break;
				case 2:
					i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
					break;
				case 3:
					i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
					break;
			}
			word_array.push(i);
			while ((word_array.length % 16) != 14) word_array.push(0);
			word_array.push(msg_len >>> 29);
			word_array.push((msg_len << 3) & 0x0ffffffff);
			for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
				for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
				for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
				A = H0;
				B = H1;
				C = H2;
				D = H3;
				E = H4;
				for (i = 0; i <= 19; i++) {
					temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
					E = D;
					D = C;
					C = rotate_left(B, 30);
					B = A;
					A = temp;
				}
				for (i = 20; i <= 39; i++) {
					temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
					E = D;
					D = C;
					C = rotate_left(B, 30);
					B = A;
					A = temp;
				}
				for (i = 40; i <= 59; i++) {
					temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
					E = D;
					D = C;
					C = rotate_left(B, 30);
					B = A;
					A = temp;
				}
				for (i = 60; i <= 79; i++) {
					temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
					E = D;
					D = C;
					C = rotate_left(B, 30);
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
}).call(window, document);