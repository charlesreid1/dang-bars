var ng;
dir = [];


//////////////////////////////////////
//
// Double Bar Directives
//
// <double-bar-head>
// <double-bar-chart>
//
//////////////////////////////////////





//////////////////////////////////////
// Double Bar Header 
//

ng = a.directive('doubleBarHead', function($compile) {

    function link(scope, element, attr) {

        var el = $("div#head");

        $(el).empty();

        var h1 = $("<h1 />")
            .appendTo(el);

        var b = $("<b />")
            .text("Double Bar Chart")
            .appendTo(h1);

    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});
dir.push(ng);




//////////////////////////////////////
// Double Bar Chart
//


nfirstg = a.directive('doubleBarChart', function($compile) {

    function link(scope, element, attr) {

        var sort = attr['sort'];

        scope.$parent.$watch('myData',doStuff);

        function doStuff() { 
            if(!scope.$parent.myData) { return }

            var data;

            if(sort=="alpha"){

                data = scope.$parent.myData;

                data.sort(function(a,b) { 
                    if(a.letter < b.letter) { return -1 }
                    if(a.letter > b.letter) { return 1 }
                    return 0
                });

            } else if(sort=="frequency"){

                data = scope.$parent.myData;

                data.sort(function(a,b) { 
                    if(a.frequency < b.frequency) { return 1 }
                    if(a.frequency > b.frequency) { return -1 }
                    return 0

                });

            }

            updateChart(element, data, scope.$parent);
        }

    };

    function updateChart(element,data, pscope) { 

        var el = element[0];


        ///////////////////////////////////
        // now draw the bar chart with d3 
        // 

        var margin = {top: 20, right: 40, bottom: 30, left: 40},
            width = 600 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;
        
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);
        
        var y = d3.scale.linear()
            .range([height, 0]);
        
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");
        
        var svg = d3.select(el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", -8)
            .attr("dy", "0.0em")
            .style("text-anchor", "middle")
            .text("Frequency");

        var color = d3.scale.category20b();
        //var color = d3.scale.linear()
        //        .domain([0, 0.15])
        //        .range(["red", "blue"]);
        
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.frequency); })
            .attr("height", function(d) { return height - y(d.frequency); })
            .style("fill",function(d,i) {
                return color(d.letter);
            })
            .on('mouseover', function(d){
                pscope.$apply(function(){
                    pscope.selectedPoint = d;
                });
                d3.selectAll('rect').classed('active',function(e){
                    var dlet = d['letter'];
                    var elet = e['letter'];
                    return dlet==elet;
                });

            })
            .on('mouseout', function(){
                d3.selectAll('g.bar').classed('active',false);
            })
        

        function type(d) {
          d.frequency = +d.frequency;
          return d;
        }










        /*

        // ---------------
        // the chart itself:

        var margin = {
            top:    10, 
            right:  40, 
            bottom: 10, 
            left:   40
        };
        
        var width   = 400 - margin.right - margin.left,
            height  = 400 - margin.top   - margin.bottom;
        
        var radius = Math.min(width, height) / 2;
        
        var x = d3.scale.linear()
            .range([0, 2 * Math.PI]);
        
        var y = d3.scale.sqrt()
            .range([0, radius]);
        
        var svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");


        // ---------------
        // chart-specific, 
        // data-independent variables:


        // default sort method: count
        var partition = d3.layout.partition()
            .sort(null)
            .value(function(d) { 
                return d.total; 
            });

        var arc = d3.svg.arc()
            .startAngle( function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
            .endAngle(   function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
            .innerRadius(function(d) { return Math.max(0, y(d.y)); })
            .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

        // Tween from zero 
        function arcTweenZero(a, i) {
            var oi = d3.interpolate({x: 0, dx: 0}, a);
            function tween(t) {
                var b = oi(t);
                a.x0  = 0;//b.x;
                a.dx0 = 0;//b.dx;
                return arc(b);
            }
            if (i == 0) {
                // If we are on the first arc, adjust the x domain to match the root node
                // at the current zoom level. (We only need to do this once.)
                var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
                return function(t) {
                    x.domain(xd(t));
                    return tween(t);
                };
            } else {
                return tween;
            }
        }


        //////////////////////////////////////////
        // On with the show:
        // just draw the damn thing.

        // Keep track of the node that is currently being displayed as the root.
        var node;

        svg.selectAll("path").remove();

        node = data;

        var N = 26;
        var color = d3.scale.ordinal()
            .domain([0, N-1])
            .range(d3.range(data.length).map(
                    d3.scale.linear()
                    .domain([0, data.length - 1])
                    .range(["steelblue","pink"])
                    .interpolate(d3.interpolateLab))
            );
        var color = d3.scale.category20c();

        // this is where the magic happens
        var g = svg
            .datum(data)
            .selectAll("g")
            .data(partition.nodes(node))
            .enter().append("g");

        var path = g.append("path")
            .attr("d",arc)
            .style("fill",function(d,i) {
                if(d.letter=='root') {
                    return '#ccc';
                } else {
                    return color((d.children ? d : d.parent).letter); 
                }
            });

        var text = g.append("text")
            .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
            .attr("x", function(d) { return y(d.y); })
            .attr("dx", "6") // margin
            .attr("dy", ".35em") // vertical-align
            .text(function(d) { 
                if(d.letter!='root') {
                    if(d.children) {
                        return d.letter;
                    }
                }
            });

        function computeTextRotation(d) {
            return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        }


        */
    };

    return {
        link: link,
        restrict: "E",
        scope: {}
    };

});
dir.push(ng);



