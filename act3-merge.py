import tomlkit
result_doc = tomlkit.load(open("history.toml"))
image_doc = tomlkit.load(open("data/image.toml"))
def correct(input_str):
    replace_str = input_str.replace("\u200b","").replace("啦‍♂️、","啦🙅‍♂️、")
    output_str = " ".join([n for n in replace_str.split(" ") if n != ""])
    return output_str
title_dict = dict()
for podcast_str, podcast_dict in result_doc.items():
    for title_str,link_str in podcast_dict.items():
        correct_str = correct(title_str)
        title_episode_dict = title_dict.get(correct_str,dict())
        title_episode_dict['name'] = correct_str
        title_episode_dict[podcast_str] = link_str
        title_dict[correct_str] = title_episode_dict
for title_str,link_str in image_doc.items():
    correct_str = correct(title_str)
    title_episode_dict = title_dict.get(correct_str,dict())
    title_episode_dict["image"] = link_str
    title_dict[correct_str] = title_episode_dict
annotation = tomlkit.document()
annotation.add(tomlkit.comment("Add your own tag to each episode"))
annotation.add(tomlkit.nl())
for title_str, link_dict in title_dict.items():
    episode = tomlkit.table()
    episode.update(link_dict)
    episode["tag"] = list()
    episode["category"] = list()
    annotation[title_str] = episode
with open("structure.toml",'w') as target_handler:
    tomlkit.dump(annotation,target_handler)
