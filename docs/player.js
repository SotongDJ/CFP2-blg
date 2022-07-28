var files = [];
var playlist_dom = document.getElementById("playlist");
function link(href,short,jump) {
 if (href == "") {
  var gp = document.createElement('span');
  gp.className = short;
  return gp;
 } else {
  var gp = document.createElement('a');
  gp.href = href;
  if (jump) { gp.target = "podcast"; };
  gp.className = short;
  return gp;
 };
}
for (let nub = 0; nub < playlist.length; nub++) {
// ord = playlist.length - nub - 1;
 ord = nub;
 var li = document.createElement('p');
 li.appendChild(link(playlist[ord]["apple"],"fa-brands fa-apple",true));
 li.appendChild(link(playlist[ord]["google"],"fa-brands fa-google",true));
 li.appendChild(link(playlist[ord]["spotify"],"fa-brands fa-spotify",true));
 li.appendChild(link(playlist[ord]["feed"],"fa-solid fa-download",true));
 files.push(playlist[ord]['feed']);
 li.appendChild(link("javascript: void(goToPlay("+nub+"))","fa-solid fa-play",false));

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
 player_dom.play();
};
function goToPlay(ti) {
 player_dom.src = files[ti];
 player_dom.play();
};
player_dom.addEventListener('ended', next, false);