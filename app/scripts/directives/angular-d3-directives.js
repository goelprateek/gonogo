;(function(){
	
	'use strict';
	
	
	var app = angular.module('gonogo-directives',["d3"]);
	app.directive('gngStackedBarGraph',['d3','RestService','UserService',function(d3,RestService,UserService){
		console.log("gngStackedBarGraph bar graph");
		return {
			restrict:"EA",
			scope: {
		          data: "=graphData",
		          ngModel: '=',
		          institutionId: '@',
		          dataSourceCol :'=',
		          isolatedTableData:'&',
		          onClick: "&"
		    },
		    replace:true,
		    priority:10, 
		    terminal:false,
		    link : function(scope,element,attribute, controller){
		    	var user=UserService.getCurrentUser();
		    	var element = element[0],
		    		width = 1000,
		    		height = 300,
		    		padding = {top: 0, right: 10, bottom: 70, left:0},
		    		svg = d3.select(element).append("svg").attr("width", width)
		    			.attr("height",height)
		    			.attr("viewBox","0 0 900 250")
		    	
		    	var parseDate = d3.time.format("%m/%Y").parse;

		    	scope.$watch(function(){
		              return angular.element(window)[0].innerWidth;
		            }, function(){
		              return scope.render(scope.data);
		            }
		         );
		    	
		    	// watch for data changes and re-render
		          scope.$watch('data', function(newVals, oldVals) {
		            return scope.render(newVals);
		          }, true);
		          
		          function sortResults(item) {
		        	  
				       item = item.sort(function(a, b) {
				    	   return (b.time < a.time) ? 1 : (Date.parse(b.time) > Date.parse(a.time)) ? -1 : 0;
				        });
				   }
		          
		    	// define render function
		          scope.render = function(data){
		        	  
		        	  if(!data) return ;
		        	  
		        	  
		        	  // remove all previous items 	before rendering 
		        	  svg.selectAll("*").remove();
		        	  
		        	  var color_hash = {
								2 : ["APPROVED","#4CAF50"],
								1 : ["DECLINED","#F44336"],
								0 : ["QUEUE","#CCC"], 
							};
		        	  
		        	  
		        	  
					  sortResults(data);
					  
					  var currentData = data[0],
					  dateArray = [],
					  total= 0,
					  i,k,t;
					
					  var stack = d3.layout.stack();
					  stack(data);
					  
		        	  var dataset = data;
		        	  
		        	  var xScale = d3.time.scale()
						.domain([new Date(new Date(dataset[0][0].time).getTime()-(1000*60*60*24)),
						         d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),0,function(d){
						        	 return d.x;
						         })])
						.rangeRound([0, width - padding.left - padding.right ]);
						
						var yScale = d3.scale.linear()
						.domain([0,d3.max(dataset, function(d) {
						        	 return d3.max(d, function(d) {
						        		 return d.y0 + d.y;
						        	 });
						         })
						         ])
						         .range([height - padding.bottom , 0]);

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
						
						var colors = d3.scale.category10();
						
						var groups = svg.selectAll("g")
						.data(dataset)
						.enter()
						.append("g")
						.attr("class","rgroups")
						.attr("transform","translate("+ padding.left + "," + (height - padding.bottom) +")")
						.style("fill", function(d, i) {
							return color_hash[dataset.indexOf(d)][1];
						});
					
						//for mouse move we require that div
						var div = d3.select("#mainTable").append("div")   
						.attr("class", "tooltip")               
						.style("opacity", 0);
						
						
						var mainGroup = svg.selectAll("g")
						.data(dataset)
						.attr("value",function(dataset,i){
						});
						
						var rects = mainGroup.selectAll("g")
						.data(function(d) {
							return d; 
						})
						.enter()
						.append("g").attr("class","Stack")
						.append("rect")
						.attr("width", 2)
						.on("mousemove", function(d) {
							div.transition()        
							.duration(100)      
							.style("opacity", .9);     
							div.html(d.y)  
							.style("left", (d3.event.pageX-90) + "px")     
							.style("top", (d3.event.pageY -230) + "px"); 
						})      
						.on("mouseout", function(d) {       
							div.transition()        
							.duration(200)      
							.style("opacity", 0); 
						})
						.on("click", function(d){
							if(user.role!="DSA"){
								var json={"dtDate":d.time,"sStat":d.status,'sInstID':user.institutionID};//
								RestService.saveToServer("table-view",json).then(function(tableData){
									scope.isolatedTableData({parameter:tableData});
								});
							}
						})
						.style("fill-opacity",1e-6)
						.transition()
						.duration(function(d,i){
							return 50 * i;
						})
						.ease("linear")
						.attr("x", function(d) {
							return xScale(new Date(d.time));
						})
						.attr("y", function(d) {
							return -(- yScale(d.y0) - yScale(d.y) + (height - padding.top - padding.bottom)*2);
						})
						.attr("height", function(d) {
							return -yScale(d.y) + (height - padding.top - padding.bottom);
						})
						
						//set width of bar
						.attr("width", 25)
						.style("fill-opacity",1);
						
						
						svg.append("g")
						.attr("class","xaxis")
						.attr("transform","translate(20," + (height - padding.bottom) + ")")
						.call(xAxis);
						
						/*svg.append("g")
						.attr("class","y axis")
						.attr("transform","translate(" + padding.left + "," + padding.top + ")")
						.call(yAxis);*/
						
		        	  
		          }
		    }
	       
		} 
		
	}]);
	
}).call(this)
