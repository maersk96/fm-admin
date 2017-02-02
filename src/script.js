"use strict";

var lastScrollTop = 0,
    delta = 10,
    navbarHeight = 84,
    didScroll,
    nav = document.getElementById('altNav');

// on scroll, let the interval function know the user has scrolled
window.onscroll = function() {
  didScroll = true;
};
// run hasScrolled() and reset didScroll status
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {

    var st = document.body.scrollTop;

    if (Math.abs(lastScrollTop-st) <= delta)
        return;


    if (st < navbarHeight) {
        nav.classList.add('nav__attached');
    } else {
        nav.classList.remove('nav__attached');
    }


    if (st > lastScrollTop && st > navbarHeight) {
        // on down scroll && not at the top
        nav.classList.add('nav__invisible');
    } else {
        nav.classList.remove('nav__invisible');
    }

    lastScrollTop = st;
}

document.getElementById('nav__mobile-btn').onclick = function(){
    this.classList.toggle('active');
    document.getElementById('nav__menu').classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    nav.classList.remove('nav__attached');
};

function dropdown(el, thisEl) {
    thisEl.classList.toggle('active');
    document.getElementById(el).classList.toggle('active');
}












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
