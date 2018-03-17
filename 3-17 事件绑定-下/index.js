
var o = document.getElementById('b');
var href = document.getElementById('href');

addEvent(href,'click',function(e) {
	alert(1)
    e.stopPropagation()
})
addEvent(document,'click',function(e) {
	alert(2)
})


function handler1(e) {
	alert(111)
}
function handler2(e) {
    alert(222)
}
function handler3(e) {
    alert(333)
}
addEvent(o,'click',handler1);
addEvent(o,'click',handler2);
addEvent(o,'click',handler3);
removeEvent(o, 'click', handler2)
removeEvent(o, 'click', handler2)
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


