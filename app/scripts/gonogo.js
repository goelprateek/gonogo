;(function(){

	'use strict';

	var app = angular.module('gonogo', [ 'ngRoute', 
	                                     'ngAria',
	                                     'ngMessages' ,
	                                     'ngResource',
	                                     'ngCookies',
	                                     'ngSanitize',
	                                     'ngAnimate',
	                                     'ui.bootstrap',
	                                     'angular-loading-bar',
	                                     'ngFileUpload',
	                                     'angular-svg-round-progressbar',
	                                     'ngTagsInput',
	                                     'gonogo.analytics',
	                                     'gonogo.login',
	                                     'gonogo.directives',
	                                     'gonogo.cdl',
	                                     'gonogo.utilities',
	                                     'gonogo.commons',
	                                     'gonogo.factories',
	                                     'score-directives',
	                                     'daterangepicker'	                                     
	                                     ]);

	app.controller("Maincontroller",['$scope', '$log', 'notifier' , '$timeout','RestService','$location','UserService','APP_CONST','AclService',function($scope, $log, notifier , $timeout,RestService,$location,UserService,APP_CONST,AclService) {



		$scope.$on('onSuccessfulLogin', function (event, args) {

			var currentUser=UserService.getCurrentUser();

			if(!_.isUndefined(currentUser.id) )
			{
				if(currentUser.actions && currentUser.actions.length!=0)
				{ 
					$scope.app=_.contains(currentUser.actions,'APPLICATION' );
					$scope.notif=_.contains(currentUser.actions,'NOTIFICATION');
					$scope.policy=_.contains(currentUser.actions,'POLICY' );
					$scope.analytics=_.contains(currentUser.actions,'ANALYTCS');
				}

				$scope.username = currentUser.username;
				$scope.useremail = currentUser.useremail;
				$scope.image = currentUser.image;	
				$scope.instImage = currentUser.instImage;
				$scope.InstitutionID = currentUser.institutionID;
				$scope.userid = currentUser.userid;
				$scope.color = currentUser.color;
			}
		});


		$scope.status = {
		    isopen: false
		};
		$scope.isSpecificPage = function() {
			var path;
			return path = $location.path(),  _.contains(["/"], path) ;
		}

		$scope.isCdlPage = function() {
			var path;
			return path = $location.path(),  _.contains(["/cdl/dealer","/cdl/apply",'/cdl/dashboard','/cdl/assetMaster','/cdl/customerForm'], path);
		}

		$scope.logout = function() {

			var json ={
					"sInstID": $scope.InstitutionID,
					"sUserID": $scope.userid
			}

			RestService.postDataWithHeaders(APP_CONST.getConst('BASE_URL_GNG')+'logout',json);

			UserService.cleanUpUserDetails();
			$location.path(APP_CONST.getConst('APP_CONTEXT'));
		};

		var current_fs, next_fs, previous_fs;
		var left, opacity, scale, animating, fieldsetn = 1;
		var emailantigo, passval, error = 0, InError = 0;
		var actions;


			var currentUser=UserService.getCurrentUser();

			if(currentUser.id){
				if(currentUser.actions && currentUser.actions.length != 0){ 
					$scope.app=_.contains(currentUser.actions,'APPLICATION' );
					$scope.notif=_.contains(currentUser.actions,'NOTIFICATION');
					$scope.policy=_.contains(currentUser.actions,'POLICY' );
					$scope.analytics=_.contains(currentUser.actions,'ANALYTCS');
				}

				$scope.username = currentUser.username;
				$scope.useremail = currentUser.useremail;
				$scope.image = currentUser.image;	
				$scope.instImage = currentUser.instImage;
				$scope.InstitutionID = currentUser.institutionID;
				$scope.userid = currentUser.userid;
				$scope.color = currentUser.color;
			}
			
			$scope.authenticate=function(element){
				return _.contains(actions,element);
			};

			function change_header() {
				

					if (fieldsetn == 1) {

						$('#error').text("Please attach all the valid documents as described in left panel.");
						$('#error_head').text("Document Proofs");

					}else if (fieldsetn == 2) {

						$('#error').text("Please enter valid product details for your Loan Application.");
						$('#error_head').text("Product Information");

					}else if (fieldsetn == 3) {

						$('#error').text("Please enter Profile details as per your documents.");
						$('#error_head').text("Customer Profile");

					}else if (fieldsetn == 4) {

						$('#error').text("Please enter KYC details as it appears on your Pan and Aadhaar card");
						$('#error_head').text("KYC Information");

					}else if (fieldsetn == 5) {
						$('#error').text(" Please enter your current employment information for further processing");
						$('#error_head').text("Employment Information");

					}
			}

			$(document).ready(function() {
				$('#error').text("Now you can check your Loan application approval within 60 seconds.");
				$('#error_head').text("Welcome To GoNoGo...");


				$('input').focusin(function() {
					if ($(this).attr("id") != "appno") {
						if ($(this).attr("name") == "Name") {
							$('#error').text("Your Name should be the same as on your PAN Card.");
							$('#error_head').text("Name");
						} else if ($(this).attr("name") == "Loan Tenor") {
							$('#error').text("Please Enter loan tenor in months.");
							$('#error_head').text("Loan Tenor");
						} else if ($(this).attr("name") == "Mobile") {
							$('#error').text("Your will recieve your OTP on this number.");
							$('#error_head').text("Mobile");
						} else if ($(this).attr("name") == "Property Location") {
							$('#error').text("Enter Your Property Location.");
							$('#error_head').text("Property Location");
						} else if ($(this).attr("name") == "Property Name") {
							$('#error').text("Enter Your Property Name.");
							$('#error_head').text("Property Name");
						} else if ($(this).attr("name") == "Property Value") {
							$('#error').text("Enter Your Property Value.");
							$('#error_head').text("Property Value");
						} else if ($(this).attr("name") == "Property Address") {
							$('#error').text("Please Enter Property Address In The Format Of Street , City");
							$('#error_head').text("Property Address");
						} else if ($(this).attr("name") == "Age of Property") {
							$('#error').text("Enter Your Age Of Property.");
							$('#error_head').text("Property Age");
						} else if ($(this).attr("name") == "Project") {
							$('#error').text("Enter your Project Name.");
							$('#error_head').text("Project");
						} else if ($(this).attr("name") == "Loan Amount") {
							$('#error').text("Enter your Loan Amount.");
							$('#error_head').text("Loan Amount");
						} else if ($(this).attr("name") == "Email") {
							$('#error').text("You Will receive your e-mail verification code on this e-mail ID.");
							$('#error_head').text("Emal ID");
						} else if ($(this).attr("name") == "Date Of Birth") {
							$('#error').text("Your Date of Birth should be tha same as on your PAN Card.");
							$('#error_head').text("Date of Birth");
						} else if ($(this).attr("name") == "address") {
							$('#error').text("Enter your address same as in your documents.");
							$('#error_head').text("Address");
						} else if ($(this).attr("name") == "complete address") {
							$('#error').text("Enter your address same as in your documents.");
							$('#error_head').text("Address");
						} else if ($(this).attr("name") == "TimeEmp") {
							$('#error').text("Enter total time with this Employer.");
							$('#error_head').text("Time With Employer");
						} else if ($(this).attr("name") == "TimeAdr") {
							$('#error').text("Enter total Time at Above Address.");
							$('#error_head').text("Time at this Address");
						} else if ($(this).attr("name") == "Gross Annual") {
							$('#error').text("Enter your Gross Salary.");
							$('#error_head').text("Gross Annual");
						} else if ($(this).attr("name") == "Existing EMI") {
							$('#error').text("Enter your Existing EMI value");
							$('#error_head').text("Existing EMI");
						} else if ($(this).attr("name") == "PinCode") {
							$('#error').text("Enter your 6 digit ZIP code.");
							$('#error_head').text("Pin Code");
						} else if ($(this).attr("name") == "Pan Number") {
							$('#error').text("Enter your Valid PAN Card Number.");
							$('#error_head').text("Pan Number");
						} else if ($(this).attr("name") == "Aadhar Number") {
							$('#error').text("Enter your valid Adhar Card Number.");
							$('#error_head').text("Aadhar Number");
						} else if ($(this).attr("name") == "Company Name") {
							$('#error').text("Enter your Company Name.");
							$('#error_head').text("Company Name");
						} else if ($(this).attr("name") == "Company Duration") {
							$('#error').text("When your Company was Established.");
							$('#error_head').text("Company Duration");
						} else if ($(this).attr("name") == "Annual TurnOver") {
							$('#error').text("Enter Annual TurnOver of your Company.");
							$('#error_head').text("Annual TurnOver");
						} else if ($(this).attr("name") == "Last year PBT") {
							$('#error').text("Last year Profit before Tax(PBT) of your Company.");
							$('#error_head').text("Last year PBT");
						} else if ($(this).attr("name") == "last month take home") {
							$('#error').text("Kindly enter your april month total income.");
							$('#error_head').text("Last month take home");
						} else if ($(this).attr("name") == "last to Last month take home") {
							$('#error').text("Kindly enter your March month total income.");
							$('#error_head').text("Last to Last month take home");
						} else if ($(this).attr("name") == "Annual TurnOver") {
							$('#error').text("Enter Annual TurnOver of your Company.");
							$('#error_head').text("Annual TurnOver");
						} else if ($(this).attr("name") == "State") {
							$('#error').text("Select State as per your Documents");
							$('#error_head').text("State");
						} else if ($(this).attr("name") == "Amount") {
							$('#error').text("Please Enter Loan Amount");
							$('#error_head').text("Loan Amount");
						} else if ($(this).attr("name") == "Location") {
							$('#error').text("Please Enter Project location");
							$('#error_head').text("Project location");
						}
					}
				});

				function getstates(id, defaultValue) {
					$.each(availeblestate,function(index,text) {
						if (defaultValue == text.label)
							$(document.body).find(id).append($('<option selected="selected">')
									.text(text.label).attr('value',text.label));
						else
							$(document.body).find(id).append($('<option>').text(text.label)
									.attr('value',text.label));
					});
				}

				$('input[type="password"]').keyup(function(e) {
					if (e.keyCode != 8) {
						$(this).next().focus();
					} else if (e.keyCode == 8) {
						$(this).prev().focus();
					}
				});



				$('#accept').click(function() {
					if (error == 0) {
						change_header();//change form heading
						$('#first_div, #search-container').hide();
						$('#progerssbar-div').show();
						$('fieldset:first-of-type').slideDown("slow");
					} else {
						$('#error_head').text("Error Occcurred");
						$('#error').text("Please Enter Valid data in all fields");
					}
				});

				$('#cancel').click(function() {
					location.reload();
				});
			});

		$(document.body).on('change','select[id="select_employment"]',
				function() {
			var value = "#"+ $(this[this.selectedIndex]).val();
			if ($('#employer_detail').is(':parent')) {
				$('#employer_detail').children().hide();
			}
			$(value).show();
		});

		function defaultPage()
		{			
			var url=$(location).attr('href');
			url=url.split("/");
			var dflt=url.length - 1
			var option = url[dflt];
			switch(option){
			case "dmiapplication":
				$("#applicationSpeech").addClass("appbubble");
				break;

			case "notification":
			case "DMINotification":
				$("#notifSpeech").addClass("notifbubble");
				break;

			case "policy":
				$("#policySpeech").addClass("policybubble");
				break;

			case "analytics":
				$("#analyticsSpeech").addClass("analyticsbubble");
				break;
			}
		}

		defaultPage();

		$(document.body).on("click",".checkIt",function()
				{
			console.log("check css");
			var option = $(this).attr("id");
			console.log("option="+option);
			switch(option)
			{
			case "applicationSpeech":
				$("#applicationSpeech").addClass("appbubble");
				$("#notifSpeech").removeClass("notifbubble");
				$("#policySpeech").removeClass("policybubble");
				$("#analyticsSpeech").removeClass("analyticsbubble");
				break;
			case "notifSpeech" :
				$("#applicationSpeech").removeClass("appbubble");
				$("#notifSpeech").addClass("notifbubble");
				$("#policySpeech").removeClass("policybubble");
				$("#analyticsSpeech").removeClass("analyticsbubble");
				break;
			case "policySpeech" :
				$("#applicationSpeech").removeClass("appbubble");
				$("#notifSpeech").removeClass("notifbubble");
				$("#policySpeech").addClass("policybubble");
				$("#analyticsSpeech").removeClass("analyticsbubble");
				break;
			case  "analyticsSpeech" :
				$("#applicationSpeech").removeClass("appbubble");
				$("#notifSpeech").removeClass("notifbubble");
				$("#policySpeech").removeClass("policybubble");
				$("#analyticsSpeech").addClass("analyticsbubble");
				break;
			}
				});

	}]);
}).call(this)
