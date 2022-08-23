from bs4 import BeautifulSoup as bs
from PIL import Image
import tomlkit, requests, pathlib
print("Start collection")
result_dict = dict()
print("    ----")
print("    Start collection: Feed")
print("        Feed: grab rss feed")
rss_req = requests.get("https://feeds.buzzsprout.com/1974862.rss")
print("        Feed: convert XML and update dictionary")
rss_feed = bs(rss_req.text,"xml")
rss_dict = dict()
img_dict = dict()
img_str = rss_feed.find("image").url.contents[0]
img_size_list = [96,128,192,256,384,512]
for unit in rss_feed.find_all('item'):
    name = unit.title.contents[0]
    url = unit.enclosure['url']
    rss_dict[name] = url
    img_list = [ufa["href"] for ufa in unit.find_all('itunes:image')] + [img_str]
    img_filename = pathlib.Path(img_list[0]).name
    img_bool = (img_filename == "60854458c4d1acdf4e1c2f79c4137142d85d78e379bdafbd69bd34c85f5819ad.jpg")
    img_name = "cover.jpg" if img_bool else img_filename
    img_parent = "artwork" if img_bool else pathlib.Path(img_list[0]).parent.name
    img_dict[name] = F"{img_name}/{img_parent}"
    if not pathlib.Path(F"docs/p/{img_name}/{img_parent}/512.png").exists():
        cover_img_r = requests.get(img_list[0], stream=True)
        cover_img_r.raw.decode_content = True
        cover_img = Image.open(cover_img_r.raw)
        for img_size in img_size_list:
            pathlib.Path(F"docs/p/{img_name}/{img_parent}/").mkdir(parents=True,exist_ok=True)
            wpercent = (img_size / float(cover_img.size[0]))
            hsize = int((float(cover_img.size[1]) * float(wpercent)))
            cover_img_res = cover_img.resize((img_size, hsize), Image.Resampling.LANCZOS)
            cover_img_res.save(F"docs/p/{img_name}/{img_parent}/{img_size}.png")
result_dict["feed"] = rss_dict
with open("data/feedPodcast.xml","w") as xmlf:
    xmlf.write(rss_req.text)
with open("data/feedPodcast.toml","w") as tomlf:
    tomlkit.dump(rss_dict,tomlf)
with open("data/image.toml","w") as tomlf:
    tomlkit.dump(img_dict,tomlf)
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
print("    ----")
print("    Start collection: YouTube")
print("        Feed: grab rss feed")
youtube_req = requests.get("https://www.youtube.com/feeds/videos.xml?channel_id=UCD2KoUc0f4Bv2Bz0mbOah8g")
youtube_track = bs(youtube_req.text,"xml")
print("        Feed: convert XML and update dictionary")
if pathlib.Path("data/YouTube.toml").exists():
    youtube_doc = tomlkit.load(open("data/YouTube.toml"))
    youtube_record = {str(x):str(y) for x,y in youtube_doc.items()}
else:
    youtube_record = dict()
youtube_dict = dict()
for unit in youtube_track.find_all('entry'):
    name = unit.title.contents[0]
    url = unit.link['href']
    if name in youtube_record.keys():
        if youtube_record[name] != url:
            print("ERROR: Duplicate entry no consistent, value:", url, youtube_record[name])
    else:
        youtube_dict[name] = url
youtube_dict.update(youtube_record)
result_dict["youtube"] = youtube_dict
with open("data/YouTubeRequests.xml","w") as xmlf:
    xmlf.write(youtube_req.text)
with open("data/YouTube.toml","w") as tomlf:
    tomlkit.dump(youtube_dict,tomlf)
print("    Finish collection: YouTube")
#
print("    ----\nFinish collection")
with open("history.toml",'w') as target_handler:
    tomlkit.dump(result_dict,target_handler)
