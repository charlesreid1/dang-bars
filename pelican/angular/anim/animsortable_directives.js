var ng;
dir = [];


//////////////////////////////////////
//
// Sortable Multi Bar Directives
//
// <sortable-multi-bar-head>
// <sortable-multi-bar-chart>
//
//////////////////////////////////////





//////////////////////////////////////
// Sortable Multi Bar Header 
//

ng = a.directive('sortableBarHead', function($compile) {

    function link(scope, element, attr) {

        var el = $("div#head");

        $(el).empty();

        var h1 = $("<h1 />")
            .appendTo(el);

        var b = $("<b />")
            .text("Sortable Multi Bar Chart")
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
// Sortable Multi Bar Controls
//


ng = a.directive('sortableBarControls', function($compile) {

    function link(scope, element, attr) {


        pscope = scope.$parent;

        var el = $("div#controls");



        pscope.countval_btn = "count";
        pscope.countval_current = "magnitude";



        var controlsdiv = $("<div />",{
            "id" : "controls",
            "class" : "btn-group"
        });

        var letter_b = $("<a />", {
            "class" : "btn btn-large btn-primary active",
            "id" : "sortbyletter",
            "sortbyletter" : ""
        })
        .html("Sort By Letter")
        .appendTo(controlsdiv);


        var firstfreq_b = $("<a />", {
            "class" : "btn btn-large btn-primary",
            "id" : "sortbyfirstfreq",
            "sortbyfirstfreq" : ""
        })
        .html("Sort By First Letter Frequency")
        .appendTo(controlsdiv);


        var freq_b = $("<a />", {
            "class" : "btn btn-large btn-primary",
            "id" : "sortbyfreq",
            "sortbyfreq" : ""
        })
        .html("Sort By Letter Frequency")
        .appendTo(controlsdiv);

        var br = $("<br />").appendTo(controlsdiv);

        angular.element(el).append($compile(controlsdiv)(pscope));

    };

    return {
        link: link,
        restrict: "E",
        scope: {}
    };

});
dir.push(ng);





//////////////////////////////////////
// Button Action Directives
//

ng = a.directive('sortbyletter', function($compile) {
    return function(pscope, element, attrs){
        element.bind("click", function(){

            $("a").removeClass('active');
            $("a#sortbyletter").addClass('active');

            pscope.myData = pscope.myData.sort(function(a,b) { 
                if(a.letter < b.letter) { return -1 }
                if(a.letter > b.letter) { return 1 }
                return 0
            });

            pscope.$apply();
            pscope.sortChart('letter');

        });
    };
});
dir.push(ng);

ng = a.directive('sortbyfirstfreq', function($compile) {
    return function(pscope, element, attrs){
        element.bind("click", function(){

            $("a").removeClass('active');
            $("a#sortbyfirstfreq").addClass('active');

            pscope.myData = pscope.myData.sort(function(a,b) { 
                if(a.firstletterfrequency < b.firstletterfrequency) { return 1 }
                if(a.firstletterfrequency > b.firstletterfrequency) { return -1 }
                return 0
            });

            pscope.$apply();
            pscope.sortChart('firstletterfrequency');

        });
    };
});
dir.push(ng);

ng = a.directive('sortbyfreq', function($compile) {
    return function(pscope, element, attrs){
        element.bind("click", function(){

            $("a").removeClass('active');
            $("a#sortbyfreq").addClass('active');

            pscope.myData = pscope.myData.sort(function(a,b) { 
                if(a.frequency < b.frequency) { return 1 }
                if(a.frequency > b.frequency) { return -1 }
                return 0
            });

            pscope.$apply();
            pscope.sortChart('frequency');

        });
    };
});
dir.push(ng);



//////////////////////////////////////
// Sortable Multi Bar Chart
//


ng = a.directive('sortableBarChart', function($compile) {

    function link(scope, element, attr) {

        pscope = scope.$parent;

        buildChart(element, pscope);

    };

    function buildChart(element,pscope) {

        console.log('in buildChart()');

        var el = $("div#chart");
        el.empty();


        ///////////////////////////////////
        // now draw the bar chart with d3 
        // 
        // data-independent stuff

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 800 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        
        var xAxis = d3.svg.axis()
            .orient("bottom");
        
        var yAxis = d3.svg.axis()
            .orient("left")
            .ticks(10, "%");


        // create the canvas
        //
        var svg = d3.select("div#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        pscope.updateChart = function() {

            svg.selectAll("rect").remove();
            svg.selectAll("g#xaxis").remove();
            svg.selectAll("g#yaxis").remove();

            data = pscope.myData;

            //console.log(d3.range(data.length));

            var x = d3.scale.ordinal()
                .domain(data.map(function(d) { return d.letter; }))
                .rangeRoundBands([0, width], .1);
            
            var y = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.frequency; })])
                .range([height, 0]);
            
            xAxis.scale(x);
            yAxis.scale(y);


            // all bars
            // 
            var bar = svg.selectAll(".bar")
                .data(data)
                .enter()
                //.append("g")
            
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
            // 
            bar.append("rect")
                .attr("class", "firstletterfrequency")
                .attr("width", x.rangeBand() / 2)
                .attr("y", function(d) { return y(d.firstletterfrequency); })
                .attr("height", function(d) { return height - y(d.firstletterfrequency); })
                .attr("fill", function(d){ return color(0) })
                .attr("opacity",0.90)
                .attr("transform",function(d,i) { 
                    return "translate(" + x(d.letter) + ",0)";
                })


            // total occurence frequency bar chart
            // 
            bar.append("rect")
                .attr("class", "frequency")
                .attr("x", x.rangeBand() / 2)
                .attr("width", x.rangeBand() / 2)
                .attr("y", function(d) { return y(d.frequency); })
                .attr("height", function(d) { return height - y(d.frequency); })
                .attr("fill",function(d){ return color(3) })
                .attr("opacity",0.90)
                .attr("transform",function(d,i) { 
                    return "translate(" + x(d.letter) + ",0)";
                })


            // x axis
            // 
            svg.append("g")
                .attr("class", "x axis")
                .attr("id","xaxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            
            // y axis
            // 
            svg.append("g")
                .attr("class", "y axis")
                .attr("id","yaxis")
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



            // define sortchart here, because this scope has 
            // lots of convenient variables available.
            //
            // plus its kind of one level up the chain from update chart,
            // which is one level up the chain from build chart
            //
            // this is called by action directives,
            // which are bound to the buttons that the user clicks
            // to sort data by different dimensions.
            //
            // The action directives call sortChart, which sorts 
            // each of the bars according to the user-specified 
            // sort key.

            pscope.sortChart = function(sortkey) {

                console.log('sorting chart...');

                sortf = function(a,b) { 
                    sortkey = 'frequency';
                    if( a[sortkey] < b[sortkey] ) { return 1 }
                    if( a[sortkey] > b[sortkey] ) { return -1 }
                    return 0
                };





                //// print the letters and their freq values 
                //// in normal/original/alphabetic order 
                //svg.selectAll("rect").each(function(d){console.log(d.letter + " : " + d.firstletterfrequency)});


                //// print the ltters and their freq values
                //// in order sorted by freq values
                //svg.selectAll("rect")
                //    .sort(sortf)
                //    .each(function(d){console.log(d.letter + " : " + d.frequency)});




                // first, we need to sort our data.
                // then, we need to update the x scale domain (range stays same)
                // then, we need to update our xAxis.scale with the new x scale


                svg.selectAll("rect").sort(sortf);

                x.domain = svg.selectAll("rect")
                              .each(function(d){ return d.letter } );

                xAxis.scale(x);


                // Now we can draw the new rectangles,
                // and animate their transition.
                svg.selectAll("rect")
                    .transition()
                    .duration(1000)
                    //.attr("x", function(d,i) {
                    //    // this uses the new x domain
                    //    return x(d.letter);
                    //});


                // worry about text label updates later.



            }

        }

        pscope.updateChart();



    };

    return {
        link: link,
        restrict: "E",
        scope: {}
    };

});
dir.push(ng);



