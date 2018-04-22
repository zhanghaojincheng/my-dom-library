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
    var input_user = $('form').form('user');
    // 用户名验证功能
    input_user.bind('focus', function () {
        $(' form  .info_user ').show()
        $(' form .error_user').hide()
        $(' form .succ_user').hide()
    }).bind('blur', function () {
        if (trim($(this).val()) == '') {
            $(' form  .info_user ').hide()
            $(' form .error_user').hide()
            $(' form .succ_user').hide()
        } else if (!check_user()) {
            $(' form .error_user').show()
            $(' form  .info_user').hide()
            $(' form  .succ_user').hide()
        } else {
            $(' form  .succ_user').show()
            $(' form  .info_user').hide()
            $(' form .error_user').hide()
        }
    })
    function check_user() {
        return /[a-zA-Z0-9_]{2,20}/.test(trim(input_user.val())) && !trim(input_user.val()) == ''
    }

    // 密码验证功能
    var input_pass = $('form').form('pass');
    input_pass.bind('focus', function () {
        $(' form  .info_pass').show()
        $(' form .error_pass').hide()
        $(' form .succ_pass').hide()
    }).bind('blur', function () {
        if (trim(input_pass.val()) == '') {
            $(' form  .info_pass').hide()
            $(' form .error_pass').hide()
            $(' form .succ_pass').hide()
        } else {
            if (checkPass()) {
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
        checkPass()
    })

    // 密码验证函数
    function checkPass() {
        var value = trim(input_pass.val());
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
            return true
        }
        return false
    }

    // 重新输入密码验证
    var input_repeatpass = $('form').form('notpass');
    input_repeatpass.bind('focus', function () {
        $(' form  .info_notpass').show()
        $(' form .error_notpass').hide()
        $(' form .succ_notpass').hide()
    }).bind('blur', function () {
        if (trim(input_repeatpass.val()) == '') {
            $(' form  .info_notpass').hide()
            $(' form .error_notpass').hide()
            $(' form .succ_notpass').hide()
        } else if (trim(input_repeatpass.val()) == trim(input_pass.val())) {
            $(' form  .info_notpass').hide()
            $(' form .error_notpass').hide()
            $(' form .succ_notpass').show()
        } else {
            $(' form  .info_notpass').hide()
            $(' form .error_notpass').show()
            $(' form .succ_notpass').hide()
        }
    })
    function checkRepeatPass() {
        return trim(input_repeatpass.val()) == trim(input_pass.val()) && !trim(input_repeatpass.val()) == ''
    }
    // 选择问题
    var input_question =  $('form').form('ques');
    // 回答
    var input_ans = $('form').form('ans');
    input_ans.bind('focus', function () {
        $(' form  .info_ans').show()
        $(' form .error_ans').hide()
        $(' form .succ_ans').hide()
    }).bind('blur', function () {
        if (trim(input_ans.val()) == '') {
            $(' form  .info_ans').hide()
            $(' form .error_ans').hide()
            $(' form .succ_ans').hide()
        } else if (trim(input_ans.val()).length >= 2 && trim(input_ans.val()).length <= 32) {
            $(' form  .info_ans').hide()
            $(' form .error_ans').hide()
            $(' form .succ_ans').show()
        } else {
            $(' form  .info_ans').hide()
            $(' form .error_ans').show()
            $(' form .succ_ans').hide()
        }
    })
    function checkAnswer() {
        return (trim(input_ans.val()).length >= 2 && trim(input_ans.val()).length <= 32) && !trim(input_ans.val()) == ''
    }

    // 电子邮件
    var input_email = $('form').form('email');
    input_email.bind('focus', function () {
        // 补全界面
        if (input_email.val().indexOf('@') == -1) {
            $('form .all_email').show()
        } else {
            $('form .all_email').hide()
        }
        $(' form  .info_email').show()
        $(' form .error_email').hide()
        $(' form .succ_email').hide()
    }).bind('blur', function () {
        $('form .all_email').hide()
        if (trim(input_email.val()) == '') {
            $(' form  .info_email').hide()
            $(' form .error_email').hide()
            $(' form .succ_email').hide()
        } else if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim(input_email.val()))) {
            $(' form  .info_email').hide()
            $(' form .error_email').hide()
            $(' form .succ_email').show()
        } else {
            $(' form  .info_email').hide()
            $(' form .error_email').show()
            $(' form .succ_email').hide()
        }
    })
    function checkEmail() {
      return /^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim(input_email.val())) && !trim(input_email.val()) == ''
    }

    input_email.bind('keyup', function (e) {
        var eleLength = $('#reg .all_email li').length();
        if (input_email.val().indexOf('@') == -1) {
            $('.all_email').show()
            $('.all_email .add_email_info').html(input_email.val())
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

    // 年月日
    var year = $('form').form('year');
    var month = $('form').form('month');
    var day = $('form').form('day');
    var day30 = [4,6,9,11];
    var day31 = [1,3,5,7,8,10,12];
    var day28 = [2];

    for(var i = 1940;i < 2018;i++) {
        year.first().add(new Option(i, i, false, false))
    }
    forCircle(month.first(),12);

    year.bind('change',function() {
        if(month.val() == 2) {
            if(year.val() % 4 == 0 && year.val() % 100 != 0 || year.val() % 400 == 0) {
                if(day.first().options.length != 29) {
                    forCircle(day.first(),29)
                }
            } else {
                if(day.first().options.length == 29) {
                    forCircle(day.first(), 28)
                }
            }
        } else {

        }
    })
    month.bind('change',function() {
        var monthVal = Number($(this).val());
        if(day30.indexOf(monthVal) != -1) {
            forCircle(day.first(), 30);
        } else if(day31.indexOf(monthVal) != -1) {
            forCircle(day.first(), 31);
        } else {
            var temp = 28;
            if(year.val() % 4 == 0 && year.val() % 100 != 0 || year.val() % 400 == 0) {
                temp = 29;
            }
            forCircle(day.first(),temp)
        }
    })
    function forCircle(element,length) {
        day.html('')
        for(var i = 1; i <= length;i++) {
            element.add(new Option(i, i, false))
        }
    }

    // 备注
    var textarea = $('form').form('ps');
    textarea.bind('keyup', checkText).bind('paste',function() {
        // 粘贴事件的触发时机是先触发，文字后粘贴
        setTimeout(checkText,0)
    })
    $('.clear').click(function() {
        var usersWrite = textarea.val();
        textarea.val(usersWrite.slice(0,200))
        $('.ps').eq(0).show().find('.num').html(0);
        $('.ps').eq(1).hide()
    })
    function checkText() {
        var usersWrite = textarea.val().length;
        if(usersWrite > 200) {
            $('.ps').eq(0).hide()
            $('.ps').eq(1).show()
            $('.ps').eq(1).find('.num').html(usersWrite - 200)
        } else {
            $('.ps').eq(0).show()
            $('.ps').eq(1).hide()
            $('.ps').eq(0).find('.num').html(200 - usersWrite);
        }
    }

    // 提交表单验证
    $('form').form('sub').click(function() {
        var flag = true;
        if(!check_user()) {
            flag = false;
            $('form .error_user').show()
        } else {
            $('form .error_user').hide()
        }
        if (!checkPass() || trim(input_pass.val()) == '') {
            flag = false;
            $('form .error_pass').show()
        } else {
            $('form .error_pass').hide()
        }
        if (!checkRepeatPass()) {
            flag = false;
            $('form .error_notpass').show()
        } else {
            $('form .error_notpass').hide()
        }
        if (!checkAnswer()) {
            flag = false;
            $('form .error_ans').show()
        } else {
            $('form .error_ans').hide()
        }
        if (!checkEmail()) {
            flag = false;
            $('form .error_email').show()
        } else {
            $('form .error_email').hide()
        }
        if(!year.val() || !month.val() || !day.val()) {
            flag = false;
            $('form .error_day').show()
        } else {
            $('form .error_day').hide()
        }
        if(!input_question.val()) {
            flag = false;
            $('form .error_question').show()
        } else {
            $('form .error_question').hide()
        }
        if(flag) {
            $('form').first().submit()
        }
    })
    $('.uull li').click(function() {
        console.log($(this).index())
    })
})




