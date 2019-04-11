$(function () {
    //页面加载时判断cookie
    function checkCookie1() {

        if (getCookie("user") != null) {
            $(".wrap_right_login").html('<a class="cook">你好!</a>' + "<a class='cook' href=\"collection.php\">" + getCookie("user") + "</a>" + '<a class="del cook">退出</a>');
        }
    }
    checkCookie1()
    $(".wrap_right_login .del").click(function () {
        delCookie("user");
        $(".wrap_right_login").html("<a href=\"Login.html\">请登录</a><a href=\"Regist.html\" class=\"gift\">注册即送3500元大礼包</a>")
    })
    //头部特效
    function header() {
        //头部服务hover显示
        $(".service").hover(
            function () {
                $(".service_hover").stop(true, true).slideDown('fast')
            },
            function () {
                $(".service_hover").stop(true, true).slideUp('fast')
            }
        )

        //头部搜索获取焦点显示
        $(".search_inp input").on("focus blur", function (e) {
            if (e.type == 'focus') {
                $(".sea_history_hot").show()
            } else if (e.type == 'blur') {
                $(".sea_history_hot").hide()
                $(".suggest_word").addClass("h")
            }
        })

        // 商品中心鼠标移入显示
        $(".nav_left").hover(
            function () {
                $(".all_shop_list").stop(true, true).slideDown('fast')
            },
            function () {
                $(".all_shop_list").stop(true, true).slideUp('fast')
            }
        )

        //商品中心分类显示
        $(".menu_box").hover(
            function () {
                $(this).css({
                    backgroundColor: '#fff'
                });
                $(this).children("span").css({
                    backgroundColor: '#ccaa7a'
                })
                $(".brand_ico").eq($(this).index()).show();
            },
            function () {
                $(this).css({
                    backgroundColor: '#e6e6e6'
                });
                $(this).children("span").css({
                    backgroundColor: '#e6e6e6'
                })
                $(".brand_ico").eq($(this).index()).hide();
            }
        )
        //商品中心品牌名显示
        function licon() {
            $('.brand_list ul li').on("mouseover mouseout", function (e) {
                if (e.type == 'mouseover') {

                    $(this).find(".ico_name").show();
                } else if (e.type == 'mouseout') {
                    $(this).find(".ico_name").hide();
                }
            })
        }

        //商品中心经过的ajax请求
        $('.data').mouseenter(function () {
            var index = this
            $.ajax({
                type: "GET",
                url: "api/item-center.php",
                dataType: "json",
                data: "dataText=" + $(this).data('text'),
                success: function (data) {
                    var index1 = index
                    var ht = $(index).next().children().children().children('.brand_list').children('ul').html()
                    // console.log(ht)
                    if (ht == "") {
                        $.each(data, function (index, val) {
                            $(index1).next().children().children().children('.brand_list').children('ul').append("<li class=\"fl\"><a href=\"#\"><p class=\"ico_logo\"> <img src='images/index-img/" + val['img'] + "'></p><p class=\"ico_name\">" + val["txt"] + "</p></a></li>")
                            licon()
                        })
                    }
                }

            })

        })

    }
    header()



    //主体内容特效
    function main() {
        //主体左侧轮播图效果
        function banner() {
            var loop = loopPackage();
            loop.slideLoop({
                obj: $(".banner_top_img"),
                auto: 1,
                time: 2000,
                haveArrows: true,
                direction: 1 //水平方向
            });

        }
        banner()

        function tab() {
            $('.tab1_txt li').mouseover(function () {
                $(this).addClass('tab1_in').siblings().removeClass('tab1_in')
                $(".tab1_content").children().eq($(this).index()).addClass('index').siblings().removeClass('index')
            })
            var loop = loopPackage();
            var loop1 = loopPackage();
            loop.slideLoop({
                obj: $(".cont_slide"),
                auto: 1,
                time: 2000,
                haveArrows: true,
                direction: 1 //水平方向
            });
            loop1.slideLoop({
                obj: $(".cont_slide2"),
                auto: 1,
                time: 2000,
                haveArrows: true,
                direction: 1 //水平方向
            });
        }
        tab()

        function tab2() {
            $('.tab2_txt li').mouseover(function () {
                $(this).addClass('tab2_in').siblings().removeClass('tab2_in')
                $(".tab2_content").children().eq($(this).index()).addClass('index').siblings().removeClass('index')
            })
        }
        tab2()

        function tab3() {
            $('.tab3_txt li').mouseover(function () {
                $(this).addClass('tab3_in').siblings().removeClass('tab3_in')
                $(".tab3_content").children().eq($(this).index()).addClass('tabin').siblings().removeClass('tabin')
            })
        }
        tab3()

        function icon() {

            //腕表品牌的分类
            for (var i = 0; i < 24; i++) {
                $(".scroll_more").append("<ul class=\"clearfix h\"></ul>")
            }
            $.each(add, function (index, ele) {
                $(".brand_abc").append("<a href='javascript:void(0);'>" + index + "</a> ");
                $.each(ele, function (index1, ele1) {
                    $(".scroll_more ul:first").append("<li class=\"fl\"><a href=\"#\">" + ele1['name'] + "<em >&nbsp;/&nbsp;" + ele1['English'] + "</em></a></li>");
                })
            })
            // 腕表 经过相应的首字母显示品牌
            $(".brand_abc a").on("mouseover", function (e) {
                if (e.type == "mouseover") {
                    $(this).addClass('aonmouse').siblings().removeClass('aonmouse');
                    $('.scroll_more ul').eq($(this).index()).removeClass('h').siblings().addClass('h');
                    var index = $(this)
                    var val = ($(this).not($('.all_brand'))).html();
                    if (val != undefined) {
                        $(".scroll_more ul :gt(0)").eq((index.not($('.all_brand'))).index() - 1).html("")
                        $.each(add[val], function (index2, ele2) {
                            $(".scroll_more ul :gt(0)").eq((index.not($('.all_brand'))).index() - 1).append("<li class=\"fl\"><a href=\"#\">" + ele2['name'] + "<em >&nbsp;/&nbsp;" + ele2['English'] + "</em></a></li>")
                        })
                    }
                }
            })
        }
        icon()

        function icon2() {

            //表带品牌的分类
            for (var i = 0; i < 8; i++) {
                $(".scroll_more2").append("<ul class=\"clearfix h\"></ul>")
            }
            $.each(add2, function (index, ele) {
                $(".brand_abc2").append("<a href='javascript:void(0);'>" + index + "</a> ");
                $.each(ele, function (index1, ele1) {
                    $(".scroll_more2 ul:first").append("<li class=\"fl\"><a href=\"#\">" + ele1['name'] + "<em >&nbsp;/&nbsp;" + ele1['English'] + "</em></a></li>");
                })
            })
            // 表带 经过相应的首字母显示品牌
            $(".brand_abc2 a").on("mouseover", function (e) {
                if (e.type == "mouseover") {
                    $(this).addClass('aonmouse').siblings().removeClass('aonmouse');
                    $('.scroll_more2 ul').eq($(this).index()).removeClass('h').siblings().addClass('h');
                    var index = $(this)
                    var val = ($(this).not($('.brand_abc2 .all_brand'))).html();
                    if (val != undefined) {
                        $(".scroll_more2 ul :gt(0)").eq((index.not($('.brand_abc2 .all_brand'))).index() - 1).html("")
                        $.each(add2[val], function (index2, ele2) {
                            $(".scroll_more2 ul :gt(0)").eq((index.not($('.brand_abc2 .all_brand'))).index() - 1).append("<li class=\"fl\"><a href=\"\">" + ele2['name'] + "<em >&nbsp;/&nbsp;" + ele2['English'] + "</em></a></li>")
                        })
                    }
                }
            })

        }
        icon2()

        function aicon() {

            //    品牌更多和收起的点击
            $(".more").click(function () {
                $('.brand_con_all').show();
                $('.pack_up').show();
                $(this).hide();
                $('.brands_option').hide();
                $('.scroll_more').children().eq(0).removeClass('h');
                $('.scroll_more2').children().eq(0).removeClass('h');
                $('.all_brand').addClass('aonmouse')
            })
            $(".pack_up").click(function () {
                $('.brand_con_all').hide();
                $('.pack_up').hide();
                $('.more').show();
                $('.brands_option').show();
            })

            // 更多选项点击显示
            function down1() {
                $(".toggle_btn").click(function () {
                    $('.more-hidden').show();
                    $('.icon-down1').addClass('hid');
                    $('.icon-down2').removeClass('hid');
                    $('.btn_txt').html("收起")
                    if ($('.btn_txt').html() == '收起') {
                        down2()
                    }
                })
            }
            down1()

            function down2() {
                $(".toggle_btn").click(function () {
                    $('.more-hidden').hide();
                    $('.icon-down1').removeClass('hid');
                    $('.icon-down2').addClass('hid');
                    $('.btn_txt').html("更多选项（表盘、表带、功能、防水等）")
                    if ($('.btn_txt').html() == '更多选项（表盘、表带、功能、防水等）') {
                        down1()
                    }
                })

            }
            //更多选项中的更多和收起的点击显示
            $('.sea_blocks .more_blocks').click(function () {
                $(this).parent().children(".price_option").addClass('height_auto')
                $(this).parent().children('.pack_up_blocks').show();
            })
            $('.sea_blocks .pack_up_blocks').click(function () {
                $(this).parent().children(".price_option").removeClass('height_auto')
                $(this).parent().children('.pack_up_blocks').hide();
            })
        }
        aicon()


        function shops() {
            $('.radio_def').click(function () {
                if ($(this).children().hasClass("icon-d-selected")) {
                    $(this).children().toggleClass('icon-d-selected');
                    $(this).css({
                        border: 'none'
                    })
                } else {
                    $(this).children().toggleClass('icon-d-selected');
                    $(this).css({
                        border: '1px solid #ccc'
                    })
                }

            })
        }
        shops()

        //主体右侧底部添加热门手表
        function wbfloor() {
            $.each(add, function (index, ele) {
                $.each(ele, function (index1, ele1) {
                    $(".wb_words_floor ul:first").append("<li class=\"fl\"><a href=\"#\">" + ele1['name'] + "<em>手表</em></a></li>");
                })
            })
            $('.wb_words_floor .wort_tit a').click(function () {
                if ($(this).html() == '+更多') {
                    $(this).parent().next().addClass('hauto');
                    $(this).html("-收起")
                } else if ($(this).html() == '-收起') {
                    $(this).parent().next().removeClass('hauto');
                    $(this).html("+更多")
                }
            })
        }
        wbfloor()


        //经过商品时显示加入收藏和加入购物车
        function show() {
            $('.list_imgshop ul li').on("mouseover mouseout", function (e) {
                if (e.type == 'mouseover') {
                    $(this).find(".goods_hover").show();
                } else if (e.type == 'mouseout') {
                    $(this).find(".goods_hover").hide();
                }
            })
        }
        show()


        //商品分页显示
        function mgs(data) {
            var list = "";
            for (var i = 0; i < data.length; i++) {
                list += "<li>"
                list += "<a href=\"html/detail.html\" class=\"s_goods_img\">"
                list += "<img class=\"lazy-load\" src=\"../images/proLists-img/loading.gif\" data-original=" + data[i]['img'] + " alt=''>"
                list += "</a>"
                list += "<div class=\"goods_txt\"><p class=\"tPrc\">"
                list += "<span class=\"s_price\">¥<em>" + data[i]['price'] + "</em></span>"
                list += "<del>¥" + data[i]['oldprice'] + "</del></p>"
                list += "<a href=\"html/detail.html\" class=\"s_goods_name\">" + data[i]['details'] + "</a>"
                list += "<div class=\"goods_sale\"> <em class=\"s_sale_num\">销量" + data[i]['sales'] + "</em></div>"
                list += "<a href=\"#\" class=\"s_shop\">" + data[i]['brand'] + "</a>"
                list += "<p class=\"sale_tags\"> <span>自营</span> </p><div class=\"goods_hover\"><a href=\"javascript:void(0);\" class=\"add_to_keep\">加入收藏</a><a href=\"javascript:void(0);\" class=\"already_keep h\">已收藏</a><a href=\"javascript:void(0);\" class=\"add_to_cart\">加入购物车</a></div></div>"
                list += "</li>"
            }
            $(".list_imgshop ul").html(list)
        }

        function fenye() {
            for (var m = 0; m < 4; m++) {
                $('.main_list_page ul').append("<li>" + (m + 1) + "</li>")
            }
            $('.main_list_page ul li:first').addClass("active")

            $('.main_list_page ul li').click(function () {
                $("body,html").stop(true, true).animate({
                    scrollTop: 570
                }, 500);
                $(this).addClass("active").siblings().removeClass("active")
                $.ajax({
                    type: "GET",
                    url: "api/fenye.php",
                    dataType: "json",
                    data: 'ye=' + ($(this).index() + 1),
                    success: function (data) {
                        mgs(data)
                        show()
                        $(".list_imgshop ul li a img").lazyload();
                    }
                })

            })
        }
        fenye()

        //  商品类别点击请求分页
        $(".search_filter_line").find("ul li a").click(function (e) {
            e.preventDefault()
            $(".main_list_page").toggleClass("h");
            $(".icon_list_page").toggleClass("h");
            for (var m = 0; m < 4; m++) {
                $('.icon_list_page ul').append("<li>" + (m + 1) + "</li>")
            }
            $('.icon_list_page ul li:first').addClass("active")
            $.ajax({
                type: "GET",
                url: "api/fenye1.php",
                dataType: "json",
                data: 'ye=1',
                success: function (data) {
                    console.log(data)
                    mgs(data)
                    show()
                    $(".list_imgshop ul li a img").lazyload();
                }
            })

            $('.icon_list_page ul li').click(function () {
                $("body,html").stop(true, true).animate({
                    scrollTop: 570
                }, 500);
                $(this).addClass("active").siblings().removeClass("active")
                $.ajax({
                    type: "GET",
                    url: "api/fenye1.php",
                    dataType: "json",
                    data: 'ye=' + ($(this).index() + 1),
                    success: function (data) {
                        mgs(data)
                        show()
                        $(".list_imgshop ul li a img").lazyload();
                    }
                })

            })

            $(".select").append("<p class=\"p_icon\"><span>" + $(this).parents(".price_all").children(".price_title").html() + ":</span><span class=\"icon\">" + $(this).html() + "<i class=\"del\"></i></span></p>")
            $(this).parents(".price_all").addClass("h");
        })

        //细分类的点击隐藏大品牌
        $(".select").click(function (event) {
            var $target = $(event.target);
            if ($target.hasClass('del')) {
                // console.log($target.parent().text())
                // console.log($(".price_all").find("a"))
                $.each($(".price_all").find("a"), function (index, val) {
                    // console.log($(val).text())
                    if ($target.parent().text() == $(val).text()) {
                        // console.log($(val).parent().get(0))
                        $(val).parents(".price_all").toggleClass("h");

                    }
                })
                $target.parent().parent().remove()
            }
        })

        //综合排序模块的滚动置顶
        function scroll() {
            //获取页面卷起的高度
            var scrollT = $(window).scrollTop();
            // var offT = $('.sort_list').offset().top;
            if (scrollT >= 600) {
                $('.sort_list').addClass('sort_fixed');
            } else {
                $('.sort_list').removeClass('sort_fixed');
            }
        }
        $(window).scroll(function () {
            scroll();
        })
        $('.sort_list .sort_con01 ul li').click(function () {
            $(this).addClass("on").siblings().removeClass("on")
        })
    }
    main()




    //腕表和表带的tab切换
    function icontab() {
        // 腕表切换

        $('.wan').click(function () {
            $('.sea_option_wan').show();
            $('.sea_option_dai').hide();
            $(this).addClass('wdas').removeClass('wda');
            $('.dai').addClass('wda').removeClass('wdas');
            $(".select .p_icon").remove(".p_icon");
            $(".price_all").removeClass("h");
        })
        $('.dai').click(function () {
            $('.sea_option_wan').hide();
            $('.sea_option_dai').show();
            $(this).addClass('wdas').removeClass('wda');
            $('.wan').addClass('wda').removeClass('wdas');
            $(".select .p_icon").remove(".p_icon");
            $(".price_all").removeClass("h");
        })
    }
    icontab()


    //添加收藏
    $(".list_imgshop").click(function (event) {
        var $target = $(event.target);
        if ($target.hasClass('add_to_keep')) {
            $target.addClass("h").next().removeClass("h")
            var src = $target.parent().parent().parent().find(".lazy-load").get(0).src;
            var price = $target.parent().parent().parent().find(".s_price em").html();
            var delprice = $target.parent().parent().parent().find(".tPrc del").html();
            var name = $target.parent().parent().parent().find(".s_goods_name").html();
            var addDetail = '<a class="img" href="" target="_blank"><img src="' + src + '" alt=""></a><div class="title ">' + name + '</div><div class="price"><span class="price_a">￥' + price + '</span><span class="price_b">￥' + delprice + '</span></div><div class="hover_content"><div class="cancel">取消收藏</div></div><div class="cover_content"><div class="tag icon-a-user-button"></div></div>';
            $.ajax({
                type: "get",
                dataType: "json",
                url: "api/lianjie.php",
                data: {
                    detail: addDetail
                },
                success: function (data) {
                    console.log("添加成功")
                    // console.log(data)
                },
                error: function (t) {
                    // alert("失败")
                    console.log("添加失败")
                    // console.log(data)
                }
            })

        }
    })


    //添加购物车
    $(".list_imgshop").click(function (event) {
        var $target = $(event.target);
        if ($target.hasClass('add_to_cart')) {
            var src = $target.parent().parent().parent().find(".lazy-load").get(0).src
            var price = $target.parent().parent().parent().find(".s_price em").html();
            price=price.replace(",","")
            var name = $target.parent().parent().parent().find(".s_goods_name").html();
            var num = 1;
            var dianpu = $target.parent().parent().parent().find(".s_shop").html()

            $.ajax({
                type: "get",
                dataType: "json",
                url: "api/addcar.php",
                data: {
                    src: src,
                    price: price,
                    name: name,
                    num: num,
                    dianpu: dianpu
                },
                success: function (data) {
                    // console.log("添加成功")
                    console.log(data)
                },
                error: function (t) {
                    // alert("失败")
                    console.log("添加失败")
                    console.log(data)
                }
            })

            $(".succ").removeClass("h")
            var time=setInterval(function(){
                $(".succ").addClass("h")
                if($(".succ").hasClass("h")){
                    clearInterval(time)
                }
            },1000)
        }
    })



    //图片懒加载
    $(".list_imgshop ul li a img").lazyload();
})