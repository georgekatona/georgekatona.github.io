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

On the First of June, it is the Champions League Finals, Liverpool vs Tottenham, the first time two English teams play the finals since 2008. In the Premier League both teams qualified themself for the next seasons, but Liverpool also got really close to winning the title, finished only one point behind Manchester City. There has been no other team before losing the trophy with this many points (97), and the nightmare of the team - and its supporters - is that they could finish this wonderful season without winning any trophies. It is fair to say that Liverpool is the team under the higher pressure in the finals.

### Continuous Positive-Negative Scale

I am using the twitteR library to get the 1000 most recent English tweets containing the official hashtag of the team along with #UCLFinal. In order to analyse the text, first we have to clean it by removing links, punctuation, numbers emojis and special characters. The library  [sentimentr](https://github.com/trinker/sentimentr) is designed to take into account valence shifters like amplifiers and negators, which results in a more accurate sentiment score. This library returns not only the sentiment classes positive/negative for each tweet, but also it’s value. A higher sentiment value represent a stronger positive emotion in the post. The figure below shows the distribution of the sentiment values for the two teams.

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
      ylim = c(0, 800),
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
      ylim = c(0, 800),
      colour=I("black"),
      fill=I(tottenham_color))
```

![liv_tot_histo](https://georgekatona.com/img/finals/liv_tot_histo.png)
<p align="center">Figure 1: Histogram of the sentiment scores for Liverpool and Tottenham</p>

```
> summary(liv_sentiment$ave_sentiment)
   Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
 -1.255   0.000   0.000   0.126   0.250   0.900
> summary(tot_sentiment$ave_sentiment)
    Min.  1st Qu.   Median     Mean  3rd Qu.     Max.
-0.37889  0.00000  0.00000 -0.01251  0.00000  0.61968
```

### Multiple Discrete Emotions

With the library [syuzhet]() we can access multiple emotions (joy, fear, trust, etc.), but only its binary state, meaning that one twitter message can be categorized as expressing both joy and surprise, but we don’t get their extent. In Figure 2 you can see the emotions expressed by the tweets for each team.

![liv_tot_emotions](https://georgekatona.com/img/finals/liv_tot_emotions.png)
<p align="center">Figure 2: Emotions expressed by the tweets for each team</p>

To make comparison easier, I subtracted the relative presence of the emotions. Figure 3 shows us that Tottenham fans are expressing much more fear and anger, while Liverpool fans have more trust.

![sub_emotions_cl](https://georgekatona.com/img/finals/sub_emotions_cl.png)
<p align="center">Figure 3: Difference of sentiments</p>

With syuzhet we can also classify the tweets based on their positive or negative content (Figure 4).

![liv_tot_pos_neg](https://georgekatona.com/img/finals/liv_tot_pos_neg.png)
<p align="center">Figure 4: Discrete binary classification of the tweets</p>


### Word Clouds

To get an idea about the content of the tweets, we use word clouds (Figure 5).

![wordcloud_cl](https://georgekatona.com/img/finals/wordcloud_cl.png)
<p align="center">Figure 5: Word clouds for each teams</p>

# NBA

### Continuous Positive-Negative Scale


### Multiple Discrete Emotions


### Word Clouds


# Summary



*Links:*
- [Hungarian Central Statistical Office - 2018 Q3 report](https://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.pdf)
- [Hungarian Central Statistical Office - 2018 Q3 tables](http://www.ksh.hu/docs/hun/xftp/stattukor/lakaspiacar/lakaspiacar183.xls)
- [Tableau visualization tool](https://www.tableau.com/)
- [Flourish visualization tool](https://flourish.studio/)
