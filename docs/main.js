const tagBarDOM = document.getElementById("tagbar");
const playlistDOM = document.getElementById("playlist");
const playerDOM = document.getElementById("player");
const storeDOM = document.getElementById("store");
const contentDOM = document.getElementById("contentdiv");
const storage = window.localStorage;
const faTagStr = "fa-solid fa-tag";
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
var option = {"key":[],"union":"false"};
for (var ark = 0; ark < argueKey.length; ++ark) {
 var key = argueKey[ark];
 if (Object.keys(option).includes(key)) {
  var value = argueObj[key];
  option[key] = value;
 };
};
function fontAwe(fontKey) {
 var fontI = document.createElement('i');
 fontI.className = fontKey;
 return fontI;
};
function link(href,innerArr,jump = '',label = '') {
 let classArr = [];
 if (href == "") {
  var tag = document.createElement('span');
  classArr.push("hideBtn");
 } else {
  var tag = document.createElement('a');
  classArr.push("linkDecor");
  classArr.push("activeBtn");
  tag.href = href;
  if (jump) {tag.target = jump;};
 };
 if (label) {classArr.push(label);};
 for (let ia = 0; ia < innerArr.length; ia++) {
  if (typeof(innerArr[ia])=="string") {tag.append(innerArr[ia])};
  if (typeof(innerArr[ia])=="object") {tag.appendChild(innerArr[ia])};
 };
 tag.className = classArr.join(" ");
 return tag;
};
var keyArr = option['key'];
function addTag(addStr) {
 if (!keyArr.includes(addStr)) {
  keyArr.push(addStr);
 };
 window.location.href = base + "?key=" + keyArr.join(",");
};
function removeTag(removeStr) {
 var altkeyArr = [];
 for (let ka = 0; ka < keyArr.length; ka++) {
  if (keyArr[ka] != removeStr) {
    altkeyArr.push(keyArr[ka]);
  };
 };
 keyArr = altkeyArr;
 window.location.href = base + ((keyArr.length > 0) ? ("?key=" + keyArr.join(",")) : "");
};
var files = [];
var filtered = [];
if (keyArr.length > 0) {
 for (let nub = 0; nub < playlist.length; nub++) {
  ord = playlist.length - nub - 1;
  if (option['union'] == 'true') {
   var filteredBool = false;
   for (let pot = 0; pot < playlist[ord]["tag"].length; pot++) {
    if (keyArr.includes(playlist[ord]["tag"][pot])) {filteredBool = true};
   };
  } else {
   var filteredBool = true;
   for (let oki = 0; oki < keyArr.length; oki++) {
    if (!playlist[ord]["tag"].includes(keyArr[oki])) {filteredBool = false};
   };
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
 var playSpan = document.createElement('span');
 playSpan.className = "tagBorder";
 files.push(filtered[nub]['feed']);
 playSpan.appendChild(link("javascript: void(goToPlay("+nub+"))",[fontAwe("fa-solid fa-play")]));
 buttonDiv.appendChild(playSpan);
 var controlSpan = document.createElement('span');
 controlSpan.className = "tagBorder";
 controlSpan.appendChild(link(filtered[nub]["apple"],[fontAwe("fa-brands fa-apple")],"podcast"));
 controlSpan.appendChild(link(filtered[nub]["google"],[fontAwe("fa-brands fa-google")],"podcast"));
 controlSpan.appendChild(link(filtered[nub]["spotify"],[fontAwe("fa-brands fa-spotify")],"podcast"));
 controlSpan.appendChild(link(filtered[nub]["feed"],[fontAwe("fa-solid fa-download")],"podcast"));
 buttonDiv.appendChild(controlSpan);
 for (let tagi = 0; tagi < filtered[nub]["tag"].length; tagi++) {
  textTagStr = filtered[nub]["tag"][tagi];
  if (keyArr.includes(textTagStr)) {
   addTagStr = "";
  } else {
   addTagStr = "javascript: void(addTag(\""+textTagStr+"\"))";
  };
  buttonDiv.appendChild(link(addTagStr,[fontAwe(faTagStr)," "+textTagStr],'','tagBorder'));  
 }
 entryPg.appendChild(buttonDiv);
 playlistDOM.appendChild(entryPg);
};
if (keyArr.length > 0) {
 tagBarDOM.style = "";
 for (let oka = 0; oka < keyArr.length; oka++) {
  removeTagStr = "javascript: void(removeTag(\""+keyArr[oka]+"\"))";
  okaArr = [fontAwe(faTagStr)," "+keyArr[oka]+" ",fontAwe("fa-solid fa-delete-left")];
  tagBarDOM.appendChild(link(removeTagStr,okaArr,'','tagBorder'));
 };
};
function next() {
 var orderStr = storeDOM.innerText;
 var orderInt = parseInt(orderStr) + 1;
 if (orderInt < files.length) {
  playerDOM.src = files[orderInt];
  storeDOM.innerText = orderInt;
  playerDOM.play();
 };
};
function goToPlay(targetInt) {
 playerDOM.src = files[targetInt];
 storeDOM.innerText = targetInt;
 playerDOM.play();
};
playerDOM.addEventListener('ended', next, false);
function resizeDiv() {
 contentDOM.style["height"] = (window.visualViewport.height-20)+"px";
};
window.onresize = resizeDiv;
