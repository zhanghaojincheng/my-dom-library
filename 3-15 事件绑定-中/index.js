
var o = document.getElementById('b');

function handler1(e) {
	alert(11)
}
function handler2(e) {
	alert(22)
}
function handler3(e) {
	alert(33)
}
addEvent(o,'click',handler1);
addEvent(o,'click',handler2);
addEvent(o,'click',handler1);
// removeEvent(o,'click',handler);
// removeEvent(o,'click',handler)


// window.onload = function () {

//     alert(1)
// }

// window.onload = function () {

//     alert(2)
// }

// window.onload = function () {

//     alert(3)
// }


