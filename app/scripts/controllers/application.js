;(function(){

	'use strict';

	angular.module('gonogo').controller("ApplicationController",
function($scope,$rootScope ,$q, $http,$timeout, cfpLoadingBar,Validation,BASE_URL_DEMO) 
{	if(typeof $scope.InstitutionID != 'undefined')
	{
	    $rootScope.template="application";
		$('#dob ,#Position').datepicker({changeMonth: true, changeYear: true, yearRange: "1945:1997", dateFormat: 'dd:M:yy',
			defaultDate:new Date('1985,01,01'),
			 onSelect: function(dateText, inst) {
				 $(this).css("border","1px solid green");
				 $(this).next().focus();		 						
			    }		
		}).attr('readonly','readonly');
		
		Validation.getHeight();

				
		$('input').blur(function()
		{
			$scope.currency = false;
		});
		$('button').click(function()
		{
	      $scope.currency = false;
		});

		var canceler = $q.defer();
		var timeout = null;
		$("#search-container").show();
		$('body #error').text("Now you can check your Loan application approval within 60 seconds.");
		$('body #error_head').text("Welcome To GoNoGo...");

		$scope.$watch('amount', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.toString().replace(/,/g, '');
				$scope.amount = Validation.NoWithComma(val);
				if ($scope.appno != undefined) {
					$scope.currency = '';
				}
			}
		});

		$scope.$watch('lmth', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.toString().replace(/,/g, '');
				$scope.lmth = Validation.NoWithComma(val);
				if ($scope.appno != undefined) {
					$scope.currency = '';
				}
			}
		});

		$scope.$watch('gross_annual', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.replace(/,/g, '');
				$scope.gross_annual = Validation.NoWithComma(val);
				if($scope.appno != undefined)
				{
					$scope.currency = ''; 
				}
			}
		});

		$scope.$watch('current_emi', function(val) {
			$scope.currency_head = "Your Amount is :";
			// if((val != undefined) && ($scope.appno == undefined))
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.replace(/,/g, '');
				$scope.current_emi = Validation.NoWithComma(val);
				if($scope.appno != undefined)
				{
					$scope.currency = ''; 
				}

			}
		});

		$scope.$watch('llmth', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.replace(/,/g, '');
				$scope.llmth = Validation.NoWithComma(val);
				if($scope.appno != undefined)
				{
					$scope.currency = ''; 
				}

			}
		});						

		$scope.timeataddress = [ { value: 'select', name: 'Select Time @ address'},
		                         { value: '5', name: 'Less than 6 months'},
		                         { value: '11', name: '6 to 12 months'},
		                         { value: '15', name: '1 to 3 years'},
		                         { value: '37', name: 'More than 3 years'}					          
		                         ];
		$scope.time_address =  $scope.timeataddress[0];

		$scope.jobType = [{value:'selected', name:'Please Select Employment'},
		                  {value:'Professional', name:'Professional'},
		                  {value:'Business', name:'Bussiness'},
		                  {value:'Job', name:'Job'}
		                  ];

		$scope.employment_type = $scope.jobType[0];
		$scope.time_employer =  $scope.timeataddress[0];
		$scope.gender="Male";
		$scope.maritalStatus="Single";
		$scope.RefID;

		$scope.$watch('pan', function(val) {
			if (val != undefined) {
				console.log("value in pan"+val);

				val = val.toUpperCase();
				val = val.trim();
				$scope.pan = val;
				if ((val.length == 5) || (val.length == 10)) 
				{
					$scope.pan = val + ' ';
				} else {
					val = val.replace(/ /g, '');
						var unam=$("#name").val();
						    unam=unam.split(" ");
						    var a=new Array(3);
						    for(i=0;i<unam.length;i++)
						    	{
						    	a[i]=unam[i].charAt(0);
						    	}
						    	
					if (/[A-Z]{3}[CPHFATBLJ][A-Z]\d{4}[A-Z]/i.test(val)) {
								for(i=0;i<a.length;i++)
									{
										console.log("a[i]="+a[i]+"value at 4="+val.charAt(4));
									if(a[i] === val.charAt(4))
										{
										$('input[name="Pan Number"]').css("border","1px solid green");
										}
									}

					} else {
						$('input[name="Pan Number"]').css("border",	"1px solid red");
						$('#error').text("Please Enter Valid Pan Number");

					}
				}// else
			}
		});

		$scope.$watch('aadhar', function (val){// test aadhar// number
			if(val != undefined)
			{						
				if(((val.length+1)%5)==0)
				{
					$scope.aadhar = val+' ';
				}	
				else {
					val =  val.replace(/ /g,'');	
					if((/\d{12}$/.test(val)) && (val.length == 12))
					{
						$('input[name="Aadhar Number"]').css("border","1px solid green");
						$('#error,#error_head').text("");
					}else{			    		
						$('input[name="Aadhar Number"]').css("border","1px solid red");		    	
						$('#error').text("Please Enter Valid Aadhar Number");			    		
					}
				}
			}
		});

		$scope.$watch('name', function (val){
			/*console.log("main"+$rootScope.customer);*/
			$rootScope.customer = val;
		});

		//timer widget generate
		var progress = $("#progress").shieldProgressBar(
				{	min : 0,max : 60, value : 60,
					layout : "circular",
					layoutOptions : {
						circular : {width : 8,borderWidth : 1,color : "#1E98E4"}
					},
					text : {
						enabled : true,
						template : '<span style="font-size:20px;">{0:n0}</span><p>Sec</p>'
					},
					reversed : true
				}).swidget();

		//set last and llast month from date
		var myDate = new Date();
		$scope.lastmonth = myDate.setMonth(myDate.getMonth() - 1);
		$scope.last_lastmonth = myDate.setMonth(myDate.getMonth() - 1);
		var timer = null, startTime = null;

		function otpContainer()
		{
			$('#address').appendTo($('#addresses')).slideDown(500);
			$('#verify').show();
			$('#add-address').hide();
			$('#accept').hide();
			$('#cancel').hide();
		}
		$scope.getOTP=function(mobile)
		{if($scope.authenticate('AOTP') && Validation.validate())
			{
				otpContainer();
				$scope.otpMSG="Please enter last 5 digits of missed call number."
					$http({
						method : 'GET',
						url : 'https://www.cognalys.com/api/v1/otp/',
						params:{'app_id':$scope.OTPApp.appid,'access_token':$scope.OTPApp.token,'mobile':"91"+mobile},
						headers : {'Content-Type' : 'application/json'}
					}).success(function(Response){
						if(Response.status=="success")
						{//console.log(JSON.stringify(Response));
//							$scope.verifyMobile(Response.keymatch);
							$scope.keymatch = Response.keymatch;
							$scope.otp = Response.otp_start.slice(-6);		
						}else if(Response.status=="failed")
						{ $scope.otpMSG="Default OTP for your GoNoGo application is '11111' ";
						}
					}).error(function(erro){
						if(Validation.validate()){
							otpContainer();
							$scope.otpMSG="Default OTP for your GoNoGo application is '11111' ";
						}
					});
			}else if(Validation.validate()){
				otpContainer();
				$scope.otpMSG="Default OTP for your GoNoGo application is '11111' ";
			}
		}

		function scroll()
		{
			console.log("BodyHeight="+$(window).height()+"headerHeight="+$('#header').height()+"headerHeight="+$('#footer').height());
			var divHeight=($(window).height()-($('#header').height() + $('#footer').height()));
			console.log("divHeight="+divHeight);
			$('.parentScroll').slimScroll({
				height: divHeight-250
			});
		}
		$scope.verifyMobile=function()
		{ 
			scroll(); 
			var otp = $("#txt1").val()+""+$("#txt2").val()+$("#txt3").val()+$("#txt4").val()+$("#txt5").val();
			//			  console.trace($scope.otp);
			if($scope.authenticate('AOTP') && $scope.otp)
			{  otp = $scope.otp+otp;
			if(otp.length >=10)
			{   	 $http({
				method : 'GET',
				url : 'https://www.cognalys.com/api/v1/otp/confirm/',
				params:{'app_id':'3ec927f65d8743e2a2c5403','access_token':'47801de9d6cad91fece7115a2916293e28b25f2a','keymatch':$scope.keymatch,'otp':otp},
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response){
				if(Response.status=="success")
				{   $scope.otpMSG="";
				$("#verify,#address,#otp-msg").hide();	
				$('#accept,#cancel,#TnC').show();
				}
				else if(Response.status=="failed")
				{ $scope.otpMSG="You have entered Wrong OTP";
				}
			}).error(function(erro){
				if(otp==11111){
					$scope.otpMSG="";
					$("#verify,#address,#otp-msg").hide();	
					$('#accept,#cancel,#TnC').show();
				}
			});
			}
			else{
				alert("please enter OTP");
			}
			}else if(otp==11111){
				$scope.otpMSG="";
				$("#verify,#address,#otp-msg").hide();	
				$('#accept,#cancel,#TnC').show();
			}else{
				$scope.otpMSG="You have entered Wrong OTP";
			}
			$scope.otp=false;
		}

		$scope.submit = function() 
		{
			var valid = Validation.validate();
			console.log("Driving License="+$("#DRIVING").val());
			if(valid )
			{
				$('#result_panel,#right_progerssbar_div').show();
				$('#progerssbar-div, .doc, #msformApp').hide();
				start_timer();
				$scope.show_error_header = true;
//				$scope.demo = true;
				$scope.button = 'true';
				$scope.gonogo_status = 'Your Go No Go Query is submiting... Please wait for result.... ';
				$('#message').css('color', 'green');
				if($scope.RefID != "" || typeof $scope.RefID != 'undefined')
				{
					$rootScope.CustID = 0;
				}
				var dataset = {
						'CUSTOMER' : {
							'name' : $scope.name,
							'city' : $("#city").val(),
							'address' : $scope.address1+","+$scope.address2,
							'mobile' : $scope.mobile,
							'email' : $scope.email,
							//	'employer' : $("#job_compnay_name").val(),
							//	'timeEmployer' : $scope.time_employer.value,
							'dob' : $('#dob').val(),
							'gender':$scope.gender,
							'timeAddress' : $scope.time_address.value,
							///	'grossAnnual' : $scope.gross_annual.replace(/,/g , ""),
							//	'currentEmi' : $scope.current_emi.replace(/,/g , ""),
							'lastMonthIncome' : $scope.lmth.replace(/,/g , ""),
							'lastLastMonthIncome' : $scope.llmth.replace(/,/g , ""),
							'pincode': $scope.pin,
							'state':$scope.state,
							'maritalStatus':$scope.maritalStatus
						},
						'DSA' : {
							'DsaID':$scope.userid
						},
						'KYC' : {
							'passport':$("#PASSPORT").val(),
//							'voterid':$("#VOTER ID").val(),
							'dlicense':	$("#DRIVING").val(),
							'pan' : $scope.pan,
							'aadhar' : $scope.aadhar,
							'panStatus' : 'Unverified',
							'aadharStatus' : 'Unverified',
							'DirID' : $("#mobile").val().trim()
						},
						'PROPERTY' : {
							'ProjectName' : $("#projectname").val(),
							'Amount' : $scope.amount.replace(/,/g , ""),
							'Location' : $("#city").val()
						},
						'APPLICATION':{
							'INSTITUTION_ID':$scope.InstitutionID,
							'AppType':'01'
						}
				};

				if($("#select_employment").val()=="Professional")
				{
					var newjson = {
							'company_name': $scope.company_name,
							'company_established' :$scope.Position,
							'annual_turnover' :$scope.gross_annual,
							'last_year_PBT'    :$scope.Service_time
					}
					$.extend( dataset.CUSTOMER, newjson);
				}
				else
				{
					var newjson = {
							'employer' : $scope.employer,
							'timeEmployer' : $scope.time_employer.value,
							'grossAnnual' : $scope.gross_annual.replace(/,/g , ""),
							'currentEmi' : $scope.current_emi.replace(/,/g , "")
					}
					$.extend( dataset.CUSTOMER, newjson);
				}
				console.log("created JSON ="+JSON.stringify(dataset));
				$http({
					method : 'POST',url : BASE_URL_DEMO+'save',
					data : dataset, ignoreLoadingBar: true,
					params:{'REFID':$scope.RefID,'Pan': $rootScope.image_url1, 'Aadhar': $rootScope.image_url2, 'Income1': $rootScope.image_url3, 'Income2': $rootScope.image_url4},
					headers : {'Content-Type' : 'application/json'}
				}).success(function(Response) 
						{ if (Response.StatusCode == "101") 
						{
							$scope.custid = Response.Data.CustID;
							$scope.RefID = Response.Data.RefID;
							$scope.gonogo_status = 'Please wait while CRO analysing your GoNoGo Query. ';	
							$scope.detail = "Your GoNoGo Query is successfully recieved";
							
							get_status();// call check status funtionc

							setTimeout(function(){ //set pan check active
								$("#doccheck").addClass("active");
								$("#pancheck").show(1000);
							}, 1000);
							setTimeout(function(){//set aadhar check active
//								$("#rightprogressbar li").eq(0).addClass("active");
								$("#aadharcheck").show(1000);
							}, 2500);
							setTimeout(function(){ //set bureau active
								$("#bureaucheck").addClass("active");
								$("#mbstatus").show(1000);
							}, 5000); 

						}else
						{$scope.gonogo_status = 'Your GoNoGo Query is Failed';											
						//startcounter(0, true);
						stop_timer(); }
						}).error(function(error) {
							stop_timer();
							$scope.gonogo_status = 'Sorry ! We could not process this request...';		
							$scope.detail = "Our system is Under maintenance...Please try later";
							$('#timer_box').hide();
						});
			}//end valid block
		}// end submit merthod

		/*  $(document.body).on("click","addKYC",function(){
				    	alert("Hello");
				    });*/
		$scope.addKYC=function(){
//			alert("Function call");
//			var dom=
			$("#kycContainer").toggle();
		}
		$scope.addKYCOption=function(){
			if(Validation.validate())
			{
				var option=$("#kycOption option:selected").text();
				console.log("Selected option "+option);
				var inputVal=$("#idNumber").val();
				console.log("inputVal "+ inputVal);
				var dom="<div class='row clearfix' ><div class='col-md-4 column'><label class='control-label'>"+ option +"</label></div><div class='col-md-5 column'><input class='form-control'  type='text' value="+inputVal +" id="+option+" ></div></div>"
				$('#kycOption option:selected').remove(); 
				var checkpoint=$(dom).find("input").attr("id");
				console.log("Check Point="+checkpoint);
				if(kycOption.length==1)
				{
					$("#addKYC").prop("disabled",true);
				}
				console.log("Total length in select..."+kycOption.length);
				$("#kycContainer").toggle();
				$("#kycContainer").parent().prepend(dom);
			}
		}

		$scope.closeKYCOption=function(){
			$("#kycContainer").toggle();
		}

		function get_status()
		{ 
			if($rootScope.template=="application")
				{
			$http({
			method : 'GET',	url:BASE_URL_DEMO+'check_status',
			params : {'CustID':$scope.custid, 'RefID':$scope.RefID},
			ignoreLoadingBar: true,
			timeout: canceler.promise,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
				{
			if(Response.StatusCode == 101)
			{   //console.log(JSON.stringify(Response));
				$scope.Process = Response.Data.APPLICATION.status;											    	 											     
				if(Response.Data.APPLICATION.MBStatus !== "COMPLETED" && Response.Data.APPLICATION.MBStatus !== "ERROR")
				{
					$scope.MBStatus = "IN-PROCCESS";
					$("#crocheck").show().addClass("active");
					$rootScope.croname="Ankur Handa";
					$rootScope.crouserid="12";
//					$scope.BScore1 = Response.Data.APPLICATION.ExpStatus;
//					$scope.AppScore = Response.Data.APPLICATION.AppScore;
				}
				else if(Response.Data.APPLICATION.MBStatus == "ERROR")
				{
					$scope.MBStatus = Response.Data.APPLICATION.MBStatus;
//					$scope.BScore1 = Response.Data.APPLICATION.MBStatus;
					setTimeout(function(){ //set app score
						$("#appcheck").addClass("active");	
						$("#application").show(1000);
						$scope.AppScore = Response.Data.APPLICATION.AppScore;
					},2000);											 
				}
				else {
					$("#mbstatus").hide();
					if(Response.Data.APPLICATION.CibilStatus == "SUCCESS")
					 { $scope.BScore = Response.Data.APPLICATION.CibilScore;}
					else
					 { $scope.BScore = Response.Data.APPLICATION.CibilStatus;}

					if(Response.Data.APPLICATION.ExpStatus == "SUCCESS")
					 { $scope.BScore1 = Response.Data.APPLICATION.ExpScore;}
					else
					{ $scope.BScore1 = Response.Data.APPLICATION.ExpStatus;}
					setTimeout(function(){ //set app score
						$("#appcheck").addClass("active");	
						$("body #application").show(1000);
						$scope.AppScore = Response.Data.APPLICATION.AppScore;
					},2000);
				}

				if(Response.Data.DSA.CroID!=0 && $("#appcheck").hasClass("active"))
				{
					$("#crocheck").show().addClass("active");
					$scope.croname=Response.Data.DSA.name;
					$scope.crouserid=Response.Data.DSA.CroID;
					$scope.croimage=Response.Data.DSA.image;

				}
				//console.log("offer : "+data.Data.offers);
				if(Response.Data.APPLICATION.status !== "Pending" && Response.Data.APPLICATION.status !== "Queue")
				{   var Offers = Response.Data.APPLICATION.offers;
					$scope.gonogo_status = "Your GoNoGo Query is "+Response.Data.APPLICATION.status;
					$scope.button = '';
					$scope.detail = "Your GoNoGo Query is successfully recieved";
				 if(typeof Offers != 'undefined')
				  {   Offers = JSON.parse(Offers);
					$scope.OfferArray = Offers.offers;}
					//console.log("offerarray"+JSON.stringify($scope.OfferArray));
					if(Response.Data.APPLICATION.status === "Approved")
					{   //$scope.gonogo_status = ;
						$scope.detail = "Congratulations ! Your GoNoGo query for Home Loan is Approved";	
						$scope.Message1 = "We are pleased that you pass our eligibility criteria and we are delighted to offer additional products";
						$scope.Message2 = "Click 'Continue' to apply for the loan application and to review our Terms and Conditions.";
				    }
					else if(Response.Data.APPLICATION.status === "Declined")
					{
						$scope.detail = "Unfortunately, you do not meet our current criteria for Credit Approval.";	
						$scope.Message1 = "After careful review of your application, we must decline your loan request at this time. However, we would gladly reconsider your request if someone signed with you on the loan. Alternatively you may choose to apply with one of the following organizations. ";
						$scope.Message2 = "By clicking 'Continue' you accept our Terms and Conditions to share your details with our partner organizations. ";
					}else if(Response.Data.APPLICATION.status === "OnHold")
					{$scope.detail = "Further Analysis is required for this GoNoGo query.";}
				
					$('#offer_panel, #continue_button').slideDown();
				stop_timer();	
				$('#timer_box').hide();
				setTimeout(function(){ //set decision active
					$("#decisioncheck").addClass("active");
					$scope.decision = Response.Data.APPLICATION.status;
				},1000);
				}else if(Response.Data.APPLICATION.status == "Queue")
				{
					$scope.gonogo_status = "Please wait while CRO("+$scope.croname+") is analysing your application.";
					$scope.detail = "Your GoNoGo Query is successfully recieved";
				}
			}else{
				$scope.gonogo_status = "Your GoNoGo Query is failed";
				$scope.detail = "Due to an server error, we can not process this request";
				stop_timer();	
				$('#timer_box').hide();
			}
				});
		timeout = $timeout(function() 
				{ if($scope.Process === "Pending" || $scope.Process === "Queue")
				{   get_status();}
				else{									
					stop_timer(); return false;}
				}, 3000);
		}}

		function start_timer() {
			$('#timer_box').show();
			clearInterval(timer);
			startTime = Date.now();
			timer = setInterval(updateProgress, 100);
		};

		function stop_timer() {						
			$rootScope.counter = -1;
			progress.value(0);
			clearInterval(timer);
			$('#timer_box').hide();
		};

		function updateProgress() {
			var remaining = 60 - (Date.now() - startTime) / 1000;
			$rootScope.counter = Math.floor(remaining);
			progress.value(remaining);
			if (remaining <= 0) {
				clearInterval(timer);								
				return 0;
			}
		}

		$scope.newApplication = function(refid)
		{
			canceler.resolve();
			clearTimeout(timeout);
			stop_timer();//RefID
			$scope.Process = false;
			$scope.button = '';
			$scope.gonogo_status = '';
			$('#search-container,#result_panel,#right_progerssbar_div,.doc').hide();
			$scope.searchApp(refid);
//			$('#progerssbar-div, #msform').show();
//			load_fromkyc();
//			$scope.show_error_header = false;
		}

		$scope.searchApp = function()
		{	
			$('.LoaderSpinner').show();
//			$('#search-icon').hide();RefID//
			if($scope.appno!=undefined){
			$scope.RefID = angular.uppercase($scope.appno);}
			console.log("$scope.RefID="+$scope.RefID);
			$http({
				method : 'POST',
				url : BASE_URL_DEMO+'GetApplication',
				ignoreLoadingBar: true,
				params : {'RefID':$scope.RefID},
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response) 
					{
				$('.LoaderSpinner').hide();
				console.log(JSON.stringify(Response));
				if(Response.StatusCode == 101)
				{
					$('#search-icon').show();
					try
					{
//						$('#first_div,#search-container').hide();
						load_fromkyc();
						$scope.show_error_header = false;
						$rootScope.CustID = Response.Data.CUSTOMER.CustID;
						var address = Response.Data.CUSTOMER.address.split(',');	
						$scope.name = Response.Data.CUSTOMER.name.replace("null","");							    	
						$scope.mobile = Response.Data.CUSTOMER.mobile;
						$scope.project = Response.Data.PROPERTY.ProjectName;								
						$scope.amount = Response.Data.PROPERTY.Amount;
						$scope.location = Response.Data.PROPERTY.Location;
						$rootScope.image_url1 = Response.Data.KYC.panImage;
						$rootScope.image_url2 = Response.Data.KYC.aadharImage;
						$rootScope.image_url3 = Response.Data.KYC.incomeImage1;
						$rootScope.image_url4 = Response.Data.KYC.incomeImage2;
						$scope.email = Response.Data.CUSTOMER.email;
						$scope.dob = Response.Data.CUSTOMER.dob;
						$scope.gender = Response.Data.CUSTOMER.gender;
						$("#statelist").val(Response.Data.CUSTOMER.state);
//						$scope.state = Response.Data.CUSTOMER.state;
						$scope.maritalStatus=Response.Data.CUSTOMER.maritalStatus;
						$scope.address1 = address[0];
						$scope.address2 = address[1];
						$scope.pin = Response.Data.CUSTOMER.pincode;
						$scope.time_address = $scope.timeataddress[getTime(Response.Data.CUSTOMER.timeAddress,  $scope.timeataddress)];
						$scope.pan = Response.Data.KYC.pan;
						$scope.aadhar = Response.Data.KYC.aadhar;							    	
						$("#select_employment").val("Job");
						$scope.employer = Response.Data.CUSTOMER.employer;
						$scope.time_employer = $scope.timeataddress[getTime(Response.Data.CUSTOMER.timeEmployer, $scope.timeataddress)];							    	
						$scope.gross_annual = Response.Data.CUSTOMER.grossAnnual;
						$scope.current_emi = Response.Data.CUSTOMER.currentEmi;
						$scope.lmth = Response.Data.CUSTOMER.lastMonthIncome;
						$scope.llmth = Response.Data.CUSTOMER.lastLastMonthIncome;
						$('#Job').show();
//						if($scope.image_url1 || $scope.image_url2)
//						{
//						$("#rightprogressbar li").eq(0).addClass("active");
//						$(".doc").show(1500);
//						}
					}catch(error)
					{
						console.log(error.message);
					}

				}else
				{
					$('#first_div').show();
					$('#appno').css("color","Red").val("").attr("placeholder","Record Not Found...!!!");
					$('input:not("input[type="button"], input[type="submit"]")').val("");
					$('#Job').hide();
				}
		    });
		};

		function getTime(value, array)
		{	var index;
			jQuery.each(array,function(val,text){
				if(value === text.value)
				{
					index = val;
				}else if(value === text)
				{
					index = val;
				}
			});
			return index;
		}
	}//end security if block
});


angular.module('gonogo').controller('kyc_controller', ['$scope','$http', '$rootScope','BASE_URL_DEMO',
function($scope, $upload, $http, $rootScope,BASE_URL_DEMO){
	$scope.onFileSelect = function($files, filetype, sp_count) {
		for (var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if(sp_count == 1){ $scope.file_size1 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 2){ $scope.file_size2 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 3){ $scope.file_size3 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 4){ $scope.file_size4 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 5){ $scope.file_size5 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 6){ $scope.file_size6 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			var spinnerid = 'spinner'+sp_count;

			var data_obj = new FormData();
			console.log("$rootScope.CustID"+$rootScope.CustID);
			data_obj.append('CustID',$rootScope.CustID);
			data_obj.append('file', $file);
			data_obj.append('type', filetype);
			data_obj.append('DirID',$("#mobile").val().trim());
			console.log("Data_obj="+JSON.stringify(data_obj)+"angular.identity"+angular.identity);
			$http({
				method : 'POST',url: BASE_URL_DEMO+'upload_file',
				data : data_obj,transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).success(function (Response) {
				if(Response.StatusCode == 101)
				{
					console.log(Response.Data);
					$rootScope.CustID = Response.Data.CustID;
					if(sp_count == 1){  	$rootScope.image_url1 = Response.Data.Path;}
					else if(sp_count == 2){$rootScope.image_url2 = Response.Data.Path;}
					else if(sp_count == 3){$rootScope.image_url3 = Response.Data.Path;}
					else if(sp_count == 4){$rootScope.image_url4 = Response.Data.Path;}
					else if(sp_count == 5){$rootScope.image_url5 = Response.Data.Path;}
					else if(sp_count == 6){$rootScope.image_url6 = Response.Data.Path;}
				}else{
					alert("Sorry !!!  We are unable to Upload your Images.  Please try Later.");	
				}
			}).error(function (Response) {
				console.log("Image not uploaded to database ");
			}) ;
		}
	};//ends file upload method

	$scope.remove_file = function(filetype, id, filepath) {
		$http({
			method : 'POST',
			url: BASE_URL_DEMO+'delete_file',
			params : {'CustID' : $rootScope.CustID,	'fileType' : filetype,'filePath' : filepath},
			ignoreLoadingBar: true,
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {             	
			/* console.log('file delete. Response: ' + data.status);*/
			if(data.StatusCode == 101)
			{ if(id == 1){  	$rootScope.image_url1 = ""}
			else if(id == 2){	$rootScope.image_url2 = ""}
			else if(id == 3){	$rootScope.image_url3 = ""}
			else if(id == 4){	$rootScope.image_url4 = ""}
			}
		});

	};//end file remove method
}]);

}).call(this)