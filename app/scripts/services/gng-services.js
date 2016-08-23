; (function () {
	'use strict';
	var app = angular.module('gonogo.commons');

	app.service("RestService", ['$q', '$http', '$log', 'APP_CONST', function ($q, $http, $log, APP_CONST) {

		var _saveToServer = function (url, data) {
			var defere = $q.defer(),
				_url = APP_CONST.getConst('BASE_URL_GNG');

			$http.post(_url + url, data).success(function (response) {
				defere.resolve(response);
			}).error(function (error) {
				defere.reject(error);
			})

			return defere.promise;
		},
		jsonpReq = function (url, data) {
			var defere = $q.defer();

			$http.post(url, data).success(function (response) {
				defere.resolve(response);
			}).error(function (error) {
				defere.reject(error);
			})

			return defere.promise;
		},
		getFromServer = function (url) {
			var defere = $q.defer(),
				_url = APP_CONST.getConst('BASE_URL_GNG');

			$http.get(_url+url).success(function (resp) {
				$log.debug(resp);
				defere.resolve(resp);
			}).error(function (error) {
				$log.error(error);
				defere.resolve(error);
			})
			return defere.promise;
		},
		getStreamFromServer = function (url, data) {
			var deferred = $q.defer();
			console.log(data);
			$http({
				url: url,
				method: "POST",
				data: data,
				headers: { 'Content-type': 'application/json' },
				responseType: 'arraybuffer',
			})
			.success(function (data) {
				$log.debug("SUCCESS");
				deferred.resolve(data);
			}).error(function (data) {
				$log.error("ERROR");
				deferred.reject(data);
			});

			return deferred.promise;
		},

		postDataWithLoginHeaders = function (url, data, username, pass) {
			$http.defaults.headers.common['token-key'] = '95957453469767522788';
			$http.defaults.headers.common['username'] = username;
			$http.defaults.headers.common['password'] = pass;

			var defer = $q.defer(),
				_url = APP_CONST.getConst('BASE_URL_GNG');

			$http.post(_url + url, data).success(function (data) {
				$log.info(data);
				defer.resolve(data);
			}).error(function (data) {
				$log.error(data);
				defer.reject(data);
			});
			return defer.promise;
		},

		_fetchDataQuietly = function(url, data){
			var defere = $q.defer(),
				_url = APP_CONST.getConst('BASE_URL_GNG');

			$http.post(_url + url, data, { ignoreLoadingBar: true }).success(function (response){
				defere.resolve(response);
			}).error(function (error) {
				defere.reject(error);
			})

			return defere.promise;
		};

		return {
			saveToServer: _saveToServer,
			getFromServer: getFromServer,
			getStreamFromServer: getStreamFromServer,
			postDataWithHeaders: postDataWithLoginHeaders,
			jsonpReq:jsonpReq,
			fetchDataQuietly:_fetchDataQuietly
		}
	}]);	

 	app.service('sharedService', function () {
	  	var refID="",
		currentStage="",
		decisionStatus="",
		applicationID="",
		step1Object=null,
		dealerCode=null,
		applicationData=null,
		applicationStatus=null,
		doDocument=null;

	  	return {
	        getRefID: function () {
	            return refID;
	        },
	        setRefID: function(value) {
	            refID = value;	         
	        },
	        getDealerCode: function () {
	            return dealerCode;
	        },
	        setDealerCode: function(value) {
	            dealerCode = value;	         
	        },
	        getCurrentStage: function () {
	            return currentStage;
	        },
	        setCurrentStage: function(value) {
	        	currentStage = value;
	        },
	        getDecisionStatus: function () {
	            return decisionStatus;
	        },
	        setDecisionStatus: function(value) {
	        	decisionStatus = value;
	        },
	        getApplicationData: function () {
	            return applicationData;
	        },
	        setApplicationData: function(value) {
	        	applicationData = value;
	        },
	        getApplicationID: function () {
	            return applicationID;
	        },
	        setApplicationID: function(value) {
	        	applicationID = value;
	        },
	        getStep1Object: function () {
	            return step1Object;
	        },
	        setStep1Object: function(value) {
	        	step1Object = value;
	        },
	        getApplicationStatus: function () {
	            return applicationStatus;
	        },
	        setApplicationStatus: function(value) {
	        	applicationStatus = value;
	        },
	        getDODocument: function () {
	            return doDocument;
	        },
	        setDODocument: function(value) {
	        	doDocument = value;
	        }
	    };
  	});

 	app.service("UserService",['$location','AclService',function($location,AclService){
 		var fetchCurrentUser = function(){
	    	var user={
    			roles:[],
    			getRoles: function () {
    	            return this.roles;
    	        }
    		};

	    	var guid = localStorage.getItem('GUID');

			if(guid){
				var userdata = JSON.parse(atob(guid));

				user.username = userdata.name;
				user.useremail = userdata.email;
				user.image = userdata.userImage;
				user.instImage = userdata.instImage;
				user.institutionID = userdata.InstitutionID;
				user.id = userdata.userid;
				user.color = userdata.color;
				user.branches = userdata.branches;
				user.products = userdata.products;
				user.ePassword = userdata.ePassword;

				user.role = JSON.parse(atob(localStorage.getItem('ROLES')));

				user.getBranchCodes=function(){
					var brnchs=[];
		            _.each(user.branches,function(branch){
		                brnchs.push(branch.BRANCH_CODE);
		            });
		            return brnchs;
				};

				user.getProductNames=function(){
					var prods=[];
		            _.each(user.products,function(product){
		                prods.push(product.PRODUCT_NAME);
		            });

		            return prods;
				};

				var dealers = localStorage.getItem('DEALERS');
				if (dealers) {
					user.dealers = JSON.parse(atob(dealers));
				}

				var currentDealer = localStorage.getItem('CURRENT_DEALER');
				if (currentDealer) {
					user.dealer = JSON.parse(atob(currentDealer));
				}

				//user.roles = localStorage.getItem('ACTIONS');
				// if (user.useremail && user.useremail.indexOf("CRO1") > - 1) {
				// 	user.roles = ["CRO1"];
				// }

				user.roles.push(user.id);

				if (AclService.hasRole(user.id)) {
		            AclService.removeRole(user.id);
		        }
				AclService.addRole(user.id);

				if(localStorage.getItem('ACTIONS') ){
					var actions=JSON.parse(atob(localStorage.getItem('ACTIONS')));

					user.actions = actions;
					_.each(actions,function(action){
						if(AclService.hasResource(action))
						{
							AclService.allow(user.id,action);
						}
					});
				}

				AclService.setUserIdentity(user);
			}

		    return user;
    	},
	    cleanupTask = function(){
	    	localStorage.removeItem('GUID');
			localStorage.removeItem('ACTIONS');
			localStorage.removeItem('CURRENT_DEALER');
			localStorage.removeItem('DEALERS');
			localStorage.removeItem('ROLES');
			localStorage.removeItem('DETAILS');
	    },
	    persistTolocalStorage = function(propertyName, propertyValue){
	    	localStorage.setItem(propertyName, propertyValue);
	    };
	    
	    return {
	    	getCurrentUser:fetchCurrentUser,
	    	cleanUpUserDetails : cleanupTask,
	    	persistDataTolocalStorage : persistTolocalStorage
	    };
 	}]);

 	app.run(["AclService",function(AclService){
		AclService.addRole("4019");
		AclService.addRole("CRO1");

		["APAN","CATADD","PAPRV","STEDIT","ELGBLTY","NCROQUE","POUTSCORE","ASRCHAP", "ANRQSMRY", 
		   "ATRADD", "SCRULDLT", "SCRULEDIT", "RDLT", "NDECLINE", "PTABLE", "PADSCRTBL", "PMASTER", 
		   "ACIBIL", "PADPLCY", "ANDSHBRD", "RAPRV", "NCONTAINER", "AADIDPRF", "ACHAT", "CATEDIT", 
		   "ANSCRLG", "POUTELGBLTY", "AEXPRIAN", "POLICY", "PADCRRUL", "POUTDECRULE", "NAPPROVE", 
		   "PRULE", "AAADHAR", "RCRITRIA", "SCRULADD", "PIFFDLT", "RMATRIX", "NAPPDATADEF", 
		   "NOFRS", "PDLT", "CATDLT", "ATRDLT", "RVIEW", "PIFFAPRV", "PEDIT", "NHOLD", "PIFFVIEW",
		   "STVIEW", "ATERMS", "PIFFEDIT", "PPOLICY", "NOTIFICATION", "STDLT", "STAPRV", "NRPRCS",
		   "ANALYTCS", "ATREDIT", "PVIEW", "REDIT", "NACCEPT", "NREJECT", "NCHAT", "ADEFBUR", "ABRDT", 
		   "EDFBUR", "APPLICATION", "ABURCOMM", "CONREQ", "NAPPDATASTA", "RTREE","RSTPWD","NAPPDATASALE","UPDTUP",
		   "ENDEU","Create User Profile","CRTUP","Enable And Disable","Reset Password","Update User Profile"].map(function(data){

			AclService.addResource(data);
		});
	}]);
}).call(this);