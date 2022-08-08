from bs4 import BeautifulSoup as bs
import json, tomlkit, requests, pathlib
print("Start collection")
result_dict = dict()
print("    ----")
print("    Start collection: Feed")
print("        Feed: grab rss feed")
rss_req = requests.get("https://feeds.buzzsprout.com/1974862.rss")
print("        Feed: convert XML and update dictionary")
rss_feed = bs(rss_req.text,"xml")
rss_dict = dict()
for unit in rss_feed.find_all('item'):
    name = unit.title.contents[0]
    url = unit.enclosure['url']
    rss_dict[name] = url
result_dict["feed"] = rss_dict
with open("data/feedPodcast.xml","w") as xmlf:
    xmlf.write(rss_req.text)
with open("data/feedPodcast.toml","w") as tomlf:
    tomlkit.dump(rss_dict,tomlf)
print("    Finish collection: Feed")
#
print("    ----")
print("    Start collection: Apple")
print("        Feed: grab rss feed")
apple_req = requests.get("https://podcasts.apple.com/tw/podcast/%E7%99%BE%E9%9D%88%E6%9E%9C-news/id1106847606")
print("        Feed: convert HTML and update dictionary")
apple_track = bs(apple_req.text,"lxml").find('ol',{'class':'tracks tracks--linear-show'})
if pathlib.Path("data/ApplePodcast.toml").exists():
    apple_doc = tomlkit.load(open("data/ApplePodcast.toml"))
    apple_record = {str(x):str(y) for x,y in apple_doc.items()}
else:
    apple_record = dict()
apple_dict = dict()
for unit in apple_track.find_all('a',{"class":"link tracks__track__link--block"}):
    name_wt_hidden = unit.contents[0].replace(" &ZeroWidthSpace;","")
    name_single = name_wt_hidden.replace("\n","")
    name = " ".join([n for n in name_single.split(" ") if n != ""])
    url = unit['href']
    if name in apple_record.keys():
        if apple_record[name] != url:
            print("ERROR: Duplicate entry no consistent, value:", url, apple_record[name])
    else:
        apple_dict[name] = url
apple_dict.update(apple_record)
result_dict["apple"] = apple_dict
with open("data/ApplePodcastRequests.html","w") as xmlf:
    xmlf.write(apple_req.text)
with open("data/ApplePodcast.toml","w") as tomlf:
    tomlkit.dump(apple_dict,tomlf)
print("    Finish collection: Apple")
#
print("    ----")
print("    Start collection: Google")
print("        Feed: grab rss feed")
google_req = requests.get("https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5zb3VuZGNsb3VkLmNvbS91c2Vycy9zb3VuZGNsb3VkOnVzZXJzOjIyMTM2MTk4MC9zb3VuZHMucnNz")
google_track = bs(google_req.text,"lxml").find('div',{'jsname':'quCAxd'})
print("        Feed: convert HTML and update dictionary")
google_dict = dict()
for unit in google_track.find_all('a'):
    url = unit['href'].split("?sa=")[0].replace("./","https://podcasts.google.com/")
    name = unit.findChildren("div", {'class': 'e3ZUqe'})[0].contents[0]
    google_dict[name] = url
result_dict["google"] = google_dict
with open("data/GooglePodcastRequests.html","w") as xmlf:
    xmlf.write(google_req.text)
with open("data/GooglePodcast.toml","w") as tomlf:
    tomlkit.dump(google_dict,tomlf)
print("    Finish collection: Google")
#
print("    ----")
print("    Start collection: Spotify")
print("        Feed: grab rss feed")
spotify_req = requests.get("https://open.spotify.com/show/5Vv32KtHB3peVZ8TeacUty")
spotify_track = bs(spotify_req.text,"lxml").find("div",{"data-testid":"infinite-scroll-list"})
print("        Feed: convert HTML and update dictionary")
if pathlib.Path("data/SpotifyPodcast.toml").exists():
    spotify_doc = tomlkit.load(open("data/SpotifyPodcast.toml"))
    spotify_record = {str(x):str(y) for x,y in spotify_doc.items()}
else:
    spotify_record = dict()
spotify_dict = dict()
for unit in spotify_track.find_all('a'):
    url = "https://open.spotify.com"+unit['href']
    name = unit.findChildren('h4')[0].contents[-1].replace("\n","")
    if name in spotify_record.keys():
        if spotify_record[name] != url:
            print("ERROR: Duplicate entry no consistent, value:", url, spotify_record[name])
    else:
        spotify_dict[name] = url
spotify_dict.update(spotify_record)
result_dict["spotify"] = spotify_dict
with open("data/SpotifyPodcastRequests.html","w") as xmlf:
    xmlf.write(spotify_req.text)
with open("data/SpotifyPodcast.toml","w") as tomlf:
    tomlkit.dump(spotify_dict,tomlf)
print("    Finish collection: Spotify")
#
print("    ----\nFinish collection")
with open("history.toml",'w') as target_handler:
    tomlkit.dump(result_dict,target_handler)
