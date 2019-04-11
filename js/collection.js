// 页面加载时就要获取总条数和总页数
// 每次刷新网页就要先获取前十二条数据，再根据页数判断是否有添加页码超链接
!function (t, n) {
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
    // 设置左侧导航条的滑动
    function sideNav() {
        // 记录鼠标点击的位置
        var st = $("#nav").offset().top;
        // var flag=true;
        $("#nav ul li").on("mouseenter", function () {
            end = $(this).offset().top - st;
            $(".nav-bar").stop(true, true).animate({ height: "56px", top: end }, 200);
        })
        $("#nav ul").on("mouseleave", function () {
            $(".nav-bar").stop(true, true).animate({ height: 0, top: end + 28 + "px" }, 200);
        })
        // 二级菜单的事件
        // 1.点击大菜单出现小菜单的显示与隐藏
        $("#nav ul li").on("click", function () {
            // 当前li点击它的子元素dl的显示与隐藏
            $(this).toggleClass("toShow");
            // 同时希望其他的小菜单隐藏
            $(this).siblings().removeClass("toShow");
        })
        // 2.点击小菜单让当前的这一项hightlight
        $("#nav ul li dl dd").on("click", function (e) {
            e.stopPropagation();
            // 先让其他的去掉hightLight
            $("#nav ul li dl dd").removeClass("hightLight");
            // 再让当前的这一项添加类名hightLight
            $(this).toggleClass("hightLight");
        })
        // 初始化时就让二级菜单的长度是窗口的高度
        $(".W-pt-member-leftBar").height($(window).height())
        // 让二级菜单的长度是最大窗口的高度
        $(window).resize(function () {
            $(".W-pt-member-leftBar").height($(window).height())
        })
        // 但是超出当前窗口的部分隐藏没有滚动条但是滚轮滑动选择
        // 让W-pt-member-leftBar滚动到地方是固定定位
        $(window).scroll(function () {
            if ($(".collection_content").offset().top > $(window).scrollTop()) {
                $(".W-pt-member-leftBar").removeClass("toFixed");
                $(".W-pt-member-leftBar").removeClass("toAbs");
            } else if ($(".collection_content").offset().top <= $(window).scrollTop() & $(".collection_content").offset().top + $(".collection_content").height() > $(window).scrollTop() + $(window).innerHeight()) {
                $(".W-pt-member-leftBar").removeClass("toAbs");
                $(".W-pt-member-leftBar").addClass("toFixed");
                $(".W-pt-member-leftBar").css({ top: 0 + "px" });
            } else {
                $(".W-pt-member-leftBar").removeClass("toFixed");
                $(".W-pt-member-leftBar").addClass("toAbs");
                var topTo = $(".collection_content").offset().top + $(".collection_content").outerHeight() - $(".W-pt-member-leftBar").outerHeight() - $(".W-pt-member-leftBar").parent().offset().top;
                $(".W-pt-member-leftBar").css({ top: topTo + "px" });
            }

        })
    }
    // 右侧分页的开始
    var currentPage = 0;
    function showPageNum() {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "api/showCollection.php",
            success: function (t) {
                t = t["total"];
                t = Math.ceil(t / 12);
                var ht = ""
                for (var i = 1; i <= t; i++) {
                    ht += "<a href='javascript:;' data-page='" + i + "'>" + i + "</a>";
                }
                $("#paginationTwo li").html(ht);
                for (var i = 0; i < $("#paginationTwo li a").length; i++) {
                    if ($("#paginationTwo li a").eq(i).data("page") == currentPage + 1) {
                        $("#paginationTwo li a").eq(i).addClass("pageActive").siblings().removeClass("pageActive");
                    }
                }

            },
            error: function () { alert("失败") }
        })
    }
    // 点击页码实现跳转
    function pageClick(){
        $("#paginationTwo li").on("click", "a", function () {
            var _this = $(this);
            currentPage = _this.data("page") - 1;
            $(this).addClass("pageActive").siblings().removeClass("pageActive");
            $.ajax({
                type: "post",
                dataType: "json",
                url: "api/pageChange.php",
                // 传过去当前的页码减一比如第二页传过去的是1
                data: { current: currentPage },
                success: function (t) {
                    update(t);
                    showPageNum();
                },
                error: function () { alert("失败") }
            })
        })
    }
    // 如果点击页码就执行update函数（显示对应的12条数据）
    function update(t) {
        var h = "";
        var sp = t["sp"];
        console.log(sp);
        for (var i = 0; i < sp.length; i++) {
            h += "<div class='js_list' data-index=" + sp[i]["Id"] + ">" + sp[i]["detail"] + "</div>"
        }
        $("#commodity").html(h)
    }
    isLogin()
    sideNav()
    pageClick()
    showPageNum();

    // 点击取消收藏弹出弹框，并点击确认后1，从数据库删除该数据并，并重新加载当前页的数据
    var rightCancel = function (n, e) {
        var obj = {};
        // 给模块添加hover事件
        obj.hovers = function () {
            $(".product_content").on("mouseenter", ".js_list",
                function () {
                    $(this).children(".hover_content").show()
                }
            )
            $(".product_content").on("mouseleave", ".js_list",
                function () {
                    $(this).children(".hover_content").hide()
                }
            )
        };
        // 点击取消收藏让数据库的中对应的商品的state为0
        obj.cancel = function () {
            // 给每一个cancel标签绑定事件
            $(".product_content").on("click", ".cancel", function () {
                var n = $(this), o = [];
                o.push($(this).parents(".js_list").attr("data-index"));
                var c = function () {
                    $.ajax({
                        type: "get",
                        dataType: "json",
                        url: "api/deleteCollect.php",
                        // o是一个数组
                        data: { collectId: o, page: currentPage },
                        success: function (e) {
                            console.log(currentPage);
                            console.log("应该不跳转页面并更新数据");
                            update(e);
                            showPageNum();
                        },
                        error: function (t) {
                            alert("失败")
                        }
                    })
                }, i = $(e).html();
                layer.confirm(
                    i,
                    {
                        title: "收藏<i class='icon-a-r-close06'></i>",
                        btn: ["确定", "取消"],
                        skin: "Wb_strong_hints"
                    },
                    function (t, n) {
                        // 如果用户点击了确认框的确认，就执行c函数（发送ajax，并刷新页面）
                        c(), layer.close(t)
                    },
                    function (t, n) { }
                )
            })
        };
        obj.choice = function () {
            n.find(".cover_content").on("click", function () {
                n.children(".prompt").hide(),
                    $(this).children(".tag").toggleClass("icon-a-user-button2"),
                    $(this).toggleClass("cover_content_on")
            })
        };
        // 实现多选
        obj.clicks = function () {
            n.find(".title").children(".button").on("click", function () {
                n.find(".cover_content").mouseenter(function (e) {
                    e.stopPropagation();
                    console.log("weizz");
                });
                0 == $(this).attr("data-index") ? ($(this).text("取消管理"),
                    $(this).attr("data-index", "1"),
                    n.find(".container").children(".js_list").unbind("mouseenter").unbind("mouseleave"),
                    n.find(".container").children(".js_list").each(function () {
                        $(this).children(".cover_content").show()
                    })) : ($(this).text("批量处理"),
                        $(this).attr("data-index", "0"),
                        n.find(".container").children(".js_list").hover(function () {
                            $(this).children(".hover_content").show()
                        },
                            function () {
                                $(this).children(".hover_content").hide()
                            }
                        ),
                        n.find(".container").children(".js_list").each(function () {
                            $(this).children(".cover_content").hide()
                        }),
                        n.children(".prompt").hide(),
                        n.find(".cover_content").each(function () {
                            $(this).children(".tag").removeClass("icon-a-user-button2"),
                                $(this).removeClass("cover_content_on")
                        }),
                        $(".product_content .select .icon-a-user-select").removeClass("icon-a-user-select2"),
                        $(".product_content .select .text").removeClass("text_on")),
                    $(this).siblings(".select,.collection").toggle()
            }),
                n.find(".title").children(".select").on("click", function () {
                    $(this).children(".icon-a-user-select").toggleClass("icon-a-user-select2"),
                        $(this).children(".text").toggleClass("text_on"),
                        0 == $(this).attr("data-index") ? ($(this).attr("data-index", "1"),
                            n.children(".prompt").hide(),
                            n.find(".cover_content").each(function () {
                                $(this).children(".tag").addClass("icon-a-user-button2"),
                                    $(this).addClass("cover_content_on")
                            })) : ($(this).attr("data-index", "0"),
                                n.find(".cover_content").each(function () {
                                    $(this).children(".tag").removeClass("icon-a-user-button2"),
                                        $(this).removeClass("cover_content_on")
                                }))
                }),
                n.find(".title").children(".collection").hover(function () {
                    $(this).children(".icon-a-user-collection").addClass("icon-a-user-collection2"),
                        $(this).children(".text").addClass("text_on")
                },
                    function () {
                        $(this).children(".icon-a-user-collection").removeClass("icon-a-user-collection2"),
                            $(this).children(".text").removeClass("text_on")
                    }),
                n.find(".title").children(".collection").on("click", function () {
                    var o = n.find(".cover_content_on").length,
                        c = [];
                    if (o > 0) {
                        var i = function () {
                            n.find(".cover_content").each(function () {
                                // 遍历完之后将所有选中的商品的id放到c内面
                                $(this).hasClass("cover_content_on") && (c.push($(this).parents(".js_list").attr("data-index"))
                                    // ,$(this).parents(".js_list").remove()
                                )
                            }),
                                $.ajax({
                                    type: "get",
                                    dataType: "json",
                                    url: "api/deleteCollect.php",
                                    // c是一个数组
                                    data: { collectId: c, page: currentPage },
                                    success: function (e) {
                                        update(e);
                                    },
                                    error: function () {
                                        console.log("多项选择失败");
                                    }
                                })
                        },
                            s = $(e).html();
                        layer.confirm(s,
                            {
                                title: "收藏<i class='icon-a-r-close06'></i>",
                                btn: ["确定", "取消"], skin: "Wb_strong_hints"
                            },
                            function (n, e) {
                                // 执行i函数（发送ajax，成功之后刷新页面）
                                i(),
                                    t.location.reload(),
                                    layer.close(n)
                            },
                            function (t, n) { }
                        )
                    }
                    else n.children(".prompt").show()
                })
        };
        // 初始化操作
        obj.init = function () {
            o.hovers(),
                o.cancel(),
                o.clicks(),
                o.choice()
        };
        obj.init();
    };
    rightCancel($(".product_content"), "#W_presale_rule");
}(window, jQuery);

/* <a class="img" href="" target="_blank"><img src="images/collection/pro023.jpg" alt=""></a><div class="title ">西铁城CITIZEN-光动能系列 EW1563-08A 女士光动能表</div><div class="price"><span class="price_a">￥2160</span><span class="price_b">￥2400</span></div><div class="hover_content"><div class="cancel">取消收藏</div></div><div class="cover_content"><div class="tag icon-a-user-button"></div></div> */






