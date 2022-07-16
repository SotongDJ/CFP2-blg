# %%
import json
# %%
config_dict = {
    "apple": {
        "parent-id": "/id", "id": "?i=",
        "prefix-parent": "id", "prefix-id": str(),
        "file": "data/ApplePodcast",
    },
}
result_dict = dict()
# %%
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
        if list_dict.get("episode_id",str()) != str():
            if list_dict.get("episode_id",str()) in podcast_dict.keys():
                print(F"duplicated podcast id: {id_str}")
                print(json.dumps(podcast_dict[id_str]))
                print(json.dumps(list_dict))
            else:
                podcast_dict[id_str] = list_dict
        else:
            print(line_list)
    with open(F"{file_str}.json",'w') as target_handler:
        json.dump(podcast_dict,target_handler,indent=0)
    result_dict[podcast_str] = podcast_dict
# %%
google_list = [[k for k in n.splitlines() if k != str()] for n in open("data/GooglePodcast.md").read().split("\n----------\n")]
google_dict = dict()
for line_list in google_list[1:]:
    list_dict = dict()
    for line_str in line_list:
        if line_str[:2] == "##":
            split_list = line_str.replace("[","\t").replace("](","\t").replace(")","\t").split("\t")
            title_str = split_list[1]
            link_str = [n for n in split_list if "/feed/" in n and "/episode/" in n][0]
            full_str = link_str.split("/feed/")[-1]
            parent_str, id_str = full_str.split("/episode/")
            list_dict.update({
                "title": title_str,
                "link": link_str,
                "full_id": full_str,
                "parent_id": parent_str,
                "episode_id": id_str,
            })
    key_set = {"title","link","full_id","parent_id","episode_id"}
    if set(list_dict.keys()) == key_set:
        google_dict[id_str] = list_dict
    else:
        print(line_list)
with open("data/GooglePodcast.json",'w') as target_handler:
    json.dump(google_dict,target_handler,indent=0)
# %%
spotify_list = [[k for k in n.splitlines() if k != str()] for n in open("data/SpotifyPodcast.md").read().split("\n----------\n")]
spotify_dict = dict()
for line_list in spotify_list[1:]:
    list_dict = dict()
    for line_str in line_list:
        if line_str[:2] == "##":
            split_list = line_str.replace("[","\t").replace("](","\t").replace(")","\t").split("\t")
            title_str = split_list[1]
            link_str = [n for n in split_list if "/episode/" in n][0]
            full_str = "id"+link_str.split("/episode/")[-1]
            list_dict.update({
                "title": title_str,
                "link": link_str,
                "full_id": full_str,
                "episode_id": full_str,
            })
    key_set = {"title","link","full_id","episode_id"}
    if set(list_dict.keys()) == key_set:
        spotify_dict[full_str] = list_dict
    else:
        print(line_list)
with open("data/SpotifyPodcast.json",'w') as target_handler:
    json.dump(spotify_dict,target_handler,indent=0)
# %%
