function link(href,inner,short,jump) {
 if (href == "") {
  var tag = document.createElement('span');
  tag.className = short;
  // tag.innerText = inner;
  return tag;
 } else {
  var tag = document.createElement('a');
  tag.href = href;
  if (jump) { tag.target = "podcast"; };
  tag.className = short;
  // tag.innerText = inner;
  return tag;
 };
}
var files = [];
var playlist_dom = document.getElementById("playlist");
for (let nub = 0; nub < playlist.length; nub++) {
// ord = playlist.length - nub - 1;
 ord = nub;
 var entryPg = document.createElement('tr');
 var buttonDiv = document.createElement('td');
 buttonDiv.className = "buttonDiv";
 buttonDiv.appendChild(link(playlist[ord]["apple"],"A","fa-brands fa-apple",true));
 buttonDiv.appendChild(link(playlist[ord]["google"],"G","fa-brands fa-google",true));
 buttonDiv.appendChild(link(playlist[ord]["spotify"],"S","fa-brands fa-spotify",true));
 buttonDiv.appendChild(link(playlist[ord]["feed"],"D","fa-solid fa-download",true));
 files.push(playlist[ord]['feed']);
 buttonDiv.appendChild(link("javascript: void(goToPlay("+nub+"))","P","fa-solid fa-play",false));
 entryPg.appendChild(buttonDiv);
 titleDiv = document.createElement("td");
 titleDiv.innerText = playlist[ord]['name'];
 entryPg.appendChild(titleDiv);
 playlist_dom.appendChild(entryPg);
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