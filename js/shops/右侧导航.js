//鼠标经过小图标出现隐藏
function icon() {
    var q = 0; //获取每一个需要出现的下标;
    $(".pc-botm").children().mouseover(function () {
        q = $(this).index();
        $(this).stop().children(".botm-yc").fadeIn()
    })
    $(".pc-botm").children().mouseout(function () {
        q = $(this).index();
        $(this).children(".botm-yc").stop().fadeOut()
    })
}
icon();
//鼠标经过小图标出现隐藏

// 点击小图标切换隐藏框和点击叉叉关闭隐藏 返回顶部
function fram() {
    var ic = 0;
    $(".panel").children().first().children().eq(1).each(function () {
        $(".botm-1").click(function () {
            ic = $(this).index();
            $(".panel").children().eq(1).animate({
                right: '0'
            })
            $(".panel").children().first().animate({
                right: '262px'
            })
            $(".panel").children().eq(1).children().eq(ic).animate({
                right: '0'
            }).siblings().animate({
                right: '-262px'
            })
            $(".panel").children().eq(0).children().eq(1).children().eq(ic).css({
                background: '#2b2525'
            }).siblings().css({
                background: '#fff'
            })
        })
    })
    $(".panyc-fork").click(function () {
        $(".panel").children().eq(1).animate({
            right: '-262px'
        })
        $(".panel").children().first().animate({
            right: '0'
        })
        $(".panel").children().eq(1).animate({
            right: '-262px'
        }).siblings().animate({
            right: '0'
        })
        $(".panel").children().eq(0).children().eq(1).children().eq(ic).css({
            background: '#fff'
        })
    })
    $(".botm-top").click(function(){
        $('html , body').animate({scrollTop: 0},'slow');
    })
}
fram();

// 点击小图标切换隐藏框和点击叉叉关闭隐藏 返回顶部



// tab切换
function tab(){
    $(".panyc-tab ul li").click(function(){
        var index = $(this).index();
        $(this).addClass("fl-on").siblings().removeClass("fl-on");
        $(".panyc-content").children().eq(index).addClass("on").siblings().removeClass("on");
    })
}
tab();
// tab切换