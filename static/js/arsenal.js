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
    var arsenalPointsByYear = createGroup(yearDim, "ARSENAL", "points");
    var arsenalGoalsByYear = createGroup(yearDim, "ARSENAL", "goals_for");
    var arsenalGoalsConcByYear = createGroup(yearDim, "ARSENAL", "goals_against");
    var arsenalGoalDifference = createGroup(yearDim, "ARSENAL", "goal_difference");

    // CHARTS
    var yearSelectorArsenal = dc.barChart("#yearSelectorArsenal");
    var goalsChartArsenal = dc.barChart("#goalsChartArsenal");
    var goalsConcChartArsenal = dc.barChart("#goalsConcChartArsenal");
    var goalDifferenceChartArsenal = dc.lineChart("#goalDifferenceChartArsenal");


    // CHART PROPERTIES
    yearSelectorArsenal
        .dimension(yearDim)
        .group(arsenalPointsByYear)
        .width(500)
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([40, 95]));

    goalsChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalsByYear)
        .width(500)
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([50, 90]));

    goalsConcChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalsConcByYear)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 55]));

    goalDifferenceChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalDifference)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([10, 60]));

    dc.renderAll();

}