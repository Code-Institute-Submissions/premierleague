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
    var chelseaPointsByYear = createGroup(yearDim, "CHELSEA", "points");
    var chelseaGoalsByYear = createGroup(yearDim, "CHELSEA", "goals_for");
    var chelseaGoalsConcByYear = createGroup(yearDim, "CHELSEA", "goals_against");
    var chelseaGoalDifference = createGroup(yearDim, "CHELSEA", "goal_difference");

    // CHARTS
    var yearSelectorChelsea = dc.barChart("#yearSelectorChelsea");
    var goalsChartChelsea = dc.barChart("#goalsChartChelsea");
    var goalsConcChartChelsea = dc.barChart("#goalsConcChartChelsea");
    var goalDifferenceChartChelsea = dc.lineChart("#goalDifferenceChartChelsea");


    // CHART PROPERTIES
    yearSelectorChelsea
        .dimension(yearDim)
        .group(chelseaPointsByYear)
        .width(500)
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([45, 100]));

    goalsChartChelsea
        .dimension(yearDim)
        .group(chelseaGoalsByYear)
        .width(500)
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([40, 110]));

    goalsConcChartChelsea
        .dimension(yearDim)
        .group(chelseaGoalsConcByYear)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([10, 60]));

    goalDifferenceChartChelsea
        .dimension(yearDim)
        .group(chelseaGoalDifference)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([0, 80]));

    dc.renderAll();

}