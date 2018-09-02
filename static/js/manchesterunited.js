queue()
    .defer(d3.json, "/premierleague/team/MANCHESTER%20UNITED")
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

    var positionDimManUnited = ndx.dimension(dc.pluck("position"));

    // var positionDimManUnited = ndx.dimension(function (d) {
    //     return
    //     // if (d["team"] == "MANCHESTER UNITED") {
    //     //     return d["position"];
    //     // } else {
    //     //     return false
    //     // }
    // });

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
    var goalDifferenceChartManUnited = dc.barChart("#goalDifferenceChartManUnited");
    var formGuideManUnited = dc.lineChart("#formGuideManUnited");

    // TOOLTIPS
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("id","tooltip");

    // CHART PROPERTIES
    positionSelectorManUnited
        .dimension(positionDimManUnited)
        .group(positionGroupManUnited)
        .width(250)
        .height(250)
        .legend(dc.legend().x(25)
                           .y(235)
                           .itemHeight(15)
                           .gap(0)
                           .horizontal(true)
                           .itemWidth(30))
        .minAngleForLabel(4)
        .radius(90)
        .innerRadius(40);

    yearSelectorManUnited
        .dimension(yearDim)
        .group(manUnitedPointsByYear)
        .width($(this).parent().width())
        .height(250)
        .margins({top: 50, right: 35, bottom: 50, left: 35})
        .yAxisLabel("Points")
        .xAxisLabel("Year")
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([50, 100]));

    formGuideManUnited
        .dimension(yearDim)
        .width($(this).parent().width())
        .margins({top: 50, right: 75, bottom: 50, left: 35})
        .height(300)
        .group(manUnitedWins, "Wins")
        .stack(manUnitedDrawn, "Draws")
        .stack(manUnitedLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .rangeChart(yearSelectorManUnited)
        .x(d3.time.scale().domain([minYear, maxYearBoundary]))
        .y(d3.scale.linear().domain([0, 40]))
        .legend(dc.legend().x($('#formGuideManUnited').width()-70)
                           .y(50)
                           .itemHeight(13)
                           .gap(5))
        .xAxisLabel("Year")
        .yAxisLabel("Total");

    goalsChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalsByYear)
        .width($(this).parent().width())
        .height(250)
        .margins({top: 25, right: 35, bottom: 50, left: 35})
        .brushOn(false)
        .barPadding(0)
        .rangeChart(formGuideManUnited)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([45, 100]))
        .yAxisLabel("Scored")
        .xAxisLabel("Year");

    goalsConcChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalsConcByYear)
        .width($(this).parent().width())
        .margins({top: 25, right: 35, bottom: 50, left: 35})
        .brushOn(false)
        .height(250)
        .rangeChart(goalsChartManUnited)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([15, 50]))
        .yAxisLabel("Conceded")
        .xAxisLabel("Year");

    goalDifferenceChartManUnited
        .dimension(yearDim)
        .group(manUnitedGoalDifference)
        .width($(this).parent().width())
        .margins({top: 25, right: 35, bottom: 50, left: 35})
        .brushOn(false)
        .height(250)
        .rangeChart(goalsConcChartManUnited)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .elasticY(true)
        .yAxisLabel("Goal Difference")
        .xAxisLabel("Year");

    dc.renderAll();

    $(window).resize(function() {
        yearSelectorManUnited
            .width($(this).parent().width());

        formGuideManUnited
            .legend(dc.legend().x($('#formGuideManUnited').width()-70)
                   .y(50)
                   .itemHeight(13)
                   .gap(5));
        dc.renderAll();
    });
}
