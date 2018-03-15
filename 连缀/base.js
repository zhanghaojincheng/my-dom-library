
var $ = function() {
    return new Base();
}

function Base() {
    this.elements = [];
}
Base.prototype.getId = function (id) {
    this.elements.push(document.getElementById(id));
    return this
}
Base.prototype.getClass = function (className) {
    var classes = document.getElementsByClassName(className);
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
Base.prototype.css = function (attr, value) {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style[attr] = value;
    }
    return this
}

Base.prototype.html = function (html) {
    for(var i = 0;i<this.elements.length;i++) {
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
