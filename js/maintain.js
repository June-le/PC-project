// 数字跳转
function doit(oid, n) {
    var o = document.getElementById(oid);
    var i;
    if(n>38000){
        i = parseInt(o.innerHTML) + 15;
    }else{
        i = parseInt(o.innerHTML) + 1;
    }
    // var i = parseInt(o.innerHTML) + 1;
    if (isNaN(i)) i = 0;
    o.innerHTML = i.toString();
    if (i < n) setTimeout('doit(\'' + oid + '\',' + n + ')', 1);
}
doit('s1', 28);
doit('s2', 110);
doit('s3', 800);
doit('s4', 382665);


// tab切换


$(function () {
    var tab = (function () {
        function click() {
            $('.tab-content ul').first().show();
            $('.m-c-tab li').click(function () {
                $(this).css({ background: '#b39469', color: 'white' }).siblings().css({ background: 'white', color: '#b39469' });
                $('.tab-content ul').eq($(this).index()).show().siblings().hide();
            });
        }
        return {
            click: click

        }
    })();
    tab.click();
})

// 地图