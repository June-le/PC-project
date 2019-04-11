function fillZeroPrefix(num) {
    return num < 10 ? "0" + num : num
  }
var left_time = function (obj,end_time) {
    var goTime=setInterval(function(){
        var d = new Date();
        var start = d.getTime();
        var d2 = end_time;
        var end = d2.getTime();
        var x = end - start;
        x /= 1000;
        var s = Math.floor(x % 60);
        var m = Math.floor(x / 60) % 60;
        var h = Math.floor(Math.floor(x / 60) / 60) % 24;
        var day = Math.floor(Math.floor(Math.floor(x / 60) / 60) / 24);
        obj.children("i").eq(0).html(fillZeroPrefix(day));
        obj.children("i").eq(1).html(fillZeroPrefix(h));
        obj.children("i").eq(2).html(fillZeroPrefix(m));
        obj.children("i").eq(3).html(fillZeroPrefix(s));
    },1000)
}
