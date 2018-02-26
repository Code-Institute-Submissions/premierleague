queue()
    .defer(d3.json, "/premierleague/data")
    .await(makeGraphs);

function makeGraphs(error, premierleagueData) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    var ndx = crossfilter(premierleagueData);

    var teamDim = ndx.dimension(function (d) {
        return d["team"];
    });

    var yearDim = ndx.dimension(function (d) {
        return new Date(d["year"], 0, 1);
    });

    // CALCULATE METRICS
    var groupYear = yearDim.group();
    var groupTeam = teamDim.group();

    var totalTeamsGroup = teamDim.group().reduceCount();

    // TEAM POINTS BY YEAR
    var manUnitedPointsByYear = yearDim.group().reduceSum(function (d) {
        if (d["team"]=="MANCHESTER UNITED"){
            return d["points"];
        } else {
            return 0
        }
    });

    var manCityPointsByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="MANCHESTER CITY"){
            return d['points'];
        } else {
            return 0;
        }
    });

    var chelseaPointsByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="CHELSEA"){
            return d['points'];
        } else {
            return 0;
        }
    });

    var arsenalPointsByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="ARSENAL"){
            return d['points'];
        } else {
            return 0;
        }
    });

    var spursPointsByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="TOTTENHAM HOTSPUR"){
            return d['points'];
        } else {
            return 0;
        }
    });

    var liverpoolPointsByYear = yearDim.group().reduceSum(function (d) {
       if (d['team']=="LIVERPOOL"){
           return d['points'];
       } else {
           return 0;
       }
    });

    // TEAM POSITION BY YEAR

    var manUnitedPositionByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="MANCHESTER UNITED") {
            return d['position'];
        } else {
            return 0;
        }
    });

    var manCityPositionByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="MANCHESTER CITY") {
            return d['position'];
        } else {
            return 0;
        }
    });

    var chelseaPositionByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="CHELSEA") {
            return d['position'];
        } else {
            return 0;
        }
    });

    var arsenalPositionByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="ARSENAL") {
            return d['position'];
        } else {
            return 0;
        }
    });

    var spursPositionByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="TOTTENHAM HOTSPUR") {
            return d['position'];
        } else {
            return 0;
        }
    });

    var liverpoolPositionByYear = yearDim.group().reduceSum(function (d) {
        if (d['team']=="LIVERPOOL") {
            return d['position'];
        } else {
            return 0;
        }
    });


    //DATE VALUES USED IN CHARTS
    var minYear = new Date(yearDim.bottom(1)[0]["year"], 0,1);
    var maxYear = new Date(yearDim.top(1)[0]["year"], 0,1);

    // CHARTS
    var teamSelector = dc.pieChart("#teamSelector");
    var pointsChart = dc.compositeChart("#pointsChart");
    var positionChart = dc.compositeChart("#positionChart");

    // AXIS SCALES

    var yAxisScale = d3.scale.linear();

    var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("left")
        .ticks(20);

    // CHART PROPERTIES

    teamSelector
        .dimension(teamDim)
        .group(totalTeamsGroup)
        .width(250)
        .height(250)
        .minAngleForLabel(2)
        .radius(90)
        .innerRadius(40);

    pointsChart
        .width(900)
        .height(500)
        .margins({top: 30, right: 50, bottom: 50, left: 50})
        .compose([
            dc.lineChart(pointsChart)
                .colors("#ed2d3a")
                .group(manUnitedPointsByYear, "Man United"),
            dc.lineChart(pointsChart)
                .colors('#83b4dd')
                .group(manCityPointsByYear, "Man City"),
            dc.lineChart(pointsChart)
                .colors('#0f2c56')
                .group(chelseaPointsByYear, "Chelsea"),
           dc.lineChart(pointsChart)
                .colors('#f8d33a')
                .group(arsenalPointsByYear, "Arsenal"),
           dc.lineChart(pointsChart)
                .colors('#431c77')
                .group(spursPointsByYear, "Spurs"),
           dc.lineChart(pointsChart)
                .colors('#007430')
                .group(liverpoolPointsByYear, "Liverpool")
        ])
        .x(d3.time.scale().domain([minYear, maxYear]))
        .xAxisLabel("Year")
        .yAxisLabel("Points")
        .legend(dc.legend().x(780).y(300).itemHeight(15).gap(5))
        .yAxis().ticks(10);

    positionChart
        .width(900)
        .height(500)
        .compose([
            dc.lineChart(positionChart)
                .colors('#ed2d3a')
                .group(manUnitedPositionByYear, "Man Utd"),
            dc.lineChart(positionChart)
                .colors('#83b4dd')
                .group(manCityPositionByYear, "Man City"),
            dc.lineChart(positionChart)
                .colors('#0f2c56')
                .group(chelseaPositionByYear, "Chelsea"),
            dc.lineChart(positionChart)
                .colors('#f8d33a')
                .group(arsenalPositionByYear, "Arsenal"),
            dc.lineChart(positionChart)
                .colors('#431c77')
                .group(spursPositionByYear, "Spurs"),
            dc.lineChart(positionChart)
                .colors('#007430')
                .group(liverpoolPositionByYear, "Liverpool")
        ])
        .x(d3.time.scale().domain([minYear, maxYear]))
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxisLabel("Position")
       .brushOn(false)
       .legend(dc.legend().x(780).y(10).itemHeight(15).gap(5))
       .yAxis(yAxis);



    dc.renderAll();

}