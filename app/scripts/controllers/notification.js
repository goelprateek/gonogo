;(function(){

	'use strict';

	var app = angular.module('gonogo');

	app.controller('NotificationController', ['$scope','$rootScope', '$http', 
		'$timeout','Validation',function($scope, $rootScope ,$http , $timeout,Validation,BASE_URL_DEMO){

	
	// if(typeof $scope.InstitutionID != 'undefined'){

	// 	if($scope.InstitutionID==3988 || $scope.InstitutionID==4011){
	// 		$("#logo.img-responsive").css("padding","1");
	// 	}		
	// }
	
	//check offers access to this user.
	var offersAllowed = $scope.authenticate('NOFRS');

// For Hiding the user profile if any time he has seen
//	$("#UserContainer").hide();
	var st = 1;
	var treeData = [], map;
	$rootScope.template ="notification";
	polling();// countinously calling notifiaction from server
	
	
	function polling() {
		if($rootScope.template == "notification")
  		{
		if (st == 1)
		{
			$http({
				method : 'POST',
				url : BASE_URL_DEMO+'findall',
				params:{'userid':$scope.userid,'INSTITUTION_ID':$scope.InstitutionID},
				headers : {'Content-Type' : 'application/json'}
			}).success(function(Response){
//				console.log(JSON.stringify(Response));
				if(Response.StatusCode == 101)
				{ $scope.notifyarrey = Response.Data;
				st = 2;
				$scope.error ="";
//				console.log(JSON.stringify(Response));
				}else{
					$scope.error="The request failed due to an internal error.";
				}
			}).error(function(erro){
				$scope.error = "System is under maintenance..Please try later";
			});

		} else {
			$http({
				method : 'POST',
				url : BASE_URL_DEMO+'findall',
				params:{'userid':$scope.userid,'INSTITUTION_ID':$scope.InstitutionID},
				ignoreLoadingBar : true,
				headers : {	'Content-Type' : 'application/json'}
			}).success(function(Response) 
					{if(Response.StatusCode == 101)
					{$scope.notifyarrey = Response.Data;
					$scope.error = "";
					}else{
						$scope.error="The request failed due to an internal error.";
					}
					}).error(function(data){
						$scope.error = "System is under maintenance..Please try later";
					});
		}
		$timeout(function() {
			polling();
		}, 6000);
	}}
	// variables for application re processing page
/*	$scope.statelist =['Select State','Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar',
	                   'Chandigarh','Chhattisgarh','Dadra and Nagar Haveli','Daman and Diu','Delhi','Goa','Maharashtra'];
	$scope.state = $scope.statelist[0];*/

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
	// end variable default value section	
	var dataset = [{'Name':'Auto Loan',
		'ID':'0',
		'Icon':'img/icons_auto.png',
		'Count':'2',
		'Type' : 'Approve',
		'Offers':[{'Name':'Refinance your Auto Loan at 12% APR','Icon':'img/icons_auto.png'},
		          {'Name':'Get up-to 60% discounts on Auto Insurance ','Icon':'img/icons_auto.png'}]
	},
	{'Name':'Personal Loan',
		'ID':'1',
		'Icon':'img/icon-personal-loan.png',
		'Count':'1',
		'Type' : 'Approve',
		'Offers':[{'Name':'Avail 10% of your sanctioned Home Loan amount at zero processing charges','Icon':'img/icon-personal-loan.png'}]
	},
	{'Name':'Credit Card',
		'ID':'2',
		'Icon':'img/Credit_Card.png',
		'Count':'4',
		'Type' : 'Approve',
		'Offers':[{'Name':'5000 INR cash-back if you pay the Home Loan processing fee using your new credit card','Icon':'img/Credit_Card.png'},
		          {'Name':'0% on New purchases for the first three months ','Icon':'img/Credit_Card.png'},
		          {'Name':'Credit Card with no credit limit cap','Icon':'img/Credit_Card.png'},
		          {'Name':'Consolidate your balances for 6% APR for the first 6 months','Icon':'img/Credit_Card.png'}]
	},
	{'Name':'Home Insurance',
		'ID':'3',
		'Icon':'img/Home_Insurance.png',
		'Count':'3',
		'Type' : 'Approve',
		'Offers':[{'Name':'50% discount on Premium for long-term Home Insurance policy ','Icon':'img/Home_Insurance.png'},
		          {'Name':'10% discount on the Home Content Insurance for covers upto 4 Lakh Rupees ','Icon':'img/Home_Insurance.png'},
		          {'Name':'Protect your home for 20 years with a single premium','Icon':'img/Home_Insurance.png'}]
	}];

	$scope.load_details = function(CustID, event)
	{  $scope.Picked = CustID;
//	$(document.body).find("#"+CustID+"").parent().css("background-color","grey");
	var record, customer;
	for(record in $scope.notifyarrey)
	{
		if(record.CUSTOMER.CustID === CustID)
		{ $rootScope.details = record;
		  $scope.error="";
		  $scope.showrefid = "true";
		  break;
		}
	}
//	console.log("Details.application.AppScore--"+JSON.stringify($rootScope.details.CUSTOMER.name);

	}


	$scope.cro_action = function(CustID, action)
	{ 
		if((typeof CustID !== "undefined") && (typeof $rootScope.details !== "undefined"))
		{
			$scope.action = action;
			$scope.CustID = CustID;
			$rootScope.details = "";
			$scope.showrefid = "";
			if(offersAllowed)
			{ $('div[contextmenu="blur"]').addClass("blured");
			  $('#OfferPanel').slideDown();
			  $scope.OfferArrey = dataset;
			  $scope.AvailebleOffers = $scope.OfferArrey[0].Offers;
			  $scope.ID = 0;
			}else{
				$scope.updateStatus(); 
			}
		}else{
			$scope.error = "Please select enquiry from Queue...!!!";
		}
	}

 $scope.updateStatus=function()
 {  $('.LoaderSpinner').show();
	   var offers={'offers':[]};
		if(offersAllowed)
		{ for(var i=0;i<dataset.length;i++)
		  {for(var j=0;j<dataset[i].Offers.length;j++)
		   {if((typeof dataset[i].Offers[j].selected != 'undefined'))
		    {
			offers.offers.push(dataset[i].Offers[j]);
		    }
		   }
		  }
	     $('#OfferPanel').slideUp();
	     $('div[contextmenu="blur"]').removeClass("blured");
	    } 

	$http({
		method : 'POST',
		url : BASE_URL_DEMO+'update_status',
		params : {'key':$scope.CustID,'status':$scope.action,'Offers':offers},
		headers : {'Content-Type' : 'application/json'}
	}).success(function(Response) 
			{//console.log(JSON.stringify(Response));
		if(Response.StatusCode == 101)						
		{setTimeout(function() { $('.LoaderSpinner').hide()},2000);
		$(document.body).find("#"+$scope.CustID+"").addClass($scope.action);
		$scope.error = "Apllication is successfully "+$scope.action+""; 
		}
		else{
			$scope.error="The request failed due to an internal error.";
		}
		 setTimeout(function() { $scope.error = "";},1500);
		 }).error(function(data)
			{
			 $scope.error = "Sorry...we could't process your request"+"\n"+"System is under maintenance";
			});		
	};


//	$("#back").click(function(){

	// $(window).scroll(function() {
//	if($('#application-main-container').is(":visible"))
//	{  var window_top = $(window).scrollTop();
//	var div_top = $('#application-main-container').offset().top;
//	var header = $("#header-fixed").offset().top;
//	if(window_top > header)
//	{
//	$('#header-fixed').addClass('scroll-fixed-top');
//	}else{ 
//	$('#header-fixed').removeClass('scroll-fixed-top');
//	}
	//
//	console.log("window : "+window_top+" div: "+div_top+" red:"+header);
//	if (window_top > div_top) {
//	$('#top-fixed').addClass('scroll-fixed-top');
//	}else{ 
//	$('#top-fixed').removeClass('scroll-fixed-top');
//	}
//	}
	//});
//	$("#reSubmit").click(function(){

	$(document.body).on("click","#back",function(){
//		alert("Closing...");
		$("#application-main-container").slideUp();				
		$("#notification-main-container").show();
	});

	$(document.body).on("click","#submit",function(){
//		console.log("project : "+$scope.project);
//		if(validate())
//		{
//		alert("Function Called");
if(Validation.validate())
	{   console.log("Amount="+$("#project_amount").val());
		$('.LoaderSpinner').show();
		$("#erro-msg").hide();
		var dataset = {
				'CUSTOMER' : {
					'name' : $scope.name,
					'city' : $("#city").val(),
					'address' : $scope.address1+","+$scope.address2,
					'mobile' : $scope.mobile,
					'email' : $scope.email,
					//	'employer' : $("#job_compnay_name").val(),
					'timeEmployer' : $scope.time_employer.value,
					'dob' : $('#dob').val(),
					'gender':$scope.gender,
					'timeAddress' : $scope.time_address.value,
					///	'grossAnnual' : $scope.gross_annual.replace(/,/g , ""),
					//	'currentEmi' : $scope.current_emi.replace(/,/g , ""),
					'lastMonthIncome' : $scope.lmth.replace(/,/g , ""),
					'lastLastMonthIncome' : $scope.llmth.replace(/,/g , ""),
					'pincode': $scope.pin,
					'state':$("#statelist").val(),
					'maritalStatus':$scope.maritalStatus

				},
				'DSA' : {
					'DsaID':$scope.userid
				},
				'KYC' : {
					'pan' : $scope.pan,
					'aadhar' : $scope.aadhar,
					'panStatus' : 'Unverified',
					'aadharStatus' : 'Unverified',
//					'DirID' : $("#mobile").val().trim()
				},
				'PROPERTY' : {
					'ProjectName' : $("#projectname").val(),
					'Amount' : $scope.Amount.toString().replace(/,/g ,""),
					'Location' : $("#city").val()
				},
				'APPLICATION':{
					'INSTITUTION_ID':$scope.InstitutionID,
					'AppType':'01'
				}
		};

		$http({
			method : 'POST',url : BASE_URL_DEMO+'save',
			data : dataset, ignoreLoadingBar: true,
			params:{'REFID':$scope.RefID,'Pan': $scope.image_url1, 'Aadhar': $scope.image_url2, 'Income1': $scope.image_url3, 'Income2': $scope.image_url4},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
				{ if (Response.StatusCode == "101") 
				 {  $scope.error="Please Wait while we Re-Processing your request.";
					$timeout(function(){
						$scope.error="";
						$('.LoaderSpinner').hide();
						$("#application-main-container").slideUp();
						$("#notification-main-container").show();
					},2700);
				 }else{
					 $scope.error="The request failed due to an internal error.";
				 }
				}).error(function(error) {
					$('.LoaderSpinner').hide();
					$scope.error = 'Sorry ! We could not process this request...';		
				});
	}else{
		$("#erro-msg").show();
	}

//		}//end valid block
	});

	$scope.newApplication = function(refid)
	{  $('#dob').datepicker({changeMonth: true, changeYear: true, yearRange: "1945:1997", dateFormat: 'dd:M:yy'});
		$("#notification-main-container").hide();
		$("#application-main-container").show();
		$scope.RefID = refid;
		$scope.agentid = $rootScope.details.DSA.DsaID;
		var address = $rootScope.details.CUSTOMER.address.split(',');	
		$scope.name = $rootScope.details.CUSTOMER.name.replace("null","");							    	
		$scope.mobile = $rootScope.details.CUSTOMER.mobile;
		$scope.project = $rootScope.details.PROPERTY.ProjectName;								
		$scope.Amount = $rootScope.details.PROPERTY.Amount;
		$scope.location = $rootScope.details.PROPERTY.Location;
		$scope.image_url1 = $rootScope.details.KYC.panImage;
		$scope.image_url2 = $rootScope.details.KYC.aadharImage;
		$scope.image_url3 = $rootScope.details.KYC.incomeImage1;
		$scope.image_url4 = $rootScope.details.KYC.incomeImage2;
		$scope.email = $rootScope.details.CUSTOMER.email;
		$scope.dob = $rootScope.details.CUSTOMER.dob;
		$scope.gender = $rootScope.details.CUSTOMER.gender;
//		$scope.state = $scope.statelist[getTime($rootScope.details.CUSTOMER.state, $scope.statelist)];
		$("#statelist").val($rootScope.details.CUSTOMER.state);
		$scope.address1 = address[0];
		$scope.address2 = address[1];
		$scope.pin = $rootScope.details.CUSTOMER.pincode;
		$scope.time_address = $scope.timeataddress[getTime($rootScope.details.CUSTOMER.timeAddress,  $scope.timeataddress)];
		$scope.pan = $rootScope.details.KYC.pan;
		$scope.aadhar = $rootScope.details.KYC.aadhar;							    	
		$scope.employment_type = $scope.jobType[3];
		$scope.employer = $rootScope.details.CUSTOMER.employer;
		$scope.time_employer = $scope.timeataddress[getTime($rootScope.details.CUSTOMER.timeEmployer, $scope.timeataddress)];							    	
		$scope.gross_annual =  Validation.NoWithComma($rootScope.details.CUSTOMER.grossAnnual);
		$scope.current_emi =  $rootScope.details.CUSTOMER.currentEmi;
		$scope.lmth =  Validation.NoWithComma($rootScope.details.CUSTOMER.lastMonthIncome);
		$scope.llmth =  Validation.NoWithComma($rootScope.details.CUSTOMER.lastLastMonthIncome);
		$('#Job').show();
	}
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
//		console.log("index="+index);
		return index;
	}

	$scope.Load_Offer = function(NodeID,Obj)
	{
		var BoxID = Obj.currentTarget.attributes.id.nodeValue;
		$('div[id^='+BoxID.slice(0,BoxID.length-1)+']').css("background-color","#fff");
		$('#'+BoxID+'').css("background-color","#F4F8F9");
		for(var i=0; i<dataset.length; i++)
		{if(dataset[i].ID == NodeID)
		{	$scope.AvailebleOffers = dataset[i].Offers;
			$scope.ID = NodeID;
		}
		}
	}
	
	$scope.checkboxUpdate = function(Obj,id)
	{ if(Obj)
	  {if (typeof dataset[$scope.ID].selected != "undefined") 
	    {  dataset[$scope.ID].selected.push(id);	
	      if(typeof dataset[$scope.ID].Offers[id].selected == "undefined")
	       { $.extend( dataset[$scope.ID].Offers[id], {'selected':'true'});}
	    }
	    else{
		  var selected={'selected':[]};
		  $.extend( dataset[$scope.ID], selected);
		  dataset[$scope.ID].selected.push(id);	
	 	  if(typeof dataset[$scope.ID].Offers[id].selected == "undefined")
		  { $.extend( dataset[$scope.ID].Offers[id], {'selected':'true'});}
	    }	
	  }else{
		dataset[$scope.ID].selected.splice($.inArray(id, dataset[$scope.ID].selected),1);
		delete dataset[$scope.ID].Offers[id].selected;
	     }
	  if((typeof dataset[$scope.ID].selected !="undefined") && (dataset[$scope.ID].selected.length > 0))
	   {
		$('#active'+$scope.ID+'').css("background-color","green");
		$scope.OfferArrey = dataset;
	   }
	  else{
		$('#active'+$scope.ID+'').css("background-color","#fff");
	  }
	}

//	$("#closeOffer").click(function()
	$(document.body).on("click","#closeOffer" ,function()	
			{
		$('#OfferPanel').slideUp();
		$('div[contextmenu="blur"]').removeClass("blured");
			});

//	$("#SendOffer").click(function()
/*	$scope.updateStatus=function()
	{  $('.LoaderSpinner').show();
	var offers={'offers':[]};

	if($scope.Auth.Notification.offers)
	{ for(var i=0;i<dataset.length;i++)
	{for(var j=0;j<dataset[i].Offers.length;j++)
	{if((typeof dataset[i].Offers[j].selected != 'undefined'))
	{
		offers.offers.push(dataset[i].Offers[j]);
	}
	}
	}
	$('#OfferPanel').slideUp();
	$('div[contextmenu="blur"]').removeClass("blured");
	}

	$http({
		method : 'POST',
		url : '/GoNoGoV2/api/GoNoGoV2/update_status',
		params : {'key':$scope.CustID,'status':$scope.action,'Offers':offers,'InstID':$scope.InstitutionID},
		headers : {'Content-Type' : 'application/json'}
	}).success(function(Response) 
			{//console.log(JSON.stringify(Response));
		if(Response.StatusCode == 101)						
		{setTimeout(function() { $('.LoaderSpinner').hide()},2000);
		$(document.body).find("#"+$scope.CustID+"").addClass($scope.action);
		$scope.error = "Apllication is successfully "+$scope.action+""; 
		}
		else{
			$scope.error="The request failed due to an internal error.";
		}
		setTimeout(function() { $scope.error = "";},1500);
			}).error(function(data)
					{
				$scope.error = "Sorry...we could't process your request"+"\n"+"System is under maintenance";
					});		
	};*/

	$scope.scoreTree = function(CustID)
	{
		treeData = [];
		$http({
			method : 'POST',
			url : BASE_URL_DEMO+'GetAppScoreJson',
			params : {'CustID':CustID},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
		{	if(Response.StatusCode == 101)
				{ $scope.error ="";
				if(Response.Data != null)
				{ generate_scoreJson(Response.Data);}
				else
				{ $("#scoreTree").text("Sorry ...Score has not been calculated for this application.");  }
				}
				else{
					$scope.error="The request failed due to an internal error.";}
				}).error(function(data)
				{
					$scope.error = "Sorry...we could't process your request"+"\n"+"System is under maintenance";
				});		

		var colors = ['#689f38','#EF3D16','#fb8c00','#8BC34A','#2196F3','#9C27B0','#bdbdbd','#009688','#ffc107','#689f38'];
		// generate json for tree		
		function generate_scoreJson(temp)
		{
			try{
				if(temp != null && typeof temp != 'undefined')
				{ treeData.push({"name":"Application Score", "score":temp.AppScore, "color":"#2196F3", "children":[]});
				for(var i=0; i<temp.Scores.length; i++)
				{
					var color = colors[i];
					var cat = temp.masterMap[temp.Scores[i].name];
					treeData[0].children.push({"name":temp.Scores[i].name, "score":temp.Scores[i].score, "color":color, "children":[]});
					for(var j=0; j< temp.Scores[i].Plans[0].length; j++)
					{
						var att = cat[temp.Scores[i].Plans[0][j].name];
						treeData[0].children[i].children.push({"name":temp.Scores[i].Plans[0][j].name, "score":temp.Scores[i].Plans[0][j].score, "color":color, "children":[]}); 
						for(var k=0; k<temp.Scores[i].Plans[0][j].Fields[0].length; k++)
						{
							var field = att[temp.Scores[i].Plans[0][j].Fields[0][k].name];
							var exp = field["expression"];
							var dscore = field["dScore"];
							var weight = field["weight"];
							treeData[0].children[i].children[j].children.push({"score":temp.Scores[i].Plans[0][j].Fields[0][k].score, "color":color,"dscore":dscore, "exp":exp, "weight":weight});
						}
					}
				}
				}
			}catch(error)
			{
				console.log(error);
				$("#scoreTree").text("Sorry we cant process this score tree");
			}

//			console.log(JSON.stringify(treeData));
			var margin = {top: 120,right: 150,bottom: 80,left: 120},
			width = 1000,
			height = 10;
			var i = 0,duration = 750,root,depth = 0;
			var tree = d3.layout.tree().nodeSize([120, 80]).separation(function separation(a, b) {
				return (a.parent == b.parent ? 1 : 1);
			});

			var diagonal = d3.svg.diagonal()
			.projection(function(d) {
				return [d.y, d.x];
			});

			var svg = d3.select("#scoreTree").append("svg")
			.attr("width", width)
			.attr("height", height).call(zm = d3.behavior.zoom().scaleExtent([1, 1]).on("zoom", redraw))
			.append("g").attr("transform", "translate(" + width / 2 + "," + 20 + ")");

			zm.translate([width / 2, 20]); //add drag functionality
			root = treeData[0];
			root.x0 = height / 2;
			root.y0 = 0;

			function collapse(d) {
				if (d.children) {
					d._children = d.children;
					d._children.forEach(collapse);
					d.children = null;
				}
			}

			root.children.forEach(collapse);
			update(root);
			/* d3.select("#graph").style("height", "800px");*/
			function update(source) {
				// Compute the new tree layout.
				var nodes = tree.nodes(root).reverse(),
				links = tree.links(nodes);

				// Normalize for fixed-depth.
				nodes.forEach(function(d) {
					d.y = d.depth * 120;
				});

				// count no of chuldren
				var levelWidth = [1];
				var childCount = function(level, n) {
					if (n.children && n.children.length > 0) {
						if (levelWidth.length <= level + 1) {
							levelWidth.push(0);
						}
						levelWidth[level + 1] += n.children.length;
						n.children.forEach(function(d) {
							childCount(level + 1, d);
						});

					}
				};
				childCount(0, root);
				/* increase height of graph with respect to depth*/
				if ((height > 100) && (levelWidth.length > depth)) {
					height = height + 160;
					depth = levelWidth.length;
				} else if (height < 100) {
					height = 170;
				}
				// console.log(depth);

				$("#scoreTree").css("height", height);
				d3.select("svg").attr("height", height);


				// Update the nodes…
				var node = svg.selectAll("g.node")
				.data(nodes, function(d) {
					return d.id || (d.id = ++i);
				});

				var SVGmouseTip = d3.select("g.tooltip.mouse");
				// Enter any new nodes at the parent's previous position.
				var nodeEnter = node.enter().append("g")
				.attr("class", "node")		
				.attr("transform", function(d) {
					return "translate(" + source.x0 + "," + source.y0 + ")";
				})
				.on("click", click).on("mouseout", function() {
					d3.select("#tooltip").classed("hidden", true);
				})
				.on("mouseover", function(d) {
					var matrix = this.getScreenCTM()
					.translate(+this.getAttribute("cx"), +this.getAttribute("cy")); //Get this bar's x/y values, then augment for the tooltip

					d3.select("#tooltip") //Update the tooltip position and value
					.style("left", Math.max(0, d3.event.pageX - 20) + "px")
					.style("top", (d3.event.pageY - 120) + "px");

					//bind value with labels
					$('#node_expression').text(d.exp);//find function erturn the full string
					$('#node_details').text("Score : "+ d.dscore + "  Weight : "+d.weight);
					d3.select("#tooltip").classed("hidden", false); //Show the tooltip

				})
				.on('mousemove', function(d) {
					d3.select("#tooltip").style("left", Math.max(0, d3.event.pageX - 20) + "px") //the d3.mouse() function calculates the mo
					.style("top", (d3.event.pageY - 120) + "px");
				});              

				nodeEnter.append("ellipse")
				.attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12)
				.style("fill", function(d) {
					return d._children ? "lightsteelblue" : d.color;
				});

				nodeEnter.append("text")
				.attr("y", function(d) {
					return d.children || d._children ? -20 : 20;
				})
				.attr("dy", ".20em")
				.attr("text-anchor", "middle")
				.text(function(d) {
					return d.name;
				})
				.style("fill-opacity", 1);

				nodeEnter.append("text") // append text
				.style("fill", "white")   // fill the text with the colour black
				.attr("dy", ".20em")   // set offset y position
				.attr("text-anchor", "middle") // set anchor y justification 
				.text(function(d) {
					return d.score;
				});        

				// Transition nodes to their new position.
				var nodeUpdate = node.transition()
				.duration(duration)
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

				var diagonal = d3.svg.diagonal()
				.projection(function(d) {
					return [d.x, d.y];
				});

				nodeUpdate.select("ellipse")
				.attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12)
				.style("fill", function(d) {
					// return  d.color;
					return d._children ? "lightsteelblue" : d.color;
				});


				nodeUpdate.select("text").style("fill-opacity", 1);

				// Transition exiting nodes to the parent's new position.
				var nodeExit = node.exit().transition()
				.duration(duration)
				.attr("transform", function(d) {
					return "translate(" + source.x + "," + source.y + ")";
				})
				.remove();

				nodeExit.select("ellipse")
				.attr("cx", 0).attr("cy", 0).attr("rx", 25).attr("ry", 12);

				nodeExit.select("text")
				.style("fill-opacity", 1e-6);

				// Update the links…
				var link = svg.selectAll("path.link")
				.data(links, function(d) {
					return d.target.id;
				});

				// Enter any new links at the parent's previous position.
				link.enter().insert("path", "g")
				.attr("class", "link")
				.attr("d", diagonal);

				// Transition links to their new position.
				link.transition()
				.duration(duration)
				.attr("d", diagonal);

				// Transition exiting nodes to the parent's new position.
				link.exit().transition()
				.duration(duration)
				.attr("d", function(d) {
					var o = {
							x: d.x0,
							y: d.y0
					};
					return diagonal({
						source: o,
						target: o
					});
				})
				.remove();

				// Stash the old positions for transition.
				nodes.forEach(function(d) {
					d.x0 = d.x;
					d.y0 = d.y;
				});
			}

			// Toggle children on click.
			function click(d) 
			{              
				if (d.children) {
					d._children = d.children;
					d.children = null;
				} else {
					d.children = d._children;
					d._children = null;
				}
				update(d);            
			}

			//Redraw for zoom
			function redraw() 
			{//console.log("here", d3.event.translate, d3.event.scale);
				svg.attr("transform", "translate(" + d3.event.translate + ")");
//				console.log("scroll "+$('#scoreTree').parent().parent().parent());
			}
		}
	}
	$(document).on('click', '.close', function(e) {
		$("#scoreTree").text("");
	});
	
	$(function() {
//		get_name();
		$('#chat_window').hide();
		if(navigator.platform.toUpperCase().indexOf('MAC') !== -1)
		{
			$('.leftbar_scroll').css("margin","0px");			
		}
	});

	$(document.body).on('click','.custom_img_rounded',function() 
    {
		var src = $(this).attr("src");
		if($(this).hasClass("Report-Icon"))
		{ src=$(this).attr("name");
		}
		var url=src;
		src = src.substring(src.lastIndexOf('.') + 1);
		if (src.toUpperCase()=="PDF") {
			$('#document_preview').hide();
			$('#cirhtml').attr("data", url).show();
		} else if (src.toUpperCase()=="JPG"||src.toUpperCase()=="JPEG"||src.toUpperCase()=="PNG") {
			$('#cirhtml').attr("data", "").hide();
			$('#document_preview').attr("src", url).show();
		}
	});

	$(document).on('click', '#addkyc', function(e) {
		$('#addkyc_layout').toggle();
		e.preventDefault();
	});
	$(document).on('click', '#kycdoc', function(e) {
		$('#kycdoc_layout').after().append();
		$('#kycdoc_layout').after().append("<div class='col-md-3'><a href='#myModal' data-toggle='modal' ><div class='preview' ng-style='{'background-image':'url('+image_url4+')'}' accesskey='{{image_url4}}'> <span ng-if='!image_url4'>Document Not available</span></div><label class='control-label'> Income Proof 2</label></a></div>");

	});

	$(document).on('change', '#id_option', function() 

			{
		if(this.value=="PASSPORT"){
			$("#id_number").attr('maxlength','1');
			$('#kyc_text_field, #kyc_submit').slideDown();
			console.log("selected:"+(this).value);

		}
		else if(this.value=="VOTER_ID"){
			$("#id_number").attr('maxlength','2');
			$('#kyc_text_field, #kyc_submit').slideDown();
			console.log("selected:"+(this).value);

		}
		else if(this.value=="DRIVING_LICENSE"){
			$("#id_number").attr('maxlength', '3');
			$('#kyc_text_field, #kyc_submit').slideDown();
			console.log("selected:"+(this).value);

		}

		else if(this.value=="SELECTKYC"){
			$('#kyc_text_field, #kyc_submit').slideUp();
			console.log("selected:"+(this).value);
		}
			});

	$(document).on('click', '#submit_kyc', function(e)

			{
		var id_n = document.getElementById('id_number').value;//text field of number
		var option = document.getElementById('id_option').value;
//		var validity = document.getElementById('valid_upto').value;
		var optionid = document.getElementById('id_option');
		var mlength = $("#id_number").attr('maxLength');
		$('#kyc_layout').after().append();
		$('#kyc_layout').after().append("<div class='col-md-3' 'name'='kyc'><input class='form-control' type='text' id="+option+" ng-model="+option+" name="+option+" value="+id_n+" maxlength="+mlength+" /><p></p></div>");
		optionid.remove(optionid.selectedIndex);
		$("#id_number").val("");
		$('#id_number').attr("ng-model"," ");	
		id_n="";

		$('#addkyc_layout').slideUp();
		$('#kyc_text_field').slideUp();
		$('#kyc_submit').slideUp();
		e.preventDefault();

			});


	$(".preview").click(function(){
		var src = $(this).attr("accesskey");
		$('#document_preview').attr("src", src).show();
	});
	
	$(document).on('click', '#btn_close', function(e) {
		e.preventDefault();
		$(this).parent().parent().hide();
	});


	$(document).on('click', '#minimize', function(e) {
		$(this).parent().parent().animate({
			height : '30px'
		}, 200);
		e.preventDefault();
	});
	$(document).on('click', '#maxmize', function(e) {
		$(this).parent().parent().animate({
			height : '250px'
		}, 200);
		e.preventDefault();
	});
	//initiate chat from cro side to dsa
//	$(document).on('click', '#dsa_chat', function(e) {
//		get_name();
//		$('#chat_window').show();
//		e.preventDefault();
//	});

//	$('#chat_window').hide();
}]);


}).call(this)