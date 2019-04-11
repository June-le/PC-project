//手表资讯页面上方菜单指向收缩效果
(function () {
    $('.nav-menu li:gt(0)').mouseenter(
        function () {
            $(this).find('.nav-submenu').stop(true, true).slideDown(200);
        }).mouseleave(function () {
            $(this).find('.nav-submenu').stop(true, true).slideUp(200);
        })
})();

//手表资讯页面上方轮播图
(function () {
    $('.left-carousel').css({ width: $('.left-carousel').children().length * 657 });
    // $('.left-carousel').children().eq(0).clone(true).appendTo($('.left-carousel'));
    var imgnum = 0, flag = true;
    $('.banner-btn-next').click(function () {
        if (flag == true) {
            flag = false;
            imgnum++;
            if (imgnum > 6) {
                imgnum = 2;
                $('.left-carousel').css({ marginLeft: -657 });
            }

            $('.left-carousel').animate({ marginLeft: -657 * imgnum }, 500, function () {
                flag = true;
            });
        }
    });
    $('.banner-btn-prev').click(function () {
        if (flag == true) {
            flag = false;
            imgnum--;
            if (imgnum < 0) {
                imgnum = 4;
                $('.left-carousel').css({ marginLeft: -3258 });
            }
            $('.left-carousel').animate({ marginLeft: -657 * imgnum }, 500, function () {
                flag = true;
            });
        }
    });
    function autoplay() {
        var time = setInterval(function () {
            $(".banner-btn-next").trigger("click");
        }, 2000);
        $('.left-carousel').mouseenter(function () {
            clearInterval(time);
        }).mouseleave(function () {
            autoplay();
        });
    }
    autoplay();
})();

function imgsize() {
    /*
       定义jQuery插件 imageSize
       使用方式
       $("容器").imageSize("contain") 或 $("容器").imageSize("cover")
    */
    $.fn.imageSize = function (type) {
        this.each(function () {
            var This = $(this),
                $img = This.find(">img"),
                box_width = This.width(),
                box_height = This.height();
            getRealImageSize($img.attr("src"), function (w, h) {
                if (type == "contain") {//跟background-size:contain一样效果
                    if (box_width / box_height <= w / h) {
                        $img.css({ width: "100%", height: "auto" });
                    }
                    else {
                        $img.css({ height: "100%", width: "auto" });
                    }
                } else if (type == "cover") {//跟background-size:cover一样效果
                    This.css("overflow", "hidden");
                    if (box_width / box_height <= w / h) {
                        $img.css({ width: "auto", height: "100%" });
                    }
                    else {
                        $img.css({ height: "auto", width: "100%" });
                    }
                } else {//无效果
                    This.css("overflow", "hidden");
                }
            });
        });
        //引用自http://www.zhihu.com/question/28733200
        function getRealImageSize(url, callback) {
            var img = new Image();
            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                callback(img.width, img.height);
            } else {
                // 完全加载完毕的事件
                img.onload = function () {
                    callback(img.width, img.height);
                }
            }

        }
    };
    /*
    开始调用插件
    */
    $(".columns-left a").imageSize("contain");
}
imgsize();

//手表咨询页面内容的ajax请求
(function () {
    var type = 2;
    var flag = true;
    $(window).scroll(function () {
        var winH = $(window).innerHeight();
        var scrollT = $(window).scrollTop();
        // console.log($('.columns-left').offset().top);
        var boxH = $('.columns-left').height() + $('.columns-left').offset().top;
        if (winH + scrollT >= boxH) {
            if (flag == true) {
                flag = false;
                $.ajax({
                    type: "post",
                    url: '../Consultingajax.php',
                    data: {
                        type: type
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.success == 1) {
                            var htmlStr = "";
                            htmlStr += "<div class='left-news'>";
                            htmlStr += "<div class='news-title'>";
                            htmlStr += "<span class='title-chiname'>" + data.list[0].name;
                            htmlStr += "</span>";
                            htmlStr += "<span class='title-engname'>" + data.list[0].ename;
                            htmlStr += "</span>";
                            htmlStr += "<a href='' class='title-more fr'>MORE>";
                            htmlStr += "</a>";
                            htmlStr += "</div>";
                            htmlStr += "<div class='news-content'>";
                            htmlStr += "<div class='content-left fl'>";
                            htmlStr += "<p class='content-left-p1'>";
                            htmlStr += "<a href=''>";
                            htmlStr += "<img src=images/img/" + data.list[0].img + ">";
                            htmlStr += "</a>";
                            htmlStr += "</p>";
                            htmlStr += "<h5>";
                            htmlStr += "<a href=''>" + data.list[0].title;
                            htmlStr += "</a>";
                            htmlStr += "</h5>";
                            htmlStr += "<p class='content-left-p2'>";
                            htmlStr += "<span>时间" + data.list[0].time;
                            htmlStr += "</span>";
                            htmlStr += "</p>";
                            htmlStr += "<p class='content-left-p3'>";
                            htmlStr += "<a href=''>" + data.list[0].content;
                            htmlStr += "</a>";
                            htmlStr += "</p>";
                            htmlStr += "</div>";
                            htmlStr += "<div class='content-right fr'>";
                            htmlStr += "<dl>";
                            htmlStr += "<dt>";
                            htmlStr += "<a href=''>";
                            htmlStr += "<img src=images/img/" + data.list[1].img + ">";
                            htmlStr += "</a>";
                            htmlStr += "</dt>";
                            htmlStr += "<dd>";
                            htmlStr += "<p class='p1'>";
                            htmlStr += "<a href=''>" + data.list[1].title;
                            htmlStr += "</a>";
                            htmlStr += "</p>";
                            htmlStr += "<p class='p2'>" + data.list[1].time;
                            htmlStr += "</p>";
                            htmlStr += "</dd>";
                            htmlStr += "</dl>";
                            htmlStr += "<dl>";
                            htmlStr += "<dt>";
                            htmlStr += "<a href=''>";
                            htmlStr += "<img src=images/img/" + data.list[2].img + ">";
                            htmlStr += "</a>";
                            htmlStr += "</dt>";
                            htmlStr += "<dd>";
                            htmlStr += "<p class='p1'>";
                            htmlStr += "<a href=''>" + data.list[2].title;
                            htmlStr += "</a>";
                            htmlStr += "</p>";
                            htmlStr += "<p class='p2'>" + data.list[2].time;
                            htmlStr += "</p>";
                            htmlStr += "</dd>";
                            htmlStr += "</dl>";
                            htmlStr += "<dl>";
                            htmlStr += "<dt>";
                            htmlStr += "<a href=''>";
                            htmlStr += "<img src=images/img/" + data.list[3].img + ">";
                            htmlStr += "</a>";
                            htmlStr += "</dt>";
                            htmlStr += "<dd>";
                            htmlStr += "<p class='p1'>";
                            htmlStr += "<a href=''>" + data.list[3].title;
                            htmlStr += "</a>";
                            htmlStr += "</p>";
                            htmlStr += "<p class='p2'>" + data.list[3].time;
                            htmlStr += "</p>";
                            htmlStr += "</dd>";
                            htmlStr += "</dl>";
                            htmlStr += "<dl>";
                            htmlStr += "<dt>";
                            htmlStr += "<a href=''>";
                            htmlStr += "<img src=images/img/" + data.list[4].img + ">";
                            htmlStr += "</a href=''>";
                            htmlStr += "</dt>";
                            htmlStr += "<dd>";
                            htmlStr += "<p class='p1'>";
                            htmlStr += "<a href=''>" + data.list[4].title;
                            htmlStr += "</a>";
                            htmlStr += "</p>";
                            htmlStr += "<p class='p2'>" + data.list[4].time;
                            htmlStr += "</p>";
                            htmlStr += "</dd>";
                            htmlStr += "</dl>";
                            htmlStr += "</div>";
                            htmlStr += "</div>";
                            htmlStr += "</div>";
                            $('.columns-left').append(htmlStr);
                            flag = true;
                            type++;
                            imgsize();
                        }
                    }
                });
            }
        }
    });
})();
