$(function () {
    var login = $('#login');
    var screen = $('#screen');
    $('.member').hover(function () {
        $(this).css('background', 'url(../image/bottom.png)no-repeat right center')
        $('.member_ul').show().animate({
          mul: {
              o: 100,
              height: 140
          }
        })
    }, function () {
        $(this).css('background', 'url(../image/top.png)no-repeat right center')
        $('.member_ul').animate({
            mul: {
              o: '0',
              height:0,
            },
            fn: function () {
                $('.member_ul').hide()
            }
        })
    })
    login.center(350, 250).resize(function () {
        if (login.css('display') != 'none') {
            screen.lock();
        }
    })
    $('.login').click(function () {
        login.center(350, 250);
        screen.lock().animate({
            attr: 'o',
            target: 30,
        });
        login.show();
    })
    $('.close').click(function () {
        login.hide()
        screen.animate({
            attr: 'o',
            target: 0,
            fn: function () {
                screen.unlock()
            }
        })
    })
    $('#login').drag($('h2').getElement(0));

    // 百度分享搜索效果
    $('#share').hover(function (e) {
        e.preventDefault();
        e.stopPropagation()
        $(this).animate({
            attr: 'x',
            target: 0
        })
    }, function () {
        $(this).animate({
            attr: 'x',
            target: -210
        })
    })
    $('#share').css('top', (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px')

    addEvent(window, 'scroll', function () {
        $('#share').animate({
            attr: 'y',
            target: parseInt(getScrollTop().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2),
            step: 50,

        })
    })

    $(document).click(function () {
        $('#test').animate({
            mul: {
                height: 1000,
                width: 200,
                o: 20
            }
        })
    })
    $('.test').hover(function () {
        $(this).animate({
           attr: 'w',
            target: 500
        })
    }, function () {
        $(this).animate({
            attr: 'w',
            target: 100
        })
    })

})




