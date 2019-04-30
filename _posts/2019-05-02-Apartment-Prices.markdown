---
layout:     post
title:      Same Data, New Journey - Data driven storytelling and what’s beyond
author:     György Katona
tags: 		Tableau visualization animation
subtitle:   Creating a Tableau Dashboard to visualize geographic data
img_preview:	"img/sample_header.png"
draft:	true
---

* TOC
{:toc}

# Motivation

One of the most desirable quality of a data scientist is his ability to tell a story. Although the field is based on math, statistics and algorithms, we can not forget about the other side of the process: humans. Turning data into information and information into knowledge is a complicated and arguably subjective process. A subfield of visualization is addressed to explore human perception and to find the best channels of communicating data, but conveying complex information is always unique to its receiver.

The appearance of mobile devices with high computational power allows us to discover new ways of storytelling. I believe that the best visualization is not only one story to tell, but a personal experience, a unique adventure for every person. Static figures can also carry multiple layers of information, but interactive dashboards and animations can create even more personal and complex experience.

In this post I am going to investigate how average price of used apartments in Hungary changes over time and how it differs by region and type/size of settlement. The Hungarian Central Statistical Office releases their report and data every year in [pdf](https://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.pdf)/[xls](http://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.xls) format and even though they contain extensive and detailed information, they are not designed to be interpretable by an average user. For this reason, I am attempting to design a dashboard and interactive animations in order to bring the information closer to the users.

# Analysis

<div class='tableauPlaceholder' id='viz1556539855220' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Hu&#47;HungarianApartmentPrices&#47;Used&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='views&#47;HungarianApartmentPrices&#47;Used?:embed=y&amp;:display_count=y' /> <param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Hu&#47;HungarianApartmentPrices&#47;Used&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /></object></div>                
<script type='text/javascript'>                    var divElement = document.getElementById('viz1556539855220');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1000px';vizElement.style.height='700px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1000px';vizElement.style.height='700px';} else { vizElement.style.width='100%';vizElement.style.height='1350px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>


## Interactive Dashboard

Used

<div class="flourish-embed" data-src="visualisation/325722"></div><script src="https://public.flourish.studio/resources/embed.js"></script>

## Static Image vs Interactive Animation

<div class="flourish-embed" data-src="visualisation/327322"></div><script src="https://public.flourish.studio/resources/embed.js"></script>

![Average Price of Used Apartments in Hungary](https://georgekatona.com/img/house_prices/CityTypes.png)
<p align="center">Average Price of Used Apartments in Hungary - Grouped by City Types</p>

# Hans Rosling Chart

<div class="flourish-embed" data-src="visualisation/327487"></div><script src="https://public.flourish.studio/resources/embed.js"></script>

# Summary


*Links:*
- [Hungarian Central Statistical Office - 2018 Q3 report](https://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.pdf)
- [Hungarian Central Statistical Office - 2018 Q3 tables](http://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.xls)