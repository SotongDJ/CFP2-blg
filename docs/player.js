var files = [];
var playlist_dom = document.getElementById("playlist");
function link(href,short,jump) {
 if (href == "") {
  var gp = document.createElement('span');
  gp.innerText = short;
  return gp;
 } else {
  var gp = document.createElement('a');
  gp.href = href;
  if (jump) { gp.target = "podcast"; };
  gp.innerText = short;
  return gp;
 };
}
for (let nub = 0; nub < playlist.length; nub++) {
// ord = playlist.length - nub - 1;
 ord = nub;
 var li = document.createElement('li');

 li.appendChild(link(playlist[ord]["apple"],"A",true));
 var aps = document.createElement('span');
 aps.innerText = " ";
 li.appendChild(aps);

 li.appendChild(link(playlist[ord]["google"],"G",true));
 var ggs = document.createElement('span');
 ggs.innerText = " ";
 li.appendChild(ggs);

 li.appendChild(link(playlist[ord]["spotify"],"S",true));
 var sps = document.createElement('span');
 sps.innerText = " ";
 li.appendChild(sps);
 
 files.push(playlist[ord]['feed']);
 li.appendChild(link("javascript: void(goToPlay("+nub+"))","D",false));
 var fs = document.createElement('span');
 fs.innerText = " ";
 li.appendChild(fs);
 
 te = document.createElement("span");
 te.innerText = playlist[ord]['name'];
 li.appendChild(te);
 playlist_dom.appendChild(li);
};
var i = 0;
var player_dom = document.getElementById("player");
function next() {
 if (i === files.length - 1) { i = 0; } else { i++; };
 player_dom.src = files[i];
};
function goToPlay(ti) {
 player_dom.src = files[ti];
 player_dom.play();
};
player_dom.addEventListener('ended', next, false);