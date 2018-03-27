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

    var positionDimChelsea = ndx.dimension(function (d) {
        if (d["team"] == "CHELSEA") {
            return d["position"];
        } else {
            return false;
        }
    });

    var positionGroupChelsea = positionDimChelsea.group().reduceCount();

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
    var chelseaPointsByYear = createGroup(yearDim, "CHELSEA", "points");
    var chelseaGoalsByYear = createGroup(yearDim, "CHELSEA", "goals_for");
    var chelseaGoalsConcByYear = createGroup(yearDim, "CHELSEA", "goals_against");
    var chelseaGoalDifference = createGroup(yearDim, "CHELSEA", "goal_difference");
    var chelseaWins = createGroup(yearDim, "CHELSEA", "won");
    var chelseaDrawn = createGroup(yearDim, "CHELSEA", "drawn");
    var chelseaLosses = createGroup(yearDim, "CHELSEA", "lost");

    // CHARTS
    var positionSelectorChelsea = dc.pieChart("#positionSelectorChelsea");
    var yearSelectorChelsea = dc.barChart("#yearSelectorChelsea");
    var goalsChartChelsea = dc.barChart("#goalsChartChelsea");
    var goalsConcChartChelsea = dc.barChart("#goalsConcChartChelsea");
    var goalDifferenceChartChelsea = dc.lineChart("#goalDifferenceChartChelsea");
    var formGuideChelsea = dc.lineChart("#formGuideChelsea");

    // CHART PROPERTIES
    positionSelectorChelsea
        .dimension(positionDimChelsea)
        .group(positionGroupChelsea)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    yearSelectorChelsea
        .dimension(yearDim)
        .group(chelseaPointsByYear)
        .width($(this).parent().parent().width())
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([45, 100]));

    formGuideChelsea
        .dimension(yearDim)
        .width($(this).parent().parent().width())
        .height(300)
        .group(chelseaWins, "Wins")
        .stack(chelseaDrawn, "Draws")
        .stack(chelseaLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .legend(dc.legend().x(450).y(10).itemHeight(13).gap(5))
        .yAxisLabel("Total");

    goalsChartChelsea
        .dimension(yearDim)
        .group(chelseaGoalsByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([40, 110]));

    goalsConcChartChelsea
        .dimension(yearDim)
        .group(chelseaGoalsConcByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([10, 60]));

    goalDifferenceChartChelsea
        .dimension(yearDim)
        .group(chelseaGoalDifference)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([0, 80]));

    dc.renderAll();

    $(window).resize(function() {
        yearSelectorChelsea
            .width($(this).parent().parent().width());
        dc.renderAll();
    });
}
