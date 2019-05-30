---
layout:     post
title:      Sentiment Analysis of Sport Fans just before the Upcoming Finals
author:     György Katona
tags: 		NLP R Sentiment-Analysis Text-Mining
subtitle:   Analysing emotions of the fan-bases before the upcoming Champions League and NBA Finals
img_preview:	"img/finals/cover.png"
draft:	true
---

* TOC
{:toc}

# Motivation
Sentiment Analysis is a form of text mining, which aims to mine opinion or related emotions from a textual data set. We can analyse the general tone of books, how it changes as the story develops[](), but it is possible to gather general public opinion about various topics by combining Natural Language Processing tools with data collected from the Social Media.

In this post I am using the language R with [sentimentr]() and [syuzhet]() NLP libraries to analyse the emotions of football and basketball fans before the biggest games of the year. I am using (twitteR)[] to gather the most recent Twitter posts then compare the results of the different dictionaries.

# Champions League

On the First of June, it is the Champions League Finals, Liverpool vs Tottenham, the first time two English teams play the finals since 2008. In the Premier League both teams qualified themself for the next seasons, but Liverpool also got really close to winning the title, finished only one point behind Manchester City. There has been no other team with this many points (97) losing the trophy before, and the nightmare of the team - and its supporters - is that they could finish this wonderful season without winning any trophies. It is fair to say that Liverpool is under the higher pressure in the finals.

### Continuous Positive-Negative Scale

I am using the twitteR library to get the 1000 most recent English tweets containing the official hashtag of the team along with #UCLFinal. In order to analyse the text, first we have to clean it by removing links, punctuation, numbers emojis and special characters. The library  [sentimentr](https://github.com/trinker/sentimentr) is designed to take into account valence shifters like amplifiers and negators, which results in a more accurate sentiment score. This library returns not only the sentiment classes positive/negative for every tweet, but also it’s value. A higher sentiment value represent a stronger positive emotion in the tweet. The figure below shows the distribution of the sentiment values for the two teams.

```
liv_search <- "#LFC+#UCLFinal"
liv_tweets <- searchTwitter(liv_search, n = 1000, lang = "en", resultType = "recent")
liv_tweet_texts <- f_clean_tweets(liv_tweets)
liv_sentiment <- sentiment_by(liv_tweet_texts)
qplot(liv_sentiment$ave_sentiment,
      geom="histogram",
      binwidth=0.1,
      main=paste(liv_search, "Sentiment Histogram", sep=" "),
      xlim = c(-0.9, 0.9),
      colour=I("black"),
      fill=I(liverpool_color))

tot_search <- "#COYS+#UCLFinal"
tot_tweets <- searchTwitter(tot_search, n = 1000, lang = "en", resultType = "recent")
tot_tweet_texts <- f_clean_tweets(tot_tweets)
tot_sentiment <- sentiment_by(tot_tweet_texts)
qplot(tot_sentiment$ave_sentiment,
      geom="histogram",
      binwidth=0.1,
      main=paste(tot_search, "Sentiment Histogram", sep=" "),
      xlim = c(-0.9, 0.9),
      colour=I("black"),
      fill=I(tottenham_color))
```

![liv_tot_histo](https://georgekatona.com/img/finals/liv_tot_histo.png)



### Discrete Emotions


### Word Clouds


# NBA

It's the game between...

### Continous Positive-Negative Scale


### Discrete Emotions


### Word Clouds


# Summary


*Links:*
- [Hungarian Central Statistical Office - 2018 Q3 report](https://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.pdf)
- [Hungarian Central Statistical Office - 2018 Q3 tables](http://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.xls)
- [Tableau visualization tool](https://www.tableau.com/)
- [Flourish visualization tool](https://flourish.studio/)
