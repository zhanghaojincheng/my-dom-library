// 前台调用
var $ = function() {
    return new Base();
}

function Base() {
    this.elements = [];
}
// Base.prototype.elements = [];
Base.prototype.getId = function (id) {
    this.elements.push(document.getElementById(id));
    return this
}
Base.prototype.getClass = function (className, boxName) {
    var node = null;
    if(arguments.length == 2) {
        node = document.getElementsByClassName(boxName)[0];
    } else {
        node = document;
    }
    var classes = node.getElementsByClassName(className);
    for(var i = 0;i<classes.length;i++) {
        this.elements.push(classes[i]);
    }
    return this
}
Base.prototype.getTagName = function (tagName) {
    var tags = document.getElementsByTagName(tagName);
    for(var i = 0;i<tags.length;i++) {
        this.elements.push(tags[i]);
    }
    return this
}
Base.prototype.getElement = function (num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements.push(element);
    return this
}
Base.prototype.css = function (attr, value) {
    for(var i = 0;i<this.elements.length;i++) {
        if (arguments.length == 1) {
            if(typeof window.getComputedStyle != undefined) {
                return window.getComputedStyle(this.elements[i],null)[attr]
            } else if (typeof this.elements[i].currentStyle != undefined) {
                return this.elements[i].currentStyle[attr]
            }
        }
        this.elements[i].style[attr] = value;
    }
    return this
}

Base.prototype.html = function (html) {
    for(var i = 0;i<this.elements.length;i++) {
        if (arguments.length == 0) {
          return this.elements[i].innerHTML
        }
        this.elements[i].innerHTML = html;
    }
    return this
}

Base.prototype.click = function(fn) {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].onclick = fn;
    }
    return this
}
