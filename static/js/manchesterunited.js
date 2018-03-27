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

    var positionDimManUnited = ndx.dimension(function (d) {
        if (d["team"] == "MANCHESTER UNITED") {
            return d["position"];
        } else {
            return false
        }
    });

    var positionGroupManUnited = positionDimManUnited.group().reduceCount();

    var yAxis = d3.svg.axis()
        .scale(d3.scale.linear())
        .orient("left")
        .ticks(20);

    //DATE VALUES USED IN CHARTS
    var minYear = new Date(yearDim.bottom(1)[0]["year"], 0,1);
    var maxYear = new Date(yearDim.top(1)[0]["year"], 0,1);
    var minYearBoundary = new Date(yearDim.bottom(1)[0]["year"]-1, 0,1);
    var maxYearBoundary = new Date(yearDim.top(1)[0]["year"]+1, 0,1);

    // GROUPS
    var manUnitedPointsByYear = createGroup(yearDim, "MANCHESTER UNITED", "points");
    var manUnitedGoalsByYear = createGroup(yearDim, "MANCHESTER UNITED", "goals_for");
    var manUnitedGoalsConcByYear = createGroup(yearDim, "MANCHESTER UNITED", "goals_against");
    var manUnitedGoalDifference = createGroup(yearDim, "MANCHESTER UNITED", "goal_difference");
    var manUnitedWins = createGroup(yearDim, "MANCHESTER UNITED", "won");
    var manUnitedDrawn = createGroup(yearDim, "MANCHESTER UNITED", "drawn");
    var manUnitedLosses = createGroup(yearDim, "MANCHESTER UNITED", "lost");

    // CHARTS
    var positionSelectorManUnited = dc.pieChart("#positionSelectorManUnited");
    var yearSelectorManUnited = dc.barChart("#yearSelectorManUnited");
    var goalsChartManUnited = dc.barChart("#goalsChartManUnited");
    var goalsConcChartManUnited = dc.barChart("#goalsConcChartManUnited");
    var goalDifferenceChartManUnited = dc.lineChart("#goalDifferenceChartManUnited");
    var formGuideManUnited = dc.lineChart("#formGuideManUnited");

    // CHART PROPERTIES
    positionSelectorManUnited
        .dimension(positionDimManUnited)
        .group(positionGroupManUnited)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    // console.log(positionGroupManUnited.all());

    yearSelectorManUnited
        .dimension(yearDim)
        .group(manUnitedPointsByYear)
        .width($(this).parent().parent().width())
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([50, 100]));

    formGuideManUnited
        .dimension(yearDim)
        .width($(this).parent().parent().width())
        .height(300)
        .group(manUnitedWins, "Wins")
        .stack(manUnitedDrawn, "Draws")
        .stack(manUnitedLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .legend(dc.legend().x($(window).width()*.565).y(10).itemHeight(13).gap(5))
        .yAxisLabel("Total");

    goalsChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalsByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([45, 100]));

    goalsConcChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalsConcByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([15, 50]));

    goalDifferenceChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalDifference)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]));
        //.y(d3.scale.linear().domain([-25, 100]));

    dc.renderAll();

    $(window).resize(function() {
        yearSelectorManUnited
            .width($(this).parent().parent().width())
            .legend(dc.legend().x($(window).width()*0.5).y(10).itemHeight(13).gap(5));
        dc.renderAll();
    });
}
