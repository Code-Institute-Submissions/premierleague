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

    var positionDimManCity = ndx.dimension(function (d) {
        if (d["team"] == "MANCHESTER CITY") {
            return d["position"];
        } else {
            return false;
        }
    });

    var positionGroupManCity = positionDimManCity.group().reduceCount();

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
    var manCityPointsByYear = createGroup(yearDim, "MANCHESTER CITY", "points");
    var manCityGoalsByYear = createGroup(yearDim, "MANCHESTER CITY", "goals_for");
    var manCityGoalsConcByYear = createGroup(yearDim, "MANCHESTER CITY", "goals_against");
    var manCityGoalDifference = createGroup(yearDim, "MANCHESTER CITY", "goal_difference");
    var manCityWins = createGroup(yearDim, "MANCHESTER CITY", "won");
    var manCityDrawn = createGroup(yearDim, "MANCHESTER CITY", "drawn");
    var manCityLosses = createGroup(yearDim, "MANCHESTER CITY", "lost");

    // CHARTS
    var positionSelectorManCity = dc.pieChart("#positionSelectorManCity");
    var yearSelectorManCity = dc.barChart("#yearSelectorManCity");
    var goalsChartManCity = dc.barChart("#goalsChartManCity");
    var goalsConcChartManCity = dc.barChart("#goalsConcChartManCity");
    var goalDifferenceChartManCity = dc.lineChart("#goalDifferenceChartManCity");
    var formGuideManCity = dc.lineChart("#formGuideManCity");

    // CHART PROPERTIES
    positionSelectorManCity
        .dimension(positionDimManCity)
        .group(positionGroupManCity)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    yearSelectorManCity
        .dimension(yearDim)
        .group(manCityPointsByYear)
        .width($(this).parent().parent().width())
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([30, 100]));

    formGuideManCity
        .dimension(yearDim)
        .width($(this).parent().parent().width())
        .height(300)
        .group(manCityWins, "Wins")
        .stack(manCityDrawn, "Draws")
        .stack(manCityLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .legend(dc.legend().x(450).y(10).itemHeight(13).gap(5))
        .yAxisLabel("Total");

    goalsChartManCity
        .dimension(yearDim)
        .group(manCityGoalsByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([20, 110]));

    goalsConcChartManCity
        .dimension(yearDim)
        .group(manCityGoalsConcByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([15, 70]));

    goalDifferenceChartManCity
        .dimension(yearDim)
        .group(manCityGoalDifference)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([-30, 80]));

    dc.renderAll();

    $("#goalDifferenceChartManCity .axis.x").attr("transform", "translate(30, 162.5)");

    $(window).resize(function() {
        yearSelectorManCity
            .width($(this).parent().parent().width());
        dc.renderAll();
        $("#goalDifferenceChartManCity .axis.x").attr("transform", "translate(30, 162.5)");
    });
}
