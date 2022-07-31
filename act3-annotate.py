import tomlkit
structure_doc = tomlkit.load(open("structure.toml"))
keyword_doc = tomlkit.load(open("keyword.toml"))
def check(input_str,exclude):
    include_list = list()
    exclude_list = list()
    for key_str in structure_doc.keys():
        if input_str in key_str:
            # print_str = F"{input_str} in {key_str}"
            exclude_bool = False
            for exclude_str in exclude:
                if exclude_str in key_str:
                    exclude_bool = True
            if exclude_bool:
                exclude_list.append(key_str)
            else:
                include_list.append(key_str)
    return include_list, exclude_list

for entry_name, entry_detail in keyword_doc.items():
    inclusive_collect_list = list()
    exclusive_collect_list = list()
    for inclusive_str in entry_detail['inclusive']:
        inclusive_list, exclusive_list = check(inclusive_str,entry_detail['exclusive'])
        inclusive_collect_list.extend([n for n in inclusive_list if n not in inclusive_collect_list])
        exclusive_collect_list.extend([n for n in exclusive_list if n not in exclusive_collect_list])
    if len(inclusive_collect_list) > 1:
        print(F"{entry_name} found in: ({len(inclusive_collect_list)})")
        print("  {}".format("\n  ".join(inclusive_collect_list)))
        print(F"Excluded: ({len(exclusive_collect_list)})")
        print("  {}\n".format("\n  ".join(exclusive_collect_list)))
    for episode_str in inclusive_collect_list:
        episode_table = structure_doc[episode_str]
        episode_tag_list = episode_table["tag"]
        episode_tag_list.append(entry_name)
        episode_table["tag"] = episode_tag_list
        structure_doc[episode_str] = episode_table
with open("annotation.toml",'w') as target_handler:
    tomlkit.dump(structure_doc,target_handler)
