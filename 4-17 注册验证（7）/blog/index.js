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
                height: 0,
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
    }).drag($('#login h2').getElement(0));
    // 登陆框
    $('#login .close').click(function () {
        login.hide()
        screen.animate({
            attr: 'o',
            target: 0,
            fn: function () {
                screen.unlock()
            }
        })
    })
    $('.login').click(function () {
        login.center(350, 250);
        screen.lock().animate({
            attr: 'o',
            target: 30,
        });
        login.show();
    })

    // 注册框
    var reg = $('#reg');
    $('.reg').click(function () {
        reg.center(600, 550);
        screen.lock().animate({
            attr: 'o',
            target: 30,
        });
        reg.show();
    })
    $('#reg .close').click(function () {
        reg.hide()
        screen.animate({
            attr: 'o',
            target: 0,
            fn: function () {
                screen.unlock()
            }
        })
    })
    reg.resize(function () {
    }).drag($('h2').getElement(0));


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


    $(window).bind('scroll', function () {
        $('#share').animate({
            attr: 'y',
            target: parseInt(getScrollTop().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2),
            step: 50,

        })
    })

    $('#nav .about li').hover(function () {
        var left = $(this).first().offsetLeft;
        $('.nav_bg').animate({
            attr: 'x',
            target: left + 20,
            fn: function () {
                $('#nav .white').animate({
                    attr: 'x',
                    target: -left
                })
            }
        })
    }, function () {
        var left = $(this).first().offsetLeft;
        $('.nav_bg').animate({
            attr: 'x',
            target: 20,
            fn: function () {
                $('#nav .white').animate({
                    attr: 'x',
                    target: 0
                })
            }
        })
    })
    // toggle折叠效果
    $('#sidebar h2').toggle(function () {
        $(this).next().animate({
            mul: {
                h: 0,
                o: 10
            }
        })
    }, function () {
        $(this).next().animate({
            mul: {
                h: 152,
                o: 100
            }
        })
    })
    // 用户名验证功能
    $('form').form('user').bind('focus', function () {
        $(' form  .info_user ').show()
        $(' form .error_user').hide()
        $(' form .succ_user').hide()
    }).bind('blur', function () {
        if (trim($(this).val()) == '') {
            $(' form  .info_user ').hide()
            $(' form .error_user').hide()
            $(' form .succ_user').hide()
        } else if (!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).val()))) {
            $(' form .error_user').show()
            $(' form  .info_user').hide()
            $(' form  .succ_user').hide()
        } else {
            $(' form  .succ_user').show()
            $(' form  .info_user').hide()
            $(' form .error_user').hide()
        }
    })

    // 密码验证功能

    $('form').form('pass').bind('focus', function () {
        $(' form  .info_pass').show()
        $(' form .error_pass').hide()
        $(' form .succ_pass').hide()
    }).bind('blur', function () {
        if (trim($(this).val()) == '') {
            $(' form  .info_pass').hide()
            $(' form .error_pass').hide()
            $(' form .succ_pass').hide()
        } else {
            if (checkPass.call(this)) {
                $(' form  .info_pass').hide()
                $(' form .error_pass').hide()
                $(' form .succ_pass').show()
            } else {
                $(' form  .info_pass').hide()
                $(' form .error_pass').show()
                $(' form .succ_pass').hide()
            }
        }
    })

    // 密码强度验证
    $('form').form('pass').bind('keyup', function () {
        checkPass.call(this)
    })

    // 密码验证函数
    function checkPass() {
        var value = trim($(this).val());
        var value_length = value.length;
        var code_length = 0;
        var flag = false;

        // 6-20之间
        if (value_length <= 20 && value_length >= 6) {
            $('#reg .info_pass .q1').html('❤').css('color', 'green')
        } else {
            $('#reg .info_pass .q1').html('⊙').css('color', '#ccc')
        }
        // 字母或者数字 任意一个
        if (value_length > 0 && !/\s/.test(value)) {
            $('#reg .info_pass .q2').html('❤').css('color', 'green')
        } else {
            $('#reg .info_pass .q2').html('⊙').css('color', '#ccc')
        }
        // 大小写字母，数字，字符的混拼即可
        if (/[\d]/.test(value)) {
            code_length++
        }
        if (/[a-z]/.test(value)) {
            code_length++
        }
        if (/[A-Z]/.test(value)) {
            code_length++
        }
        if (/[^\w]/.test(value)) {
            code_length++
        }
        if (code_length > 1 && value_length > 0 && !/\s/.test(value)) {
            $('#reg .info_pass .q3').html('❤').css('color', 'green')
        } else {
            $('#reg .info_pass .q3').html('⊙').css('color', '#ccc')
        }
        // 安全级别
        if (value_length >= 10 && code_length > 2) {
            $('.info_pass .s1').css('color', 'orange');
            $('.info_pass .s2').css('color', 'orange');
            $('.info_pass .s3').css('color', 'orange');
            $('.info_pass .s4').css('color', 'orange').html('高');
        } else if (value_length >= 8 && code_length > 1) {
            $('.info_pass .s1').css('color', 'orange');
            $('.info_pass .s2').css('color', 'orange');
            $('.info_pass .s3').css('color', '#ccc');
            $('.info_pass .s4').css('color', 'orange').html('中');
        } else if (value_length > 0) {
            $('.info_pass .s1').css('color', 'orange');
            $('.info_pass .s2').css('color', '#ccc');
            $('.info_pass .s3').css('color', '#ccc');
            $('.info_pass .s4').css('color', 'orange').html('低');
        } else {
            $('.info_pass .s1').css('color', '#ccc');
            $('.info_pass .s2').css('color', '#ccc');
            $('.info_pass .s3').css('color', '#ccc');
            $('.info_pass .s4').html('');
        }
        if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
            flag = true
        }
        return flag
    }

    // 重新输入密码验证
    $('form').form('notpass').bind('focus', function () {
        $(' form  .info_notpass').show()
        $(' form .error_notpass').hide()
        $(' form .succ_notpass').hide()
    }).bind('blur', function () {
        if (trim($(this).val()) == '') {
            $(' form  .info_notpass').hide()
            $(' form .error_notpass').hide()
            $(' form .succ_notpass').hide()
        } else if (trim($(this).val()) == trim($('form').form('pass').val())) {
            $(' form  .info_notpass').hide()
            $(' form .error_notpass').hide()
            $(' form .succ_notpass').show()
        } else {
            $(' form  .info_notpass').hide()
            $(' form .error_notpass').show()
            $(' form .succ_notpass').hide()
        }
    })
    // 回答
    $('form').form('ans').bind('focus', function () {
        $(' form  .info_ans').show()
        $(' form .error_ans').hide()
        $(' form .succ_ans').hide()
    }).bind('blur', function () {
        if (trim($(this).val()) == '') {
            $(' form  .info_ans').hide()
            $(' form .error_ans').hide()
            $(' form .succ_ans').hide()
        } else if (trim($(this).val()).length >= 2 && trim($(this).val()).length <= 32) {
            $(' form  .info_ans').hide()
            $(' form .error_ans').hide()
            $(' form .succ_ans').show()
        } else {
            $(' form  .info_ans').hide()
            $(' form .error_ans').show()
            $(' form .succ_ans').hide()
        }
    })
    // 电子邮件
    $('form').form('email').bind('focus', function () {
        // 补全界面
        if ($(this).val().indexOf('@') != -1) {
            $('form .all_email').hide()
        } else {
            $('form .all_email').show()
        }

        $(' form  .info_email').show()
        $(' form .error_email').hide()
        $(' form .succ_email').hide()
    }).bind('blur', function () {
        $('form .all_email').hide()
        if (trim($(this).val()) == '') {
            $(' form  .info_email').hide()
            $(' form .error_email').hide()
            $(' form .succ_email').hide()
        } else if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).val()))) {
            $(' form  .info_email').hide()
            $(' form .error_email').hide()
            $(' form .succ_email').show()
        } else {
            $(' form  .info_email').hide()
            $(' form .error_email').show()
            $(' form .succ_email').hide()
        }

    })
    $('form').form('email').bind('keyup', function (e) {
        var eleLength = $('#reg .all_email li').length();
        if ($(this).val().indexOf('@') == -1) {
            $('.all_email').show()
            $('.all_email .add_email_info').html($(this).val())
        } else {
            $('.all_email').hide()
        }

        $('#reg .all_email li').css('background','#fff');
        if(e.keyCode == 40) {
            if(this.index == undefined || this.index == eleLength - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
            $('#reg .all_email li').eq(this.index).css('background','#ddd');
        }
        if(e.keyCode == 38) {
            if(this.index == undefined || this.index  == 0) {
                this.index = eleLength - 1;
            } else {
                this.index--
            }
            $('#reg .all_email li').css('background','#fff');
            $('#reg .all_email li').eq(this.index).css('background','#ddd');
        }


        if(e.keyCode == 13) {
            $('form').form('email').val($('#reg .all_email li').eq(this.index).text())
            $('#reg .all_email').hide()
        }


    })
    $('.all_email li').bind('mousedown', function() {
         $('form').form('email').val($(this).text())
    })


})




