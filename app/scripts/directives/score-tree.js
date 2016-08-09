;(function(){
    
    'use strict';
    
    
    var app = angular.module('score-directives',["d3"]);
    app.directive('gngScoreTree',['d3',function(d3){
        console.log("score directive called");
        return {
            restrict:"EA",
            scope: {
                  data: "=scoreData",
            },
            replace:true,
            priority:10, 
            terminal:false,
            link : function(scope,element,attribute, controller){
                var treeData = [];
                var zm;
                var nodes;
                var links;
                generate_scoreJson(scope.data);
                function generate_scoreJson(temp){
            var colors = ['#689f38','#EF3D16','#fb8c00','#8BC34A','#2196F3','#9C27B0','#bdbdbd','#009688','#ffc107','#689f38'];
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
                            var exp = field["FieldName"]; //fieldname
                            var dscore = field["value"]; //
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

            var margin = {top: 120,right: 150,bottom: 80,left: 100},
            width = 900,
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

            zm.translate([width / 2, 20]); 
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
            function update(source) {
                var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

                nodes.forEach(function(d) {
                    d.y = d.depth * 120;
                });

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
                if ((height > 100) && (levelWidth.length > depth)) {
                    height = height + 160;
                    depth = levelWidth.length;
                } else if (height < 100) {
                    height = 170;
                }

                $("#scoreTree").css("height", height);
                d3.select("svg").attr("height", height);


                var node = svg.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

                var SVGmouseTip = d3.select("g.tooltip.mouse");
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
                    .translate(+this.getAttribute("cx"), +this.getAttribute("cy")); 

                    d3.select("#tooltip") 
                    .style("left", Math.max(0, d3.event.pageX - 350) + "px")
                    .style("top", (d3.event.pageY - 184) + "px");

                    $('#node_expression').text(d.exp);
                    $('#node_details').text("Value : "+ d.dscore);
                    d3.select("#tooltip").classed("hidden", false); 

                })
                .on('mousemove', function(d) {
                    d3.select("#tooltip").style("left", Math.max(0, d3.event.pageX - 20) + "px") 
                                                                                        
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

                nodeEnter.append("text") 
                .style("fill", "white")  
                                         
                .attr("dy", ".20em")   
                .attr("text-anchor", "middle") 
                .text(function(d) {
                    return d.score;
                });        

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
                    return d._children ? "lightsteelblue" : d.color;
                });


                nodeUpdate.select("text").style("fill-opacity", 1);


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

                var link = svg.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

                link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", diagonal);

                link.transition()
                .duration(duration)
                .attr("d", diagonal);

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

                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            function click(d){              
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);            
            }

            function redraw(){
                svg.attr("transform", "translate(" + d3.event.translate + ")");
            }
        }

          
         }
      }
 }]);
    
}).call(this)

      