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
            return getStyle(this.elements[i],attr)
        }
        this.elements[i].style[attr] = value;
    }
    return this
}
// 添加class
Base.prototype.addClass = function (className) {
    for(var i = 0;i<this.elements.length;i++) {
        if(!hasClass(this.elements[i], className)) {
            this.elements[i].className += ' ' + className;
        }
    }
    return this
}
// 移除class
Base.prototype.removeClass = function (className) {
    for(var i = 0;i<this.elements.length;i++) {
        if(hasClass(this.elements[i],className)) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+ className +'(\\s|$)'),' ')
        }
    }
    return this
}
// 添加link或style的CSS规则
Base.prototype.addRule = function (num,selectorText,cssText,position) {
    var sheet = document.styleSheets[num];
    insertRule(sheet,selectorText,cssText,position);
    return this
}
// 移除link或style的CSS规则
Base.prototype.removeRule = function (num, index) {
    var sheet = document.styleSheets[num];
    delete(sheet, index);
    return this
}
// 设置innerHTML
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
// 设置鼠标移入移出方法
Base.prototype.hover = function (over,out) {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this
}
// 设置显示
Base.prototype.show = function () {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style.display = 'block'
    }
    return this
}
// 设置隐藏
Base.prototype.hide = function () {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style.display = 'none'
    }
    return this
}
Base.prototype.center = function (width,height) {
    var top = (document.documentElement.clientHeight - height) / 2 + 'px';
    var left = (document.documentElement.clientWidth - width) / 2 + 'px';
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style.top = top;
        this.elements[i].style.left = left;
    }
    return this
}
Base.prototype.lock = function() {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style.display = 'block';
        this.elements[i].style.width = getInner().width + 'px';
        this.elements[i].style.height = getInner().height + 'px';
        document.documentElement.style.overflow = 'hidden';
    }
    return this
}
Base.prototype.unlock = function () {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style.display = 'none'
        document.documentElement.style.overflow = 'auto';
    }
    return this
}
Base.prototype.resize = function (fn) {
    window.onresize = fn;
    return this
}
// 拖拽
Base.prototype.drag = function () {
    for(var i = 0;i<this.elements.length; i++) {
        this.elements[i].onmousedown = function (e) {
            var e = getEvent(e);
            var _this = this;
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;
            document.onmousemove = function (e) {
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                if (left <= 0){
                    left = 0;
                } else if (left >= getInner().width - _this.offsetWidth) {
                    left = getInner().width - _this.offsetWidth
                }
                if (top <= 0) {
                    top = 0;
                } else if (top >= getInner().height - _this.offsetHeight) {
                    top = getInner().height - _this.offsetHeight
                }
                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
            }
            document.onmouseup = function () {
                this.onmousemove = null;
                this.onmouseup = null;
            }
        }
    }
    return this
}

