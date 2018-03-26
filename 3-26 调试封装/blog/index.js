



    $(function() {
        var login = $('#login');
        var screen = $('#screen');
        $('.member').hover(function() {
            $(this).css('background','url(../image/bottom.png)no-repeat right center')
            $('.member_ul').show();
        },function() {
            $(this).css('background','url(../image/top.png)no-repeat right center')
            $('.member_ul').hide();
        })
        login.center(350,250).resize(function() {
            if(login.css('display') != 'none') {
                screen.lock();
            }
        })
        $('.login').click(function() {
            login.center(350,250);
            screen.lock();
            login.show();
        })
        $('.close').click(function () {
            screen.unlock();
            login.hide()
        })
        $('#login').drag($('h2').getElement(0));
    })




