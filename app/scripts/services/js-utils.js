;(function(){
	'use strict';

	var app=angular.module('gonogo.utilities');

	app.service('UploadImages', ["$q","RestService","$log",
		function ($q,RestService,$log) {
		var imageCountUploaded=0;
		var imageCountToUpload=0;
		var serviceHitCount=0;
		this.upload=function(pReferenceID,pImageArrayToUpload){
			imageCountUploaded=0;
			var defer = $q.defer();

			// console.log("upload Image array :"+array.length);
			imageCountToUpload=pImageArrayToUpload.length;
			for(var i=0 ; i<pImageArrayToUpload.length ; i++){
				if(pImageArrayToUpload[i] != null){
					var json ={
				  		"oHeader": {
					    	"sAppID": pReferenceID,  // application id
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
			}

			return defer.promise;
		};

		this.uploadImage=function(defer,json)
		{
			RestService.saveToServer("upload-image",json).then(function(data)
			{
				imageCountUploaded = imageCountUploaded+1;

				if(data.sStatus === 'SUCCESS')
				{
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
		};
	}]);
}).call(this);