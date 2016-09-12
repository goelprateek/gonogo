;(function(){
	'use strict';

	var app=angular.module('gonogo.utilities');

	app.service('UploadImages', ["$q","RestService","$log",
		function ($q,RestService,$log) {
		var imageCountUploaded=0;
		var imageCountToUpload=0;
		var serviceHitCount=0;
		
		this.upload = function(pReferenceID,pImageArrayToUpload){
			imageCountUploaded=0;
			var defer = $q.defer();

			// console.log("upload Image array :"+array.length);
			imageCountToUpload=pImageArrayToUpload.length;

			var promiseList = _.map(pImageArrayToUpload,function(value){
				var json ={
				  		"oHeader": {
				  			"sCroId":"default",
				  			"sAppSource":"WEB",
					    	"sApplID":"APPLICANT_1",  // applicant id
                			"sReqType":"JSON"
					  	},
					  	"sRefID": pReferenceID,
				  		"oUpldDtl": {
						    "sFileID": "1", // ask yogesh
						    "sFileName": value.kyc_name,
						    "sFileType": value.type,
						    "sfileData": value.image,
						    "sStat": value.state,
						    "sReason": value.reason 
					  	}
					};
				return RestService.saveToServer("upload-image",json);

			});

			return $q.all(promiseList);

			/*for(var i=0 ; i<pImageArrayToUpload.length ; i++){
				if(pImageArrayToUpload[i] != null){
					var json ={
				  		"oHeader": {
				  			"sCroId":"default",
				  			"sAppSource":"WEB",
					    	"sApplID":"APPLICANT_1"  // applicant id
					  	},
					  	"sRefID": pReferenceID,
				  		"oUpldDtl": {
						    "sFileID": "1", // ask yogesh
						    "sFileName": pImageArrayToUpload[i].kyc_name,
						    "sFileType": pImageArrayToUpload[i].type,
						    "sfileData": pImageArrayToUpload[i].image,
						    "sStat": pImageArrayToUpload[i].state,
						    "sReason": pImageArrayToUpload[i].reason 
					  	}
					};
					//$log.debug("image JSon : "+JSON.stringify(json));
					this.uploadImage(defer,json);
				}
			}*/

			/*return defer.promise;*/
		};

		/*
		this.uploadImage=function(defer,json)
		{
			RestService.saveToServer("upload-image",json).then(function(data)
			{
				if(data.sStatus === 'SUCCESS')
				{
					imageCountUploaded = imageCountUploaded+1;
	//				console.log("response for-"+JSON.stringify(Response));
					if(imageCountUploaded == imageCountToUpload){
						defer.resolve(imageCountUploaded);
					}
				}
 			},function(failedResponse){
 				serviceHitCount=serviceHitCount+1;
				if(serviceHitCount<=3)
				{
				  	uploadImage(json);
				}else{
					serviceHitCount=1;

					if(imageCountUploaded == imageCountToUpload){
						defer.reject(imageCountUploaded);
					}
					alert("Sorry we can not process your image upload request");
				}
			});
		};*/
	}]);
}).call(this);