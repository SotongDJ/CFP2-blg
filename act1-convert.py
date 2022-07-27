from bs4 import BeautifulSoup as bs
import json, tomlkit, requests
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
    print(F"    Start collection: {podcast_str}")
    file_str = parameter_dict["file"]
    podcast_list = [[k for k in n.splitlines() if k != str()] for n in open(F"{file_str}.md").read().split("\n----------\n") if n != str()]
    podcast_dict = dict()
    podcast_own_dict = dict()
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
        title_str = list_dict["title"]
        link_str = list_dict["link"]
        if episode_str != str():
            if episode_str in podcast_own_dict.keys():
                print(F"duplicated podcast id: {episode_str}")
                print(json.dumps(podcast_own_dict[episode_str]))
                print(json.dumps(list_dict))
            else:
                podcast_own_dict[episode_str] = list_dict
                podcast_dict[title_str] = link_str
        else:
            print("No episode detail, original line:",line_list)
    podcast_doc = tomlkit.document()
    podcast_doc.update(podcast_own_dict)
    with open(F"{file_str}.toml",'w') as target_handler:
        tomlkit.dump(podcast_doc,target_handler)
    result_dict[podcast_str] = podcast_dict
    print(F"    Finish collection: {podcast_str}")
print("Finish collection")
with open("history.toml",'w') as target_handler:
    tomlkit.dump(result_dict,target_handler)
