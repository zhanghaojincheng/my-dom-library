


window.onload = function () {
    $().getClass('member').hover(function() {
        $(this).css('background','url(../image/bottom.png)no-repeat right center')
        $(this).getClass('boxul').show();
    },function() {
        $().getClass('member').css('background','url(../image/top.png)no-repeat right center')
        $().getClass('boxul').hide();
    })

}


