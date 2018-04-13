// 前台调用
var $ = function (tags) {
    return new Base(tags);
}

function Base(tags) {
    this.elements = [];
    if (tags) {
        if (typeof tags == 'object') {
            if (tags != undefined) {
                this.elements[0] = tags
            }
        } else if (typeof tags == 'string') {
            if (tags.split(' ').length > 1) {
                var elements = tags.split(' ');
                var parentNode = undefined;
                for (var i = 0; i < elements.length; i++) {
                    if(!elements[i]){
                        continue
                    }
                    switch (elements[i].charAt(0)) {
                        case '#':
                            this.elements.push(this.getId(elements[i].substring(1)))
                            parentNode = this.elements;
                            break;
                        case '.':
                            var childelements = [];
                            if (parentNode) {
                                for (var k = 0; k < parentNode.length; k++) {
                                    var tmps = this.getClass(elements[i].substring(1), parentNode[k]);
                                    for (var j = 0; j < tmps.length; j++) {
                                        childelements.push(tmps[j]);
                                    }
                                }
                                parentNode = childelements;
                            } else {
                                childelements = this.getClass(elements[i].substring(1));
                                parentNode = childelements;
                            }
                            break;
                        default:
                            var childelements = [];
                            if (parentNode) {
                                for (var k = 0; k < parentNode.length; k++) {
                                    var tmps = this.getTagName(elements[i], parentNode[k]);
                                    for (var j = 0; j < tmps.length; j++) {
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
                switch (tags.charAt(0)) {
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

Base.prototype.ready = function (fn) {
    fn()
}
Base.prototype.getId = function (id) {
    return document.getElementById(id)
}
Base.prototype.getClass = function (className, parentNode) {
    var temps = [];
    if (parentNode == undefined) {
        parentNode = document;
    }
    var classes = parentNode.getElementsByClassName(className);
    for (var i = 0; i < classes.length; i++) {
            temps.push(classes[i]);
    }
    return temps
}
Base.prototype.getTagName = function (tagName, parentNode) {
    var temps = [];
    if (parentNode == undefined) {
        parentNode = document
    }
    var tags = parentNode.getElementsByTagName(tagName);
    for (var i = 0; i < tags.length; i++) {
        temps.push(tags[i])
    }
    return temps
}
Base.prototype.find = function (str) {
    var child = [];
    for (var i = 0; i < this.elements.length; i++) {
        switch (str.charAt(0)) {
            case '#':
                child.push(this.getId(str.substring(1)));
                break;
            case '.':
                var all = this.getClass(str.substring(1), this.elements[i]);
                for (var k = 0; k < all.length; k++) {
                    child.push(all[k]);
                }
                break;
            default:
                var tags = this.getTagName(str, this.elements[i]);
                for (var k = 0; k < tags.length; k++) {
                    child.push(tags[k])
                }
                ;
        }
    }
    this.elements = child;
    return this
}
Base.prototype.getElement = function (num) {
    return this.elements[num];
}
// 获取首个节点
Base.prototype.first = function () {
    return this.elements[0]
}
// 获取最后一个节点
Base.prototype.last = function () {
    return this.elements[this.elements.length - 1]
}
Base.prototype.eq = function (num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this
}
// 上一个同辈元素
Base.prototype.prev = function() {
    for (var i = 0; i < this.elements.length; i++) {
        // this.elements[i] = this.elements[i].nextElementSibling;
        this.elements[i] = this.elements[i].previousSibling;
        if(this.elements[i] == null) {
            throw new Error('找不到上一个同级节点')
        }
        if(this.elements[i].nodeType == 3) this.prev()
    }
    return this
}
// 下一个同辈元素
Base.prototype.next = function () {
    for (var i = 0; i < this.elements.length; i++) {
        // this.elements[i] = this.elements[i].nextElementSibling;
       this.elements[i] = this.elements[i].nextSibling;
       if(this.elements[i] == null) {
           throw new Error('找不到下一个同级节点')
       }
       if(this.elements[i].nodeType == 3) this.next()
    }
    return this
}
Base.prototype.css = function (attr, value) {
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 1) {
            return getStyle(this.elements[i], attr)
        }
        this.elements[i].style[attr] = value;
    }
    return this
}
// 添加class
Base.prototype.addClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (!hasClass(this.elements[i], className)) {
            this.elements[i].className += ' ' + className;
        }
    }
    return this
}
// 移除class
Base.prototype.removeClass = function (className) {
    for (var i = 0; i < this.elements.length; i++) {
        if (hasClass(this.elements[i], className)) {
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ')
        }
    }
    return this
}
// 添加link或style的CSS规则
Base.prototype.addRule = function (num, selectorText, cssText, position) {
    var sheet = document.styleSheets[num];
    insertRule(sheet, selectorText, cssText, position);
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
    for (var i = 0; i < this.elements.length; i++) {
        if (arguments.length == 0) {
            return this.elements[i].innerHTML
        }
        this.elements[i].innerHTML = html;
    }
    return this
}
// form表单内的元素查找
Base.prototype.form = function (name) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i] = this.elements[i][name]
    }
    return this
}
// form表单内的val值的获取
Base.prototype.val = function (str) {
    for (var i = 0; i < this.elements.length; i++) {
        if(!str) return this.elements[i].value
        this.elements[i].value = str
    }
}
// 点击事件
Base.prototype.click = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this
}
// 设置鼠标移入移出方法
Base.prototype.hover = function (over, out) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], 'mouseover', over);
        addEvent(this.elements[i], 'mouseout', out);
    }
    return this
}
// 设置事件发生器
Base.prototype.bind = function (event, fn) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], event, fn);
    }
    return this
}
// 设置显示
Base.prototype.show = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block'
    }
    return this
}
// 设置隐藏
Base.prototype.hide = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none'
    }
    return this
}
// 设置切换
// 用闭包的方式使每个对象都有自己的count变量
Base.prototype.toggle = function(fn1, fn2) {
    for (var i = 0; i < this.elements.length; i++) {
        (function(element, args) {
            var count = 0;
            addEvent(element,'click', function () {
                args[count++ % args.length].call(this);
            })
        })(this.elements[i], arguments)
    }
    return this
}

Base.prototype.center = function (width, height) {
    var top = (getInner().height - height) / 2 + 'px';
    var left = (getInner().width - width) / 2 + 'px';
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.top = top;
        this.elements[i].style.left = left;
    }
    return this
}
Base.prototype.lock = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
        this.elements[i].style.width = getInner().width + 'px';
        this.elements[i].style.height = getInner().height + 'px';
        document.documentElement.style.overflow = 'hidden';
        addEvent(window, 'scroll', scroll);
    }
    return this
}
Base.prototype.unlock = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none'
        document.documentElement.style.overflow = 'auto';
        removeEvent(window, 'scroll', scroll)
    }
    return this
}
Base.prototype.resize = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        addEvent(window, 'resize', function () {
            fn();
            if (element.offsetLeft + element.clientWidth > getInner().width) {
                element.style.left = getInner().width - element.clientWidth - 50 + 'px'
            }
            if (element.offsetTop + element.clientHeight > getInner().height) {
                element.style.top = getInner().height - element.clientHeight - 50 + 'px'
            }
        })
    }
    return this
}
// 动画

var timer;
Base.prototype.animate = function (obj) {
    for (var i = 0; i < this.elements.length; i++) {
        var element = this.elements[i];
        // 来个起始位置，为了点击一遍再点击的时候能重现动画，这个需要加start参数
        element.style[obj.attr] = obj.start + 'px';

        var attr = obj.attr == 'x' ? 'left' : obj.attr == 'y' ? 'top' :
            obj.attr == 'w' ? 'width' : obj.attr == 'h' ? 'height' :
                obj.attr == 'o' ? 'opacity' : obj.attr != undefined ? obj.attr : 'left';

        var start = obj.start != undefined ? obj.start : parseInt(getStyle(element, attr));
        var step = obj.step != undefined ? obj.step : 10;
        var speed = obj.speed != undefined ? obj.speed : 5;
        var type = obj.type == 0 ? 'constant' : obj.type == 1 ? 'buffer' : 'buffer';
        var target = obj.target != undefined ? obj.target : 0;
        var mul = obj.mul;
        // 如果target存在，alter存在也没有用
        if (obj.alter != undefined && obj.target == undefined) {
            target = obj.alter + start
        } else if (obj.alter == undefined && obj.target == undefined && mul == undefined) {
            throw new Error('alter增量或者target目标量必须有一个!!!');
        }

        if(!mul){
            mul = {};
            mul[attr] = target;
        }
        if (start > target) step = -step;
        if (attr == 'opacity') {
            if (obj.start != undefined) {
                element.style[attr] = start / 100
            }
        } else {
            element.style[attr] = start + 'px';
        }

        clearInterval(element.timer);
        element.timer = setInterval(function () {
            var flag = true;
            for (var i in mul) {
                attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
                target = mul[i];
                if (type == 'buffer') {
                    step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed : (target - parseInt(getStyle(element, attr))) / speed
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                }

                if (attr == 'opacity') {
                    var temp = parseFloat(getStyle(element, attr) * 100);
                    if (step == 0) {
                        setTarget()
                    } else if (step < 0 && temp + step < target) {
                        setTarget()
                    } else if (step > 0 && temp + step > target) {
                        setTarget()
                    } else {
                        element.style[attr] = (temp + step) / 100
                    }
                    if(temp != target) {
                        flag = false
                    }
                } else {
                    if (step == 0) {
                        setTarget()
                    } else if (step < 0 && parseInt(getStyle(element, attr)) + step < target) {
                        setTarget()
                    } else if (step > 0 && parseInt(getStyle(element, attr)) + step > target) {
                        setTarget()
                    } else {
                        element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
                    }
                    if(target != parseInt(getStyle(element, attr))){
                        flag = false
                    }
                }
            }
            // console.log(step)
            if(flag == true) {
                clearInterval(element.timer)
                if (obj.fn != undefined) {
                    obj.fn()
                }
            }
        }, 50)

        function setTarget() {
            if (attr == 'opacity') {
                element.style[attr] = target / 100;
            } else {
                element.style[attr] = target + 'px';
            }


        }
    }
    return this
}
// 插件入口
Base.prototype.extend = function (name, fn) {
    Base.prototype[name] = fn
}

