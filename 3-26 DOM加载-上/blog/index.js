
console.log(document.addEventListener)


// addEvent(document,'DOMContentLoaded', function() {
//     alert(333)
// })
//



// document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"></script>')
// var ie_loaded = document.getElementById('ie_loaded');
// ie_loaded.onreadystatechange = function() {
//     if(this.readyState == 'complete') {
//         var box = document.getElementById('box');
//         alert(box.innerHTML);
//     }
// }
addDomLoaded(function() {
    alert(123)
})

function addDomLoaded(fn) {
    if(document.addEventListener) {      //W3C
        addEvent(document,'DOMContentLoaded', function(){
            fn();
            removeEvent(document,'DOMContentLoaded',arguments.callee);
        })
    } else {
        var timer = null;
        timer = setInterval(function() {
            try {
                document.documentElement.doScroll('left');
                fn();
            } catch (e) {}
        })
    }
}