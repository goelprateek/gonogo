;(function(){

	'use strict';

	angular.module('gonogo').controller("DMIApplicationController",function(
		$scope,$rootScope,$q,$http,$timeout,cfpLoadingBar,Validation) {

	if(typeof $scope.InstitutionID != 'undefined')
	{
		$rootScope.template="DMIapplication";
		Validation.getHeight();

		$('#dmiDOB').datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "1945:1997",
			dateFormat: 'dd:M:yy',
			defaultDate:new Date("1985,01,01"),
			onSelect: function(dateText) {
				$('#dmiDOB').css("border","1px solid green");
			}
		}).attr('readonly','readonly');
		$('input').blur(function()
		{
//			if(($(this).attr("name")=="Amount") || ($(this).attr("name")=="Gross Annual") || 
//			($(this).attr("name")=="Current EMI")|| ($(this).attr("name")=="Property Value")){
					$scope.currency = false;
//				}	        	  
		});
		$('button').click(function()
		{
			$scope.currency = false;
//		  $scope.appno = undefined;
		});

		var canceler = $q.defer();
		var timeout = null;
		$scope.gender="Male";
		$scope.maritalStatus="Single";
		$scope.ProductType="Housing";
		$scope.state="Select state";
		$('#error ').text("Now you can check your Loan application approval within 60 seconds.").css("color","red");
		$('#error_head').text("Welcome To GoNoGo...");
		$("#search-container").show();
//		convert number to word
		/*$scope.$watch('LoanAmount', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val=val.replace(/,/g,'');
				$scope.LoanAmount = Validation.NoWithComma(val);
				if ($scope.appno != undefined) {
					$scope.currency = '';
				}
			}
		});*/

//		convert number to word
		$scope.$watch('PropertyValue', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val=val.replace(/,/g,'');
				$scope.PropertyValue = Validation.NoWithComma(val);
				if ($scope.appno != undefined) {
					$scope.currency = '';
				}
			}
		});
		$scope.$watch('ExistingEmi', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val=val.replace(/,/g,'');
				$scope.ExistingEmi = Validation.NoWithComma(val);
				if ($scope.appno != undefined) {
					$scope.currency = '';
				}
			}
		});			
		$scope.$watch('PValue', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val=val.replace(/,/g,'');
				$scope.PValue = Validation.NoWithComma(val);
				if ($scope.appno != undefined){
					$scope.currency = '';
				}
			}
		});	


		$scope.$watch('LoanAmount', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.replace(/,/g, '');
				$scope.LoanAmount =Validation.NoWithComma(val);
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
		$scope.$watch('lmth', function(val) {
			$scope.currency_head = "Your Amount is :";
			if (val != undefined) {
				$scope.currency = Validation.ToRupee(val);
				val = val.replace(/,/g, '');
				$scope.lmth = Validation.NoWithComma(val);
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

		$scope.$watch('pan', function(val) {
			if (val != undefined) {
				val = val.toUpperCase();
				val = val.trim();
				$scope.pan = val;
				if ((val.length == 5) || (val.length == 10)) 
				{
					$scope.pan = val + ' ';
				} else {
					val = val.replace(/ /g, '');
//					if (/[A-Z]{5}\d{4}[A-Z]{1}$/.test(val)) {
						var unam=$("#name").val();
						    unam=unam.split(" ");
						    var a=new Array(3);
						    for(i=0;i<unam.length;i++)
						    	{
						    	/*console.log("F and l="+unam[i]);
						    	console.log("F and l="+unam[i].charAt(0));*/
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
				if(((val.length+1)%5)==0 && val.length!=14)
				{ $scope.aadhar = val+' ';}	
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

		$scope.timeataddress = [ { value: 'select', name: 'Select Time @ address'},
		                         { value: '5', name: 'Less than 6 months'},
		                         { value: '11', name: '6 to 12 months'},
		                         { value: '15', name: '1 to 3 years'},
		                         { value: '37', name: 'More than 3 years'}					          
		                         ];
		$scope.time_address =  $scope.timeataddress[0];

		$scope.EmploymentTypes = [{value:'select', name:'Select Employment Type'},
//		                          {value:'Professional', name:'Professional'},
//		                          {value:'Business', name:'Bussiness'},
//		                          {value:'Job', name:'Job'},
		                          {value:'Salaried', name:'Salaried'},
		                          {value:'SEP', name:'Self Employed Professional'},
		                          {value:'SENP', name:'Self Employed Non Professional'}
		                          ];
		$scope.Employment = $scope.EmploymentTypes[0];
		$scope.time_employer =  $scope.timeataddress[0];
//		define property status
		$scope.PropertyStatus = [{value:'select', name:'Please Select Property Status'},
		                         {value:'Self Occupied', name:'Self Occupied'},
		                         {value:'Rented', name:'Rented'},
		                         {value:'vacant', name:'Vacant'}
		                         ];
		$scope.PStatus = $scope.PropertyStatus[0];
		//property types
		$scope.PropertyType = [{value:'select', name:'Please Select Property Type'},
		                       {value:'Residential', name:'Residential'},
		                       {value:'Commercial', name:'Commercial'}
		                       ];
		$scope.PType = $scope.PropertyType[0];

		$scope.ProductTypeArr = [{value:'Housing Loan', name:'Housing Loan'},
		                         {value:'Personal Loan', name:'Personal Loan'}
		];
		$scope.ProductType=$scope.ProductTypeArr[0];

		//loan appliaed for
		$scope.LoanForArray = {"Housing Loan":[{value:'select', name:'Select Loan Applied for'},
		                                       {value:'Purchase House', name:'Purchase House'},
		                                       {value:'Composite Loan', name:'Composite Loan'},
		                                       {value:'Against Property' ,name:'Against Property'}],
		                                       "Personal Loan":[{value:'select', name:'Select Loan Applied for'},
		                                                        {value:'Health Care', name:'Health Care Loan'},
		                                                        {value:'Education', name:'Education Loan'},
		                                                        {value:'Travel' ,name:'Travel Loan'},
		                                                        {value:'Consumer' ,name:'Consumer Loan'}]
		};
		$scope.LoanApFor = $scope.LoanForArray[$scope.ProductType.value];
		$scope.LoanFor = $scope.LoanApFor[0];

		$(document.body).on("change",".LoanType",function(){
			//					$(".LoanType").switchClass("btn-success","btn-default");
			//					$(this).addClass("btn-success");							
			//					 $scope.ProductType.value=$(this).attr("value");
			$scope.LoanApFor = $scope.LoanForArray[$scope.ProductType.value];
			$scope.LoanFor = $scope.LoanApFor[0];
			$scope.$apply();
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
		//save function at submit button
		/* $http.get('JSON/Auth.json').success(function(data) {
				      $scope.Auth=data.roles;
				      console.log(JSON.stringify(data));
				   });*/

		function otpContainer()
		{
			$('#address').appendTo($('#addresses')).slideDown(500);
			$('#verify').show();
			$('#add-address,#accept,#cancel').hide();
		}
		$scope.getOTP=function(mobile)
		{if($scope.authenticate('"AOTP"') && Validation.validate())
		{	 otpContainer();
		$scope.otpMSG="Please enter last 5 digits of missed call number."
			$http({
				method : 'GET',	url : 'https://www.cognalys.com/api/v1/otp/',
				params:{'app_id':$scope.OTPApp.appid,'access_token':$scope.OTPApp.token,'mobile':"91"+mobile},
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response){
				if(Response.status=="success")
				{//console.log(JSON.stringify(Response));
//					$scope.verifyMobile(Response.keymatch);
					$scope.keymatch = Response.keymatch;
					$scope.otp = Response.otp_start.slice(-6);		
				}else if(Response.status=="failed")
				{ $scope.otpMSG="Default OTP for your GoNoGo application is '11111' ";
				}
			}).error(function(erro){
				if(Validation.validate()){
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
//			console.log("BodyHeight="+$(window).height()+"headerHeight="+$('#header').height()+"headerHeight="+$('#footer').height());
			var divHeight=($(window).height()-($('#header').height() + $('#footer').height()));
//			console.log("divHeight="+divHeight);
			$('.parentScroll').slimScroll({
				height: divHeight-250
			});
		}

		$scope.verifyMobile=function()
		{ 
			scroll(); 
			var otp = $("#txt1").val()+""+$("#txt2").val()+$("#txt3").val()+$("#txt4").val()+$("#txt5").val();
			if($scope.authenticate('"AOTP"') && $scope.otp)
			{  otp = $scope.otp+otp;
			if(otp.length >=10)
			{$http({
				method : 'GET',url : 'https://www.cognalys.com/api/v1/otp/confirm/',
				params:{'app_id':$scope.OTPApp.appid,'access_token':$scope.OTPApp.token,'keymatch':$scope.keymatch,'otp':otp},
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
		}

		$scope.verifyPan=function()
		{
			var pan_number =[{
				"HEADER": {
					"APPLICATION-ID": "10007",
					"REQUEST-TYPE": "REQUEST",
					"REQUEST-TIME": "23072015 14:22:24"
				},
				"KYC-REQUEST": {"PAN-DETAILS": {"PAN-NUMBER": "BBBBB1233B"}}
			}];

			$http({
				method : 'POST', url : '/GoNoGoV3/api/GoNoGoV3/pan',
				params : {'INSTITUTION_ID':'3979','AGGREGATOR_ID':'520','MEMBER_ID':'amit@softcell.com','PASSWORD':'cXMhIUghJDc=','inputJson_':pan_number},
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response) 
					{ console.log("response:"+JSON.stringify(Response)); });
		}

		$scope.submit = function() 
		{
			var valid = Validation.validate();
			try{
				if(valid)
				{  
					$('#result_panel,#right_progerssbar_div').show();
					$('#progerssbar-div, .doc, #msform').hide();
					start_timer();
					$scope.show_error_header = true;
					$scope.button = 'true';
					$scope.gonogo_status = 'Your Go No Go Query is submiting... Please wait for result.... ';
					$('#message').css('color', 'green');
//					$scope.RefID="";
//					if($scope.RefID != "" && $scope.RefID != undefined)
//					{
//					$rootScope.CustIDKYC = 0;
//					}
					if($rootScope.CustID == undefined)
					{
						$rootScope.CustID = "";
					}
					if($scope.name != undefined)
					{  $scope.name = $scope.name.toString().replace(/,/g , " ");
					$scope.name = $scope.name.split(" ");
					if($scope.name[2]==null)
					{
						$scope.name[2]="";
					}
					}
					if($scope.CoBorowerName != undefined)
					{ $scope.CoBorowerName = $scope.CoBorowerName.toString().split(" ");}
					else
					{ $scope.CoBorowerName = "";
//					$scope.CoBorowerName = $scope.CoBorowerName.split(" ");
					}
					if($scope.PropertyAddress != undefined)
					{$scope.PropertyAddress = $scope.PropertyAddress.toString().split(",");}
//					console.log("NoDependant : "+$scope.NoDependant+" ref:"+$scope.RefID+" coborow:"+$scope.CoBorowerName+" padd:"+$scope.PropertyAddress+" cust:"+$rootScope.CustID)
//					console.log("NoDependant : "+($scope.NoDependant!=undefined+""+$scope.NoDependant!="undefined"))

					$scope.addressArr = $scope.address2.toString().split(",");
//					if($scope.addressArr.length>=2)
//					{
//					$scope.addressArr = $scope.addressArr[2]
//					}
//					console.log("city="+$scope.custCity);
					var dataset = {
							'01' : {
								'01' :{"01":$scope.name[0],"02":$scope.name[1],"03":$scope.name[2]},
								'10' :[{'01':$scope.address1,'02':$scope.address2,
									'03':$scope.custCity,'04':$scope.pin,
									'05':$("#state").val(),'06':'India',
									'07':$scope.time_address.value
								}],
								'11' : [{'01':'Mobile','03':'+91','04':$scope.mobile}],
								'12' : [{'01':"Primary",'02':$scope.email}],
								'03' : $('#dmiDOB').val(),
								'02' : $scope.gender,
								'05' : $scope.maritalStatus,
								'06' : {"01":($scope.CoBorowerName != undefined && $scope.CoBorowerName!= "null")?$scope.CoBorowerName[0]:"",
										"02":($scope.CoBorowerName.length>1)?$scope.CoBorowerName[1]:"",
												"03":($scope.CoBorowerName.length>2)?$scope.CoBorowerName[2]:""
								},
								'07' : $scope.NoDependant,
								'08' : $scope.NoEarningMember,
								'09' : $scope.NoFamilyMember
							},
							'04' : [{
								'01':'PAN',
								'02' : $scope.pan.replace(/ /g , ""),
								'03' : 'Unverified'
							},
							{
								'01':'AADHAR',
								'02' : $scope.aadhar.replace(/ /g , ""),
								'03' : 'Unverified'
							}],
							'05' : {
								/*'ProjectName' : $("#projectname").val(),
										'Amount' : $scope.amount.replace(/,/g , ""),*/
								'02':($scope.PropertyName!=undefined)?$scope.PropertyName:"",
										'04':($scope.PStatus.value!=undefined)?$scope.PStatus.value:"",
												'05':($scope.PType.value!=undefined||$scope.PType.value!="select")?$scope.PType.value:"",
														'06':($scope.PropertyValue!=undefined)?$scope.PropertyValue.toString().replace(/,/g , ""):"",
																'07': {"01":($scope.PropertyAddress.length>0)?$scope.PropertyAddress[0]:"",
																		"02":($scope.PropertyAddress.length>1)?$scope.PropertyAddress[1]:"",
																				"03":($scope.PropertyAddress.length>2)?$scope.PropertyAddress[2]:"",
																						"06":"India",
																},
																'08': $scope.PropertyAge,
																'03': $scope.PropertyLocation
							},
							'06' : {'05':$scope.ProductType.value,
								'02':$scope.LoanFor.value,
								'01':$scope.LoanAmount.toString().replace(/,/g , ""),
								'03':$scope.LoanTenor,
								'04':$scope.ExistingEmi.toString().replace(/,/g , "")
							},
							'02':{
								'02':$scope.InstitutionID,
								'09':'01',
								'03':$scope.userid
							},
							'03':[{
								'01' : $scope.Employment.value,//$("#select_employment").val(),
								'02' : $scope.employer,
								'03' : $scope.time_employer.value,											
								'07' : $scope.gross_annual.toString().replace(/,/g , ""),
								'08' :[{'01':'lmth','02': $scope.lmth.toString().replace(/,/g , "")},
								       {'01':'llmth','02': $scope.llmth.toString().replace(/,/g , "")}]
							}]

					};	
//					console.log("$scope.passport="+$("#dlicense").val());
//					console.log("dlicense="+$(document.body).find("#dlicense").val());
					if ($scope.dlicense)
					{
						var ppt={'01':'dlicense','02' : $scope.dlicense.toString().replace(/ /g , ""),'03' : 'Unverified'};
						dataset['04'].push(ppt);
					}
					if ($scope.passport)
					{
						var ppt={'01':'passport','02' : $scope.passport.toString().replace(/ /g , ""),'03' : 'Unverified'};
						dataset['04'].push(ppt);
					}
					if ($scope.rationCardNo)
					{
						var ppt={'01':'rationCardNo','02' : $scope.rationCardNo.toString().replace(/ /g , ""),'03' : 'Unverified'};
						dataset['04'].push(ppt);
					}
					if ($scope.VoterID)
					{
						var ppt={'01':'VoterID','02' : $scope.VoterID.toString().replace(/ /g , ""),'03' : 'Unverified'};
						dataset['04'].push(ppt);
					}
//					console.log("dataset : "+JSON.stringify(dataset));
					$http({
						method : 'POST',url : '/GoNoGoV3/api/GoNoGoV3/saveApp',
						data : dataset, ignoreLoadingBar: true,
						params:{"CustID":$rootScope.CustID,'RefID':$scope.RefID},
						headers : {'Content-Type' : 'application/json'}
					}).success(function(Response) 
							{ if (Response.StatusCode == "101") 
							{
								$scope.custid = Response.Data.CustID;
								$scope.RefID = Response.Data.RefID;
								$scope.gonogo_status = 'Please wait while CRO analysing your GoNoGo Query. ';	
								$scope.detail = "Your GoNoGo Query is successfully recieved";
								get_status();  // call check status funtionc

								setTimeout(function(){ //set pan check active
									$("#doccheck").addClass("active");
									$("#pancheck").show(1000);
								}, 1000);
								setTimeout(function(){//set aadhar check active
//									$("#rightprogressbar li").eq(0).addClass("active");
									$("#aadharcheck").show(1000);
								}, 2500);
								setTimeout(function(){ //set bureau active
									$("#bureaucheck").addClass("active");
									$("#mbstatus").show(1000);
								}, 5000); 

							}else
							{ $scope.gonogo_status = 'Your GoNoGo Query is Failed';											
							stop_timer(); 
							$scope.detail = "Your application data is duplicate or wrong format...!!!";
							}
							}).error(function(error) {
								stop_timer();
								$scope.gonogo_status = 'Sorry ! We could not process this request...';		
								$scope.detail = "Our system is Under maintenance...Please try later";
								$('#timer_box').hide();
							});
				}//end valid block
			}catch(exception)
			{	console.log(exception);
			$('#result_panel,#right_progerssbar_div').hide();
			$('#progerssbar-div, .doc, #msform').show();
			stop_timer();
			$scope.show_error_header = false;
			$scope.button = false;
			$('#error').text("Application Error");
			$('#error_head').text("Please Refresh and Try Again");
			}
		}// end submit merthod

		$scope.addKYC=function(){
			$("#kycContainer").toggle();
		}

		$scope.addKYCOption=function(){
			if(Validation.validate())
			{
				var option=$("#kycOption option:selected").text();
				var inputVal=$("#idNumber").val();
				var dom="<div class='row clearfix' ><div class='col-md-4 column'><label class='control-label'>"+ option +"</label></div><div class='col-md-5 column'><input class='form-control'  type='text' value="+inputVal +" id="+option+" ></div></div>"
				$('#kycOption option:selected').remove(); 
				var checkpoint=$(dom).find("input").attr("id");
				if(kycOption.length==1)
				{
					$("#addKYC").prop("disabled",true);
				}
				$("#kycContainer").toggle();
				$("#kycContainer").parent().prepend(dom);
			}		
		}

		$scope.closeKYCOption=function(){
			$("#kycContainer").toggle();
		}
		var hitcount=0;
		function get_status()
		{
			if($rootScope.template=="DMIapplication")
			{
				$http({
					method : 'GET',	url:'/GoNoGoV3/api/GoNoGoV3/check_status',
					params : {'CustID':$scope.custid, 'RefID':$scope.RefID},
					ignoreLoadingBar: true,
					timeout: canceler.promise,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(Response) 
				 {
					if(Response.StatusCode == 101)
					{   //console.log(JSON.stringify(Response));
						hitcount = hitcount+1;
						$scope.Process = Response.Data.APPLICATION.status;											    	 											     
						if(Response.Data.APPLICATION.MBStatus !== "COMPLETED" && Response.Data.APPLICATION.MBStatus !== "ERROR")
						{
							$("#crocheck").show().addClass("active");
//							$scope.BScore1 = Response.Data.APPLICATION.ExpStatus;
//							$scope.AppScore = Response.Data.APPLICATION.AppScore;
						}
						else if(Response.Data.APPLICATION.MBStatus == "ERROR")
						{
							$scope.MBStatus = Response.Data.APPLICATION.MBStatus;
//							$scope.BScore1 = Response.Data.APPLICATION.MBStatus;
							setTimeout(function(){ //set app score
								$("#appcheck").addClass("active");	
								$("#application").show(1000);
								$scope.AppScore = Response.Data.APPLICATION.AppScore;
							},2000);											 
						}
						else {
							$("#mbstatus").hide();
							if(Response.Data.APPLICATION.CibilStatus == "SUCCESS")
							{ $scope.BScore = Response.Data.APPLICATION.CibilScore;
							}else
							{ $scope.BScore = Response.Data.APPLICATION.CibilStatus;
							}

							if(Response.Data.APPLICATION.ExpStatus == "SUCCESS")
							{ $scope.BScore1 = Response.Data.APPLICATION.ExpScore;
							}else
							{ $scope.BScore1 = Response.Data.APPLICATION.ExpStatus;
							}
							setTimeout(function(){ //set app score
								$("#appcheck").addClass("active");	
								$("#application").show(1000);
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
					if(Response.Data.APPLICATION.status !== "Pending" && Response.Data.APPLICATION.status !== "Queue")
					{   var Offers = Response.Data.APPLICATION.offers;
					  	$scope.gonogo_status = "Your GoNoGo Query is "+Response.Data.APPLICATION.status;
					  	$scope.button = '';
					  	$scope.detail = "Your GoNoGo Query is successfully recieved";
					  	if(typeof Offers != 'undefined')
					  	{   Offers = JSON.parse(Offers);
					  		$scope.OfferArray = Offers.offers;}
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
					  		{$scope.detail = "Further Analysis is required for this GoNoGo query.";
					  		}
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
						if(hitcount >= 100)
						{
							$scope.gonogo_status = "Your GoNoGo Query has been marked into CRO Queue";
							$scope.detail = "Due to an Application Timeout, we can not process this request now";
							$scope.Message1 = "Further Analysis is required for this GoNoGo query.";
							stop_timer();	
							$scope.Process = "Failed";
							$('#timer_box').hide();
						}
						}else{
							$scope.gonogo_status = "Your GoNoGo Query is failed";
							$scope.detail = "Due to an server error, we can not process this request";
							stop_timer();	
							$scope.Process = "Failed";
							$('#timer_box').hide();
						}
			});
				timeout = $timeout(function() 
				{ if($scope.Process === "Pending" || $scope.Process === "Queue")
				   {   get_status();}
				else{									
					stop_timer(); return false;}
				}, 3000);
		}		
	}

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
		stop_timer();
		$scope.Process = false;
		$scope.button = '';
		$scope.gonogo_status = '';
		$('#search-container,#result_panel,#right_progerssbar_div,.doc').hide();
		$scope.searchApp(refid);
		$('#progerssbar-div, #msform').show();
		load_fromkyc();
		$scope.show_error_header = false;
	}

	/*						function change_header(){	
							if (fieldsetn == 3) {
								$('#error').text("Please attach all the valid documents as described in left panel.");
								$('#error_head').text("Document Proofs");
							}
							else if (fieldsetn == 1) {
								$('#error').text("Please enter valid product details for your Loan Application.");
								$('#error_head').text("Product Information");
							}
							else if (fieldsetn == 5) {
								$('#error').text("Please enter Profile details as per your documents.");
								$('#error_head').text("Customer Profile");
							}
							else if (fieldsetn == 2) {
								$('#error').text("Please enter your Loan information");
								$('#error_head').text("Loan Information");
							}
							else if (fieldsetn == 4) {
								$('#error').text("Please enter KYC details as it appears on your Pan and Aadhaar card");
								$('#error_head').text("KYC Information");
							}
							else if (fieldsetn == 6) {
								$('#error').text(" Please enter your current employment information for further processing");
								$('#error_head').text("Employment Information");
							}

						}						
	 */						
	/*function load_fromkyc()
					        {
					        	 error = 0;
					        	 fieldsetn = 1;
					        	 $("#progressbar li:not(:first), #rightprogressbar li").removeClass("active");
					        	 change_header();//change form heading
					        	 $('#first_div, fieldset:not(:first-of-type), #search-container').hide();
					        	 $('#progerssbar-div, #msform, fieldset:first-of-type').show();
					        	$("fieldset").css({"opacity":"1","transform":"none"});	
					        };*/
	$scope.searchApp = function()
	{	
		$('.LoaderSpinner').show();
//		$('#search-icon').hide();
		scroll();	
		if($scope.appno!=undefined){
			$scope.RefID = angular.uppercase($scope.appno);}
		$http({
			method : 'POST',
			url : '/GoNoGoV3/api/GoNoGoV3/GetApp',
			ignoreLoadingBar: true,
			params : {'RefID':$scope.RefID},
			headers : {'Content-Type':'application/json'}
		}).success(function(Response) 
				{
			$('.LoaderSpinner').hide();
//			console.log(JSON.stringify(Response));
//			console.table(Response.Data["01"]["01"]);
//			console.log(Response.Data["01"]["01"]["02"]+" 1: "+(typeof Response.Data["01"]["01"]["02"]== 'undefined')+" 2: "+(Response.Data["01"]["01"]["02"] == ""));
//			if(Response.Data["01"]["01"]["02"]== undefined)
//			{
//			alert("Value undefined");
//			}
//			if(Response.Data["01"]["01"]["02"]== "")
//			{
//			alert("Value blank");
//			}
//			if(Response.Data["01"]["01"]["02"]== undefined)
//			{
//			alert("Value undefined");
//			}
//			console.log("job type:"+JSON.stringify($scope.jobType[1]));
			if(Response.StatusCode == 101)
			{
				$('#search-icon').show();
				try
				{
					$('#first_div,#search-container').hide();
					load_fromkyc();
					$scope.show_error_header = false;
//					$rootScope.CustID = Response.Data["01"]["13"];
//					var address = Response.Data["01"]["10"].split('+');	
					$rootScope.CustID = undefined;
					if( typeof Response.Data["01"]["01"]["02"]!= 'undefined')
					{$scope.name = Response.Data["01"]["01"]["01"]+" "+Response.Data["01"]["01"]["02"]+" "+Response.Data["01"]["01"]["03"];}
					else
					{
						$scope.name = Response.Data["01"]["01"]["01"]+" "+Response.Data["01"]["01"]["03"];
					}
//					console.log(" uname:"+$scope.name)
					$scope.mobile = Response.Data["01"]["11"][0]["04"];
					$scope.email = Response.Data["01"]["12"][0]["02"];
					$scope.dob = Response.Data["01"]["03"];
//					console.log("get id:"+$rootScope.CustID+" dob:"+$scope.dob+" email:"+$scope.email+" mob:"+$scope.mobile+" name:"+$scope.name);
					$scope.gender = Response.Data["01"]["02"];
					$scope.maritalStatus=Response.Data["01"]["05"];

					$scope.address1 = Response.Data["01"]["10"][0]["01"];
					$scope.address2 = Response.Data["01"]["10"][0]["02"];
					$scope.custCity = Response.Data["01"]["10"][0]["03"];
					$scope.pin = Response.Data["01"]["10"][0]["04"];
					$(document.body).find("#state").val(Response.Data["01"]["10"][0]["05"]);
					$scope.time_address.value = Response.Data["01"]["10"][0]["07"];

//					$scope.project = Response.Data["05"]["02"];
					$scope.PStatus.value = Response.Data["05"]["04"];
					$scope.PType.value = Response.Data["05"]["05"];
					$scope.PropertyName =Response.Data["05"]["02"];
					$scope.PropertyValue = Response.Data["05"]["06"]+"";
					if( Response.Data["05"]["07"]["02"]!= "null")
					{$scope.PropertyAddress = Response.Data["05"]["07"]["01"]+" "+Response.Data["05"]["07"]["02"];}
					else
					{
						$scope.PropertyAddress = Response.Data["05"]["07"]["01"]+" ";
					}
					$scope.PropertyAge = Response.Data["05"]["08"];
					$scope.PropertyLocation=Response.Data["05"]["03"];


					if(Response.Data["06"]["05"] != undefined)
					{$scope.ProductType.value = Response.Data["06"]["05"];}
					else
					{$scope.ProductType.value = $scope.ProductTypeArr[0]}
					$scope.LoanType = Response.Data["06"]["05"];
					$scope.LoanFor.value = Response.Data["06"]["02"];
					$scope.LoanAmount = Response.Data["06"]["01"]+"";
					$scope.LoanTenor = Response.Data["06"]["03"];
					$scope.ExistingEmi = Response.Data["06"]["04"]+"";

					$rootScope.image_url2 = getKYC(Response.Data["04"],"PAN",'IMAGE');
					$rootScope.image_url3 = getKYC(Response.Data["04"],"AADHAR",'IMAGE');
					$rootScope.image_url4 = getKYC(Response.Data["04"],"INCOME_PROOF1",'IMAGE');
					$rootScope.image_url5 = getKYC(Response.Data["04"],"INCOME_PROOF2",'IMAGE');
					$rootScope.image_url8 = getKYC(Response.Data["04"],"PASSPORT",'IMAGE');
					$rootScope.image_url9 = getKYC(Response.Data["04"],"D.LICENSE",'IMAGE');
					//$(document.body)("#state option[value="+Response.Data.CUSTOMER.state+"]").attr('selected','selected');
					$scope.pan = getKYC(Response.Data["04"],"PAN",'NO');
					$scope.aadhar = getKYC(Response.Data["04"],"AADHAR", 'NO');
					$scope.passport = getKYC(Response.Data["04"],"PASSPORT", 'NO');
					$scope.dlicense = getKYC(Response.Data["04"],"D.LICENSE", 'NO');
					$scope.rationCardNo = getKYC(Response.Data["04"],"RATION_CARD", 'NO');
					$scope.VoterID = getKYC(Response.Data["04"],"VOTER_ID", 'NO');

//					$("#select_employment option[value=Job]").attr('selected','selected');
					if(Response.Data["01"]["06"] != undefined)
					{ 
						if( Response.Data["01"]["06"]["03"]!= "null")
						{$scope.CoBorowerName = Response.Data["01"]["06"]["01"]+" "+Response.Data["01"]["06"]["02"]+" "+Response.Data["01"]["06"]["03"];}
						else
						{$scope.CoBorowerName = Response.Data["01"]["06"]["01"]+" "+Response.Data["01"]["06"]["02"];}
					}
					$scope.NoDependant = Response.Data["01"]["07"];
					$scope.NoEarningMember = Response.Data["01"]["08"];
					$scope.NoFamilyMember = Response.Data["01"]["09"];

					$scope.Employment.value = Response.Data["03"][0]["01"];
					$scope.employer = Response.Data["03"][0]["02"];
					$scope.time_employer.value = Response.Data["03"][0]["03"];							    	
					$scope.gross_annual = Response.Data["03"][0]["07"]+"";
//					$scope.current_emi = Response.Data.CUSTOMER.currentEmi;
					$scope.lmth = Response.Data["03"][0]["08"][0]["02"]+"";
					$scope.llmth = Response.Data["03"][0]["08"][1]["02"]+"";
//					$('#Job').show();
//					if($scope.image_url1 || $scope.image_url2)
//					{
//					$("#rightprogressbar li").eq(0).addClass("active");
//					$(".doc").show(1500);
//					}
				}catch(error)
				{
					console.log(error);
				}
			}else
			{
				$('#first_div').show();
				$('#appno').css("color","Red").val("").attr("placeholder","Record Not Found...!!!");
				$('input:not("input[type="button"], input[type="submit"]")').val("");
//				$('#Job').hide();
			}
				});
	};

	function getTime(value, array)
	{
		var index;
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

	function getKYC(array, element, type)
	{ if(typeof array !='undefined' && array.length >1)
	   {	
		for(var obj in array){
			if(element == obj["01"])
			{if(type == "IMAGE")
			{ return obj["04"]; }
			else if(type == "NO")
			{ return obj["02"];}
			}
		 }
	   }
	}

//	$(document.body).on("click","#UserBack",function(){
//	$('div[contextmenu="blur"]').show();
//	$("#UserContainer").hide();
//	});

	// set loan type field and handle field display
	$(document.body).on("click",".LoanType",function(){
		$(".LoanType").switchClass("btn-success","btn-default");
		$(this).addClass("btn-success");							
		$scope.ProductType=$(this).attr("value");
		$scope.LoanApFor = $scope.LoanForArray[$scope.ProductType];
		$scope.LoanFor = $scope.LoanApFor[0];
		$scope.$apply();
	});
	// add new kyc field in kYC section
	$(document.body).on("change","#AddMoreKycNo",function(){
		var value=$(this[this.selectedIndex]).val();
		if(value == "Select")
		{
		}
		else if(value=="Election")
		{
			$scope.VoterNo=true;
		}else if(value=="Driving")
		{
			$scope.DlNo=true;
		}else if(value=="Passport")
		{
			$scope.PassportNo=true;
		}else if(value=="Ration")
		{
			$scope.RationNo=true;
		}
		$scope.$apply();
	});
}//end security if block
});


angular.module('gonogo').controller('kyc_controller', ['$scope','$http', '$rootScope', 
                                                       function($scope, $http, $rootScope){
	$(document.body).on("change","#AddMoreKyc",function(){
		var value=$(this[this.selectedIndex]).val();
		if(value == "Select")
		{	}
		else if(value=="Applicant")
		{
			$scope.ApplicantImg=true;
		}else if(value=="Birth")
		{
			$scope.BirthImg=true;			
		}else if(value=="Election")
		{
			$scope.ElectionImg=true;
		}else if(value=="Driving")
		{
			$scope.DlImg=true;
		}else if(value=="Passport")
		{
			$scope.PassportImg=true;
		}else if(value=="Ration")
		{
			$scope.RationImg=true;
		}else if(value=="SSC")
		{
			$scope.SSCImg=true;
		}else if(value=="HSC")
		{
			$scope.HSCImg=true;
		}else if(value=="EmpCard")
		{
			$scope.EmpCardImg=true;
		}else if(value=="Passbook")
		{
			$scope.PassbookImg=true;
		}
		else if(value=="Form16")
		{
			$scope.Form16Img=true;
		}
		$scope.$apply();
	});


	$scope.onFileSelect = function($files, filetype, sp_count) {
		//$files: an array of files selected, each file has name, size, and type.
		for (var i = 0; i < $files.length; i++) {
//			console.log("name="+$(this).html());
			fname=$files[0].name
			var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.pdf|\.docx|\.doc|\.dot|\.docm|\.dotx|\.dotm|\.docb|\.xls|\.xlt|\.xlm|\.xlsx|\.xlsm|\.xltx|\.xltm|\.xlsb|\.xla|\.xll|\.xlw)$/i;
			if(!re.exec(fname))
			{
				alert("File extension not supported!");
				break;
			}

			var $file = $files[i];
			if(sp_count == 1){ $scope.file_size1 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 2){ $scope.file_size2 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 3){ $scope.file_size3 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 4){ $scope.file_size4 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 5){ $scope.file_size5 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 6){ $scope.file_size6 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 7){ $scope.file_size7 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 8){ $scope.file_size8 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 9){ $scope.file_size9 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 10){ $scope.file_size10 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 11){ $scope.file_size11 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 12){ $scope.file_size12 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 13){ $scope.file_size13 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 14){ $scope.file_size14 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 15){ $scope.file_size15 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			else if(sp_count == 16){ $scope.file_size16 = ((($files[i].size)/1024).toFixed(2)) +" Kb";}
			var spinnerid = 'spinner'+sp_count;

			var data_obj = new FormData();
			data_obj.append('CustID',$rootScope.CustID);
			data_obj.append('file', $file);
			data_obj.append('type', filetype);
			data_obj.append('DirID',$("#mobile").val().trim());
//			console.log(JSON.stringify(data_obj));
			$http({
				method : 'POST',url: '/GoNoGoV3/api/GoNoGoV3/upload_file',
				data : data_obj,transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).success(function (Response) {
				if(Response.StatusCode == 101)
				{// console.log(Response.Data);
					$rootScope.CustID = Response.Data.CustID;
					if(sp_count == 1){  	$rootScope.image_url1 = Response.Data.Path;}
					else if(sp_count == 2){$rootScope.image_url2 = Response.Data.Path;}
					else if(sp_count == 3){$rootScope.image_url3 = Response.Data.Path;}
					else if(sp_count == 4){$rootScope.image_url4 = Response.Data.Path;}
					else if(sp_count == 5){$rootScope.image_url5 = Response.Data.Path;}
					else if(sp_count == 6){$rootScope.image_url6 = Response.Data.Path;}
					else if(sp_count == 7){$rootScope.image_url7 = Response.Data.Path;}
					else if(sp_count == 8){$rootScope.image_url8 = Response.Data.Path;}
					else if(sp_count == 9){$rootScope.image_url9 = Response.Data.Path;}
					else if(sp_count == 10){$rootScope.image_url10 = Response.Data.Path;}
					else if(sp_count == 11){$rootScope.image_url11 = Response.Data.Path;}
					else if(sp_count == 12){$rootScope.image_url12 = Response.Data.Path;}
					else if(sp_count == 13){$rootScope.image_url13 = Response.Data.Path;}
					else if(sp_count == 14){$rootScope.image_url14 = Response.Data.Path;}
					else if(sp_count == 15){$rootScope.image_url15 = Response.Data.Path;}
					else if(sp_count == 16){$rootScope.image_url16 = Response.Data.Path;}
				}else{
					alert("Sorry !!!  We are unable to Upload your Images.  Please try Later.");	
				}
			});
		}
	};//ends file upload method

	$scope.remove_file = function(filetype, id, filepath) {
		$http({
			method : 'POST',
			url: '/GoNoGoV3/api/GoNoGoV3/delete_file',
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
			else if(id == 5){	$rootScope.image_url5 = ""}
			else if(id == 6){	$rootScope.image_url6 = ""}
			else if(id == 7){	$rootScope.image_url7 = ""}
			else if(id == 8){	$rootScope.image_url8 = ""}
			else if(id == 9){	$rootScope.image_url9 = ""}
			else if(id == 10){	$rootScope.image_url10 = ""}
			else if(id == 11){	$rootScope.image_url11 = ""}
			else if(id == 12){	$rootScope.image_url12 = ""}
			else if(id == 13){	$rootScope.image_url13 = ""}
			else if(id == 14){	$rootScope.image_url14 = ""}
			else if(id == 15){	$rootScope.image_url15 = ""}
			else if(id == 16){	$rootScope.image_url16 = ""}
			}
		});
	   }; //end file remove method
	}]);

}).call(this)