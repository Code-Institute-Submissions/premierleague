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

    // var positionDim = ndx.dimension(function (d) {
    //     return d["position"];
    // });

    var yAxis = d3.svg.axis()
        .scale(d3.scale.linear())
        .orient("left")
        .ticks(20);

    //DATE VALUES USED IN CHARTS
    var minYearBoundary = new Date(yearDim.bottom(1)[0]["year"]-1, 0,1);
    var maxYearBoundary = new Date(yearDim.top(1)[0]["year"]+1, 0,1);

    // var minPoints = manUnitedPointsByYear.bottom(1)[0]["points"];
    // var maxPoints = manUnitedPointsByYear.top(1)[0]["points"];

    // GROUPS
    var manUnitedPointsByYear = createGroup(yearDim, "MANCHESTER UNITED", "points");
    var manUnitedGoalsByYear = createGroup(yearDim, "MANCHESTER UNITED", "goals_for");
    var manUnitedGoalsConcByYear = createGroup(yearDim, "MANCHESTER UNITED", "goals_against");
    // var manUnitedTotalPos = createGroup(positionDim, "MANCHESTER UNITED", "position");
    var manUnitedGoalDifference = createGroup(yearDim, "MANCHESTER UNITED", "goal_difference");

    // CHARTS
    // var positionSelector = dc.pieChart("#positionSelector");
    var yearSelectorManUnited = dc.barChart("#yearSelectorManUnited");
    var goalsChartManUnited = dc.barChart("#goalsChartManUnited");
    var goalsConcChartManUnited = dc.barChart("#goalsConcChartManUnited");
    var goalDifferenceChartManUnited = dc.lineChart("#goalDifferenceChartManUnited");

    // positionSelector
    //     .dimension(positionDim)
    //     .group()
    //     .width(250)
    //     .height(250)
    //     .minAngleForLabel(2)
    //     .radius(90)
    //     .innerRadius(40);

    yearSelectorManUnited
        .dimension(yearDim)
        .group(manUnitedPointsByYear)
        .width(500)
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([50, 100]));

    goalsChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalsByYear)
        .width(500)
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([45, 100]));

    goalsConcChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalsConcByYear)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([15, 50]));

    goalDifferenceChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalDifference)
        .width(500)
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]));
        //.y(d3.scale.linear().domain([-25, 100]));

    dc.renderAll();
}