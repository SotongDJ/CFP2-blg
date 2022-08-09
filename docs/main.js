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
function compareLength(aArr,bArr) {
 if (aArr.length > 0) {return aArr}; 
 if (bArr.length > 0) {return bArr}; 
 return bArr;
};
function getArr(inputStr) {return inputStr ? inputStr.split(",") : [];};
var keyArr = compareLength(option['key'], getArr(storage.getItem('key')));
storage.setItem("key", keyArr.join(','));
function addTag(addStr) {
 var addKeyArr = getArr(storage.getItem('key'));
 if (!addKeyArr.includes(addStr)) {
  addKeyArr.push(addStr);
 };
 storage.setItem("key", addKeyArr.join(','));
 draw();
};
function removeTag(removeStr) {
 var addKeyArr = getArr(storage.getItem('key'));
 var altKeyArr = [];
 for (let ka = 0; ka < addKeyArr.length; ka++) {
  if (addKeyArr[ka] != removeStr) {
    altKeyArr.push(addKeyArr[ka]);
  };
 };
 storage.setItem("key", altKeyArr.join(','));
 draw();
};
function filter() {
 var filterKeyArr = getArr(storage.getItem('key'));
 var filtered = [];
 if (filterKeyArr.length > 0) {
  var playlistKeyArr = Object.keys(playlist);
  for (let nub = 0; nub < playlistKeyArr.length; nub++) {
   ord = playlistKeyArr[playlistKeyArr.length - nub - 1];
   if (option['union'] == 'true') {
    var filteredBool = false;
    for (let pot = 0; pot < playlist[ord]["tag"].length; pot++) {
     if (filterKeyArr.includes(playlist[ord]["tag"][pot])) {filteredBool = true};
    };
   } else {
    var filteredBool = true;
    for (let oki = 0; oki < filterKeyArr.length; oki++) {
     if (!playlist[ord]["tag"].includes(filterKeyArr[oki])) {filteredBool = false};
    };
   };
   if (filteredBool) {filtered.push(ord)};
  };
 } else {
  filtered = Object.keys(playlist);
 };
 storage.setItem('filtered',filtered.join(","))
};
function draw() {
 filter();
 playlistDOM.innerHTML = "";
 tagBarDOM.innerText = "標籤 Tag: ";
 var drawKeyArr = getArr(storage.getItem('key'));
 if (drawKeyArr.length > 0) {
  tagBarDOM.style = "";
  for (let oka = 0; oka < drawKeyArr.length; oka++) {
   removeTagStr = "javascript: void(removeTag(\""+drawKeyArr[oka]+"\"))";
   okaArr = [fontAwe(faTagStr)," "+drawKeyArr[oka]+" ",fontAwe("fa-solid fa-delete-left")];
   tagBarDOM.appendChild(link(removeTagStr,okaArr,'','tagBorder'));
  };
 } else {
  tagBarDOM.style = "display: none;";
 };
 var files = [];
 var filteredArr = getArr(storage.getItem('filtered'));;
 for (let nub = 0; nub < filteredArr.length; nub++) {
  var tar = filteredArr[nub];
  var entryPg = document.createElement('div');
  entryPg.className = "entry";
  titleDiv = document.createElement("p");
  titleDiv.innerText = playlist[tar]['name'];
  entryPg.appendChild(titleDiv);
  var buttonDiv = document.createElement('p');
  buttonDiv.className = "buttonDiv";
  var playSpan = document.createElement('span');
  playSpan.className = "tagBorder";
  files.push(playlist[tar]['feed']);
  playSpan.appendChild(link("javascript: void(goToPlay("+nub+"))",[fontAwe("fa-solid fa-play")]));
  buttonDiv.appendChild(playSpan);
  var controlSpan = document.createElement('span');
  controlSpan.className = "tagBorder";
  controlSpan.appendChild(link(playlist[tar]["apple"],[fontAwe("fa-brands fa-apple")],"podcast"));
  controlSpan.appendChild(link(playlist[tar]["google"],[fontAwe("fa-brands fa-google")],"podcast"));
  controlSpan.appendChild(link(playlist[tar]["spotify"],[fontAwe("fa-brands fa-spotify")],"podcast"));
  controlSpan.appendChild(link(playlist[tar]["feed"],[fontAwe("fa-solid fa-download")],"podcast"));
  buttonDiv.appendChild(controlSpan);
  for (let tagi = 0; tagi < playlist[tar]["tag"].length; tagi++) {
   textTagStr = playlist[tar]["tag"][tagi];
   if (drawKeyArr.includes(textTagStr)) {
    addTagStr = "";
   } else {
    addTagStr = "javascript: void(addTag(\""+textTagStr+"\"))";
   };
   buttonDiv.appendChild(link(addTagStr,[fontAwe(faTagStr)," "+textTagStr],'','tagBorder'));  
  }
  entryPg.appendChild(buttonDiv);
  playlistDOM.appendChild(entryPg);
 };
};
draw();
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
