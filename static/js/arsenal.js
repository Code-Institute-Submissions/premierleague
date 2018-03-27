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

    var positionDimArsenal = ndx.dimension(function (d) {
        if (d["team"] == "ARSENAL") {
            return d["position"];
        } else {
            return false;
        }
    });

    var positionGroupArsenal = positionDimArsenal.group().reduceCount();

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
    var arsenalPointsByYear = createGroup(yearDim, "ARSENAL", "points");
    var arsenalGoalsByYear = createGroup(yearDim, "ARSENAL", "goals_for");
    var arsenalGoalsConcByYear = createGroup(yearDim, "ARSENAL", "goals_against");
    var arsenalGoalDifference = createGroup(yearDim, "ARSENAL", "goal_difference");
    var arsenalWins = createGroup(yearDim, "ARSENAL", "won");
    var arsenalDrawn = createGroup(yearDim, "ARSENAL", "drawn");
    var arsenalLosses = createGroup(yearDim, "ARSENAL", "lost");

    // CHARTS
    var positionSelectorArsenal = dc.pieChart("#positionSelectorArsenal");
    var yearSelectorArsenal = dc.barChart("#yearSelectorArsenal");
    var goalsChartArsenal = dc.barChart("#goalsChartArsenal");
    var goalsConcChartArsenal = dc.barChart("#goalsConcChartArsenal");
    var goalDifferenceChartArsenal = dc.lineChart("#goalDifferenceChartArsenal");
    var formGuideArsenal = dc.lineChart("#formGuideArsenal");

    // CHART PROPERTIES
    positionSelectorArsenal
        .dimension(positionDimArsenal)
        .group(positionGroupArsenal)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    yearSelectorArsenal
        .dimension(yearDim)
        .group(arsenalPointsByYear)
        .width($(this).parent().parent().width())
        .height(150)
        //.centerBar(true)
        //.gap(10)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([40, 95]));

    formGuideArsenal
        .dimension(yearDim)
        .width($(this).parent().parent().width())
        .height(300)
        .group(arsenalWins, "Wins")
        .stack(arsenalDrawn, "Draws")
        .stack(arsenalLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .legend(dc.legend().x(450).y(10).itemHeight(13).gap(5))
        .yAxisLabel("Total");

    goalsChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalsByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .barPadding(0)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([50, 90]));

    goalsConcChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalsConcByYear)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 55]));

    goalDifferenceChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalDifference)
        .width($(this).parent().parent().width())
        .height(250)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([10, 60]));

    dc.renderAll();

    $(window).resize(function() {
        yearSelectorArsenal
            .width($(this).parent().parent().width());
        dc.renderAll();
    });
}
