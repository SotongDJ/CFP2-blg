import tomlkit, json
title_dict = tomlkit.load(open("annotation.toml"))
keyword_doc = tomlkit.load(open("keyword.toml"))

print("Export playlist.js for testing")
header_list = ["name", "apple", "google", "spotify", "feed"]
title_list = list()
for enum_int, value_dict in enumerate(title_dict.values()):
    value_inner_list = ["\"{}\": \"{}\"".format(header_str,value_dict.get(header_str,"")) for header_str in header_list]
    value_inner_str = "\"time{}\":".format(enum_int+1) + "{\n" + ",\n".join(value_inner_list)
    tag_list = value_dict.get("tag",list())
    category_list = [n for n in value_dict.get("category",list()) if n[0] != "#"]
    tag_list.extend(sorted(list(set(category_list))))
    value_inner_str = value_inner_str + ",\n\"tag\": {}".format(json.dumps(tag_list))
    title_list.append(value_inner_str)
outer_str = "const playlist = {\n"+"\n},\n".join(title_list)+"\n}\n};\n"
class_dict = dict()
for tag_name, entry_detail in keyword_doc.items():
    for category_name in entry_detail["category"]:
        category_list = class_dict.get(category_name,list())
        category_list.append(tag_name)
        class_dict[category_name] = category_list
class_list = list()
for category_name, category_list in class_dict.items():
    class_str = "\",\"".join(category_list)
    class_list.append("\"{}\": [\"{}\"]".format(category_name,class_str))
category_str = "const tag_class = {\n"+",\n".join(class_list)+"\n};\n"
with open("docs/playlist.js",'w') as target_handler:
    target_handler.write(outer_str)
    target_handler.write(category_str)
