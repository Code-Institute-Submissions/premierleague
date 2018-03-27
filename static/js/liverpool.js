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

    var positionDimLiverpool = ndx.dimension(function (d) {
        if (d["team"] == "LIVERPOOL") {
            return d["position"];
        } else {
            return false;
        }
    });

    var positionGroupLiverpool = positionDimLiverpool.group().reduceCount();

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
    var liverpoolPointsByYear = createGroup(yearDim, "LIVERPOOL", "points");
    var liverpoolGoalsByYear = createGroup(yearDim, "LIVERPOOL", "goals_for");
    var liverpoolGoalsConcByYear = createGroup(yearDim, "LIVERPOOL", "goals_against");
    var liverpoolGoalDifference = createGroup(yearDim, "LIVERPOOL", "goal_difference");
    var liverpoolWins = createGroup(yearDim, "LIVERPOOL", "won");
    var liverpoolDrawn = createGroup(yearDim, "LIVERPOOL", "drawn");
    var liverpoolLosses = createGroup(yearDim, "LIVERPOOL", "lost");

    // CHARTS
    var positionSelectorLiverpool = dc.pieChart("#positionSelectorLiverpool");
    var yearSelectorLiverpool = dc.barChart("#yearSelectorLiverpool");
    var goalsChartLiverpool = dc.barChart("#goalsChartLiverpool");
    var goalsConcChartLiverpool = dc.barChart("#goalsConcChartLiverpool");
    var goalDifferenceChartLiverpool = dc.barChart("#goalDifferenceChartLiverpool");
    var formGuideLiverpool = dc.lineChart("#formGuideLiverpool");

    // CHART PROPERTIES
    positionSelectorLiverpool
        .dimension(positionDimLiverpool)
        .group(positionGroupLiverpool)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    yearSelectorLiverpool
        .dimension(yearDim)
        .group(liverpoolPointsByYear)
        .width($(this).parent().parent().width())
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([45, 90]));

    formGuideLiverpool
        .dimension(yearDim)
        .width($(this).parent().parent().width())
        .height(300)
        .group(liverpoolWins, "Wins")
        .stack(liverpoolDrawn, "Draws")
        .stack(liverpoolLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .legend(dc.legend().x(450).y(10).itemHeight(13).gap(5))
        .yAxisLabel("Total");

    goalsChartLiverpool
        .dimension(yearDim)
        .group(liverpoolGoalsByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([40, 110]));

    goalsConcChartLiverpool
        .dimension(yearDim)
        .group(liverpoolGoalsConcByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 55]));

    goalDifferenceChartLiverpool
        .dimension(yearDim)
        .group(liverpoolGoalDifference)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([0, 55]));

    dc.renderAll();

    $(window).resize(function() {
        yearSelectorLiverpool
            .width($(this).parent().parent().width());
        dc.renderAll();
    });
}
