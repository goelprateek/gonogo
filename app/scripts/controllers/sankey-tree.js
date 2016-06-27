;(function(){

	'use strict';

	angular.module('gonogo').controller("sankeyTreeController" , function($http,$rootScope,BASE_URL_SCOR,BASE_URL_GNG) {


	$(document).ready(function() {
		var graph={};
		var data=null;
		$('body #Loader').show();
		$.ajax({
			method: "POST",
			url: BASE_URL_SCOR+"PortfolioGraphData",
			type:"application/json"
		})
		.done(function(resp) {
//			console.log("Getting data from portfolio"+JSON.stringify(resp));
			var data = resp.Data;
			var  sankeyInput={};
			var nodes = [];
			var links =[];
			var rootAvg;
			var rootSum=0;
			var rootCount=0;
			$.each( data, function( key, obj ) {
				var  nodeObj ={};
				var linkObj = {};

				var target = obj.target;
				var source = obj.source;
				var count_score = obj.count_score;
				var avg_score=obj.avg_score;
				
				nodeObj.name=target;
				nodeObj.count=count_score;
				nodeObj.avg_score=avg_score;
				nodeObj.level=obj.level;

				linkObj.source=obj.source;
				linkObj.target=obj.target;
				linkObj.count_score=obj.count_score;
				linkObj.value=obj.count_score;

				nodes[key]=nodeObj;
				links[key]=linkObj;
				
				if(obj.source=='Application Score'){
					rootSum= rootSum + obj.avg_score;
					rootCount++;
				}
			});


			var  nodeObj ={};
			nodeObj.name="Application Score";
			nodeObj.count=0;
			nodeObj.avg_score=rootSum;
			nodes.splice(0, 0, nodeObj);

			graph.links=links;
			graph.nodes=nodes;
//			console.log("Graph data from portfolio="+JSON.stringify(graph));
			plotPortfolioGraph();
			//sankeyWithCircle();
			$('body #Loader, body #portfolio_container .CatError').hide(2000);
		}).error(function(resp){
			$('body #Loader').hide(2000);
			$('body #portfolio_container .CatError').text("Sorry we are unable to genrate your reports. Please try later..!!!");
		});



	function plotPortfolioGraph(){	
		var units = "Score";

		var margin = {top: 10, right: 10, bottom: 100, left: 10},
		width = 1000 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;

		var formatNumber = d3.format(",.0f"),    // zero decimal places
		format = function(d) { return formatNumber(d) + " " + units; },
		color = d3.scale.category20();

		// append the svg canvas to the page
		var svg = d3.select("#chart").append("svg")
		.attr("width", "100%")
		.attr("height", 600)
		.append("g")
		.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");

		// Set the sankey diagram properties
		var sankey = d3.sankey()
		.nodeWidth(35)
		.nodePadding(12)
		.size([width, height]);
//		$('#loading_spinner').hide();
		var path = sankey.link();

		// load the data
		//d3.json("scoringSankey.json", function(error, graph) {

		var nodeMap = {};
//		console.log("Graph data="+JSON.stringify(graph));
		graph.nodes.forEach(function(x) {nodeMap[x.name] = x; nodeMap[x.exp] = x;});
		graph.links = graph.links.map(function(x) {return {source: nodeMap[x.source], target: nodeMap[x.target], value: x.value }; });

		sankey
		.nodes(graph.nodes)
		.links(graph.links)
		.layout(32);

		// add in the links
		var link = svg.append("g").selectAll(".link")
		.data(graph.links)
		.enter().append("path")
		.attr("class", "link")
		.attr("d", path)
		.style("stroke-width", function(d) { return Math.max(1, d.dy); })
		.sort(function(a, b) { return b.dy - a.dy; });

		// add the link titles
		link.append("title")
		.text(function(d) {
			return d.source.name + " → " + 
			d.target.name + "\n" + d.value + " times hit"; });

		// add in the nodes
		var node = svg.append("g").selectAll(".node")
		.data(graph.nodes)
		.enter().append("g")
		.attr("class", "node")
		.attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")"; })
			.on("click",function(d){
				if (d3.event.defaultPrevented) return; // click suppressed
				//alert(d.exp);
				//nodeClick(d.name);
				console.log("clicked"+d.level);
				if(d.level=="Field"){
					//prepareDataOfScoreCount(d.name);
					nodeClick(d.name);
					console.log("call sent");
				}
				

			})
			.call(d3.behavior.drag()
					.origin(function(d) { return d; })
					.on("dragstart", function() { 
						this.parentNode.appendChild(this); })
						.on("drag", dragmove));

		// add the rectangles for the nodes
		node.append("rect")
		.attr("height", function(d) { return d.dy; })
		.attr("width", sankey.nodeWidth())
		.style("fill", function(d) { 
			return d.color = color(d.name.replace(/ .*/, "")); })
			.style("stroke", function(d) { 
				return d3.rgb(d.color).darker(2); })
				.append("title")
				.on("click",nodeClick)
				.text(function(d) { 
					if(d.name!='Application Score'){return d.name + "\n" + format(d.avg_score) + "\n"+d.count+"  times hit"; }else{return d.name + "\n" + format(d.avg_score)}});



		// add in the title for the nodes
		node.append("text")
		.attr("x", -6)
		.attr("y", function(d) { return d.dy / 2; })
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.attr("transform", null)
		.text(function(d) { return d.name; })
		.filter(function(d) { return d.x < width / 2; })
		.attr("x", 6 + sankey.nodeWidth())
		.attr("text-anchor", "start");
		
		node.append("text")
	    .attr("class","nodeValue")
	    .text(function(d) { return d.name + "\n" + format(d.value); });
		
		///align vertically???
		  node.selectAll("text.nodeValue")
			  .attr("x", sankey.nodeWidth() / 2)
			  .attr("y", function (d) { return (d.dy / 2) })
			  .text(function (d) { return formatNumber(d.avg_score); })
			  .attr("text-anchor", "middle");
			  //.attr("transform", "rotate(-90)");

		  node.append("text")
		  	  .attr("class","nodeLabel");

		  node.selectAll("text.nodeLabel")	
		      .attr("x", -6)
		      .attr("y", function(d) { return d.dy / 2; })
		      .attr("dy", ".35em")
		      .attr("text-anchor", "end")
		      .attr("transform", null)
		      .text(function(d) { return d.name; })
		    .filter(function(d) { return d.x < width / 2; })
		      .attr("x", 6 + sankey.nodeWidth())
		      .attr("text-anchor", "start");

		
		//the function for moving the nodes
		function dragmove(d) {
			d3.select(this).attr("transform", 
					"translate(" + (
							d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
					) + "," + (
							d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
					) + ")");
			sankey.relayout();
			link.attr("d", path);
		}
		//});
	}

	function nodeClick(node) {
		$('body #Loader').show();
		var dataset = '{"nodekey":'+node+'}';
		console.log("node click"+node);
		$('#rgraphImage').attr("src","");
		$.ajax({
				method: "GET",
				url: BASE_URL_SCOR+"RGraph",
				data:{"nodekey":node},
				contentType: 'application/json; charset=utf-8',
		})
		.done(function(resp) {
			console.log(JSON.stringify(resp));
			$('body #Loader,body #portfolio_container .CatError').hide(1000);
			$('#myModalnew').modal('show');
			$('#rgraphImage').attr("src",resp.IMG_BYTE_CODE);
		}).error(function(resp){
			$('body #Loader').hide(2000);
			$('body #portfolio_container .CatError').text("Sorry we are unable to genrate your reports. Please try later..!!!");
		});
	}




	function expressionNodeAggregation(demo){
		console.log(demo.length);
		var src,tgt,count=0,di=true, obj=0,val;
		for(var i=0;i<demo.length;i++)
		{

			var temp=demo[i], a=demo[i].target,expcount=demo[i].exp_count;
			val=demo[i].value;
			count=0;
			di=true;
			for(var j=i+1;j<demo.length;j++)
			{

				var b = demo[j].target, x=demo[j];
				if (a == b) 
				{

					src=x.source;
					val=val+x.value;
					expcount=expcount+x.exp_count;
					tgt=x.target;
					expression_temp=demo[i].expression;//why..
					obj=({
						'source' : src,
						'value' : val,
						'target' : tgt,
						'exp_count' : expcount
					});

					demo[j].source=b;
					demo[i].source=b;

					if (di == true) {
						demo[i].target=tgt+"_exp" + (++count);
						demo[j].target=tgt+"_exp" + (++count);
						di=false;
					}
					else{
						demo[j].target=tgt+"_exp" + (++count);

					}
				}

			}
			if(obj!=0){
				demo.push(obj);
				console.log(obj);
				obj=0;}			 
		}
		console.log(demo);
		return demo;
	}

});
	
});	

}).call(this)