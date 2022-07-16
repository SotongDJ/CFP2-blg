# %%
import json
# %%
apple_list = [[k for k in n.splitlines() if k != str()] for n in open("data/ApplePodcast.md").read().split("\n----------\n")]
apple_dict = dict()
for line_list in apple_list[1:]:
    list_dict = dict()
    for line_str in line_list:
        if line_str[:2] == "##":
            split_list = line_str[:-1].replace("[","\t").replace("](","\t").split("\t")
            title_str = split_list[1]
            link_str = [n for n in split_list if "/id" in n and "?i=" in n][0]
            full_str = "id"+link_str.split("/id")[-1]
            parent_str, id_str = full_str.split("?i=")
            list_dict.update({
                "title": title_str,
                "link": link_str,
                "full_id": full_str,
                "parent_id": parent_str,
                "episode_id": id_str,
            })
        """
        if line_str[:2] == "> ":
            description_str = line_str[2:]
            list_dict["description"] = description_str
        if line_str[:12] == "- **DATE**: ":
            date_str = line_str[12:]
            list_dict["date"] = date_str.replace("年","-").replace("月","-").replace("日","")
        """
    # key_set = {"title","date","description"}
    key_set = {"title","link","full_id","parent_id","episode_id"}
    if set(list_dict.keys()) == key_set:
        apple_dict[id_str] = list_dict
    else:
        print(line_list)
with open("data/ApplePodcast.json",'w') as target_handler:
    json.dump(apple_dict,target_handler,indent=0)
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
