const tagBarDOM = document.getElementById("tagbar");
const playlistDOM = document.getElementById("playlist");
const playerDOM = document.getElementById("player");
const storeDOM = document.getElementById("store");
const contentDOM = document.getElementById("contentdiv");
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
function link(href,fontfront,inner,jump = '',label = '') {
 if (href == "") {
  var tag = document.createElement('span');
  tag.className = "linkDecor hideBtn";
 } else {
  var tag = document.createElement('a');
  tag.className = "linkDecor";
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
};
function addTag(addStr) {
 var keyArr = option['key'];
 if (!keyArr.includes(addStr)) {
  keyArr.push(addStr);
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
var files = [];
var filtered = [];
if (option['key'].length > 0) {
 for (let nub = 0; nub < playlist.length; nub++) {
  ord = playlist.length - nub - 1;
  if (option['union'] == 'true') {
   var filteredBool = false;
   for (let pot = 0; pot < playlist[ord]["tag"].length; pot++) {
    if (option['key'].includes(playlist[ord]["tag"][pot])) {filteredBool = true};
   };
  } else {
   var filteredBool = true;
   for (let oki = 0; oki < option['key'].length; oki++) {
    if (!playlist[ord]["tag"].includes(option['key'][oki])) {filteredBool = false};
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
 playSpan.appendChild(link("javascript: void(goToPlay("+nub+"))","fa-solid fa-play",""));
 buttonDiv.appendChild(playSpan);
 var controlSpan = document.createElement('span');
 controlSpan.className = "tagBorder";
 controlSpan.appendChild(link(filtered[nub]["apple"],"fa-brands fa-apple","","podcast"));
 controlSpan.appendChild(link(filtered[nub]["google"],"fa-brands fa-google","","podcast"));
 controlSpan.appendChild(link(filtered[nub]["spotify"],"fa-brands fa-spotify","","podcast"));
 controlSpan.appendChild(link(filtered[nub]["feed"],"fa-solid fa-download","","podcast"));
 buttonDiv.appendChild(controlSpan);
 for (let tagi = 0; tagi < filtered[nub]["tag"].length; tagi++) {
  textTagStr = filtered[nub]["tag"][tagi];
  var keyArr = option['key'];
  if (keyArr.includes(textTagStr)) {
   addTagStr = "";
  } else {
   addTagStr = "javascript: void(addTag(\""+textTagStr+"\"))";
  };
  buttonDiv.appendChild(link(addTagStr,faTagStr," "+textTagStr,'','tagBorder'));  
 }
 entryPg.appendChild(buttonDiv);
 playlistDOM.appendChild(entryPg);
};
if (option['key'].length > 0) {
 tagBarDOM.style = "";
 for (let oka = 0; oka < option['key'].length; oka++) {
  removeTagStr = "javascript: void(removeTag(\""+option['key'][oka]+"\"))";
  okaStr = " "+option['key'][oka]
  tagBarDOM.appendChild(link(removeTagStr,faTagStr,okaStr,'','tagBorder'));
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
