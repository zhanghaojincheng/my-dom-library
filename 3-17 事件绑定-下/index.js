
var o = document.getElementById('b');
var href = document.getElementById('href');
var box = document.getElementById('box');

function handler1(e) {
	alert(111)
}
function handler2(e) {
    alert(222)
}
function handler3(e) {
    alert(333)
}
function fn1(e) {
	alert(444)
}
function fn2(e) {
	alert(555)
}
function fn3(e) {
	alert(666)
}
addEvent(o,'click',handler1);
addEvent(o,'click',handler2);
addEvent(o,'click',handler3);
removeEvent(o,'click',handler1);
addEvent(box,'mouseover',fn1);
addEvent(box,'mouseover',fn2);
addEvent(box,'mouseover',fn3);
removeEvent(box,'mouseover',fn2);



// removeEvent(o, 'click', handler2)
// removeEvent(o, 'click', handler2)
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


