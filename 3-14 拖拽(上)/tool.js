


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
        return window.getComputedStyle(element,null)[attr]
    } else if (typeof this.elements[i].currentStyle != undefined) {
        return element.currentStyle[attr]
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