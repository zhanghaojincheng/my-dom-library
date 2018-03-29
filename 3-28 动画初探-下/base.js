// 前台调用
var $ = function(tags) {
    return new Base(tags);
}

function Base(tags) {
    this.elements = [];
    if(tags) {
        if(typeof tags == 'object') {
            if(tags != undefined) {
                this.elements[0] = tags
            }
        } else if (typeof tags == 'string'){
            if(tags.split(' ').length > 1) {
                var elements = tags.split(' ');
                var parentNode = undefined;
                for(var i = 0;i<elements.length;i++) {
                    // p
                    switch(elements[i].charAt(0)){
                        case '#':
                            this.elements.push(this.getId(elements[i].substring(1)))
                            parentNode = this.elements;
                            break;
                        case '.':
                            var childelements = [];
                            if(parentNode) {
                                for(var k = 0;k<parentNode.length;k++) {
                                    var tmps = this.getClass(elements[i].substring(1),parentNode[k]);
                                    for(var j = 0;j < tmps.length;j++){
                                        childelements.push(tmps[j]);
                                    }
                                }
                                parentNode = childelements;
                            } else {
                                childelements = this.getTagName(elements[i]);
                                parentNode = childelements;
                            }
                            // this.elements = this.getClass(elements[i].substring(1))
                            break;
                        default:
                            var childelements = [];
                            if(parentNode) {
                                for(var k = 0;k<parentNode.length;k++) {
                                    var tmps = this.getTagName(elements[i],parentNode[k]);
                                    for(var j = 0;j < tmps.length;j++){
                                        childelements.push(tmps[j]);
                                    }
                                }
                                parentNode = childelements;
                                // childelements.push()
                            } else {
                                childelements = this.getTagName(elements[i]);
                                parentNode = childelements;
                            }
                    }
                }
                this.elements = parentNode;
            } else {
                switch(tags.charAt(0)){
                    case '#':
                        this.elements.push(this.getId(tags.substring(1)))
                        break;
                    case '.':
                        this.elements = this.getClass(tags.substring(1))
                        break;
                    default:
                        this.elements = this.getTagName(tags)
                }
            }
        } else if (typeof tags == 'function') {
            this.ready(tags)
        }
    }
}
Base.prototype.ready = function(fn){
    fn()
}
Base.prototype.getId = function (id) {
    return document.getElementById(id)
}
Base.prototype.getClass = function (className, parentNode) {
    var temps = [];
    if(parentNode == undefined) {
        parentNode = document;
    }
    var classes = parentNode.getElementsByClassName(className);
    for(var i = 0;i<classes.length;i++) {
        temps.push(classes[i]);
    }
    return temps
}
Base.prototype.getTagName = function (tagName,parentNode) {
    var temps = [];
    if(parentNode == undefined) {
        parentNode = document
    }
    var tags = parentNode.getElementsByTagName(tagName);
    for(var i = 0;i<tags.length;i++) {
        temps.push(tags[i]);
    }
    return temps
}
Base.prototype.find = function (str) {
    var child = [];
    for(var i = 0;i<this.elements.length;i++) {
        switch (str.charAt(0)) {
            case '#':
                child.push(this.getId(str.substring(1)));
                break;
            case '.':
                var all = this.getClass(str.substring(1),this.elements[i]);
                for(var k = 0;k<all.length;k++) {
                    child.push(all[k]);
                }
                break;
            default:
                var tags = this.getTagName(str,this.elements[i]);
                for(var k = 0;k<tags.length;k++) {
                    child.push(tags[k])
                };
        }
    }
    this.elements = child;
    return this
}
Base.prototype.getElement = function (num) {
    return this.elements[num];
}
// 获取首个节点
Base.prototype.first = function() {
    return this.elements[0]
}
// 获取最后一个节点
Base.prototype.last = function() {
    return this.elements[this.elements.length-1]
}
Base.prototype.eq = function (num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this
}
Base.prototype.css = function (attr, value) {
    for(var i = 0;i<this.elements.length;i++) {
        if (arguments.length == 1) {
            return getStyle(this.elements[i],attr) + 'px'
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
        addEvent(this.elements[i],'mouseover',over);
        addEvent(this.elements[i],'mouseout',out);
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
    var top = (getInner().height - height) / 2 + 'px';
    var left = (getInner().width - width) / 2 + 'px';
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
        addEvent(window, 'scroll', scroll);
    }
    return this
}
Base.prototype.unlock = function () {
    for(var i = 0;i<this.elements.length;i++) {
        this.elements[i].style.display = 'none'
        document.documentElement.style.overflow = 'auto';
        removeEvent(window, 'scroll', scroll)
    }
    return this
}
Base.prototype.resize = function (fn) {
    for(var i = 0;i<this.elements.length; i++) {
        var element = this.elements[i];
        addEvent(window,'resize',function() {
            fn();
            if (element.offsetLeft + element.clientWidth > getInner().width) {
                element.style.left = getInner().width - element.clientWidth - 50 + 'px'
            }
            if(element.offsetTop + element.clientHeight > getInner().height) {
                element.style.top = getInner().height - element.clientHeight - 50 + 'px'
            }
        })
        // window.onresize = function () {
        //
        // };
    }
    return this
}
// 动画


Base.prototype.animate = function(obj) {
    clearInterval(window.timer)
    for(var i = 0;i<this.elements.length;i++) {
        var element = this.elements[i];
        // 来个起始位置，为了点击一遍再点击的时候能重现动画，这个需要加start参数
        element.style[obj.attr] = obj.start + 'px';

        var attr = obj.attr != undefined ? obj.attr == 'x' ? 'left' : obj.attr == 'y' ? 'top' : obj.attr == 'w' ? 'width' : obj.attr == 'h' ? 'height' : 'left' : 'left'

        var start = obj.start != undefined ? obj.start : getStyle(element, attr);
        var step = obj.step != undefined ? obj.step : 5;
        var speed = obj.speed != undefined ? obj.speed : 10;
        var type = obj.type == 0 ? 'constant' : obj.type == 1 ? 'buffer' : 'buffer';
        // start等于刚开始的位置
        var target = obj.target;
        if(obj.alter != undefined && obj.target == undefined) {
            target = obj.alter + start
        } else if (obj.alter == undefined && obj.target == undefined) {
            throw new Error('alter增量或者target目标量必须有一个!!!');
        }
        var target = obj.target != undefined ? obj.target : obj.alter != undefined ?  obj.alter + start : 0

        element.style[attr] = start + 'px';
        if(getStyle(element,attr) > target) {
            step = -step;
        }

        timer = setInterval(function() {
            if(type == 'buffer') {
                    step = step > 0 ? Math.ceil((target - getStyle(element, attr)) / speed) : Math.floor((target - getStyle(element, attr)) / speed)
            }
            element.style[attr] = getStyle(element, attr) + step + 'px';
            if(step < 0 && getStyle(element, attr) + step < target ){
                setTarget()
            } else if(step > 0 && getStyle(element, attr) + step > target ){
                setTarget()
            }
        },50)
        function setTarget() {
            element.style[attr] = target + 'px';
            clearInterval(timer)
        }
    }
    return this
}
// 插件入口
Base.prototype.extend = function (name, fn) {
    Base.prototype[name] = fn
}

