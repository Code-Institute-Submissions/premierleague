queue()
    .defer(d3.json, "/premierleague/data")
    .await(makeGraphs);

function makeGraphs(error, premierleagueData) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    var ndx = crossfilter(premierleagueData);

    var yearDim = ndx.dimension(function (d) {
        return new Date(d["year"], 0, 1);
    });

    var yAxis = d3.svg.axis()
        .scale(d3.scale.linear())
        .orient("left")
        .ticks(20);

    //DATE VALUES USED IN CHARTS

    var minYearBoundary = new Date(yearDim.bottom(1)[0]["year"]-1, 0,1);
    var maxYearBoundary = new Date(yearDim.top(1)[0]["year"]+1, 0,1);


    // GROUPS
    var spursPointsByYear = createGroup(yearDim, "TOTTENHAM HOTSPUR", "points");
    var spursGoalsByYear = createGroup(yearDim, "TOTTENHAM HOTSPUR", "goals_for");
    var spursGoalsConcByYear = createGroup(yearDim, "TOTTENHAM HOTSPUR", "goals_against");
    var spursGoalDifference = createGroup(yearDim, "TOTTENHAM HOTSPUR", "goal_difference");

    // CHARTS
    var yearSelectorSpurs = dc.barChart("#yearSelectorSpurs");
    var goalsChartSpurs = dc.barChart("#goalsChartSpurs");
    var goalsConcChartSpurs = dc.barChart("#goalsConcChartSpurs");
    var goalDifferenceChartSpurs = dc.barChart("#goalDifferenceChartSpurs");


    // CHART PROPERTIES
    yearSelectorSpurs
        .dimension(yearDim)
        .group(spursPointsByYear)
        .width(500)
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([40, 90]));

    goalsChartSpurs
        .dimension(yearDim)
        .group(spursGoalsByYear)
        .width(500)
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([30, 90]));

    goalsConcChartSpurs
        .dimension(yearDim)
        .group(spursGoalsConcByYear)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 70]));

    goalDifferenceChartSpurs
        .dimension(yearDim)
        .group(spursGoalDifference)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([-20, 70]));

    dc.renderAll();

    $("#goalDifferenceChartSpurs .axis.x").attr("transform", "translate(30, 173)");
}