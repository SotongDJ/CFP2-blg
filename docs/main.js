const titleH1DOM = document.getElementById("titleH1");
const titleSpanDOM = document.getElementById("titleSpan");
const tagIndexDOM = document.getElementById("tagindex");
const indexBarDOM = document.getElementById("indexbar");
const unionSDOM = document.getElementById("unionSpan");
const tagADOM = document.getElementById("tagA");
const tagIDOM = document.getElementById("tagI");
const sortADOM = document.getElementById("sortA");
const sortIDOM = document.getElementById("sortI");
const moreIDOM = document.getElementById("moreI");
const colourIDOM = document.getElementById("colourI");
const colourADOM = document.getElementById("colourA");
const contraIDOM = document.getElementById("contraI");
const contraADOM = document.getElementById("contraA");
const tagBarDOM = document.getElementById("tagbar");
const tagListDOM = document.getElementById("taglist");
const shareRsDivDOM = document.getElementById("shareResultDiv");
const shareRsADOM = document.getElementById("shareResultA");
const shareTagDOM = document.getElementById("shareTag");
const shareEpiDOM = document.getElementById("shareEpi");
const shareCutDOM = document.getElementById("shareCuT");
const tagSpanDOM = document.getElementById("tagSpan");
const cuTSpanDOM = document.getElementById("cuTSpan");
const shareContentDOM = document.getElementById("share_content");
const tagNoteDOM = document.getElementById("tagnote");
const trackTitleDOM = document.getElementById("tracktitle");
const morePageDOM = document.getElementById("morePage");
const epiListDOM = document.getElementById("playlistContain");
const playlistDOM = document.getElementById("playlist");
const detailPgDOM = document.getElementById("detailContain");
const playerDOM = document.getElementById("player");
const playerBarDOM = document.getElementById("playerbar");
const playBTN = document.getElementById("playBtn");
const pauseBTN = document.getElementById("pauseBtn");
const seekerDOM = document.getElementById("seeker");
const currentDOM = document.getElementById("currentTime");
const sliderDOM = document.getElementById("slider");
const totalDOM = document.getElementById("totalTimer");
const popADOM = document.getElementById("popA");
const popPipDOM = document.getElementById("popPiP");
const canvasDOM = document.createElement('canvas');
const videoDOM = document.createElement('video');
const contentDOM = document.getElementById("contentdiv");
const storage = window.localStorage;
// fontawesome str
const faTagStr = "fa-solid fa-tag fa-fw";
const selectedStr = "fa-solid fa-circle-check fa-fw";
const playingStr = "fa-solid fa-circle-play fa-fw"; // fa-spin fa-fw";
const pausedStr = "fa-solid fa-circle-pause fa-fw";
const stopStr = "fa-solid fa-circle-stop fa-fw";
const unionToggleOnStr = "fa-solid fa-toggle-on fa-fw";
const unionToggleOffStr = "fa-solid fa-toggle-off fa-fw";
const tagUpStr = "fa-solid fa-square-caret-up fa-fw";
const tagDownStr = "fa-solid fa-square-caret-down fa-fw";
const moreUpStr = "fa-solid fa-square-minus fa-fw";
const moreDownStr = "fa-solid fa-square-plus fa-fw";
const sortFaStr = "fa-solid fa-sort fa-fw";
const sortUpStr = "fa-solid fa-sort-up fa-fw";
const sortDownStr = "fa-solid fa-sort-down fa-fw";
const contrastOnStr = "fa-solid fa-circle-half-stroke fa-fw";
const contrastOffStr = "fa-solid fa-circle-half-stroke fa-fw fa-flip-horizontal";
const neutralColourStr = "fa-solid fa-cloud fa-fw";
const lightColourStr = "fa-solid fa-sun fa-fw";
const darkColourStr = "fa-solid fa-moon fa-fw";
// default parameter
const sectionObj = {
"titlebar":{"pos":0,"dom":titleH1DOM,"on":"min-content"},
"more_option":{"pos":1,"dom":morePageDOM,"on":"1fr"},
"tags_list":{"pos":2,"dom":tagIndexDOM,"on":"1fr"},
"selected_tags":{"pos":3,"dom":tagBarDOM,"on":"min-content"},
"episodes_list":{"pos":4,"dom":epiListDOM,"on":"1fr"},
"episode_detail":{"pos":5,"dom":detailPgDOM,"on":"1fr"},
"player":{"pos":6,"dom":playerBarDOM,"on":"min-content"},
"audio":{"pos":7,"dom":playerDOM,"on":"0px"}
};
const themeObj = {"colour":0,"contrast":1};
const paramObj = {
"sort":{
"neutral":{"text":"排序","class":sortFaStr,"next":"oldest"},
"oldest":{"text":"最舊","class":sortUpStr,"next":"newest"},
"newest":{"text":"最新","class":sortDownStr,"next":"neutral"},
},
"colour":{
"position":0,
"neutral":{"text":"預設晝夜","class":neutralColourStr,"next":"light"},
"light":{"text":"白晝主題","class":lightColourStr,"next":"dark"},
"dark":{"text":"黑夜主題","class":darkColourStr,"next":"neutral"},
},
"contrast":{
"position":1,
"lowContrast":{"text":"低對比度","class":contrastOffStr,"next":"highContrast"},
"highContrast":{"text":"高對比度","class":contrastOnStr,"next":"lowContrast"},
},
};
// get option from url and save to local storage
var url = new URL(window.location.href);
var argueObj = new Object();
for (const [key,value] of url.searchParams.entries()) {
if (value.includes(",")) {
valueOriArr = value.split(",");
valueArr = Array();
for (let i = 0; i < valueOriArr.length; i++) {
(valueOriArr[i]=="")||valueArr.push(valueOriArr[i]);
}
argueObj[key] = valueArr;
} else if (value != "") {
argueObj[key] = [value];
};
};
var argueKey = Object.keys(argueObj);
var defaultObj = {"key":[],"now":"","currentTS":"","union":"false","sort":"neutral","colour":"neutral","contrast":"lowContrast"};
var optionObj = {"key":[],"now":"","currentTS":"","union":"false","sort":"neutral","colour":"neutral","contrast":"lowContrast"};
var optionKey = Object.keys(optionObj);
for (var ark = 0; ark < argueKey.length; ++ark) {
var key = argueKey[ark];
if (optionKey.includes(key)) {
var value = argueObj[key];
optionObj[key] = (key=="key")?value:value[0];
};
};
((optionObj["now"]!="")&&(optionObj["currentTS"]=="")&&storage.getItem("currentTS"))&&storage.setItem("currentTS","");
for (var opt = 0; opt < optionKey.length; ++opt) {
var key = optionKey[opt];
if (argueObj["do"]&&argueObj["do"][0]=="reset") {
optionObj[key]=defaultObj[key];
storage.setItem(key,optionObj[key]);
} else {
var optionValue = (key=="key")?optionObj[key].join(","):optionObj[key];
var defaultValue = (key=="key")?"":defaultObj[key];
(optionValue==defaultValue)?((storage.getItem(key))||storage.setItem(key,optionValue)):storage.setItem(key,optionValue);
};
};
(argueObj["do"])&&(argueObj["do"][0]=="reset")&&(window.location.href="/");
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

function getArr(inputStr) {return inputStr?inputStr.split(","):new Array();};
var keyArr = compareLength(optionObj['key'],getArr(storage.getItem('key')));
storage.setItem("key",keyArr.join(","));

function addTag(addStr) {
var addKeyArr = getArr(storage.getItem('key'));
if (!addKeyArr.includes(addStr)) {addKeyArr.push(addStr);};
storage.setItem("key",addKeyArr.join(","));
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
storage.setItem("key",altKeyArr.join(","));
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
var addTagStr = drawKeyArr.includes(tagClassStr)?"":addTagScriptStr;
tagClassASpan = link(addTagStr,[fontAwe(faTagStr)," "+tagClassStr],'','tagBorder');
tagClassASpan.id = tagClassStr;
tagClassP.appendChild(tagClassASpan);
tagClassP.append("：");
};
tagClassP.className = "indexBar";
var tagClassEachArr = class_tag[tagClassArr[tli]];
for (let tcea = 0; tcea < tagClassEachArr.length; tcea++) {
var textTagStr = tagClassEachArr[tcea];
var addTagStr = drawKeyArr.includes(textTagStr)?"":"javascript: void(addTag(\""+textTagStr+"\"))";
var tagClassEachASpan = link(addTagStr,[fontAwe(faTagStr)," "+textTagStr],'','tagBorder');
tagClassEachASpan.id = tagClassArr[tli]+textTagStr;
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
// no filterKey (true) + "neutral":newest first (true)
// no filterKey (true) + "newest":newest first (true)
// no filterKey (true) + "oldest":oldest first (false)
// have filterKey (false) + "neutral":oldest first (false)
// have filterKey (false) + "newest":newest first (true)
// have filterKey (false) + "oldest":oldest first (false)
for (let nub = 0; nub < playlistKeyArr.length; nub++) {
var filteredBool = (filterKeyArr.length == 0);
var sortKeyBool = filteredBool?(sortStr != "oldest"):(sortStr == "newest");
ord = sortKeyBool?playlistKeyArr[nub] :playlistKeyArr[playlistKeyArr.length - nub - 1];
if (filteredBool) {
filtered.push(ord);
} else { // if filterKeyArr.length > 0
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
tagListDOM.innerHTML = "";
var drawKeyArr = getArr(storage.getItem('key'));
if (drawKeyArr.length > 0) {
toggleLayout("selected_tags","on")
shareTagDOM.style["display"] = "block";
tagSpanDOM.innerText = "（"+drawKeyArr.join("、")+"）";
if (drawKeyArr.length > 1) {
tagNoteDOM.innerText = "：";
var drawUnionStr = storage.getItem('union');
var unionToggleBool = (drawUnionStr == "true");
unionSDOM.appendChild(fontAwe(unionToggleBool?unionToggleOnStr:unionToggleOffStr));
unionSDOM.append(" ");
var unionA = document.createElement("a");
unionA.append(unionToggleBool?"聯集":"交集");
unionA.href = "javascript: void(toggleUnion())";
unionSDOM.appendChild(unionA);
} else {
tagNoteDOM.innerHTML = "";
tagNoteDOM.appendChild(fontAwe(faTagStr));
tagNoteDOM.append(" 已選：");
};
for (let oka = 0; oka < drawKeyArr.length; oka++) {
var removeTagStr = "javascript: void(removeTag(\""+drawKeyArr[oka]+"\"))";
okaArr = [fontAwe(faTagStr)," "+drawKeyArr[oka]+" ",fontAwe("fa-solid fa-delete-left fa-fw")];
tagListDOM.appendChild(link(removeTagStr,okaArr,'','tagBorder'));
};
} else {
toggleLayout("selected_tags","off")
shareTagDOM.style["display"] = "none";
tagSpanDOM.innerText = "";
};
playlistDOM.innerHTML = "";
var podObj = {};
var nowStr = storage.getItem('now');
var storedArr = getArr(storage.getItem('filtered'));
var filteredArr = (nowStr&&!storedArr.includes(nowStr))?[nowStr].concat(storedArr):storedArr;
for (let nub = 0; nub < filteredArr.length; nub++) {
var tar = filteredArr[nub];
var entryPg = document.createElement('div');
entryPg.id = "entry"+tar;
entryPg.className = "entry";
var popDetailStr = "javascript: void(popDetail(\""+tar+"\"))";
var titlePdom = document.createElement("p");
titlePdom.className = "titletrack";
// titlePdom.innerText = playlist[tar]['name'];
var titleAdom = document.createElement("a");
titleAdom.innerText = playlist[tar]['name'];
titleAdom.href = popDetailStr;
// titleAdom.append(" ");
// titleAdom.appendChild(fontAwe("fa-solid fa-circle-info fa-fw"));
titlePdom.appendChild(titleAdom);
entryPg.appendChild(titlePdom);
var buttonPdom = document.createElement('p');
buttonPdom.className = "buttonPdom";
var playSpan = document.createElement('span');
playSpan.className = "tagBorder";
podObj[tar] = nub;
var playIdArr = [fontAwe("fa-solid fa-play fa-fw",fontID="playIco"+tar)];
playSpan.appendChild(link("javascript: void(goToPlay(\""+tar+"\"))",playIdArr));
buttonPdom.appendChild(playSpan);
var controlSpan = document.createElement('span');
controlSpan.className = "tagBorder";
controlSpan.appendChild(link(playlist[tar]["apple"],[fontAwe("fa-brands fa-apple fa-fw")],"podcast"));
controlSpan.appendChild(link(playlist[tar]["google"],[fontAwe("fa-brands fa-google fa-fw")],"podcast"));
controlSpan.appendChild(link(playlist[tar]["spotify"],[fontAwe("fa-brands fa-spotify fa-fw")],"podcast"));
controlSpan.appendChild(link(playlist[tar]["youtube"],[fontAwe("fa-brands fa-youtube fa-fw")],"podcast"));
buttonPdom.appendChild(controlSpan);
var shareSpan = document.createElement('span');
shareSpan.className = "tagBorder";
var shareStr = "javascript: void(shareNow(0,\""+tar+"\"))";
shareSpan.appendChild(link(popDetailStr,[fontAwe(faTagStr)],"","tagBtn"));
shareSpan.appendChild(link(popDetailStr,[fontAwe("fa-solid fa-circle-info fa-fw")]));
shareSpan.appendChild(link(shareStr,[fontAwe("fa-solid fa-share-from-square fa-fw")]));
buttonPdom.appendChild(shareSpan);
// var tagsSpan = document.createElement('span');
// tagsSpan.className = "tagBorder tagBtn";
// tagsSpan.appendChild(link(popDetailStr,[fontAwe(faTagStr)]));
// buttonPdom.appendChild(tagsSpan);
var tagsListSpan = document.createElement('span');
tagsListSpan.className = "tagList";
for (let tagi = 0; tagi < playlist[tar]["tag"].length; tagi++) {
var textTagStr = playlist[tar]["tag"][tagi];
var addTagStr = drawKeyArr.includes(textTagStr)?"":"javascript: void(addTag(\""+textTagStr+"\"))";
tagsListSpan.appendChild(link(addTagStr,[fontAwe(faTagStr)," "+textTagStr],'','tagBorder'));
}
buttonPdom.appendChild(tagsListSpan);
entryPg.appendChild(buttonPdom);
playlistDOM.appendChild(entryPg);
storage.setItem('podcast',JSON.stringify(podObj));
};
doQueue(storage.getItem('now'));
};

(storage.getItem("now")=="")||initPlay(storage.getItem("now"));
fillIndex();
updateBtn("sort",sortADOM,sortIDOM);
updateTheme("colour");
updateBtn("colour",colourADOM,colourIDOM);
updateTheme("contrast");
updateBtn("contrast",contraADOM,contraIDOM);
draw();

async function doNext() {
afterPause();
var queueObj = JSON.parse(storage.getItem('queue')||"{}");
var nowStr = storage.getItem('now');
mixPause();
var nextStr = queueObj[nowStr];
if (nextStr) {
doQueue(nextStr);
await doPlay(nextStr);
} else {
afterStop();
};
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
if (navigator.mediaSession.metadata) {
navigator.mediaSession.setPositionState({
duration:playerDOM.duration,
playbackRate:playerDOM.playbackRate,
position:playerDOM.currentTime
});
};
storage.setItem("currentTS",playerDOM.currentTime.toString())
};

function changeIcon(targetName,targetValue) {
var icoDOM = document.getElementById(targetName);
if (icoDOM) {icoDOM.className = targetValue};
};

function afterPause() {
navigator.mediaSession.playbackState = 'paused';
var nowStr = storage.getItem('now')||"";
changeIcon("playIco"+nowStr,'fa-solid fa-play fa-fw');
if (nowStr!="") {
trackTitleDOM.innerHTML = "";
trackTitleDOM.appendChild(fontAwe(pausedStr));
trackTitleDOM.append(" 暫停：");
trackTitleDOM.append(playlist[nowStr]['name']);
shareEpiDOM.style["display"] = "block";
shareCutDOM.style["display"] = "block";
};
playBTN.style["display"] = "block";
pauseBTN.style["display"] = "none";
};
function afterStop() {
trackTitleDOM.innerHTML = "";
trackTitleDOM.appendChild(fontAwe(stopStr));
trackTitleDOM.append(" 播放完成：請點選任意集數開始播放");
shareEpiDOM.style["display"] = "none";
shareCutDOM.style["display"] = "none";
};
function afterPlay() {
navigator.mediaSession.playbackState = 'playing';
var nowStr = storage.getItem('now')||"";
changeIcon("playIco"+nowStr,'fa-solid fa-pause fa-fw');
var nowDOM = document.getElementById("entry"+nowStr);
if (nowDOM) {nowDOM.scrollIntoView({ behavior:'smooth' })};
if (nowStr!="") {
trackTitleDOM.innerHTML = "";
trackTitleDOM.appendChild(fontAwe(playingStr));
trackTitleDOM.append(" 播放：");
trackTitleDOM.append(playlist[nowStr]['name']);
shareEpiDOM.style["display"] = "block";
shareCutDOM.style["display"] = "block";
};
playBTN.style["display"] = "none";
pauseBTN.style["display"] = "block";
let nameStr = playlist[storage.getItem('now')]['image'];
popPipDOM.style['background-image'] = `url("https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/512.png")`;
navigator.mediaSession.metadata = new MediaMetadata({
title:playlist[storage.getItem('now')]['name'],
artist:'百靈果 News',
album:playlist[storage.getItem('now')]['tag'].join(" "),
artwork:[
{ src:`https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/96.png`,sizes:'96x96',type:'image/png' },
{ src:`https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/128.png`,sizes:'128x128',type:'image/png' },
{ src:`https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/192.png`,sizes:'192x192',type:'image/png' },
{ src:`https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/256.png`,sizes:'256x256',type:'image/png' },
{ src:`https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/384.png`,sizes:'384x384',type:'image/png' },
{ src:`https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/512.png`,sizes:'512x512',type:'image/png' },
]
});
};

function seakBack(details) {
const skipTime = details.seekOffset || 10;
playerDOM.currentTime = Math.max(playerDOM.currentTime - skipTime,0);
};
function seakForw(details) {
const skipTime = details.seekOffset || 10;
playerDOM.currentTime = Math.min(playerDOM.currentTime+skipTime,playerDOM.duration);
};
function seakGoTo(details) {playerDOM.currentTime = details.seekTime;};
function jumpTo() {(storage.getItem("currentTS")=="")||(playerDOM.currentTime = storage.getItem("currentTS"))};

async function doPlay(inputStr) {
initPlay(inputStr);
storage.setItem('currentTS',"");
await mixPlay();
};

function initPlay(inputStr) {
playerDOM.src = playlist[inputStr]['feed'];
storage.setItem('now',inputStr);
trackTitleDOM.innerHTML = "";
trackTitleDOM.appendChild(fontAwe(selectedStr));
trackTitleDOM.append(" 已選：");
trackTitleDOM.append(playlist[inputStr]['name']);
var nowDOM = document.getElementById("entry"+inputStr);
if (nowDOM) {nowDOM.scrollIntoView({ behavior:'smooth' })};
};

function doQueue(inputStr) {
var gpPodObj = JSON.parse(storage.getItem('podcast')||"{}");
var gpPodArr = Object.keys(gpPodObj);
var gpQueueObj = {};
var gpAntiQueueObj = {};
var inputBool = Object.keys(gpPodObj).includes(inputStr);
if (!inputBool) {gpQueueObj[inputStr] = gpPodArr[0];};
var targetInt = inputBool?parseInt(gpPodObj[inputStr]):0;
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
playerDOM.paused?await mixPlay():mixPause();
} else {
await doPlay(targetStr);
};
};

function convertTimer(inputSeconds) {
var seconds = Math.floor(inputSeconds % 60);
if (seconds < 10) {seconds = "0"+seconds};
var minutes = Math.floor(inputSeconds / 60);
return minutes+":"+seconds;
};

playerDOM.addEventListener('play',afterPlay,false);
playerDOM.addEventListener('pause',afterPause,false);
playerDOM.addEventListener('ended',doNext,false);
playerDOM.addEventListener('loadedmetadata',function() {
totalDOM.innerHTML = convertTimer(playerDOM.duration);
if(storage.getItem("currentTS")) {
currentDOM.innerHTML = convertTimer(storage.getItem("currentTS"))
} else {
currentDOM.innerHTML = convertTimer(playerDOM.currentTime);
};
cuTSpanDOM.innerText = "（"+convertTimer(playerDOM.currentTime)+"）";
sliderDOM.max= playerDOM.duration;
sliderDOM.setAttribute("value",playerDOM.currentTime);
});
playerDOM.addEventListener('timeupdate',function() {
currentDOM.innerText = convertTimer(playerDOM.currentTime);
cuTSpanDOM.innerText = "（"+convertTimer(playerDOM.currentTime)+"）";
sliderDOM.value = playerDOM.currentTime;
sliderDOM.setAttribute("value",playerDOM.currentTime);
updatePositionState();
});
sliderDOM.addEventListener("change",function () {
playerDOM.currentTime = sliderDOM.value;
updatePositionState();
});

videoDOM.addEventListener('play',() => {mixPlay()},false);
videoDOM.addEventListener('pause',() => {mixPause()},false);

const actionHandlers = [
['play' ,async () => {mixPlay();}],
['pause' ,() => {mixPause(); }],
['previoustrack',async () => {doPrev(); }],
['nexttrack' ,async () => {doNext(); }],
['stop' ,null ],
['seekbackward' ,(details) => {seakBack(details); }],
['seekforward' ,(details) => {seakForw(details); }],
['seekto' ,(details) => {seakGoTo(details); }],
];

canvasDOM.width = canvasDOM.height = 512;
videoDOM.muted = true;

async function doPiP() {
await updatePiP();
videoDOM.srcObject = canvasDOM.captureStream();
await videoDOM.play();
await videoDOM.requestPictureInPicture();
};

async function updatePiP() {
canvasDOM.getContext('2d').clearRect(0,0,512,512);
let nameStr = playlist[storage.getItem('now')]['image'];
const image = new Image();
image.crossOrigin = true;
image.src = `https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/512.png`;
await image.decode();
canvasDOM.getContext('2d').drawImage(image,0,0,512,512);
};

async function mixPlay() {
let nowStr = storage.getItem('now');
let nameStr = playlist[nowStr]['image'];
popPipDOM.style['background-image'] = `url("https://xn--2os22eixx6na.xn--kpry57d/CFP2/p/${nameStr}/512.png")`;
if (document.pictureInPictureEnabled) {popADOM.href = "javascript: void(doPiP())";};
var playPromise = playerDOM.play();
if (playPromise !== undefined) {
playPromise.then(_ => {
if (document.pictureInPictureElement&&(!window.matchMedia('(display-mode: standalone)').matches)) {
updatePiP();
if (videoDOM.paused) {videoDOM.play()};
};
jumpTo();
for (const [action,handler] of actionHandlers) {
try {
navigator.mediaSession.setActionHandler(action,handler);
} catch (error) {
console.log(`The media session action "${action}" is not supported yet.`);
};
};
}).catch(error => {
mixPause();
setTimeout(() => {
console.error(error);
mixPlay();
},"2000")
});
};
};

async function mixPause() {
playerDOM.pause();
if (document.pictureInPictureElement) {
if (!videoDOM.paused) {videoDOM.pause()};
};
};

function toggleLayout(sectionStr,modeStr) {
var positionInt = sectionObj[sectionStr]["pos"];
var targetDOM = sectionObj[sectionStr]["dom"];
var onStr = sectionObj[sectionStr]["on"];
var layoutArr = contentDOM.style['grid-template-rows'].split(" ");
var beforeStr = layoutArr[positionInt];
var offBool = (beforeStr=="0px");
var conditionBool = false;
if (modeStr=="toggle") {
layoutArr[positionInt] = offBool?onStr:"0px";
targetDOM.style["visibility"] = offBool?"visible":"hidden";
conditionBool = offBool?true:false;
} else if (modeStr=="on") {
layoutArr[positionInt] = onStr;
targetDOM.style["visibility"] = "visible";
conditionBool = true;
} else if (modeStr=="off") {
layoutArr[positionInt] = "0px";
targetDOM.style["visibility"] = "hidden";
conditionBool = false;
} else if (modeStr=="check") {
conditionBool = offBool?false:true;
};
contentDOM.style['grid-template-rows'] = layoutArr.join(" ");
return conditionBool;
};

function toggleTag() {
// hide other sections
toggleLayout("more_option","off");
moreIDOM.className = moreDownStr;
toggleLayout("episode_detail","off");
// toggle index
var toggleTagBool = toggleLayout("tags_list","toggle");
tagIDOM.className = toggleTagBool?tagUpStr:tagDownStr;
resizeDiv();
};

function toggleMoreOpt() {
// hide other sections
toggleLayout("tags_list","off")
tagIDOM.className = tagDownStr;
toggleLayout("episode_detail","off");
// toggle option
var toggleMoreOptBool = toggleLayout("more_option","toggle");
moreIDOM.className = toggleMoreOptBool?moreUpStr:moreDownStr;
resizeDiv();
clearShare();
};

function closeDetail() {
toggleLayout("episode_detail","off");
resizeDiv();
};

function popDetail(tar) {
// hide other sections
toggleLayout("more_option","off");
moreIDOM.className = moreDownStr;
toggleLayout("tags_list","off")
tagIDOM.className = tagDownStr;
toggleLayout("episode_detail","on");
resizeDiv();
//
var drawKeyArr = getArr(storage.getItem('key'));
var entryPg = document.createElement('div');
entryPg.id = "entry"+tar;
entryPg.className = "entryDetail";
var topPdom = document.createElement("p");
var topAdom = document.createElement("a");
topAdom.href = "javascript: void(closeDetail())";
topAdom.appendChild(fontAwe("fa-solid fa-circle-info fa-fw"));
topAdom.append(" 單集細節·");
topAdom.append("點此關閉 ");
topAdom.appendChild(fontAwe("fa-solid fa-square-xmark fa-fw"));
topPdom.appendChild(topAdom);
entryPg.appendChild(topPdom);
var titleHdom = document.createElement("h3");
titleHdom.className = "titletrack";
titleHdom.append(playlist[tar]['name']);
entryPg.appendChild(titleHdom);
var tagsListSpan = document.createElement('p');
for (let tagi = 0; tagi < playlist[tar]["tag"].length; tagi++) {
var textTagStr = playlist[tar]["tag"][tagi];
var haveKeyBool = drawKeyArr.includes(textTagStr);
var addTagStr = haveKeyBool?"":"javascript: void(addTag(\""+textTagStr+"\"))";
var tagLink = document.createElement(haveKeyBool?"span":"a");
tagLink.className = haveKeyBool?"hideBtn":"activeBtn";
tagLink.href = addTagStr;
tagLink.appendChild(fontAwe(faTagStr));
tagLink.append(" "+textTagStr);
tagsListSpan.appendChild(tagLink);
// tagsListSpan.appendChild(link(addTagStr,[fontAwe(faTagStr),textTagStr]));
};
entryPg.appendChild(tagsListSpan);
entryPg.appendChild(document.createElement('p'));
var buttonPdom = document.createElement('p');
buttonPdom.className = "buttonPdom";
var playSpan = document.createElement('span');
playSpan.className = "tagBorder";
var playIdArr = [fontAwe("fa-solid fa-play fa-fw",fontID="playIco"+tar)];
playSpan.appendChild(link("javascript: void(goToPlay(\""+tar+"\"))",playIdArr));
buttonPdom.appendChild(playSpan);
var controlSpan = document.createElement('span');
controlSpan.className = "tagBorder";
controlSpan.appendChild(link(playlist[tar]["apple"],[fontAwe("fa-brands fa-apple fa-fw")],"podcast"));
controlSpan.appendChild(link(playlist[tar]["google"],[fontAwe("fa-brands fa-google fa-fw")],"podcast"));
controlSpan.appendChild(link(playlist[tar]["spotify"],[fontAwe("fa-brands fa-spotify fa-fw")],"podcast"));
controlSpan.appendChild(link(playlist[tar]["youtube"],[fontAwe("fa-brands fa-youtube fa-fw")],"podcast"));
buttonPdom.appendChild(controlSpan);
var shareSpan = document.createElement('span');
shareSpan.className = "tagBorder";
var shareStr = "javascript: void(shareNow(0,\""+tar+"\"))";
shareSpan.appendChild(link(shareStr,[fontAwe("fa-solid fa-share-from-square fa-fw")]));
buttonPdom.appendChild(shareSpan);
entryPg.appendChild(buttonPdom);
var extraArr = Object.keys(playlist[tar]["extra"]);
if (extraArr.length > 0) {
entryPg.appendChild(document.createElement('p'));
for (let ind = 0; ind < extraArr.length; ind++) {
var extraKey = extraArr[ind];
var extraValue = playlist[tar]["extra"][extraKey];
var extraP = document.createElement('p');
extraP.className = "extraLink";
var extraA = document.createElement('a');
extraA.appendChild(fontAwe("fa-brands fa-youtube fa-fw"));
extraA.append(" ",extraKey);
extraA.href = extraValue;
extraA.target = "extra";
extraP.appendChild(extraA);
entryPg.appendChild(extraP);
};
};
var tagDivP = document.createElement('p');
tagDivP.innerHTML = playlist[tar]['description'];
entryPg.appendChild(tagDivP);
detailPgDOM.innerHTML = "";
detailPgDOM.appendChild(entryPg);
};

function toggleUnion() {
var nowUnionStr = storage.getItem('union');
var nextUnionStr = (nowUnionStr == "true")?"false":"true";
storage.setItem("union",nextUnionStr);
draw();
};

function toggleBtn(sectionStr) {
var sectionNowStr = storage.getItem(sectionStr);
var nextStr = paramObj[sectionStr][sectionNowStr]['next'];
storage.setItem(sectionStr,nextStr);
};
function updateBtn(sectionStr,targetADOM,targetIDOM) {
var sectionNowStr = storage.getItem(sectionStr);
targetADOM.innerText = paramObj[sectionStr][sectionNowStr]["text"];
targetIDOM.className = paramObj[sectionStr][sectionNowStr]["class"];
};
function updateTheme(sectionStr) {
var positionInt = paramObj[sectionStr]["position"];
var nowThemeStr = storage.getItem(sectionStr);
var layoutArr = document.body.className.split(" ");
layoutArr[positionInt]=nowThemeStr;
document.body.className = layoutArr.join(" ");
}
    
function toggleSort() {
toggleBtn("sort");
updateBtn("sort",sortADOM,sortIDOM);
draw();
};
function toggleTheme(sectionStr,targetADOM,targetIDOM) {
toggleBtn(sectionStr);
updateTheme(sectionStr);
updateBtn(sectionStr,targetADOM,targetIDOM);
};
function toggleColour() {toggleTheme("colour",colourADOM,colourIDOM)};
function toggleContrast() {toggleTheme("contrast",contraADOM,contraIDOM)};

function initialDiv() {
var targetStr_arr = ["titleH1","titleSpan"];
for (let index = 0; index < targetStr_arr.length; index++) {
var targetDOM = document.getElementById(targetStr_arr[index]);
targetDOM.innerHTML = "";
targetDOM.style["display"] = "none";
var squidAdom = document.createElement("a");
squidAdom.className = "mirror";
squidAdom.href = "https://xn--2os22eixx6na.xn--kpry57d/";
squidAdom.target = "info";
squidAdom.title = "墨玉程市";
squidAdom.innerText = "🦑";
var cfp2Aspan = document.createElement('a');
cfp2Aspan.href = "https://xn--2os22eixx6na.xn--kpry57d/category/CFP2/";
cfp2Aspan.target = "info";
cfp2Aspan.title = "All CFP2 所有播放室";
cfp2Aspan.innerText = "CFP2";
var okAdom = document.createElement("a");
okAdom.className = "mirror";
okAdom.href = "https://xn--xp8h.xn--2os22eixx6na.xn--kpry57d/";
okAdom.title = "Refresh site 重新更新本站";
okAdom.innerText = "👌";
var blgAspan = document.createElement('a');
blgAspan.href = "https://www.bailingguonews.com/";
blgAspan.target = "info";
blgAspan.title = "Bailingguo News 百靈果 News";
blgAspan.innerText = (index==0)?"BLG ":"BLG 百靈果";
(index==1)&&targetDOM.append("｜");
targetDOM.appendChild(squidAdom);
targetDOM.append(" ");
targetDOM.appendChild(cfp2Aspan);
targetDOM.append("·");
targetDOM.appendChild(okAdom);
targetDOM.append(" ");
targetDOM.appendChild(blgAspan);
targetDOM.append("播放室");
};
};
function resizeDiv() {
var verticalBool = (window.visualViewport.height > window.visualViewport.width);
seekerDOM.style["grid-template-columns"] = verticalBool?"1fr":"1fr min-content";
seekerDOM.style["grid-template-rows"] = verticalBool?"1fr min-content":"1fr";
titleH1DOM.style["display"] = verticalBool?"block":"none";
titleSpanDOM.style["display"] = verticalBool?"none":"inline";
var smallHeightBool = window.visualViewport.height <= 800;
var epiDtalBool = toggleLayout("episode_detail","check");
var moreOptBool = toggleLayout("more_option","check");
var tagslstBool = toggleLayout("tags_list","check");
if (smallHeightBool) {
(epiDtalBool||moreOptBool||tagslstBool)?toggleLayout("episodes_list","off"):toggleLayout("episodes_list","on");
} else if (epiDtalBool) {
toggleLayout("episodes_list","off");
} else {
toggleLayout("episodes_list","on");
};
};

window.onresize = resizeDiv;
initialDiv();
resizeDiv();

function shareTags() {
if (navigator.share) {
var drawKeyArr = getArr(storage.getItem('key'));
var targetUrl_str = "https://xn--xp8h.xn--2os22eixx6na.xn--kpry57d/?key="+drawKeyArr.join(",");
var targetTitle_str = "【百靈果 News】標籤："+drawKeyArr.join("、");
navigatorShare(targetUrl_str,targetTitle_str);
} else {
clipboardShare(targetUrl_str);
};
};

function shareNow(t=0,at="") {
if (navigator.share) {
var drawKeyArr = getArr(storage.getItem('key'));
var nowStr = (at=="")?storage.getItem('now'):at;
var currentTsStr = (storage.getItem('currentTS')==""||t==0)?"":"&currentTS="+storage.getItem('currentTS');
var targetUrl_str = "https://xn--xp8h.xn--2os22eixx6na.xn--kpry57d/?key="+drawKeyArr.join(",")+"&now="+nowStr+currentTsStr;
var targetTitle_str = "【百靈果 News】："+playlist[nowStr]['name'];
navigatorShare(targetUrl_str,targetTitle_str);
} else {
clipboardShare(targetUrl_str);
};
};

function clearShare() {shareRsDivDOM.style["display"] = "none";};

async function navigatorShare(targetUrl,targetTitle) {
var shareData = {
url:targetUrl,
title:"CFP2-BLG 百靈果播放室",
text:targetTitle,
};
shareRsDivDOM.style["display"] = "block";
shareRsADOM.textContent = "嘗試分享";
try {
await navigator.share(shareData);
shareRsADOM.textContent = "謝謝分享";
} catch (err) {
const { name,message } = err;
if (name === "AbortError") {
shareRsADOM.textContent = "取消分享";
} else {
shareRsADOM.textContent = err;
};
};
};

function clipboardShare(targetUrl) {
shareUrl = targetUrl;
shareContentDOM.value = shareUrl;
shareContentDOM.setAttribute("type","text");
shareContentDOM.select();
shareRsDivDOM.style["display"] = "block";
shareRsADOM.textContent = "嘗試分享";
try {
var successful = document.execCommand("copy");
var msg = successful?"成功":"失敗";
alert(`${shareUrl} - 複製${msg}`);
shareRsADOM.textContent = `複製${msg}`;
} catch (err) {
alert("無法複製");
shareRsADOM.textContent = `無法複製`;
}
shareContentDOM.setAttribute("type","hidden");
window.getSelection().removeAllRanges();
}
