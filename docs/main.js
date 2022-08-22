const tagIndexDOM = document.getElementById("tagindex");
const indexBarDOM = document.getElementById("indexbar");
const tagADOM = document.getElementById("tagA");
const tagIDOM = document.getElementById("tagI");
const sortADOM = document.getElementById("sortA");
const sortIDOM = document.getElementById("sortI");
const tagContentDOM = document.getElementById("tagcontent");
const tagBarDOM = document.getElementById("tagbar");
const playlistDOM = document.getElementById("playlist");
const playerDOM = document.getElementById("player");
const contentDOM = document.getElementById("contentdiv");
const storage = window.localStorage;
const faTagStr = "fa-solid fa-tag fa-fw";
var url = new URL(window.location.href);
var argueObj = new Object();
for (const [key, value] of url.searchParams.entries()) {
 if (value.includes(",")) {
  argueObj[key] = value.split(",");
 } else if (value != ""){
  argueObj[key] = [value];
 };
};
var argueKey = Object.keys(argueObj);
var option = {"key":[],"union":"false","sort":"neutral"};
for (var ark = 0; ark < argueKey.length; ++ark) {
 var key = argueKey[ark];
 if (Object.keys(option).includes(key)) {
  var value = argueObj[key];
  option[key] = value;
 };
};
storage.setItem("union", option["union"]);
storage.setItem("sort", option["sort"]);
function fontAwe(fontKey,fontID="") {
 var fontI = document.createElement('i');
 fontI.className = fontKey;
 if (fontID) {
  fontI.id = fontID;
 };
 return fontI;
};
function link(href,innerArr,jump = '',label = '') {
 let classArr = new Array();
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
function getArr(inputStr) {return inputStr ? inputStr.split(",") : new Array();};
var keyArr = compareLength(option['key'], getArr(storage.getItem('key')));
storage.setItem("key", keyArr.join(','));
function addTag(addStr) {
 var addKeyArr = getArr(storage.getItem('key'));
 if (!addKeyArr.includes(addStr)) {
  addKeyArr.push(addStr);
 };
 storage.setItem("key", addKeyArr.join(','));
 var targetDOM = document.getElementById(addStr);
 if (targetDOM) {
  var tagClassEachASpan = link("",[fontAwe(faTagStr)," "+addStr],'','tagBorder');
  tagClassEachASpan.id = addStr;
  targetDOM.replaceWith(tagClassEachASpan);
 };
 var tagClassArr = tag_class[addStr];
 if (tagClassArr) {
  for (let tcai = 0; tcai < tagClassArr.length; tcai++) {
   var textTagStr = tagClassArr[tcai]+addStr;
   var targetDOM = document.getElementById(textTagStr);
   if (targetDOM) {
    var tagClassEachASpan = link("",[fontAwe(faTagStr)," "+addStr],'','tagBorder');
    tagClassEachASpan.id = textTagStr;
    targetDOM.replaceWith(tagClassEachASpan);
   };
  };
 };
 draw();
};
function removeTag(removeStr) {
 var addKeyArr = getArr(storage.getItem('key'));
 var altKeyArr = new Array();
 for (let ka = 0; ka < addKeyArr.length; ka++) {
  if (addKeyArr[ka] != removeStr) {
    altKeyArr.push(addKeyArr[ka]);
  };
 };
 storage.setItem("key", altKeyArr.join(','));
 var addTagStr = "javascript: void(addTag(\""+removeStr+"\"))";
 var targetDOM = document.getElementById(removeStr);
 if (targetDOM) {
  var tagClassEachASpan = link(addTagStr,[fontAwe(faTagStr)," "+removeStr],'','tagBorder');
  tagClassEachASpan.id = removeStr;
  targetDOM.replaceWith(tagClassEachASpan);
 };
 var tagClassArr = tag_class[removeStr];
 if (tagClassArr) {
  for (let tcai = 0; tcai < tagClassArr.length; tcai++) {
   var textTagStr = tagClassArr[tcai]+removeStr;
   var targetDOM = document.getElementById(textTagStr);
   if (targetDOM) {
    var tagClassEachASpan = link(addTagStr,[fontAwe(faTagStr)," "+removeStr],'','tagBorder');
    tagClassEachASpan.id = textTagStr;
    targetDOM.replaceWith(tagClassEachASpan);
   };
  };
 };
 draw();
};
function fillIndex() {
 var drawKeyArr = getArr(storage.getItem('key'));
 indexBarDOM.innerText = "";
 var tagClassArr = Object.keys(class_tag);
 for (let tli = 0; tli < tagClassArr.length; tli++) {
  var tagClassP = document.createElement("div");
  var tagClassStr = tagClassArr[tli];
  if (tagClassStr[0] == "#") {
    var tagClassASpan = link("",[" "+tagClassStr],'','tagBorder');
    tagClassASpan.id = tagClassStr;
    tagClassP.appendChild(tagClassASpan);
    tagClassP.append("：");
  } else {
    var addTagStr = drawKeyArr.includes(tagClassStr) ? "" : "javascript: void(addTag(\""+tagClassStr+"\"))";
    tagClassASpan = link(addTagStr,[fontAwe(faTagStr)," "+tagClassStr],'','tagBorder');
    tagClassASpan.id = tagClassStr;
    tagClassP.appendChild(tagClassASpan);
    tagClassP.append("：");
  };
  tagClassP.className = "indexBar";
  var tagClassEachArr = class_tag[tagClassArr[tli]];
  for (let tcea = 0; tcea < tagClassEachArr.length; tcea++) {
   var textTagStr = tagClassEachArr[tcea];
   var addTagStr = drawKeyArr.includes(textTagStr) ? "" : "javascript: void(addTag(\""+textTagStr+"\"))";
   var tagClassEachASpan = link(addTagStr,[fontAwe(faTagStr)," "+textTagStr],'','tagBorder');
   tagClassEachASpan.id = tagClassArr[tli] + textTagStr;
   tagClassP.appendChild(tagClassEachASpan);
  };
  indexBarDOM.appendChild(tagClassP);
 };
};
function filter() {
 var sortStr = storage.getItem('sort');
 var filtered = new Array();
 var filterKeyArr = getArr(storage.getItem('key'));
 var playlistKeyArr = Object.keys(playlist);
 for (let nub = 0; nub < playlistKeyArr.length; nub++) {
  var filteredBool = (filterKeyArr.length == 0);
  // no filterKey (true) + "neutral" : newest first (true)
  // no filterKey (true) + "newest" : newest first (true)
  // no filterKey (true) + "oldest" : oldest first (false)
  // have filterKey (false) + "neutral" : oldest first (false)
  // have filterKey (false) + "newest" : newest first (true)
  // have filterKey (false) + "oldest" : oldest first (false)
  var sortKeyBool = filteredBool ? (sortStr != "oldest"): (sortStr == "newest");
  ord = sortKeyBool ? playlistKeyArr[nub] :playlistKeyArr[playlistKeyArr.length - nub - 1];
  if (!filteredBool) { // if filterKeyArr.length > 0
    filteredBool = (option['union'] == 'true');
   if (filteredBool) {
    for (let oki = 0; oki < filterKeyArr.length; oki++) {
     if (!playlist[ord]["tag"].includes(filterKeyArr[oki])) {filteredBool = false};
    };
   } else {
    for (let pot = 0; pot < playlist[ord]["tag"].length; pot++) {
     if (filterKeyArr.includes(playlist[ord]["tag"][pot])) {filteredBool = true};
    };
   };
  };
  if (filteredBool) {filtered.push(ord)};
 };
 storage.setItem('filtered',filtered.join(","))
};
function draw() {
 filter();
 tagBarDOM.innerText = "標籤：";
 var drawKeyArr = getArr(storage.getItem('key'));
 if (drawKeyArr.length > 0) {
  tagBarDOM.style = "";
  for (let oka = 0; oka < drawKeyArr.length; oka++) {
   removeTagStr = "javascript: void(removeTag(\""+drawKeyArr[oka]+"\"))";
   okaArr = [fontAwe(faTagStr)," "+drawKeyArr[oka]+" ",fontAwe("fa-solid fa-delete-left fa-fw")];
   tagBarDOM.appendChild(link(removeTagStr,okaArr,'','tagBorder'));
  };
 } else {
  tagBarDOM.style = "display: none;";
 };
 playlistDOM.innerHTML = "";
 var podObj = {};
 var filteredArr = getArr(storage.getItem('filtered'));;
 for (let nub = 0; nub < filteredArr.length; nub++) {
  var tar = filteredArr[nub];
  var entryPg = document.createElement('div');
  entryPg.id = "entry"+tar;
  entryPg.className = "entry";
  titleDiv = document.createElement("p");
  titleDiv.innerText = playlist[tar]['name'];
  entryPg.appendChild(titleDiv);
  var buttonDiv = document.createElement('p');
  buttonDiv.className = "buttonDiv";
  var playSpan = document.createElement('span');
  playSpan.className = "tagBorder";
  podObj[tar] = nub;
  var playIdArr = [fontAwe("fa-solid fa-play fa-fw",fontID="playIco"+tar)];
  playSpan.appendChild(link("javascript: void(goToPlay(\""+tar+"\"))",playIdArr));
  buttonDiv.appendChild(playSpan);
  var controlSpan = document.createElement('span');
  controlSpan.className = "tagBorder";
  controlSpan.appendChild(link(playlist[tar]["apple"],[fontAwe("fa-brands fa-apple fa-fw")],"podcast"));
  controlSpan.appendChild(link(playlist[tar]["google"],[fontAwe("fa-brands fa-google fa-fw")],"podcast"));
  controlSpan.appendChild(link(playlist[tar]["spotify"],[fontAwe("fa-brands fa-spotify fa-fw")],"podcast"));
  // controlSpan.appendChild(link(playlist[tar]["feed"],[fontAwe("fa-solid fa-download fa-fw")],"podcast"));
  buttonDiv.appendChild(controlSpan);
  var downloadSpan = document.createElement('span');
  downloadSpan.className = "tagBorder";
  downloadSpan.appendChild(link(playlist[tar]["feed"],[fontAwe("fa-solid fa-download fa-fw")],"podcast"));
  buttonDiv.appendChild(downloadSpan);
  for (let tagi = 0; tagi < playlist[tar]["tag"].length; tagi++) {
   var textTagStr = playlist[tar]["tag"][tagi];
   var addTagStr = drawKeyArr.includes(textTagStr) ? "" : "javascript: void(addTag(\""+textTagStr+"\"))";
   buttonDiv.appendChild(link(addTagStr,[fontAwe(faTagStr)," "+textTagStr],'','tagBorder'));
  }
  entryPg.appendChild(buttonDiv);
  playlistDOM.appendChild(entryPg);
  storage.setItem('podcast',JSON.stringify(podObj));
 };
 doQueue(storage.getItem('now'));
};
storage.setItem('now', "");
fillIndex();
draw();
async function doNext() {
 afterPause();
 var queueObj = JSON.parse(storage.getItem('queue')||"{}");
 var nowStr = storage.getItem('now');
 playerDOM.pause();
 var nextStr = queueObj[nowStr];
 if (nextStr) {doQueue(nextStr); await doPlay(nextStr);};
};
async function doPrev() {
 afterPause();
 var antiQueueObj = JSON.parse(storage.getItem('anti-queue')||"{}");
 var nowStr = storage.getItem('now');
 playerDOM.pause();
 var prevStr = antiQueueObj[nowStr];
 if (prevStr) {doQueue(prevStr); await doPlay(prevStr);};
};
function updatePositionState() {
navigator.mediaSession.setPositionState({
duration: playerDOM.duration,
playbackRate: playerDOM.playbackRate,
position: playerDOM.currentTime
});
};
function changeIcon(targetName,targetValue) {
 var icoDOM = document.getElementById(targetName);
 if (icoDOM) {icoDOM.className = targetValue};
};
function afterPause() {
 navigator.mediaSession.playbackState = 'paused';
 var nowStr = storage.getItem('now')||"";
 changeIcon("playIco"+nowStr,'fa-solid fa-play fa-fw');
};
function afterPlay() {
 navigator.mediaSession.playbackState = 'playing';
 var nowStr = storage.getItem('now')||"";
 changeIcon("playIco"+nowStr,'fa-solid fa-pause fa-fw');
};
function handleSeek(details) {
 const skipTime = details.seekOffset || 10;
 switch(details.action) {
  case "seekforward":
   playerDOM.currentTime = Math.min(playerDOM.currentTime + skipTime, playerDOM.duration);
   break;
  case "seekbackward":
   playerDOM.currentTime = Math.max(playerDOM.currentTime - skipTime, 0);
   break;
  case "seekto":
   playerDOM.currentTime = details.seekTime;
   break;
 };
 updatePositionState();
};
async function doPlay(inputStr) {
 afterPause();
 let nameStr = playlist[inputStr]['image'];
 playerDOM.src = playlist[inputStr]['feed'];
 storage.setItem('now', inputStr);
 await playerDOM.play();
 if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
   title: playlist[inputStr]['name'],
   artist: '百靈果 Podcast',
   album: playlist[inputStr]['tag'].join(" "),
   artwork: [
    { src: `/p/${nameStr}/96.png`,  sizes: '96x96',   type: 'image/png' },
    { src: `/p/${nameStr}/128.png`, sizes: '128x128', type: 'image/png' },
    { src: `/p/${nameStr}/192.png`, sizes: '192x192', type: 'image/png' },
    { src: `/p/${nameStr}/256.png`, sizes: '256x256', type: 'image/png' },
    { src: `/p/${nameStr}/384.png`, sizes: '384x384', type: 'image/png' },
    { src: `/p/${nameStr}/512.png`, sizes: '512x512', type: 'image/png' },
   ]
  });
  updatePositionState();
 };
};
function doQueue(inputStr) {
 var gpPodObj = JSON.parse(storage.getItem('podcast')||"{}");
 var gpPodArr = Object.keys(gpPodObj);
 var gpQueueObj = {};
 var gpAntiQueueObj = {};
 var inputBool = Object.keys(gpPodObj).includes(inputStr);
 if (!inputBool) {gpQueueObj[inputStr] = gpPodArr[0];};
 var targetInt = inputBool ? parseInt(gpPodObj[inputStr]): 0;
 for (let qa = targetInt; qa < gpPodArr.length - 1; qa++) {
  gpQueueObj[gpPodArr[qa]] = gpPodArr[qa+1];
 };
 if (targetInt) {
  for (let qa = 0; qa < targetInt; qa++) {
   gpAntiQueueObj[gpPodArr[qa+1]] = gpPodArr[qa];
  };
 };
 storage.setItem('queue',JSON.stringify(gpQueueObj));
 storage.setItem('anti-queue',JSON.stringify(gpAntiQueueObj));
};
async function goToPlay(targetStr) {
 afterPause();
 doQueue(targetStr);
 var nowStr = storage.getItem('now');
 if (nowStr === targetStr) {
  playerDOM.paused ? await playerDOM.play() : playerDOM.pause();
 } else {await doPlay(targetStr);};
};
playerDOM.addEventListener('play', afterPlay, false);
playerDOM.addEventListener('pause', afterPause, false);
playerDOM.addEventListener('ended', doNext, false);
const actionHandlers = [
['play',          async () => {await playerDOM.play();}],
['pause',         () => {playerDOM.pause();}],
['previoustrack', async () => {doPrev();}],
['nexttrack'    , async () => {doNext();}],
['stop'         , null], // () => { /* ... */ }],
['seekbackward' , (details) => {handleSeek(details);}],
['seekforward'  , (details) => {handleSeek(details);}],
['seekto'       , (details) => {handleSeek(details);}],
];
for (const [action, handler] of actionHandlers) {
 try {
  navigator.mediaSession.setActionHandler(action, handler);
 } catch (error) {
  console.log(`The media session action "${action}" is not supported yet.`);
 };
};
function toggleTag() {
 if (contentDOM.style['grid-template-rows'] == "min-content min-content 1fr min-content") {
  contentDOM.style['grid-template-rows'] = "min-content 1fr min-content 2fr min-content";
  tagIndexDOM.style ="";
  tagIDOM.className = "fa-solid fa-square-caret-up fa-fw";
  tagADOM.innerText = "隱藏標籤";
 } else {
  contentDOM.style['grid-template-rows'] = "min-content min-content 1fr min-content";
  tagIndexDOM.style['display'] = "none";
  tagIDOM.className = "fa-solid fa-square-caret-down fa-fw";
  tagADOM.innerText = "顯示標籤";
 };
};
function toggleSort() {
 const sortObj = {
  "neutral":{"text":"先舊後新", "fa":"fa-solid fa-sort-up fa-fw", "next":"oldest"},
  "oldest":{"text":"先新後舊", "fa":"fa-solid fa-sort-down fa-fw", "next":"newest"},
  "newest":{"text":"原始排序", "fa":"fa-solid fa-sort fa-fw", "next":"neutral"}
 };
 var sortStr = storage.getItem('sort');
 sortADOM.innerText = sortObj[sortStr]["text"];
 sortIDOM.className = sortObj[sortStr]["fa"];
 storage.setItem("sort", sortObj[sortStr]["next"]);
 draw();
};
function resizeDiv() {
 contentDOM.style["height"] = (window.visualViewport.height-20)+"px";
};
window.onresize = resizeDiv;
