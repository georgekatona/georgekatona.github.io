---
layout:     post
title:      Top 10 Most Influential Women in Pop Culture
author:     György Katona
tags: 		python visualization movies tv
subtitle:   Analysis on the impact of pop culture.12
img_preview:	"img/female_inspiration.jpg"
draft:	true
---

# Top 10 Most Influential Women in Pop Culture

I was thinking a lot about the topic of my first blog post, as I really wanted it to be something special, which represents me well and shows a snippet of my skillset at the same time. Having the International Women's Day just around the corner, I thought running an analysis on what and who inspires women the most would be really exciting. I could not help involving my other field of interest: I am going to investigate pop culture's impact through movies and TV shows.

### Data preparation

As I found the open governmental (data source)[https://www.ssa.gov/oact/babynames/limits.html] of the babies' names born in between 1880 and 2017, I though what could be a better marker of impact that naming your own child after one of your heroes.

Given the birth data, I had to find a set of names of influential characters as candidates. Although IMBb doesn't provide an open API, I found (TMBd)[https://www.themoviedb.org/] as an alternative for interative search. It provides a daily updated "most poopular" list of movies and TV shows, but it contains almost exclusively recent titles, which doesn't help our analysis of impact. On the other hand it also provides a list of top rated movies, critically successful titles usually have larger pop culture relevancy.

For security reasons I am going to show you the functions of api calls, but without the API key, I'll load the saved results from the final csv file.


```python
import http.client
import json
import pandas as pd
```


```python
def get_top_rated(media_type):
    conn = http.client.HTTPSConnection("api.themoviedb.org")

    payload = "{}"
    conn.request("GET", "/3/{}/top_rated?page=1&language=en-US&api_key={}".format(media_type, API_KEY), payload)

    res = conn.getresponse()
    raw_data = res.read()
    data = json.loads(raw_data.decode("utf-8"))

    top_rated = pd.DataFrame(columns=["id", "type", "title", "release_date"])
    for i in range(len(data["results"])):
        m = data["results"][i]
        top_rated.loc[i] = [m["id"], media_type, m["title"] if media_type == "movie" else m["name"],
                            m["release_date"] if media_type == "movie" else m["first_air_date"]]
    return top_rated

# top_rated_movies = get_top_rated("movie")
# top_rated_tv = get_top_rated("tv")
# top_rated_titles = top_rated_movies.append(top_rated_tv)

top_rated_titles = pd.read_csv("https://raw.githubusercontent.com/georgekatona/georgekatona.github.io/master/_data/naming_trends/top_rated_titles.txt")
top_rated_titles.head()

```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>id</th>
      <th>type</th>
      <th>title</th>
      <th>release_date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>19404</td>
      <td>movie</td>
      <td>Dilwale Dulhania Le Jayenge</td>
      <td>1995-10-20</td>
    </tr>
    <tr>
      <th>1</th>
      <td>278</td>
      <td>movie</td>
      <td>The Shawshank Redemption</td>
      <td>1994-09-23</td>
    </tr>
    <tr>
      <th>2</th>
      <td>238</td>
      <td>movie</td>
      <td>The Godfather</td>
      <td>1972-03-14</td>
    </tr>
    <tr>
      <th>3</th>
      <td>372058</td>
      <td>movie</td>
      <td>Your Name.</td>
      <td>2016-08-26</td>
    </tr>
    <tr>
      <th>4</th>
      <td>424</td>
      <td>movie</td>
      <td>Schindler's List</td>
      <td>1993-12-15</td>
    </tr>
  </tbody>
</table>
</div>



After having top rated titles, I also used the API for getting the names of the top 3 cast members of both genders. Despite the final goal of analysis, I was interested in intermediate results of both genders.


```python
def get_top_names_in(media):
    conn = http.client.HTTPSConnection("api.themoviedb.org")

    payload = "{}"
    conn.request("GET", "/3/{}/{}/credits?api_key={}".format(media["type"], media["id"], API_KEY), payload)

    res = conn.getresponse()
    raw_data = res.read()
    cast = json.loads(raw_data.decode("utf-8"))["cast"]

    names = pd.DataFrame(columns=["media_id", "media_type", "character_name", "actor_name", "gender", "order"])

    inserted = 0
    for i in range(len(cast)):
        c = cast[i]
        c_gender = "F" if c["gender"] == 1 else "M"
        if len(names[names.gender == c_gender]) < 3:
            names.loc[inserted] = [media["id"], media["type"], c["character"], c["name"],
                                   "F" if c["gender"] == 1 else "M", int(c["order"]) + 1]
            inserted += 1
        if inserted == 6:
            break
    return names

# names_of_top_rated = pd.DataFrame(columns=["media_id", "media_type", "character_name", "actor_name", "gender", "order"])
# for i in range(len(top_rated_titles)):
#     names_of_top_rated = names_of_top_rated.append(get_top_names_in(top_rated_titles.iloc[i]))

names_of_top_rated = pd.read_csv("https://raw.githubusercontent.com/georgekatona/georgekatona.github.io/master/_data/naming_trends/names_of_top_rated.txt")
names_of_top_rated.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>media_id</th>
      <th>media_type</th>
      <th>character_name</th>
      <th>actor_name</th>
      <th>gender</th>
      <th>order</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>19404</td>
      <td>movie</td>
      <td>Raj Malhotra</td>
      <td>Shah Rukh Khan</td>
      <td>M</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>19404</td>
      <td>movie</td>
      <td>Simran Singh</td>
      <td>Kajol</td>
      <td>F</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>19404</td>
      <td>movie</td>
      <td>Chaudhry Baldev Singh</td>
      <td>Amrish Puri</td>
      <td>M</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>19404</td>
      <td>movie</td>
      <td>Dharamvir Malhotra</td>
      <td>Anupam Kher</td>
      <td>M</td>
      <td>5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>19404</td>
      <td>movie</td>
      <td>Simran's Grandmother</td>
      <td>Achala Sachdev</td>
      <td>F</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>

