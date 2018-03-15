


window.onload = function () {
    $().getClass('member').hover(function() {
        $(this).css('background','url(../image/bottom.png)no-repeat right center')
        $().getClass('member_ul').show();
    },function() {
        $(this).css('background','url(../image/top.png)no-repeat right center')
        $().getClass('member_ul').hide();
    })
    $().getId('login').center(350,250).resize(function() {
        $().getId('login').center(350,250)
    })
    $().getClass('login').click(function() {
        $().getId('login').show()
    })
    $().getClass('close').click(function () {
        $().getId('login').hide()
    })
    // function abc () {
    //     var top = (document.documentElement.clientHeight - 250) / 2;
    //     var left = (document.documentElement.clientWidth - 350) / 2;
    //     $().getId('login').css('top',top + 'px').css('left',left + 'px')
    // }
    // window.onresize = resize()
}


