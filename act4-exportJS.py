import tomlkit, json
title_dict = tomlkit.load(open("annotation.toml"))

print("Export playlist.js for testing")
header_list = ["name", "apple", "google", "spotify", "feed"]
title_list = list()
for value_dict in title_dict.values():
    value_inner_str = ",\n".join(["\"{}\": \"{}\"".format(header_str,value_dict.get(header_str,"")) for header_str in header_list])
    value_inner_str = value_inner_str + ",\n\"tag\": {}".format(json.dumps(value_dict.get("tag",list())))
    title_list.append(value_inner_str)
outer_str = "var playlist = [\n{\n"+"\n},\n{\n".join(title_list)+"\n}\n];"
with open("docs/playlist.js",'w') as target_handler:
    target_handler.write(outer_str)
