var ng;
dir = [];


//////////////////////////////////////
//
// Multi Bar Directives
//
// <multi-bar-head>
// <multi-bar-chart>
//
//////////////////////////////////////





//////////////////////////////////////
// Multi Bar Header 
//

ng = a.directive('multiBarHead', function($compile) {

    function link(scope, element, attr) {

        var el = $("div#head");

        $(el).empty();

        var h1 = $("<h1 />")
            .appendTo(el);

        var b = $("<b />")
            .text("Multi Bar Chart")
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
// Multi Bar Chart
//


ng = a.directive('multiBarChart', function($compile) {

    function link(scope, element, attr) {

        scope.$parent.$watch('myData',doStuff);

        function doStuff() { 
            if(!scope.$parent.myData) { return }
            updateChart(element, scope.$parent.myData);
        }

    };

    function updateChart(element,data) { 


        var el = element[0];


        ///////////////////////////////////
        // now draw the bar chart with d3 
        // 

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 800 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        
        var x = d3.scale.ordinal()
            .domain(d3.range(data.length))
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


        // create the canvas
        //
        var svg = d3.select(el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
        


        // all bars

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
            .attr("class","bar")
            .attr("transform",function(d,i) { 
                return "translate(" + x(d.letter) + ",0)";
            })

        //var color = d3.scale.category20b();
        //var color = d3.scale.category20c();
        range10 = Array.apply(null, Array(10)).map(function (_, i) {return i;});
        var color = d3.scale.category10()
                    .domain(range10);

        // width of each x quantity = x.rangeBand()
        // width of bands = x.rangeBand()/2
        // x location of bands = 0 (default) for firstletterfrequency)
        // x location of bands = x.rangeBand/2 for frequency (starts halfway thru)



        // first letter frequency bar chart

        bar.append("rect")
            .attr("class", "firstletterfrequency")
            //.attr("x", x.rangeBand() / 2)
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) { return y(d.firstletterfrequency); })
            .attr("height", function(d) { return height - y(d.firstletterfrequency); })
            .attr("fill", function(d){ return color(3) })
            .attr("opacity",0.90);


        // total occurence frequency bar chart

        bar.append("rect")
            .attr("class", "frequency")
            .attr("x", x.rangeBand() / 2)
            //.attr("x", function(d) { return x(d.letter); })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) { return y(d.frequency); })
            .attr("height", function(d) { return height - y(d.frequency); })
            .attr("fill",function(d){ return color(4) })
            .attr("opacity",0.90);


        // x axis

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        
        // y axis

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("y", -8)
            .attr("dy", "0.0em")
            .style("text-anchor", "middle")
            .text("Frequency");
        

        function type(d) {
            d.frequency = +d.frequency;
            return d;
        }


    };

    return {
        link: link,
        restrict: "E",
        scope: {}
    };

});
dir.push(ng);


