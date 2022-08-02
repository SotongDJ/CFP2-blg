url = window.location.href;
if ((!url.includes("?"))) {
 base = url;
 search = "";
} else {
 urlArr = url.split("?");
 base = urlArr[0];
 if (urlArr.length<2) {
  search = "";
 } else {
  search = urlArr[1];
 };
};
argueArr = search.replace(/#/g,"&").split("&");
argueObj = {};
for (var ar = 0; ar < argueArr.length; ++ar) {
 if (argueArr[ar].includes("=")) {
  key = argueArr[ar].split("=")[0];
  value = decodeURIComponent(argueArr[ar].split("=")[1]);
  if (value.includes(",")) {
   argueObj[key] = value.split(",");
  } else if (value != ""){
   argueObj[key] = [value];
  };
 };
};
var argueKey = Object.keys(argueObj);
var option = {"key":[]};
for (var ark = 0; ark < argueKey.length; ++ark) {
 var key = argueKey[ark];
 if (Object.keys(option).includes(key)) {
  var value = argueObj[key];
  option[key] = value;
 };
};

function link(href,fontfront,inner,jump = '',label = '') {
 if (href == "") {
  var tag = document.createElement('span');
  tag.className = "linkMargin hideBtn";
 } else {
  var tag = document.createElement('a');
  tag.className = "linkMargin";
  tag.href = href;
  if (jump != "") { tag.target = jump; };
 };
 if (label != "") {
  tag.className = tag.className + " " + label;
 } else {
  tag.className = tag.className + " activeBtn";
 };
 if (fontfront != '') {
  var fontI = document.createElement('i');
  fontI.className = fontfront;
  tag.appendChild(fontI);
 };
 tag.innerHTML = tag.innerHTML + inner;
 return tag;
}
var files = [];
var playlist_dom = document.getElementById("playlist");
var filtered = [];
if (option['key'].length > 0) {
 for (let nub = 0; nub < playlist.length; nub++) {
  ord = playlist.length - nub - 1;
  var filteredBool = false;
  for (let pot = 0; pot < playlist[ord]["tag"].length; pot++) {
   if (option['key'].includes(playlist[ord]["tag"][pot])) {filteredBool = true};
  };
  if (filteredBool) {filtered.push(playlist[ord])};
 };
} else {
 filtered = playlist;
};

for (let nub = 0; nub < filtered.length; nub++) {
 var entryPg = document.createElement('div');
 entryPg.className = "entry";
 titleDiv = document.createElement("p");
 titleDiv.innerText = filtered[nub]['name'];
 entryPg.appendChild(titleDiv);
 var buttonDiv = document.createElement('p');
 buttonDiv.className = "buttonDiv";
 var controlSpan = document.createElement('span');
 controlSpan.className = "tagBorder";
 controlSpan.appendChild(link(filtered[nub]["apple"],"fa-brands fa-apple","","podcast"));
 controlSpan.appendChild(link(filtered[nub]["google"],"fa-brands fa-google","","podcast"));
 controlSpan.appendChild(link(filtered[nub]["spotify"],"fa-brands fa-spotify","","podcast"));
 controlSpan.appendChild(link(filtered[nub]["feed"],"fa-solid fa-download","","podcast"));
 files.push(filtered[nub]['feed']);
 controlSpan.appendChild(link("javascript: void(goToPlay("+nub+"))","fa-solid fa-play",""));
 buttonDiv.appendChild(controlSpan);
 for (let tagi = 0; tagi < filtered[nub]["tag"].length; tagi++) {
  tag_str = filtered[nub]["tag"][tagi];
  var keyArr = option['key'];
  if (keyArr.includes(tag_str)) {
   addTagStr = "";
  } else {
   addTagStr = "javascript: void(addTag(\""+tag_str+"\"))";
  };
  //buttonDiv.appendChild(link(addTagStr,"fa-solid fa-hashtag",tag_str,'','tagBorder'));  
  buttonDiv.appendChild(link(addTagStr,"fa-solid fa-tag"," "+tag_str,'','tagBorder'));  
 }
 entryPg.appendChild(buttonDiv);
 playlist_dom.appendChild(entryPg);
};
var tagBar_dom = document.getElementById("tagbar");
if (option['key'].length > 0) {
 tagBar_dom.style = "";
 for (let oka = 0; oka < option['key'].length; oka++) {
  removeTagStr = "javascript: void(removeTag(\""+option['key'][oka]+"\"))";
  //tagBar_dom.appendChild(link(removeTagStr,"fa-solid fa-hashtag",option['key'][oka],'','tagBorder'));
  tagBar_dom.appendChild(link(removeTagStr,"fa-solid fa-tag"," "+option['key'][oka],'','tagBorder'));
 };
};
var i = 0;
var player_dom = document.getElementById("player");
function next() {
 if (i === files.length - 1) { i = 0; } else { i++; };
 player_dom.src = files[i];
 player_dom.play();
};
function goToPlay(ti) {
 player_dom.src = files[ti];
 player_dom.play();
};
player_dom.addEventListener('ended', next, false);
function addTag(add_str) {
 var keyArr = option['key'];
 if (!keyArr.includes(add_str)) {
  keyArr.push(add_str);
 };
 window.location.href = base + "?key=" + keyArr.join(",");
};
function removeTag(removeStr) {
 var keyArr = [];
 for (let ka = 0; ka < option['key'].length; ka++) {
  if (option['key'][ka] != removeStr) {
   keyArr.push(option['key'][ka]);
  };
 };
 if (keyArr.length > 0) {    
  window.location.href = base + "?key=" + keyArr.join(",");
 } else {
  window.location.href = base;
 };
};
