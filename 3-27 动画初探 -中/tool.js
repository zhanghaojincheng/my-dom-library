// 浏览器检测
(function () {
    var ua = navigator.userAgent;
    var sys = {};
    var s;
    (s = ua.match(/msie ([\d.]+)/i)) ? sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/i)) ? sys.firfox = s[1] :
            (s = ua.match(/chrome\/(\d.)/i)) ? sys.chrome = s[1] :
                (s = ua.match(/opr\/([\d.]+)/i)) ? sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/i)) ? sys.safari = s[1] : 0;
})()

// 跨浏览器事件绑定
addEvent.id = 1;
function addEvent(obj, type, fn) {
    if(typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false)
    } else {
        if(!obj.events) {
            obj.events = {};
        }
        if(!obj.events[type]) {
            obj.events[type] = [];
            obj.events[type][0] = fn;
        } else {
            if(addEvent.equal(obj.events[type], fn)) {
                return false;
            }
            obj.events[type][addEvent.id++] = fn;
        }
        obj['on' + type] = addEvent.exec;
    }
}
addEvent.exec = function(e) {
    var e = addEvent.fixEvent(window.event);
    for(var i in this.events[e.type]){
        this.events[e.type][i].call(this, e);
    }
}
// 给IE中的event添加preventDefault,和stoppropagation方法
addEvent.fixEvent = function(e) {
    e.preventDefault = addEvent.fixEvent.preventDefault;
    e.stopPropagation = addEvent.fixEvent.stopPropagation;
    return e;
}
// IE添加preventDefault
addEvent.fixEvent.preventDefault = function () {
    this.returnValue = false
}
// IE添加stoppropagation方法
addEvent.fixEvent.stopPropagation = function () {
    this.cancelBubble = true
}
// 判断事件中是否有重复的函数，屏蔽掉
addEvent.equal = function(evearray, fn) {
    for(var k = 0;k<evearray.length;k++) {
        if(evearray[k] == fn) {
            return true
        }
    }
}

// 跨浏览器的删除事件绑定
function removeEvent(obj, type, fn) {
      if(typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false)
    } else if (typeof obj.detachEvent != 'undefined') {
          if(obj.events) {
              for(var i = 0;i<obj.events[type].length;i++) {
                  if(obj.events[type][i] == fn) {
                      obj.events[type].splice([i],1)
                  }
              }
          }
    }
}

// 跨浏览器获取视口大小
function getInner() {
    if (typeof window.innerWidth != 'undefined') {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}

// 跨浏览器获取style
function getStyle(element,attr) {
    if(typeof window.getComputedStyle != undefined) {
        return parseInt(window.getComputedStyle(element,null)[attr])
    } else if (typeof this.elements[i].currentStyle != undefined) {
        return parseInt(element.currentStyle[attr])
    }
}

// 判断class正则
function hasClass(element, className) {
    return element.className.match(new RegExp('(\\s|^)'+ className +'(\\s|$)'))
}

// 跨浏览器添加link规则
function insertRule(sheet,selectorText,cssText,position) {
    if (typeof sheet.insertRule != 'undefined') {
        sheet.insertRule(selectorText + '{'+ cssText +'}',position)   // w3c
    } else if (typeof sheet.addRule != 'undefined'){
        sheet.addRule(selectorText,cssText,position)     // IE
    }
}

//  跨浏览器移除link规则
function deleteRule(sheet, index) {
    if (typeof sheet.deleteRule != 'undefined') {
        sheet.deleteRule(index)
    } else if (typeof sheet.removeRule != 'undefined') {
        sheet.removeRule(index)
    }
}

// 跨浏览器获取event对象
function getEvent(event) {
    return event || window.event
}

// 删除左右空格
function trim(str) {
    return str.replace('/(^\s*)|(\s*$)/g','');
}

// 阻止页面向下滚动
function scroll() {
    window.onscroll = function(e) {
        document.documentElement.scrollTop = 0;
    }
}
