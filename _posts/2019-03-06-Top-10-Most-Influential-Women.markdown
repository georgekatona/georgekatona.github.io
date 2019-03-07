---
layout:     post
title:      Most Influential Women in Hollywood
author:     György Katona
tags: 		python visualization plotly pandas movies tv
subtitle:   Analysis on how pop culture influences our life and inspires women
img_preview:	"img/female_inspiration.jpg"
draft:	true
---

# Table of Contents

* TOC
{:toc}

I was thinking a lot about the topic of my first blog post, as I really wanted it to be something special, which represents me well and shows a snippet of my skillset at the same time. Having the International Women's Day just around the corner, I thought running an analysis on what and who inspires women the most would be really exciting. I could not help involving my other field of interest: I am going to investigate pop culture's impact through movies and TV shows.

# Data preparation

As I found the open governmental [data source](https://www.ssa.gov/oact/babynames/limits.html) of the babies' names born in the US between 1880 and 2017, I though what could be a better marker of impact that naming your own child after one of your heroes.

The annual birth data was in separate files, so in the first step I read them into a single dataframe.


```python
import os
import pandas as pd

def read_baby_names():
    names = pd.DataFrame(columns=["name", "gender", "count", "year"])
    for file in os.listdir("data/names"):
        if file.endswith(".txt"):
            df = pd.read_csv(os.path.join("./data/names", file), 
								header=None, 
								names=["name", "gender", "count"])
            df["year"] = int(file.replace("yob", "").replace(".txt", ""))
            names = names.append(df)
    return names

baby_names = read_baby_names()
baby_names.head()
```

| name      | gender | count | year |
|-----------|--------|-------|------|
| Mary      | F      | 7065  | 1880 |
| Anna      | F      | 2604  | 1880 |
| Emma      | F      | 2003  | 1880 |
| Elizabeth | F      | 1939  | 1880 |
| Minnie    | F      | 1746  | 1880 |


# Top rated movies

Given the birth data, I had to find a set of names of influential characters as candidates. Although IMDb doesn't provide an open API, I found [TMBd](https://www.themoviedb.org/) as an alternative for iterative search. It provides a daily updated "most popular" list of movies and TV shows, but it contains almost exclusively recent titles, which doesn't help our analysis of impact. On the other hand it also provides a list of top rated movies, critically successful titles usually have larger pop culture relevancy.

```python
import http.client
import json

def get_top_rated(media_type):
    conn = http.client.HTTPSConnection("api.themoviedb.org")

    conn.request("GET", "/3/{}/top_rated?page=1&language=en-US&api_key={}".format(media_type, API_KEY))

    raw_data = conn.getresponse().read()
    data = json.loads(raw_data.decode("utf-8"))

    top_rated = pd.DataFrame(columns=["id", "type", "title", "release_date"])
    for i in range(len(data["results"])):
        m = data["results"][i]
        top_rated.loc[i] = [m["id"], media_type, m["title"] if media_type == "movie" else m["name"],
                            m["release_date"] if media_type == "movie" else m["first_air_date"]]
    return top_rated

top_rated_movies = get_top_rated("movie")
top_rated_tv = get_top_rated("tv")
top_rated_titles = top_rated_movies.append(top_rated_tv)
```


After having top rated titles, I also used TMDb's API for getting the names of the top 2 cast members of both genders. Despite the final goal of analysis, I was interested in intermediate results of both genders.


```python
def get_top_characters(media, number_of_characters):
    conn = http.client.HTTPSConnection("api.themoviedb.org")
    conn.request("GET", "/3/{}/{}/credits?api_key={}".format(media["type"], media["id"], API_KEY))

    raw_data = conn.getresponse().read()
    cast = json.loads(raw_data.decode("utf-8"))["cast"]

    names = pd.DataFrame(columns=["title", "release_year", "first_name", "gender"])

    inserted = 0
    for i in range(len(cast)):
        c = cast[i]
        if "gender" not in c: continue
        c_gender = "F" if c["gender"] == 1 else "M"
        if len(names[names.gender == c_gender]) <= (number_of_characters - 1) / 2:
            c_name = c["character"]
            if not c_name: continue
           
            names.loc[inserted] = [media["title"], 
                                   media["release_date"][:4], 
                                   c_name.split()[0],
                                   c_gender]
            inserted += 1
        if inserted == number_of_characters:
            break
    return names


names_top_rated_titles = pd.DataFrame(columns=["title", "release_year", "first_name", "gender"])
for i in range(len(top_rated_titles)):
    names_top_rated_titles = names_top_rated_titles.append(get_top_characters(top_rated_titles.iloc[i], 4))
```


# Visualization

I used [Plotly](https://plot.ly/python/) library to visualize trends. Apart from the images shown below I link all interactive plots for the same query.


```python
import plotly.io as pio
import plotly.graph_objs as go

def plot_rising_names(names, baby_names, min_growth, following_years, title, output_file, 
						x_range=None, y_range=None):
    plot_data = []
    names = names[names.first_name.isin(baby_names.name)]

    for i in range(len(names)):
        name = names.iloc[i]
        name_trend = baby_names[baby_names.name == name.first_name]
        name_trend = name_trend[name_trend.gender == name.gender]
        name_trend = name_trend[name_trend.year.isin(
			range(int(name.release_year), int(name.release_year) + following_years))]
        if name_trend.empty: continue
    
        growth = name_trend["count"].max() / name_trend["count"].iloc[0]
        if growth < min_growth: continue
        
        plot_data.append(
                go.Scatter(
                    x=name_trend['year'],
                    y=name_trend['count'],
                    mode='lines',
                    name="{} ({})".format(name.first_name, name.title)
                )
            )
        
    layout = go.Layout(
        title=title,
        paper_bgcolor='rgb(255,255,255)',
        plot_bgcolor='rgb(229,229,229)',
        xaxis=dict(
            title='Year',
            gridcolor='rgb(255,255,255)',
            showgrid=True,
            showline=False,
            showticklabels=True,
            tickcolor='rgb(127,127,127)',
            ticks='outside',
            tickmode='linear',
            zeroline=False
        ),
        yaxis=dict(
            title='Number of Babies Named',
            gridcolor='rgb(255,255,255)',
            showgrid=True,
            showline=False,
            showticklabels=True,
            tickcolor='rgb(127,127,127)',
            ticks='outside',
            zeroline=True
        )
    )
    
    if x_range is not None:
        layout.xaxis.range = x_range
    if y_range is not None:
        layout.yaxis.range = y_range

    fig = go.Figure(data=plot_data, layout=layout)
    pio.write_image(fig, output_file, height=800, width=1200)

plot_rising_names(names = names_top_rated_titles,
                  baby_names=baby_names, 
                  min_growth=2.0,
                  following_years=10,
                  title="Names Growing Popularity in 10 Years After Movie/TV Release", 
                  output_file="images/rising_names_top_rated.png")
```


![rising_names_top_rated](https://georgekatona.com/img/female_inspiration/rising_names_top_rated.png)


In the figure above you see all the names which at least doubled their popularity in 10 years after their realease. All lines start from the year of release and shows the trend of the following 10 years. You find an interactive version of the plot [here](https://plot.ly/~george.katona/26/names-with-growing-popularity-in-10-years-after-movietv-release/). As the lines close to the x axis might seem irrelevant, I made a zoomed version to show a more detailed view of them.


```python
plot_rising_names(names = names_top_rated_titles,
                  baby_names=baby_names, 
                  min_growth=2.0,
                  following_years=10,
                  title="Names Growing Popularity in 10 Years After Movie/TV Release - Zoomed", 
                  output_file="images/rising_names_top_rated_zoomed.png",
                  y_range = [0, 400])
```


![rising_names_top_rated_zoomed](https://georgekatona.com/img/female_inspiration/rising_names_top_rated_zoomed.png)


# IMDb lists as candidates

As a first iteration, visualizing popular names from top rated movies worked well, but the average rating of a movie isn't necessarily the best predictor of pop culture significance. In the next step I exported [Top Pop Culture Films](https://www.imdb.com/list/ls002272292/) and [Top Pop Culture TV Shows](https://www.imdb.com/list/ls022768086/) lists from IMDb. Despite of these lists being highly subjective, they include so many films and TV shows that most of the relevant titles seem to be included.


```python
pop_culture_films = pd.read_csv("data/imdb_top_100_pop_culture_films.csv",encoding='ANSI')
pop_culture_tv = pd.read_csv("data/imdb_pop_culture_tv_shows.csv",encoding='ANSI')

pop_culture_imdb_df = pop_culture_tv.append(pop_culture_films)
```


After having the lists exported and read in, let's translate them to TMDb's format, so we can then iteratively search for their character names.


```python
import time

def get_tmdb_data(imdb_df):
    conn = http.client.HTTPSConnection("api.themoviedb.org")
    tmdb_titles = pd.DataFrame(columns=["id", "type", "title", "release_date"])
    for i in range(len(imdb_df)):
        imdb_item = imdb_df.iloc[i]
        conn.request("GET", "/3/find/{}?api_key={}&language=en-US&external_source=imdb_id".format(
			imdb_item["Const"], API_KEY))
        # TMDb API has a request rate limit 40 / 10 seconds
        time.sleep(0.25)
        
        raw_data = conn.getresponse().read()
        data = json.loads(raw_data.decode("utf-8"))
        
        if len(data["movie_results"]) > 0:
            media_type = "movie"
            m = data["movie_results"][0]
        elif len(data["tv_results"]) > 0:
            media_type = "tv"
            m = data["tv_results"][0]
        else: continue
        
        tmdb_titles.loc[i] = [m["id"], media_type, m["title"] if media_type == "movie" else m["name"],
                            m["release_date"] if media_type == "movie" else m["first_air_date"]]
    return tmdb_titles

pop_culture_titles = get_tmdb_data(pop_culture_imdb_df)

pop_culture_names = pd.DataFrame(columns=["title", "release_year", "first_name", "gender"])
for i in range(len(pop_culture_titles)):
    pop_culture_names = pop_culture_names.append(get_top_characters(pop_culture_titles.iloc[i], 4))
    time.sleep(0.25)

plot_rising_names(names = pop_culture_names,
                  baby_names=baby_names, 
                  min_growth=2.0,
                  following_years=10,
                  title="Names Growing Popularity from IMDb Lists", 
                  output_file="images/rising_names_imdb.png")
```

![rising_names_imdb](https://georgekatona.com/img/female_inspiration/rising_names_imdb.png)


Well, it is nice to have a lot of data to investigate, but it is also somewhat crowded. If you're interested in all of them, look at the interactive version right [here](https://plot.ly/~george.katona/28/names-with-growing-popularity-candidates-from-imdb-lists/). Otherwise let's sort it by the popularity growth rate and show only the top 10 results.

# Names with the highest growth of popularity

To find the names with the highest growth of popularity, I introduced a new column "max_growth". Doing so keeps a while, but then we can sort and make queries on it.


```python
def get_names_with_max_growth(names, baby_names, following_years):
    names = names[names.first_name.isin(baby_names.name)]
    
    names_with_max_growth = pd.DataFrame(
		columns=["title", "release_year", "first_name", "gender", "max_growth"])
    
    inserted = 0
    for i in range(len(names)):
        name = names.iloc[i]
        name_trend = baby_names[baby_names.name == name.first_name]
        name_trend = name_trend[name_trend.gender == name.gender]
        name_trend = name_trend[name_trend.year.isin(range(int(name.release_year), 
														int(name.release_year) + following_years))]
        if name_trend.empty: continue
        
        max_growth = name_trend["count"].max() / name_trend["count"].iloc[0]
        names_with_max_growth.loc[inserted] = [name["title"],
                                      name["release_year"],
                                      name["first_name"],
                                      name["gender"],
                                      max_growth]
        inserted += 1
    return names_with_max_growth

        
pop_culture_names_with_max_growth = get_names_with_max_growth(names=pop_culture_names, 
                                            baby_names=baby_names,
                                            following_years=10)
```


Now let's visualize the top 10 female names which gained the most popularity in 10 years after release.


```python
female_names = pop_culture_names_with_max_growth[pop_culture_names_with_max_growth.gender == "F"]

plot_rising_names(names = female_names.nlargest(10, "max_growth"),
                  baby_names=baby_names, 
                  min_growth=2.0,
                  following_years=10,
                  title="Top 10 Growing Female Names",
                  output_file="images/top_10_growing_female_names.png")
```


![top_10_growing_female_names](https://georgekatona.com/img/female_inspiration/top_10_growing_female_names.png)


The figure above implies that although there has been far less popular TV shows and movies before 1999, there has been some titles with huge impact. On the other hand it isn't very suprising that in the 21st century there are a lot of shows and movies with great popularity, as it has become so much easier to access our favorites. Let's focus now on the titles released after 1999.


```python
plot_rising_names(names = female_names[female_names.release_year > "1999"].nlargest(10, "max_growth"),
                  baby_names=baby_names, 
                  min_growth=2.0,
                  following_years=10,
                  title="Top 10 Growing Female Names in the 21st Century",
                  output_file="images/top_10_growing_female_names_2000.png")
```


![top_10_growing_female_names_2000](https://georgekatona.com/img/female_inspiration/top_10_growing_female_names_2000.png)


# Summary

Data shows us not only that we live in the best years so far to gain inspiration from female movie and TV characters, but also that what huge impact these shows have on our life. The world has never been so deeply connected and for this reason, the movie industry has never had greater responsibility of telling us stories which can really help us to become or raise our heroes.



*Links to interactive plots:*

- [Names with Growing Popularity - Full Detail](https://plot.ly/~george.katona/26/names-with-growing-popularity-in-10-years-after-movietv-release/)
- [Names with Growing Popularity [IMDb Lists]](https://plot.ly/~george.katona/28/names-with-growing-popularity-candidates-from-imdb-lists/)
- [Top 10 Growing Female Names](https://plot.ly/~george.katona/30/top-10-growing-female-names/)
- [Top 10 Growing Female Names in the 21st century](https://plot.ly/~george.katona/32/top-10-growing-female-names-in-the-21st-century/)