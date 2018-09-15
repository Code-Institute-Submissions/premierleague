queue()
    .defer(d3.json, "/premierleague/team/ARSENAL")
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
    var goalDifferenceChartArsenal = dc.barChart("#goalDifferenceChartArsenal");
    var formGuideArsenal = dc.lineChart("#formGuideArsenal");

    // CHART PROPERTIES
    positionSelectorArsenal
        .dimension(positionDimArsenal)
        .group(positionGroupArsenal)
        .width(250)
        .height(250)
        .legend(dc.legend().x(30)
                           .y(235)
                           .itemHeight(15)
                           .gap(0)
                           .horizontal(true)
                           .itemWidth(30))
        .minAngleForLabel(2)
        .title(function(d) {
            return 'Position ' + d.key + ': ' + d.value;
        })
        .radius(90)
        .innerRadius(40);

    yearSelectorArsenal
        .dimension(yearDim)
        .group(arsenalPointsByYear)
        .width($(this).parent().width())
        .height(250)
        .margins({top: 50, right: 35, bottom: 50, left: 35})
        .xUnits(function(){return 19;}) // SET BAR WIDTH
        .centerBar(true)
        .barPadding(0.25) // SET PADDING BETWEEN BARS
        .xAxisLabel("Year")
        .yAxisLabel("Points")
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([40, 95]));

    formGuideArsenal
        .dimension(yearDim)
        .margins({top: 50, right: 75, bottom: 50, left: 35})
        .width($(this).parent().width())
        .height(300)
        .group(arsenalWins, "Wins")
        .stack(arsenalDrawn, "Draws")
        .stack(arsenalLosses, "Losses")
        .brushOn(false)
        .renderArea(true)
        .rangeChart(yearSelectorArsenal)
        .x(d3.time.scale().domain([minYear, maxYearBoundary]))
        .y(d3.scale.linear().domain([0, 40]))
        .legend(dc.legend().x($('#formGuideArsenal').width()-70)
                           .y(50)
                           .itemHeight(13)
                           .gap(5))
        .title(function(d) {
            return d.key.getFullYear() + ': ' + d.value;
        })
        .xAxisLabel("Year")
        .yAxisLabel("Total");

    goalsChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalsByYear)
        .width($(this).parent().width())
        .height(250)
        .margins({top: 25, right: 35, bottom: 50, left: 35})
        .brushOn(false)
        .xUnits(function(){return 19;}) // SET BAR WIDTH
        .centerBar(true)
        .barPadding(0.25) // SET PADDING BETWEEN BARS
        .rangeChart(formGuideArsenal)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        //.yAxis(yAxis);
        .y(d3.scale.linear().domain([50, 90]))
        .title(function(d) {
            return d.key.getFullYear() + ': ' + d.value;
        })
        .yAxisLabel("Scored")
        .xAxisLabel("Year");

    goalsConcChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalsConcByYear)
        .width($(this).parent().width())
        .height(250)
        .margins({top: 25, right: 35, bottom: 50, left: 35})
        .brushOn(false)
        .xUnits(function(){return 19;}) // SET BAR WIDTH
        .centerBar(true)
        .barPadding(0.25) // SET PADDING BETWEEN BARS
        .rangeChart(goalsChartArsenal)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([20, 55]))
        .title(function(d) {
            return d.key.getFullYear() + ': ' + d.value;
        })
        .yAxisLabel("Conceded")
        .xAxisLabel("Year");

    goalDifferenceChartArsenal
        .dimension(yearDim)
        .group(arsenalGoalDifference)
        .width($(this).parent().width())
        .height(250)
        .margins({top: 25, right: 35, bottom: 50, left: 35})
        .brushOn(false)
        .xUnits(function(){return 19;}) // SET BAR WIDTH
        .centerBar(true)
        .barPadding(0.25) // SET PADDING BETWEEN BARS
        .rangeChart(goalsConcChartArsenal)
        .x(d3.time.scale().domain([minYearBoundary, maxYearBoundary]))
        .y(d3.scale.linear().domain([10, 60]))
        .title(function(d) {
            return d.key.getFullYear() + ': ' + d.value;
        })
        .yAxisLabel("Goal Difference")
        .xAxisLabel("Year");

    dc.renderAll();

    $(window).resize(function() {
        yearSelectorArsenal
            .width($(this).parent().width());
        formGuideArsenal
            .legend(dc.legend().x($('#formGuideArsenal').width()-70)
                               .y(50)
                               .itemHeight(13)
                               .gap(5));
        dc.renderAll();
    });
}
