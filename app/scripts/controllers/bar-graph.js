;(function(){
	'use strict';
	
	angular.module('gonogo').controller("BarGraphController" , [ '$http','$rootScope' ,'$scope','BASE_URL_SCOR','BASE_URL_GNG','RestService', function($http,$rootScope,$scope,BASE_URL_SCOR,BASE_URL_GNG,RestService) {
	     
		var stackThumbnail ='<div class="thumb" id="stackThumbnail"><a ><img src="ReportLib/stackgraphimg.png"/></a><div>Volume Stack</div></div>';
		var tableDataThumbnail ='<div class="thumb" id="tableDataThumbnail"><a ><img src="ReportLib/tabledata.png" /></a><div>Customer Info</div></div>';
		var treeThumbnail='<div class="thumb" id="treeThumbnail"><a ><img src="ReportLib/tree.png" /></a><div>Scoring Tree</div></div>';
		var mbars='<div id="mbars" style="border: 0px solid;width:100%;margin-left:4%"></div>';
		if($scope.InstitutionID == '4019'){
			var layout='<div class="col-md-12" id="graphArea" style="padding-left:0px"></div>';
			var legend = '<div id="legendGroup" style="margin-left: 25%;"><ul class="legend"><li><span class="approved"></span> Approved</li><li><span class="declined"></span> Declined</li><li><span class="pending"></span>Queue</li></ul></div>';
		}
		var instid=$scope.InstitutionID;
		var userid = $scope.userid;
		var email = $scope.useremail;
//		console.log("instid from bargraph ="+instid);
//		console.log("instid from bargraph"+$scope.InstitutionID);
		$(document.body).find("#mtd-box").append(layout);
//		$('body').append(canvasElement);
//		canvas = document.getElementById('canvas');
//		ctx = canvas.getContext('2d');
//		DOMURL = window.URL || window.webkitURL || window;
//	    img = new Image();
	    

		var scoringDiv = '<div id="scoringdiv"><div id="graph"></div></div>';
		var graph='<div id="graph"></div>';
		$(document).ready(function() {
			try {
				var userdata = JSON.parse(atob(localStorage.getItem('GUID')));
				$scope.username = userdata.name;
				$scope.useremail = userdata.email;
				$scope.InstitutionID = userdata.InstitutionID;
				$scope.userid = userdata.userid;
			}catch (e){
				console.log("ERROR GONOGO: "+e);
				$scope.redirect();
			}
			var instid=$scope.InstitutionID;
			var userid = $scope.userid;
			var email = $scope.useremail;
			$(document.body).find("#mtd-box").append(layout);
//			$('body').append(canvasElement);
//			canvas = document.getElementById('canvas');
//			ctx = canvas.getContext('2d');
//			DOMURL = window.URL || window.webkitURL || window;
//		    img = new Image();
		    
			$('body').on('click', '#stackThumbnail', function() {
				$('#graph').html("").hide();
				$('#scoring_table').hide();
				$('#stackThumbnail').remove();
				$('#tableDataThumbnail').remove();
				$('#treeThumbnail').remove();
				$('#mbars,#legendGroup').show();
				$(document.body).find('#mtd-box .CatError').hide();
				$(document.body).find("#scoringdiv").css("overflow-x","hidden");
			});
			
			$('body').on('click', '#tableDataThumbnail', function() {
				$('#mbars,#legendGroup').hide();
				$('#graph').html("").hide();
				$('#tableDataThumbnail').remove();
				$('#treeThumbnail').remove();
				$('#scoring_table').show();
				$('#stackThumbnail').show();
				$(document.body).find('#mtd-box .CatError').hide();
				
			});
			
			$('body').on('click', '#treeThumbnail', function() {
				$('#graph').show();
				$('#mbars,#legendGroup').hide();
				$('#scoring_table').hide();
				$('#stackThumbnail').show();
				$('#treeThumbnail').remove();
				$(document.body).find('#mtd-box .CatError').hide();
			});
			$('body #Loader').show();
			getStackGraph();
			function getStackGraph()
			{
				if( $scope.InstitutionID=='4019'){
					$('#stackThumbnail').remove();
					//remove back button
					$rootScope.tabledata =[];
					if(email.indexOf("dsa") > -1 || email.indexOf("DSA") > -1)
						{var json={"sInstID" : $scope.InstitutionID,"sDsaID":email};}
					else{var json={"sInstID" : $scope.InstitutionID};}
					
					var URL = "stack-graph";
					
					RestService.saveToServer(URL,json).then(function(response){
						$('body #Loader,  body #mtd-box .CatError').hide();
						if(response[0].length != 0 || response[1].length != 0 || response[2].length != 0 )
							{
							$('#graphArea').html("");
							$('#mbars').html("");
							$('#graphArea').append(mbars);
							$('#mbars').after(legend);
							stackGraph(response);
							}else{
								$('body #Loader').hide(2000);
								$('body #mtd-box .CatError').text("Data is unavailable to generate reports!!!").show();
							}
					},function(error){
						$('body #Loader').hide(2000);
						$('body #mtd-box .CatError').text("Sorry we are unable to genrate your reports. Please try later..!!!");
					});	
					
					
				}else{
					$.ajax({
						method: "GET",
						url: BASE_URL_SCOR+"StackGraphData",
						data:{'INSTITUTION_ID':instid},
						type:"application/json"
					  }).done(function(resp) {
						$('body #Loader,  body #mtd-box .CatError').hide();
//						console.log(JSON.stringify(resp));
						response = resp.Data;
						if(response[0].length != 0 || response[1].length != 0 || response[2].length != 0 || response[3].length != 0 || response[4].length != 0)
							{
							$('#graphArea').html("");
							$('#mbars').html("");
							$('#graphArea').append(mbars);
							$('#mbars').after(legend);
							stackGraph(response);
							}else{
								$('body #Loader').hide(2000);
								$('body #mtd-box .CatError').text("Data is unavailable to generate reports!!!").show();
							}
					}).error(function(resp){
						$('body #Loader').hide(2000);
						$('body #mtd-box .CatError').text("Sorry we are unable to generate your reports. Please try later..!!!").show();
					});
				}
			
			/*	*/
			}
			setInterval(function(){getStackGraph()}, 5*60000);
			        
			function stackGraph(json){
				    var padding = {top: 10, right: 75, bottom: 20, left:18};
					var w = 1030;                        //width
					var h = 300;   					    //height
					//Set up stack method
					var stack = d3.layout.stack();
					
					for (var key in json) {
						sortResults(json[key]);
					}
					
					var dataset = json;
//					console.log(JSON.stringify(dataset));
					stack(dataset);
					if( $scope.InstitutionID!='4019'){
						var color_hash = {
								0 : ["Approved","#4CAF50"],
								1 : ["Decline","#F44336"],
								2 : ["OnHold","#2196f3"],
								3 : ["Queued","#807B83"],
								4 : ["Pending","#CCC"]
						};
					}else{
						var color_hash = {
								2 : ["APPROVED","#4CAF50"],
								1 : ["DECLINED","#F44336"],
								0 : ["QUEUE","#CCC"], 
						};
					}
					

					var xScale = d3.time.scale()
					.domain([new Date(new Date(dataset[0][0].time).getTime()-(1000*60*60*24)),
					         d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),0)])
					.rangeRound([0, w-padding.left-padding.right]);
					
					var yScale = d3.scale.linear()
					.domain([0,				
					         d3.max(dataset, function(d) {
					        	 return d3.max(d, function(d) {
					        		 return d.y0 + d.y;
					        	 });
					         })
					         ])
					         .range([h-padding.bottom-padding.top,0]);

					var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
					.tickFormat(function(d) { 
						var tempDate=(new Date(d)).getDate();
		                if(tempDate!=1)
		                    return d3.time.format('%d')(new Date(d));
		                else
		                    return d3.time.format('%b-%d')(new Date(d));
					})
					.ticks(d3.time.days)
					.tickSize(3)
					.tickPadding(8);

					var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.ticks();


					//var colors = d3.scale.category10();

					//Create SVG element
					var svg = d3.select("#mbars")
					.append("svg")
					.attr("id","stackGraphSVGElement")
					.attr("width", "103%")//check for cro screen
					.attr("height", h);

					// Add a group for each row of data
					var groups = svg.selectAll("g")
					.data(dataset)
					.enter()
					.append("g")
					.attr("class","rgroups")
					.attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
					.style("fill", function(d, i) {
						return color_hash[dataset.indexOf(d)][1];
					});

					var div = d3.select("#mbars").append("div")   
					.attr("class", "tooltip")               
					.style("opacity", 0);


					// Add a rect for each data value
					var rects = groups.selectAll("rect")
					.data(function(d) {
						return d; 
					})
					.enter()
					.append("rect")
					.attr("width", 2)
					.on("mousemove", function(d) {     
						div.transition()        
						.duration(100)      
						.style("opacity", .9);     
						div.html(d.y)  
						.style("left", (d3.event.pageX-190) + "px")     
						.style("top", (d3.event.pageY -280) + "px");    
					})      
					.on("mouseout", function(d) {       
						div.transition()        
						.duration(200)      
						.style("opacity", 0);   
					})
					.on("click", function(d) {  
						$(document.body).find('#mtd-box .CatError').hide();
						//Sayali
						if(instid==1002)
						{ var scoringTable='<div id="scoring_table" class="table-bordered"><table class="table  table-hover" style="width:100%; font-size:12px">';
							scoringTable =scoringTable+'<thead><tr><th>CCID</th><th>LOGIN_DATE</th><th>CITY_CLASS</th><th>CUST_TYPE</th><th>LOAN AMOUNT</th><th>INCOME</th><th>Bureau Score</th><th>APP SCORE</th><th>OUTCOME</th></tr></thead><tbody></tbody></table>';
						}
						else if(instid==4019)
							{
							if(email.indexOf("dsa") > -1 || email.indexOf("DSA") > -1){
								var scoringTable='<div id="scoring_table" class="table table-striped table-condensed header"><table class="table table-hover table-striped table-condensed header" style="width:100%; font-size:12px">';
								scoringTable =scoringTable+'<thead><tr><th>REF ID</th><th>DATE</th><th>CITY</th><th>CUSTOMER NAME</th><th>APP STATUS</th></tr></thead><tbody style="display: table-row-group;vertical-align: middle;border-color: inherit;"></tbody></table>';
							}else{
								var scoringTable='<div id="scoring_table" class="table table-striped table-condensed header"><table class="table table-hover table-striped table-condensed header" style="width:100%; font-size:12px">';
								scoringTable =scoringTable+'<thead><tr><th>Ref Id</th><th>Date</th><th style="width: 9%;">City</th><th style="width: 10%;">Customer Name</th><th style="width: 8%;">Loan Amount</th>';
								scoringTable =scoringTable+'<th style="width: 10%;">Monthly Income</th><th style="width: 8%;">Bureau Score</th><th style="width: 8%;">App Score</th><th style="width: 7%;">App Status</th>';
								scoringTable =scoringTable+'<th style="width: 8%;">Dealer Name</th><th style="width: 7%">Dsa Name</th><th style="width: 1%;">Remark</th></tr></thead>';
								scoringTable =scoringTable+'<tbody style="display: table-row-group;vertical-align: middle;border-color: inherit;"></tbody></table>';
							}
							}
						else
						{ var scoringTable='<div id="scoring_table" class="table-bordered"><table class="table  table-hover" style="width:100%; font-size:12px">';
							scoringTable =scoringTable+'<thead><tr><th>CUST ID</th><th>APP_DATE</th><th>CITY</th><th>CUST_NAME</th><th>LOAN AMOUNT</th><th>INCOME</th><th>BUREAU SCORE</th><th>APP SCORE</th><th>APP STATUS</th></tr></thead><tbody></tbody></table>';
						}

						$('#scoringdiv').html('');	
						$('body #Loader').show();
	//***********************************tree graph******************************************
					
						if( $scope.InstitutionID=='4019'){
							if(email.indexOf("dsa") > -1 || email.indexOf("DSA") > -1)
							{var json={"dtDate":d.time,"sStat":d.status,'sInstID':$scope.InstitutionID,"sDsaID":email};
							}
							else{var json={"dtDate":d.time,"sStat":d.status,'sInstID':$scope.InstitutionID};
							}
							var URL ="table-view";
							RestService.saveToServer(URL,json).then(function(tableData){
//								console.log("table data : "+JSON.stringify(tableData));
								$('body #Loader,  body #mtd-box .CatError').hide(2000);
								data = tableData;
								$rootScope.tabledata = data;
								if(data.length==0){
//									alert('Data is not available.');
								}
								else{
									$('#mbars,#legendGroup').hide();
									$('#treeThumbnail').hide();
									$('#thumbnailPanel').append(stackThumbnail);
									$('#scoringdiv').remove();
									$('#graphArea').append(scoringDiv);
									$('#scoringdiv').append(scoringTable);
									$rootScope.savedData = true;
									if(email.indexOf("dsa") > -1 || email.indexOf("DSA") > -1){
										var image=$(document.body).find("#stackThumbnail").find("img");
										image.attr("src","../ReportLib/stackgraphimg.png");
										$.each(data, function(i, item) 
									    {
											 var temp = new Date(item.date).getMonth()+1;
											 var tableRow = $('<tr>');
											 if(item.applicationId == null){ tableRow.append("<td></td>");}else{
											 tableRow.append("<td>" +item.applicationId + "</td>");}
											 tableRow.append("<td>"+new Date(item.date).getDate()+"/"+temp+"/"+new Date(item.date).getFullYear()+"</td>");
											 tableRow.append("<td >" + item.city + "</td>");
											 tableRow.append("<td >" + item.applicantName + "</td>");
										 	 tableRow.append("<td>" + item.applicationStatus + "</td>");
//											 $('#scoring_table table').addClass("table-striped table-condensed header");
										 	 $('#scoring_table tbody').append(tableRow);
										});	
									}
									else{
										$.each(data, function(i, item) 
									    {
											 var temp = new Date(item.date).getMonth()+1;
											 var tableRow = $('<tr>');
											 tableRow.append("<td>" +(item.applicationId==null?'':item.applicationId)+ "</td>");
											 tableRow.append("<td>"+new Date(item.date).getDate()+"/"+temp+"/"+new Date(item.date).getFullYear()+"</td>");
											 tableRow.append("<td>" +(item.city==null?'':item.city).toUpperCase() + "</td>");
											 tableRow.append("<td>" +(item.applicantName==null?'':item.applicantName) + "</td>");
											 tableRow.append("<td>" +(item.loanAmount==null?'':item.loanAmount) + "</td>");
											 tableRow.append("<td>" +(item.income==null?'':item.income) + "</td>");
											 tableRow.append("<td>" +(item.bureauScore==null?'':item.bureauScore)+ "</td>");
											 tableRow.append("<td>" +(item.applicationScore==null?'':item.applicationScore) + "</td>");
										 	 tableRow.append("<td>" +(item.applicationStatus==null?'':item.applicationStatus.toUpperCase()) + "</td>");
										 	 tableRow.append("<td>" +(item.dealerId==null?'':item.dealerId)+ "</td>");
										 	 tableRow.append("<td>" +(item.dsaId==null?'':item.dsaId.split("@")[0])+ "</td>");
										 	 tableRow.append("<td id='remark'><ul></ul></td>");
										 	 console.log("cro jstfctino : "+JSON.stringify(item));
										 	 
										 	 if(item.croJustificationList!="" && item.croJustificationList!=null){
										 		 $.each(item.croJustificationList, function(i, temp){
										 			 if(temp.sRemark!=null && temp.sRemark!=''){
		//								 				tableRow.find('ul').append("<li>"  +temp.sRemark + "</li>");
										 				tableRow.find('#remark').find('ul').append("<li>"  +temp.sRemark.toUpperCase() + "</li>");
										 			 }
										 		 });
										 	 }
										 	/* tableRow.append("<td id='subject'><ul></ul></td>");
										 	 if(item.croJustificationList!="" && item.croJustificationList!=null){
										 		 $.each(item.croJustificationList, function(i, temp) {
										 			 if(temp.sSubTo!=null && temp.sSubTo!=''){
		//								 				tableRow.find('ul').append("<li>"  +temp.sSubTo + "</li>");
										 				tableRow.find('#subject').find('ul').append("<li>"  +temp.sSubTo.toUpperCase() + "</li>");
										 			 }
										 		 });
										 	 }*/
//										 $('#scoring_table table').addClass("table-striped table-condensed header");
										 	 $('#scoring_table tbody').append(tableRow);
									});
								}
							}
						},function(error){
								$('body #Loader').hide(1500);
								//		alert('Data is not available.');
								$('body #mtd-box .CatError').text("Sorry...We are unable to generate report. Please try later..!!!").show();
						});	
							
							
						
						}else{
							$.ajax({
								method: "GET",
								url: BASE_URL_SCOR+"TableGraphData",
								type:"application/json",
								data:{"date":d.time,"status":d.status,'INSTITUTION_ID':instid}
							})
							.done(function(tableData) {
//								console.log(JSON.stringify(tableData));
								$('body #Loader,  body #mtd-box .CatError').hide(2000);
								data = tableData.Data;
								if(data.length==0){
									alert('Data is not available.');
								}
								else{
									$('#mbars,#legendGroup').hide();
									$('#treeThumbnail').hide();
									$('#thumbnailPanel').append(stackThumbnail);
									$('#scoringdiv').remove();
									$('#graphArea').append(scoringDiv);
									$('#scoringdiv').append(scoringTable);
									if(instid == 1002)
									{
									   $.each(data, function(i, item) 
									   {
										var tableRow = $('<tr onClick=showTree('+item.CCID+',"'+item.APP_SCORE+'",'+instid+');>');
										 tableRow.append("<td>" +item.CCID + "</td>");
										 tableRow.append("<td>" + item.LOGIN_DATE + "</td>");
										 tableRow.append("<td >" + item.CITY_CLASS + "</td>");
										 tableRow.append("<td >" + item.CUST_TYPE + "</td>");
										 tableRow.append("<td>" + item.LAMOUNT + "</td>");
										 tableRow.append("<td >" + item.INCOME + "</td>");
										 tableRow.append("<td >" + item.BSCORE + "</td>");
										 tableRow.append("<td >" + item.APP_SCORE + "</td>");
										 tableRow.append("<td>" + item.OUTCOME + "</td>");
										 $('#scoring_table tbody').append(tableRow);
									   });
									}else{
										$.each(data, function(i, item) 
									    {
										 var tableRow = $('<tr onClick=showTree('+item.CustID+',"'+item.APP_SCORE+'",'+instid+');>');
										 tableRow.append("<td>" +item.CustID + "</td>");
										 tableRow.append("<td>" + item.A_Date + "</td>");
										 tableRow.append("<td >" + item.CITY_CLASS + "</td>");
										 tableRow.append("<td >" + item.CustName + "</td>");
										 tableRow.append("<td>" + item.LAMOUNT + "</td>");
										 tableRow.append("<td >" + item.INCOME + "</td>");
										 tableRow.append("<td >" + item.BSCORE + "</td>");
										 tableRow.append("<td >" + item.APP_SCORE + "</td>");
									 	 tableRow.append("<td>" + item.OUTCOME + "</td>");
									 	 $('#scoring_table tbody').append(tableRow);
										   });
									}
								}
								
							}).error(function(resp){
								$('body #Loader').hide(1500);
								alert('Data is not available.');
								$('body #mtd-box .CatError').text("Sorry...We are unable to generate report. Please try later..!!!").show();
							});
						}
						/**/
					})
					.style("fill-opacity",1e-6);


					rects.transition()
					.duration(function(d,i){
						return 50 * i;
					})
					.ease("linear")
					.attr("x", function(d) {
						return xScale(new Date(d.time));
					})
					.attr("y", function(d) {
						return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
					})
					.attr("height", function(d) {
						return -yScale(d.y) + (h - padding.top - padding.bottom);
					})
					//set width of bar
					.attr("width", 25)

					.style("fill-opacity",1);

					svg.append("g")
					.attr("class","xaxis")
					.attr("transform","translate(35," + (h - padding.bottom) + ")")
					.call(xAxis);
					
					svg.append("g")
					.attr("class","y axis")
					.attr("transform","translate(" + padding.left + "," + padding.top + ")")
					.call(yAxis);
			}
			
			 function sortResults(item) {
			        item = item.sort(function(a, b) {
			            return (b.time < a.time) ? 1 : (Date.parse(b.time) > Date.parse(a.time)) ? -1 : 0;
			        });
			    }

	//}]);

	
	/**sayali
	function to read remark and subject to in panel
	**/
	
	$(document.body).on("click","button[id^=remarkBtn]",function(){
		 $(document.body).find('#analyticsContainer').css("opacity","0.3");
		 $(document.body).find('#remarkData').slideDown();
		 
		 var appId = $(this).attr("id").substring(9);
		 for(var i = 0; i < $scope.stackTblData.length; i++){
			if($scope.stackTblData[i].applicationId == appId){
				$rootScope.croData = $scope.stackTblData[i].croJustificationList;
				$scope.$apply();
			}
		}
		 e.stopPropagation();//to stop calling function of parent div
	});
	
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
	$(document.body).on("click","#back",function(){
		$('#appForm1').hide();
		$('#mtd-box').show();
		$timeout(function(){
		$('#losStatusId1').val("");
		$scope.losStatus1 ="";
		$('#losId').val('');
		$('#losId').css("border","1px solid #cfcfcf");
	
		});
	});
	
  });
 }]);
}).call(this)