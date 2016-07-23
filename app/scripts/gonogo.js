;(function(){

	'use strict';
7
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
	                                     'gonogo.services',
	                                     'gonogo.utilities',
	                                     'gonogo.commons',
	                                     'gonogo.factories',
	                                     'score-directives'
	                                     ]);

	app.controller("Maincontroller",['$scope', '$log', 'notifier' ,'Validation', '$timeout','RestService','$location','UserService','APP_CONST','AclService',function($scope, $log, notifier ,Validation, $timeout,RestService,$location,UserService,APP_CONST,AclService) {

		//$log.info("hello this first log");
		//$log.debug("hello this first log");
		//$log.error("hello this first log");

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

//		var IEversion = Validation.checkBrowser();
//		if (IEversion.valid != true) {
//			alert("Sorry we are not supporting Internet Explorer Version "+ IEversion.version
//					+ " \n\n\tPlease Update Your Browser");
//		}
//		else {
//			try {
//				$scope.keyarr = localStorage.getItem('LOGID');
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
//			}catch (e) {
//				$log.log(e);
//			}

			// if ($scope.InstitutionID == 4019 || $scope.InstitutionID == 4011) {
			// 	$("#logo.img-responsive").css("padding", "1");
			// }
			//check authorization level of user
			$scope.authenticate=function(element){
				return _.contains(actions,element);
			};

			var availeblecity = [ {
				label : "Kolhapur",
				value : "KL"
			}, {
				label : "Port Blair",
				value : "PB"
			}, {
				label : "Adilabad",
				value : "AD"
			}, {
				label : "Adoni",
				value : "ADN"
			}, {
				label : "Amadalavalasa",
				value : "AMD"
			}, {
				label : "Amalapuram",
				value : "AML"
			}, {
				label : "Anakapalle",
				value : "ANK"
			}, {
				label : "Anantapur",
				value : "ANT"
			}, {
				label : "Badepalle",
				value : "BP"
			}, {
				label : "Banganapalle",
				value : "BG"
			}, {
				label : "Bapatla",
				value : "BPT"
			}, {
				label : "Bellampalle",
				value : "BLLM"
			}, {
				label : "Bethamcherla",
				value : "BTHM"
			}, {
				label : "Bhadrachalam",
				value : "BHD"
			}, {
				label : "Bhainsa",
				value : "BHN"
			}, {
				label : "Bheemunipatnam",
				value : "BHNP"
			}, {
				label : "Bhimavaram",
				value : "BHMV"
			}, {
				label : "Bhongir",
				value : "BHG"
			}, {
				label : "Bobbili",
				value : "BOBL"
			}, {
				label : "Bodhan",
				value : "BDHN"
			}, {
				label : "Chilakaluripet",
				value : "CHK"
			}, {
				label : "Chirala",
				value : "CHL"
			}, {
				label : "Chittoor",
				value : "CHTT"
			}, {
				label : "Cuddapah",
				value : "CDD"
			}, {
				label : "Devarakonda",
				value : "DVK"
			}, {
				label : "Dharmavaram",
				value : "DHMV"
			}, {
				label : "Eluru",
				value : "ELR"
			}, {
				label : "Farooqnagar",
				value : "FRG"
			}, {
				label : "Gadwal",
				value : "GDW"
			}, {
				label : "Gooty",
				value : "GTY"
			}, {
				label : "Gudivada",
				value : "GDV"
			}, {
				label : "Gudur",
				value : "GDR"
			}, {
				label : "Guntakal",
				value : "GTK"
			}, {
				label : "Guntur",
				value : "GTR"
			}, {
				label : "Hanuman Junction",
				value : "HJ"
			}, {
				label : "Hindupur",
				value : "HND"
			}, {
				label : "Hyderabad",
				value : "HDB"
			}, {
				label : "Ichchapuram",
				value : "ICHP"
			}, {
				label : "Jaggaiahpet",
				value : "JGGP"
			}, {
				label : "Jagtial",
				value : "JGT"
			}, {
				label : "Jammalamadugu",
				value : "JMLD"
			}, {
				label : "Jangaon",
				value : "JNG"
			}, {
				label : "Kadapa",
				value : "KDP"
			}, {
				label : "Kadiri",
				value : "KDR"
			}, {
				label : "Kagaznagar",
				value : "KGZ"
			}, {
				label : "Kakinada",
				value : "KKD"
			}, {
				label : "Kalyandurg",
				value : "KLY"
			}, {
				label : "Kamareddy",
				value : "KMDD"
			}, {
				label : "Kandukur",
				value : "KDK"
			}, {
				label : "Karimnagar",
				value : "KRMN"
			}, {
				label : "Kavali",
				value : "KVL"
			}, {
				label : "Khammam",
				value : "KHMM"
			}, {
				label : "Koratla",
				value : "KRTL"
			}, {
				label : "Kothagudem",
				value : "KTHG"
			}, {
				label : "Kothapeta",
				value : "KTHP"
			}, {
				label : "Kovvur",
				value : "KVV"
			}, {
				label : "Kurnool",
				value : "KROO"
			}, {
				label : "Kyathampalle",
				value : "KTHP"
			}, {
				label : "Macherla",
				value : "MCHL"
			}, {
				label : "Machilipatnam",
				value : "MCP"
			}, {
				label : "Madanapalle",
				value : "MDP"
			}, {
				label : "Mahbubnagar",
				value : "MHB"
			}, {
				label : "Mancherial",
				value : "MCHR"
			}, {
				label : "Mandamarri",
				value : "MDM"
			}, {
				label : "Mandapeta",
				value : "MDPT"
			}, {
				label : "Manuguru",
				value : "MNG"
			}, {
				label : "Markapur",
				value : "MRK"
			}, {
				label : "Medak",
				value : "MDK"
			}, {
				label : "Miryalaguda",
				value : "MYL"
			}, {
				label : "Mogalthur",
				value : "MGT"
			}, {
				label : "Nagari",
				value : "NGR"
			}, {
				label : "Nagarkurnool",
				value : "NGK"
			}, {
				label : "Nandyal",
				value : "NDL"
			}, {
				label : "Narasapur",
				value : "NRS"
			}, {
				label : "Narasaraopet",
				value : "NSP"
			}, {
				label : "Narayanpet",
				value : "NYP"
			}, {
				label : "Narsipatnam",
				value : "NSP"
			}, {
				label : "Nellore",
				value : "NLL"
			}, {
				label : "Nidadavole",
				value : "NDDV"
			}, {
				label : "Nirmal",
				value : "NRM"
			}, {
				label : "Nizamabad",
				value : "NZB"
			}, {
				label : "Nuzvid",
				value : "NZD"
			}, {
				label : "Ongole",
				value : "OGL"
			}, {
				label : "Palacole",
				value : "PLC"
			}, {
				label : "Palasa",
				value : "PLS"
			}, {
				label : "Kasibugga",
				value : "KSB"
			}, {
				label : "Palwancha",
				value : "PLW"
			}, {
				label : "Parvathipuram",
				value : "PVTH"
			}, {
				label : "Pedana",
				value : "PDN"
			}, {
				label : "Peddapuram",
				value : "PDDP"
			}, {
				label : "Pithapuram",
				value : "PTHP"
			}, {
				label : "Pondur",
				value : "PND"
			}, {
				label : "Ponnur",
				value : "PNNR"
			}, {
				label : "Proddatur",
				value : "PRDD"
			}, {
				label : "Punganur",
				value : "PNGN"
			}, {
				label : "Puttur",
				value : "PTTR"
			}, {
				label : "Rajahmundry",
				value : "RJHD"
			}, {
				label : "Rajam",
				value : "RJM"
			}, {
				label : "Ramachandrapuram",
				value : "RCHDP"
			}, {
				label : "Ramagundam",
				value : "RMG"
			}, {
				label : "Rayachoti",
				value : "RYC"
			}, {
				label : "Rayadurg",
				value : "RYD"
			}, {
				label : "Mumbai",
				value : "mum"
			}, {
				label : "Pune",
				value : "pu"
			}, {
				label : "Nagpur",
				value : "ngp"
			}, {
				label : "Thane",
				value : "thn"
			}, {
				label : "Nashik",
				value : "nshk"
			}, {
				label : "Kalyan-Dombivali",
				value : "kd"
			}, {
				label : "Vasai-Virar",
				value : "vv"
			}, {
				label : "Aurangabad",
				value : "agb"
			}, {
				label : "Navi Mumbai",
				value : "nmum"
			}, {
				label : "Solapur",
				value : "slp"
			}, {
				label : "Bhiwandi",
				value : "bhw"
			}, {
				label : "Amravati",
				value : "amrv"
			}, {
				label : "Nanded",
				value : "nnd"
			}, {
				label : "Kolhapur",
				value : "klh"
			}, {
				label : "Sangli",
				value : "sgl"
			}, {
				label : "Jalgaon",
				value : "jlg"
			}, {
				label : "Akola",
				value : "akl"
			}, {
				label : "Latur",
				value : "ltr"
			}, {
				label : "Malegaon",
				value : "mlg"
			}, {
				label : "Dhule",
				value : "dhl"
			}, {
				label : "Ahmednagar",
				value : "ahng"
			}, {
				label : "Chandrapur",
				value : "chndr"
			}, {
				label : "New Delhi",
				value : "ndlh"
			}, {
				label : "Parbhani",
				value : "pbhn"
			} ];

			var availeblestate = [ {
				label : "Andhra Pradesh",
				value : "AP"
			}, {
				label : "Arunachal Pradesh",
				value : "ARP"
			}, {
				label : "Assam",
				value : "asm"
			}, {
				label : "Bihar",
				value : "bhr"
			}, {
				label : "Chhattisgarh",
				value : "CHHT"
			}, {
				label : "Goa",
				value : "GOA"
			}, {
				label : "Gujarat",
				value : "GJRT"
			}, {
				label : "Haryana",
				value : "HRYN"
			}, {
				label : "Himachal Pradesh",
				value : "HP"
			}, {
				label : "Jammu and Kashmir",
				value : "JMMU"
			}, {
				label : "Jharkhand",
				value : "JHRKH"
			}, {
				label : "Karnataka",
				value : "KRNTK"
			}, {
				label : "Kerala",
				value : "KRLA"
			}, {
				label : "Madhya Pradesh",
				value : "MP"
			}, {
				label : "Maharashtra",
				value : "MHRSH"
			}, {
				label : "Manipur",
				value : "MNIP"
			}, {
				label : "Meghalaya",
				value : "MGHLY"
			}, {
				label : "Mizoram",
				value : "MZRM"
			}, {
				label : "Nagaland",
				value : "NGLD"
			}, {
				label : "Odisha(Orissa)",
				value : "ODSA"
			}, {
				label : "Punjab",
				value : "PJAB"
			}, {
				label : "Rajasthan",
				value : "RJSTN"
			}, {
				label : "Sikkim",
				value : "SKKM"
			}, {
				label : "Tamil Nadu",
				value : "TN"
			}, {
				label : "Tripura",
				value : "TRP"
			}, {
				label : "Uttar Pradesh",
				value : "UP"
			}, {
				label : "Uttarakhand",
				value : "UTTK"
			}, {
				label : "West Bengal",
				value : "WBNG"
			}, {
				label : "Delhi",
				value : "Delhi"
			} ];

			var availableProjects = [ {
				label : "Marvel Sorrento",
				value : "01"
			}, {
				label : "Marvel Basilo",
				value : "02"
			}, {
				label : "Marvel Aurum",
				value : "03"
			}, {
				label : "Marvel Simrose",
				value : "04"
			}, {
				label : "Marvel Crest",
				value : "05"
			}, {
				label : "Marvel Ribera",
				value : "06"
			}, {
				label : "Marvel Kyra",
				value : "07"
			}, {
				label : "Marvel Arco",
				value : "08"
			}, {
				label : "Marvel Bounty",
				value : "09"
			}, {
				label : "Marvel Aeries",
				value : "10"
			}, {
				label : "Marvel Aquanas",
				value : "11"
			}, {
				label : "Marvel Zephyr",
				value : "12"
			}, {
				label : "Marvel Brisa",
				value : "13"
			}, {
				label : "Marvel Cerise",
				value : "14"
			}, {
				label : "Marvel Citrine",
				value : "15"
			}, {
				label : "Marvel Cascada",
				value : "16"
			}, {
				label : "Marvel Albero",
				value : "17"
			}, {
				label : "Marvel Fria",
				value : "18"
			}, {
				label : "Panchshil Satellite Tower",
				value : "19"
			}, {
				label : "Panchshil Forest Castles",
				value : "20"
			}, {
				label : "Panchshil Ssliver Woods",
				value : "21"
			}, {
				label : "Panchshil One North",
				value : "22"
			}, {
				label : "Panchshil Eon Water Front",
				value : "23"
			}, {
				label : "Panchshil CASA9",
				value : "24"
			}, {
				label : "Panchshil YOOPUNE",
				value : "25"
			}, {
				label : "Panchshil Trump Towers",
				value : "26"
			} ];

			var availableCompanies = [
			                          {
			                        	  label : "Softcell Technologies",
			                        	  value : "01"
			                          },
			                          {
			                        	  label : "Softonic International S.L.",
			                        	  value : "02"
			                          },
			                          {
			                        	  label : "Ubernet TechnoSpark",
			                        	  value : "03"
			                          },
			                          {
			                        	  label : "Softpedia Inc.",
			                        	  value : "04"
			                          },
			                          {
			                        	  label : "Infosys Ltd",
			                        	  value : "05"
			                          },
			                          {
			                        	  label : "Tata Consultancy Services",
			                        	  value : "06"
			                          },
			                          {
			                        	  label : "KPIT Cummins Infosystems Ltd.",
			                        	  value : "07"
			                          },
			                          {
			                        	  label : "BMC Software",
			                        	  value : "08"
			                          },
			                          {
			                        	  label : "Tech Mahindra",
			                        	  value : "09"
			                          },
			                          {
			                        	  label : "Persistent Systems",
			                        	  value : "10"
			                          },
			                          {
			                        	  label : "nvidia",
			                        	  value : "11"
			                          },
			                          {
			                        	  label : "Wipro Technologies, Pune",
			                        	  value : "12"
			                          },
			                          {
			                        	  label : "Synechron Technologies Pvt Ltd, Pune. India",
			                        	  value : "13"
			                          },
			                          {
			                        	  label : "Axis Software Pvt. Ltd. Pune India",
			                        	  value : "14"
			                          },
			                          {
			                        	  label : "IBM India Pvt. Limited. Pune",
			                        	  value : "15"
			                          },
			                          {
			                        	  label : "Hindavi Technologies & Consulting Services (HTCS), Pune India",
			                        	  value : "16"
			                          },
			                          {
			                        	  label : "Accenture Services Pvt Ltd. Pune",
			                        	  value : "17"
			                          }, {
			                        	  label : "Ace Brain Software Pvt. Ltd.",
			                        	  value : "18"
			                          } ];

			//all_list();






			function all_list() {

				var list = $(document.body).find("#city ,#PLocation");
				list.autocomplete({
					source : availeblecity,
					select : function(event, ui) {
						$(document.body).find("#city ,#PLocation").val(ui.item.label);
						$(document.body).find("#city ,#PLocation").attr("title", ui.item.value);
						return false;
					}
				});

				$(document.body).find('#userCity').autocomplete({
					source : availeblecity,
					select : function(event, ui) {
						$(document.body).find("#userCity").val(ui.item.label);
						$(document.body).find("#userCity").attr("title", ui.item.value);
						return false;
					}
				});

				$(document.body).find('#cmpnyState ,#bsnsState ,#prptyState,#ustate,#upstate').autocomplete({
					source : availeblestate,
					select : function(event, ui) {
						$(this).val(ui.item.label);
						$(this).attr("title", ui.item.value);
						return false;
					}
				});

				$.each(availeblestate,function(index, text) {
					$(document.body).find("#statelist ,#state").append($('<option>').text(text.label).attr('value',text.label));
				});


				$(document.body).find("#projectname ,#PName").autocomplete(
						{	source : availableProjects,
							select : function(event, ui) {
								$(document.body).find("#projectname ,#PName").val(ui.item.label);
								$(document.body).find("#projectname ,#PName").attr("title",ui.item.value);
								return false;
							}
						});

				$(document.body).find("#job_compnay_name ,#employer ,#pro-company-name").autocomplete(
						{	source : availableCompanies,
							select : function(event, ui) {
								$(document.body).find("#job_compnay_name ,#employer ,#pro-company-name").val(ui.item.label);
								$(document.body).find("#job_compnay_name ,#employer ,#pro-company-name").attr("title",ui.item.value);
								return false;
							}
						});
			}

			$("#view_profile").click(function() {
				/*$('div[contextmenu="blur"]').hide();
				$("#UserContainer").show();
				$http({
					method : 'POST',
					url : '/GoNoGoV3/api/GoNoGoV3/UserProfile',
					params : {'userid' : $scope.userid,
						'INSTITUTION_ID' : $scope.InstitutionID},
						headers : {'Content-Type' : 'application/json'}
				}).success(function(Response) 
						{ if (Response.StatusCode == 101) 
						{
							$scope.Profile = Response.Data;
							$scope.Profile.password = "password";
							var states = getstates("#UserState",$scope.Profile.state);
							$scope.error = "";
						} else {
							$scope.error = "The request failed due to an internal error.";
						}
						}).error(function(data) {
							$scope.error = "System is under maintenance..Please try later";
						});*/
			});

			$(document.body).on("click", "#UserBack",function() {
				$('div[contextmenu="blur"]').show();
				$("#UserContainer").hide();
			});

			/*$(document.body).on("click", "#ref", function() {
				all_list();
			});*/

			function load_fromkyc()
			{if($scope.InstitutionID == 4020)
			{	 error = 0;
			fieldsetn = 1;
			$("#progressbar li:not(:first), #rightprogressbar li").removeClass("active");
			change_header();//change form heading
			$('#first_div, fieldset:not(:first-of-type), #search-container').hide();
			$('#progerssbar-div, #msform, fieldset:first-of-type').show();
			$("fieldset").css({"opacity":"1","transform":"none"});	
			}else
			{	error = 0;
			fieldsetn = 1;
			$("#progressbar li:not(:first), #rightprogressbar li").removeClass("active");
			change_header();//change form heading
			$('#first_div, fieldset:not(:first-of-type), #search-container').hide();
			$('#progerssbar-div, #msformApp, fieldset:first-of-type').show();
			$("fieldset").css({"opacity":"1","transform":"none"});
			}
			};


			function change_header() {
				if($scope.InstitutionID == 4020){

					if (fieldsetn == 3) {
						$('#error').text("Please attach all the valid documents as described in left panel.");
						$('#error_head').text("Document Proofs");
					} else if (fieldsetn == 1) {
						$('#error').text("Please enter valid product details for your Loan Application.");
						$('#error_head').text("Product Information");
					} else if (fieldsetn == 5) {
						$('#error').text("Please enter Profile details as per your documents.");
						$('#error_head').text("Customer Profile");
					} else if (fieldsetn == 2) {
						$('#error').text("Please enter your Loan information");
						$('#error_head').text("Loan Information");
					} else if (fieldsetn == 4) {
						$('#error').text("Please enter KYC details as it appears on your Pan and Aadhaar card");
						$('#error_head').text("KYC Information");
					} else if (fieldsetn == 6) {
						$('#error').text(" Please enter your current employment information for further processing");
						$('#error_head').text("Employment Information");
					}

				}else{	

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
			}

			$(document).ready(function() {
				$('#error').text("Now you can check your Loan application approval within 60 seconds.");
				$('#error_head').text("Welcome To GoNoGo...");

//				$('#right_progerssbar_div').hide();
//				$('#result_panel').hide();

				$('#btn_close').click(function() {
					$('#chat_window').hide();
				});

				/*$('.mybtn').click(function(e){
					$('.mybtn').toggleClass("btn-success","btn-default");
					 if($(this).text()=='Reject'){
						 $('#reason').show();
					 }else{
						 $('#reason').hide(); 
					 }
					 $scope.statusVal = $(this).text();
					 e.stopImmediatePropagation();
				});*/

				/*$('.btn-default').click(function(){
					 if($(this).text()=='Reject'){
						 $('#reason').show();
					 }else{
						 $('#reason').hide(); 

					 }

				});*/

				$('#minimize').click(function() {
					$(this).parents('#chat_window').animate(
							{height : '30px'},200);
				});
				$('#maxmize').click(function() {
					$(this).parents('#chat_window')	.animate(
							{height : '250px'},200);
				});

				$('#error').css("color", "red");


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

				$(document.body).on("keyup",'input',function(e) {
					if ($(this).attr("id") != "appno") 
					{
						$('#error_head').text($(this).attr("name"));
						var val = $(this).val();
						if (($(this).attr("name") == "Name")
								||($(this).attr("name") == "Project")
								|| ($(this).attr("name") == "Location")
								|| ($(this).attr("name") == "Employer")
								|| ($(this).attr("name") == "Company Name")
								|| ($(this).attr("name") == "Property Address")
								|| ($(this).attr("name") == "Property Name")
								|| ($(this).attr("name") == "Property Location")) 
						{ if (!(/^[a-zA-Z\s]+$/.test(val))) 
						{	error = 1;
						$(this).css("border","1px solid red");
//						$('#error_head').text("");
						$('#error').text("Please Enter only string value");
						} else if ($(this).attr("name") == "Name") 
						{ var words = $(this).val();
						words = words.split(" ");
						if (words.length < 2 || words[1] == "") 
						{	error = 1;
						$(this).css("border","1px solid red");
//						$('#error_head').text("");
						$('#error').text("Applicant name should have atleast first name and Last name");
						} else if (words.length >= 2 || words[1] != "") {
							error = 0;
							$('#error_head,#error').text("");
							$(this).css("border","1px solid green");
						}
						} else {
							error = 0;
							$('#error_head,#error').text("");
							$(this).css("border","1px solid green");
						}
						} else if ($(this).attr("name") == "Mobile") 
						{ //e.keyCode 40 for key down by piyush
							if (!/^[0-9\d]+$/.test($(this).val())) 
							{	error = 1;
							$(this).css("border","1px solid red");
//							$('#error_head').text("");
							$('#error').text("Please Enter only Numeric value");
							return false;						
							}else if (!/^[7-9]{1}/.test(val)) 
							{  error = 1;
							$(this).css("border","1px solid red");
							$('#error').text("First digit should be within 7,8,9");
							} else if (!/^[7-9]{1}[0-9]{9}$/.test(val)) 
							{	error = 1;
							$(this).css("border","1px solid red");
//							$('#error_head').text("");
							$('#error').text("Please enter 10 digit valid mobile number.");
							} else {
								$('#error_head,#error').text("");
								error = 0;
								$(this).css("border","1px solid green");
							}
						} else if (($(this).attr("name") == "OTP")) 
						{	if (!/^[0-9]/.test(val)) {
							error = 1;
							$(this).css("border","1px solid red");
						} else {
							error = 0;
							$('#error_head,#error').text("");
							$(this).css("border","1px solid green");
						}
						}
						else if (($(this).attr("name") == "Email")) {
							if (!(/^[A-Za-z0-9._]+@[A-Za-z]+\.[a-z]{2,4}$/.test(val))) {
								error = 1;
								$(this).css("border","1px solid red");
								$('#error').text("Please Enter Valid Email ID");
							} else {
								error = 0;
								$('#error_head,#error').text("");
								$(this).css("border","1px solid green");
							}
						}else if( ($(this).attr("name")=="Amount")
								|| ($(this).attr("name")=="Time With This Employee") 
								|| ($(this).attr("name")=="Time at This Address") 
								|| ($(this).attr("name")=="Gross Annual") 
								|| ($(this).attr("name")=="Current EMI") 
								|| ($(this).attr("name")=="last month take home") 
								|| ($(this).attr("name")=="last to Last month take home")
								||($(this).attr("name")=="Property Value")
								||($(this).attr("name")=="Age of Property")
								||($(this).attr("name")=="Loan Amount")
								||($(this).attr("name")=="Loan Tenor")
								||($(this).attr("name")=="Existing EMI")
								||($(this).attr("name")=="Loan Amount")
								||($(this).attr("name")=="Annual TurnOver")
								||($(this).attr("name")=="Last year PBT")
								||($(this).attr("name")=="Last month take home")) 
						{			    	
							if(/^[0-9,\d]+$/.test(val)) 
							{	error = 1;
							$(this).css("border","1px solid green");
//							$('#error_head').text("");
							$('#error_head,#error').text("");
							}
							else{
								error = 0;
								$(this).css("border","1px solid red");	
//								$('#error_head').text("");
								$('#error').text("Please Enter only Numeric value");
								return false;
							}
						}
						else if (($(this).attr("name") == "PinCode")) {
							if (!(/^[0-9]{6}$/.test(val))) {
								error = 1;
								$(this).css("border","1px solid red");
								$('#error').text("Please Enter valid 6 digit Pin Code");
							} else {
								error = 0;
								$(this).css("border","1px solid green");
//								$('#error_head').text("");
								$('#error_head,#error').text("");
							}
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

				//<!-------------------cursor move to next an prev OTP------------------------->
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
		//} //end of detect version

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
			//		$("."+dflt)
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
//			$(".checkIt").toggleClass("bubble");
			var option = $(this).attr("id");
//			console.log("Getting from url="+url[url.length - 1]);
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
