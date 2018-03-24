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
    var liverpoolPointsByYear = createGroup(yearDim, "LIVERPOOL", "points");
    var liverpoolGoalsByYear = createGroup(yearDim, "LIVERPOOL", "goals_for");
    var liverpoolGoalsConcByYear = createGroup(yearDim, "LIVERPOOL", "goals_against");
    var liverpoolGoalDifference = createGroup(yearDim, "LIVERPOOL", "goal_difference");

    // CHARTS
    var yearSelectorLiverpool = dc.barChart("#yearSelectorLiverpool");
    var goalsChartLiverpool = dc.barChart("#goalsChartLiverpool");
    var goalsConcChartLiverpool = dc.barChart("#goalsConcChartLiverpool");
    var goalDifferenceChartLiverpool = dc.barChart("#goalDifferenceChartLiverpool");


    // CHART PROPERTIES
    yearSelectorLiverpool
        .dimension(yearDim)
        .group(liverpoolPointsByYear)
        .width(500)
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([45, 90]));

    goalsChartLiverpool
        .dimension(yearDim)
        .group(liverpoolGoalsByYear)
        .width(500)
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([40, 110]));

    goalsConcChartLiverpool
        .dimension(yearDim)
        .group(liverpoolGoalsConcByYear)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 55]));

    goalDifferenceChartLiverpool
        .dimension(yearDim)
        .group(liverpoolGoalDifference)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([0, 55]));

    dc.renderAll();

}