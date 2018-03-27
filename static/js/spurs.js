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

    var positionDimSpurs = ndx.dimension(function (d) {
        if (d["team"] == "TOTTENHAM HOTSPUR") {
            return d["position"];
        } else {
            return false;
        }
    });

    var positionGroupSpurs = positionDimSpurs.group().reduceCount();

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
    var spursPointsByYear = createGroup(yearDim, "TOTTENHAM HOTSPUR", "points");
    var spursGoalsByYear = createGroup(yearDim, "TOTTENHAM HOTSPUR", "goals_for");
    var spursGoalsConcByYear = createGroup(yearDim, "TOTTENHAM HOTSPUR", "goals_against");
    var spursGoalDifference = createGroup(yearDim, "TOTTENHAM HOTSPUR", "goal_difference");
    var spursWins = createGroup(yearDim, "TOTTENHAM HOTSPUR", "won");
    var spursDrawn = createGroup(yearDim, "TOTTENHAM HOTSPUR", "drawn");
    var spursLosses = createGroup(yearDim, "TOTTENHAM HOTSPUR", "lost");

    // CHARTS
    var positionSelectorSpurs = dc.pieChart("#positionSelectorSpurs");
    var yearSelectorSpurs = dc.barChart("#yearSelectorSpurs");
    var goalsChartSpurs = dc.barChart("#goalsChartSpurs");
    var goalsConcChartSpurs = dc.barChart("#goalsConcChartSpurs");
    var goalDifferenceChartSpurs = dc.barChart("#goalDifferenceChartSpurs");
    var formGuideSpurs = dc.lineChart("#formGuideSpurs");

    // CHART PROPERTIES
    positionSelectorSpurs
        .dimension(positionDimSpurs)
        .group(positionGroupSpurs)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    yearSelectorSpurs
        .dimension(yearDim)
        .group(spursPointsByYear)
        .width($(this).parent().parent().width())
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([40, 90]));

    formGuideSpurs
        .dimension(yearDim)
        .width($(this).parent().parent().width())
        .height(300)
        .group(spursWins, "Wins")
        .stack(spursDrawn, "Draws")
        .stack(spursLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .legend(dc.legend().x(450).y(10).itemHeight(13).gap(5))
        .yAxisLabel("Total");

    goalsChartSpurs
        .dimension(yearDim)
        .group(spursGoalsByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([30, 90]));

    goalsConcChartSpurs
        .dimension(yearDim)
        .group(spursGoalsConcByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 70]));

    goalDifferenceChartSpurs
        .dimension(yearDim)
        .group(spursGoalDifference)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([-20, 70]));

    dc.renderAll();

    $("#goalDifferenceChartSpurs .axis.x").attr("transform", "translate(30, 173)");

    $(window).resize(function() {
        yearSelectorSpurs
            .width($(this).parent().parent().width());
        dc.renderAll();
    });
}
