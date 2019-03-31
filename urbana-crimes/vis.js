const normal_stroke_width = 0.3;
const selected_stroke_width = 2.3;

const normal_radius = 2;
const selected_radius = 5;

const histogramHeight = 300;
const histogramWidth = 500;

const ageBarsHeight = 150;
const ageBarsWidth = 40;
const ageBarsOffset = 2;
const ageBarsPaddingLeft = 40;
const ageBarsPaddingTop = 50;

const yearsHeight = 60;
const yearsWidth = 25;
const yearsOffset = 2;
const yearsPaddingLeft = 60;
const yearsPaddingTop = 30;

const allCrimePaddingLeft = 60;
const allCrimePaddingTop = 30;

const scatterX = 70;
const scatterY = 10;

const mapWidth = 960;
const mapHeight = 500;

const tlWidth = mapWidth;
const tlHeight = 120;

const scatterMargin = {top: 20, right: 20, bottom: 20, left: 20};
const scatterWidth = 350 - scatterMargin.left - scatterMargin.right;
const scatterHeight = 350 - scatterMargin.top - scatterMargin.bottom;

const scatterContainerWidth = 450;
const scatterContainerHeight = 400;

let crimesWithCoordinates;

const urbana = [-88.2073, 40.1106];

function getLatLngStr(string) {
    return string.substring(string.indexOf('('));
}

function getLat(string) {
    return +string.substring(1, string.indexOf(','));
}

function getLng(string) {
    return +string.substring(string.indexOf(',') + 2, string.length - 1);
}

function showLatitudes(lineFunction) {

    const lat25 = [[-130, 25], [-125, 25], [-120, 25], [-115, 25], [-110, 25], [-105, 25], [-100, 25],
        [-95, 25], [-90, 25], [-85, 25], [-80, 25], [-75, 25], [-70, 25]];
    const lat35 = [[-130, 35], [-125, 35], [-120, 35], [-115, 35], [-110, 35], [-105, 35], [-100, 35],
        [-95, 35], [-90, 35], [-85, 35], [-80, 35], [-75, 35], [-70, 35], [-65, 35]];
    const lat45 = [[-135, 45], [-130, 45], [-125, 45], [-120, 45], [-115, 45], [-110, 45], [-105, 45],
        [-100, 45], [-95, 45], [-90, 45], [-85, 45], [-80, 45], [-75, 45], [-70, 45], [-65, 45], [-60, 45]];

    map.append("path")
        .attr("d", lineFunction(lat25))
        .attr("stroke", "#888")
        .attr("stroke-width", 1)
        .attr("fill", "none");
    map.append("path")
        .attr("d", lineFunction(lat35))
        .attr("stroke", "#888")
        .attr("stroke-width", 1)
        .attr("fill", "none");
    map.append("path")
        .attr("d", lineFunction(lat45))
        .attr("stroke", "#888")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

function showLatitudeLabels() {
// latitude labels
    map.append("text")
        .attr("x", 10)
        .attr("y", 400)
        .attr("fill", "#888")
        .text("25°");
    map.append("text")
        .attr("x", 10)
        .attr("y", 220)
        .attr("fill", "#888")
        .text("35°");
    map.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("fill", "#888")
        .text("45°");
}

function showLongitutdes(lineFunction) {
    const lon120 = [[-120, 55], [-120, 40], [-120, 20]];
    const lon100 = [[-100, 55], [-100, 40], [-100, 20]];
    const lon80 = [[-80, 55], [-80, 40], [-80, 20]];
    map.append("path")
        .attr("d", lineFunction(lon120))
        .attr("stroke", "#888")
        .attr("stroke-width", 1)
        .attr("fill", "none");
    map.append("path")
        .attr("d", lineFunction(lon100))
        .attr("stroke", "#888")
        .attr("stroke-width", 1)
        .attr("fill", "none");
    map.append("path")
        .attr("d", lineFunction(lon80))
        .attr("stroke", "#888")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

function showLongitudeLabels() {
// Longitude labels
    map.append("text")
        .attr("x", 225)
        .attr("y", 15)
        .attr("fill", "#888")
        .text("-120°");
    map.append("text")
        .attr("x", 450)
        .attr("y", 15)
        .attr("fill", "#888")
        .text("-100°");
    map.append("text")
        .attr("x", 670)
        .attr("y", 14)
        .attr("fill", "#888")
        .text("-80°");
}

function showLegend() {
// Legend
    var legend = map.selectAll('.legend')
        .data(["Male", "Female"])
        .enter().append('g')
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            {
                return "translate(0," + i * 20 + ")"
            }
        });

    legend.append('rect')
        .attr("x", 0)
        .attr("y", 450)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
            if (i === 0) {
                return "aqua";
            }
            else return "fuchsia";
        });

    legend.append('text')
        .attr("x", 20)
        .attr("y", 460)
        .text(function (d) {
            return d
        })
        .style("font-weight", "bold")
        .style("font-size", 15)
}

const projection = d3.geoAlbers()
    .scale(1000)
    .translate([mapWidth / 2, mapHeight / 2]);

const path = d3.geoPath()
    .projection(projection);

function showAxises() {
    const lineFunction = d3.line()
        .x(function (d) {
            return projection(d)[0];
        })
        .y(function (d) {
            return projection(d)[1];
        });
    showLatitudes(lineFunction);
    showLatitudeLabels();
    showLongitutdes(lineFunction);
    showLongitudeLabels();
}

function showStates(states) {
    map.append('path')
        .datum(topojson.feature(states, states.objects.states))
        .attr('d', path)
        .attr('class', 'states');
}

function getDayOfTheYear(date) {
    let arrestDate = new Date(date);
    let arrestYearStart = new Date(arrestDate.getFullYear(), 0, 0);
    let oneDay = 1000 * 60 * 60 * 24;
    let diff = arrestDate - arrestYearStart;
    return Math.floor(diff / oneDay);
}

function getCrimesWithCoordinates(cities) {
    const crimes_with_coordinates = [];

    cities.forEach(function (item) {
        const latLngStr = getLatLngStr(item["ARRESTEE HOME CITY - MAPPED"]);

        if (latLngStr.length !== 0) {
            const lat = getLat(latLngStr);
            const lng = getLng(latLngStr);

            if (!isNaN(lat) && !isNaN(lng)) {
                // [lng, lat, item["ARRESTEE HOME CITY"], item["ARRESTEE SEX"], item["ARRESTEE HOME STATE"], item["CRIME CATEGORY DESCRIPTION"]]
                crimes_with_coordinates.push({
                    "id": item["ARREST NUMBER"],
                    "0": lng,
                    "1": lat,
                    "dataObject": item,
                    "distance": getDistanceFromLatLonInKm(lat, lng, urbana[1], urbana[0]),
                    "dayOfTheYear": getDayOfTheYear(item["DATE OF ARREST"])
                });
            }
        }
    });
    return crimes_with_coordinates;
}

function showEdgesBetween(data, center) {
    edges = nodeGroup.selectAll("line")
        .data(data);

    edges.enter()
        .append("svg:line")
        .attr("id", function (d, i) {
            return "edge_id_" + i;
        })
        .attr("x1", function () {
            return projection(center)[0]
        })
        .attr("y1", function () {
            return projection(center)[1]
        })
        .attr("x2", function (d) {
            return projection(d)[0];
        })
        .attr("y2", function (d) {
            return projection(d)[1];
        })
        .attr("stroke-width", normal_stroke_width)
        .style("stroke", function (d) {
            if (d["dataObject"]["ARRESTEE SEX"] === "MALE") {
                return "aqua";
            }
            else if (d["dataObject"]["ARRESTEE SEX"] === "FEMALE") {
                return "fuchsia";
            }
            else return "white";
        });
    edges.exit().remove()
}

function createNodes(data) {
    let nodes = nodeGroup.selectAll("circle")
        .data(data);
    nodes.enter()
        .append("svg:circle")
        .attr("id", function (d) {
            return "map_node_" + d["id"];
        })
        .attr("cx", function (d) {
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", normal_radius)
        .attr("class", "non_brushed");

    nodes.exit().remove();
    return nodes;
}

function showCentre(urbana) {
    nodeGroup.append("svg:circle")
        .attr("cx", function () {
            return projection(urbana)[0];

        })
        .attr("cy", function () {
            return projection(urbana)[1];
        })
        .attr("r", normal_radius)
        .attr("class", "non_brushed");
}

function showCityLabel(d, i, bool) {
    if (bool) {

        svg.append("text")
            .attr("id", "text_id_" + i)
            .attr("x", 250)
            .attr("y", 40)
            .attr("fill", "blue")
            .style("font-size", "28")
            .text("ARRESTEE HOME CITY - " + d["dataObject"]["ARRESTEE HOME CITY"]);
    } else {
        d3.select("#text_id_" + i).remove();
    }
}

function isBrushed(brush_coords, cx, cy) {

    let x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];

    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}

function highlightBrushedCircles() {
    if (d3.event.selection != null) {
        // revert circles to initial style
        let scatterPoints = scatter.selectAll("circle");
        scatterPoints.attr("class", "scatterPoint");

        let brush_coords = d3.brushSelection(this);
        // style brushed circles
        let selected = scatterPoints.filter(function () {
            let cx = parseFloat(d3.select(this).attr("cx")) + scatterX;
            let cy = parseFloat(d3.select(this).attr("cy")) + scatterY;
            return isBrushed(brush_coords, cx, cy);
        });
        selected.attr("class", "scatterPointHighlighted");

        nodeGroup.selectAll("circle").attr("class", "non_brushed");

        selected.each(function (d) {
            nodeGroup.select("#map_node_" + d["id"]).attr("class", "brushed");
        });
    }
}

function showAgeHistogram(data) {

    if (ageHistogram.selectAll("#ageHistogramText").size() === 0) {
        ageHistogram.append("text")
            .attr("id", "ageHistogramText")
            .attr("x", ageBarsPaddingLeft)
            .attr("y", 30)
            .text("Age groups of selected crime cases");
    }

    let crimesInYearByAge = d3.nest()
        .key(function (d) {
            return parseInt(d["dataObject"]["AGE AT ARREST"] / 10);
        })
        .rollup(function (d) {
            return d.length;
        })
        .entries(data)
        .sort(function (i1, i2) {
            return d3.ascending(i1.key, i2.key);
        });


    let dataMax = d3.max(crimesInYearByAge, function (d) {
        return d.value;
    });

    let ageBarScale = d3.scaleLinear()
        .domain([0, dataMax])
        .range([0, ageBarsHeight]);

    let ageBars = ageHistogram.selectAll(".ageBar")
        .data(crimesInYearByAge);

    ageBars.enter()
        .append("svg:rect")
        .attr("class", "ageBar")
        .merge(ageBars)
        .attr("x", function (d, i) {
            return ageBarsPaddingLeft + ageBarsOffset + i * (ageBarsWidth + ageBarsOffset);
        })
        .attr("y", function (d) {
            return ageBarsPaddingTop + ageBarsHeight - ageBarScale(d.value);
        })
        .attr("width", ageBarsWidth)
        .attr("height",
            function (d) {
                return ageBarScale(d.value);
            });
    ageBars.exit().remove();

    let ageLabels = ageHistogram.selectAll(".ageLabel")
        .data(crimesInYearByAge);

    ageLabels.enter()
        .append("svg:text")
        .attr("class", "ageLabel")
        .merge(ageLabels)
        .attr('transform', (d, i) => {
            return 'translate( ' + (ageBarsPaddingLeft + ageBarsOffset + i * (ageBarsWidth + ageBarsOffset)) + ' , '
                + (ageBarsPaddingTop + ageBarsHeight + 20) + ')';
        })
        .attr('x', 0)
        .attr('y', 0)
        .text(function (d) {
            const k = parseInt(d.key);
            return ((k * 10) + "-" + ((k + 1) * 10 - 1));
        });
    ageLabels.exit().remove();

    if (crimesInYearByAge.length > 0) {
        // Axis
        ageBarScale.domain([dataMax, 0]);

        ageHistogram.selectAll(".ageAxis").remove();

        yAxis = d3.axisLeft(ageBarScale).ticks(4);
        axisGroup = ageHistogram.append("g")
            .attr("transform", "translate(" + ageBarsPaddingLeft + ", " + ageBarsPaddingTop + ")");

        //Add the axis to the group
        axisGroup.attr("class", "ageAxis")
            .call(yAxis);
    } else {
        d3.select(".domain").remove();
        d3.selectAll(".tick").remove();
    }
}

function showScatter(data) {

    let maxDistance = d3.max(data, function (d) {
        return d["distance"];
    });

    let xScale = d3.scaleLinear()
        .domain([0, 366])
        .range([0, scatterWidth]);

    let yScale = d3.scaleLinear()
        .domain([0, maxDistance])
        .range([0, scatterHeight]);


    yScale.domain([maxDistance, 0]);

    scatter.selectAll(".scatterAxisX").remove();
    scatter.selectAll(".scatterAxisY").remove();

    yAxis = d3.axisLeft(yScale).ticks(4);
    xAxis = d3.axisBottom(xScale).ticks(4);

    scatter.append("g").attr("class", "scatterAxisY")
        .call(yAxis);

    scatter.selectAll(".scatterLabel").remove();

    scatter.append("text")
        .attr("class", "scatterLabel")
        .attr("x", scatterWidth)
        .attr("y", scatterHeight + 30)
        .style("text-anchor", "end")
        .text("Day of Year");

    scatter.append("text")
        .attr("class", "scatterLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-3em")
        .style("text-anchor", "end")
        .text("Distance (km)");

    scatter.append("g").attr("class", "scatterAxisX")
        .call(xAxis)
        .attr("transform", "translate(0, " + scatterHeight + ")");

    yScale.domain([0, maxDistance]);
    xScale.domain([0, 366]);

    let scatterPoints = scatter.selectAll("circle")
        .data(data);

    scatterPoints.enter()
        .append("svg:circle")
        .attr("class", "scatterPoint")
        .merge(scatterPoints)
        .attr("cx", function (d) {
            return xScale(d["dayOfTheYear"]);
        })
        .attr("cy", function (d) {
            return scatterHeight - yScale(d["distance"])
        })
        .attr("r", normal_radius);
    scatterPoints.exit().remove();
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    // Radius of the earth in km
    let R = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function updateDataByYear(year) {
    if (year === "") {
        d3.select(".range-text").text("Select a year to display!");
    } else {
        d3.select(".range-text").text("Selected year: " + year);
        d3.select(".yearSlider").property("value", year);
        let crimesInYear = crimesWithCoordinates.filter(function (d) {
            return d["dataObject"]["YEAR OF ARREST"] === year;
        });
        visualizeCrimesOnMap(crimesInYear);
        showScatter(crimesInYear)
        let cleansedCrimesInYear = crimesInYear.filter(function (d) {
            return d["dataObject"]["AGE AT ARREST"] < 150 && d["dataObject"]["AGE AT ARREST"] > 0;
        });

        showAgeHistogram(cleansedCrimesInYear);

    }
}

function setupRange() {
    let slider = d3.select(".yearSlider");

    let yearMax = d3.max(crimesWithCoordinates, function (d) {
        return d["dataObject"]["YEAR OF ARREST"];
    });
    let yearMin = d3.min(crimesWithCoordinates, function (d) {
        return d["dataObject"]["YEAR OF ARREST"];
    });

    slider.attr("min", yearMin)
        .attr("max", yearMax);
    slider.on("input", function () {
        updateDataByYear(this.value);
    });

    updateDataByYear("");

}

function visualizeCrimesOnMap(data) {

    // Edges
    showEdgesBetween(data, urbana);

    // Nodes
    let nodes = createNodes(data);
    nodes.on("mouseover", function (d, i) {
        setNodeHighlighted(d, i, true);
        showCityLabel(d, i, true);
    }).on("mouseout", function (d, i) {
        setNodeHighlighted(d, i, false);
        showCityLabel(d, i, false);
    });


    // showCentre(urbana);
}

function showTimeLine(crimesWithCoordinates) {

    timeLine.append('g').append("svg:text")
        .attr("width", 300)
        .attr("height", 50)
        .attr('x', 5)
        .attr('y', 20)
        .text("Click on a year to visualize!");

    const crimesByYear = d3.nest()
        .key(function (d) {
            return parseInt(d["dataObject"]["YEAR OF ARREST"]);
        })
        .rollup(function (d) {
            return d.length;
        })
        .entries(crimesWithCoordinates)
        .sort(function (i1, i2) {
            return d3.ascending(i1.key, i2.key);
        });


    let dataMax = d3.max(crimesByYear, function (d) {
        return d.value;
    });

    let yearBarScale = d3.scaleLinear()
        .domain([0, dataMax])
        .range([0, yearsHeight]);

    let yearBars = timeLine.selectAll("rect")
        .data(crimesByYear);

    yearBars.enter()
        .append("svg:rect")
        .attr("class", "yearBar")
        .attr("id", function (d, i) {
            return "year_bar_id_" + i;
        })
        .merge(yearBars)
        .attr("x", function (d, i) {
            return yearsPaddingLeft + yearsOffset + i * (yearsWidth + yearsOffset);
        })
        .attr("y", function (d) {
            return yearsPaddingTop + yearsHeight - yearBarScale(d.value);
        })
        .attr("width", yearsWidth)
        .attr("height",
            function (d) {
                return yearBarScale(d.value);
            })
        .on("click", function (d, id) {
                updateDataByYear(d.key);
                timeLine.selectAll("rect").attr("class", "yearBar");
                timeLine.select("#year_bar_id_" + id).attr("class", "yearBarSelected");
            }
        );
    yearBars.exit().remove();


    const yearLabels = timeLine.selectAll(".yearLabel")
        .data(crimesByYear);

    yearLabels.enter()
        .append("svg:text")
        .attr("class", "yearLabel")
        .merge(yearLabels)
        .attr('transform', (d, i) => {
            return 'translate( ' + (yearsPaddingLeft + yearsOffset + i * (yearsWidth + yearsOffset)) + ' , '
                + (yearsPaddingTop + yearsHeight + 20) + ')';
        })
        .attr('x', 0)
        .attr('y', 0)
        .text(function (d) {
            return '\'' + d.key.substring(2)
        });
    yearLabels.exit().remove();

    // Axis
    yearBarScale.domain([dataMax, 0]);

    const yearYAxis = d3.axisLeft(yearBarScale).ticks(4);

    const yearAxisGroup = timeLine.append("g")
        .attr("transform", "translate(" + yearsPaddingLeft + ", " + yearsPaddingTop + ")");

    //Add the axis to the group
    yearAxisGroup.attr("class", "axis y-axis")
        .call(yearYAxis);
}

function showAllCrime(data) {
    data.forEach(function (d) {
        d["total_crime"] = +d["total_crime"];
    });

    console.log(data);


    allCrimeGroup.append('g').append("svg:text")
        .attr("width", 300)
        .attr("height", 50)
        .attr('x', 5)
        .attr('y', 20)
        .text("All crime committed in the US:");

    let allCrimeDataMax = d3.max(data, function (d) {
        return d["total_crime"];
    });

    console.log(allCrimeDataMax);

    let allCrimeBarScale = d3.scaleLinear()
        .domain([0, allCrimeDataMax])
        .range([0, yearsHeight]);

    let allCrimeBars = allCrimeGroup.selectAll("rect")
        .data(data);

    allCrimeBars.enter()
        .append("svg:rect")
        .attr("class", "allCrimeBar")
        .merge(allCrimeBars)
        .attr("x", function (d, i) {
            return allCrimePaddingLeft + yearsOffset + i * (yearsWidth + yearsOffset);
        })
        .attr("y", function (d) {
            return allCrimePaddingTop + yearsHeight - allCrimeBarScale(d["total_crime"]);
        })
        .attr("width", yearsWidth)
        .attr("height",
            function (d) {
                return allCrimeBarScale(d["total_crime"]);
            });
    allCrimeBars.exit().remove();


    const allCrimeLabels = allCrimeGroup.selectAll(".allCrimeLabel")
        .data(data);

    allCrimeLabels.enter()
        .append("svg:text")
        .attr("class", "allCrimeLabel")
        .merge(allCrimeLabels)
        .attr('transform', (d, i) => {
            return 'translate( ' + (allCrimePaddingLeft + yearsOffset + i * (yearsWidth + yearsOffset)) + ' , '
                + (allCrimePaddingTop + yearsHeight + 20) + ')';
        })
        .attr('x', 0)
        .attr('y', 0)
        .text(function (d) {
            return '\'' + d["year"].substring(2)
        });
    allCrimeLabels.exit().remove();

    // Axis
    allCrimeBarScale.domain([allCrimeDataMax, 0]);

    const yearYAxis = d3.axisLeft(allCrimeBarScale).ticks(4);

    const yearAxisGroup = allCrimeGroup.append("g")
        .attr("transform", "translate(" + allCrimePaddingLeft + ", " + allCrimePaddingTop + ")");

    //Add the axis to the group
    yearAxisGroup.attr("class", "y-axis")
        .call(yearYAxis);

}

function prepareGroups() {
    d3.select(".mapContainer").attr("width", mapWidth).attr("height", mapHeight);
    map = d3.select(".map");
    nodeGroup = d3.select(".nodeGroup");
    timeLine = d3.select(".timeLine").attr("width", tlWidth).attr("height", tlHeight);
    allCrimeGroup = d3.select(".allCrimeGroup").attr("width", tlWidth).attr("height", tlHeight);

    ageHistogram = d3.select(".ageHistogram")
        .attr("width", histogramWidth)
        .attr("height", histogramHeight);
    // .attr("transform", "translate(" + ageHistogramX + ", " + ageHistogramY + ")");

    d3.select(".scatterContainer").attr("width", scatterContainerWidth)
        .attr("height", scatterContainerHeight);
    scatter = d3.select(".scatter")
        .attr("width", scatterWidth)
        .attr("height", scatterHeight)
        .attr("transform", "translate(" + scatterX + ", " + scatterY + ")");

    brushGroup = d3.select(".brushGroup").attr("width", scatterWidth).attr("height", scatterHeight);
        // .attr("transform", "translate(" + scatterX + ", " + scatterY + ")");
}

function makeMyMap(error, states, cities, all_crime) {
    prepareGroups()

    showStates(states);
    crimesWithCoordinates = getCrimesWithCoordinates(cities);
    const brush = d3.brush()
        .on("brush", highlightBrushedCircles);
    // .on("end", showAgeHistogram);
    brushGroup.call(brush);
    showAxises();
    showLegend();

    showTimeLine(crimesWithCoordinates);

    showAllCrime(all_crime);

    setupRange()
}


function setNodeHighlighted(d, id, bool) {
    if (bool) {
        console.log(d);
        nodeGroup.select("#map_node_" + d["id"]).attr("r", selected_radius);
        nodeGroup.select("#edge_id_" + id)
            .attr("stroke-width", selected_stroke_width);
    } else {
        nodeGroup.select("#map_node_" + d["id"]).attr("r", normal_radius);
        nodeGroup.select("#edge_id_" + id)
            .attr("stroke-width", normal_stroke_width);
    }
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}