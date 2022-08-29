const titleH1DOM = document.getElementById("titleH1");
const titleSpanDOM = document.getElementById("titleSpan");
const tagIndexDOM = document.getElementById("tagindex");
const indexBarDOM = document.getElementById("indexbar");
const unionSDOM = document.getElementById("unionSpan");
const tagADOM = document.getElementById("tagA");
const tagIDOM = document.getElementById("tagI");
const sortADOM = document.getElementById("sortA");
const sortIDOM = document.getElementById("sortI");
const tagContentDOM = document.getElementById("tagcontent");
const tagBarDOM = document.getElementById("tagbar");
const playlistDOM = document.getElementById("playlist");
const playerDOM = document.getElementById("player");
const popADOM = document.getElementById("popA");
const popPipDOM = document.getElementById("popPiP");
const canvasDOM = document.createElement('canvas');
const videoDOM = document.createElement('video');
const contentDOM = document.getElementById("contentdiv");
const storage = window.localStorage;
// fontawesome str
const faTagStr = "fa-solid fa-tag fa-fw";
const unionToggleOnStr = "fa-solid fa-toggle-on fa-fw";
const unionToggleOffStr = "fa-solid fa-toggle-off fa-fw";
const caretUpStr = "fa-solid fa-square-caret-up fa-fw";
const caretDownStr = "fa-solid fa-square-caret-down fa-fw";
// default parameter
const textSortObj = {
"neutral":{"text":"排序", "fa":"fa-solid fa-sort fa-fw"},
"oldest":{"text":"最舊", "fa":"fa-solid fa-sort-up fa-fw"},
"newest":{"text":"最新", "fa":"fa-solid fa-sort-down fa-fw"},
};
const nextSortObj = {
"neutral":"oldest",
"oldest":"newest",
"newest":"neutral",
};
const tagHideStr = "min-content min-content 1fr min-content";
const tagShowStr = "min-content 1fr min-content 2fr min-content";
// get option from url and save to local storage
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
(option["union"]=="false")||(option["union"]==storage.getItem("union")||storage.setItem("union", option["union"]));
(option["sort"]=="neutral")||(option["sort"]==storage.getItem("sort")||storage.setItem("sort", option["sort"]));
storage.getItem("union")||storage.setItem("union", option["union"]);
storage.getItem("sort")||storage.setItem("sort", option["sort"]);
// function to replace fontawesome key
function fontAwe(fontKey,fontID="") {
var fontI = document.createElement('i');
fontI.className = fontKey;
if (fontID) {fontI.id = fontID;};
return fontI;
};
// function to replace fontawesome key
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
if (!addKeyArr.includes(addStr)) {addKeyArr.push(addStr);};
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
 if (addKeyArr[ka] != removeStr) {altKeyArr.push(addKeyArr[ka]);};
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
 var addTagScriptStr = "javascript: void(addTag(\""+tagClassStr+"\"))";
 var addTagStr = drawKeyArr.includes(tagClassStr) ? "" : addTagScriptStr;
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
// no filterKey (true) + "neutral" : newest first (true)
// no filterKey (true) + "newest" : newest first (true)
// no filterKey (true) + "oldest" : oldest first (false)
// have filterKey (false) + "neutral" : oldest first (false)
// have filterKey (false) + "newest" : newest first (true)
// have filterKey (false) + "oldest" : oldest first (false)
for (let nub = 0; nub < playlistKeyArr.length; nub++) {
 var filteredBool = (filterKeyArr.length == 0);
 var sortKeyBool = filteredBool ? (sortStr != "oldest"): (sortStr == "newest");
 ord = sortKeyBool ? playlistKeyArr[nub] :playlistKeyArr[playlistKeyArr.length - nub - 1];
 if (filteredBool) {
    filtered.push(ord);
 } else{ // if filterKeyArr.length > 0
 if (storage.getItem('union') == 'true') {
  var unionBool = false;
  for (let pot = 0; pot < playlist[ord]["tag"].length; pot++) {
  // tag key include track tag, include
  if (filterKeyArr.includes(playlist[ord]["tag"][pot])) {unionBool = true;};
  };
  if (unionBool) {filtered.push(ord);};
 } else {
  var unionBool = true;
  for (let oki = 0; oki < filterKeyArr.length; oki++) {
  // track tag not include all tag key, reject
  if (!playlist[ord]["tag"].includes(filterKeyArr[oki])) {unionBool = false;};
  };
  if (unionBool) {filtered.push(ord);};
 };
 };
};
storage.setItem('filtered',filtered.join(","))
};

function draw() {
filter();
unionSDOM.innerHTML = "";
tagBarDOM.innerHTML = "";
var drawKeyArr = getArr(storage.getItem('key'));
if (drawKeyArr.length > 0) {
 tagBarDOM.style = "";
 tagBarDOM.append("已選擇的標籤：");
 if (drawKeyArr.length > 1) {
 var drawUnionStr = storage.getItem('union');
 var unionToggleBool = (drawUnionStr == "true");
 unionSDOM.appendChild(fontAwe(unionToggleBool?unionToggleOnStr:unionToggleOffStr));
 unionSDOM.append(" ");
 var unionA = document.createElement("a");
 unionA.append(unionToggleBool?"聯集":"交集");
 unionA.href = "javascript: void(toggleUnion())";
 unionSDOM.appendChild(unionA);
 };
 for (let oka = 0; oka < drawKeyArr.length; oka++) {
 var removeTagStr = "javascript: void(removeTag(\""+drawKeyArr[oka]+"\"))";
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
 controlSpan.appendChild(link(playlist[tar]["youtube"],[fontAwe("fa-brands fa-youtube fa-fw")],"podcast"));
 buttonDiv.appendChild(controlSpan);
//  var downloadSpan = document.createElement('span');
//  downloadSpan.className = "tagBorder";
//  downloadSpan.appendChild(link(playlist[tar]["feed"],[fontAwe("fa-solid fa-download fa-fw")],"podcast"));
//  buttonDiv.appendChild(downloadSpan);
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
updateSort();
draw();

async function doNext() {
afterPause();
var queueObj = JSON.parse(storage.getItem('queue')||"{}");
var nowStr = storage.getItem('now');
mixPause();
var nextStr = queueObj[nowStr];
if (nextStr) {doQueue(nextStr); await doPlay(nextStr);};
};

async function doPrev() {
afterPause();
var antiQueueObj = JSON.parse(storage.getItem('anti-queue')||"{}");
var nowStr = storage.getItem('now');
mixPause();
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

function seakBack(details) {
const skipTime = details.seekOffset || 10;
playerDOM.currentTime = Math.max(playerDOM.currentTime - skipTime, 0);
updatePositionState();
};

function seakForw(details) {
const skipTime = details.seekOffset || 10;
playerDOM.currentTime = Math.min(playerDOM.currentTime + skipTime, playerDOM.duration);
updatePositionState();
};

function seakGoTo(details) {
playerDOM.currentTime = details.seekTime;
updatePositionState();
};

async function doPlay(inputStr) {
afterPause();
let nameStr = playlist[inputStr]['image'];
playerDOM.src = playlist[inputStr]['feed'];
storage.setItem('now', inputStr);
if ("mediaSession" in navigator) {
 navigator.mediaSession.metadata = new MediaMetadata({
 title: playlist[inputStr]['name'],
 artist: '百靈果 Podcast',
 album: playlist[inputStr]['tag'].join(" "),
 artwork: [
 { src: `/p/${nameStr}/96.png`, sizes: '96x96', type: 'image/png' },
 { src: `/p/${nameStr}/128.png`, sizes: '128x128', type: 'image/png' },
 { src: `/p/${nameStr}/192.png`, sizes: '192x192', type: 'image/png' },
 { src: `/p/${nameStr}/256.png`, sizes: '256x256', type: 'image/png' },
 { src: `/p/${nameStr}/384.png`, sizes: '384x384', type: 'image/png' },
 { src: `/p/${nameStr}/512.png`, sizes: '512x512', type: 'image/png' },
 ]
});
await mixPlay();
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
 playerDOM.paused ? await mixPlay() : mixPause();
} else {
 await doPlay(targetStr);
};
};

playerDOM.addEventListener('play', afterPlay, false);
playerDOM.addEventListener('pause', afterPause, false);
playerDOM.addEventListener('ended', doNext, false);

videoDOM.addEventListener('play', () => {mixPlay()}, false);
videoDOM.addEventListener('pause', () => {mixPause()}, false);

const actionHandlers = [
['play' , async () => {mixPlay();}],
['pause' , () => {mixPause(); }],
['previoustrack', async () => {doPrev(); }],
['nexttrack' , async () => {doNext(); }],
['stop' , null ],
['seekbackward' , (details) => {seakBack(details); }],
['seekforward' , (details) => {seakForw(details); }],
['seekto' , (details) => {seakGoTo(details); }],
];

for (const [action, handler] of actionHandlers) {
try {
navigator.mediaSession.setActionHandler(action, handler);
} catch (error) {
console.log(`The media session action "${action}" is not supported yet.`);
};
};

canvasDOM.width = canvasDOM.height = 512;
videoDOM.muted = true;

async function doPiP() {
await updatePiP();
videoDOM.srcObject = canvasDOM.captureStream();
await videoDOM.play();
await videoDOM.requestPictureInPicture();
};

async function updatePiP() {
canvasDOM.getContext('2d').clearRect(0, 0, 512, 512);
let nameStr = playlist[storage.getItem('now')]['image'];
const image = new Image();
image.crossOrigin = true;
image.src = `/p/${nameStr}/512.png`;
await image.decode();
canvasDOM.getContext('2d').drawImage(image, 0, 0, 512, 512);
};

async function mixPlay() {
if (document.pictureInPictureEnabled){
let nameStr = playlist[storage.getItem('now')]['image'];
popPipDOM.style['background-image'] = `url("/p/${nameStr}/512.png")`;
popPipDOM.style["width"] = playerDOM.offsetHeight+"px";
popPipDOM.style["height"] = playerDOM.offsetHeight+"px";
popADOM.href = "javascript: void(doPiP())";
}
await playerDOM.play().then(async () => {
 if (document.pictureInPictureElement) {
 await updatePiP();
 if (videoDOM.paused) {await videoDOM.play()};
 };
});
};

async function mixPause() {
playerDOM.pause();
if (document.pictureInPictureElement) {
videoDOM.paused||videoDOM.pause();
};
};

function toggleTag() {
var toggleTagBool = (contentDOM.style['grid-template-rows'] == tagHideStr);
contentDOM.style['grid-template-rows'] = toggleTagBool?tagShowStr:tagHideStr;
tagIndexDOM.style = toggleTagBool?"":"display: none;";
tagIDOM.className = toggleTagBool?caretUpStr:caretDownStr;
// tagADOM.innerText = toggleTagBool?"隱藏標籤":"顯示標籤";
};

function updateSort() {
var nowSortStr = storage.getItem('sort');
sortADOM.innerText = textSortObj[nowSortStr]["text"];
sortIDOM.className = textSortObj[nowSortStr]["fa"];
};

function toggleSort() {
var nowSortStr = storage.getItem('sort');
var nextSortStr = nextSortObj[nowSortStr];
storage.setItem("sort", nextSortStr);
updateSort();
draw();
};

function toggleUnion() {
var nowUnionStr = storage.getItem('union');
var nextUnionStr = (nowUnionStr == "true") ? "false" : "true";
storage.setItem("union", nextUnionStr);
draw();
};

function resizeDiv() {
var titleAspan = document.createElement('a');
titleAspan.href = "https://www.bailingguonews.com/";
titleAspan.target = "info";
titleAspan.innerText = "百靈果";
var tumbSpan = document.createElement("span");
tumbSpan.innerText = "👌";
tumbSpan.style = "font-family: Noto Emoji";
titleH1DOM.innerHTML = "";
titleSpanDOM.innerHTML = "";
if (window.visualViewport.height > window.visualViewport.width) {
titleH1DOM.appendChild(tumbSpan);
titleH1DOM.append("非官方");
titleH1DOM.appendChild(titleAspan);
titleH1DOM.append("播放室");
} else {
titleSpanDOM.appendChild(tumbSpan);
titleSpanDOM.append("非官方");
titleSpanDOM.appendChild(titleAspan);
titleSpanDOM.append("播放室");
};
contentDOM.style["height"] = (window.visualViewport.height-20)+"px";
};
window.onresize = resizeDiv;
resizeDiv();
