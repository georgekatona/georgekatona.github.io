---
layout:     post
title:      Personalized Data Exploration with the Power of Modern Visualization Tools
author:     György Katona
tags: 		Tableau dashboard visualization Flourish animation
subtitle:   Investigating Hungarian Real Estate Market with Interactive Dashboard and Animation
img_preview:	"img/house_prices/cover.png"
draft:	true
---

* TOC
{:toc}

# Motivation

One of the most desirable quality of a data scientist is his/her ability to tell a story. Although the field is based on math, statistics and algorithms, we can not forget about the other side of the process: humans. Turning data into information and information into knowledge is a complicated and arguably subjective process. A subfield of visualization is addressed to explore human perception and to find the best channels of communicating data, but conveying complex information is always unique to its receiver.

The appearance of mobile devices with high computational power allows us to discover new ways of storytelling. I believe that the best visualization is not only one story to tell, but a personal experience, a unique adventure for every person. Static figures can also carry multiple layers of information, but interactive dashboards and animations can create even more personal and complex experience.

In this post I am going to investigate how average price of used apartments in Hungary changes over time and how it differs by region and type/size of settlement. The Hungarian Central Statistical Office releases their report and data every year in [pdf](https://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.pdf)/[xls](http://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.xls) format and even though they contain extensive and detailed information, they are not designed to be interpretable by an average user. For this reason, I am attempting to design a dashboard and interactive animations in order to bring the information closer to the users.

# Interactive Dashboard

One of the most powerful tools in data visualization is designing interactive dashboards, as the user not only passively interprets the story as a receiver, but he/she can also interact and explore. A good dashboard fits well to the user’s level of skills and uses channels that are widely used and easy to interpret. Actions and interactions between the multiple views should have a natural feeling. Another key challenge is to distribute space relative to the importance of the element. As the user base might be highly diverse, it’s easy to see how difficult it is to implement a dashboard suitable for each one of them. On the other hand, if the complexity is layered well, it can be useful for users with a wide range of experience.

For my implementation I used [Tableau](https://www.tableau.com/), as it is one of the most commonly used tool for designing dashboards and it also supports embedded use. The average price of used apartments are shown based on they geographical location, grouped by year and settlement type. On the default view you see the average prices of the regions based on all types of settlement. You can use the slider to switch years and use the filter tool for if you’re interested in the average of a certain settlement type. To see average prices of new apartments, use the tab selection in the upper left corner.

<div class='tableauPlaceholder' id='viz1556539855220' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Hu&#47;HungarianApartmentPrices&#47;Used&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='views&#47;HungarianApartmentPrices&#47;Used?:embed=y&amp;:display_count=y' /> <param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Hu&#47;HungarianApartmentPrices&#47;Used&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /></object></div>                
<script type='text/javascript'>                    var divElement = document.getElementById('viz1556539855220');                    var vizElement = divElement.getElementsByTagName('object')[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width='1000px';vizElement.style.height='700px';} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width='1000px';vizElement.style.height='700px';} else { vizElement.style.width='100%';vizElement.style.height='1350px';}                     var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>

# Animations

A picture is worth a thousand words, as it’s commonly stated and data scientist have always utilized its power. In many cases images are far more efficient at conveying information than pure words, users even tend to skip regions of texts (no hard feelings), but images, and especially (interactive) animations draw attention. Static figures are the most concise, direct and portable way to communicate data and yet there is room for improvement. Now, that devices fit in our pocket carry huge computational power, using animation became just as accessible as images. Using them make the visualization memorable, they draw even more attention, and sometimes they tell a different story, than a simple figure.

<div class="flourish-embed" data-src="visualisation/325722"></div><script src="https://public.flourish.studio/resources/embed.js"></script>

<div class="flourish-embed" data-src="visualisation/327322"></div><script src="https://public.flourish.studio/resources/embed.js"></script>

<div class="flourish-embed" data-src="visualisation/327487"></div><script src="https://public.flourish.studio/resources/embed.js"></script>

For the animations above, I used [Flourish](https://flourish.studio/), which is a great tool for creating various figures and animations in little time, the embedding functionality is useful here as well. You can click play/replay to start the animation and click on the categories to show or hide the groups. It is especially useful in the Hans Rosling Chart at the bottom, hiding Budapest rescales the axes so you can discover more. If you're also interested in statistics of new apartement prices, I made the [barchart](https://app.flourish.studio/visualisation/325735/) and [detailed barchart](https://app.flourish.studio/visualisation/327391/) animation for that as well. The Hans Rosling Chart uses data for new and used apartments combined, as the dataset doesn't contain separated transaction data with geographic regions.

# Summary

A data scientist should be always aware the strengths and weaknesses of his/her tools and the modern ones, like dashboards and animations are no exceptions. Figures, animations and dashboards all have great potentials when they are used for the right tasks. Figures are concise, easy to interpret, they are the best way for stating a clear message. Animations draw attention, accessible on almost any mobile devices and makes a more unique experience. Dashboards are great for data exploration, but they demand a level of expertise and they are less portable than the others.

In this post I didn’t write my own conclusions and analysis on purpose, as I am more interested in your experience, discoveries and opinions on both the data and the tools designed. Please write your thoughts in the comments section below!

*Links:*
- [Hungarian Central Statistical Office - 2018 Q3 report](https://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.pdf)
- [Hungarian Central Statistical Office - 2018 Q3 tables](http://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.xls)
- [Tableau visualization tool](https://www.tableau.com/)
- [Flourish visualization tool](https://flourish.studio/)
