---
layout:     post
title:      Dynamic Visualization of Running Data
author:     György Katona
tags: 		JavaScript d3 visualization html
subtitle:   Using D3 library and canvas to visualize over 7000 moving data points
img_preview:	"img/runvis_vivicitta.png"
draft:	true
---

* TOC
{:toc}

# Motivation

In a former university project I experienced many of [D3](https://d3js.org/)'s capabilities while implementing an [interactive dashboard](https://georgekatona.com/urbana-crimes/index.html) (Figure 1). I used SVG elements to draw histograms, scatter plots, applied filtering, highlighting and brushing in order to visualize crime data committed in Urbana, Illinois from 1988 to 2016.

![Former D3 Visualization Project](https://georgekatona.com/img/runvis/urbana.PNG)
<p align="center">Figure 1: <a href="https://georgekatona.com/urbana-crimes/index.html">Former D3 Visualization Project</a></p>

When I came across ATLO's marathon [visualization](https://atlo.team/spar-budapest-maraton/?fbclid=IwAR3MlxaCr2Rt1OYC-QmUUxNyGiALdLOfUaVGR87Bn35uXHmfcNLD6Jd_70s), I decided to implement my own version using D3, so I can investigate how it does at dynamic, performance-dependent visualization scenarios and also to bring joy to my fellow hobby runners. I chose the Vivicittá Half-Marathon, as it is one of the most popular running events in Hungary with more than 7000 runners participating in 2018. Moving that many data points with an acceptable frame rate should be a challenging task, therefore in this article I intend to investigate how D3 performs using canvas.

# Implementation
### D3 Canvas
As a first step we have to place the HTML canvas element into the body.
```
<body>
<canvas id="run-canvas"></canvas>
</body>
```
In the JavaScript block we need the context object in order to access the canvas. After reading the data from the CSV file, I save it to the **runners** variable, so it can be accessed from the **draw()** function. I call **draw()** the first time and then later it is called every 20 milliseconds if the timer is started.

In the function **draw()** I start by erasing the whole canvas, so the new position can be redrawn. To make the whole drawing area scalable, I introduced the measure **unit**. One unit represents half kilometer of running route.
```
<script>
let runners;
let time = 0;
let started = false;

let unit = Math.floor(screen.availHeight / 200) * 10;
let margin = {top: 0.5 * unit, right: unit, bottom: 0, left: unit};
let width = 6 * unit;
let height = 18 * unit;

let canvas = d3.select('#run-canvas')
    .attr('width', width)
    .attr('height', height)
    .style("transform", "translate(" + (margin.left) +
        "px" + "," + (margin.top) + "px" + ")");
let context = canvas.node().getContext('2d');

d3.csv("vivicitta_2018.csv").then(function (data) {
    runners = data;

    draw();
    d3.interval(function () {
        if (started) {
            time += 12;
            draw();
        }
    }, 20);
});

function draw() {
    context.clearRect(0, 0, width, height);
    drawDanube();
    drawRoute();
    drawRunners();
    drawLabels();
}
</script>
```

### Running Route

To come up with a nice and simple representation of the running route, I went to pen-and-paper design. I chose a unit distance and mapped the route to sections with 0 or 90 degree turns on the borders. Using the Danube as a reference point, it is easier for the user to comprehend. As a last step I added lines indicating distances, so the runners can track their progression. The final design is displayed in Figure 2, where you can also compare it to the original map. When you look at the design alone, at first the direction of the path might not be self explanatory, but later having the runners animated on top of it is going to make things clear.

![Minimalist Design of Running Route](https://georgekatona.com/img/runvis/map.png)
<p align="center">Figure 2: Minimalist Design vs Map of the Running Route</p>

### Calculate Runner's position

One of the most interesting implementation step is to map the position of all the runners to any timestamp. In the data set, timestamps of passing the gates of 10 kilometers, 17 kilometers and the finish-line are available for all runners as well as the net time of the half-marathon.

![Snippet of the data set](https://georgekatona.com/img/runvis/table_head.PNG)

Having these values, the speed for the three sections (0-10km, 10-17km, 17-21.1km) can be calculated and then using the speed of the runners with the mapped 0.5 km sections, we can determine the exact positions. To distribute runners on the width of the route, I used a pseudorandom generator based on the runner's id. This random value is then used to add an offset to the runners position sideways and to determine the starting and ending position of the straight path, in order to calculate a smooth turn.

```
runners.forEach(function (d) {
    d.random_offset = getRandomOffset(d.running_id);
});
        
function getRandomOffset(running_id) {
    let maxLength = routeWidth - dotRadius;
    let random = (31 * running_id + 127) % maxLength;
    return random - maxLength / 2
}
```

After adding regular HTML Button and Range elements to control timer, the circles for all runners can be drawn for each timestamp. 

![Draw All Runners at Any Timestamp](https://georgekatona.com/img/runvis/datapoints.png)
<p align="center">Figure 3: Displaying each runner at the position based on their individual speed.</p>

### Highlight Runner

Runners love their performance data. Given a race, they are usually thrilled to see how they performed, on which section did they do their best and so on. The functionality to search and highlight based on their running id, so they can see their speed amongst all runners, would be really useful for them. Using a text input field and a button, they can search for their ids. In the **drawRunners()** function, we implement the highlighted case.

```
function drawRunners() {
    if (highlighted_id === -1) {
        runners.forEach(function (d) {
            drawDot(d, dotRadius, "rgb(230, 0, 126)");
        });
    } else {
        runners.forEach(function (d) {
            drawDot(d, dotRadius, "rgb(201,148,199)");
        });
        let highlighted = runners.find(runner => runner.running_id === highlighted_id);
        drawDot(highlighted, 4 * dotRadius, "rgb(230, 0, 126)")
    }
}
```

# Summary

Using D3 and canvas to dynamically draw thousands of moving elements has its advantages but has limitations as well. According to my experiments, around 4000 runners can be drawn with a really smooth animation, and even with around 7000 data points, frame rate is around 20-25 fps on most browsers (including mobile devices). For significantly larger data sets though, I would recommend to look for some further optimization techniques. If lacking the interactive functionality is an option, a prerendered mp4 video - like the one below - could also serve the purpose.

<div style="text-align:center;">
    <video width="160" height="480" autoplay loop playsinline>
        <source src="https://georgekatona.com/img/runvis/run_animated.mp4" type="video/mp4">
    </video>
</div>
<p align="center">Figure 4: Prerendered Final Animation</p>

If you're interested in the final interactive result, you can find it [here](https://georgekatona.com/vivicitta/index.html). I appreciate any of your thoughts and impressions in the comments section.

*Links:*
- [Interactive Dashboard - Crimes Committed in Urbana, Illinois ](https://georgekatona.com/urbana-crimes/index.html)
- [D3 - Data Driven Documents (JavaScript Library)](https://d3js.org/)
- [ATLO's marathon visualization](https://atlo.team/spar-budapest-maraton/?fbclid=IwAR3MlxaCr2Rt1OYC-QmUUxNyGiALdLOfUaVGR87Bn35uXHmfcNLD6Jd_70s)
- [Implementation - GitHub Repository](https://github.com/georgekatona/RunningVis)
- [Final Visualization](https://georgekatona.com/vivicitta/index.html)