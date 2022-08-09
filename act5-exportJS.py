import tomlkit, json
title_dict = tomlkit.load(open("annotation.toml"))

print("Export playlist.js for testing")
header_list = ["name", "apple", "google", "spotify", "feed"]
title_list = list()
for enum_int, value_dict in enumerate(title_dict.values()):
    value_inner_list = ["\"{}\": \"{}\"".format(header_str,value_dict.get(header_str,"")) for header_str in header_list]
    value_inner_str = "\"time{}\":".format(enum_int+1) + "{\n" + ",\n".join(value_inner_list)
    tag_list = value_dict.get("tag",list())
    category_list = (value_dict.get("category",list()))
    tag_list.extend(sorted(list(set(category_list))))
    value_inner_str = value_inner_str + ",\n\"tag\": {}".format(json.dumps(tag_list))
    title_list.append(value_inner_str)
outer_str = "const playlist = {\n"+"\n},\n".join(title_list)+"\n}\n};"
with open("docs/playlist.js",'w') as target_handler:
    target_handler.write(outer_str)
