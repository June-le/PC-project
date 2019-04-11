$(function () {

    var tab = (function () {
        // 详情Tab切换
        function click() {
            $('.commodity_title_text li:first').addClass('on');
            $('.lower_right_content .tab_content').first().show();
            $('.commodity_title_text li').click(function () {
                $(this).addClass('on').siblings().removeClass('on');
                $('.tab_content').eq($(this).index()).show().siblings().hide();
            })
        }
        // 右侧导航栏tab切换
        function tab() {
            $(".panyc-tab ul li").click(function () {
                var index = $(this).index();
                $(this).addClass("fl-on").siblings().removeClass("fl-on");
                $(".panyc-content").children().eq(index).addClass("on").siblings().removeClass("on");
            })
        }
        return {
            click: click,
            tab:tab
        }
    })();
    tab.click();
    tab.tab();
    var hover = (function () {
        // 右侧导航效果
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
        //鼠标经过小图标出现隐藏


        // 放大镜效果
        function magnifying() {
            // 小图下标第一个默认显示
            $('.zoom_con_silder li:first').addClass('opacity');
            $('.zoom_con_silder li').hover(function () {
                // 鼠标经过小图上方大图替换为对应大图
                $(".c_top_le_big .content_big_im .none").attr({ src: $(this).find('img').attr('src') });
                // 大图后放大镜图对应大图
                $(".c_top_le_big .content_big_im .magnifying").attr({ src: $(this).find('img').attr('src').replace(/([\s\S]*)(.jpg)$/, "$1-11.jpg") });
                $(this).addClass('opacity').siblings().removeClass('opacity');
            });
            $('.c_top_le_big .content_big_im').stop(true, true).mouseenter(function () {
                // 鼠标经过大图放大镜图出现，原图消失
                $('.c_top_le_big .content_big_im .magnifying').show();
                $(".c_top_le_big .content_big_im .none").hide();
                $(".content_big_im").mousemove(function (e) {
                    // 判断鼠标所在坐标
                    var x = -(e.pageX - $(".content_big_im").offset().left) * ($(".magnifying").innerWidth() / $(".none").innerWidth()) / 2;
                    var y = -(e.pageY - $(".content_big_im").offset().top) * ($(".magnifying").innerHeight() / $(".none").innerHeight()) / 2;
                    if (x <= $(".none").innerWidth() - $(".magnifying").innerWidth()) {
                        x = $(".none").innerWidth() - $(".magnifying").innerWidth();
                    }
                    if (y <= $(".none").innerHeight() - $(".magnifying").innerHeight()) {
                        y = $(".none").innerHeight() - $(".magnifying").innerHeight();
                    }
                    $(".magnifying").css("left", x + 'px');
                    $(".magnifying").css("top", y + 'px');
                })
            })
            // 鼠标离开恢复原样
            $('.c_top_le_big .content_big_im').stop(true, true).mouseleave(function () {
                $('.c_top_le_big .content_big_im .magnifying').hide();
                $(".c_top_le_big .content_big_im .none").show();

            })
        }
        // 点击放大镜隐藏页效果
        function magnify() {
            $('.icon-icon--').hover(function (e) {
                e.stopPropagation();
                $(this).addClass('ha').removeClass('no');
                $('.icon-icon--').click(function () {
                    $('.tc_content').show();
                    var n = 0;
                    $('.carousel_content_prev .icon-jiantouyou').click(function () {
                        n++;
                        if (n >= 4) {
                            n = 4;
                        }
                        $('.swiper-wrapper').stop(true, true).animate({ marginLeft: -700 * n }, 1000);
                    })
                    $('.carousel_content_next .icon-jiantouzuo').click(function () {
                        n--;
                        if (n <= 0) {
                            n = 0;
                        }
                        $('.swiper-wrapper').stop(true, true).animate({ marginLeft: -700 * n }, 1000);
                    })
                    $('.carousel_content_detele').click(function () {
                        $('.tc_content').hide();
                    })
                })
            }, function () {
                $(this).addClass('no').removeClass('ha');
            })
        }
        return {
            icon: icon,
            magnifying: magnifying,
            magnify: magnify
        }
    })();
    hover.icon();
    hover.magnifying();
    hover.magnify();

    var click = (function () {
        // 数量+
        function add() {
            $('.upper_number_plus').click(function () {
                $('.upper_number_cont').val(parseInt($('.upper_number_cont').val()) + 1);
            })
        }
        // 数量-
        function reduce() {
            $('.upper_number_reduce').click(function () {
                $('.upper_number_cont').val(parseInt($('.upper_number_cont').val()) - 1);
                if ($('.upper_number_cont').val() <= 1) {
                    $('.upper_number_cont').val(1);
                }
            })
        }
        // 加入购物车效果
        function shop() {
            $('.upper_button_b').click(function () {
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: '../api/detail.php',
                    data: {
                        detail: $('.upper_title').html(),
                        price: $('.upper_price_wb_b').html(),
                        id: $('.serialNumber').html(),
                        brind: $('.storeName_top').html(),
                        num: $('.upper_number_cont').val(),
                        img: $('.im').attr('src')
                    },
                    async: true,
                    success: function () {
                        $('.hint').show();
                        setTimeout(function () {
                            $('.hint').hide()
                        }, 2000)
                    }
                })

            })
        }
        // 右侧导航栏
        function nav() {
            // 点击小图标切换隐藏框和点击叉叉关闭隐藏 返回顶部
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
            $(".botm-top").click(function () {
                $('html , body').animate({ scrollTop: 0 }, 'slow');
            })
        }

        return {
            add: add,
            reduce: reduce,
            shop: shop,
            nav: nav
        }
    })();
    click.add();
    click.reduce();
    click.shop();
    click.nav();

    if(getCookie("user")){
        $(".header_top .wrap_right .wrap_right_login a").eq(0).html("欢迎"+getCookie("user")+"<a class='del cook'>退出</a>");
    }else{
        $(".header_top .wrap_right .wrap_right_login a").eq(0).html("<a href='Login.html'>请登录</a>");
    }
    // getCookie("user")&&$(".header_top .wrap_right .wrap_right_login a").eq(0).html("欢迎"+getCookie("user")+"<a class='del cook'>退出</a>");
    $(".header_top .wrap_right .wrap_right_login").on("click",".del",function(){
        $(this).parent().html("<a href='Login.html'>请登录</a>");
        delCookie("user");
    })



})
