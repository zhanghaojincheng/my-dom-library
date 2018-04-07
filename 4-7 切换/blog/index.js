$(function () {
    $('#box').toggle(function() {
        console.log(11)
        $('#box').css('background','red')
    }, function () {
        $('#box').css('background','pink')
    }, function () {
        $('#box').css('background','green')
    })

    $('#circle').toggle(function() {
        $('#circle').css('background','red')
    }, function () {
        $('#circle').css('background','pink')
    }, function () {
        $('#circle').css('background','green')
    })
    // $('#box').click(function() {
    //     console.log(this)
    // })
})




