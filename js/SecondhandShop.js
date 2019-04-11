(function () {
    $("img").lazyload({
        effect: "fadeIn"
    });
})();

//页面底部更多链接的特效
(function () {
    var flag = true;
    $('.wrap-link .more-link').click(function () {
        if (flag == true) {
            $(this).next().stop(true, true).slideDown("normal");
            flag = false;
        } else if (flag == false) {
            $(this).next().stop(true, true).slideUp("normal");
            flag = true;
        }
    });
})();

