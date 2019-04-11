//轮播图渐入渐出;
function baner(){
    $(function(){
        $(".banner div:first").show();
        $(".controls .cs-bt").eq(0).css({width:50,background:'#fff'});
        var m = 0;
        $(".controls .cs-bt").mouseover(function(){
            clearInterval(auto);
                m = $(this).index();
                fade(m);
        })
        $(".controls .cs-bt").mouseout(function(){
            auto=setInterval(function(){
                m++;
                m = m>=2?0:m;
                fade(m);
            },3000)
        });
        var auto=setInterval(function(){
            m++;
            m = m>=2?0:m;
            fade(m);
        },3000)
        function fade(m){
            $(".banner .banner1").eq(m).fadeIn().siblings().fadeOut();
            $(".controls .cs-bt").eq(m).css({width:50,background:'#fff'}).siblings().css({width:25,background:'#b4b3b3'});
        }
    });
}
baner();

//鼠标经过商品出现边框开始
(function(){
    $(".content").on("mouseover","a",function(){
        $(this).css({
            border:'1px solid #d7d1d1',
            boxShadow:'2px 2px 2px #d7d1d1'
        })
    })
    $(".content").on("mouseout","a",function(){
        $(this).css({
            border:'1px solid #fff',
            boxShadow:'0 0 0 #fff'
        })
    })
})();
//鼠标经过商品出现边框结束


//点击加载更多;
function loader(){
    $(".more").click(function(){
        $(".content").css({
            overflow:'visible',
            height:'auto'
        })
        $(".more").css({
            display:'none'
        })
    })
}
loader();

// 人气店铺鼠标经过显示
function shop(){
    var s = 0;
    $(".shop-content .clearfix").first().children().mouseover(function(){
        // s++;
        s = $(this).index();
        $(".shop-yc").eq(s).css({
            display:'block'
        });
        $(".shop-text").eq(s).css({
            display:'none'
        })
    })
    $(".shop-content .clearfix").first().children().mouseout(function(){
        // s++;
        s = $(this).index();
        $(".shop-yc").eq(s).css({
            display:'none'
        });
        $(".shop-text").eq(s).css({
            display:'block',
            display:'-webkit-box'
        })
    })
}
shop();

//中部区域 brand点击箭头切换;
function brand(){
    var b = 0; //每一个li;
    var m = 0; //板块的数量;
    $(".lif").mouseover(function(){
        b++;
        b = $(this).index();
        $(".logo-yc").eq(b).css({
            display: 'block'
        })
        $(".lazy-logo").eq(b).css({
            display: 'none'
        })
    })
    $(".lif").mouseout(function(){
        b++;
        b = $(this).index();
        $(".logo-yc").eq(b).css({
            display: 'none'
        })
        $(".lazy-logo").eq(b).css({
            display: 'block'
        })
    })
    $(".brand-left").click(function(){
        if(m>0){
            m=m-1;
        }else{
            m=2;
        }
        var mpx = m*-1042+'px';
        $(".brand-logo").stop(true,true).animate({marginLeft:mpx},500);
    })
    $(".brand-right").click(function(){
        if(m<2){
            m=m+1;
        }else{
            m=0;
        }
        var mpx = m*-1042+'px';
        $(".brand-logo").stop(true,true).animate({marginLeft:mpx},500);
    })
}
brand();


// 鼠标经过小姐姐出来框
function sister(){
    $(".pc-top").mouseover(function(){
        $(".pc-yc").stop().fadeIn();
    })
    $(".pc-top").mouseout(function(){
        $(".pc-yc").stop().fadeOut();
    })
    $(".pc-yc .yc-close").click(function(){
        $(".pc-yc").stop().fadeOut();
    })
    $(".pc-yc .yc-close").mouseover(function(){
        $(".yc-close").css({
            transform: 'rotate(360deg)'
        })
    })
    $(".pc-yc .yc-close").mouseout(function(){
        $(".yc-close").css({
            transform: 'rotate(0deg)'
        })
    })
}
sister();


// 首屏ajax请求开始
(function(){
    var page = 0;
    $.ajax({
        type : "get",
        url : "../api/shops.php",
        data : {
            page : page
        },
        dataType : 'json',
        success : function(data){
            var htm = "";
            for(var i = 0; i < data.length ; i++){
                htm += "<a href='./html/detail.html'>";
                htm += "<div class='cont-img'>";
                htm += "<img src=images/shops-img/" + data[i].img + ">";
                htm += "</div>";
                htm += "<p class='cont-txt'>" + data[i].txt + "</p>";
                htm += "<p class='cont-money'>¥" + data[i].money + "</p>";
                htm += "</a>";
            }
            $(".content").prepend(htm);
            page++;
        }
    })
})();
// 首屏ajax请求结束



//点击加载更多开始(ajax)
(function(){
    var page = 0;
    $(".more").click(function(){
        $.ajax({
            type : "get",
            url : "../api/shops1.php",
            data : {
                page : page
            },
            dataType : 'json',
            success : function(data){
                var htma = "";
                for(var i = 0 ; i < data.length ; i++){
                    htma += "<a href='./html/detail.html'>";
                    htma += "<div class='cont-img'>";
                    htma += "<img src=images/shops-img/" + data[i].img + ">";
                    htma += "</div>";
                    htma += "<p class='cont-txt'>" + data[i].txt + "</p>";
                    htma += "<p class='cont-money'>¥" + data[i].money + "</p>";
                    htma += "</a>";
                }
                $(".content").append(htma);
                page++;
            }
        })
    })
    
})();
//点击加载更多结束(ajax)