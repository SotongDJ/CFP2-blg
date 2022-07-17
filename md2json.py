# %%
import json
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
    with open(F"{file_str}.json",'w') as target_handler:
        json.dump(podcast_dict,target_handler,indent=0)
    result_dict[podcast_str] = podcast_dict
# %%
