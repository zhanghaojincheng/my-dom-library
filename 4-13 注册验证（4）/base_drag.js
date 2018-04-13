$().extend('drag',function(tags) {
    const args = arguments;
    for(var i = 0;i<this.elements.length; i++) {
        addEvent(this.elements[i],'mousedown',function(e) {

            if(trim(this.innerHTML).length == 0) {
                e.preventDefault();
            }
            var _this = this;
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;
            var flag = false;
            for(var k = 0;k<args.length;k++) {
                if(args[k] == e.target){
                    flag = true;
                    break;
                }
            }

            if(flag) {
                addEvent(document,'mousemove',move);
                addEvent(document,'mouseup',up);
            } else {
                removeEvent(document,'mousemove',move);
                removeEvent(document,'mouseup',up);
            }

            function move(e) {
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                // 当鼠标移除浏览器之外的时候
                if(typeof _this.setCapture != 'undefined') {
                    _this.setCapture();
                }
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
            function up () {
                removeEvent(this,'mousemove',move);
                removeEvent(this,'mouseup',up);
                // 当鼠标移除浏览器的时候还可以结束进程上的setCapture
                if (typeof _this.releaseCapture != 'undefined') {
                    _this.releaseCapture();
                }
            }
        })
    }
    return this
})
