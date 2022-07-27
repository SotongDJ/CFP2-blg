# %%
import json
import tomlkit
# %%
config_dict = {
    "apple": {
        "parent-id": "/id", "id": "?i=",
        "prefix-parent": "id", "prefix-id": str(),
        "file": "data/ApplePodcast",
    },
    "google": {
        "parent-id": "/feed/", "id": "/episode/",
        "file": "data/GooglePodcast",
    },
    "spotify": {
        "parent-id": "/episode/",
        "file": "data/SpotifyPodcast",
    },
}
print("Start collection")
result_dict = dict()
print("    Start collection: Feed")
print("        Feed: grab rss feed")
req = requests.get("https://feeds.buzzsprout.com/1974862.rss")
print("        Feed: convert XML into python dictionary")
feed = bs(req.text,"xml")
output = dict()
for unit in feed.find_all('item'):
    name = unit.title.contents[0]
    url = unit.enclosure['url']
    output[name] = url
result_dict["feed"] = output
with open("data/feedPodcast.xml","w") as xmlf:
    xmlf.write(req.text)
with open("data/feedPodcast.toml","w") as tomlf:
    tomlkit.dump(output,tomlf)
print("    Finish collection: Feed")
for podcast_str, parameter_dict in config_dict.items():
    file_str = parameter_dict["file"]
    podcast_list = [[k for k in n.splitlines() if k != str()] for n in open(F"{file_str}.md").read().split("\n----------\n")]
    podcast_dict = dict()
    for line_list in podcast_list[1:]:
        list_dict = dict()
        for line_str in line_list:
            if line_str[:2] == "##":
                split_list = line_str[:-1].replace("[","\t").replace("](","\t").split("\t")
                list_dict["title"] = split_list[1]
                parent_id_split_str = parameter_dict["parent-id"]
                id_split_str = parameter_dict.get("id",str())
                list_dict["link"] = [n for n in split_list if parent_id_split_str in n and id_split_str in n][0]
                list_dict["full_id"] = parameter_dict.get("prefix-parent",str())+list_dict["link"].split(parent_id_split_str)[-1]
                if id_split_str == str():
                    list_dict["episode_id"] = list_dict["full_id"]
                else:
                    parent_str, pre_id_str = list_dict["full_id"].split(id_split_str)
                    id_str = parameter_dict.get("prefix-id",str())+pre_id_str
                    list_dict["parent_id"] = parent_str
                    list_dict["episode_id"] = id_str
        # key_set = {"title","date","description"}
        episode_str = list_dict.get("episode_id",str())
        if episode_str != str():
            if episode_str in podcast_dict.keys():
                print(F"duplicated podcast id: {episode_str}")
                print(json.dumps(podcast_dict[episode_str]))
                print(json.dumps(list_dict))
            else:
                podcast_dict[episode_str] = list_dict
        else:
            print(line_list)
    podcast_doc = tomlkit.document()
    podcast_doc.update(podcast_dict)
    with open(F"{file_str}.toml",'w') as target_handler:
        tomlkit.dump(podcast_doc,target_handler)
    result_dict[podcast_str] = podcast_dict
# %%
title_dict = dict()
# for podcast_str, podcast_dict in result_dict.items():
for podcast_str in ["google","spotify"]:
    podcast_dict = result_dict[podcast_str]
    podcast_title_dict = dict()
    for episode_dict in podcast_dict.values():
        title_str = episode_dict['title']
        link_str = episode_dict['link']
        if title_str in podcast_title_dict.keys():
            print(title_str)
            print(episode_dict)
            print(podcast_title_dict[title_str])
        else:
            podcast_title_dict[title_str] = link_str
    if title_dict == dict():
        for x,y in podcast_title_dict.items():
            title_dict[x] = {podcast_str:y}
    else:
        for x,y in podcast_title_dict.items():
            if x not in title_dict.keys():
                print(x)
            else:
                title_episode_dict = title_dict[x]
                title_episode_dict[podcast_str] = y
                title_dict[x] = title_episode_dict
# %%
annotation = tomlkit.document()
annotation.add(tomlkit.comment("Add your own tag to each episode"))
annotation.add(tomlkit.nl())
annotation["title"] = "tag record for each episode"

for title_str, link_dict in title_dict.items():
    episode = tomlkit.table()
    episode.update(link_dict)
    episode["tag"] = list()
    annotation[title_str] = episode

with open("config.toml",'w') as target_handler:
    tomlkit.dump(annotation,target_handler)
# %%
