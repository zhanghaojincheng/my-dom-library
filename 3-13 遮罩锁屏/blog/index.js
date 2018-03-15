


window.onload = function () {
    var login = $().getId('login');
    var screen = $().getId('screen');
    $().getClass('member').hover(function() {
        $(this).css('background','url(../image/bottom.png)no-repeat right center')
        $().getClass('member_ul').show();
    },function() {
        $(this).css('background','url(../image/top.png)no-repeat right center')
        $().getClass('member_ul').hide();
    })
    login.center(350,250);
    $().resize(function() {
        login.center(350,250);
        if(login.css('display') != 'none') {
            screen.lock();
        }
    })
    $().getClass('login').click(function() {
        screen.lock();
        login.show();
    })
    $().getClass('close').click(function () {
        screen.unlock();
        login.hide()
    })
    $().getClass('close').addClass('close');
}


