(function () {
    // 顶部判断是否登录
    function isLogin() {
        if (getCookie("user")) {
            $(".header_top .wrap_right .wrap_right_login a").eq(0).html("欢迎<a href='collection.php'>" + getCookie("user") + "</a><a class='del cook'>退出</a>");
        } else {
            $(".header_top .wrap_right .wrap_right_login a").eq(0).html("<a href='Login.html'>请登录</a>");
        }
        $(".header_top .wrap_right .wrap_right_login").on("click", ".del", function () {
            $(this).parent().html("<a href='Login.html'>请登录</a>");
            delCookie("user");
        })
    }
    // 使用轮播插件
    function toLoop() {
        var loop = loopPackage();
        loop.fadeLoop({
            obj: $(".W-home-banner"),
            auto: 1,
            time: 3000,
            speed: "normal",//可以是fast、slow、normal、或者数字
            haveArrows: true,
            direction: 1,
            cirEvent: "click"//或是"click"，表示触发圆点切换的事件是hover还是click
        });
        loop.slideLoop({
            obj: $(".buy-list-slider .loopBanner"),
            auto: 1,
            time: 3000,
            haveArrows: true,
            direction: 1//水平方向
        });
        loop.fadeLoop({
            obj: $(".buyr-ad-slider .loopBanner"),
            auto: 1,
            time: 3000,
            speed: "normal",//可以是fast、slow、normal、或者数字
            haveArrows: true,
            direction: 1,
            cirEvent: "click"//或是"click"，表示触发圆点切换的事件是hover还是click
        });
        loop.fadeLoop({
            obj: $(".W-index-block-03 .loopBanner"),
            auto: 0,
            time: 3000,
            speed: 16.7,//可以是fast、slow、normal、或者数字
            haveArrows: true,
            direction: 1,
            cirEvent: "hover"//或是"click"，表示触发圆点切换的事件是hover还是click
        });
        loop.fadeLoop({
            obj: $(".W-index-block-04 .loopBanner"),
            auto: 0,
            time: 3000,
            speed: 16.7,//可以是fast、slow、normal、或者数字
            haveArrows: true,
            direction: 1,
            cirEvent: "hover"//或是"click"，表示触发圆点切换的事件是hover还是click
        });
        loop.fadeLoop({
            obj: $(".W-index-block-05 .loopBanner"),
            auto: 0,
            time: 3000,
            speed: 16.7,//可以是fast、slow、normal、或者数字
            haveArrows: true,
            direction: 1,
            cirEvent: "hover"//或是"click"，表示触发圆点切换的事件是hover还是click
        });
        loop.slideLoop({
            obj: $(".W-index-block-09 .loopBanner"),
            auto: 1,
            time: 3000,
            haveArrows: true,
            haveCir: true,//是否有圆点
            direction: 1//水平方向
        });
    }
    // 设置倒计时
    function setTime() {
        left_time($('.left-time'), new Date(2019, 0, 25, 8, 30));
    }
    // 楼层导航开始
    function floorNav(){
        $(window).scroll(function () {
            if ($(".W-index-block-02").offset().top < $(window).scrollTop() + $(window).height()) {
                $(".floorNav").show(16.7, function () {
                    $(".floorNav").addClass("move");
                });
                console.log("dsf")
            } else {
                console.log(1111)
                // $(".floorNav").addClass("remove");
                $(".floorNav").hide();
            }
        })
        $(function () {
            $(window).scroll(function () {
                var scr = $(window).scrollTop();
                $(".lou").each(function (i) {
                    var ofset = $(this).offset().top;
                    if (ofset - scr < 20) {
                        $(".floorNav ul .louicon").eq(i).css({ background: "#f2d291" }).siblings().css({ background: "#333" });
                    }
                })
            })
            $(".floorNav ul .louicon").click(function () {
                // $(this).css({background:"red"}).siblings().css({background:"grey"});
                var se = $(".lou").eq($(this).index()).offset().top;
                $("body,html").stop(true, true).animate({ scrollTop: se }, 500);
            })
            $(".toTop").click(function () {
                $("body,html").stop(true, true).animate({
                    scrollTop: 0
                }, 500);
            })
    
        })

    }
    // 二级菜单ajax加载
    function subNav(){
        var flag = true;
    // 加载右侧隐藏区域
    // $(".nav_left_menu").on("mouseenter",function () {
        $(".nav_left_menu").on("mouseenter", ".menu_box", function () {
            $(".JS-popCtn").show();
            if (flag) {
                flag = false;
                $.ajax({
                    type: "get",
                    url: 'api/subMenu.php',
                    dataType: 'json',//虽php那边  echo json_encode($data);将data转成了json字符串，但是这边不用解码
                    success: function (data) {//请求成功之后执行的函数
                        if (data.success == 1) {
                            var innerHtml = "";
                            for (var index in data.info["pinpai"]) {
                                innerHtml += "<div class='sub_menu clearfix' id='sub_menu_id'>"
                                innerHtml += "<div class='col_box fl'>";
                                innerHtml += "<div class='col_1'>";
                                innerHtml += "<span class='t'>品牌</span>";
                                innerHtml += "<div class='brand_list clearfix'>";
                                innerHtml += "<ul class='clearfix'>";
    
                                // 遍历8个中的一个的所有品牌
                                for (var a in data.info["pinpai"][index]) {
                                    innerHtml += "<li class='fl'>";
                                    innerHtml += "<a rel='nofollow' target='_blank' href='proLists.php'>";
                                    innerHtml += "<p class='p_logo lazy-load'>";
                                    innerHtml += "<img src='images/index-img/" + data.info["pinpai"][index][a]["img"] + "' brand-logo='' alt=''>";
                                    innerHtml += "</p>";
                                    innerHtml += "<p class='p_name'>" + data.info["pinpai"][index][a]["txt"] + "</p>";
                                    innerHtml += "</a>";
                                    innerHtml += "</li>";
                                }
                                innerHtml += "<div class='menu_bottom_line'></div>";
                                innerHtml += "</ul>";
                                innerHtml += "<i class='brand_bottom'></i>";
                                innerHtml += "</div>";
                                // // 遍历8个中的一个的所有热词
                                innerHtml += "<div class='col_2'>";
                                innerHtml += "<span class='t'>热词</span>";
                                innerHtml += "<div class='hot_words clearfix'>";
                                for (var b in data.info["reci"][index]) {
                                    innerHtml += "<a target='_blank' class='hot_a cl' href='proLists.php'>" + data.info["reci"][index][b]["txt"] + "</a>";
                                }
                                innerHtml += "</div>";
                                innerHtml += "</div>";
                                innerHtml += "</div>";
                                innerHtml += "<a target='_blank' href='proLists.php' class='brand_ads fl lazy-load'>";
                                innerHtml += "<img src='' brand-logo='' alt=''>";
                                innerHtml += "</a>";
                                innerHtml += "</div>";
                                innerHtml += "</div>";
                            };
                            $(".JS-popCtn").html(innerHtml);
                            $(".sub_menu").eq($(this).index()).show().siblings().hide();
                        } else {
                            console.log("cuo");
                        }
                    },
                });
            }
            $(".sub_menu").eq($(this).index()).show().siblings().hide();
        })
        $(".nav_left_menu_container").on("mouseleave", function () {
            $(".JS-popCtn").hide()
        })
    }
    isLogin();
    toLoop();
    setTime();
    floorNav();
    subNav();
})()
