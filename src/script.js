"use strict";


// PM LOGIN //
function getHTTPObject() {
  if  (typeof XMLHttpRequest != 'undefined') {return new XMLHttpRequest();}
  try {	return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
	}
	return false;
}

var answerObj = document.getElementById('answer');

function DoLogin(f) {
var http = getHTTPObject();
if (http && f.p_url.value  && f.p_user.value && f.p_password.value) {
   http.open("GET", f.p_url.value , false, '"' + f.p_user.value + '"', f.p_password.value);
   http.send("");
   if (http.status == 200) { document.location = f.p_url.value; }
   else {answerObj.innerHTML = "Forkert brugernavn eller adgangskode"; answerObj.classList.remove('hidden');}
   }
    else{answerObj.innerHTML = 'Systemfejl'; answerObj.classList.remove('hidden');}
    return false;
}


function StrRepl(s)  {
    var s0 = s.replace(/\?/g,'%3F')
     s0 = s0.replace(/\=/g,'%3D')
     s0 = s0.replace(/\&/g,'%26')
    return(s0);
 }


function toggleExamplePopup() {
    document.getElementById('popup').classList.add('active');
    document.getElementById('overlay').classList.add('overlay--active');
}
function toggleExamplePopup2() {
    document.getElementById('popup-2').classList.add('active');
    document.getElementById('overlay').classList.add('overlay--active');
}
function toggleExampleNav() {
    document.getElementById('nav').classList.toggle('active');
}
function closeExamples() {
    document.getElementById('nav').classList.remove('active');
    document.getElementById('popup').classList.remove('active');
    document.getElementById('popup-2').classList.remove('active');
    document.getElementById('overlay').classList.remove('overlay--active');
}


function rotateImg(elm) {
    elm.classList.toggle('rotate-90');
}
