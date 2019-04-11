// banner图开始
(function(){
    var box = document.getElementsByClassName("dyc-banner")[0];
    var list = document.getElementsByClassName("dyc-container")[0];
    var rt = document.getElementsByClassName("cs-rt")[0];
    var lt = document.getElementsByClassName("cs-lt")[0];
    var n = 0, //图片的数量;
        m = 0, //margin的值;
        time1,tim2, //计时器;
        circle = 0, //底部圆圈;
        flag = true; //阻止计时器冲突;
    
        rt.onclick = autoplay;
        //点击右箭头切换图片;
        function autoplay(){
            if(flag){
                flag = false;
                n++;  //点击一下 图片切换一张
                circle++; // 下面的圆圈跟随图片的切换而切换;
                if(n > 1){
                    n = 0;
                    circle = 0;
                }
                time1 = setInterval(rtt,16.7);
            }
        }
        function rtt(){
            m+=50; //让图片的margin值增大
            list.style.marginLeft = -m+'px';
            if(m >= 3800){
                m=0;
            }
            if(m==n*1900){
                clearInterval(time1);
                flag = true;
            }
        }
        //点击左箭头切换图片;
        lt.onclick = function(){
            if(flag){
                flag = false;
                n--;    //点击一下 图片切换一张
                circle--;
                if(n < 0){
                    n = 1;
                    circle = 3;
                }
                time2 = setInterval(ltt,16.7);
            }
        }
        function ltt(){
            m-=50;
            list.style.marginLeft = -m+'px';
            if(m < 0){
                m = 3800;
            }
            if(m==n*1900){
                clearInterval(time2);
                flag = true;
            }
        } 
        var time3 = setInterval(autoplay,5000);
        box.onmouseover = function(){
            lt.style.display = 'block';
            rt.style.display = 'block';
            clearInterval(time3);
        }
        box.onmouseout = function(){
            rt.style.display = 'none';
            lt.style.display = 'none';
            time3 = setInterval(autoplay,5000);
        }
})();
// banner图结束


// 品牌闪购精选腕表tab开始
(function(){
    $(".tab1").click(function () {
        var index = $(this).index();
        // console.log(index)
        $(".tab-bom").children().eq(index).show().siblings().hide();
        $(".tab1").eq(index).addClass("tab-text").siblings().removeClass("tab-text");
        $(this).css({
            overflow: 'visible'
        }).siblings().css({
            overflow: 'hidden'
        })
    })
})();
// 品牌闪购精选腕表tab结束


// 鼠标经过精选腕表出现隐藏和边框开始   
(function(){
    $(".ulboj").on("mouseover","li",function(){
        $(this).css({
            border: '1px solid #eee',
            boxShadow: '0px 0px 20px #d7d1d1',
        })
        $(this).find(".goods-yc").css({
            display: 'block'
        })
    })
    $(".ulboj").on("mouseout","li",function(event){
        $(this).css({
            border: '',
            boxShadow: ''
        })
        $(this).find(".goods-yc").css({
            display: 'none'
        })
    })
})();
// 鼠标经过精选腕表出现隐藏和边框结束


//点击加载更多信息开始(ajax)
(function () {
    var page = 0;
    var flag = true;
    $(".load").click(function () {
        //发起aja请求
        $.ajax({
            type: "get",
            url: "../api/dynamic.php",
            data: {
                page: page
            },
            dataType: 'json',
            success: function (data) {
                var htms = "";
                for (var i = 0; i < data.length; i++) {
                    htms += "<li>";
                    htms += "<a herf=\"#\" class='goods-img'>";
                    htms += "<img src=images/dynamic-img/" + data[i].img + ">";
                    htms += "</a>";
                    htms += "<div class='goods-txt'>";
                    htms += "<p>";
                    htms += "<span class='txt-price'>￥";
                    htms += "<em>" + data[i].money + "</em>";
                    htms += "</span>";
                    htms += "<span class='txt-count'>" + data[i].sales + "</span>";
                    htms += "</p>";
                    htms += "<a herf=\"#\" class='goods-name'>" + data[i].particulars + "</a>";
                    htms += "<p>";
                    htms += "<span class='tags'>" + data[i].market + "</span>";
                    htms += "</p>";
                    htms += "<div class='goods-yc'>";
                    htms += "<a herf='#' class='yc-keep'>" + data[i].collect + "</a>";
                    htms += "<a herf='#' class='yc-cart'>" + data[i].shoping + "</a>";
                    htms += "</div>";
                    htms += "</div>";
                    htms += "</li>";
                }
                $(".ulboj").append(htms);
                page++;
                if(page>=7){
                    $(".load").hide();
                    $(".load-top").show();
                    $(".load-top").click(function(){
                        $('html , body').animate({scrollTop: 0},'slow');
                    })
                }
            }
        })
    })
})();
// 点击加载更多信息结束