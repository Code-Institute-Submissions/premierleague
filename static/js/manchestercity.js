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
    var manCityPointsByYear = createGroup(yearDim, "MANCHESTER CITY", "points");
    var manCityGoalsByYear = createGroup(yearDim, "MANCHESTER CITY", "goals_for");
    var manCityGoalsConcByYear = createGroup(yearDim, "MANCHESTER CITY", "goals_against");
    var manCityGoalDifference = createGroup(yearDim, "MANCHESTER CITY", "goal_difference");

    // CHARTS
    var yearSelectorManCity = dc.barChart("#yearSelectorManCity");
    var goalsChartManCity = dc.barChart("#goalsChartManCity");
    var goalsConcChartManCity = dc.barChart("#goalsConcChartManCity");
    var goalDifferenceChartManCity = dc.lineChart("#goalDifferenceChartManCity");

    // CHART PROPERTIES

    yearSelectorManCity
        .dimension(yearDim)
        .group(manCityPointsByYear)
        .width(500)
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([30, 100]));

    goalsChartManCity
        .dimension(yearDim)
        .group(manCityGoalsByYear)
        .width(500)
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([20, 110]));

    goalsConcChartManCity
        .dimension(yearDim)
        .group(manCityGoalsConcByYear)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([15, 70]));

    goalDifferenceChartManCity
        .dimension(yearDim)
        .group(manCityGoalDifference)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([-30, 80]));

    dc.renderAll();

    $("#goalDifferenceChartManCity .axis.x").attr("transform", "translate(30, 162.5)");

}